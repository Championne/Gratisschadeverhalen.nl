
import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload } from "lucide-react";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Materiële Schade Verhalen | Gratis Verhaalservice - Gratisschadeverhalen.nl",
  description: "Heeft u materiële autoschade? Wij bieden gratis verhaalservice voor voertuigschade. Claim uw schade kosteloos op de tegenpartij. Ontdek hoe wij u helpen met expertise en Waarborgfonds.",
  keywords: ["materiële schade", "voertuigschade verhalen", "WA verzekering schade", "autoschade claimen", "verhaalrechtsbijstand", "gratis verhaalservice", "ongevallen service"],
};

export default function MaterieleSchadePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-green-50 py-12 md:py-20 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 drop-shadow-sm">
              Materiële Schade Verhalen? <span className="text-primary">Gratis</span> en Zorgeloos!
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
              Heeft u autoschade? Wij regelen de complete afhandeling van uw <strong className="font-semibold text-primary">materiële schade</strong> aan uw voertuig,
              volledig <strong className="font-semibold text-primary">gratis</strong> voor u als benadeelde. Focus u op herstel, wij op uw vergoeding!
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/claim-indienen">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white shadow-lg text-lg px-8 py-3">
                  <Upload className="mr-2 h-5 w-5" />
                  Meld Nu Gratis Uw Schade
                </Button>
              </Link>
              <Link href="/hoe-werkt-het">
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/5 shadow-lg text-lg px-8 py-3">
                  Hoe Onze Service Werkt
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Introductie Materiële Schade */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg text-gray-800">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Wat is Materiële Schade precies?</h2>
            <p>
              Materiële schade is aantoonbare schade aan bezittingen, in het bijzonder uw voertuig. Dit omvat blikschade, kapotte onderdelen,
              lakschade en schade aan persoonlijke eigendommen in het voertuig. Het verhalen van deze schade kan complex zijn,
              maar Gratisschadeverhalen.nl ontzorgt u volledig.
            </p>
            <p>
              Wij zijn gespecialiseerd in het <strong className="font-semibold text-primary">verhalen van materiële voertuigschade</strong>.
              Onze service is altijd <strong className="font-semibold text-primary">kosteloos</strong> voor u, omdat wij onze kosten direct
              verhalen op de aansprakelijke tegenpartij of diens verzekeraar.
            </p>
            <h3 className="text-2xl md:text-3xl font-bold mt-10 mb-4 text-gray-900">Wanneer U Onze Gratis Service Nodig Heeft</h3>
            <p>
              Uw WA-verzekering dekt alleen schade die u bij een ander veroorzaakt. Bij materiële schade aan uw eigen voertuig,
              indien een andere partij aansprakelijk is, kunt u niet altijd rekenen op uw eigen verzekeraar. Zonder een volledig
              cascoverzekering is het cruciaal de schade te verhalen op de veroorzaker. Zelf de <strong className="font-semibold text-primary">autoschade claimen</strong>
              is tijdrovend en frustrerend.
            </p>
            <p>
              Een rechtsbijstandverzekering voor <strong className="font-semibold text-primary">verhaalrechtsbijstand</strong> is niet altijd nodig.
              Gratisschadeverhalen.nl biedt u een alternatief dat dezelfde, zo niet betere, ondersteuning biedt zonder extra kosten.
              Wij nemen de gehele rompslomp uit handen: van schadeformulier tot communicatie en expertisecoördinatie.
            </p>
          </div>
        </div>
      </section>

      {/* Onze Werkwijze en Voordelen */}
      <section className="bg-blue-50 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-900">Uw Voordelen bij Gratisschadeverhalen.nl</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-primary">Volledig Gratis Service</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-700">
                  <p>
                    Onze <strong className="font-semibold text-primary">verhaalservice is gratis</strong>. Dit is mogelijk omdat de Nederlandse wet
                    ons toestaat om onze kosten direct op de aansprakelijke tegenpartij te verhalen. U ontvangt dus geen facturen en
                    wordt volledig ontzorgd zonder financiële verrassingen.
                  </p>
                </CardContent>
              </Card>
              <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-primary">Expertise en Onafhankelijke Taxatie</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-700">
                  <p>
                    Voor de juiste vaststelling van uw <strong className="font-semibold text-primary">materiële schade</strong> regelen wij een
                    onafhankelijke schade-expert. Deze expert stelt een taxatierapport op, cruciaal voor een eerlijke vergoeding.
                    Wij werken met gecertificeerde experts die uw belangen behartigen. Lees meer op onze <Link href="/schade-expert" className="text-blue-600 hover:underline">schade-expert pagina</Link>.
                  </p>
                </CardContent>
              </Card>
              <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-primary">Altijd Inzicht via Uw Dashboard</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-700">
                  <p>
                    Via ons online <strong className="font-semibold text-primary">dashboard</strong> blijft u 24/7 op de hoogte van uw schadeclaim.
                    Upload documenten, volg de voortgang en communiceer direct met uw zaakbehandelaar. Transparantie en duidelijkheid staan voorop.
                  </p>
                </CardContent>
              </Card>
              <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-primary">Hulp bij Onbekende Dader (Waarborgfonds)</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-700">
                  <p>
                    Heeft u <strong className="font-semibold text-primary">schade</strong> aan uw auto en is de dader onbekend of onverzekerd?
                    Wij helpen u met een claim bij het <strong className="font-semibold text-primary">Waarborgfonds</strong> Motorverkeer,
                    mits aan de voorwaarden wordt voldaan. Bezoek onze <Link href="/waarborgfonds" className="text-blue-600 hover:underline">Waarborgfonds pagina</Link> voor meer informatie.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Hoe werkt het CTA */}
      <section className="py-12 md:py-16 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Hoe werkt onze gratis service?</h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Eenvoudig van melding tot uitbetaling. Wij staan aan uw zijde.
          </p>
          <Link href="/hoe-werkt-het">
            <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white shadow-lg text-lg px-8 py-3">
              Bekijk Onze Werkwijze
            </Button>
          </Link>
        </div>
      </section>

      {/* Belangrijke Aandachtspunten */}
      <section className="bg-gray-100 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg text-gray-800">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Belangrijke aandachtspunten bij Materiële Schade</h2>
            <p>
              Bij het verhalen van <strong className="font-semibold text-primary">autoschade</strong> zijn er zaken waar u rekening mee moet houden. Goede voorbereiding versnelt het proces:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="font-semibold text-gray-900">Schadeformulier:</strong> Vul dit zo volledig mogelijk in met de tegenpartij. Zorg voor duidelijke schetsen en vermeld getuigen. Essentieel voor snelle afhandeling. Tip: maak foto&apos;s!
              </li>
              <li>
                <strong className="font-semibold text-gray-900">Bewijsmateriaal:</strong> Verzamel foto&apos;s van schade aan voertuigen, ongevalssituatie, kentekens en contact getuigen. Dit helpt bij aansprakelijkheid.
              </li>
              <li>
                <strong className="font-semibold text-gray-900">Reparatie:</strong> Start niet direct met reparatie vóór vaststelling door expert, tenzij noodreparatie. Overleg dit altijd eerst.
              </li>
              <li>
                <strong className="font-semibold text-gray-900">Letselschade:</strong> Onze focus ligt op <strong className="font-semibold text-primary">materiële schade</strong>. Wij behandelen <strong className="font-semibold text-red-600">geen</strong> letselschade. Hiervoor verwijzen wij u naar <strong className="font-semibold text-primary">onze partner Unitas Letselschade</strong>, gespecialiseerd in persoonsgebonden schade.
              </li>
            </ul>
             <p className="mt-6">
              Heeft u vragen? Neem contact met ons op. Ons team van specialisten staat voor u klaar om al uw vragen te beantwoorden
              en u te begeleiden. Wij zijn immers dé experts in <strong className="font-semibold text-primary">materiële schade</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* Waarom Kiezen voor ons (Call to Action) */}
      <section className="py-12 md:py-16 bg-primary-foreground text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Kies voor Gemak, Kies voor Gratis!</h2>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
            Laat de zorgen over <strong className="font-semibold">voertuigschade verhalen</strong> aan ons over. U bent verzekerd van een
            optimale afhandeling en eerlijke vergoeding, zonder kosten. Start direct!
          </p>
          <Link href="/claim-indienen">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-10 py-4 shadow-xl">
              <Upload className="mr-2 h-6 w-6" />
              Meld uw Materiële Schade Nu Aan!
            </Button>
          </Link>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-900">Veelgestelde Vragen over Materiële Schade</h2>
            <div className="space-y-6">
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">Wat houd jullie gratis verhaalservice precies in?</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-700">
                  <p>
                    Wij voeren de hele procedure uit om uw materiële schade gratis op de aansprakelijke tegenpartij te verhalen.
                    Onze kosten worden conform de wet op de tegenpartij verhaald, dus u betaalt niets.
                  </p>
                </CardContent>
              </Card>
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">Dekt mijn WA-verzekering materiële schade aan mijn eigen auto?</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-700">
                  <p>
                    Nee, een standaard WA-verzekering dekt alleen schade die u bij een ander veroorzaakt. Schade aan uw eigen auto
                    door toedoen van een ander wordt niet gedekt. U moet de schade verhalen op de aansprakelijke partij – wij helpen u hier gratis bij.
                  </p>
                </CardContent>
              </Card>
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">Is het verplicht om een schade-expert in te schakelen?</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-700">
                  <p>
                    Bij grotere schades is een onafhankelijke schade-expert aanbevolen. De expert stelt de schade bindend vast
                    voor een correcte vergoeding. Wij coördineren de expertise en behartigen uw belangen, als onderdeel van onze gratis service.
                  </p>
                </CardContent>
              </Card>
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">Hoe lang duurt het proces van schade verhalen?</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-700">
                  <p>
                    De doorlooptijd varieert, afhankelijk van de complexiteit en reactiesnelheid van betrokken partijen.
                    Gemiddeld duurt het 6 tot 8 weken na complete documentatie. Uw dashboard toont altijd de actuele status.
                  </p>
                </CardContent>
              </Card>
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">Wat als de tegenpartij onbekend is?</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-700">
                  <p>
                    Bij een onbekende of onverzekerde dader helpen wij u met een claim bij het Waarborgfonds Motorverkeer.
                    Dit is onder specifieke voorwaarden, zoals aangifte en poging tot opsporing. Wij begeleiden u hierin.
                    Zie onze <Link href="/waarborgfonds" className="text-blue-600 hover:underline">Waarborgfonds pagina</Link> voor meer info.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section Final */}
      <section className="py-12 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Materiële Schade? Wij Helfen Gratis!</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Wacht niet langer en laat onze specialisten uw <strong className="font-semibold">materiële autoschade</strong> kosteloos verhalen.
            Meld uw schade direct en ervaar het gemak van een zorgeloze afhandeling.
          </p>
          <Link href="/claim-indienen">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
              <Upload className="mr-2 h-5 w-5" />
              Meld Nu Uw Schade
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
