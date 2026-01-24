/**
 * Admin API: Ongematchte Emails
 * 
 * Haalt alle emails op die niet aan een claim gekoppeld zijn
 * Met AI-suggesties voor mogelijke matches
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Use service role for admin operations
    const { createClient: createServiceClient } = await import('@supabase/supabase-js')
    const supabaseAdmin = createServiceClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )

    // Parse query params
    const { searchParams } = new URL(request.url)
    const includeSpam = searchParams.get('includeSpam') === 'true'
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')

    // Fetch unmatched emails (claim_id IS NULL and not marked as spam)
    let query = supabaseAdmin
      .from('inbound_emails')
      .select('*', { count: 'exact' })
      .is('claim_id', null)
      .order('received_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (!includeSpam) {
      query = query.or('is_spam.is.null,is_spam.eq.false')
    }

    const { data: emails, error, count } = await query

    if (error) {
      console.error('Error fetching unmatched emails:', error)
      return NextResponse.json({ error: 'Failed to fetch emails' }, { status: 500 })
    }

    // For each email, try to find potential claim matches
    const emailsWithSuggestions = await Promise.all(
      (emails || []).map(async (email) => {
        const suggestions = await findPotentialClaimMatches(supabaseAdmin, email)
        return {
          ...email,
          potential_matches: suggestions,
        }
      })
    )

    // Count unread/new emails (received in last 24h without admin action)
    const { count: unreadCount } = await supabaseAdmin
      .from('inbound_emails')
      .select('*', { count: 'exact', head: true })
      .is('claim_id', null)
      .is('admin_reviewed', null)
      .or('is_spam.is.null,is_spam.eq.false')

    return NextResponse.json({
      success: true,
      emails: emailsWithSuggestions,
      total: count || 0,
      unreadCount: unreadCount || 0,
      pagination: {
        limit,
        offset,
        hasMore: (count || 0) > offset + limit,
      },
    })

  } catch (error) {
    console.error('[Admin Unmatched Emails API] Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * Find potential claim matches for an email
 */
async function findPotentialClaimMatches(supabase: any, email: any) {
  const suggestions: any[] = []

  try {
    // Extract potential identifiers from email
    const emailText = `${email.subject || ''} ${email.body_text || ''} ${email.from_email || ''}`
    
    // Look for license plates (Dutch format)
    const licensePlatePattern = /\b([A-Z0-9]{1,3})[\s\-]?([A-Z0-9]{1,3})[\s\-]?([A-Z0-9]{1,3})\b/gi
    const potentialPlates = [...emailText.matchAll(licensePlatePattern)]
      .map(m => `${m[1]}-${m[2]}-${m[3]}`.toUpperCase())
      .filter(p => p.length >= 6 && p.length <= 10)

    // Look for claim references (numbers)
    const claimRefPattern = /(?:claim|dossier|zaaknummer|referentie)[\s:]*([A-Z0-9\-]+)/gi
    const potentialRefs = [...emailText.matchAll(claimRefPattern)]
      .map(m => m[1])

    // Search by license plate
    if (potentialPlates.length > 0) {
      const { data: plateMatches } = await supabase
        .from('claims')
        .select('id, naam, kenteken_tegenpartij, verzekeraar_tegenpartij, status, created_at')
        .or(potentialPlates.map(p => `kenteken_tegenpartij.ilike.%${p.replace(/-/g, '')}%`).join(','))
        .limit(3)

      if (plateMatches) {
        plateMatches.forEach((claim: any) => {
          suggestions.push({
            claim_id: claim.id,
            claim_naam: claim.naam,
            claim_kenteken: claim.kenteken_tegenpartij,
            claim_verzekeraar: claim.verzekeraar_tegenpartij,
            claim_status: claim.status,
            match_reason: `Kenteken match: ${potentialPlates.join(', ')}`,
            confidence: 85,
          })
        })
      }
    }

    // Search by sender email domain (insurance companies)
    const senderDomain = email.from_email?.split('@')[1]?.toLowerCase()
    if (senderDomain) {
      // Map common insurance domains
      const insurerMap: Record<string, string[]> = {
        'centraal-beheer.nl': ['Centraal Beheer', 'CB'],
        'achmea.nl': ['Achmea', 'Centraal Beheer', 'Interpolis'],
        'anwb.nl': ['ANWB'],
        'allianz.nl': ['Allianz'],
        'nn.nl': ['Nationale Nederlanden', 'NN'],
        'aegon.nl': ['Aegon'],
        'ditzo.nl': ['Ditzo'],
        'ohra.nl': ['OHRA'],
        'univé.nl': ['Univé'],
        'unive.nl': ['Univé'],
        'nh1816.nl': ['NH1816'],
        'fbto.nl': ['FBTO'],
        'asr.nl': ['ASR'],
        'reaal.nl': ['Reaal'],
      }

      const insurerNames = insurerMap[senderDomain]
      if (insurerNames) {
        const { data: insurerMatches } = await supabase
          .from('claims')
          .select('id, naam, kenteken_tegenpartij, verzekeraar_tegenpartij, status, created_at')
          .or(insurerNames.map(name => `verzekeraar_tegenpartij.ilike.%${name}%`).join(','))
          .eq('status', 'in_behandeling')
          .order('created_at', { ascending: false })
          .limit(5)

        if (insurerMatches) {
          insurerMatches.forEach((claim: any) => {
            // Avoid duplicates
            if (!suggestions.find(s => s.claim_id === claim.id)) {
              suggestions.push({
                claim_id: claim.id,
                claim_naam: claim.naam,
                claim_kenteken: claim.kenteken_tegenpartij,
                claim_verzekeraar: claim.verzekeraar_tegenpartij,
                claim_status: claim.status,
                match_reason: `Verzekeraar match: ${senderDomain}`,
                confidence: 60,
              })
            }
          })
        }
      }
    }

    // Sort by confidence
    suggestions.sort((a, b) => b.confidence - a.confidence)

    return suggestions.slice(0, 5) // Return top 5 suggestions

  } catch (error) {
    console.error('Error finding claim matches:', error)
    return []
  }
}
