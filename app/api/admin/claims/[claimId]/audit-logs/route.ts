import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ claimId: string }> }
) {
  try {
    const { claimId } = await params
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
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

    // Fetch audit logs
    const { data: auditLogs, error } = await supabaseAdmin
      .from("audit_logs")
      .select("*")
      .eq("claim_id", claimId)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching audit logs:", error)
      return NextResponse.json(
        { error: "Failed to fetch audit logs" },
        { status: 500 }
      )
    }

    return NextResponse.json({ auditLogs })

  } catch (error) {
    console.error("Error in audit logs GET API:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
