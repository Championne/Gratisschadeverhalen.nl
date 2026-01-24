/**
 * AI Claim Analyzer - Centrale AI processing
 * 
 * Combineert alle AI analyses:
 * - Letselschade screening
 * - Aansprakelijkheid beoordeling
 * - Schade inschatting (Vision)
 * - Expert beslissing
 * - Auto/manual processing beslissing
 */

import { anthropic } from '@ai-sdk/anthropic'
import { generateText } from 'ai'
import { estimateDamage, DamageEstimateResult, shouldNeedExpert } from './damage-estimator'
import { logAuditAction } from '@/lib/audit/logger'

export interface ClaimAnalysisInput {
  claimId: string
  naam: string
  email: string
  telefoon: string
  datum_ongeval: string
  plaats_ongeval?: string
  beschrijving: string
  kenteken_tegenpartij: string
  naam_tegenpartij?: string
  verzekeraar_tegenpartij?: string
  polisnummer_tegenpartij?: string
  ocr_data?: any
  ocr_confidence?: number
  photo_urls?: string[]
  photo_base64?: string[]
  existing_ai_notes?: string
  is_reanalysis?: boolean
  reanalysis_reason?: string
}

export interface ClaimAnalysisResult {
  // Letselschade
  mogelijk_letselschade: boolean
  letselschade_keywords: string[]
  letselschade_confidence: number
  
  // Aansprakelijkheid
  liability_percentage: number
  liability_confidence: number
  liability_reasoning: string
  
  // Schade inschatting
  damage_estimate: DamageEstimateResult | null
  
  // Expert beslissing
  expert_needed: boolean
  expert_reason: string
  
  // Automatische verwerking
  can_auto_process: boolean
  auto_process_blockers: string[]
  
  // Status aanbeveling
  recommended_status: string
  
  // Escalatie
  should_escalate: boolean
  escalation_reason?: string
  
  // Volledige analyse
  ai_notes: string
  
  // Metadata
  analysis_version: number
  processing_time_ms: number
}

/**
 * Voer volledige claim analyse uit
 */
