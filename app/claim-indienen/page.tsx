import { Metadata } from "next"
import { ClaimForm } from "@/components/claim-form"
import { Shield, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Claim Indienen",
  description: "Dien je autoschade claim in. Volledig gratis, 100% no cure no pay.",
}

export default function ClaimIndienenPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">Gratisschadeverhalen.nl</span>
          </Link>
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Terug naar home
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Dien je Claim In
            </h1>
            <p className="text-lg text-muted-foreground">
              Vul onderstaand formulier in en wij nemen binnen 24 uur contact met je op.
              <br />
              <strong className="text-primary">100% gratis, no cure no pay.</strong>
            </p>
          </div>

          <ClaimForm />
        </div>
      </main>
    </div>
  )
}
