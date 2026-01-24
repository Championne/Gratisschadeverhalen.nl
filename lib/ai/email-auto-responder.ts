/**
 * AI Email Auto-Responder
 * 
 * Genereert automatische antwoorden op standaard email types:
 * - Ontvangstbevestigingen
 * - Informatieverzoeken
 * - Schikkingsvoorstellen
 * 
 * Bij complexe zaken → escalatie naar admin
 */

import { anthropic } from '@ai-sdk/anthropic'
import { generateText } from 'ai'
import { createServiceClient } from '@/lib/supabase/service'
import { EmailAnalysisResult } from '@/lib/email-processor/ai-analyzer'

export interface AutoReplyInput {
  emailId: string
  claimId: string
  emailType: EmailAnalysisResult['email_type']
  originalSubject: string
  originalBody: string
  senderEmail: string
  senderName?: string
  claimerName: string
  claimerEmail: string
  verzekeraarName: string
  analysisResult: EmailAnalysisResult
}

export interface AutoReplyResult {
  should_auto_reply: boolean
  reply_subject?: string
  reply_body?: string
  reply_html?: string
  reason: string
  confidence: number
  escalation_needed: boolean
  escalation_reason?: string
}

// Email types die in aanmerking komen voor auto-reply
const AUTO_REPLY_ELIGIBLE_TYPES: EmailAnalysisResult['email_type'][] = [
  'acknowledgment',
  'information_request',
  'settlement_offer',
]

// Types die NOOIT auto-reply krijgen
const NEVER_AUTO_REPLY_TYPES: EmailAnalysisResult['email_type'][] = [
  'rejection',
]

/**
 * Bepaal of en welk auto-reply moet worden gestuurd
 */
export async function generateAutoReply(input: AutoReplyInput): Promise<AutoReplyResult> {
  console.log('🤖 Generating auto-reply for email type:', input.emailType)
  
  // Check of type eligible is
  if (NEVER_AUTO_REPLY_TYPES.includes(input.emailType)) {
    return {
      should_auto_reply: false,
      reason: `Email type '${input.emailType}' komt niet in aanmerking voor auto-reply - escalatie naar admin`,
      confidence: 100,
      escalation_needed: true,
      escalation_reason: `Afwijzing ontvangen van ${input.verzekeraarName} - handmatige review vereist`,
    }
  }
  
  // Check confidence
  if (input.analysisResult.confidence_score < 75) {
    return {
      should_auto_reply: false,
      reason: `Confidence te laag (${input.analysisResult.confidence_score}%) voor auto-reply`,
      confidence: input.analysisResult.confidence_score,
      escalation_needed: true,
      escalation_reason: 'AI confidence te laag om automatisch te reageren',
    }
  }
  
  // Check of admin actie vereist is
  if (input.analysisResult.requires_admin_action) {
    return {
      should_auto_reply: false,
      reason: 'AI heeft bepaald dat admin actie vereist is',
      confidence: input.analysisResult.confidence_score,
      escalation_needed: true,
      escalation_reason: input.analysisResult.suggested_actions.join('; '),
    }
  }
  
  // Eligible voor auto-reply
  if (!AUTO_REPLY_ELIGIBLE_TYPES.includes(input.emailType)) {
    return {
      should_auto_reply: false,
      reason: `Email type '${input.emailType}' niet in auto-reply lijst`,
      confidence: input.analysisResult.confidence_score,
      escalation_needed: false,
    }
  }
  
  // Probeer eerst template te gebruiken
  const templateReply = await getTemplateReply(input)
  if (templateReply) {
    return {
      should_auto_reply: true,
      reply_subject: templateReply.subject,
      reply_body: templateReply.body,
      reply_html: templateReply.html,
      reason: 'Template-based auto-reply',
      confidence: 95,
      escalation_needed: false,
    }
  }
  
  // Fallback: genereer AI reply
  const aiReply = await generateAIReply(input)
  return aiReply
}

/**
 * Haal template-based reply op uit database
 */
async function getTemplateReply(input: AutoReplyInput): Promise<{
  subject: string
  body: string
  html: string
} | null> {
  try {
    const supabase = createServiceClient()
    
    const { data: template, error } = await supabase
      .from('auto_reply_templates')
      .select('*')
      .eq('email_type', input.emailType)
      .eq('is_active', true)
      .eq('use_ai_generation', false)
      .single()
    
    if (error || !template) {
      return null
    }
    
    // Replace placeholders
    const replacements: Record<string, string> = {
      '{{original_subject}}': input.originalSubject,
      '{{claim_id}}': input.claimId,
      '{{claimer_name}}': input.claimerName,
      '{{verzekeraar_name}}': input.verzekeraarName,
      '{{date}}': new Date().toLocaleDateString('nl-NL'),
      '{{reference}}': input.claimId.substring(0, 8).toUpperCase(),
    }
    
    let subject = template.subject_template
    let body = template.body_template
    
    for (const [key, value] of Object.entries(replacements)) {
      subject = subject.replace(new RegExp(key, 'g'), value)
      body = body.replace(new RegExp(key, 'g'), value)
    }
    
    // Generate HTML version
    const html = generateHtmlFromText(body, input.claimerName)
    
    return { subject, body, html }
  } catch (error) {
    console.error('Template lookup failed:', error)
    return null
  }
}

