import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

/**
 * DEBUG: Check audit logs directly from database
 * 
 * Usage: GET /api/debug/audit-logs?claimId=xxx
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const claimId = searchParams.get('claimId')

    if (!claimId) {
      return NextResponse.json(
        { error: 'Missing claimId parameter' },
        { status: 400 }
      )
    }

    console.log('🔍 [DEBUG] Fetching audit logs for claim:', claimId)

    // Use service role to bypass RLS
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )

    // Fetch ALL audit logs for this claim
    const { data: auditLogs, error } = await supabaseAdmin
      .from('audit_logs')
      .select('*')
      .eq('claim_id', claimId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('❌ [DEBUG] Database error:', error)
      return NextResponse.json({
        error: 'Database query failed',
        details: error,
        claimId,
      }, { status: 500 })
    }

    console.log(`✅ [DEBUG] Found ${auditLogs?.length || 0} audit logs`)

    return NextResponse.json({
      success: true,
      claimId,
      totalLogs: auditLogs?.length || 0,
      auditLogs: auditLogs || [],
      message: auditLogs?.length 
        ? `Found ${auditLogs.length} audit log(s)` 
        : 'No audit logs found in database',
    })

  } catch (error: any) {
    console.error('❌ [DEBUG] Exception:', error)
    return NextResponse.json({
      error: 'Exception occurred',
      message: error.message,
      stack: error.stack,
    }, { status: 500 })
  }
}
