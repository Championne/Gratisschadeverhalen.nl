import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const claimId = searchParams.get('claimId')

    if (!claimId) {
      return NextResponse.json({ error: 'claimId is required' }, { status: 400 })
    }

    // Verify user is authenticated
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Verify user owns this claim (security check)
    const { data: claim } = await supabase
      .from('claims')
      .select('user_id')
      .eq('id', claimId)
      .single()

    if (!claim || claim.user_id !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Use service role to fetch audit logs (bypasses RLS)
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

    const { data: logs, error } = await supabaseAdmin
      .from('audit_logs')
      .select('*')
      .eq('claim_id', claimId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('❌ Audit logs fetch error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch audit logs' },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      success: true, 
      logs: logs || [],
      count: logs?.length || 0
    })

  } catch (error: any) {
    console.error('❌ Audit logs API error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to fetch audit logs', 
        details: error.message 
      },
      { status: 500 }
    )
  }
}
