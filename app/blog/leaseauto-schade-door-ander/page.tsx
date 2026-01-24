import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { ArrowLeft, Car, Upload, AlertTriangle } from "lucide-react"

export const metadata: Metadata = {
  title: "Leaseauto Schade Door Ander | Wie Betaalt? Zo Werkt Het",
  description: "Schade aan uw leaseauto door een ander? Ontdek wie aansprakelijk is, wat u moet doen en hoe u extra kosten vermijdt.",
  keywords: [
    "leaseauto schade door ander",
    "lease auto aanrijding",
    "schade lease auto wie betaalt",
    "leaseauto eigen risico",
    "schade verhalen leaseauto"
  ],
}

export default function BlogPost() {
  return (
    <div className="min-h-screen bg-white">
      <article className="container mx-auto px-4 py-8 max-w-4xl">
        <Breadcrumbs items={[
          { label: "Blog", href: "/blog" },
          { label: "Leaseauto schade door ander" }
        ]} />

        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8">
          <ArrowLeft className="h-4 w-4" />
          Terug naar blog
        </Link>

        <header className="mb-12">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
              Zakelijk
            </span>
            <span>•</span>
            <span>5 minuten leestijd</span>
            <span>•</span>
            <span>24 januari 2026</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Leaseauto Schade Door Ander: Wie Betaalt Wat?
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Rijdt u in een leaseauto en krijgt u schade door een ander? De situatie is iets 
            complexer dan bij een eigen auto, maar de schade is nog steeds verhaalbaar.
          </p>
        </header>

        <Card className="bg-amber-50 border-amber-200 mb-12">
          <CardContent className="pt-6">
            <h2 className="font-bold mb-4 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
              Belangrijk om te weten
            </h2>
            <p className="text-muted-foreground">
              Bij een leaseauto is de <strong>leasemaatschappij</strong> eigenaar van de auto. 
              U moet de schade altijd eerst bij hen melden. Maar: u kunt nog steeds uw 
              eigen kosten verhalen op de tegenpartij!
            </p>
          </CardContent>
        </Card>

        <div className="prose prose-lg max-w-none">
          
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Stap-voor-stap: wat te doen bij schade aan uw leaseauto</h2>
            
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">1</div>
                <div>
                  <h3 className="font-bold mb-2">Vul het Europees Schadeformulier in</h3>
                  <p className="text-muted-foreground">Wissel gegevens uit met de tegenpartij en maak foto's van de schade.</p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">2</div>
                <div>
                  <h3 className="font-bold mb-2">Meld de schade bij de leasemaatschappij</h3>
                  <p className="text-muted-foreground">Dit is verplicht volgens uw leasecontract. Zij regelen meestal de reparatie via hun netwerk.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">3</div>
                <div>
                  <h3 className="font-bold mb-2">Verhaal uw eigen kosten</h3>
                  <p className="text-muted-foreground">Eigen risico, waardevermindering en andere kosten kunt u claimen bij de tegenpartij.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Welke kosten kunt u als leaserrijder verhalen?</h2>
            
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="border border-green-300 bg-green-50 p-4 rounded-lg">
                <h4 className="font-bold mb-3 text-green-700">✓ Wel verhaalbaar</h4>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• <strong>Eigen risico</strong> (vaak €250-€500)</li>
                  <li>• <strong>Waardevermindering</strong> (bij nieuwe auto's)</li>
                  <li>• <strong>Verhoging leasebedrag</strong> (door schade)</li>
                  <li>• <strong>Vervangend vervoer</strong> tijdens reparatie</li>
                  <li>• <strong>Reiskosten</strong> naar garage</li>
                </ul>
              </div>
              <div className="border p-4 rounded-lg">
                <h4 className="font-bold mb-3">Wie betaalt de reparatie?</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  De reparatiekosten worden betaald door:
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• De leasemaatschappij claimt dit bij de tegenpartij</li>
                  <li>• Of via de cascoverzekering van de lease</li>
                  <li>• U betaalt alleen uw eigen risico</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Private lease vs. zakelijke lease</h2>
            
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="font-bold mb-2">Private lease</h3>
                <p className="text-muted-foreground mb-2">
                  U bent als privépersoon de leasenemer. Het eigen risico komt voor uw rekening 
                  en kan vaak €500 of meer zijn.
                </p>
                <p className="text-sm text-green-700">
                  <strong>Tip:</strong> Dit eigen risico is 100% verhaalbaar op de schuldige partij!
                </p>
              </div>

              <div className="border-l-4 border-purple-500 pl-6">
                <h3 className="font-bold mb-2">Zakelijke lease (auto van de baas)</h3>
                <p className="text-muted-foreground mb-2">
                  Uw werkgever is de leasenemer. Check uw arbeidsvoorwaarden - soms moet u het 
                  eigen risico zelf betalen bij schade.
                </p>
                <p className="text-sm text-green-700">
                  <strong>Tip:</strong> Ook dit eigen risico kan verhaald worden, ook als u het 
                  aan uw werkgever heeft betaald.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Veelgestelde vragen bij lease-schade</h2>
            
            <div className="space-y-6">
              <div className="border-l-4 border-primary pl-4">
                <h4 className="font-bold mb-2">Moet ik de schade zelf regelen met de leasemaatschappij?</h4>
                <p className="text-muted-foreground">
                  U hoeft alleen de schade te melden. De leasemaatschappij regelt de reparatie 
                  en de claim op de tegenpartij. Maar uw persoonlijke kosten (eigen risico) 
                  kunt u apart verhalen via ons.
                </p>
              </div>
              
              <div className="border-l-4 border-primary pl-4">
                <h4 className="font-bold mb-2">Krijg ik een vervangende auto tijdens de reparatie?</h4>
                <p className="text-muted-foreground">
                  Dit hangt af van uw leasecontract. Sommige contracten bieden vervangend vervoer, 
                  andere niet. De kosten voor vervangend vervoer zijn hoe dan ook verhaalbaar 
                  op de tegenpartij.
                </p>
              </div>

              <div className="border-l-4 border-primary pl-4">
                <h4 className="font-bold mb-2">Heeft de schade invloed op mijn leasecontract?</h4>
                <p className="text-muted-foreground">
                  Bij kleine schade meestal niet. Bij total loss of grote schade kan de 
                  leasemaatschappij het contract aanpassen of beëindigen. Check uw voorwaarden.
                </p>
              </div>
            </div>
          </section>

        </div>

        {/* CTA */}
        <Card className="bg-gradient-to-r from-primary to-blue-700 text-white mt-12">
          <CardContent className="py-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Schade aan uw leaseauto? Verhaal uw kosten gratis
            </h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Wij helpen u uw eigen risico en andere kosten terug te krijgen van de schuldige 
              partij - zonder extra kosten voor u.
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
