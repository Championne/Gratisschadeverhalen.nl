import { Metadata } from "next"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { AdminClaimsTable } from "@/components/admin/claims-table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Beheer alle claims en gebruikers",
}

export default async function AdminDashboardPage() {
  const supabase = await createClient()

  // Check if user is authenticated
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  // TODO: Add admin role check when role system is implemented
  // For now, any authenticated user can access admin

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

  // Fetch all claims (naam and email are already in claims table)
  const { data: claims, error } = await supabaseAdmin
    .from("claims")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching claims:", error)
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h2 className="text-red-800 font-semibold mb-2">Database Error</h2>
          <p className="text-red-600 text-sm">{error.message}</p>
          <pre className="mt-2 text-xs bg-red-100 p-2 rounded overflow-auto">
            {JSON.stringify(error, null, 2)}
          </pre>
        </div>
      </div>
    )
  }

  // Calculate stats
  const totalClaims = claims?.length || 0
  const newClaims = claims?.filter(c => c.status === 'nieuw').length || 0
  const inBehandeling = claims?.filter(c => c.status === 'in_behandeling').length || 0
  const afgerond = claims?.filter(c => c.status === 'afgerond').length || 0

  // Debug logging
  console.log('[Admin Dashboard] Total claims fetched:', totalClaims)
  console.log('[Admin Dashboard] First claim sample:', claims?.[0])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Beheer alle claims en bekijk statistieken
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Totaal Claims</CardDescription>
            <CardTitle className="text-3xl">{totalClaims}</CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Nieuw</CardDescription>
            <CardTitle className="text-3xl text-blue-600">{newClaims}</CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>In Behandeling</CardDescription>
            <CardTitle className="text-3xl text-orange-600">{inBehandeling}</CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Afgerond</CardDescription>
            <CardTitle className="text-3xl text-green-600">{afgerond}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Claims Table */}
      <Card>
        <CardHeader>
          <CardTitle>Alle Claims</CardTitle>
          <CardDescription>
            Overzicht van alle ingediende claims
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList>
              <TabsTrigger value="all">Alle ({totalClaims})</TabsTrigger>
              <TabsTrigger value="nieuw">Nieuw ({newClaims})</TabsTrigger>
              <TabsTrigger value="in_behandeling">In Behandeling ({inBehandeling})</TabsTrigger>
              <TabsTrigger value="afgerond">Afgerond ({afgerond})</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              <AdminClaimsTable claims={claims || []} />
            </TabsContent>

            <TabsContent value="nieuw" className="mt-6">
              <AdminClaimsTable 
                claims={claims?.filter(c => c.status === 'nieuw') || []} 
              />
            </TabsContent>

            <TabsContent value="in_behandeling" className="mt-6">
              <AdminClaimsTable 
                claims={claims?.filter(c => c.status === 'in_behandeling') || []} 
              />
            </TabsContent>

            <TabsContent value="afgerond" className="mt-6">
              <AdminClaimsTable 
                claims={claims?.filter(c => c.status === 'afgerond') || []} 
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
