import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard/header"
import { ClaimsList } from "@/components/dashboard/claims-list"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Clock, CheckCircle, XCircle } from "lucide-react"

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    redirect("/login")
  }

  // Haal gebruiker's claims op
  const { data: claims, error: claimsError } = await supabase
    .from('claims')
    .select('id, naam, email, kenteken_tegenpartij, datum_ongeval, status, escalatie_reden, escalatie_opgelost, created_at, updated_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
  
  // Log error voor debugging
  if (claimsError) {
    console.error('Claims fetch error:', claimsError)
  }

  const claimsData = claims || []

  // Statistieken
  const stats = {
    total: claimsData.length,
    nieuw: claimsData.filter(c => c.status === 'nieuw').length,
    in_behandeling: claimsData.filter(c => c.status === 'in_behandeling' || c.status === 'in_onderhandeling').length,
    afgerond: claimsData.filter(c => c.status === 'afgerond').length,
    geweigerd: claimsData.filter(c => c.status === 'geweigerd').length,
    escalated: claimsData.filter(c => c.status === 'escalated').length,
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader user={user} />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Mijn Claims</h1>
          <p className="text-muted-foreground">
            Overzicht van al je schade claims
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Totaal Claims</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">In Behandeling</CardTitle>
              <Clock className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.in_behandeling}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Afgerond</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.afgerond}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Geweigerd</CardTitle>
              <XCircle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.geweigerd}</div>
            </CardContent>
          </Card>
        </div>

        {/* Claims List */}
        <ClaimsList claims={claimsData} />
      </main>
    </div>
  )
}