/**
 * Genereer AI-powered reply voor complexere gevallen
 */
async function generateAIReply(input: AutoReplyInput): Promise<AutoReplyResult> {
  console.log('🤖 Generating AI-powered reply...')
  
  const prompt = `
Je bent een professionele medewerker van Autoschadebureau.nl die namens klanten communiceert met verzekeraars.

ONTVANGEN EMAIL:
Van: ${input.senderEmail} (${input.senderName || 'Onbekend'})
Onderwerp: ${input.originalSubject}
Type: ${input.emailType}
Inhoud:
${input.originalBody.substring(0, 2000)}

AI ANALYSE:
${input.analysisResult.summary_nl}
Key points: ${input.analysisResult.key_points.join(', ')}

CONTEXT:
- Claim ID: ${input.claimId}
- Klant naam: ${input.claimerName}
- Verzekeraar: ${input.verzekeraarName}

TAAK:
Schrijf een professionele, zakelijke reactie email in het Nederlands.

REGELS:
1. Gebruik formeel Nederlands ("u" vorm)
2. Bevestig ontvangst van de email
3. Geef aan wat de vervolgstappen zijn
4. Eindig met "Autoschadebureau.nl, namens ${input.claimerName}"
5. Wees bondig maar volledig (max 200 woorden)
6. Noem het referentienummer: ${input.claimId.substring(0, 8).toUpperCase()}

GEEF ANTWOORD IN JSON:
{
  "subject": "Re: onderwerp hier",
  "body": "Tekst van de email hier..."
}
`.trim()

  try {
    const { text } = await generateText({
      model: anthropic('claude-sonnet-4-20250514'),
      prompt,
      temperature: 0.4,
    })
    
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error('No JSON in response')
    }
    
    const parsed = JSON.parse(jsonMatch[0])
    const html = generateHtmlFromText(parsed.body, input.claimerName)
    
    return {
      should_auto_reply: true,
      reply_subject: parsed.subject,
      reply_body: parsed.body,
      reply_html: html,
      reason: 'AI-generated reply',
      confidence: 80,
      escalation_needed: false,
    }
  } catch (error) {
    console.error('AI reply generation failed:', error)
    
    return {
      should_auto_reply: false,
      reason: 'AI reply generation failed: ' + (error instanceof Error ? error.message : 'Unknown error'),
      confidence: 0,
      escalation_needed: true,
      escalation_reason: 'Kon geen automatisch antwoord genereren',
    }
  }
}

/**
 * Convert plain text to styled HTML email
 */
function generateHtmlFromText(body: string, claimerName: string): string {
  const escapedBody = body
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\n/g, '<br>')
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { border-bottom: 2px solid #1e40af; padding-bottom: 15px; margin-bottom: 20px; }
    .logo { font-weight: bold; color: #1e40af; font-size: 18px; }
    .content { margin: 20px 0; }
    .footer { margin-top: 30px; padding-top: 15px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280; }
  </style>
</head>
<body>
  <div class="header">
    <div class="logo">Autoschadebureau.nl</div>
    <div style="font-size: 12px; color: #6b7280;">Namens ${claimerName}</div>
  </div>
  
  <div class="content">
    ${escapedBody}
  </div>
  
  <div class="footer">
    <p><strong>Autoschadebureau.nl</strong> | 100% No Cure No Pay</p>
    <p>Email: info@autoschadebureau.nl | Tel: 085 060 5357</p>
    <p style="font-size: 10px; color: #9ca3af; margin-top: 10px;">
      Dit is een automatisch gegenereerde email. Alle correspondentie wordt gelogd.
    </p>
  </div>
</body>
</html>
  `.trim()
}

/**
 * Check of betwisting complex is en escalatie nodig heeft
 */
export function isComplexDispute(analysis: EmailAnalysisResult): boolean {
  // Complex als:
  // - Afwijzing met lage confidence
  // - Multiple claims references
  // - Negatief sentiment met urgentie
  // - Juridische termen gedetecteerd
  
  if (analysis.email_type === 'rejection') {
    return true
  }
  
  if (analysis.sentiment === 'negative' && analysis.urgency_score > 70) {
    return true
  }
  
  if (analysis.detected_claim_references.length > 1) {
    return true // Meerdere claims betrokken
  }
  
  // Check voor juridische keywords
  const legalKeywords = ['advocaat', 'rechtbank', 'dagvaarding', 'juridisch', 'procedure']
  const bodyLower = analysis.raw_ai_response.toLowerCase()
  if (legalKeywords.some(k => bodyLower.includes(k))) {
    return true
  }
  
  return false
}
