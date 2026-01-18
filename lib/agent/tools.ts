import { tool } from 'ai'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'

/**
 * TOOL 1: Letselschade Screening
 * Analyseert beschrijving op letsel-gerelateerde keywords
 */
export const letselScreeningTool = tool({
  description: 'Screent de ongevalbeschrijving op mogelijke letselschade. Zoekt naar keywords zoals pijn, whiplash, letsel, ziekenhuis, etc.',
  parameters: z.object({
    beschrijving: z.string().describe('De ongevalbeschrijving van de claimer'),
    ocrText: z.string().optional().describe('Optionele OCR tekst uit schadeformulier'),
  }),
  execute: async ({ beschrijving, ocrText }) => {
    // Letsel keywords (Nederlands)
    const letselKeywords = [
      'pijn',
      'whiplash',
      'letsel',
      'ziekenhuis',
      'dokter',
      'arts',
      'ambulance',
      'gewond',
      'hoofdpijn',
      'nekpijn',
      'rugpijn',
      'misselijk',
      'duizelig',
      'bloeden',
      'bloed',
      'blessure',
      'verwonding',
      'kwetsuur',
    ]

    const fullText = `${beschrijving} ${ocrText || ''}`.toLowerCase()
    
    // Check welke keywords gevonden zijn
    const foundKeywords = letselKeywords.filter(keyword => 
      fullText.includes(keyword)
    )

    const hasLetsel = foundKeywords.length > 0

    return {
      hasLetsel,
      foundKeywords,
      severity: foundKeywords.length >= 3 ? 'high' : foundKeywords.length >= 1 ? 'medium' : 'none',
      recommendation: hasLetsel 
        ? 'DOORVERWIJZEN naar Unitas Letselschade. Claim bevat indicaties van letselschade.'
        : 'Geen letselschade gedetecteerd. Ga verder met materiele schade afhandeling.',
    }
  },
})

/**
 * TOOL 2: Aansprakelijkheid Beoordeling
 * Analyseert wie aansprakelijk is op basis van beschrijving
 */
export const aansprakelijkheidTool = tool({
  description: 'Beoordeelt de aansprakelijkheid van de tegenpartij op basis van de ongevalbeschrijving. Geeft een percentage inschatting.',
  parameters: z.object({
    beschrijving: z.string().describe('De ongevalbeschrijving'),
    datum: z.string().describe('Datum van het ongeval'),
    kenteken: z.string().describe('Kenteken van de tegenpartij'),
  }),
  execute: async ({ beschrijving, datum, kenteken }) => {
    // Simpele heuristics voor aansprakelijkheid
    const text = beschrijving.toLowerCase()
    
    // Sterke indicatoren voor aansprakelijkheid tegenpartij
    const strongIndicators = [
      'klapte achterop',
      'reed door rood',
      'negeerde voorrang',
      'zonder te kijken',
      'geen richting aangegeven',
      'reed achteruit',
      'parkeerde verkeerd',
      'bumper klap',
      'inreed op',
      'reed tegen',
    ]

    // Zwakke indicatoren (twijfelachtig)
    const weakIndicators = [
      'misschien',
      'denk ik',
      'onduidelijk',
      'weet niet zeker',
      'beide',
    ]

    const hasStrongIndicator = strongIndicators.some(ind => text.includes(ind))
    const hasWeakIndicator = weakIndicators.some(ind => text.includes(ind))

    let liability = 50 // default: onduidelijk
    let confidence = 'medium'
    let recommendation = 'HANDMATIG_REVIEWEN'

    if (hasStrongIndicator && !hasWeakIndicator) {
      liability = 85
      confidence = 'high'
      recommendation = 'AUTO_BRIEF_GENEREREN'
    } else if (hasStrongIndicator) {
      liability = 70
      confidence = 'medium'
      recommendation = 'HANDMATIG_REVIEWEN'
    } else if (hasWeakIndicator) {
      liability = 40
      confidence = 'low'
      recommendation = 'HANDMATIG_REVIEWEN'
    }

    return {
      liability_percentage: liability,
      confidence,
      recommendation,
      reasoning: hasStrongIndicator 
        ? 'Beschrijving bevat duidelijke indicatoren voor aansprakelijkheid tegenpartij.'
        : 'Aansprakelijkheid niet duidelijk uit beschrijving. Handmatige review nodig.',
      can_auto_process: liability >= 80 && confidence === 'high',
    }
  },
})

