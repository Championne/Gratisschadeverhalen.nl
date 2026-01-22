/**
 * Verzekeraar Lookup & Email Utilities
 * 
 * Automatisch opzoeken van verzekeraar contactgegevens
 * en versturen van aansprakelijkheidsbrieven
 */

import { createClient } from '@/lib/supabase/server'

export interface VerzekeEvent {
  id: string
  naam: string
  email_schade: string | null
  telefoon: string | null
  website: string | null
}

/**
 * Zoek verzekeraar email adres op basis van naam
 */
export async function getVerzekeEvent(verzekeEvent: string): Promise<VerzekeEvent | null> {
  try {
    const supabase = await createClient()
    
    const { data, error } = await supabase.rpc('get_verzekeraar_email', {
      p_verzekeraar_naam: verzekeEvent,
    })

    if (error) {
      console.error('❌ Verzekeraar lookup failed:', error)
      return null
    }

    if (!data || data.length === 0) {
      console.log(`⚠️  Verzekeraar niet gevonden in database: "${verzekeEvent}"`)
      return null
    }

    const verzekeraar = data[0]
    console.log(`✅ Verzekeraar gevonden: ${verzekeraar.naam} (${verzekeraar.email})`)
    
    return {
      id: '', // RPC function doesn't return ID
      naam: verzekeraar.naam,
      email_schade: verzekeraar.email,
      telefoon: verzekeraar.telefoon,
      website: verzekeraar.website,
    }
  } catch (error) {
    console.error('❌ Verzekeraar lookup exception:', error)
    return null
  }
}

/**
 * Fuzzy match verzekeraar (voor suggesties bij admin)
 */
export async function fuzzyMatchVerzekeEvent(verzekeEvent: string): Promise<VerzekeEvent[]> {
  try {
    const supabase = await createClient()
    
    const { data, error } = await supabase.rpc('fuzzy_match_verzekeraar', {
      p_verzekeraar_naam: verzekeEvent,
    })

    if (error) {
      console.error('❌ Fuzzy match failed:', error)
      return []
    }

    return (data || []).map((v: any) => ({
      id: v.id,
      naam: v.naam,
      email_schade: v.email_schade,
      telefoon: null,
      website: null,
    }))
  } catch (error) {
    console.error('❌ Fuzzy match exception:', error)
    return []
  }
}

/**
 * Check of een verzekeraar email adres heeft
 */
export async function hasVerzekeEventEmail(verzekeEvent: string): Promise<boolean> {
  const verzekeraar = await getVerzekeEvent(verzekeEvent)
  return !!(verzekeraar?.email_schade)
}

/**
 * Haal alle actieve verzekeraars op (voor admin/dropdown)
 */
export async function getAllVerzekeraars(): Promise<VerzekeEvent[]> {
  try {
    const supabase = await createClient()
    
    const { data, error } = await supabase
      .from('verzekeraars')
      .select('id, naam, email_schade, telefoon, website')
      .eq('actief', true)
      .order('naam')

    if (error) {
      console.error('❌ Failed to fetch verzekeraars:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('❌ Fetch verzekeraars exception:', error)
    return []
  }
}

/**
 * Helper: Normaliseer verzekeraar naam voor betere matching
 */
export function normalizeVerzekeEventNaam(naam: string): string {
  return naam
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/verzekeringen?/g, '')
    .replace(/verzekeraar/g, '')
    .trim()
}
