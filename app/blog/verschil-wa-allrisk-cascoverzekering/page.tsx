import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { ArrowLeft, Shield, Upload, CheckCircle, XCircle, AlertTriangle } from "lucide-react"

export const metadata: Metadata = {
  title: "WA, Beperkt Casco of Allrisk: Welke Verzekering voor Schade Verhalen? | Autoschadebureau.nl",
  description: "Verwar de verzekeringen niet! Ontdek het verschil tussen WA, casco en allrisk en wanneer u zelf schade moet verhalen bij de tegenpartij.",
  keywords: ["WA verzekering", "allrisk", "beperkt casco", "autoverzekering verschil", "schade verhalen verzekering"],
}

export default function BlogPost() {
  return (
    <div className="min-h-screen bg-white">
      <article className="container mx-auto px-4 py-8 max-w-4xl">
        <Breadcrumbs items={[
          { label: "Blog", href: "/blog" },
          { label: "WA, Casco of Allrisk" }
        ]} />

        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8">
          <ArrowLeft className="h-4 w-4" />
          Terug naar blog
        </Link>

        <header className="mb-12">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">Verzekeringen</span>
            <span>•</span>
            <span>5 minuten leestijd</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            WA, Beperkt Casco of Allrisk: Welke Verzekering voor Schade Verhalen?
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Het verschil tussen autoverzekeringen begrijpen is essentieel wanneer u schade heeft. 
            Uw type verzekering bepaalt namelijk of u zelf actie moet ondernemen om uw schade vergoed te krijgen.
          </p>
        </header>

        <div className="prose prose-lg max-w-none">
          <h2>De drie soorten autoverzekeringen</h2>
          
          <p>
            In Nederland kent elke automobilist de wettelijk verplichte WA-verzekering. Maar wat dekt 
            deze precies? En wat is het verschil met casco en allrisk? Het antwoord bepaalt of u na 
            een ongeval <Link href="/claim-indienen" className="text-primary hover:underline">zelf uw schade moet verhalen</Link>.
          </p>

          <div className="grid md:grid-cols-3 gap-4 my-8">
            <Card className="border-2 border-orange-200">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">WA-verzekering</h3>
                <p className="text-sm text-muted-foreground mb-4">Wettelijk verplicht minimum</p>
                <ul className="text-sm space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Schade aan anderen
                  </li>
                  <li className="flex items-center gap-2">
                    <XCircle className="h-4 w-4 text-red-500" />
                    Eigen autoschade
                  </li>
                  <li className="flex items-center gap-2">
                    <XCircle className="h-4 w-4 text-red-500" />
                    Diefstal
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-200">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">Beperkt Casco</h3>
                <p className="text-sm text-muted-foreground mb-4">WA + extra dekking</p>
                <ul className="text-sm space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Schade aan anderen
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Diefstal, brand, storm
                  </li>
                  <li className="flex items-center gap-2">
                    <XCircle className="h-4 w-4 text-red-500" />
                    Eigen schuld schade
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-200">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">Allrisk</h3>
                <p className="text-sm text-muted-foreground mb-4">Meest complete dekking</p>
                <ul className="text-sm space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Schade aan anderen
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Alle vormen van schade
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Ook eigen schuld
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <h2>Wanneer moet u zelf schade verhalen?</h2>

          <p>
            Hier komt het cruciale punt: <strong>geen enkele autoverzekering vergoedt automatisch 
            uw schade wanneer een ander schuldig is</strong>. Ook met allrisk niet! Het verschil zit 
            in wat er gebeurt als u het via uw eigen verzekering claimt:
          </p>

          <Card className="bg-amber-50 border-amber-200 my-6">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold mb-2">Let op bij claimen via eigen verzekering</h3>
                  <ul className="text-muted-foreground space-y-2">
                    <li>• U betaalt eigen risico (vaak €150-€500)</li>
                    <li>• Uw no-claim korting kan dalen</li>
                    <li>• Premie kan stijgen bij volgende verlenging</li>
                    <li>• Bij WA/beperkt casco: schade wordt niet vergoed!</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <h2>De slimme aanpak: verhalen bij de tegenpartij</h2>

          <p>
            Wanneer een ander aansprakelijk is voor uw schade, is het altijd voordeliger om de schade 
            te verhalen bij de WA-verzekering van de tegenpartij. Dit geldt voor alle verzekeringen:
          </p>

          <ul>
            <li><strong>Bij WA-verzekering:</strong> Verhalen is uw enige optie om schade vergoed te krijgen</li>
            <li><strong>Bij beperkt casco:</strong> Verhalen voorkomt eigen risico en premiestijging</li>
            <li><strong>Bij allrisk:</strong> Verhalen bespaart u eigen risico en behoudt uw no-claim</li>
          </ul>

          <h2>Wat als de tegenpartij onverzekerd is?</h2>

          <p>
            In zeldzame gevallen heeft de tegenpartij geen geldige WA-verzekering. Dan kunt u een 
            claim indienen bij het <strong>Waarborgfonds Motorverkeer</strong>. Dit fonds vergoedt 
            schade veroorzaakt door onverzekerde of onbekende motorrijtuigen. Let op: dit is een 
            complexe procedure. Wij richten ons op claims waarbij de tegenpartij een bekende verzekeraar heeft.
          </p>

          <h2>Conclusie</h2>

          <p>
            Ongeacht welke autoverzekering u heeft: wanneer een ander schuldig is aan uw schade, 
            is verhalen bij de tegenpartij de beste optie. U betaalt geen eigen risico, uw 
            no-claim blijft intact en de volledige schade wordt vergoed.
          </p>

          <p>
            Wij helpen u graag met het <Link href="/" className="text-primary hover:underline">verhalen van uw autoschade</Link>. 
            Volledig gratis, want de tegenpartij betaalt alle kosten.
          </p>
        </div>

        <Card className="bg-gradient-to-r from-primary to-blue-700 text-white mt-12">
          <CardContent className="py-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Schade door een ander? Wij verhalen het gratis!</h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Ongeacht uw verzekering - wij zorgen dat de tegenpartij betaalt. Geen eigen risico, geen premiestijging.
            </p>
            <Link href="/claim-indienen">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                <Upload className="mr-2 h-5 w-5" />
                Gratis Claim Indienen
              </Button>
            </Link>
          </CardContent>
        </Card>
      </article>
    </div>
  )
}