export async function analyzeClaimFull(input: ClaimAnalysisInput): Promise<ClaimAnalysisResult> {
  const startTime = Date.now()
  console.log('🤖 === FULL CLAIM ANALYSIS START ===')
  console.log('   Claim ID:', input.claimId)
  console.log('   Is reanalysis:', input.is_reanalysis || false)
  console.log('   Photos:', input.photo_urls?.length || input.photo_base64?.length || 0)
  
  // Log start
  await logAuditAction({
    claimId: input.claimId,
    actionType: 'ai_analyse',
    performedBy: 'AI',
    details: {
      analysis_type: input.is_reanalysis ? 'reanalysis' : 'initial',
      reanalysis_reason: input.reanalysis_reason,
      photos_count: (input.photo_urls?.length || 0) + (input.photo_base64?.length || 0),
    },
    severity: 'info',
  })
  
  // Parallel analyses voor snelheid
  const [textAnalysis, damageEstimate] = await Promise.all([
    analyzeClaimText(input),
    (input.photo_urls?.length || input.photo_base64?.length) 
      ? estimateDamage({
          photoUrls: input.photo_urls || [],
          photoBase64: input.photo_base64,
          beschrijving: input.beschrijving,
          ocrData: input.ocr_data,
          existingAnalysis: input.existing_ai_notes,
        })
      : Promise.resolve(null),
  ])
  
  // Combineer resultaten
  const expertDecision = damageEstimate 
    ? shouldNeedExpert(
        damageEstimate.estimated_max,
        damageEstimate.confidence,
        damageEstimate.damage_severity,
        damageEstimate.damage_type
      )
    : { needed: true, reason: 'Geen foto analyse mogelijk - expert vereist' }
  
  // Bepaal of auto-processing mogelijk is
  const autoProcessBlockers: string[] = []
  
  if (textAnalysis.mogelijk_letselschade) {
    autoProcessBlockers.push('Mogelijke letselschade gedetecteerd')
  }
  if (textAnalysis.liability_percentage < 80) {
    autoProcessBlockers.push(`Aansprakelijkheid onzeker (${textAnalysis.liability_percentage}%)`)
  }
  if (!input.verzekeraar_tegenpartij) {
    autoProcessBlockers.push('Verzekeraar tegenpartij onbekend')
  }
  if (expertDecision.needed) {
    autoProcessBlockers.push(`Expert nodig: ${expertDecision.reason}`)
  }
  if (damageEstimate && damageEstimate.confidence < 60) {
    autoProcessBlockers.push(`Lage confidence schade-inschatting (${damageEstimate.confidence}%)`)
  }
  
  const canAutoProcess = autoProcessBlockers.length === 0
  
  // Bepaal escalatie
  const shouldEscalate = !canAutoProcess && (
    !input.verzekeraar_tegenpartij ||
    textAnalysis.liability_percentage < 50 ||
    (damageEstimate && damageEstimate.damage_severity === 'total_loss')
  )
  
  // Bepaal status
  let recommendedStatus = 'in_behandeling'
  if (textAnalysis.mogelijk_letselschade) {
    recommendedStatus = 'letselschade_gedetecteerd'
  } else if (shouldEscalate) {
    recommendedStatus = 'escalated'
  } else if (canAutoProcess) {
    recommendedStatus = 'in_behandeling' // Ready for auto-send
  }
  
  // Bouw volledige AI notes
  const aiNotes = buildAINotes(textAnalysis, damageEstimate, expertDecision, input.is_reanalysis)
  
  const result: ClaimAnalysisResult = {
    mogelijk_letselschade: textAnalysis.mogelijk_letselschade,
    letselschade_keywords: textAnalysis.letselschade_keywords,
    letselschade_confidence: textAnalysis.letselschade_confidence,
    liability_percentage: textAnalysis.liability_percentage,
    liability_confidence: textAnalysis.liability_confidence,
    liability_reasoning: textAnalysis.liability_reasoning,
    damage_estimate: damageEstimate,
    expert_needed: expertDecision.needed,
    expert_reason: expertDecision.reason,
    can_auto_process: canAutoProcess,
    auto_process_blockers: autoProcessBlockers,
    recommended_status: recommendedStatus,
    should_escalate: shouldEscalate,
    escalation_reason: shouldEscalate ? autoProcessBlockers.join('; ') : undefined,
    ai_notes: aiNotes,
    analysis_version: input.is_reanalysis ? 2 : 1,
    processing_time_ms: Date.now() - startTime,
  }
  
  console.log('✅ === FULL CLAIM ANALYSIS COMPLETE ===')
  console.log('   Letselschade:', result.mogelijk_letselschade)
  console.log('   Aansprakelijkheid:', result.liability_percentage + '%')
  console.log('   Expert needed:', result.expert_needed)
  console.log('   Can auto-process:', result.can_auto_process)
  console.log('   Recommended status:', result.recommended_status)
  console.log('   Processing time:', result.processing_time_ms + 'ms')
  
  return result
}

/**
 * Analyseer claim tekst (letselschade + aansprakelijkheid)
 */
async function analyzeClaimText(input: ClaimAnalysisInput): Promise<{
  mogelijk_letselschade: boolean
  letselschade_keywords: string[]
  letselschade_confidence: number
  liability_percentage: number
  liability_confidence: number
  liability_reasoning: string
}> {
  const prompt = `
Analyseer deze autoschade claim:

CLAIMER:
- Naam: ${input.naam}
- Telefoon: ${input.telefoon}

ONGEVAL:
- Datum: ${input.datum_ongeval}
- Plaats: ${input.plaats_ongeval || 'Niet opgegeven'}
- Beschrijving: ${input.beschrijving}

TEGENPARTIJ:
- Kenteken: ${input.kenteken_tegenpartij}
- Naam: ${input.naam_tegenpartij || 'Niet opgegeven'}
- Verzekeraar: ${input.verzekeraar_tegenpartij || 'Niet opgegeven'}

${input.ocr_data ? `OCR DATA:\n${JSON.stringify(input.ocr_data, null, 2)}` : ''}

TAAK:
1. LETSELSCHADE SCREENING
   - Zoek naar POSITIEVE indicaties van letsel
   - Keywords: pijn, whiplash, letsel, gewond, hoofdpijn, nekklachten, rugklachten, ziekenhuis, ambulance
   - NEGEER zinnen als "geen letselschade" of "geen pijn"

2. AANSPRAKELIJKHEID BEOORDELING
   - Wie is waarschijnlijk aansprakelijk? (0-100%)
   - Op basis van: toedracht, type ongeval, verkeersregels

ANTWOORD IN JSON:
{
  "mogelijk_letselschade": false,
  "letselschade_keywords": [],
  "letselschade_confidence": 90,
  "liability_percentage": 95,
  "liability_confidence": 85,
  "liability_reasoning": "Kop-staartbotsing: achteroprijder is in principe 100% aansprakelijk"
}
`.trim()

  try {
    const { text } = await generateText({
      model: anthropic('claude-sonnet-4-20250514'),
      prompt,
      temperature: 0.2,
    })
    
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) throw new Error('No JSON in response')
    
    const parsed = JSON.parse(jsonMatch[0])
    
    return {
      mogelijk_letselschade: parsed.mogelijk_letselschade || false,
      letselschade_keywords: parsed.letselschade_keywords || [],
      letselschade_confidence: parsed.letselschade_confidence || 50,
      liability_percentage: parsed.liability_percentage || 50,
      liability_confidence: parsed.liability_confidence || 50,
      liability_reasoning: parsed.liability_reasoning || 'Geen redenering beschikbaar',
    }
  } catch (error) {
    console.error('❌ Text analysis failed:', error)
    
    // Fallback heuristics
    const beschrijving = input.beschrijving.toLowerCase()
    const letselKeywords = ['pijn', 'whiplash', 'letsel', 'gewond', 'hoofdpijn', 'nekklachten']
    const foundKeywords = letselKeywords.filter(k => beschrijving.includes(k))
    const negativePhrase = ['geen letsel', 'geen pijn', 'zonder letsel'].some(p => beschrijving.includes(p))
    
    return {
      mogelijk_letselschade: foundKeywords.length > 0 && !negativePhrase,
      letselschade_keywords: foundKeywords,
      letselschade_confidence: 40,
      liability_percentage: 50,
      liability_confidence: 30,
      liability_reasoning: 'Fallback analyse - handmatige review aanbevolen',
    }
  }
}

