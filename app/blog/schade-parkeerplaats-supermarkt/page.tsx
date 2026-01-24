import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { ArrowLeft, Upload, ShoppingCart } from "lucide-react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons"

export const metadata: Metadata = {
  title: "Schade op Parkeerplaats Supermarkt | Wie Is Aansprakelijk?",
  description: "Auto beschadigd op de parkeerplaats van de supermarkt? Ontdek wie aansprakelijk is, wat u moet doen, en hoe u uw schade kunt verhalen.",
  keywords: [
    "schade parkeerplaats supermarkt",
    "winkelwagen schade auto",
    "parkeerschade supermarkt",
    "auto beschadigd parkeerplaats",
    "deuk parkeerplaats"
  ],
}

export default function BlogPost() {
  return (
    <div className="min-h-screen bg-white">
      <article className="container mx-auto px-4 py-8 max-w-4xl">
        <Breadcrumbs items={[
          { label: "Blog", href: "/blog" },
          { label: "Schade parkeerplaats supermarkt" }
        ]} />

        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8">
          <ArrowLeft className="h-4 w-4" />
          Terug naar blog
        </Link>

        <header className="mb-12">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
              Praktisch
            </span>
            <span>•</span>
            <span>5 minuten leestijd</span>
            <span>•</span>
            <span>24 januari 2026</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Schade op de Parkeerplaats van de Supermarkt
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            U komt terug van boodschappen doen en ontdekt een deuk of kras in uw auto. 
            Een frustrerende situatie die veel Nederlanders herkennen. Wat nu?
          </p>
        </header>

        <div className="prose prose-lg max-w-none">
          
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Veelvoorkomende oorzaken van parkeerschade</h2>
            
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="border p-4 rounded-lg">
                <ShoppingCart className="h-6 w-6 text-primary mb-2" />
                <h4 className="font-bold mb-2">Winkelwagen schade</h4>
                <p className="text-sm text-muted-foreground">
                  Losgeslagen winkelwagens die tegen uw auto rollen
                </p>
              </div>
              <div className="border p-4 rounded-lg">
                <div className="h-6 w-6 text-primary mb-2 font-bold">🚗</div>
                <h4 className="font-bold mb-2">Portier schade</h4>
                <p className="text-sm text-muted-foreground">
                  Andere bestuurders die hun portier tegen uw auto openen
                </p>
              </div>
              <div className="border p-4 rounded-lg">
                <div className="h-6 w-6 text-primary mb-2 font-bold">🔄</div>
                <h4 className="font-bold mb-2">In/uitparkeren</h4>
                <p className="text-sm text-muted-foreground">
                  Aanrijdingen bij het manoeuvreren in krappe vakken
                </p>
              </div>
              <div className="border p-4 rounded-lg">
                <div className="h-6 w-6 text-primary mb-2 font-bold">❓</div>
                <h4 className="font-bold mb-2">Onbekende oorzaak</h4>
                <p className="text-sm text-muted-foreground">
                  Schade zonder dader - de meest frustrerende situatie
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Wie is aansprakelijk?</h2>
            
            <div className="space-y-6">
              <div className="bg-green-50 border-l-4 border-green-500 p-6">
                <h3 className="font-bold mb-2">Als u de veroorzaker kent</h3>
                <p className="text-muted-foreground">
                  De veroorzaker is aansprakelijk. Dit kan een andere automobilist zijn, maar ook 
                  iemand die een winkelwagen losliet. Verzamel gegevens en wij verhalen de schade.
                </p>
              </div>
              
              <div className="bg-orange-50 border-l-4 border-orange-500 p-6">
                <h3 className="font-bold mb-2">Als u de veroorzaker niet kent</h3>
                <p className="text-muted-foreground">
                  Dit is lastiger. Mogelijke opties:
                </p>
                <ul className="mt-2 space-y-1 text-muted-foreground">
                  <li>• Vraag camerabeelden op bij de supermarkt</li>
                  <li>• Vraag getuigen (andere klanten, personeel)</li>
                  <li>• Meld bij eigen cascoverzekering (let op eigen risico)</li>
                </ul>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-6">
                <h3 className="font-bold mb-2">Winkelwagen schade - is de supermarkt aansprakelijk?</h3>
                <p className="text-muted-foreground">
                  <strong>Meestal niet.</strong> De supermarkt is alleen aansprakelijk als zij nalatig waren, 
                  bijvoorbeeld bij defecte winkelwagens of ontbrekende wielblokkering. Een losgelaten 
                  winkelwagen door een klant valt onder de aansprakelijkheid van die klant.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Direct actie ondernemen</h2>
            
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">1</div>
                <div>
                  <h4 className="font-bold">Maak foto's</h4>
                  <p className="text-muted-foreground">Fotografeer de schade én de locatie (parkeervak, omgeving).</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">2</div>
                <div>
                  <h4 className="font-bold">Meld bij de supermarkt</h4>
                  <p className="text-muted-foreground">Vraag om camerabeelden. Let op: beelden worden vaak snel overschreven!</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">3</div>
                <div>
                  <h4 className="font-bold">Zoek getuigen</h4>
                  <p className="text-muted-foreground">Vraag andere klanten of personeel of zij iets gezien hebben.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">4</div>
                <div>
                  <h4 className="font-bold">Noteer tijd en datum</h4>
                  <p className="text-muted-foreground">Dit helpt bij het opvragen van specifieke camerabeelden.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Tips om parkeerschade te voorkomen</h2>
            
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <FontAwesomeIcon icon={faCircleCheck} className="h-5 w-5 text-green-600 mt-0.5" />
                <span><strong>Parkeer verder weg</strong> - Minder druk, meer ruimte</span>
              </li>
              <li className="flex items-start gap-3">
                <FontAwesomeIcon icon={faCircleCheck} className="h-5 w-5 text-green-600 mt-0.5" />
                <span><strong>Vermijd hoekplekken</strong> - Hier staan vaak winkelwagenstations</span>
              </li>
              <li className="flex items-start gap-3">
                <FontAwesomeIcon icon={faCircleCheck} className="h-5 w-5 text-green-600 mt-0.5" />
                <span><strong>Parkeer naast nieuwe auto's</strong> - Eigenaren passen vaak beter op</span>
              </li>
              <li className="flex items-start gap-3">
                <FontAwesomeIcon icon={faCircleCheck} className="h-5 w-5 text-green-600 mt-0.5" />
                <span><strong>Gebruik dashcam</strong> - Parkeermodus neemt op bij beweging</span>
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Veelgestelde vragen</h2>
            
            <div className="space-y-6">
              <div className="border-l-4 border-primary pl-4">
                <h4 className="font-bold mb-2">Kan ik de supermarkt aansprakelijk stellen voor slechte parkeerplaats?</h4>
                <p className="text-muted-foreground">
                  Alleen als de supermarkt nalatig is geweest, bijvoorbeeld door gaten in het wegdek 
                  niet te repareren. Normale parkeerschade valt niet onder hun verantwoordelijkheid.
                </p>
              </div>
              
              <div className="border-l-4 border-primary pl-4">
                <h4 className="font-bold mb-2">Hoe lang bewaart de supermarkt camerabeelden?</h4>
                <p className="text-muted-foreground">
                  Gemiddeld 24-72 uur. Vraag dus zo snel mogelijk op! Na het weekend kan het al te laat zijn.
                </p>
              </div>

              <div className="border-l-4 border-primary pl-4">
                <h4 className="font-bold mb-2">Moet ik aangifte doen bij de politie?</h4>
                <p className="text-muted-foreground">
                  Bij kleine schade is dit niet verplicht. Bij grotere schade of doorrijden na ongeval 
                  is aangifte wel verstandig voor uw verzekeringsclaim.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Gerelateerde artikelen</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/blog/schade-openstaand-portier" className="block p-4 border rounded-lg hover:border-primary transition-colors">
                <h4 className="font-bold mb-2">Schade door openstaand portier</h4>
                <p className="text-sm text-muted-foreground">Wie is aansprakelijk bij portierschade?</p>
              </Link>
              <Link href="/blog/autoschade-door-fietser" className="block p-4 border rounded-lg hover:border-primary transition-colors">
                <h4 className="font-bold mb-2">Autoschade door fietser</h4>
                <p className="text-sm text-muted-foreground">Wanneer is een fietser aansprakelijk?</p>
              </Link>
              <Link href="/blog/dagwaarde-auto-berekenen" className="block p-4 border rounded-lg hover:border-primary transition-colors">
                <h4 className="font-bold mb-2">Dagwaarde auto berekenen</h4>
                <p className="text-sm text-muted-foreground">Hoe bepaalt u de waarde van uw auto?</p>
              </Link>
              <Link href="/blog/europees-schadeformulier-invullen" className="block p-4 border rounded-lg hover:border-primary transition-colors">
                <h4 className="font-bold mb-2">Europees Schadeformulier invullen</h4>
                <p className="text-sm text-muted-foreground">Stap-voor-stap uitleg voor het correct invullen.</p>
              </Link>
            </div>
          </section>

        </div>

        <Card className="bg-gradient-to-r from-primary to-blue-700 text-white mt-12">
          <CardContent className="py-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Kent u de veroorzaker? Wij verhalen uw schade!
            </h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Als u de gegevens van de veroorzaker heeft, regelen wij gratis de schadeclaim.
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
