/**
 * Intelligent Claim Matcher
 * 
 * Matches inbound emails to claims using multiple strategies:
 * 1. Exact claim ID reference
 * 2. License plate matching
 * 3. Name matching (fuzzy)
 * 4. Email address matching
 * 5. Contextual matching (dates, amounts, etc.)
 */

import { createClient } from '@/lib/supabase/server'
import type { EmailAnalysisResult } from './ai-analyzer'

export interface ClaimMatch {
  claim_id: string
  confidence: number // 0-100
  match_method: 'exact_reference' | 'license_plate' | 'name' | 'email' | 'context' | 'fuzzy'
  match_details: string
}

export interface ClaimMatchResult {
  matches: ClaimMatch[]
  best_match: ClaimMatch | null
  requires_manual_review: boolean
}

/**
 * Match email to claim(s) using AI analysis results
 */
export async function matchEmailToClaim(
  emailData: {
    from_email: string
    subject: string
    body_text: string
  },
  analysis: EmailAnalysisResult
): Promise<ClaimMatchResult> {
  console.log('🔍 Starting claim matching...')
  
  const matches: ClaimMatch[] = []
  const supabase = await createClient()

  // Strategy 1: Exact claim ID reference
  if (analysis.detected_claim_references.length > 0) {
    console.log('   Trying exact reference matching...')
    for (const ref of analysis.detected_claim_references) {
      const match = await matchByReference(ref, supabase)
      if (match) matches.push(match)
    }
  }

  // Strategy 2: License plate matching
  if (analysis.detected_license_plates.length > 0) {
    console.log('   Trying license plate matching...')
    for (const plate of analysis.detected_license_plates) {
      const match = await matchByLicensePlate(plate, supabase)
      if (match) matches.push(match)
    }
  }

  // Strategy 3: Sender email matching
  console.log('   Trying email matching...')
  const emailMatches = await matchByEmail(emailData.from_email, supabase)
  matches.push(...emailMatches)

  // Strategy 4: Name matching (if detected)
  if (analysis.detected_names.length > 0) {
    console.log('   Trying name matching...')
    for (const name of analysis.detected_names) {
      const match = await matchByName(name, supabase)
      if (match) matches.push(match)
    }
  }

  // Strategy 5: Contextual matching (dates, amounts, verzekeraar)
  if (analysis.detected_dates.length > 0 || analysis.detected_amounts.length > 0) {
    console.log('   Trying contextual matching...')
    const contextMatches = await matchByContext({
      dates: analysis.detected_dates,
      amounts: analysis.detected_amounts,
      from_email: emailData.from_email,
    }, supabase)
    matches.push(...contextMatches)
  }

  // Deduplicate matches (same claim_id)
  const uniqueMatches = deduplicateMatches(matches)
  
  // Sort by confidence (highest first)
  uniqueMatches.sort((a, b) => b.confidence - a.confidence)

  // Determine best match
  const best_match = uniqueMatches.length > 0 ? uniqueMatches[0] : null
  
  // Require manual review if:
  // - No matches found
  // - Multiple matches with similar confidence
  // - Best match confidence < 80%
  const requires_manual_review = 
    uniqueMatches.length === 0 ||
    (uniqueMatches.length > 1 && Math.abs(uniqueMatches[0].confidence - uniqueMatches[1].confidence) < 15) ||
    (best_match && best_match.confidence < 80)

  console.log('📊 Matching results:')
  console.log('   Total matches:', uniqueMatches.length)
  console.log('   Best match:', best_match ? `${best_match.claim_id} (${best_match.confidence}%)` : 'None')
  console.log('   Manual review needed:', requires_manual_review)

  return {
    matches: uniqueMatches,
    best_match,
    requires_manual_review,
  }
}

/**
 * Strategy 1: Match by claim reference (UUID or REF-xxx)
 */
async function matchByReference(reference: string, supabase: any): Promise<ClaimMatch | null> {
  try {
    // Try as UUID first
    const { data: claim } = await supabase
      .from('claims')
      .select('id')
      .eq('id', reference)
      .single()

    if (claim) {
      return {
        claim_id: claim.id,
        confidence: 100,
        match_method: 'exact_reference',
        match_details: `Exact UUID match: ${reference}`,
      }
    }

    // Try searching in description/notes for reference
    const { data: claims } = await supabase
      .from('claims')
      .select('id, beschrijving')
      .or(`beschrijving.ilike.%${reference}%,ai_notes.ilike.%${reference}%`)
      .limit(5)

    if (claims && claims.length > 0) {
      return {
        claim_id: claims[0].id,
        confidence: 90,
        match_method: 'exact_reference',
        match_details: `Reference found in claim: ${reference}`,
      }
    }

    return null
  } catch (error) {
    console.error('Error matching by reference:', error)
    return null
  }
}

/**
 * Strategy 2: Match by license plate
 */
