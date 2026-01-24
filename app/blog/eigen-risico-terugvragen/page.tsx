import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { ArrowLeft, Euro, Upload, CheckCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Eigen Risico Terugvragen bij Schade door Ander | Zo Werkt Het",
  description: "Heeft u eigen risico betaald terwijl een ander schuldig was? Ontdek hoe u dit bedrag kunt terugvorderen van de tegenpartij.",
  keywords: [
    "eigen risico terugvragen",
    "eigen risico verhalen",
    "eigen risico tegenpartij",
    "schade door ander eigen risico",
    "eigen risico claimen"
  ],
}

export default function BlogPost() {
  return (
    <div className="min-h-screen bg-white">
      <article className="container mx-auto px-4 py-8 max-w-4xl">
        <Breadcrumbs items={[
          { label: "Blog", href: "/blog" },
          { label: "Eigen risico terugvragen" }
        ]} />

        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8">
          <ArrowLeft className="h-4 w-4" />
          Terug naar blog
        </Link>

        <header className="mb-12">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
              Kosten
            </span>
            <span>•</span>
            <span>4 minuten leestijd</span>
            <span>•</span>
            <span>24 januari 2026</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Eigen Risico Terugvragen: Zo Krijgt U Uw Geld Terug
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Schade gemeld bij uw eigen verzekering en eigen risico betaald? Als een ander schuldig 
            was, kunt u dit bedrag terugvorderen. Wij leggen uit hoe.
          </p>
        </header>

        <Card className="bg-green-50 border-green-200 mb-12">
          <CardContent className="pt-6">
            <h2 className="font-bold mb-4 flex items-center gap-2">
              <Euro className="h-5 w-5 text-green-600" />
              Het goede nieuws
            </h2>
            <p className="text-muted-foreground">
              <strong>Uw eigen risico (vaak €150 tot €500) kunt u volledig terugkrijgen</strong> van 
              de WA-verzekeraar van de schuldige partij. Dit geldt ook voor uw no-claimkorting!
            </p>
          </CardContent>
        </Card>

        <div className="prose prose-lg max-w-none">
          
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Waarom betaalt u soms eigen risico?</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Bij een ongeval heeft u twee opties om de schade te laten repareren:
            </p>
            
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="border p-4 rounded-lg">
                <h4 className="font-bold mb-2">Optie 1: Via uw eigen cascoverzekering</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>✓ Snelle afhandeling</li>
                  <li>✗ U betaalt eigen risico</li>
                  <li>✗ Mogelijk premieverhoging</li>
                </ul>
              </div>
              <div className="border p-4 rounded-lg border-green-300 bg-green-50">
                <h4 className="font-bold mb-2 text-green-700">Optie 2: Verhalen op tegenpartij</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>✓ Geen eigen risico</li>
                  <li>✓ Geen premieverhoging</li>
                  <li>✓ 100% gratis</li>
                </ul>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              Veel mensen kiezen voor optie 1 omdat ze niet weten dat optie 2 bestaat, of denken 
              dat het veel gedoe is. Met onze hulp is het verhalen echter simpeler dan via uw 
              eigen verzekering!
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Situatie 1: U heeft nog niet geclaimd bij uw verzekering</h2>
            
            <p className="text-muted-foreground mb-4">
              <strong>Dit is de beste situatie.</strong> Claim niet bij uw eigen verzekering, maar 
              verhaal de schade direct op de tegenpartij:
            </p>

            <ul className="space-y-3 text-muted-foreground mb-6">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Geen eigen risico</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Geen invloed op uw premie of no-claimkorting</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Volledige vergoeding van alle schade</span>
              </li>
            </ul>

            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">
                  <strong>Tip:</strong> Heeft u alleen WA-verzekering (geen casco)? Dan is verhalen 
                  op de tegenpartij uw enige optie. Wij helpen u graag!
                </p>
              </CardContent>
            </Card>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Situatie 2: U heeft al geclaimd en eigen risico betaald</h2>
            
            <p className="text-muted-foreground mb-4">
              Ook dan kunt u uw eigen risico nog terugkrijgen! Dit heet <strong>subrogatie</strong>: 
              uw verzekering neemt uw vordering over en verhaalt de schade op de tegenpartij.
            </p>

            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">1</div>
                <div>
                  <h4 className="font-bold">Neem contact op met uw verzekering</h4>
                  <p className="text-muted-foreground text-sm">Vraag of zij het eigen risico gaan verhalen op de tegenpartij.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">2</div>
                <div>
                  <h4 className="font-bold">Vaak doen verzekeraars dit automatisch</h4>
                  <p className="text-muted-foreground text-sm">Bij succesvolle verhaal krijgt u uw eigen risico terug.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">3</div>
                <div>
                  <h4 className="font-bold">Lukt het niet? Wij kunnen helpen</h4>
                  <p className="text-muted-foreground text-sm">Soms weigert de verzekering of duurt het te lang. Wij nemen het over.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Ook uw no-claimkorting terugkrijgen</h2>
            
            <p className="text-muted-foreground mb-4">
              Heeft u door de claim uw no-claimkorting verloren? Ook dit kunt u terugvorderen! 
              Het bedrag van de verloren korting (het verschil in premie) is verhaalbare schade.
            </p>

            <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>Voorbeeld:</strong> Uw premie steeg van €400 naar €500 per jaar door de claim. 
                Dit verschil van €100 per jaar (voor de komende jaren tot herstel van de korting) 
                kunt u claimen bij de tegenpartij.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Veelgestelde vragen</h2>
            
            <div className="space-y-6">
              <div className="border-l-4 border-primary pl-4">
                <h4 className="font-bold mb-2">Hoe lang heb ik om eigen risico terug te vragen?</h4>
                <p className="text-muted-foreground">
                  De verjaringstermijn is 5 jaar na het ongeval. Maar wacht niet te lang - bewijs 
                  kan verloren gaan.
                </p>
              </div>
              
              <div className="border-l-4 border-primary pl-4">
                <h4 className="font-bold mb-2">Wat als de tegenpartij geen schuld erkent?</h4>
                <p className="text-muted-foreground">
                  Wij onderzoeken de aansprakelijkheid en onderhandelen namens u. In de meeste 
                  gevallen lukt het om de schade te verhalen.
                </p>
              </div>

              <div className="border-l-4 border-primary pl-4">
                <h4 className="font-bold mb-2">Kost dit mij iets?</h4>
                <p className="text-muted-foreground">
                  Nee! Alle kosten voor het verhalen worden betaald door de WA-verzekeraar van de 
                  tegenpartij. U betaalt letterlijk niets.
                </p>
              </div>
            </div>
          </section>

        </div>

        {/* CTA */}
        <Card className="bg-gradient-to-r from-primary to-blue-700 text-white mt-12">
          <CardContent className="py-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Eigen risico betaald? Wij halen het terug!
            </h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Of u nu wel of niet al bij uw eigen verzekering heeft geclaimd - wij kunnen 
              uw eigen risico en andere kosten verhalen op de schuldige partij.
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
