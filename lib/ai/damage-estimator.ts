/**
 * AI Damage Estimator - Claude Vision
 * 
 * Analyseert foto's van autoschade en geeft:
 * - Geschatte schadebedrag (range)
 * - Confidence score
 * - Type schade
 * - Expert beslissing
 * - Gedetailleerde analyse
 */

import { anthropic } from '@ai-sdk/anthropic'
import { generateText } from 'ai'

export interface DamageEstimateInput {
  photoUrls: string[]          // URLs van schade foto's
  photoBase64?: string[]       // Of base64 encoded images
  beschrijving: string         // Tekst beschrijving van ongeval
  ocrData?: any                // Data uit schadeformulier
  kenteken?: string            // Voor type auto lookup
  existingAnalysis?: string    // Bestaande AI analyse (voor heranalyse)
}

export interface DamageEstimateResult {
  // Schade inschatting
  estimated_min: number        // Minimum geschat bedrag (€)
  estimated_max: number        // Maximum geschat bedrag (€)
  confidence: number           // 0-100 confidence score
  
  // Type schade
  damage_type: 'bumper' | 'deur' | 'spatbord' | 'motorkap' | 'achterkant' | 'zijkant' | 'glas' | 'total_loss' | 'multiple' | 'onbekend'
  damage_severity: 'licht' | 'matig' | 'zwaar' | 'total_loss'
  damage_locations: string[]   // Specifieke locaties van schade
  
  // Expert beslissing
  expert_needed: boolean
  expert_reason: string
  
  // Analyse details
  visible_damage: string[]     // Zichtbare schade punten
  repair_type: 'spot_repair' | 'vervangen' | 'uitdeuken' | 'spuiten' | 'combinatie' | 'onbekend'
  estimated_repair_days: number
  
  // Aansprakelijkheid hints (uit foto's)
  liability_indicators: string[]
  
  // Volledige AI analyse
  full_analysis: string
  
  // Metadata
  photos_analyzed: number
  processing_time_ms: number
}

/**
 * Analyseer schade foto's met Claude Vision
 */
export async function estimateDamage(input: DamageEstimateInput): Promise<DamageEstimateResult> {
  const startTime = Date.now()
  
  console.log('🔍 Starting AI damage estimation...')
  console.log('   Photos to analyze:', input.photoUrls?.length || input.photoBase64?.length || 0)
  
  // Bouw image content voor AI SDK
  const imageContent: Array<{ type: 'image'; image: URL | string }> = []
  
  // Via URL
  if (input.photoUrls && input.photoUrls.length > 0) {
    for (const url of input.photoUrls.slice(0, 5)) { // Max 5 foto's
      imageContent.push({
        type: 'image',
        image: new URL(url),
      })
    }
  }
  
  // Via Base64
  if (input.photoBase64 && input.photoBase64.length > 0) {
    for (const base64 of input.photoBase64.slice(0, 5)) {
      // Strip data URI prefix if present, keep as data URL for AI SDK
      const dataUrl = base64.startsWith('data:') 
        ? base64 
        : `data:image/jpeg;base64,${base64}`
      
      imageContent.push({
        type: 'image',
        image: dataUrl,
      })
    }
  }
  
  // Als geen foto's, geef fallback
  if (imageContent.length === 0) {
    console.log('⚠️ No photos provided, using text-only estimation')
    return estimateFromTextOnly(input, startTime)
  }
  
  // Bouw prompt
  const prompt = buildDamageEstimationPrompt(input)
  
  try {
    const { text: responseText } = await generateText({
      model: anthropic('claude-sonnet-4-20250514'),
      messages: [
        {
          role: 'user',
          content: [
            ...imageContent,
            {
              type: 'text',
              text: prompt,
            },
          ],
        },
      ],
    })
    
    console.log('✅ Vision analysis completed')
    
    // Parse response
    const result = parseDamageEstimateResponse(responseText, imageContent.length, startTime)
    
    console.log('📊 Damage estimation results:')
    console.log('   Estimated: €', result.estimated_min, '-', result.estimated_max)
    console.log('   Confidence:', result.confidence + '%')
    console.log('   Expert needed:', result.expert_needed)
    console.log('   Damage type:', result.damage_type)
    
    return result
    
  } catch (error) {
    console.error('❌ Vision analysis failed:', error)
    // Fallback to text-only
    return estimateFromTextOnly(input, startTime)
  }
}

/**
 * Build comprehensive prompt for damage estimation
 */
