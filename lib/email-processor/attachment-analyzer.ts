/**
 * Email Attachment Analyzer
 * 
 * Analyseert bijlagen van inkomende emails:
 * - Foto's → Claude Vision voor schade-analyse
 * - PDF's → OCR/tekst extractie
 * - Triggert heranalyse indien relevant
 */

import { anthropic } from '@ai-sdk/anthropic'
import { generateText } from 'ai'
import { createServiceClient } from '@/lib/supabase/service'
import { put } from '@vercel/blob'
import { logAuditAction } from '@/lib/audit/logger'

export interface AttachmentData {
  filename: string
  content_type: string
  content: string // base64
  size: number
}

export interface AttachmentAnalysisResult {
  filename: string
  type: 'image' | 'pdf' | 'document' | 'unknown'
  analysis: {
    is_damage_photo: boolean
    is_document: boolean
    is_invoice: boolean
    is_expertise_report: boolean
    damage_estimate?: {
      min: number
      max: number
      confidence: number
    }
    extracted_text?: string
    summary: string
    relevance_score: number // 0-100
  }
  stored_url?: string
  triggered_reanalysis: boolean
}

/**
 * Analyze all attachments from an email
 */
export async function analyzeEmailAttachments(
  emailId: string,
  claimId: string | null,
  attachments: AttachmentData[]
): Promise<AttachmentAnalysisResult[]> {
  console.log('📎 Analyzing', attachments.length, 'attachment(s)')
  
  const results: AttachmentAnalysisResult[] = []
  const supabase = createServiceClient()
  
  for (const attachment of attachments) {
    console.log('   Processing:', attachment.filename, '(' + attachment.content_type + ')')
    
    try {
      const result = await analyzeAttachment(attachment)
      
      // Store if relevant and linked to claim
      if (claimId && result.analysis.relevance_score > 50) {
        const stored = await storeAttachment(supabase, claimId, emailId, attachment, result)
        result.stored_url = stored.url
        result.triggered_reanalysis = stored.triggeredReanalysis
      }
      
      results.push(result)
    } catch (error) {
      console.error('   ❌ Failed to analyze:', attachment.filename, error)
      results.push({
        filename: attachment.filename,
        type: 'unknown',
        analysis: {
          is_damage_photo: false,
          is_document: false,
          is_invoice: false,
          is_expertise_report: false,
          summary: 'Analyse mislukt: ' + (error instanceof Error ? error.message : 'Onbekende fout'),
          relevance_score: 0,
        },
        triggered_reanalysis: false,
      })
    }
  }
  
  return results
}

/**
 * Analyze a single attachment
 */
async function analyzeAttachment(attachment: AttachmentData): Promise<AttachmentAnalysisResult> {
  const isImage = attachment.content_type.startsWith('image/')
  const isPdf = attachment.content_type === 'application/pdf'
  
  if (isImage) {
    return analyzeImageAttachment(attachment)
  } else if (isPdf) {
    return analyzePdfAttachment(attachment)
  } else {
    return {
      filename: attachment.filename,
      type: 'document',
      analysis: {
        is_damage_photo: false,
        is_document: true,
        is_invoice: false,
        is_expertise_report: false,
        summary: 'Document type niet ondersteund voor automatische analyse',
        relevance_score: 30,
      },
      triggered_reanalysis: false,
    }
  }
}

/**
 * Analyze image attachment with Claude Vision
 */
