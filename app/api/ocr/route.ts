import { NextRequest, NextResponse } from 'next/server'
import vision from '@google-cloud/vision'
import { put } from '@vercel/blob'
import type { ImageAnnotatorClient } from '@google-cloud/vision/build/src/v1'
import { logAuditAction } from '@/lib/audit/logger'

// Initialize Google Cloud Vision client
let visionClient: ImageAnnotatorClient | null = null

function getVisionClient() {
  if (visionClient) return visionClient

  try {
    // Check if we have service account credentials
    if (process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON) {
      const credentials = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON)
      visionClient = new vision.ImageAnnotatorClient({
        credentials
      })
      console.log('✅ Vision client initialized with JSON credentials')
    } 
    // Fallback to file path
    else if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
      visionClient = new vision.ImageAnnotatorClient()
      console.log('✅ Vision client initialized with file path')
    } 
    else {
      throw new Error('No Google Cloud credentials configured')
    }
    
    return visionClient
  } catch (error) {
    console.error('Failed to initialize Vision client:', error)
    throw error
  }
}

/**
 * OCR API Route - Proces uploaded Europees schadeformulier
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    console.log(`🔍 OCR start: ${file.name} (${(file.size / 1024).toFixed(2)} KB)`)

    // Convert file to buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Perform OCR with Google Cloud Vision
    const client = getVisionClient()
    const [result] = await client.textDetection(buffer)
    const detections = result.textAnnotations || []
    
    if (detections.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'Geen tekst gevonden in het document'
      }, { status: 400 })
    }

    // Full text from first annotation (contains all text)
    const fullText = detections[0]?.description || ''
    console.log(`✅ OCR succesvol: ${fullText.substring(0, 100)}...`)

    // Extract relevant data from OCR text
    const extractedData = parseEuropeanAccidentForm(fullText)

    // Upload file to Vercel Blob (optional: for storage)
    let fileUrl = ''
    try {
      const blob = await put(`schadeformulieren/${Date.now()}-${file.name}`, buffer, {
        access: 'public',
        contentType: file.type,
      })
      fileUrl = blob.url
    } catch (uploadError) {
      console.error('Blob upload failed:', uploadError)
      // Continue without file URL
    }

    const confidence = calculateConfidence(extractedData)

    // Log OCR actie in audit trail (claimId is nog niet bekend, dus null)
    await logAuditAction({
      claimId: null,
      actionType: 'ocr_run',
      performedBy: 'SYSTEM',
      details: {
        file_name: file.name,
        file_size_kb: Math.round(file.size / 1024),
        file_type: file.type,
        fields_extracted: Object.keys(extractedData),
        confidence: confidence,
        has_kenteken: !!extractedData.kenteken_tegenpartij,
        has_datum: !!extractedData.datum,
        file_url: fileUrl || null,
      },
      severity: 'info',
    })

    return NextResponse.json({
      success: true,
      raw_text: fullText,
      extracted_data: extractedData,
      file_url: fileUrl,
      confidence: confidence,
    })

  } catch (error: any) {
    console.error('❌ OCR Error:', error)
    
    // Log OCR fout in audit trail
    await logAuditAction({
      claimId: null,
      actionType: 'ocr_run',
      performedBy: 'SYSTEM',
      details: {
        error: error.message,
        success: false,
      },
      severity: 'warning',
    })

    return NextResponse.json(
      { 
        error: 'OCR verwerking mislukt', 
        details: error.message 
      },
      { status: 500 }
    )
  }
}

/**
 * Parse European Accident Form text
 */
function parseEuropeanAccidentForm(text: string): any {
  const lines = text.split('\n')
  const extracted: any = {}

  // Try to extract date (various formats)
  const datePatterns = [
    /(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})/,
    /(\d{2,4})[\/\-](\d{1,2})[\/\-](\d{1,2})/,
  ]

  for (const pattern of datePatterns) {
    const match = text.match(pattern)
    if (match) {
      const [_, part1, part2, part3] = match
      // Try different date formats
      let year = part3.length === 2 ? `20${part3}` : part3
      let month = part2
      let day = part1
      
      // Check if format is YYYY-MM-DD or DD-MM-YYYY
      if (parseInt(part1) > 31) {
        year = part1
        day = part3
      }
      
      extracted.datum = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      break
    }
  }

  // Extract license plates (Dutch format: XX-XX-XX or XX-XXX-X)
  const licensePlatePattern = /\b([A-Z0-9]{1,3})[\s\-]?([A-Z0-9]{1,3})[\s\-]?([A-Z0-9]{1,3})\b/g
  const plates = [...text.matchAll(licensePlatePattern)]
    .map(m => `${m[1]}-${m[2]}-${m[3]}`)
    .filter(p => p.length >= 6)

  if (plates.length > 0) {
    extracted.kenteken_tegenpartij = plates[0]
  }
  if (plates.length > 1) {
    extracted.kenteken_eigen = plates[1]
  }

  // Extract names (look for "bestuurder" or "naam" keywords)
  const namePatterns = [
    /(?:bestuurder|naam|driver|name)[\s:]+([A-Z][a-z]+\s+[A-Z][a-z]+)/i,
    /([A-Z][a-z]+\s+[A-Z][a-z]+)/
  ]

  for (const pattern of namePatterns) {
    const matches = [...text.matchAll(new RegExp(pattern, 'gi'))]
    if (matches.length > 0) {
      extracted.bestuurder_naam = matches[0][1]
      break
    }
  }

  // Extract location/plaats
  const locationKeywords = ['plaats', 'location', 'lieu']
  for (const keyword of locationKeywords) {
    const regex = new RegExp(`${keyword}[:\\s]+([A-Za-z\\s]+)`, 'i')
    const match = text.match(regex)
    if (match) {
      extracted.plaats = match[1].trim()
      break
    }
  }

  // Extract insurance company
  const insuranceKeywords = ['verzekeraar', 'insurance', 'assurance']
  for (const keyword of insuranceKeywords) {
    const regex = new RegExp(`${keyword}[:\\s]+([A-Za-z\\s]+)`, 'i')
    const match = text.match(regex)
    if (match) {
      extracted.verzekeraar = match[1].trim()
      break
    }
  }

  return extracted
}

/**
 * Calculate overall confidence score
 */
function calculateConfidence(data: any): number {
  let score = 0
  let total = 0

  const fields = ['datum', 'kenteken_tegenpartij', 'bestuurder_naam', 'plaats']
  
  fields.forEach(field => {
    total += 25
    if (data[field]) {
      score += 25
    }
  })

  return Math.round((score / total) * 100)
}

/**
 * Health check endpoint
 */
export async function GET() {
  try {
    const hasCredentials = !!(process.env.GOOGLE_APPLICATION_CREDENTIALS || process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON)
    
    const authMethod = process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON 
      ? 'Service Account (JSON)'
      : process.env.GOOGLE_APPLICATION_CREDENTIALS 
        ? 'Service Account (File)'
        : 'Not Configured'

    return NextResponse.json({
      status: 'online',
      configured: hasCredentials,
      authMethod,
      provider: 'Google Cloud Vision',
      message: hasCredentials 
        ? `OCR service is beschikbaar (${authMethod})`
        : 'OCR service is NOT configured - add Google Cloud credentials'
    })
  } catch (error: any) {
    return NextResponse.json({
      status: 'error',
      message: error.message
    }, { status: 500 })
  }
}
