import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Home, FileText } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"

export default async function ClaimSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ claimId?: string }>
}) {
  const params = await searchParams
  const claimId = params.claimId

  // Check if user is logged in
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!claimId) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-2xl">
        <Card className="border-red-200">
          <CardContent className="pt-6">
            <p className="text-center text-red-600">
              Geen claim ID gevonden. Ga terug naar de homepage.
            </p>
            <div className="mt-4 text-center">
              <Link href="/">
                <Button>
                  <Home className="mr-2 h-4 w-4" />
                  Naar Homepage
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <CheckCircle className="h-10 w-10 text-green-600" />
        </div>
        <h1 className="text-4xl font-bold mb-2">Claim Succesvol Ingediend!</h1>
        <p className="text-xl text-muted-foreground">
          We gaan direct voor je aan de slag
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>✅ Wat hebben we gedaan?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="text-green-600 mt-1">✓</div>
            <div>
              <p className="font-semibold">Claim opgeslagen</p>
              <p className="text-sm text-muted-foreground">
                Je claim is veilig opgeslagen met ID: <code>{claimId.substring(0, 8)}</code>
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="text-green-600 mt-1">✓</div>
            <div>
              <p className="font-semibold">AI Agent analyse</p>
              <p className="text-sm text-muted-foreground">
                Onze AI heeft je claim geanalyseerd op letselschade en aansprakelijkheid
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="text-green-600 mt-1">✓</div>
            <div>
              <p className="font-semibold">Bevestigingsmail verstuurd</p>
              <p className="text-sm text-muted-foreground">
                Check je inbox voor de bevestiging en volgende stappen
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>⏭️ Wat gebeurt er nu?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="text-blue-600 font-bold">1.</div>
            <div>
              <p className="font-semibold">We analyseren je claim</p>
              <p className="text-sm text-muted-foreground">
                Binnen 1-2 werkdagen krijg je een update over de beoordeling
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="text-blue-600 font-bold">2.</div>
            <div>
              <p className="font-semibold">Aansprakelijkheidsbrief</p>
              <p className="text-sm text-muted-foreground">
                Als de tegenpartij aansprakelijk is, sturen we een brief
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="text-blue-600 font-bold">3.</div>
            <div>
              <p className="font-semibold">Schade verhalen</p>
              <p className="text-sm text-muted-foreground">
                Wij regelen de communicatie met de verzekeraar
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="text-blue-600 font-bold">4.</div>
            <div>
              <p className="font-semibold">Uitbetaling</p>
              <p className="text-sm text-muted-foreground">
                Je ontvangt de schadevergoeding - u betaalt niets
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {!user && (
        <Card className="bg-blue-50 border-blue-200 mb-6">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <FileText className="h-5 w-5 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-blue-900 mb-2">
                  💡 TIP: Maak een account aan
                </p>
                <p className="text-sm text-blue-700 mb-3">
                  Met een account kun je de status van je claim realtime volgen en direct updates ontvangen.
                </p>
                <Link href="/registreren">
                  <Button variant="outline" size="sm">
                    Account Aanmaken
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex gap-3 justify-center">
        <Link href="/">
          <Button variant="outline">
            <Home className="mr-2 h-4 w-4" />
            Naar Homepage
          </Button>
        </Link>
        <Link href={user ? `/dashboard/claim/${claimId}` : "/login"}>
          <Button>
            {user ? "Bekijk je Claim" : "Volg je Claim"}
          </Button>
        </Link>
      </div>
    </div>
  )
}
