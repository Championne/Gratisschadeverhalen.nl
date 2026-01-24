import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { ArrowLeft, Upload, AlertTriangle } from "lucide-react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons"

export const metadata: Metadata = {
  title: "Autoschade Door Fietser | Schade Verhalen op Fietser",
  description: "Schade aan uw auto veroorzaakt door een fietser? Ontdek wanneer u de schade kunt verhalen en hoe dit werkt. Praktische tips en juridische uitleg.",
  keywords: [
    "autoschade door fietser",
    "fietser tegen auto gereden",
    "schade verhalen op fietser",
    "fietser aansprakelijk schade",
    "auto beschadigd door fietser"
  ],
}

export default function BlogPost() {
  return (
    <div className="min-h-screen bg-white">
      <article className="container mx-auto px-4 py-8 max-w-4xl">
        <Breadcrumbs items={[
          { label: "Blog", href: "/blog" },
          { label: "Autoschade door fietser" }
        ]} />

        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8">
          <ArrowLeft className="h-4 w-4" />
          Terug naar blog
        </Link>

        <header className="mb-12">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full font-medium">
              Bijzondere situaties
            </span>
            <span>•</span>
            <span>6 minuten leestijd</span>
            <span>•</span>
            <span>24 januari 2026</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Autoschade Door Fietser: Kunt U Dit Verhalen?
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Nederland is een fietsland. Helaas betekent dit ook dat er regelmatig aanrijdingen zijn 
            tussen auto's en fietsers. Maar wat als een fietser schade aan uw auto veroorzaakt?
          </p>
        </header>

        <Card className="bg-orange-50 border-orange-200 mb-12">
          <CardContent className="pt-6">
            <h2 className="font-bold mb-3 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              Belangrijk om te weten
            </h2>
            <p className="text-muted-foreground">
              In Nederland geldt de <strong>"zwakke weggebruiker" regel</strong>. Dit betekent dat 
              automobilisten vaak (mede-)aansprakelijk zijn bij aanrijdingen met fietsers, zelfs als 
              de fietser een fout maakt. Maar dit geldt alleen voor <strong>letselschade</strong>, 
              niet automatisch voor schade aan uw auto.
            </p>
          </CardContent>
        </Card>

        <div className="prose prose-lg max-w-none">
          
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Wanneer is de fietser aansprakelijk?</h2>
            <p className="text-muted-foreground mb-4">
              Een fietser kan aansprakelijk zijn voor schade aan uw auto als:
            </p>
            <ul className="space-y-3 text-muted-foreground mb-6">
              <li className="flex items-start gap-3">
                <FontAwesomeIcon icon={faCircleCheck} className="h-5 w-5 text-green-600 mt-0.5" />
                <span>De fietser door rood reed of geen voorrang verleende</span>
              </li>
              <li className="flex items-start gap-3">
                <FontAwesomeIcon icon={faCircleCheck} className="h-5 w-5 text-green-600 mt-0.5" />
                <span>De fietser onder invloed was (alcohol/drugs)</span>
              </li>
              <li className="flex items-start gap-3">
                <FontAwesomeIcon icon={faCircleCheck} className="h-5 w-5 text-green-600 mt-0.5" />
                <span>De fietser tegen uw geparkeerde auto reed</span>
              </li>
              <li className="flex items-start gap-3">
                <FontAwesomeIcon icon={faCircleCheck} className="h-5 w-5 text-green-600 mt-0.5" />
                <span>De fietser bewust roekeloos gedrag vertoonde</span>
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Het probleem: fietsers zijn vaak niet verzekerd</h2>
            
            <div className="bg-red-50 border-l-4 border-red-500 p-6 my-6">
              <h3 className="font-bold mb-3">Dit is de realiteit:</h3>
              <p className="text-muted-foreground">
                Anders dan automobilisten zijn fietsers <strong>niet verplicht verzekerd</strong>. 
                Veel fietsers hebben wel een aansprakelijkheidsverzekering (AVP), maar niet allemaal. 
                Dit maakt het verhalen van schade lastiger.
              </p>
            </div>

            <h3 className="font-bold mb-3">Uw opties als de fietser niet verzekerd is:</h3>
            <ul className="space-y-2 text-muted-foreground mb-6">
              <li className="flex items-start gap-2">
                <span className="font-bold text-primary">1.</span>
                <span><strong>Rechtstreeks claimen</strong> - U kunt de fietser persoonlijk aansprakelijk stellen</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-primary">2.</span>
                <span><strong>Eigen verzekering</strong> - Cascoverzekering dekt mogelijk de schade (let op: eigen risico)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-primary">3.</span>
                <span><strong>Rechtsbijstand</strong> - Uw rechtsbijstandverzekering kan helpen bij verhaal</span>
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Wat te doen direct na het incident?</h2>
            
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">1</div>
                <div>
                  <h4 className="font-bold">Noteer NAW-gegevens van de fietser</h4>
                  <p className="text-muted-foreground">Naam, adres, telefoonnummer. Vraag ook naar verzekeringsgegevens.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">2</div>
                <div>
                  <h4 className="font-bold">Maak foto's en video's</h4>
                  <p className="text-muted-foreground">Van de schade, de situatie, verkeersborden en eventuele remsporen.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">3</div>
                <div>
                  <h4 className="font-bold">Zoek getuigen</h4>
                  <p className="text-muted-foreground">Vraag omstanders om hun contactgegevens en wat zij gezien hebben.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">4</div>
                <div>
                  <h4 className="font-bold">Schakel politie in bij doorrijden</h4>
                  <p className="text-muted-foreground">Als de fietser wegfietst, bel dan direct de politie.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Speciale situatie: fietser rijdt weg</h2>
            
            <p className="text-muted-foreground mb-4">
              Helaas komt het vaak voor dat een fietser na een aanrijding gewoon doorfietst. 
              Dit is strafbaar (artikel 7 WVW - doorrijden na ongeval), maar maakt het verhalen lastig.
            </p>

            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="font-bold mb-3">Tips als de fietser is weggereden:</h3>
              <ul className="text-muted-foreground space-y-1">
                <li>• Noteer een signalement (kleding, fietstype, richting)</li>
                <li>• Vraag omstanders of zij de fietser kennen</li>
                <li>• Check of er bewakingscamera's in de buurt zijn</li>
                <li>• Doe aangifte bij de politie</li>
                <li>• Meld bij uw eigen verzekeraar</li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Kunnen wij helpen?</h2>
            
            <div className="bg-green-50 border-l-4 border-green-500 p-6 my-6">
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <FontAwesomeIcon icon={faCircleCheck} className="h-5 w-5 text-green-600" />
                Ja, onder bepaalde voorwaarden
              </h3>
              <p className="text-muted-foreground">
                Als de fietser een <strong>aansprakelijkheidsverzekering (AVP)</strong> heeft, 
                kunnen wij de schade voor u verhalen - net zoals bij een WA-verzekering van een automobilist.
              </p>
            </div>

            <p className="text-muted-foreground">
              Neem contact met ons op met de gegevens van de fietser. Wij zoeken uit of er een 
              verzekering is en handelen de claim voor u af.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Gerelateerde artikelen</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/blog/schade-openstaand-portier" className="block p-4 border rounded-lg hover:border-primary transition-colors">
                <h4 className="font-bold mb-2">Schade door openstaand portier</h4>
                <p className="text-sm text-muted-foreground">Wie is aansprakelijk bij portierschade?</p>
              </Link>
              <Link href="/blog/schade-parkeerplaats-supermarkt" className="block p-4 border rounded-lg hover:border-primary transition-colors">
                <h4 className="font-bold mb-2">Schade op parkeerplaats supermarkt</h4>
                <p className="text-sm text-muted-foreground">Wat te doen bij parkeerschade en wie is aansprakelijk?</p>
              </Link>
              <Link href="/blog/wat-te-doen-na-ongeval" className="block p-4 border rounded-lg hover:border-primary transition-colors">
                <h4 className="font-bold mb-2">Wat te doen na een ongeval?</h4>
                <p className="text-sm text-muted-foreground">Checklist met alle stappen die u moet nemen.</p>
              </Link>
              <Link href="/blog/wa-verzekering-tegenpartij-claimen" className="block p-4 border rounded-lg hover:border-primary transition-colors">
                <h4 className="font-bold mb-2">WA-verzekering tegenpartij claimen</h4>
                <p className="text-sm text-muted-foreground">Hoe claimt u schade bij de verzekeraar van de ander?</p>
              </Link>
            </div>
          </section>

        </div>

        <Card className="bg-gradient-to-r from-primary to-blue-700 text-white mt-12">
          <CardContent className="py-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Schade door een fietser? Neem contact op!
            </h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Wij onderzoeken of de fietser verzekerd is en verhalen indien mogelijk uw schade gratis.
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
