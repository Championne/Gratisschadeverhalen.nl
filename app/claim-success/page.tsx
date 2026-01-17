import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, ArrowRight, Home } from "lucide-react"

export const metadata: Metadata = {
  title: "Claim Succesvol Ingediend",
  description: "Je schade claim is succesvol ingediend",
}

export default function ClaimSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <Card className="max-w-lg w-full">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <CardTitle className="text-2xl">Claim Succesvol Ingediend!</CardTitle>
          <CardDescription>
            We hebben je schade claim ontvangen en gaan er direct mee aan de slag
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold mb-2">Wat gebeurt er nu?</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-primary">1.</span>
                <span>Binnen 24 uur beoordelen we je claim en nemen contact met je op</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">2.</span>
                <span>We stellen een professionele aansprakelijkheidsbrief op</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">3.</span>
                <span>We sturen de brief naar de WA-verzekeraar van de tegenpartij</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">4.</span>
                <span>We onderhandelen voor je en zorgen voor de uitbetaling</span>
              </li>
            </ul>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <span>💡</span>
              Tip: Maak een account aan
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              Maak een gratis account aan om je claim status real-time te volgen in je persoonlijke dashboard.
            </p>
            <Link href="/registreren">
              <Button variant="outline" size="sm" className="w-full">
                Account Aanmaken
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-muted-foreground text-center">
              We hebben een bevestigingsmail gestuurd naar je email adres.
            </p>
            <p className="text-sm text-muted-foreground text-center">
              Vragen? Bel ons op <strong>088-1234567</strong> of email naar{" "}
              <a href="mailto:info@gratisschadeverhalen.nl" className="text-primary hover:underline">
                info@gratisschadeverhalen.nl
              </a>
            </p>
          </div>

          <div className="flex justify-center">
            <Link href="/">
              <Button variant="outline">
                <Home className="mr-2 h-4 w-4" />
                Terug naar Home
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
