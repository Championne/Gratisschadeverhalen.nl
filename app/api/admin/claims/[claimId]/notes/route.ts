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

    // Fetch notes from audit logs with type 'comment_added'
    const { data: auditLogs, error } = await supabaseAdmin
      .from("audit_logs")
      .select("*")
      .eq("claim_id", claimId)
      .eq("action_type", "comment_added")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching notes:", error)
      return NextResponse.json(
        { error: "Failed to fetch notes" },
        { status: 500 }
      )
    }

    // Transform audit logs to notes format (new schema with performed_by and JSONB details)
    const notes = auditLogs.map(log => ({
      id: log.id,
      details: log.details,
      created_at: log.created_at,
      performed_by: log.performed_by
    }))

    return NextResponse.json({ notes })

  } catch (error) {
    console.error("Error in notes GET API:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ claimId: string }> }
) {
  try {
    const { claimId } = await params
    const { note } = await request.json()

    if (!note || !note.trim()) {
      return NextResponse.json(
        { error: "Note cannot be empty" },
        { status: 400 }
      )
    }

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

    // Get user email for performed_by field
    const { data: userData } = await supabaseAdmin.auth.admin.getUserById(user.id)
    const performedBy = `ADMIN:${userData?.user?.email || 'unknown'}`

    // Add note as audit log
    const { data: auditLog, error } = await supabaseAdmin
      .from("audit_logs")
      .insert({
        claim_id: claimId,
        action_type: 'comment_added',
        performed_by: performedBy,
        details: {
          comment: note.trim()
        },
        severity: 'info',
        ip_address: request.headers.get('x-forwarded-for') || null
      })
      .select()
      .single()

    if (error) {
      console.error("Error adding note:", error)
      return NextResponse.json(
        { error: "Failed to add note" },
        { status: 500 }
      )
    }

    // Transform to note format (new schema)
    const noteResponse = {
      id: auditLog.id,
      details: auditLog.details,
      created_at: auditLog.created_at,
      performed_by: auditLog.performed_by
    }

    return NextResponse.json({ 
      success: true,
      note: noteResponse 
    })

  } catch (error) {
    console.error("Error in notes POST API:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
