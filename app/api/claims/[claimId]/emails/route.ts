/**
 * API Route: Get emails for a specific claim
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(
  req: NextRequest,
  { params }: { params: { claimId: string } }
) {
  try {
    const { claimId } = params

    if (!claimId) {
      return NextResponse.json({ error: 'Claim ID required' }, { status: 400 })
    }

    const supabase = await createClient()

    // Fetch emails with analysis
    const { data: emails, error } = await supabase
      .from('inbound_emails')
      .select(`
        id,
        from_email,
        from_name,
        subject,
        body_text,
        received_at,
        processed,
        match_confidence,
        email_analysis (
          email_type,
          confidence_score,
          sentiment,
          sentiment_score,
          priority,
          urgency_score,
          summary_nl,
          key_points,
          suggested_actions,
          requires_admin_action
        )
      `)
      .eq('claim_id', claimId)
      .order('received_at', { ascending: false })

    if (error) {
      console.error('Error fetching emails:', error)
      return NextResponse.json({ error: 'Failed to fetch emails' }, { status: 500 })
    }

    // Transform data (email_analysis is array, we want single object)
    const transformedEmails = emails?.map((email: any) => ({
      ...email,
      analysis: email.email_analysis?.[0] || null,
      email_analysis: undefined,
    }))

    return NextResponse.json({ 
      emails: transformedEmails || [],
      count: transformedEmails?.length || 0,
    })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 })
  }
}
