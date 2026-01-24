import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { ArrowLeft, AlertCircle, Upload, Scale } from "lucide-react"

export const metadata: Metadata = {
  title: "Verzekeraar Betaalt Te Weinig | Wat Kunt U Doen?",
  description: "Krijgt u te weinig schadevergoeding van de verzekeraar? Ontdek uw opties: contra-expertise, bezwaar maken en hoe wij kunnen helpen.",
  keywords: [
    "verzekeraar betaalt te weinig",
    "te lage schadevergoeding",
    "bezwaar verzekeraar",
    "contra expertise",
    "geschil verzekeraar"
  ],
}

export default function BlogPost() {
  return (
    <div className="min-h-screen bg-white">
      <article className="container mx-auto px-4 py-8 max-w-4xl">
        <Breadcrumbs items={[
          { label: "Blog", href: "/blog" },
          { label: "Verzekeraar betaalt te weinig" }
        ]} />

        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8">
          <ArrowLeft className="h-4 w-4" />
          Terug naar blog
        </Link>

        <header className="mb-12">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full font-medium">
              Geschillen
            </span>
            <span>•</span>
            <span>6 minuten leestijd</span>
            <span>•</span>
            <span>24 januari 2026</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Verzekeraar Betaalt Te Weinig: Dit Kunt U Doen
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            De verzekeraar biedt minder dan u verwachtte? U hoeft dit niet te accepteren. 
            Er zijn meerdere manieren om een hogere vergoeding te krijgen.
          </p>
        </header>

        <Card className="bg-amber-50 border-amber-200 mb-12">
          <CardContent className="pt-6">
            <h2 className="font-bold mb-4 flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-amber-600" />
              Wist u dit?
            </h2>
            <p className="text-muted-foreground">
              Verzekeraars bieden vaak in eerste instantie <strong>10-30% minder</strong> dan 
              de werkelijke schade. Onderhandelen of bezwaar maken levert bijna altijd meer op!
            </p>
          </CardContent>
        </Card>

        <div className="prose prose-lg max-w-none">
          
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Waarom bieden verzekeraars te weinig?</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Verzekeraars zijn commerciële bedrijven die kosten willen beperken. 
              Veelvoorkomende redenen voor een te laag aanbod:
            </p>
            <ul className="space-y-3 text-muted-foreground mb-6">
              <li className="flex items-start gap-3">
                <span className="text-red-500 font-bold">•</span>
                <span><strong>Te lage dagwaarde:</strong> Ze gebruiken verouderde databases of vergelijkbare auto's in slechtere staat</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 font-bold">•</span>
                <span><strong>Geen waardevermindering:</strong> Dit claimen ze vaak niet, maar u heeft er wel recht op</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 font-bold">•</span>
                <span><strong>Bijkomende kosten vergeten:</strong> Huurauto, expertisekosten, reiskosten worden 'vergeten'</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 font-bold">•</span>
                <span><strong>Goedkope reparatie-opties:</strong> Ze kiezen voor namaak-onderdelen of de goedkoopste garage</span>
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Uw opties bij een te laag aanbod</h2>
            
            <div className="space-y-6">
              <div className="border-l-4 border-primary pl-6">
                <h3 className="font-bold mb-2">1. Bezwaar maken</h3>
                <p className="text-muted-foreground mb-2">
                  Schrijf een brief waarin u uitlegt waarom u het niet eens bent met het aanbod. 
                  Onderbouw dit met bewijsmateriaal.
                </p>
                <p className="text-sm text-green-700">
                  <strong>Tip:</strong> Vraag om een specificatie van hoe ze tot het bedrag zijn gekomen.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="font-bold mb-2">2. Contra-expertise aanvragen</h3>
                <p className="text-muted-foreground mb-2">
                  U kunt een eigen onafhankelijke expert inschakelen voor een tweede mening. 
                  Bij gelijk krijgt de tegenpartij ook deze kosten.
                </p>
                <p className="text-sm text-green-700">
                  <strong>Tip:</strong> Dit is vooral zinvol bij total loss en waardevermindering.
                </p>
              </div>

              <div className="border-l-4 border-green-500 pl-6">
                <h3 className="font-bold mb-2">3. NIVRE-register raadplegen</h3>
                <p className="text-muted-foreground mb-2">
                  Als beide experts het niet eens worden, kan een derde expert uit het 
                  NIVRE-register worden ingeschakeld als arbiter.
                </p>
              </div>

              <div className="border-l-4 border-orange-500 pl-6">
                <h3 className="font-bold mb-2">4. Kifid (Klachteninstituut)</h3>
                <p className="text-muted-foreground mb-2">
                  Het Kifid behandelt klachten over verzekeraars gratis. Hun uitspraken zijn 
                  vaak bindend voor de verzekeraar.
                </p>
              </div>

              <div className="border-l-4 border-purple-500 pl-6">
                <h3 className="font-bold mb-2">5. Rechtszaak (laatste redmiddel)</h3>
                <p className="text-muted-foreground mb-2">
                  Bij grote bedragen kan een rechtszaak zinvol zijn. De proceskosten worden 
                  meestal op de verliezer verhaald.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Concrete stappen om meer te krijgen</h2>
            
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">1</div>
                <div>
                  <h4 className="font-bold">Vraag om specificatie</h4>
                  <p className="text-muted-foreground text-sm">Vraag de verzekeraar exact uit te leggen hoe ze tot het bedrag zijn gekomen.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">2</div>
                <div>
                  <h4 className="font-bold">Verzamel bewijs</h4>
                  <p className="text-muted-foreground text-sm">Zoek vergelijkbare auto's op Marktplaats/AutoTrack om de juiste waarde aan te tonen.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">3</div>
                <div>
                  <h4 className="font-bold">Claim alle posten</h4>
                  <p className="text-muted-foreground text-sm">Vergeet geen bijkomende kosten: huurauto, expertisekosten, reiskosten, waardevermindering.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">4</div>
                <div>
                  <h4 className="font-bold">Schakel hulp in</h4>
                  <p className="text-muted-foreground text-sm">Een specialist kent de trucs van verzekeraars en weet welke bedragen realistisch zijn.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Veelgestelde vragen</h2>
            
            <div className="space-y-6">
              <div className="border-l-4 border-primary pl-4">
                <h4 className="font-bold mb-2">Kan ik nog bezwaar maken als ik al akkoord ben gegaan?</h4>
                <p className="text-muted-foreground">
                  Lastig, maar soms mogelijk. Als u onder druk akkoord ging of als er nieuwe 
                  feiten zijn, kunt u proberen het besluit te herzien.
                </p>
              </div>
              
              <div className="border-l-4 border-primary pl-4">
                <h4 className="font-bold mb-2">Hoe lang duurt een bezwaarprocedure?</h4>
                <p className="text-muted-foreground">
                  Meestal 4-8 weken. Bij escalatie naar Kifid kan het 3-6 maanden duren.
                </p>
              </div>

              <div className="border-l-4 border-primary pl-4">
                <h4 className="font-bold mb-2">Kost contra-expertise veel geld?</h4>
                <p className="text-muted-foreground">
                  Circa €150-€300. Als u gelijk krijgt, worden deze kosten vergoed door de 
                  tegenpartij. Bij verhaal via ons zijn de kosten altijd gedekt.
                </p>
              </div>
            </div>
          </section>

        </div>

        {/* CTA */}
        <Card className="bg-gradient-to-r from-primary to-blue-700 text-white mt-12">
          <CardContent className="py-8 text-center">
            <Scale className="h-12 w-12 mx-auto mb-4 opacity-90" />
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Laat ons onderhandelen met de verzekeraar
            </h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Wij weten precies welke bedragen realistisch zijn en onderhandelen namens u voor 
              de beste uitkomst. U betaalt niets - alle kosten worden verhaald.
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
