import { Metadata } from "next"
import { redirect, notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { AdminClaimDetail } from "@/components/admin/claim-detail"

export const metadata: Metadata = {
  title: "Claim Details - Admin",
  description: "Bekijk en beheer claim details",
}

export default async function AdminClaimDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  // Check if user is authenticated
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
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

  // Fetch claim (naam, email, telefoon are already in claims table)
  const { data: claim, error } = await supabaseAdmin
    .from("claims")
    .select("*")
    .eq("id", id)
    .single()

  if (error || !claim) {
    console.error("Error fetching claim:", error)
    notFound()
  }

  // Fetch audit logs (service role bypasses RLS)
  const { data: auditLogs } = await supabaseAdmin
    .from("audit_logs")
    .select("*")
    .eq("claim_id", id)
    .order("created_at", { ascending: false })

  // Fetch emails related to this claim
  const { data: emails } = await supabaseAdmin
    .from("inbound_emails")
    .select(`
      *,
      email_analysis (*)
    `)
    .eq("matched_claim_id", id)
    .order("received_at", { ascending: false })

  return (
    <div className="container mx-auto px-4 py-8">
      <AdminClaimDetail 
        claim={claim}
        auditLogs={auditLogs || []}
        emails={emails || []}
      />
    </div>
  )
}
