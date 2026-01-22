/**
 * AI Email Analyzer - BEAST MODE 🔥
 * 
 * Claude-powered email analysis met:
 * - Type classificatie
 * - Claim matching
 * - Sentiment analysis
 * - Priority scoring
 * - Entity extraction
 * - Action recommendations
 */

import { anthropic } from '@ai-sdk/anthropic'
import { generateText } from 'ai'

export interface EmailAnalysisInput {
  from_email: string
  from_name?: string
  subject: string
  body_text: string
  body_html?: string
  has_attachments: boolean
  attachment_filenames?: string[]
}

export interface EmailAnalysisResult {
  // Classification
  email_type: 'liability_acceptance' | 'rejection' | 'information_request' | 'settlement_offer' | 'acknowledgment' | 'other'
  confidence_score: number // 0-100
  
  // Sentiment
  sentiment: 'positive' | 'negative' | 'neutral'
  sentiment_score: number // -1 to 1
  
  // Priority
  priority: 'urgent' | 'high' | 'normal' | 'low'
  urgency_score: number // 0-100
  
  // Claim matching data
  detected_claim_references: string[]
  detected_license_plates: string[]
  detected_names: string[]
  detected_policy_numbers: string[]
  detected_amounts: number[]
  detected_dates: string[]
  
  // Actions
  requires_response: boolean
  requires_admin_action: boolean
  suggested_actions: string[]
  suggested_status_change?: string
  
  // Summaries
  summary_nl: string
  key_points: string[]
  
  // Language
  detected_language: string
  
  // Processing metadata
  processing_time_ms: number
  tokens_used?: number
  raw_ai_response: string
}

/**
 * Analyze email using Claude AI
 */
export async function analyzeEmail(input: EmailAnalysisInput): Promise<EmailAnalysisResult> {
  const startTime = Date.now()
  
  // Construct comprehensive prompt for Claude
  const prompt = buildAnalysisPrompt(input)
  
  console.log('🤖 Starting AI email analysis...')
  console.log('   From:', input.from_email)
  console.log('   Subject:', input.subject)
  
  try {
    const { text, usage } = await generateText({
      model: anthropic('claude-sonnet-4-20250514'),
      prompt: prompt,
      temperature: 0.3, // Lower for consistency
      maxTokens: 2000,
    })

    console.log('✅ AI analysis completed')
    console.log('   Response length:', text.length)
    console.log('   Tokens used:', usage?.totalTokens || 'unknown')

    // Parse Claude's structured response
    const result = parseAIResponse(text)
    
    // Add metadata
    result.processing_time_ms = Date.now() - startTime
    result.tokens_used = usage?.totalTokens
    result.raw_ai_response = text

    console.log('📊 Analysis results:')
    console.log('   Type:', result.email_type)
    console.log('   Confidence:', result.confidence_score + '%')
    console.log('   Sentiment:', result.sentiment)
    console.log('   Priority:', result.priority)
    console.log('   Claim refs found:', result.detected_claim_references.length)

    return result

  } catch (error) {
    console.error('❌ AI analysis failed:', error)
    
    // Fallback: basic analysis zonder AI
    return generateFallbackAnalysis(input, Date.now() - startTime)
  }
}

/**
 * Build comprehensive prompt for Claude
 */