/**
 * Bouw geformatteerde AI notes
 */
function buildAINotes(
  textAnalysis: Awaited<ReturnType<typeof analyzeClaimText>>,
  damageEstimate: DamageEstimateResult | null,
  expertDecision: { needed: boolean; reason: string },
  isReanalysis?: boolean
): string {
  const timestamp = new Date().toISOString()
  const header = isReanalysis ? '# HERANALYSE RESULTAAT' : '# CLAIM ANALYSE RESULTAAT'
  
  let notes = `${header}
Timestamp: ${timestamp}

## 1. Letselschade Screening
**RESULTAAT: ${textAnalysis.mogelijk_letselschade ? 'LETSELSCHADE GEDETECTEERD' : 'GEEN LETSELSCHADE GEDETECTEERD'}**
- Confidence: ${textAnalysis.letselschade_confidence}%
${textAnalysis.letselschade_keywords.length > 0 
  ? `- Keywords: ${textAnalysis.letselschade_keywords.join(', ')}`
  : '- Geen letsel-gerelateerde keywords gevonden'}

## 2. Aansprakelijkheid Beoordeling
**RESULTAAT: ${textAnalysis.liability_percentage}% AANSPRAKELIJKHEID TEGENPARTIJ**
- Confidence: ${textAnalysis.liability_confidence}%
- Reden: ${textAnalysis.liability_reasoning}
`

  if (damageEstimate) {
    notes += `
## 3. Schade Inschatting (Vision Analyse)
**GESCHAT BEDRAG: €${damageEstimate.estimated_min.toLocaleString('nl-NL')} - €${damageEstimate.estimated_max.toLocaleString('nl-NL')}**
- Confidence: ${damageEstimate.confidence}%
- Type schade: ${damageEstimate.damage_type}
- Ernst: ${damageEstimate.damage_severity}
- Locaties: ${damageEstimate.damage_locations.join(', ') || 'Niet bepaald'}
- Reparatie type: ${damageEstimate.repair_type}
- Geschatte reparatieduur: ${damageEstimate.estimated_repair_days} dagen

### Zichtbare schade:
${damageEstimate.visible_damage.map(d => `- ${d}`).join('\n') || '- Niet bepaald'}

### Aansprakelijkheid indicators uit foto\'s:
${damageEstimate.liability_indicators.map(i => `- ${i}`).join('\n') || '- Geen specifieke indicators'}

### Volledige analyse:
${damageEstimate.full_analysis}
`
  }

  notes += `
## 4. Expert Beslissing
**RESULTAAT: ${expertDecision.needed ? 'EXPERT NODIG' : 'GEEN EXPERT NODIG'}**
- Reden: ${expertDecision.reason}

## 5. Automatische Verwerking
**RESULTAAT: ${textAnalysis.liability_percentage >= 80 && !textAnalysis.mogelijk_letselschade ? 'MOGELIJK' : 'NIET MOGELIJK'}**
`

  return notes
}