async function matchByLicensePlate(plate: string, supabase: any): Promise<ClaimMatch | null> {
  try {
    // Normalize plate (remove spaces, hyphens, uppercase)
    const normalized = plate.replace(/[\s\-]/g, '').toUpperCase()
    
    // Search in kenteken_tegenpartij
    const { data: claims } = await supabase
      .from('claims')
      .select('id, kenteken_tegenpartij')
      .ilike('kenteken_tegenpartij', `%${normalized}%`)
      .order('created_at', { ascending: false })
      .limit(3)

    if (claims && claims.length > 0) {
      return {
        claim_id: claims[0].id,
        confidence: 95,
        match_method: 'license_plate',
        match_details: `License plate match: ${plate}`,
      }
    }

    return null
  } catch (error) {
    console.error('Error matching by license plate:', error)
    return null
  }
}

/**
 * Strategy 3: Match by sender email address
 */
async function matchByEmail(email: string, supabase: any): Promise<ClaimMatch[]> {
  try {
    const matches: ClaimMatch[] = []
    
    // Extract domain from email
    const domain = email.split('@')[1]?.toLowerCase()
    
    if (!domain) return []

    // Find claims where verzekeraar matches domain
    // E.g., schade@anwb.nl → find claims with verzekeraar_tegenpartij = 'ANWB'
    const { data: verzekeraars } = await supabase
      .from('verzekeraars')
      .select('naam')
      .ilike('email_schade', `%@${domain}`)
      .limit(5)

    if (verzekeraars && verzekeraars.length > 0) {
      for (const verzekeraar of verzekeraars) {
        // Find claims with this verzekeraar
        const { data: claims } = await supabase
          .from('claims')
          .select('id')
          .ilike('verzekeraar_tegenpartij', `%${verzekeraar.naam}%`)
          .in('status', ['in_behandeling', 'aansprakelijkheidsbrief_verzonden'])
          .order('created_at', { ascending: false })
          .limit(10)

        if (claims && claims.length > 0) {
          for (const claim of claims) {
            matches.push({
              claim_id: claim.id,
              confidence: 70 - (matches.length * 5), // Decrease confidence for each match
              match_method: 'email',
              match_details: `Email domain matches verzekeraar: ${verzekeraar.naam}`,
            })
          }
        }
      }
    }

    return matches
  } catch (error) {
    console.error('Error matching by email:', error)
    return []
  }
}

/**
 * Strategy 4: Match by name (fuzzy)
 */
async function matchByName(name: string, supabase: any): Promise<ClaimMatch | null> {
  try {
    // Search in naam, naam_tegenpartij
    const { data: claims } = await supabase
      .from('claims')
      .select('id, naam, naam_tegenpartij')
      .or(`naam.ilike.%${name}%,naam_tegenpartij.ilike.%${name}%`)
      .order('created_at', { ascending: false })
      .limit(5)

    if (claims && claims.length > 0) {
      return {
        claim_id: claims[0].id,
        confidence: 75,
        match_method: 'name',
        match_details: `Name match: ${name}`,
      }
    }

    return null
  } catch (error) {
    console.error('Error matching by name:', error)
    return null
  }
}

/**
 * Strategy 5: Match by context (dates, amounts, etc.)
 */
async function matchByContext(
  context: {
    dates: string[]
    amounts: number[]
    from_email: string
  },
  supabase: any
): Promise<ClaimMatch[]> {
  try {
    const matches: ClaimMatch[] = []
    
    // Match by datum_ongeval
    if (context.dates.length > 0) {
      for (const date of context.dates) {
        const { data: claims } = await supabase
          .from('claims')
          .select('id')
          .eq('datum_ongeval', date)
          .in('status', ['in_behandeling', 'aansprakelijkheidsbrief_verzonden'])
          .limit(3)

        if (claims && claims.length > 0) {
          for (const claim of claims) {
            matches.push({
              claim_id: claim.id,
              confidence: 80,
              match_method: 'context',
              match_details: `Date match: ${date}`,
            })
          }
        }
      }
    }

    // Match by geschatte_schade amount
    if (context.amounts.length > 0) {
      for (const amount of context.amounts) {
        const { data: claims } = await supabase
          .from('claims')
          .select('id, geschatte_schade')
          .gte('geschatte_schade', amount * 0.8) // Within 20% range
          .lte('geschatte_schade', amount * 1.2)
          .in('status', ['in_behandeling', 'aansprakelijkheidsbrief_verzonden'])
          .limit(3)

        if (claims && claims.length > 0) {
          for (const claim of claims) {
            matches.push({
              claim_id: claim.id,
              confidence: 65,
              match_method: 'context',
              match_details: `Amount match: €${amount}`,
            })
          }
        }
      }
    }

    return matches
  } catch (error) {
    console.error('Error matching by context:', error)
    return []
  }
}

/**
 * Deduplicate matches (keep highest confidence per claim)
 */
function deduplicateMatches(matches: ClaimMatch[]): ClaimMatch[] {
  const map = new Map<string, ClaimMatch>()
  
  for (const match of matches) {
    const existing = map.get(match.claim_id)
    if (!existing || match.confidence > existing.confidence) {
      map.set(match.claim_id, match)
    }
  }
  
  return Array.from(map.values())
}

/**
 * Helper: Get human-readable match method label
 */
export function getMatchMethodLabel(method: string): string {
  const labels: Record<string, string> = {
    exact_reference: 'Exacte Referentie',
    license_plate: 'Kenteken',
    name: 'Naam',
    email: 'Email Domein',
    context: 'Context (datum/bedrag)',
    fuzzy: 'Fuzzy Match',
  }
  return labels[method] || 'Onbekend'
}
