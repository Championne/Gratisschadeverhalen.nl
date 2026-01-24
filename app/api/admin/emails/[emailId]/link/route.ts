/**
 * Admin API: Link Email to Claim
 * 
 * Koppelt een ongematchte email aan een specifieke claim
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { logAuditAction } from '@/lib/audit/logger'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ emailId: string }> }
) {
  try {
    const supabase = await createClient()
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { emailId } = await params
    const body = await request.json()
    const { claimId } = body

    if (!claimId) {
      return NextResponse.json({ error: 'claimId is required' }, { status: 400 })
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

    // Verify email exists
    const { data: email, error: emailError } = await supabaseAdmin
      .from('inbound_emails')
      .select('*')
      .eq('id', emailId)
      .single()

    if (emailError || !email) {
      return NextResponse.json({ error: 'Email not found' }, { status: 404 })
    }

    // Verify claim exists
    const { data: claim, error: claimError } = await supabaseAdmin
      .from('claims')
      .select('id, naam, kenteken_tegenpartij')
      .eq('id', claimId)
      .single()

    if (claimError || !claim) {
      return NextResponse.json({ error: 'Claim not found' }, { status: 404 })
    }

    // Link email to claim
    const { error: updateError } = await supabaseAdmin
      .from('inbound_emails')
      .update({
        claim_id: claimId,
        match_confidence: 100, // Manual match = 100% confidence
        admin_reviewed: true,
        admin_reviewed_at: new Date().toISOString(),
        admin_reviewed_by: user.email,
      })
      .eq('id', emailId)

    if (updateError) {
      console.error('Error linking email:', updateError)
      return NextResponse.json({ error: 'Failed to link email' }, { status: 500 })
    }

    // Update claim stats
    const { data: currentClaim } = await supabaseAdmin
      .from('claims')
      .select('verzekeraar_email_count')
      .eq('id', claimId)
      .single()

    await supabaseAdmin
      .from('claims')
      .update({
        last_verzekeraar_email_at: email.received_at,
        verzekeraar_email_count: (currentClaim?.verzekeraar_email_count || 0) + 1,
      })
      .eq('id', claimId)

    // Log audit action
    await logAuditAction({
      claimId,
      actionType: 'email_received',
      performedBy: `ADMIN:${user.email}`,
      details: {
        email_id: emailId,
        from_email: email.from_email,
        subject: email.subject,
        manually_linked: true,
        linked_by: user.email,
      },
      severity: 'info',
    })

    console.log(`[ADMIN] ${user.email} linked email ${emailId} to claim ${claimId}`)

    return NextResponse.json({
      success: true,
      message: `Email gekoppeld aan claim van ${claim.naam}`,
      email_id: emailId,
      claim_id: claimId,
    })

  } catch (error) {
    console.error('[Admin Link Email API] Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