function buildAnalysisPrompt(input: EmailAnalysisInput): string {
  return `
Je bent een expert AI assistent voor een schadeverhalen bedrijf. 
Analyseer de volgende email van een verzekeraar en extraheer ALLE relevante informatie.

EMAIL GEGEVENS:
Van: ${input.from_email}${input.from_name ? ` (${input.from_name})` : ''}
Onderwerp: ${input.subject}
Heeft bijlagen: ${input.has_attachments ? 'Ja' : 'Nee'}
${input.attachment_filenames ? `Bijlagen: ${input.attachment_filenames.join(', ')}` : ''}

INHOUD:
${input.body_text}

TAAK:
Analyseer deze email grondig en geef een gestructureerd antwoord in JSON format.

BELANGRIJK:
1. Detecteer het TYPE email:
   - liability_acceptance: Verzekeraar erkent aansprakelijkheid
   - rejection: Verzekeraar wijst claim af
   - information_request: Verzekeraar vraagt om meer info
   - settlement_offer: Verzekeraar doet schikkingsvoorstel
   - acknowledgment: Verzekeraar bevestigt ontvangst
   - other: Anders

2. Zoek ALLE claim referenties:
   - Claim IDs (REF-xxxx, CLAIM-xxxx, of andere referenties)
   - Kentekens (XX-XX-XX format of varianten)
   - Namen van personen
   - Polisnummers
   - Bedragen (in euros)
   - Data (DD-MM-YYYY of varianten)

3. Bepaal SENTIMENT:
   - positive: Cooperatief, accepterend, vriendelijk
   - negative: Afwijzend, vijandig, problematisch
   - neutral: Zakelijk, informatief

4. Bepaal PRIORITY:
   - urgent: Directe actie vereist (juridische termijnen, deadlines)
   - high: Snel reageren gewenst (binnen 1-2 dagen)
   - normal: Standaard behandeling (binnen week)
   - low: Kan wachten

5. ACTIES:
   - Wat moet er gebeuren?
   - Moet admin dit zien?
   - Welke status zou claim moeten krijgen?

6. SAMENVATTING:
   - Nederlandse samenvatting (2-3 zinnen)
   - Belangrijkste punten (bullets)

GEEF ANTWOORD IN DIT EXACTE JSON FORMAT:
{
  "email_type": "liability_acceptance|rejection|information_request|settlement_offer|acknowledgment|other",
  "confidence_score": 85,
  "sentiment": "positive|negative|neutral",
  "sentiment_score": 0.8,
  "priority": "urgent|high|normal|low",
  "urgency_score": 75,
  "detected_claim_references": ["REF-12345", "CLAIM-ABC"],
  "detected_license_plates": ["AB-12-CD"],
  "detected_names": ["Jan Jansen", "Piet Pietersen"],
  "detected_policy_numbers": ["POL12345"],
  "detected_amounts": [1500.50, 2000],
  "detected_dates": ["2026-01-15", "2026-02-20"],
  "requires_response": true,
  "requires_admin_action": false,
  "suggested_actions": ["Update status to in_onderhandeling", "Notify claimer"],
  "suggested_status_change": "in_onderhandeling",
  "summary_nl": "Verzekeraar ANWB erkent aansprakelijkheid en vraagt om herstelofferte. Positieve reactie.",
  "key_points": ["Aansprakelijkheid erkend", "Herstelofferte gevraagd", "Reactie binnen 5 werkdagen"],
  "detected_language": "nl"
}

BELANGRIJK: 
- Geef ALLEEN het JSON object terug, geen extra tekst
- Alle velden moeten aanwezig zijn
- Arrays mogen leeg zijn [] als niets gevonden
- Confidence score: 0-100 (hoe zeker ben je van de classificatie?)
- Sentiment score: -1 (zeer negatief) tot 1 (zeer positief)
- Urgency score: 0-100 (hoe urgent is dit?)

BEGIN JSON:
`.trim()
}

/**
 * Parse Claude's JSON response
 */
