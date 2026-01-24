import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { ArrowLeft, Upload, AlertTriangle } from "lucide-react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons"

export const metadata: Metadata = {
  title: "Schade Door Openstaand Autoportier | Wie Is Aansprakelijk?",
  description: "Schade door een openstaand autoportier van een ander? Of heeft iemand tegen uw portier gereden? Ontdek wie aansprakelijk is en hoe u uw schade verhaalt.",
  keywords: [
    "schade openstaand portier",
    "autoportier schade",
    "portier tegen auto",
    "aansprakelijkheid portier schade",
    "deukschade portier"
  ],
}

export default function BlogPost() {
  return (
    <div className="min-h-screen bg-white">
      <article className="container mx-auto px-4 py-8 max-w-4xl">
        <Breadcrumbs items={[
          { label: "Blog", href: "/blog" },
          { label: "Schade door openstaand portier" }
        ]} />

        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8">
          <ArrowLeft className="h-4 w-4" />
          Terug naar blog
        </Link>

        <header className="mb-12">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full font-medium">
              Situaties
            </span>
            <span>•</span>
            <span>5 minuten leestijd</span>
            <span>•</span>
            <span>24 januari 2026</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Schade Door Openstaand Autoportier: Wie Betaalt?
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Een veelvoorkomende situatie: iemand opent zijn autoportier net op het moment dat u langsrijdt. 
            Of uw portier wordt geraakt door een passerende auto. Wie is aansprakelijk?
          </p>
        </header>

        <div className="prose prose-lg max-w-none">
          
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Scenario 1: Iemand opent portier, u rijdt ertegenaan</h2>
            
            <Card className="bg-green-50 border-green-200 mb-6">
              <CardContent className="pt-6">
                <h3 className="font-bold mb-3 flex items-center gap-2">
                  <FontAwesomeIcon icon={faCircleCheck} className="h-5 w-5 text-green-600" />
                  De portieropener is aansprakelijk
                </h3>
                <p className="text-muted-foreground">
                  Volgens de wet moet een bestuurder of passagier <strong>eerst kijken</strong> voordat 
                  hij/zij het portier opent. Wie dit nalaat en daardoor schade veroorzaakt, is aansprakelijk.
                </p>
              </CardContent>
            </Card>

            <p className="text-muted-foreground mb-4">
              Dit staat in artikel 5.5.43 van het Reglement Verkeersregels en Verkeerstekens (RVV):
            </p>
            <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground mb-6">
              "Bestuurders en passagiers mogen de portieren van een voertuig niet openen zonder zich 
              ervan te hebben vergewist dat dit geen gevaar of hinder voor andere weggebruikers kan opleveren."
            </blockquote>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Scenario 2: Uw portier wordt geraakt door passerende auto</h2>
            
            <Card className="bg-orange-50 border-orange-200 mb-6">
              <CardContent className="pt-6">
                <h3 className="font-bold mb-3 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                  Dit hangt af van de situatie
                </h3>
                <p className="text-muted-foreground">
                  Als <strong>u</strong> het portier opende zonder te kijken, bent u zelf aansprakelijk. 
                  Maar als de passerende auto te dicht langs geparkeerde auto's reed, kan die bestuurder 
                  (mede-)aansprakelijk zijn.
                </p>
              </CardContent>
            </Card>

            <h3 className="font-bold mb-3">Factoren die meespelen:</h3>
            <ul className="space-y-2 text-muted-foreground mb-6">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Heeft u gekeken voordat u het portier opende?</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Reed de andere auto met aangepaste snelheid?</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Was er voldoende ruimte om langs te rijden?</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Zijn er getuigen of camerabeelden?</span>
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Wat te doen na portierschade?</h2>
            
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">1</div>
                <div>
                  <h4 className="font-bold">Noteer gegevens</h4>
                  <p className="text-muted-foreground">Kenteken, naam, telefoonnummer en verzekeraar van de tegenpartij.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">2</div>
                <div>
                  <h4 className="font-bold">Maak foto's</h4>
                  <p className="text-muted-foreground">Fotografeer beide auto's, de schade en de situatie ter plaatse.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">3</div>
                <div>
                  <h4 className="font-bold">Vul schadeformulier in</h4>
                  <p className="text-muted-foreground">Bij voorkeur samen met de tegenpartij het Europees Schadeformulier.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">4</div>
                <div>
                  <h4 className="font-bold">Meld bij ons</h4>
                  <p className="text-muted-foreground">Wij verhalen de schade gratis bij de verzekeraar van de tegenpartij.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Veelgestelde vragen</h2>
            
            <div className="space-y-6">
              <div className="border-l-4 border-primary pl-4">
                <h4 className="font-bold mb-2">Wat als de tegenpartij is weggereden?</h4>
                <p className="text-muted-foreground">
                  Als u het kenteken heeft, kunnen wij de verzekeraar achterhalen en alsnog claimen. 
                  Zonder kenteken wordt het helaas lastig, tenzij er getuigen of camerabeelden zijn.
                </p>
              </div>
              
              <div className="border-l-4 border-primary pl-4">
                <h4 className="font-bold mb-2">Is dit ook van toepassing op fietsers?</h4>
                <p className="text-muted-foreground">
                  Ja! Als een fietser tegen uw openstaande portier rijdt, bent u als portieropener 
                  meestal aansprakelijk. Bij letsel kan dit zelfs strafrechtelijke gevolgen hebben.
                </p>
              </div>

              <div className="border-l-4 border-primary pl-4">
                <h4 className="font-bold mb-2">Wordt waardevermindering ook vergoed?</h4>
                <p className="text-muted-foreground">
                  Ja, naast de reparatiekosten kunt u ook waardevermindering claimen als uw auto 
                  na reparatie minder waard is geworden.
                </p>
              </div>
            </div>
          </section>

        </div>

        <Card className="bg-gradient-to-r from-primary to-blue-700 text-white mt-12">
          <CardContent className="py-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Portierschade? Wij regelen het gratis!
            </h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Upload uw gegevens en wij verhalen de schade bij de tegenpartij. U betaalt niets.
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
