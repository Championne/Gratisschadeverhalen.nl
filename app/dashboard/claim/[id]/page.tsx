import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard/header"
import { ClaimDetail } from "@/components/dashboard/claim-detail"
import { notFound } from "next/navigation"

// Disable caching for claim detail page (always fetch fresh data)
export const revalidate = 0
export const dynamic = 'force-dynamic'

export default async function ClaimDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: { user }, error: userError } = await supabase.auth.getUser()

  if (userError || !user) {
    redirect("/login")
  }

  // Haal claim op (expliciete select voor nieuwe kolommen)
  const { data: claim, error } = await supabase
    .from('claims')
    .select(`
      id, naam, email, telefoon, datum_ongeval, plaats_ongeval, beschrijving,
      kenteken_tegenpartij, naam_tegenpartij, verzekeraar_tegenpartij, polisnummer_tegenpartij,
      status, mogelijk_letselschade, escalatie_reden, escalatie_datum, escalatie_opgelost,
      ocr_confidence, ai_notes, created_at, updated_at
    `)
    .eq('id', id)
    .eq('user_id', user.id)
    .single()

  if (error) {
    console.error('Claim fetch error:', error)
    notFound()
  }
  
  if (!claim) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader user={user} />

      <main className="container mx-auto px-4 py-8">
        <ClaimDetail claim={claim} />
      </main>
    </div>
  )
}
