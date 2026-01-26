import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { ArrowLeft, Clock, Upload, AlertTriangle, Calendar } from "lucide-react"

export const metadata: Metadata = {
  title: "Verjaringstermijn Autoschade | Hoe Lang Kunt U Claimen?",
  description: "Let op de verjaringstermijn! Ontdek binnen welke periode u uw autoschade moet verhalen. Na 3 jaar vervalt uw recht op schadevergoeding.",
  keywords: [
    "verjaringstermijn autoschade",
    "hoe lang schade claimen",
    "verjaring schadeclaim",
    "termijn schade verhalen",
    "wanneer vervalt schadeclaim"
  ],
}

export default function BlogPost() {
  return (
    <div className="min-h-screen bg-white">
      <article className="container mx-auto px-4 py-8 max-w-4xl">
        <Breadcrumbs items={[
          { label: "Blog", href: "/blog" },
          { label: "Verjaringstermijn autoschade" }
        ]} />

        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8">
          <ArrowLeft className="h-4 w-4" />
          Terug naar blog
        </Link>

        <header className="mb-12">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-medium">
              Juridisch
            </span>
            <span>•</span>
            <span>5 minuten leestijd</span>
            <span>•</span>
            <span>24 januari 2026</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Verjaringstermijn Autoschade: Hoe Lang Kunt U Claimen?
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Te lang wachten met uw schadeclaim kan fataal zijn. Na een bepaalde periode vervalt 
            uw recht op vergoeding volledig. Ontdek welke termijnen gelden.
          </p>
        </header>

        <Card className="bg-red-50 border-red-200 mb-12">
          <CardContent className="pt-6">
            <h2 className="font-bold mb-4 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              Belangrijke waarschuwing
            </h2>
            <p className="text-muted-foreground">
              <strong>Na 3 jaar vervalt uw recht om schade te verhalen!</strong> Deze termijn begint 
              te lopen vanaf het moment dat u bekend werd met de schade en de aansprakelijke persoon.
            </p>
          </CardContent>
        </Card>

        <div className="prose prose-lg max-w-none">
          
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">De verjaringstermijnen op een rij</h2>
            
            <div className="space-y-4">
              <Card className="border-l-4 border-l-primary">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-2xl font-bold text-primary">3</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">3 jaar - Korte verjaringstermijn</h3>
                      <p className="text-muted-foreground">
                        Vanaf het moment dat u de schade en de veroorzaker kent. Dit is de termijn 
                        die in de praktijk het meest relevant is.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-amber-500">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center">
                      <span className="text-2xl font-bold text-amber-600">20</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">20 jaar - Lange verjaringstermijn</h3>
                      <p className="text-muted-foreground">
                        Absolute maximumtermijn vanaf de schadeveroorzakende gebeurtenis. Ook als u 
                        niet wist wie de veroorzaker was.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Wanneer begint de termijn te lopen?</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              De 3-jarige verjaringstermijn begint pas te lopen wanneer u:
            </p>
            <ul className="space-y-3 text-muted-foreground mb-6">
              <li className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                <span><strong>De schade kent</strong> - U weet dat uw auto beschadigd is</span>
              </li>
              <li className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                <span><strong>De aansprakelijke persoon kent</strong> - U weet wie de veroorzaker is</span>
              </li>
            </ul>
            
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="pt-6">
                <h4 className="font-bold mb-2">Voorbeeld</h4>
                <p className="text-muted-foreground text-sm">
                  Stel: uw auto wordt op 15 januari 2026 aangereden. U kent direct de dader en 
                  de schade. Dan loopt de termijn af op 15 januari 2029.
                </p>
              </CardContent>
            </Card>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Stuiting: de verjaring onderbreken</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              U kunt de verjaringstermijn <strong>stuiten</strong> (onderbreken). Na stuiting begint 
              een nieuwe termijn van 3 jaar te lopen. Dit kan op verschillende manieren:
            </p>
            
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold flex-shrink-0">1</div>
                <div>
                  <h3 className="font-bold mb-1">Schriftelijke aanmaning</h3>
                  <p className="text-muted-foreground text-sm">
                    Een brief waarin u ondubbelzinnig aangeeft dat u uw recht op schadevergoeding 
                    voorbehoudt. Verstuur aangetekend!
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold flex-shrink-0">2</div>
                <div>
                  <h3 className="font-bold mb-1">Erkenning door de schuldenaar</h3>
                  <p className="text-muted-foreground text-sm">
                    Als de tegenpartij of verzekeraar erkent dat er een vordering is (bijv. door 
                    een deelbetaling of schriftelijke erkenning).
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold flex-shrink-0">3</div>
                <div>
                  <h3 className="font-bold mb-1">Dagvaarding</h3>
                  <p className="text-muted-foreground text-sm">
                    Het starten van een gerechtelijke procedure stuit de verjaring definitief.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Speciale situaties</h2>
            
            <div className="space-y-6">
              <div className="border-l-4 border-primary pl-4">
                <h4 className="font-bold mb-2">🚗 Doorrijden na ongeval (hit and run)</h4>
                <p className="text-muted-foreground">
                  Als de veroorzaker doorrijdt en u kent de dader niet, begint de 3-jarige termijn 
                  pas te lopen zodra u de identiteit achterhaalt. De 20-jarige termijn loopt wel.
                </p>
              </div>
              
              <div className="border-l-4 border-primary pl-4">
                <h4 className="font-bold mb-2">👶 Minderjarige slachtoffers</h4>
                <p className="text-muted-foreground">
                  Voor minderjarigen begint de verjaringstermijn pas te lopen vanaf hun 18e verjaardag. 
                  Een kind dat op 10-jarige leeftijd letsel oploopt, kan tot 21 jaar claimen.
                </p>
              </div>

              <div className="border-l-4 border-primary pl-4">
                <h4 className="font-bold mb-2">🏥 Letselschade</h4>
                <p className="text-muted-foreground">
                  Bij letselschade kan de termijn later beginnen als de volledige omvang van het 
                  letsel pas later duidelijk wordt. Vaak geldt hier een ruimere termijn.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Wat gebeurt er na verjaring?</h2>
            
            <Card className="bg-red-50 border-red-200 mb-6">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-6 w-6 text-red-600 flex-shrink-0" />
                  <div>
                    <p className="font-bold mb-2">Na verjaring verliest u ALLE rechten</p>
                    <ul className="text-muted-foreground text-sm space-y-1">
                      <li>• U kunt geen vordering meer indienen</li>
                      <li>• De rechter wijst uw claim af</li>
                      <li>• De verzekeraar hoeft niet meer te betalen</li>
                      <li>• Dit is onomkeerbaar!</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Praktische tips</h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border p-4 rounded-lg bg-green-50">
                <h4 className="font-bold mb-3 text-green-700 flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Wacht niet te lang
                </h4>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Dien uw claim zo snel mogelijk in</li>
                  <li>• Bewijs gaat verloren met de tijd</li>
                  <li>• Getuigen vergeten details</li>
                  <li>• Hoe eerder, hoe beter</li>
                </ul>
              </div>
              <div className="border p-4 rounded-lg bg-blue-50">
                <h4 className="font-bold mb-3 text-blue-700 flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Houd termijnen bij
                </h4>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Noteer de ongevalsdatum</li>
                  <li>• Zet een herinnering 2,5 jaar later</li>
                  <li>• Bewaar alle correspondentie</li>
                  <li>• Stuit tijdig indien nodig</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Veelgestelde vragen</h2>
            
            <div className="space-y-6">
              <div className="border-l-4 border-primary pl-4">
                <h4 className="font-bold mb-2">Mijn ongeval was 2 jaar geleden, kan ik nog claimen?</h4>
                <p className="text-muted-foreground">
                  Ja! U heeft nog 1 jaar voordat de termijn verloopt. Dien zo snel mogelijk uw 
                  claim in om geen risico te lopen.
                </p>
              </div>
              
              <div className="border-l-4 border-primary pl-4">
                <h4 className="font-bold mb-2">De verzekeraar reageert al maanden niet, verjaart mijn claim?</h4>
                <p className="text-muted-foreground">
                  De termijn loopt door, ook als de verzekeraar traag is. Stuur een stuitingsbrief 
                  als u zich zorgen maakt over de termijn.
                </p>
              </div>

              <div className="border-l-4 border-primary pl-4">
                <h4 className="font-bold mb-2">Wat als de verzekeraar na 2,5 jaar afwijst?</h4>
                <p className="text-muted-foreground">
                  U heeft dan nog 6 maanden om bezwaar te maken of een procedure te starten. 
                  Handel snel en stuit de verjaring!
                </p>
              </div>
            </div>
          </section>

        </div>

        {/* CTA */}
        <Card className="bg-gradient-to-r from-primary to-blue-700 text-white mt-12">
          <CardContent className="py-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Wacht niet langer - dien vandaag uw claim in
            </h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Hoe langer u wacht, hoe groter het risico. Upload uw schadeformulier nu en 
              wij starten direct met het verhalen van uw schade.
            </p>
            <Link href="/claim-indienen">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                <Upload className="mr-2 h-5 w-5" />
                Nu Claim Indienen
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Related Articles */}
        <section className="mt-12">
          <h3 className="text-xl font-bold mb-4">Gerelateerde artikelen</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/blog/schuldvraag-verkeersongeval">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardContent className="pt-6">
                  <p className="font-semibold">Schuldvraag bij verkeersongeval</p>
                  <p className="text-sm text-muted-foreground">Hoe wordt schuld vastgesteld?</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/blog/aansprakelijkheid-verkeersongeval">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardContent className="pt-6">
                  <p className="font-semibold">Aansprakelijkheid bij verkeersongevallen</p>
                  <p className="text-sm text-muted-foreground">Wie betaalt de schade?</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>

      </article>
    </div>
  )
}
