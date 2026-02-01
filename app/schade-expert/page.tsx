import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, CheckCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Schade-Expert Inschekelen na Autoschade | Gratis Verhaalservice",
  description: "Een schade-expert nodig na autoschade? Leer hoe wij de expertise voor materiële voertuigschade coördineren, volledig gratis voor u als gedupeerde. Vertrouw op onze expertise.",
  keywords: ["schade-expert", "schade expert inschakelen", "expertise autoschade", "gratis schade expert", "materiële schade", "verhaalservice", "onafhankelijk schade expert", "NIVRE expert"],
}

export default function SchadeExpertPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-green-50 py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
              Schade-Expert Inschekelen na uw Autoschade? Wij Regelen Het Gratis!
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Na een aanrijding is een onafhankelijk schade-expert cruciaal voor een eerlijke schadevaststelling.
              Bij Gratisschadeverhalen.nl coördineren wij dit proces voor uw materiële voertuigschade,
              zodat u zich geen zorgen hoeft te maken over de kosten én de afhandeling. Onze service is <b>volledig gratis</b> voor de gedupeerde!
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/claim-indienen">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white shadow-lg transition-all duration-300 transform hover:scale-105">
                  <Upload className="mr-2 h-5 w-5" />
                  Meld Nu Gratis Uw Schade
                </Button>
              </Link>
              <Link href="/hoe-werkt-het">
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10 transition-all duration-300 transform hover:scale-105">
                  Hoe Werkt Onze Service?
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Wat Doet een Schade-Expert? */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">Wat Doet een Onafhankelijke Schade-Expert?</h2>
          <p className="mb-6 text-gray-700 leading-relaxed">
            Een schade-expert, ook wel schadecorrespondent of schadecalculator genoemd, is een onafhankelijke specialist
            die de omvang van de schade aan uw voertuig vaststelt na een ongeval. Dit is essentieel voor een correcte
            afhandeling van uw claim, met name bij <b>materiële schade</b>. De expert beoordeelt de technische schade,
            begroot de herstelkosten en kijkt of herstel nog economisch verantwoord is. Zonder een objectieve
            schadevaststelling is het lastig om de tegenpartij aansprakelijk te stellen voor de volledige schade.
          </p>
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-primary">
                  <CheckCircle className="mr-2 h-5 w-5" /> Technische Beoordeling
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700">
                De expert onderzoekt de aard en omvang van de schade aan uw auto, inclusief verborgen gebreken die direct aan het ongeval te linken zijn.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-primary">
                  <CheckCircle className="mr-2 h-5 w-5" /> Kostenbegroting
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700">
                Op basis van het onderzoek stelt de expert een gedetailleerde begroting op voor de herstelkosten, rekening houdend met onderdelen en arbeidsloon.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-primary">
                  <CheckCircle className="mr-2 h-5 w-5" /> Total Loss Vaststelling
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700">
                De expert bepaalt of uw voertuig technisch of economisch total loss is. Dit heeft grote invloed op de uit te keren schadevergoeding.
                Lees meer over <Link href="/total-loss-auto" className="text-blue-600 hover:underline">total loss</Link>.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-primary">
                  <CheckCircle className="mr-2 h-5 w-5" /> Rapportage
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700">
                Alle bevindingen worden vastgelegd in een expertiseverslag of schaderapport, een cruciaal document voor de verdere afhandeling met de verzekeraars.
              </CardContent>
            </Card>
          </div>
          <p className="mb-6 text-gray-700 leading-relaxed">
            Het is belangrijk dat de ingeschakelde schade-expert <b>onafhankelijk</b> is van zowel uw eigen verzekeraar als die van de tegenpartij.
            Zo bent u verzekerd van een objectieve beoordeling van de schade aan uw <b>materiële voertuig</b>.
            Bij Gratisschadeverhalen.nl bewaken wij deze onafhankelijkheid en zorgen wij ervoor dat er een erkende expert wordt ingeschakeld,
            veelal aangesloten bij het NIVRE (Nederlands Instituut Van Register Experts).
          </p>
        </div>
      </section>

      {/* Het Expertise Proces: Stap voor Stap */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">Het Expertise Proces: Hoe Wij het voor U Regelen</h2>
          <p className="mb-8 text-gray-700 leading-relaxed text-center">
            Bij Gratisschadeverhalen.nl nemen we u alle zorgen uit handen, van schademelding tot de uitbetaling van uw schade.
            Het inschakelen van een schade-expert is een belangrijk onderdeel van ons naadloze proces, dat voor u als gedupeerde altijd <b>kosteloos</b> is.
          </p>

          <ol className="space-y-8">
            <li>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3 flex items-center">
                <span className="flex items-center justify-center w-8 h-8 mr-3 bg-primary text-white rounded-full">1</span>
                Schademelding & Eerste Beoordeling
              </h3>
              <p className="text-gray-700 leading-relaxed pl-11">
                U meldt uw <b>materiële autoschade</b> eenvoudig via onze website. Dit kan met ons online schadeformulier of door het uploaden van het Europees Schadeformulier.
                Wij beoordelen direct de situatie en stellen vast of een schade-expert nodig is.
              </p>
            </li>
            <li>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3 flex items-center">
                <span className="flex items-center justify-center w-8 h-8 mr-3 bg-primary text-white rounded-full">2</span>
                Inschakelen Schade-Expert
              </h3>
              <p className="text-gray-700 leading-relaxed pl-11">
                Indien nodig, schakelen wij een onafhankelijke schade-expert in namens u. Wij regelen de afspraak, zodat u daar zelf geen omkijken naar heeft.
                De kosten voor deze expert worden, mits de tegenpartij aansprakelijk is, verhaald op de tegenpartij of diens verzekeraar. Voor u blijft het <b>gratis</b>.
              </p>
            </li>
            <li>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3 flex items-center">
                <span className="flex items-center justify-center w-8 h-8 mr-3 bg-primary text-white rounded-full">3</span>
                Expertise & Rapportage
              </h3>
              <p className="text-gray-700 leading-relaxed pl-11">
                De schade-expert inspecteert uw voertuig en stelt een gedetailleerd schaderapport op. U ontvangt een kopie van dit rapport en wij bespreken de bevindingen met u.
              </p>
            </li>
            <li>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3 flex items-center">
                <span className="flex items-center justify-center w-8 h-8 mr-3 bg-primary text-white rounded-full">4</span>
                Onderhandeling & Afhandeling
              </h3>
              <p className="text-gray-700 leading-relaxed pl-11">
                Met het expertiserapport in de hand voeren wij de onderhandelingen met de verzekeraar van de tegenpartij.
                Ons doel is maximale schadevergoeding voor uw <b>materiële voertuigschade</b>.
                U kunt de voortgang van uw claim 24/7 volgen via ons online <Link href="/dashboard" className="text-blue-600 hover:underline">dashboard</Link>.
              </p>
            </li>
          </ol>
          <p className="mt-8 text-gray-700 leading-relaxed">
            Mocht er onverhoopt sprake zijn van letselschade naast uw materiële schade, dan verwijzen wij u graag door naar onze partner
            <Link href="https://www.unitasletselschade.nl" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium"> Unitas Letselschade</Link>,
            gespecialiseerd in alle vormen van letselschade. Wij focussen ons exclusief op materiële voertuigschade.
          </p>
        </div>
      </section>

      {/* Waarom Gratisschadeverhalen.nl? */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Waarom Kiezen voor Onze Gratis Expertise Service?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6">
              <CardHeader className="flex flex-col items-center pb-4">
                <Image src="/icons/icon-free.svg" alt="Gratis Service Icon" width={64} height={64} className="mb-4" />
                <CardTitle className="text-xl font-semibold text-gray-900">100% Kostenloos</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700">
                Onze hele service, inclusief de coördinatie van de schade-expert, is voor u als gedupeerde geheel <b>gratis</b>.
                Alle kosten worden verhaald op de aansprakelijke tegenpartij.
              </CardContent>
            </Card>
            <Card className="p-6">
              <CardHeader className="flex flex-col items-center pb-4">
                <Image src="/icons/icon-expert.svg" alt="Direct Expert Icon" width={64} height={64} className="mb-4" />
                <CardTitle className="text-xl font-semibold text-gray-900">Direct Expertise</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700">
                Wij regelen snel een <b>onafhankelijke schade-expert</b> voor uw <b>materiële autoschade</b>,
                zodat de schade snel en vakkundig kan worden vastgesteld.
              </CardContent>
            </Card>
            <Card className="p-6">
              <CardHeader className="flex flex-col items-center pb-4">
                <Image src="/icons/icon-dashboard.svg" alt="Online Dashboard Icon" width={64} height={64} className="mb-4" />
                <CardTitle className="text-xl font-semibold text-gray-900">Transparant & Duidelijk</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700">
                Via uw persoonlijke online dashboard volgt u de voortgang van uw schadeclaim 24/7.
                U bent altijd op de hoogte van de status van de expertise en afhandeling.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Schadeverhaal bij Onbekende Dader (Waarborgfonds) */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">Schadeverhaal bij Onbekende Dader: Rol van de Expert bij het Waarborgfonds</h2>
          <p className="mb-6 text-gray-700 leading-relaxed">
            Zelfs wanneer de veroorzaker van uw <b>materiële autoschade</b> onbekend is (denk aan vluchtmisdrijf, vandalisme of een onverzekerde tegenpartij),
            kunt u in aanmerking komen voor een vergoeding via het <Link href="/waarborgfonds" className="text-blue-600 hover:underline">Waarborgfonds Motorverkeer</Link>.
            Ook in dergelijke gevallen is het expertiseverslag van een schade-expert van cruciaal belang.
          </p>
          <p className="mb-6 text-gray-700 leading-relaxed">
            De schade-expert stelt de hoogte van de schade vast, wat een vereiste is voor een succesvolle claim bij het Waarborgfonds.
            Gratisschadeverhalen.nl begeleidt u ook in dit complexe traject en zorgt ervoor dat alle benodigde documenten,
            inclusief het expertiseverslag, correct worden ingediend. Uiteraard blijft onze service ook dan <b>geheel gratis</b> voor u.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 bg-primary text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Direct een Schade-Expert Nodig voor uw Autoschade?
          </h2>
          <p className="text-lg md:text-xl mb-8 leading-relaxed">
            Meld uw schade vandaag nog en laat ons de expertise voor uw <b>materiële voertuigschade</b> gratis voor u regelen.
            Geen gedoe, geen kosten, alleen een snelle en deskundige afhandeling.
          </p>
          <Link href="/claim-indienen">
            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100 shadow-lg transition-all duration-300 transform hover:scale-105">
              <Upload className="mr-2 h-6 w-6" />
              Meld uw Schade Gratis Online
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