async function analyzeImageAttachment(attachment: AttachmentData): Promise<AttachmentAnalysisResult> {
  const prompt = `
Analyseer deze afbeelding in de context van een autoschade claim.

Bepaal:
1. Is dit een foto van autoschade?
2. Is dit een document (factuur, rapport, etc.)?
3. Als schade: schat het schadebedrag
4. Relevantie voor een claim (0-100%)

Geef antwoord in JSON:
{
  "is_damage_photo": true/false,
  "is_document": true/false,
  "is_invoice": true/false,
  "is_expertise_report": true/false,
  "damage_estimate": {"min": 0, "max": 0, "confidence": 0} of null,
  "summary": "Korte beschrijving in Nederlands",
  "relevance_score": 85
}
`.trim()

  try {
    const imageDataUrl = `data:${attachment.content_type};base64,${attachment.content}`
    
    const { text } = await generateText({
      model: anthropic('claude-sonnet-4-20250514'),
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              image: imageDataUrl,
            },
            { type: 'text', text: prompt },
          ],
        },
      ],
      maxTokens: 500,
    })
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    
    if (!jsonMatch) throw new Error('No JSON in response')
    
    const parsed = JSON.parse(jsonMatch[0])
    
    return {
      filename: attachment.filename,
      type: 'image',
      analysis: {
        is_damage_photo: parsed.is_damage_photo || false,
        is_document: parsed.is_document || false,
        is_invoice: parsed.is_invoice || false,
        is_expertise_report: parsed.is_expertise_report || false,
        damage_estimate: parsed.damage_estimate || undefined,
        summary: parsed.summary || 'Geen samenvatting',
        relevance_score: parsed.relevance_score || 50,
      },
      triggered_reanalysis: false,
    }
  } catch (error) {
    console.error('Vision analysis failed:', error)
    return {
      filename: attachment.filename,
      type: 'image',
      analysis: {
        is_damage_photo: false,
        is_document: false,
        is_invoice: false,
        is_expertise_report: false,
        summary: 'Afbeelding analyse mislukt',
        relevance_score: 50, // Assume moderate relevance
      },
      triggered_reanalysis: false,
    }
  }
}

/**
 * Analyze PDF attachment (extract text)
 */
async function analyzePdfAttachment(attachment: AttachmentData): Promise<AttachmentAnalysisResult> {
  // For now, just basic classification based on filename
  const filename = attachment.filename.toLowerCase()
  
  const isInvoice = filename.includes('factuur') || filename.includes('invoice') || filename.includes('rekening')
  const isExpertise = filename.includes('expertise') || filename.includes('rapport') || filename.includes('taxatie')
  
  return {
    filename: attachment.filename,
    type: 'pdf',
    analysis: {
      is_damage_photo: false,
      is_document: true,
      is_invoice: isInvoice,
      is_expertise_report: isExpertise,
      summary: isExpertise 
        ? 'Mogelijk expertise rapport - handmatige review aanbevolen'
        : isInvoice 
          ? 'Factuur document gedetecteerd'
          : 'PDF document',
      relevance_score: isExpertise ? 90 : isInvoice ? 85 : 60,
    },
    triggered_reanalysis: false,
  }
}

/**
 * Store attachment in blob storage and database
 */
async function storeAttachment(
  supabase: ReturnType<typeof createServiceClient>,
  claimId: string,
  emailId: string,
  attachment: AttachmentData,
  analysis: AttachmentAnalysisResult
): Promise<{ url: string; triggeredReanalysis: boolean }> {
  // Upload to blob
  const buffer = Buffer.from(attachment.content, 'base64')
  const sanitizedName = attachment.filename.replace(/[^a-zA-Z0-9.-]/g, '_')
  const blobPath = `claims/${claimId}/email-attachments/${Date.now()}-${sanitizedName}`
  
  const blob = await put(blobPath, buffer, {
    access: 'public',
    contentType: attachment.content_type,
  })
  
  // Save to database
  const { data: document } = await supabase
    .from('claim_documents')
    .insert({
      claim_id: claimId,
      uploaded_by: 'verzekeraar',
      file_name: attachment.filename,
      file_url: blob.url,
      file_type: analysis.type,
      file_size_bytes: attachment.size,
      ai_analyzed: true,
      ai_analyzed_at: new Date().toISOString(),
      ai_analysis: analysis.analysis,
    })
    .select()
    .single()
  
  // Determine if reanalysis should be triggered
  const shouldTriggerReanalysis = 
    analysis.analysis.is_damage_photo || 
    analysis.analysis.is_expertise_report ||
    analysis.analysis.damage_estimate !== undefined
  
  if (shouldTriggerReanalysis) {
    // Mark claim for reanalysis
    await supabase
      .from('claims')
      .update({
        reanalysis_needed: true,
        reanalysis_reason: `Nieuwe bijlage via email: ${attachment.filename} (${analysis.analysis.summary})`,
        updated_at: new Date().toISOString(),
      })
      .eq('id', claimId)
    
    // Log
    await logAuditAction({
      claimId,
      actionType: 'email_attachment_processed',
      performedBy: 'SYSTEM',
      details: {
        email_id: emailId,
        filename: attachment.filename,
        analysis: analysis.analysis,
        triggered_reanalysis: true,
      },
      severity: 'info',
    })
  }
  
  return {
    url: blob.url,
    triggeredReanalysis: shouldTriggerReanalysis,
  }
}