function parseAIResponse(text: string): EmailAnalysisResult {
  try {
    // Extract JSON from response (Claude sometimes adds extra text)
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error('No JSON found in response')
    }

    const parsed = JSON.parse(jsonMatch[0])
    
    // Validate required fields
    if (!parsed.email_type || parsed.confidence_score === undefined) {
      throw new Error('Missing required fields in AI response')
    }

    // Return structured result
    return {
      email_type: parsed.email_type,
      confidence_score: Math.min(100, Math.max(0, parsed.confidence_score)),
      sentiment: parsed.sentiment || 'neutral',
      sentiment_score: parsed.sentiment_score || 0,
      priority: parsed.priority || 'normal',
      urgency_score: parsed.urgency_score || 50,
      detected_claim_references: parsed.detected_claim_references || [],
      detected_license_plates: parsed.detected_license_plates || [],
      detected_names: parsed.detected_names || [],
      detected_policy_numbers: parsed.detected_policy_numbers || [],
      detected_amounts: parsed.detected_amounts || [],
      detected_dates: parsed.detected_dates || [],
      requires_response: parsed.requires_response || false,
      requires_admin_action: parsed.requires_admin_action || false,
      suggested_actions: parsed.suggested_actions || [],
      suggested_status_change: parsed.suggested_status_change,
      summary_nl: parsed.summary_nl || 'Geen samenvatting beschikbaar',
      key_points: parsed.key_points || [],
      detected_language: parsed.detected_language || 'nl',
      processing_time_ms: 0,
      raw_ai_response: text,
    }
  } catch (error) {
    console.error('❌ Failed to parse AI response:', error)
    console.error('   Raw response:', text.substring(0, 200))
    throw new Error(`AI response parsing failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

/**
 * Fallback analysis (basic heuristics) als AI faalt
 */
function generateFallbackAnalysis(input: EmailAnalysisInput, processingTime: number): EmailAnalysisResult {
  console.log('⚠️  Using fallback analysis (AI failed)')
  
  const subject = input.subject.toLowerCase()
  const body = input.body_text.toLowerCase()
  const combined = subject + ' ' + body

  // Basic type detection
  let email_type: EmailAnalysisResult['email_type'] = 'other'
  let confidence_score = 40

  if (combined.includes('aansprakelijk') && combined.includes('erkenn')) {
    email_type = 'liability_acceptance'
    confidence_score = 60
  } else if (combined.includes('afwijs') || combined.includes('weiger')) {
    email_type = 'rejection'
    confidence_score = 60
  } else if (combined.includes('informatie') || combined.includes('vraag') || combined.includes('gegevens')) {
    email_type = 'information_request'
    confidence_score = 55
  } else if (combined.includes('ontvangst bevestig') || combined.includes('in behandeling')) {
    email_type = 'acknowledgment'
    confidence_score = 50
  }

  // Basic reference detection
  const refMatches = combined.match(/ref[:\-\s]*([a-z0-9\-]+)/gi) || []
  const licensePlateMatches = combined.match(/[a-z]{1,3}[\-\s]?[0-9]{1,3}[\-\s]?[a-z]{1,3}/gi) || []
  
  // Basic sentiment
  const positiveWords = ['erkenn', 'akkoord', 'schikk', 'vergoed', 'toe']
  const negativeWords = ['afwijs', 'weiger', 'geen', 'niet aansprakelijk']
  const positive = positiveWords.some(w => combined.includes(w))
  const negative = negativeWords.some(w => combined.includes(w))
  
  const sentiment: EmailAnalysisResult['sentiment'] = positive ? 'positive' : negative ? 'negative' : 'neutral'
  const sentiment_score = positive ? 0.7 : negative ? -0.7 : 0

  return {
    email_type,
    confidence_score,
    sentiment,
    sentiment_score,
    priority: 'normal',
    urgency_score: 50,
    detected_claim_references: refMatches.map(m => m.trim()),
    detected_license_plates: licensePlateMatches.map(m => m.trim()),
    detected_names: [],
    detected_policy_numbers: [],
    detected_amounts: [],
    detected_dates: [],
    requires_response: email_type === 'information_request',
    requires_admin_action: confidence_score < 60,
    suggested_actions: ['Review manually - AI analysis failed'],
    suggested_status_change: undefined,
    summary_nl: `Email van ${input.from_email} - Handmatige review vereist (AI analyse mislukt)`,
    key_points: ['AI analyse mislukt', 'Handmatige review nodig'],
    detected_language: 'nl',
    processing_time_ms: processingTime,
    raw_ai_response: 'FALLBACK_ANALYSIS',
  }
}

/**
 * Helper: Determine if analysis result should trigger auto-update
 */
export function shouldAutoUpdate(analysis: EmailAnalysisResult): boolean {
  // Only auto-update if:
  // 1. High confidence (> 85%)
  // 2. Clear action type (not 'other')
  // 3. Doesn't require admin action
  // 4. Has suggested status change
  
  return (
    analysis.confidence_score > 85 &&
    analysis.email_type !== 'other' &&
    !analysis.requires_admin_action &&
    !!analysis.suggested_status_change
  )
}

/**
 * Helper: Get human-readable email type in Dutch
 */
export function getEmailTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    liability_acceptance: 'Aansprakelijkheid Erkend',
    rejection: 'Afwijzing',
    information_request: 'Informatieverzoek',
    settlement_offer: 'Schikkingsvoorstel',
    acknowledgment: 'Ontvangstbevestiging',
    other: 'Anders',
  }
  return labels[type] || 'Onbekend'
}

/**
 * Helper: Get priority color for UI
 */
export function getPriorityColor(priority: string): string {
  const colors: Record<string, string> = {
    urgent: 'red',
    high: 'orange',
    normal: 'blue',
    low: 'gray',
  }
  return colors[priority] || 'gray'
}