/**
 * TOOL 3: Claim Status Updaten
 * Update claim status in Supabase database
 */
export const updateClaimStatusTool = tool({
  description: 'Update de status van een claim in de database. Mogelijke statussen: nieuw, in_behandeling, wacht_op_info, afgerond, geweigerd.',
  parameters: z.object({
    claimId: z.string().describe('Het UUID van de claim'),
    status: z.enum(['nieuw', 'in_behandeling', 'wacht_op_info', 'afgerond', 'geweigerd']).describe('De nieuwe status'),
    note: z.string().optional().describe('Optionele notitie bij de status wijziging'),
  }),
  execute: async ({ claimId, status, note }) => {
    try {
      const supabase = await createClient()

      // Update claim status
      const { data: claim, error: updateError } = await supabase
        .from('claims')
        .update({ 
          status,
          updated_at: new Date().toISOString(),
        })
        .eq('id', claimId)
        .select()
        .single()

      if (updateError) {
        return {
          success: false,
          error: updateError.message,
        }
      }

      // Log status change (if claim_status_updates table exists)
      await supabase.from('claim_status_updates').insert({
        claim_id: claimId,
        old_status: claim.status,
        new_status: status,
        note: note || `Status automatisch gewijzigd door AI agent`,
      })

      return {
        success: true,
        claim_id: claimId,
        new_status: status,
        message: `Claim ${claimId} status gewijzigd naar ${status}`,
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.message,
      }
    }
  },
})

/**
 * TOOL 4: Claim Data Ophalen
 * Haal volledige claim data op uit database
 */
export const getClaimDataTool = tool({
  description: 'Haal volledige claim informatie op uit de database op basis van claim ID.',
  parameters: z.object({
    claimId: z.string().describe('Het UUID van de claim'),
  }),
  execute: async ({ claimId }) => {
    try {
      const supabase = await createClient()

      const { data: claim, error } = await supabase
        .from('claims')
        .select('*')
        .eq('id', claimId)
        .single()

      if (error || !claim) {
        return {
          success: false,
          error: error?.message || 'Claim niet gevonden',
        }
      }

      return {
        success: true,
        claim: {
          id: claim.id,
          naam: claim.naam,
          email: claim.email,
          telefoon: claim.telefoon,
          kenteken_tegenpartij: claim.kenteken_tegenpartij,
          datum_ongeval: claim.datum_ongeval,
          beschrijving: claim.beschrijving,
          status: claim.status,
          created_at: claim.created_at,
        },
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.message,
      }
    }
  },
})

/**
 * TOOL 5: Notitie Toevoegen
 * Voeg een AI notitie toe aan de claim
 */
export const addClaimNoteTool = tool({
  description: 'Voeg een notitie of opmerking toe aan een claim. Dit wordt opgeslagen in het notities veld van de claim.',
  parameters: z.object({
    claimId: z.string().describe('Het UUID van de claim'),
    note: z.string().describe('De notitie om toe te voegen'),
  }),
  execute: async ({ claimId, note }) => {
    try {
      const supabase = await createClient()

      // Haal huidige notities op
      const { data: claim } = await supabase
        .from('claims')
        .select('ai_notes')
        .eq('id', claimId)
        .single()

      const existingNotes = claim?.ai_notes || ''
      const timestamp = new Date().toISOString()
      const newNote = `[${timestamp}] AI Agent: ${note}`
      const updatedNotes = existingNotes 
        ? `${existingNotes}\n\n${newNote}`
        : newNote

      // Update claim met nieuwe notitie
      const { error } = await supabase
        .from('claims')
        .update({ 
          ai_notes: updatedNotes,
          updated_at: new Date().toISOString(),
        })
        .eq('id', claimId)

      if (error) {
        return {
          success: false,
          error: error.message,
        }
      }

      return {
        success: true,
        message: 'Notitie toegevoegd aan claim',
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.message,
      }
    }
  },
})
