import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { ArrowLeft, Euro, Upload, Calculator, TrendingDown, CheckCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Eigen Risico Vermijden: Waarom Direct Verhalen Slimmer Is | 112autoschade.nl",
  description: "Betaal GEEN €500+ eigen risico! Ontdek waarom verhalen bij de tegenpartij financieel voordeliger is dan via uw eigen verzekering claimen.",
  keywords: ["eigen risico vermijden", "eigen risico autoschade", "schade verhalen eigen risico", "geen eigen risico betalen"],
}

export default function BlogPost() {
  return (
    <div className="min-h-screen bg-white">
      <article className="container mx-auto px-4 py-8 max-w-4xl">
        <Breadcrumbs items={[
          { label: "Blog", href: "/blog" },
          { label: "Eigen risico vermijden" }
        ]} />

        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8">
          <ArrowLeft className="h-4 w-4" />
          Terug naar blog
        </Link>

        <header className="mb-12">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">Financieel</span>
            <span>•</span>
            <span>4 minuten leestijd</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Eigen Risico Vermijden: Waarom Direct Verhalen Slimmer Is
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Bij de meeste autoverzekeringen betaalt u €150 tot €500 eigen risico. Maar als een ander 
            schuldig is aan uw schade, hoeft u dit helemaal niet te betalen. Ontdek hoe.
          </p>
        </header>

        <div className="prose prose-lg max-w-none">
          <h2>Wat is eigen risico eigenlijk?</h2>
          
          <p>
            Het eigen risico is het bedrag dat u zelf moet betalen voordat uw verzekering uitkeert. 
            Bij cascoverzekeringen ligt dit meestal tussen de €150 en €500, afhankelijk van uw polis. 
            Dit betekent dat bij een schade van €2.000 u eerst zelf €500 betaalt en de verzekering 
            de overige €1.500.
          </p>

          <Card className="bg-red-50 border-red-200 my-6">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Euro className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold mb-2">Voorbeeld: claimen via eigen verzekering</h3>
                  <ul className="text-muted-foreground space-y-1">
                    <li>Schade: €3.000</li>
                    <li>Eigen risico: -€500</li>
                    <li>Uitkering verzekering: €2.500</li>
                    <li className="text-red-600 font-medium">U betaalt zelf: €500</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <h2>De verborgen kosten: no-claim verlies</h2>

          <p>
            Naast het eigen risico is er nog een verborgen kostenpost: het verlies van uw no-claim 
            korting. Wanneer u claimt bij uw eigen verzekering, daalt uw korting meestal met 2 tot 
            5 treden. Dit kan leiden tot honderden euro's extra premie per jaar.
          </p>

          <div className="grid md:grid-cols-2 gap-4 my-8">
            <Card className="border-2 border-red-200">
              <CardContent className="pt-6">
                <TrendingDown className="h-8 w-8 text-red-600 mb-4" />
                <h3 className="font-bold text-lg mb-2">Via eigen verzekering</h3>
                <ul className="text-sm space-y-2 text-muted-foreground">
                  <li>• Eigen risico: €500</li>
                  <li>• No-claim verlies: ~€300/jaar</li>
                  <li>• Premiestijging: mogelijk</li>
                  <li className="font-bold text-red-600">Totale kosten: €800+</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-200">
              <CardContent className="pt-6">
                <CheckCircle className="h-8 w-8 text-green-600 mb-4" />
                <h3 className="font-bold text-lg mb-2">Verhalen bij tegenpartij</h3>
                <ul className="text-sm space-y-2 text-muted-foreground">
                  <li>• Eigen risico: €0</li>
                  <li>• No-claim: blijft behouden</li>
                  <li>• Premie: geen stijging</li>
                  <li className="font-bold text-green-600">Totale kosten: €0</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <h2>Hoe werkt verhalen bij de tegenpartij?</h2>

          <p>
            Wanneer een ander aansprakelijk is voor uw schade, kunt u deze verhalen bij de 
            WA-verzekering van die persoon. De WA-verzekering is wettelijk verplicht en dekt 
            schade die de verzekerde aan anderen veroorzaakt.
          </p>

          <p>
            Het proces werkt als volgt:
          </p>

          <ol>
            <li>U documenteert de schade en verzamelt gegevens van de tegenpartij</li>
            <li>U (of wij namens u) stelt de tegenpartij aansprakelijk</li>
            <li>De WA-verzekeraar beoordeelt de claim</li>
            <li>Bij akkoord wordt de volledige schade vergoed</li>
          </ol>

          <h2>Wanneer kunt u verhalen?</h2>

          <p>
            U kunt schade verhalen wanneer:
          </p>

          <ul>
            <li>Een ander (deels) aansprakelijk is voor het ongeval</li>
            <li>U de gegevens van de tegenpartij heeft (kenteken is vaak voldoende)</li>
            <li>Er een <Link href="/blog/europees-schadeformulier-invullen" className="text-primary hover:underline">Europees schadeformulier</Link> is ingevuld (niet verplicht maar wel handig)</li>
          </ul>

          <Card className="bg-green-50 border-green-200 my-6">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Calculator className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold mb-2">Voorbeeld: verhalen bij tegenpartij</h3>
                  <ul className="text-muted-foreground space-y-1">
                    <li>Schade: €3.000</li>
                    <li>Eigen risico: €0</li>
                    <li>Vergoeding: €3.000</li>
                    <li className="text-green-600 font-medium">U betaalt: €0</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <h2>Ook met allrisk verzekering?</h2>

          <p>
            Ja! Ook wanneer u allrisk verzekerd bent, is verhalen bij de tegenpartij voordeliger. 
            U betaalt dan geen eigen risico en uw no-claim korting blijft behouden. De allrisk 
            verzekering is er voor situaties waarin u zelf schuld heeft of de dader onbekend is.
          </p>

          <h2>Wij helpen u gratis</h2>

          <p>
            Het verhalen van schade kan complex zijn. Verzekeraars proberen vaak de schade te 
            minimaliseren of aansprakelijkheid te betwisten. Wij kennen alle trucjes en zorgen 
            dat u krijgt waar u recht op heeft.
          </p>

          <p>
            Het mooiste? Onze service is volledig gratis. De kosten worden verhaald op de 
            tegenpartij, net als uw schade.
          </p>
        </div>

        <Card className="bg-gradient-to-r from-primary to-blue-700 text-white mt-12">
          <CardContent className="py-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Geen eigen risico betalen? Laat ons verhalen!</h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              100% gratis, geen eigen risico, geen no-claim verlies. De tegenpartij betaalt alles.
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
