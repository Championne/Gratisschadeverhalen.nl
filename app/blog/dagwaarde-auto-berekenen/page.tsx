import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { ArrowLeft, Calculator, Upload, TrendingDown } from "lucide-react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons"

export const metadata: Metadata = {
  title: "Dagwaarde Auto Berekenen na Schade | Complete Uitleg 2026",
  description: "Hoe wordt de dagwaarde van uw auto bepaald na een ongeval? Leer hoe verzekeraars rekenen en voorkom dat u te weinig krijgt. Tips van experts.",
  keywords: [
    "dagwaarde auto berekenen",
    "dagwaarde auto schade",
    "waarde auto na ongeval",
    "total loss dagwaarde",
    "auto waarde bepalen verzekeraar"
  ],
}

export default function BlogPost() {
  return (
    <div className="min-h-screen bg-white">
      <article className="container mx-auto px-4 py-8 max-w-4xl">
        <Breadcrumbs items={[
          { label: "Blog", href: "/blog" },
          { label: "Dagwaarde auto berekenen" }
        ]} />

        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8">
          <ArrowLeft className="h-4 w-4" />
          Terug naar blog
        </Link>

        <header className="mb-12">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
              Financieel
            </span>
            <span>•</span>
            <span>6 minuten leestijd</span>
            <span>•</span>
            <span>24 januari 2026</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Dagwaarde Auto Berekenen: Zo Krijgt U Waar U Recht Op Heeft
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Bij autoschade speelt de dagwaarde een cruciale rol. Maar hoe wordt deze bepaald? 
            En hoe voorkomt u dat de verzekeraar te weinig uitkeert? Wij leggen het uit.
          </p>
        </header>

        <Card className="bg-blue-50 border-blue-200 mb-12">
          <CardContent className="pt-6">
            <h2 className="font-bold mb-4 flex items-center gap-2">
              <Calculator className="h-5 w-5 text-blue-600" />
              Wat is dagwaarde?
            </h2>
            <p className="text-muted-foreground">
              De <strong>dagwaarde</strong> is de marktwaarde van uw auto direct vóór het ongeval. 
              Dit is het bedrag waarvoor u dezelfde auto (zelfde leeftijd, kilometerstand, staat) 
              zou kunnen kopen op de vrije markt.
            </p>
          </CardContent>
        </Card>

        <div className="prose prose-lg max-w-none">
          
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Wanneer is de dagwaarde belangrijk?</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              De dagwaarde speelt vooral een rol bij:
            </p>
            <ul className="space-y-3 text-muted-foreground mb-6">
              <li className="flex items-start gap-3">
                <FontAwesomeIcon icon={faCircleCheck} className="h-5 w-5 text-green-600 mt-0.5" />
                <span><strong>Total loss</strong> - Als de reparatiekosten hoger zijn dan de dagwaarde</span>
              </li>
              <li className="flex items-start gap-3">
                <FontAwesomeIcon icon={faCircleCheck} className="h-5 w-5 text-green-600 mt-0.5" />
                <span><strong>Waardevermindering</strong> - Het verschil in waarde na reparatie</span>
              </li>
              <li className="flex items-start gap-3">
                <FontAwesomeIcon icon={faCircleCheck} className="h-5 w-5 text-green-600 mt-0.5" />
                <span><strong>Economisch total loss</strong> - Wanneer reparatie niet meer rendabel is</span>
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Hoe berekenen verzekeraars de dagwaarde?</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Verzekeraars gebruiken verschillende methoden om de dagwaarde te bepalen:
            </p>
            
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-bold mb-3">1. Koerslijsten</h3>
                <p className="text-muted-foreground mb-2">
                  De meest gebruikte methode. Bekende koerslijsten zijn:
                </p>
                <ul className="text-muted-foreground space-y-1">
                  <li>• <strong>ANWB Koerslijst</strong> - Meest gangbaar in Nederland</li>
                  <li>• <strong>Eurotax</strong> - Europese standaard</li>
                  <li>• <strong>Autotelex</strong> - Veel gebruikt door dealers</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-bold mb-3">2. Vergelijkingsmateriaal</h3>
                <p className="text-muted-foreground">
                  Vergelijkbare auto's op Marktplaats, AutoTrack of bij dealers worden bekeken 
                  om de marktwaarde te bepalen.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-bold mb-3">3. Taxatierapport</h3>
                <p className="text-muted-foreground">
                  Een onafhankelijk expert stelt de waarde vast op basis van inspectie en marktonderzoek.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Factoren die de dagwaarde beïnvloeden</h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border p-4 rounded-lg">
                <TrendingDown className="h-6 w-6 text-red-500 mb-2" />
                <h4 className="font-bold mb-2">Waardeverlagend</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Hoge kilometerstand</li>
                  <li>• Eerdere schadehistorie</li>
                  <li>• Slechte staat/onderhoud</li>
                  <li>• Ongebruikelijke kleur</li>
                  <li>• Rokersauto</li>
                </ul>
              </div>
              <div className="border p-4 rounded-lg">
                <FontAwesomeIcon icon={faCircleCheck} className="h-6 w-6 text-green-500 mb-2" />
                <h4 className="font-bold mb-2">Waardeverhogend</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Lage kilometerstand</li>
                  <li>• Volledig dealeronderhoud</li>
                  <li>• Extra opties/accessoires</li>
                  <li>• Nieuwe banden/APK</li>
                  <li>• Populaire kleur/uitvoering</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Verzekeraar biedt te weinig? Dit kunt u doen</h2>
            
            <div className="bg-orange-50 border-l-4 border-orange-500 p-6 my-6">
              <h3 className="font-bold mb-3">Let op: verzekeraars proberen vaak te laag uit te keren!</h3>
              <p className="text-muted-foreground">
                Het is geen geheim dat verzekeraars proberen kosten te besparen. 
                Ze gebruiken soms verouderde koerslijsten of negeren waardeverhogerende factoren.
              </p>
            </div>

            <p className="text-muted-foreground leading-relaxed mb-4">
              <strong>Wat u kunt doen:</strong>
            </p>
            <ul className="space-y-3 text-muted-foreground mb-6">
              <li className="flex items-start gap-3">
                <span className="font-bold text-primary">1.</span>
                <span><strong>Vraag het taxatierapport op</strong> - U heeft recht op inzage</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold text-primary">2.</span>
                <span><strong>Verzamel vergelijkingsmateriaal</strong> - Screenshots van vergelijkbare auto's</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold text-primary">3.</span>
                <span><strong>Toon extra waarde aan</strong> - Onderhoudshistorie, opties, nieuwe onderdelen</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold text-primary">4.</span>
                <span><strong>Vraag hertaxatie aan</strong> - U kunt een contra-expertise laten uitvoeren</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold text-primary">5.</span>
                <span><strong>Schakel een expert in</strong> - Wij onderhandelen namens u</span>
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Voorbeeldberekening</h2>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-bold mb-4">Situatie: Volkswagen Golf 2020, 65.000 km</h4>
              <table className="w-full text-sm">
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 text-muted-foreground">Basiswaarde koerslijst</td>
                    <td className="py-2 text-right font-medium">€ 18.500</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 text-muted-foreground">Correctie km-stand (lager dan gemiddeld)</td>
                    <td className="py-2 text-right font-medium text-green-600">+ € 800</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 text-muted-foreground">Extra opties (navigatie, LED)</td>
                    <td className="py-2 text-right font-medium text-green-600">+ € 650</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 text-muted-foreground">Dealer onderhouden</td>
                    <td className="py-2 text-right font-medium text-green-600">+ € 400</td>
                  </tr>
                  <tr className="font-bold">
                    <td className="py-3">Dagwaarde</td>
                    <td className="py-3 text-right text-primary">€ 20.350</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

        </div>

        {/* CTA */}
        <Card className="bg-gradient-to-r from-primary to-blue-700 text-white mt-12">
          <CardContent className="py-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Wij zorgen voor een eerlijke uitkering
            </h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Onze experts onderhandelen met de verzekeraar zodat u krijgt waar u recht op heeft. 
              100% gratis - de tegenpartij betaalt alles.
            </p>
            <Link href="/claim-indienen">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                <Upload className="mr-2 h-5 w-5" />
                Schade Melden
              </Button>
            </Link>
          </CardContent>
        </Card>

      </article>
    </div>
  )
}
