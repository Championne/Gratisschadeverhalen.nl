/**
 * Admin API: Mark Email as Spam
 * 
 * Markeert een email als spam (of niet-spam)
 * Spam emails worden na 7 dagen automatisch verwijderd
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
    const { isSpam = true } = body

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
      .select('id, from_email, subject')
      .eq('id', emailId)
      .single()

    if (emailError || !email) {
      return NextResponse.json({ error: 'Email not found' }, { status: 404 })
    }

    // Update email spam status
    const { error: updateError } = await supabaseAdmin
      .from('inbound_emails')
      .update({
        is_spam: isSpam,
        spam_marked_at: isSpam ? new Date().toISOString() : null,
        spam_marked_by: isSpam ? user.email : null,
        admin_reviewed: true,
        admin_reviewed_at: new Date().toISOString(),
        admin_reviewed_by: user.email,
      })
      .eq('id', emailId)

    if (updateError) {
      console.error('Error marking spam:', updateError)
      return NextResponse.json({ error: 'Failed to update email' }, { status: 500 })
    }

    // Log audit action (only for marking as spam, not un-spam)
    if (isSpam) {
      await logAuditAction({
        claimId: null,
        actionType: 'email_received',
        performedBy: `ADMIN:${user.email}`,
        details: {
          email_id: emailId,
          from_email: email.from_email,
          subject: email.subject,
          marked_as_spam: true,
          marked_by: user.email,
        },
        severity: 'info',
      })
    }

    console.log(`[ADMIN] ${user.email} marked email ${emailId} as ${isSpam ? 'spam' : 'not spam'}`)

    return NextResponse.json({
      success: true,
      message: isSpam ? 'Email gemarkeerd als spam' : 'Email niet meer als spam',
      email_id: emailId,
      is_spam: isSpam,
    })

  } catch (error) {
    console.error('[Admin Spam Email API] Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * DELETE: Bulk delete spam emails older than 7 days
 */
export async function DELETE(request: NextRequest) {
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

    // Calculate date 7 days ago
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    // Delete old spam emails
    const { data: deleted, error: deleteError } = await supabaseAdmin
      .from('inbound_emails')
      .delete()
      .eq('is_spam', true)
      .lt('spam_marked_at', sevenDaysAgo.toISOString())
      .select('id')

    if (deleteError) {
      console.error('Error deleting spam:', deleteError)
      return NextResponse.json({ error: 'Failed to delete spam' }, { status: 500 })
    }

    const deletedCount = deleted?.length || 0
    console.log(`[ADMIN] ${user.email} cleaned up ${deletedCount} old spam emails`)

    return NextResponse.json({
      success: true,
      message: `${deletedCount} oude spam email(s) verwijderd`,
      deleted_count: deletedCount,
    })

  } catch (error) {
    console.error('[Admin Delete Spam API] Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
