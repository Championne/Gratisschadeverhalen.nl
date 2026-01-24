import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { ArrowLeft, Car, Upload } from "lucide-react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons"

export const metadata: Metadata = {
  title: "Vervangend Vervoer bij Autoschade | Uw Rechten in 2026",
  description: "Heeft u recht op een huurauto of vervangend vervoer na een ongeval? Ontdek wat de tegenpartij moet vergoeden en hoe u dit regelt.",
  keywords: [
    "vervangend vervoer autoschade",
    "huurauto na ongeval",
    "leenauto schade tegenpartij",
    "vervoer tijdens reparatie",
    "huurauto vergoeding schade"
  ],
}

export default function BlogPost() {
  return (
    <div className="min-h-screen bg-white">
      <article className="container mx-auto px-4 py-8 max-w-4xl">
        <Breadcrumbs items={[
          { label: "Blog", href: "/blog" },
          { label: "Vervangend vervoer bij autoschade" }
        ]} />

        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8">
          <ArrowLeft className="h-4 w-4" />
          Terug naar blog
        </Link>

        <header className="mb-12">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-medium">
              Rechten
            </span>
            <span>•</span>
            <span>5 minuten leestijd</span>
            <span>•</span>
            <span>24 januari 2026</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Vervangend Vervoer bij Autoschade: Hier Heeft U Recht Op
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Uw auto staat in de garage voor reparatie na een aanrijding. Maar u moet naar uw werk, 
            de kinderen naar school brengen... Heeft u recht op een huurauto? Ja, vaak wel!
          </p>
        </header>

        <Card className="bg-green-50 border-green-200 mb-12">
          <CardContent className="pt-6">
            <h2 className="font-bold mb-4 flex items-center gap-2">
              <Car className="h-5 w-5 text-green-600" />
              Het korte antwoord
            </h2>
            <p className="text-muted-foreground">
              Als de tegenpartij aansprakelijk is voor het ongeval, heeft u recht op vergoeding 
              van <strong>vervangend vervoer</strong> gedurende de reparatieperiode. Dit kan een 
              huurauto zijn, maar ook openbaar vervoer of kilometervergoeding.
            </p>
          </CardContent>
        </Card>

        <div className="prose prose-lg max-w-none">
          
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Wanneer heeft u recht op vervangend vervoer?</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              U heeft recht op vervangend vervoer wanneer:
            </p>
            <ul className="space-y-3 text-muted-foreground mb-6">
              <li className="flex items-start gap-3">
                <FontAwesomeIcon icon={faCircleCheck} className="h-5 w-5 text-green-600 mt-0.5" />
                <span>De tegenpartij aansprakelijk is voor het ongeval</span>
              </li>
              <li className="flex items-start gap-3">
                <FontAwesomeIcon icon={faCircleCheck} className="h-5 w-5 text-green-600 mt-0.5" />
                <span>Uw auto niet rijdbaar is of in reparatie staat</span>
              </li>
              <li className="flex items-start gap-3">
                <FontAwesomeIcon icon={faCircleCheck} className="h-5 w-5 text-green-600 mt-0.5" />
                <span>U kunt aantonen dat u het vervoer nodig heeft (werk, zorg, etc.)</span>
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Welke opties voor vervangend vervoer?</h2>
            
            <div className="space-y-6">
              <div className="border-l-4 border-primary pl-6">
                <h3 className="font-bold mb-2">1. Huurauto</h3>
                <p className="text-muted-foreground mb-2">
                  De meest gebruikelijke optie. U heeft recht op een <strong>gelijkwaardige auto</strong> 
                  aan uw eigen voertuig. Rijdt u een middenklasser? Dan krijgt u geen stadsautootje.
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Let op:</strong> Verzekeraars proberen soms een goedkopere categorie aan te bieden. 
                  U hoeft hier niet mee akkoord te gaan.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="font-bold mb-2">2. Openbaar vervoer</h3>
                <p className="text-muted-foreground">
                  Als alternatief kunt u kosten voor openbaar vervoer declareren. 
                  Dit kan voordeliger zijn bij korte reparatietijd of als u weinig rijdt.
                </p>
              </div>

              <div className="border-l-4 border-orange-500 pl-6">
                <h3 className="font-bold mb-2">3. Kilometervergoeding</h3>
                <p className="text-muted-foreground">
                  Kunt u meerijden met iemand anders? Dan kunt u een kilometervergoeding claimen 
                  van €0,23 per kilometer.
                </p>
              </div>

              <div className="border-l-4 border-purple-500 pl-6">
                <h3 className="font-bold mb-2">4. Taxi/Uber</h3>
                <p className="text-muted-foreground">
                  In uitzonderlijke gevallen (bijvoorbeeld medische afspraken) kunnen taxiritten 
                  vergoed worden.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Hoe lang heeft u recht op vervangend vervoer?</h2>
            
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="font-bold mb-3">Hoofdregel:</h3>
              <p className="text-muted-foreground">
                U heeft recht op vervangend vervoer gedurende de <strong>redelijke reparatietijd</strong>. 
                Dit is de tijd die een garage normaal gesproken nodig heeft om de schade te herstellen.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="border p-4 rounded-lg">
                <h4 className="font-bold mb-2">Repareerbare schade</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Kleine schade: 2-5 dagen</li>
                  <li>• Gemiddelde schade: 1-2 weken</li>
                  <li>• Grote schade: 2-4 weken</li>
                </ul>
              </div>
              <div className="border p-4 rounded-lg">
                <h4 className="font-bold mb-2">Total loss</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Tijd om vervangende auto te vinden</li>
                  <li>• Meestal 2-4 weken redelijk</li>
                  <li>• Kan langer bij specifieke auto's</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Praktische tips</h2>
            
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">1</div>
                <div>
                  <h4 className="font-bold">Documenteer alles</h4>
                  <p className="text-muted-foreground">Bewaar alle bonnetjes, facturen en huurovereenkomsten.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">2</div>
                <div>
                  <h4 className="font-bold">Kies een redelijke auto</h4>
                  <p className="text-muted-foreground">Neem geen sportwagen als u normaal een Golf rijdt - dat wordt niet vergoed.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">3</div>
                <div>
                  <h4 className="font-bold">Meld het meteen</h4>
                  <p className="text-muted-foreground">Geef direct aan dat u vervangend vervoer nodig heeft bij het melden van de schade.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">4</div>
                <div>
                  <h4 className="font-bold">Laat ons het regelen</h4>
                  <p className="text-muted-foreground">Wij zorgen ervoor dat vervangend vervoer onderdeel is van uw claim.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Veelgestelde vragen</h2>
            
            <div className="space-y-6">
              <div className="border-l-4 border-primary pl-4">
                <h4 className="font-bold mb-2">Moet ik eerst zelf betalen?</h4>
                <p className="text-muted-foreground">
                  Vaak wel, maar u krijgt het volledig terugbetaald. Sommige verhuurders factureren 
                  direct aan de verzekeraar - vraag hiernaar.
                </p>
              </div>
              
              <div className="border-l-4 border-primary pl-4">
                <h4 className="font-bold mb-2">Wat als ik een tweede auto heb?</h4>
                <p className="text-muted-foreground">
                  Dan wordt het lastiger om vervangend vervoer te claimen, tenzij u kunt aantonen 
                  dat beide auto's noodzakelijk zijn (bijvoorbeeld voor partner).
                </p>
              </div>

              <div className="border-l-4 border-primary pl-4">
                <h4 className="font-bold mb-2">Wordt brandstof ook vergoed?</h4>
                <p className="text-muted-foreground">
                  Nee, brandstof is voor eigen rekening. U had immers ook getankt als u uw eigen auto had gebruikt.
                </p>
              </div>
            </div>
          </section>

        </div>

        {/* CTA */}
        <Card className="bg-gradient-to-r from-primary to-blue-700 text-white mt-12">
          <CardContent className="py-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Wij regelen ook uw vervangend vervoer
            </h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Bij het verhalen van uw schade nemen wij alle kosten mee - inclusief huurauto en andere bijkomende kosten.
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
