import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { logAuditAction } from "@/lib/audit/logger"

export async function PATCH(
  request: NextRequest,
  { params }: { params: { claimId: string } }
) {
  try {
    const supabase = await createClient()
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const claimId = params.claimId
    const body = await request.json()
    const { changes, ...formData } = body

    // Use service role client for admin operations
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

    // Get current claim data for audit log
    const { data: currentClaim, error: fetchError } = await supabaseAdmin
      .from('claims')
      .select('*')
      .eq('id', claimId)
      .single()

    if (fetchError || !currentClaim) {
      return NextResponse.json({ error: 'Claim not found' }, { status: 404 })
    }

    // Update claim
    const { data: updatedClaim, error: updateError } = await supabaseAdmin
      .from('claims')
      .update({
        ...formData,
        updated_at: new Date().toISOString(),
      })
      .eq('id', claimId)
      .select()
      .single()

    if (updateError) {
      console.error('Error updating claim:', updateError)
      return NextResponse.json({ error: 'Failed to update claim' }, { status: 500 })
    }

    // Log audit action with all changes
    await logAuditAction({
      claimId,
      actionType: 'manual_edit',
      performedBy: `ADMIN:${user.email}`,
      details: {
        changes: changes || {},
        edited_fields: Object.keys(changes || {}),
        edited_by: user.email,
        timestamp: new Date().toISOString(),
      },
      severity: 'info',
    })

    // Log each field change separately for better tracking
    if (changes && Object.keys(changes).length > 0) {
      for (const [field, change] of Object.entries(changes)) {
        console.log(`[ADMIN EDIT] ${user.email} changed ${field}: "${(change as any).old}" → "${(change as any).new}"`)
      }
    }

    return NextResponse.json({
      success: true,
      claim: updatedClaim,
      changesCount: Object.keys(changes || {}).length,
    })
  } catch (error) {
    console.error('[Admin Edit API] Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
