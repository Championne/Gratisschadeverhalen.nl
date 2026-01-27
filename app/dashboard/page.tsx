import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard/header"
import { ClaimsList } from "@/components/dashboard/claims-list"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Clock, XCircle, AlertCircle } from "lucide-react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons"

type ClaimStatus = 'nieuw' | 'in_behandeling' | 'wacht_op_info' | 'aansprakelijkheidsbrief_verzonden' | 
  'in_onderhandeling' | 'afgerond' | 'geweigerd' | 'geannuleerd' | 'escalated'

interface Claim {
  id: string
  naam: string
  email: string
  kenteken_tegenpartij: string
  datum_ongeval: string
  status: ClaimStatus
  escalatie_reden?: string | null
  escalatie_opgelost?: boolean
  created_at: string
  updated_at: string
}

export default async function DashboardPage() {
  // Auth check OUTSIDE try-catch (redirect throws special error)
  const supabase = await createClient()
  const { data: { user }, error: userError } = await supabase.auth.getUser()

  if (userError || !user) {
    redirect("/login")
  }

  try {
    // Haal gebruiker's claims op met expliciete error handling
    const { data: claims, error: claimsError } = await supabase
      .from('claims')
      .select('id, naam, email, kenteken_tegenpartij, datum_ongeval, status, escalatie_reden, escalatie_opgelost, created_at, updated_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .returns<Claim[]>()
    
    if (claimsError) {
      console.error('Claims fetch error:', claimsError)
      // Toon fallback bij database error
      return (
        <div className="min-h-screen bg-gray-50">
          <DashboardHeader user={user} />
          <main className="container mx-auto px-4 py-8">
            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-600">
                  <AlertCircle className="h-5 w-5" />
                  Database Error
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Kon claims niet ophalen. Probeer de pagina te verversen.
                </p>
                <pre className="mt-4 p-4 bg-gray-100 rounded text-xs overflow-auto">
                  {JSON.stringify(claimsError, null, 2)}
                </pre>
              </CardContent>
            </Card>
          </main>
        </div>
      )
    }

    const claimsData: Claim[] = claims || []

    // Statistieken met safe filtering
    const stats = {
      total: claimsData.length,
      nieuw: claimsData.filter(c => c.status === 'nieuw').length,
      in_behandeling: claimsData.filter(c => 
        c.status === 'in_behandeling' || c.status === 'in_onderhandeling'
      ).length,
      afgerond: claimsData.filter(c => c.status === 'afgerond').length,
      geweigerd: claimsData.filter(c => c.status === 'geweigerd').length,
      escalated: claimsData.filter(c => c.status === 'escalated').length,
    }

    return (
      <div className="min-h-screen bg-gray-50">
        <DashboardHeader user={user} />

        <main className="container mx-auto px-4 py-4 md:py-8">
          <div className="mb-4 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-1 md:mb-2 text-left">Mijn Claims</h1>
            <p className="text-muted-foreground text-sm md:text-base text-left">
              Overzicht van al uw schade claims
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-4 md:mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 px-4 pt-4 md:px-6 md:pt-6">
                <CardTitle className="text-xs md:text-sm font-medium text-left">Totaal Claims</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="px-4 pb-4 md:px-6 md:pb-6">
                <div className="text-xl md:text-2xl font-bold text-left">{stats.total}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 px-4 pt-4 md:px-6 md:pt-6">
                <CardTitle className="text-xs md:text-sm font-medium text-left">In Behandeling</CardTitle>
                <Clock className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent className="px-4 pb-4 md:px-6 md:pb-6">
                <div className="text-xl md:text-2xl font-bold text-left">{stats.in_behandeling}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 px-4 pt-4 md:px-6 md:pt-6">
                <CardTitle className="text-xs md:text-sm font-medium text-left">Afgerond</CardTitle>
                <FontAwesomeIcon icon={faCircleCheck} className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent className="px-4 pb-4 md:px-6 md:pb-6">
                <div className="text-xl md:text-2xl font-bold text-left">{stats.afgerond}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 px-4 pt-4 md:px-6 md:pt-6">
                <CardTitle className="text-xs md:text-sm font-medium text-left">Geweigerd</CardTitle>
                <XCircle className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent className="px-4 pb-4 md:px-6 md:pb-6">
                <div className="text-xl md:text-2xl font-bold text-left">{stats.geweigerd}</div>
              </CardContent>
            </Card>
          </div>

          {/* Claims List */}
          <ClaimsList claims={claimsData} />
        </main>
      </div>
    )
  } catch (error) {
    console.error('Dashboard page error:', error)
    
    // Fallback voor onverwachte errors
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="max-w-md border-red-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600">
              <AlertCircle className="h-5 w-5" />
              Er ging iets mis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              De dashboard pagina kon niet worden geladen.
            </p>
            <pre className="p-4 bg-gray-100 rounded text-xs overflow-auto">
              {error instanceof Error ? error.message : String(error)}
            </pre>
            <a 
              href="/dashboard" 
              className="inline-block px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
            >
              Probeer opnieuw
            </a>
          </CardContent>
        </Card>
      </div>
    )
  }
}