function buildDamageEstimationPrompt(input: DamageEstimateInput): string {
  return `
Je bent een expert autoschade taxateur. Analyseer de foto('s) van de autoschade en geef een gedetailleerde inschatting.

CONTEXT ONGEVAL:
${input.beschrijving}

${input.ocrData ? `OCR DATA VAN SCHADEFORMULIER:
${JSON.stringify(input.ocrData, null, 2)}` : ''}

${input.existingAnalysis ? `EERDERE AI ANALYSE:
${input.existingAnalysis}` : ''}

TAAK:
Analyseer de foto('s) grondig en bepaal:

1. SCHADE INSCHATTING
   - Schat het schadebedrag (geef een RANGE: minimum - maximum)
   - Nederlandse reparatiekosten 2026 prijsniveau
   - Houd rekening met arbeidsloon €75-95/uur en onderdelen prijzen

2. TYPE SCHADE
   - Welk type schade zie je? (bumper, deur, spatbord, etc.)
   - Ernst: licht/matig/zwaar/total_loss
   - Specifieke locaties op het voertuig

3. EXPERT BESLISSING
   - Is een fysieke expert nodig voor taxatie?
   - Expert NODIG als:
     * Schade > €5.000
     * Confidence < 70%
     * Mogelijk structurele schade
     * Total loss verdacht
     * Moeilijk te beoordelen uit foto's
   - Expert NIET nodig als:
     * Duidelijke kosmetische schade < €2.500
     * Hoge confidence (> 85%)
     * Standaard bumper/spatbord schade

4. REPARATIE TYPE
   - Spot repair, vervangen, uitdeuken, spuiten, of combinatie?
   - Geschatte reparatieduur in dagen

5. AANSPRAKELIJKHEID HINTS
   - Zie je in de foto's aanwijzingen voor wie schuldig is?
   - Impacthoeken, remsporen, posities?

GEEF ANTWOORD IN DIT EXACTE JSON FORMAT:
{
  "estimated_min": 1500,
  "estimated_max": 2500,
  "confidence": 75,
  "damage_type": "bumper|deur|spatbord|motorkap|achterkant|zijkant|glas|total_loss|multiple|onbekend",
  "damage_severity": "licht|matig|zwaar|total_loss",
  "damage_locations": ["achterbumper links", "achterlicht links"],
  "expert_needed": false,
  "expert_reason": "Duidelijke bumper schade, standaard reparatie mogelijk, hoge confidence",
  "visible_damage": ["deuk in bumper", "kras 30cm", "kapot achterlicht"],
  "repair_type": "spot_repair|vervangen|uitdeuken|spuiten|combinatie|onbekend",
  "estimated_repair_days": 3,
  "liability_indicators": ["Impact van achteren suggereert kop-staartbotsing"],
  "full_analysis": "Uitgebreide analyse in Nederlands... (2-3 alinea's)"
}

BELANGRIJK:
- Geef ALLEEN het JSON object terug, geen extra tekst
- Wees realistisch met bedragen (Nederlandse prijzen 2026)
- Bij twijfel: expert_needed = true
- Confidence moet reflecteren hoe zeker je bent

BEGIN JSON:
`.trim()
}

/**
 * Parse Claude's damage estimate response
 */
function parseDamageEstimateResponse(text: string, photosAnalyzed: number, startTime: number): DamageEstimateResult {
  try {
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error('No JSON found in response')
    }
    
    const parsed = JSON.parse(jsonMatch[0])
    
    return {
      estimated_min: parsed.estimated_min || 0,
      estimated_max: parsed.estimated_max || 0,
      confidence: Math.min(100, Math.max(0, parsed.confidence || 50)),
      damage_type: parsed.damage_type || 'onbekend',
      damage_severity: parsed.damage_severity || 'matig',
      damage_locations: parsed.damage_locations || [],
      expert_needed: parsed.expert_needed ?? true, // Default true bij twijfel
      expert_reason: parsed.expert_reason || 'Geen reden opgegeven',
      visible_damage: parsed.visible_damage || [],
      repair_type: parsed.repair_type || 'onbekend',
      estimated_repair_days: parsed.estimated_repair_days || 5,
      liability_indicators: parsed.liability_indicators || [],
      full_analysis: parsed.full_analysis || text,
      photos_analyzed: photosAnalyzed,
      processing_time_ms: Date.now() - startTime,
    }
  } catch (error) {
    console.error('❌ Failed to parse damage estimate:', error)
    
    // Return safe defaults
    return {
      estimated_min: 0,
      estimated_max: 0,
      confidence: 0,
      damage_type: 'onbekend',
      damage_severity: 'matig',
      damage_locations: [],
      expert_needed: true,
      expert_reason: 'Kon schade niet automatisch inschatten - handmatige review vereist',
      visible_damage: [],
      repair_type: 'onbekend',
      estimated_repair_days: 0,
      liability_indicators: [],
      full_analysis: 'AI analyse mislukt: ' + (error instanceof Error ? error.message : 'Onbekende fout'),
      photos_analyzed: photosAnalyzed,
      processing_time_ms: Date.now() - startTime,
    }
  }
}

