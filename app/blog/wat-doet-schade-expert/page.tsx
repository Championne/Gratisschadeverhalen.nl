import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { ArrowLeft, Search, Upload, CheckCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Wat Doet een Schade-Expert? | Expertise bij Autoschade Uitgelegd",
  description: "Ontdek wat een schade-expert doet, wanneer expertise nodig is en hoe het proces werkt. Alles over taxatie en schadebegroting.",
  keywords: [
    "schade expert",
    "auto expertise",
    "schadebegroting",
    "taxateur autoschade",
    "expertise rapport auto"
  ],
}

export default function BlogPost() {
  return (
    <div className="min-h-screen bg-white">
      <article className="container mx-auto px-4 py-8 max-w-4xl">
        <Breadcrumbs items={[
          { label: "Blog", href: "/blog" },
          { label: "Wat doet een schade-expert" }
        ]} />

        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8">
          <ArrowLeft className="h-4 w-4" />
          Terug naar blog
        </Link>

        <header className="mb-12">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-medium">
              Proces
            </span>
            <span>•</span>
            <span>5 minuten leestijd</span>
            <span>•</span>
            <span>24 januari 2026</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Wat Doet een Schade-Expert Precies?
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Bij autoschade hoort u vaak over 'expertise' of een 'schade-expert'. 
            Maar wat doet zo iemand precies en wanneer is het nodig?
          </p>
        </header>

        <Card className="bg-blue-50 border-blue-200 mb-12">
          <CardContent className="pt-6">
            <h2 className="font-bold mb-4 flex items-center gap-2">
              <Search className="h-5 w-5 text-blue-600" />
              Kort samengevat
            </h2>
            <p className="text-muted-foreground">
              Een schade-expert is een onafhankelijke specialist die de schade aan uw auto 
              beoordeelt, een <strong>schadebegroting</strong> maakt en bepaalt of reparatie 
              zinvol is of dat uw auto <strong>total loss</strong> is.
            </p>
          </CardContent>
        </Card>

        <div className="prose prose-lg max-w-none">
          
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">De taken van een schade-expert</h2>
            
            <div className="space-y-6">
              <div className="border-l-4 border-primary pl-6">
                <h3 className="font-bold mb-2">1. Schadebegroting maken</h3>
                <p className="text-muted-foreground">
                  De expert berekent wat de reparatie gaat kosten: onderdelen, arbeidsloon, 
                  spuitwerk, etc. Dit rapport is de basis voor de uitkering.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="font-bold mb-2">2. Total loss beoordeling</h3>
                <p className="text-muted-foreground">
                  Als de reparatiekosten hoger zijn dan de dagwaarde van de auto, is deze 
                  'total loss'. De expert stelt dan de dagwaarde vast.
                </p>
              </div>

              <div className="border-l-4 border-green-500 pl-6">
                <h3 className="font-bold mb-2">3. Waardevermindering berekenen</h3>
                <p className="text-muted-foreground">
                  Bij nieuwere auto's berekent de expert hoeveel de auto minder waard is 
                  geworden door het ongeval, ook na reparatie.
                </p>
              </div>

              <div className="border-l-4 border-orange-500 pl-6">
                <h3 className="font-bold mb-2">4. Contra-expertise</h3>
                <p className="text-muted-foreground">
                  Bent u het niet eens met de begroting van de verzekeraar? Dan kunt u een 
                  eigen expert inschakelen voor een tweede mening.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Wanneer komt er een expert langs?</h2>
            
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="border p-4 rounded-lg">
                <h4 className="font-bold mb-2 text-green-700">Wel expertise</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Schade boven €1.000 - €2.000</li>
                  <li>• Vermoeden van total loss</li>
                  <li>• Complexe schade</li>
                  <li>• Geschil over schadehoogte</li>
                  <li>• Claim op waardevermindering</li>
                </ul>
              </div>
              <div className="border p-4 rounded-lg">
                <h4 className="font-bold mb-2">Vaak geen expertise</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Kleine schade (deuk, kras)</li>
                  <li>• Duidelijke schadeoorzaak</li>
                  <li>• Foto's zijn voldoende</li>
                  <li>• Garage-offerte wordt geaccepteerd</li>
                </ul>
              </div>
            </div>

            <p className="text-muted-foreground">
              Bij veel kleine claims wordt tegenwoordig gewerkt met <strong>foto-expertise</strong>: 
              u stuurt foto's op en de expert maakt op afstand een begroting.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Het expertise-proces stap voor stap</h2>
            
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">1</div>
                <div>
                  <h4 className="font-bold">Afspraak maken</h4>
                  <p className="text-muted-foreground text-sm">De expert neemt contact op voor een afspraak, bij u thuis of op een expertiselocatie.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">2</div>
                <div>
                  <h4 className="font-bold">Inspectie (15-30 minuten)</h4>
                  <p className="text-muted-foreground text-sm">De expert bekijkt de schade, maakt foto's en noteert alle beschadigingen.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">3</div>
                <div>
                  <h4 className="font-bold">Rapport opstellen</h4>
                  <p className="text-muted-foreground text-sm">Binnen enkele dagen ontvangt u het expertiserapport met de schadebegroting.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">4</div>
                <div>
                  <h4 className="font-bold">Uitkering</h4>
                  <p className="text-muted-foreground text-sm">Op basis van het rapport betaalt de verzekeraar de schadevergoeding uit.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Wie betaalt de expert?</h2>
            
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span><strong>Expertise door verzekeraar:</strong> altijd gratis voor u</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span><strong>Contra-expertise:</strong> kosten worden verhaald op tegenpartij als u gelijk krijgt</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span><strong>Bij verhaal op tegenpartij:</strong> expertisekosten zijn onderdeel van uw claim</span>
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Tips bij expertise</h2>
            
            <div className="bg-blue-50 p-6 rounded-lg space-y-3">
              <p className="text-muted-foreground">
                <strong>💡 Tip 1:</strong> Laat uw auto nog niet repareren vóór de expertise. 
                De expert moet de originele schade kunnen zien.
              </p>
              <p className="text-muted-foreground">
                <strong>💡 Tip 2:</strong> Wijs de expert op alle schade, ook kleine deuken of krassen 
                die u misschien over het hoofd ziet.
              </p>
              <p className="text-muted-foreground">
                <strong>💡 Tip 3:</strong> Vraag om een kopie van het expertiserapport - u heeft 
                hier recht op.
              </p>
            </div>
          </section>

        </div>

        {/* CTA */}
        <Card className="bg-gradient-to-r from-primary to-blue-700 text-white mt-12">
          <CardContent className="py-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Wij regelen de expertise voor u
            </h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Bij het verhalen van uw schade zorgen wij voor de juiste expertise. 
              Alle kosten worden verhaald op de tegenpartij - u betaalt niets.
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
