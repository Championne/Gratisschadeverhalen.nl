import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Use service role
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

    const testClaimId = "88cb1d1c-8eea-4a67-b72f-73dcd71f6de0"

    // 1. Check if claim exists
    const { data: claim, error: claimError } = await supabaseAdmin
      .from("claims")
      .select("id, status")
      .eq("id", testClaimId)
      .single()

    // 2. Try to create a test audit log
    const testData = {
      user_id: user.id,
      claim_id: testClaimId,
      action_type: 'status_change',
      details: 'TEST AUDIT LOG - kan verwijderd worden',
      ip_address: 'test'
    }

    const { data: auditLog, error: auditError } = await supabaseAdmin
      .from("audit_logs")
      .insert(testData)
      .select()

    // 3. Fetch all audit logs for this claim
    const { data: existingLogs, error: fetchError } = await supabaseAdmin
      .from("audit_logs")
      .select("*")
      .eq("claim_id", testClaimId)
      .order("created_at", { ascending: false })

    // 4. Check table structure
    const { data: tableInfo, error: tableError } = await supabaseAdmin
      .from("audit_logs")
      .select("*")
      .limit(1)

    return NextResponse.json({
      claim: claim || null,
      claimError: claimError?.message || null,
      testInsert: auditLog || null,
      testInsertError: auditError?.message || null,
      testInsertDetails: auditError ? JSON.stringify(auditError, null, 2) : null,
      existingLogs: existingLogs || [],
      fetchError: fetchError?.message || null,
      tableStructure: tableInfo ? Object.keys(tableInfo[0] || {}) : [],
      tableError: tableError?.message || null,
      currentUserId: user.id,
      testData
    })

  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      stack: error.stack
    }, { status: 500 })
  }
}
