import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { isAdmin } from "@/lib/auth/admin"

// Status changes die AI heranalyse triggeren
const REANALYSIS_TRIGGER_STATUSES = [
  'in_behandeling', // Terug naar behandeling = heranalyse
  'nieuw',          // Reset = heranalyse
]

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ claimId: string }> }
) {
  try {
    const { claimId } = await params
    const { status, note, triggerReanalysis } = await request.json()

    // Use regular client for auth check
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    // 🔒 SECURITY: Verify user has admin privileges
    if (!isAdmin(user)) {
      console.log(`🚫 Admin API access denied for: ${user.email}`)
      return NextResponse.json(
        { error: "Forbidden", message: "Admin access required" },
        { status: 403 }
      )
    }

    // Use service role for admin operations (bypasses RLS)
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

    // First fetch current claim to get old status
    const { data: existingClaim } = await supabaseAdmin
      .from("claims")
      .select("status")
      .eq("id", claimId)
      .single()

    const oldStatus = existingClaim?.status || 'unknown'
    
    // Bepaal of reanalyse nodig is
    const shouldTriggerReanalysis = triggerReanalysis || (
      REANALYSIS_TRIGGER_STATUSES.includes(status) && 
      oldStatus !== status
    )

    // Update claim status - voeg reanalysis flag toe indien nodig
    const updateData: any = { 
      status,
      updated_at: new Date().toISOString()
    }

    if (shouldTriggerReanalysis) {
      updateData.reanalysis_needed = true
      updateData.reanalysis_reason = `Status change: ${oldStatus} → ${status}${note ? ` (${note})` : ''}`
    }

    const { data: claim, error: updateError } = await supabaseAdmin
      .from("claims")
      .update(updateData)
      .eq("id", claimId)
      .select()
      .single()

    if (updateError) {
      console.error("Error updating claim status:", updateError)
      return NextResponse.json(
        { error: "Failed to update claim status", details: updateError.message },
        { status: 500 }
      )
    }

    // Get user email for performed_by field
    const { data: userData } = await supabaseAdmin.auth.admin.getUserById(user.id)
    const performedBy = `ADMIN:${userData?.user?.email || 'unknown'}`

    // Log the status change in audit_logs
    const { error: auditError } = await supabaseAdmin
      .from("audit_logs")
      .insert({
        claim_id: claimId,
        action_type: 'status_change',
        performed_by: performedBy,
        details: {
          old_status: oldStatus,
          new_status: status,
          note: note || null,
          triggered_reanalysis: shouldTriggerReanalysis,
        },
        severity: 'info',
        ip_address: request.headers.get('x-forwarded-for') || null
      })

    if (auditError) {
      console.error("Error logging audit:", auditError)
      // Don't fail the request if audit logging fails
    }

    // If there's a note, also add it as a separate comment
    if (note) {
      const { error: commentError } = await supabaseAdmin
        .from("audit_logs")
        .insert({
          claim_id: claimId,
          action_type: 'comment_added',
          performed_by: performedBy,
          details: {
            comment: note
          },
          severity: 'info',
          ip_address: request.headers.get('x-forwarded-for') || null
        })
        
      if (commentError) {
        console.error("Error logging comment:", commentError)
      }
    }

    // Trigger AI reanalyse indien nodig
    let reanalysisResult = null
    if (shouldTriggerReanalysis && process.env.ENABLE_AUTO_REANALYSIS === 'true') {
      console.log('🔄 Triggering AI reanalysis due to status change...')
      console.log('   Status change:', oldStatus, '→', status)
      
      try {
        // Fire and forget - don't wait for reanalysis to complete
        fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/agent/reanalyze`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            claimId,
            reason: `Status wijziging: ${oldStatus} → ${status}`,
            triggeredBy: performedBy,
            includePhotos: true,
          }),
        }).then(res => res.json()).then(result => {
          console.log('✅ Reanalysis triggered successfully')
        }).catch(err => {
          console.error('⚠️ Reanalysis trigger failed:', err)
        })
        
        reanalysisResult = { triggered: true }
      } catch (reanalysisError) {
        console.error('Error triggering reanalysis:', reanalysisError)
        reanalysisResult = { triggered: false, error: 'Failed to trigger' }
      }
    }

    return NextResponse.json({ 
      success: true,
      claim,
      aiReanalysis: reanalysisResult,
    })

  } catch (error) {
    console.error("Error in status update API:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
