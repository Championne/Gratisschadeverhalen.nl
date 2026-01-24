import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { ArrowLeft, FileText, Upload, AlertTriangle } from "lucide-react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons"

export const metadata: Metadata = {
  title: "Schade Verhalen Zonder Schadeformulier | Autoschadebureau.nl",
  description: "Geen Europees Schadeformulier ingevuld na een ongeval? U kunt nog steeds uw autoschade verhalen. Ontdek hoe u zonder formulier toch uw schade vergoed krijgt.",
  keywords: [
    "schade verhalen zonder formulier",
    "geen schadeformulier ingevuld",
    "autoschade zonder formulier",
    "schadeformulier vergeten",
    "kenteken tegenpartij schade"
  ],
}

export default function BlogPost() {
  return (
    <div className="min-h-screen bg-white">
      <article className="container mx-auto px-4 py-8 max-w-4xl">
        <Breadcrumbs items={[
          { label: "Blog", href: "/blog" },
          { label: "Schade verhalen zonder formulier" }
        ]} />

        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8">
          <ArrowLeft className="h-4 w-4" />
          Terug naar blog
        </Link>

        <header className="mb-12">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full font-medium">
              Praktisch
            </span>
            <span>•</span>
            <span>5 minuten leestijd</span>
            <span>•</span>
            <span>24 januari 2026</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Schade Verhalen Zonder Schadeformulier: Het Kan Wél!
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Geen Europees Schadeformulier ingevuld na het ongeval? Geen paniek! 
            U kunt nog steeds uw autoschade verhalen bij de tegenpartij. Wij leggen uit hoe.
          </p>
        </header>

        <Card className="bg-orange-50 border-orange-200 mb-12">
          <CardContent className="pt-6">
            <h2 className="font-bold mb-4 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              Belangrijke boodschap
            </h2>
            <p className="text-muted-foreground">
              Het Europees Schadeformulier is <strong>niet verplicht</strong> om uw schade te verhalen. 
              Het maakt het proces alleen makkelijker. Zonder formulier kunt u nog steeds uw volledige 
              schade vergoed krijgen – mits u het kenteken van de tegenpartij heeft genoteerd.
            </p>
          </CardContent>
        </Card>

        <div className="prose prose-lg max-w-none">
          
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Waarom mensen geen schadeformulier hebben</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Er zijn veel redenen waarom u mogelijk geen schadeformulier heeft ingevuld:
            </p>
            <ul className="space-y-3 text-muted-foreground mb-6">
              <li className="flex items-start gap-3">
                <span className="text-orange-500 mt-1">•</span>
                <span>De tegenpartij reed door (doorrijden na aanrijding)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-500 mt-1">•</span>
                <span>De tegenpartij weigerde mee te werken</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-500 mt-1">•</span>
                <span>U had geen schadeformulier bij de hand</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-500 mt-1">•</span>
                <span>In de stress vergeten om in te vullen</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-500 mt-1">•</span>
                <span>Parkeerschade: dader was niet aanwezig</span>
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Wat u wél nodig heeft</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Om uw schade te kunnen verhalen zonder schadeformulier, heeft u minimaal nodig:
            </p>
            
            <div className="bg-green-50 border-l-4 border-green-500 p-6 my-6">
              <h3 className="font-bold mb-3">Essentieel:</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <FontAwesomeIcon icon={faCircleCheck} className="h-5 w-5 text-green-600 mt-0.5" />
                  <span><strong>Kenteken tegenpartij</strong> - Dit is cruciaal! Hiermee kunnen wij de verzekeraar achterhalen.</span>
                </li>
                <li className="flex items-start gap-2">
                  <FontAwesomeIcon icon={faCircleCheck} className="h-5 w-5 text-green-600 mt-0.5" />
                  <span><strong>Foto's van de schade</strong> - Zo veel mogelijk, van verschillende hoeken</span>
                </li>
                <li className="flex items-start gap-2">
                  <FontAwesomeIcon icon={faCircleCheck} className="h-5 w-5 text-green-600 mt-0.5" />
                  <span><strong>Datum, tijd en locatie</strong> - Wanneer en waar gebeurde het?</span>
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-6">
              <h3 className="font-bold mb-3">Handig maar niet verplicht:</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Naam en contactgegevens tegenpartij</li>
                <li>• Getuigen en hun contactgegevens</li>
                <li>• Politierapport (bij doorrijden of letsel)</li>
                <li>• Dashcam beelden</li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Hoe wij het voor u regelen</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Bij Autoschadebureau.nl hebben we ruime ervaring met claims zonder schadeformulier. 
              Ons proces:
            </p>
            
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">1</div>
                <div>
                  <h4 className="font-bold">Kenteken controle</h4>
                  <p className="text-muted-foreground">Via het RDW en verzekeringsregisters achterhalen wij de WA-verzekeraar van de tegenpartij.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">2</div>
                <div>
                  <h4 className="font-bold">Aansprakelijkheid vaststellen</h4>
                  <p className="text-muted-foreground">Wij bouwen een dossier op basis van uw beschrijving, foto's en eventuele getuigenverklaringen.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">3</div>
                <div>
                  <h4 className="font-bold">Claim indienen</h4>
                  <p className="text-muted-foreground">Wij sturen een professionele aansprakelijkheidsbrief naar de verzekeraar.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">4</div>
                <div>
                  <h4 className="font-bold">Onderhandeling & uitbetaling</h4>
                  <p className="text-muted-foreground">Wij onderhandelen met de verzekeraar totdat u uw volledige schadevergoeding ontvangt.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Veelgestelde vragen</h2>
            
            <div className="space-y-6">
              <div className="border-l-4 border-primary pl-4">
                <h4 className="font-bold mb-2">Is mijn claim minder sterk zonder formulier?</h4>
                <p className="text-muted-foreground">
                  Het kan iets langer duren omdat er meer onderzoek nodig is, maar uw claim is zeker niet kansloos. 
                  Met het kenteken en goede foto's kunnen wij in de meeste gevallen een succesvolle claim indienen.
                </p>
              </div>
              
              <div className="border-l-4 border-primary pl-4">
                <h4 className="font-bold mb-2">Wat als de tegenpartij ontkent?</h4>
                <p className="text-muted-foreground">
                  Dan wordt het lastiger, maar niet onmogelijk. Getuigenverklaringen, camerabeelden en 
                  schadepatronen kunnen helpen de aansprakelijkheid aan te tonen.
                </p>
              </div>

              <div className="border-l-4 border-primary pl-4">
                <h4 className="font-bold mb-2">Hoe lang heb ik om een claim in te dienen?</h4>
                <p className="text-muted-foreground">
                  De verjaringstermijn is 3 jaar, maar wij adviseren zo snel mogelijk te handelen. 
                  Hoe eerder, hoe beter de bewijspositie.
                </p>
              </div>
            </div>
          </section>

        </div>

        {/* CTA */}
        <Card className="bg-gradient-to-r from-primary to-blue-700 text-white mt-12">
          <CardContent className="py-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Geen schadeformulier? Wij helpen u toch!
            </h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Upload uw gegevens en foto's, en wij regelen de rest. 100% gratis - de tegenpartij betaalt alles.
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
