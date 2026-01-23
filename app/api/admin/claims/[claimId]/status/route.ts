import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ claimId: string }> }
) {
  try {
    const { claimId } = await params
    const { status, note } = await request.json()

    // Use regular client for auth check
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    // TODO: Add admin role check when implemented

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

    // Update claim status
    const { data: claim, error: updateError } = await supabaseAdmin
      .from("claims")
      .update({ 
        status,
        updated_at: new Date().toISOString()
      })
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
          note: note || null
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

    return NextResponse.json({ 
      success: true,
      claim 
    })

  } catch (error) {
    console.error("Error in status update API:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
