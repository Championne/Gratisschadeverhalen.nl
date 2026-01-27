import { Metadata } from "next"
import { ClaimForm } from "@/components/claim-form"
import { Shield, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Autoschade Claim Indienen | Gratis Schade Verhalen op Tegenpartij",
  description: "Dien uw autoschade claim gratis en snel in bij Gratisschadeverhalen.nl. Wij verhalen kosteloos uw voertuigschade op de WA-verzekeraar van de tegenpartij. Begin nu!",
  keywords: [
    "autoschade claim indienen",
    "gratis schade claimen",
    "schade melden tegenpartij",
    "voertuigschade indienen",
    "WA schade claimen",
    "auto schadeformulier",
    "online schade melden"
  ],
}

export default function ClaimIndienenPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-6">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Start Nu: Gratis Autoschade Claim Indienen bij Tegenpartij
            </h1>
            <p className="text-lg text-muted-foreground">
              Vul onderstaand formulier in en wij nemen binnen 24 uur contact met je op.
              <br />
              <strong className="text-primary">Snelle expertise, u betaalt niets.</strong>
            </p>
          </div>

          <ClaimForm />
        </div>
      </main>
    </div>
  )
}
