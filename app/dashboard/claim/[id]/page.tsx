import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard/header"
import { ClaimDetail } from "@/components/dashboard/claim-detail"
import { notFound } from "next/navigation"

export default async function ClaimDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: { user }, error: userError } = await supabase.auth.getUser()

  if (userError || !user) {
    redirect("/login")
  }

  // Haal claim op
  const { data: claim, error } = await supabase
    .from('claims')
    .select('*')
    .eq('id', id)
    .eq('user_id', user.id)
    .single()

  if (error || !claim) {
    notFound()
  }

  // Haal status updates op
  const { data: statusUpdates } = await supabase
    .from('claim_status_updates')
    .select('*')
    .eq('claim_id', id)
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader user={user} />

      <main className="container mx-auto px-4 py-8">
        <ClaimDetail claim={claim} statusUpdates={statusUpdates || []} />
      </main>
    </div>
  )
}
