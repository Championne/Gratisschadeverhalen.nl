/**
 * Admin API: Cleanup Old Spam
 * 
 * Verwijdert spam emails ouder dan 7 dagen
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

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