/**
 * Fallback: estimate from text description only
 */
function estimateFromTextOnly(input: DamageEstimateInput, startTime: number): DamageEstimateResult {
  console.log('📝 Using text-only damage estimation')
  
  const beschrijving = input.beschrijving.toLowerCase()
  
  // Heuristische schatting op basis van keywords
  let estimated_min = 500
  let estimated_max = 1500
  let confidence = 30
  let damage_type: DamageEstimateResult['damage_type'] = 'onbekend'
  let damage_severity: DamageEstimateResult['damage_severity'] = 'matig'
  
  // Bumper schade
  if (beschrijving.includes('bumper')) {
    damage_type = 'bumper'
    estimated_min = 800
    estimated_max = 2500
    confidence = 40
  }
  
  // Deur schade
  if (beschrijving.includes('deur') || beschrijving.includes('portier')) {
    damage_type = 'deur'
    estimated_min = 1000
    estimated_max = 3500
    confidence = 35
  }
  
  // Total loss indicators
  if (beschrijving.includes('total loss') || beschrijving.includes('total') || beschrijving.includes('complete')) {
    damage_type = 'total_loss'
    damage_severity = 'total_loss'
    estimated_min = 5000
    estimated_max = 15000
    confidence = 25
  }
  
  // Ernst indicators
  if (beschrijving.includes('kleine') || beschrijving.includes('lichte') || beschrijving.includes('kras')) {
    damage_severity = 'licht'
    estimated_min = Math.max(200, estimated_min * 0.5)
    estimated_max = estimated_max * 0.6
  }
  
  if (beschrijving.includes('zware') || beschrijving.includes('grote') || beschrijving.includes('flink')) {
    damage_severity = 'zwaar'
    estimated_min = estimated_min * 1.5
    estimated_max = estimated_max * 2
  }
  
  return {
    estimated_min: Math.round(estimated_min),
    estimated_max: Math.round(estimated_max),
    confidence,
    damage_type,
    damage_severity,
    damage_locations: [],
    expert_needed: true, // Altijd expert bij text-only
    expert_reason: 'Geen foto\'s beschikbaar - fysieke inspectie vereist voor accurate inschatting',
    visible_damage: [],
    repair_type: 'onbekend',
    estimated_repair_days: 5,
    liability_indicators: [],
    full_analysis: `Inschatting op basis van tekst beschrijving (geen foto's). Type: ${damage_type}, Ernst: ${damage_severity}. Voor accurate inschatting zijn foto's vereist.`,
    photos_analyzed: 0,
    processing_time_ms: Date.now() - startTime,
  }
}

/**
 * Bepaal of expert nodig is op basis van diverse factoren
 */
export function shouldNeedExpert(
  estimatedMax: number,
  confidence: number,
  damageSeverity: string,
  damageType: string
): { needed: boolean; reason: string } {
  const reasons: string[] = []
  let needed = false
  
  // Bedrag check
  if (estimatedMax > 5000) {
    needed = true
    reasons.push(`Geschat bedrag > €5.000 (€${estimatedMax})`)
  }
  
  // Confidence check
  if (confidence < 70) {
    needed = true
    reasons.push(`Lage confidence score (${confidence}%)`)
  }
  
  // Severity check
  if (damageSeverity === 'zwaar' || damageSeverity === 'total_loss') {
    needed = true
    reasons.push(`Ernstige schade: ${damageSeverity}`)
  }
  
  // Type check
  if (damageType === 'total_loss' || damageType === 'onbekend') {
    needed = true
    reasons.push(`Schadetpe: ${damageType}`)
  }
  
  if (!needed) {
    return {
      needed: false,
      reason: `Standaard schade, hoge confidence (${confidence}%), bedrag onder €5.000 - automatische afhandeling mogelijk`
    }
  }
  
  return {
    needed: true,
    reason: reasons.join('; ')
  }
}
