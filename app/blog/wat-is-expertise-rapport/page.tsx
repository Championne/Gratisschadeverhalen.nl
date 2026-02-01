import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { ArrowLeft, FileText, Search, ClipboardList, Euro, Car, AlertTriangle, CheckCircle } from "lucide-react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons"

export const metadata: Metadata = {
  title: "Wat is een Expertise Rapport? | Alles over Autoschade Taxatie",
  description: "Wat is een expertise rapport bij autoschade? Leer wat erin staat, wie het opstelt, wanneer het nodig is en hoe het uw schadevergoeding bepaalt. Snelle expertise uitgelegd.",
  keywords: [
    "wat is expertise rapport",
    "expertise rapport autoschade",
    "schade taxatie rapport",
    "expertiserapport uitleg",
    "autoschade expertise",
    "schadebegroting",
    "taxatierapport auto",
    "snelle expertise"
  ],
}

// Article Schema
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Wat is een Expertise Rapport? Alles over Autoschade Taxatie",
  "description": "Complete uitleg over het expertise rapport bij autoschade: wat het is, wat erin staat, wie het opstelt en hoe het uw schadevergoeding bepaalt.",
  "author": {
    "@type": "Organization",
    "name": "112autoschade.nl"
  },
  "publisher": {
    "@type": "Organization",
    "name": "112autoschade.nl",
    "logo": {
      "@type": "ImageObject",
      "url": "https://112autoschade.nl/logo.png"
    }
  },
  "datePublished": "2026-01-27",
  "dateModified": "2026-01-27"
}

export default function WatIsExpertiseRapportPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="min-h-screen bg-white">
        <article className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Breadcrumbs */}
          <Breadcrumbs items={[
            { label: "Blog", href: "/blog" },
            { label: "Wat is een Expertise Rapport" }
          ]} />

          {/* Back Button */}
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8">
            <ArrowLeft className="h-4 w-4" />
            Terug naar blog
          </Link>

          {/* Header */}
          <header className="mb-12">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium">Expertise</span>
              <span>•</span>
              <span>8 minuten leestijd</span>
              <span>•</span>
              <span>27 januari 2026</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Wat is een Expertise Rapport?
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed">
              Bij autoschade komt vaak een expertise rapport om de hoek kijken. Maar wat is dat precies? 
              In dit artikel leggen we uit wat een expertise rapport is, wat erin staat, wie het opstelt 
              en waarom het zo belangrijk is voor uw schadevergoeding.
            </p>
          </header>

          {/* Quick Summary */}
          <Card className="bg-blue-50 border-blue-200 mb-12">
            <CardContent className="pt-6">
              <h2 className="font-bold mb-4 flex items-center gap-2">
                <Search className="h-5 w-5 text-blue-600" />
                Kort samengevat
              </h2>
              <p className="text-muted-foreground mb-4">
                Een <strong>expertise rapport</strong> (ook wel taxatierapport of schaderapport genoemd) is een officieel 
                document waarin een onafhankelijke schade-expert de schade aan uw voertuig vastlegt en waardeert. 
                Het rapport bepaalt hoeveel schadevergoeding u krijgt uitbetaald.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-white px-3 py-1 rounded-full text-sm font-medium">Officieel document</span>
                <span className="bg-white px-3 py-1 rounded-full text-sm font-medium">Onafhankelijke taxatie</span>
                <span className="bg-white px-3 py-1 rounded-full text-sm font-medium">Bepalend voor vergoeding</span>
              </div>
            </CardContent>
          </Card>

          {/* Snelle Expertise CTA */}
          <Card className="border-2 border-primary bg-primary/5 mb-12">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-2">Snelle expertise nodig?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Wij regelen de expertise voor u en zorgen dat het rapport correct en volledig is. 
                    U betaalt niets – de tegenpartij betaalt alles.
                  </p>
                  <Link href="/claim-indienen">
                    <Button>
                      Direct Schade Melden
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Table of Contents */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ClipboardList className="h-5 w-5" />
                Inhoudsopgave
              </CardTitle>
            </CardHeader>
            <CardContent>
              <nav className="space-y-2">
                <a href="#definitie" className="block text-primary hover:underline">1. Definitie: Wat is een expertise rapport precies?</a>
                <a href="#inhoud" className="block text-primary hover:underline">2. Wat staat er in een expertise rapport?</a>
                <a href="#wie-stelt-op" className="block text-primary hover:underline">3. Wie stelt het expertise rapport op?</a>
                <a href="#wanneer-nodig" className="block text-primary hover:underline">4. Wanneer is een expertise rapport nodig?</a>
                <a href="#soorten" className="block text-primary hover:underline">5. Soorten expertise rapporten</a>
                <a href="#kosten" className="block text-primary hover:underline">6. Wat kost een expertise rapport?</a>
                <a href="#belang" className="block text-primary hover:underline">7. Waarom is het expertise rapport zo belangrijk?</a>
                <a href="#bezwaar" className="block text-primary hover:underline">8. Niet eens met het rapport?</a>
              </nav>
            </CardContent>
          </Card>

          {/* Main Content */}
          <div className="prose prose-lg max-w-none">
            
            {/* Section 1 */}
            <section id="definitie" className="mb-12">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm">1</span>
                Definitie: Wat is een expertise rapport precies?
              </h2>
              
              <p className="text-muted-foreground mb-4">
                Een <strong>expertise rapport</strong> is een officieel document dat wordt opgesteld door een erkende 
                schade-expert na inspectie van uw beschadigde voertuig. Het rapport bevat een gedetailleerde beschrijving 
                van alle schade en een nauwkeurige berekening van de herstelkosten of de waardevermindering.
              </p>

              <p className="text-muted-foreground mb-4">
                Het expertise rapport wordt ook wel <strong>taxatierapport</strong>, <strong>schaderapport</strong> of 
                <strong> schadebegroting</strong> genoemd. In de praktijk worden deze termen door elkaar gebruikt, 
                hoewel er technisch kleine verschillen kunnen zijn.
              </p>

              <Card className="bg-gray-50 mb-6">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-3">Officiële definitie:</h3>
                  <p className="text-muted-foreground italic">
                    "Een expertise rapport is een door een erkende schade-expert opgesteld document waarin de aard, 
                    omvang en waarde van de schade aan een voertuig objectief wordt vastgesteld, ten behoeve van 
                    de afwikkeling van een schadeclaim."
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* Section 2 */}
            <section id="inhoud" className="mb-12">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm">2</span>
                Wat staat er in een expertise rapport?
              </h2>
              
              <p className="text-muted-foreground mb-6">
                Een volledig expertise rapport bevat doorgaans de volgende onderdelen:
              </p>

              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <FontAwesomeIcon icon={faCircleCheck} className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Voertuiggegevens</h4>
                    <p className="text-sm text-muted-foreground">
                      Merk, type, bouwjaar, kenteken, kilometerstand, kleur en uitvoering van het voertuig.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FontAwesomeIcon icon={faCircleCheck} className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Schadebeschrijving</h4>
                    <p className="text-sm text-muted-foreground">
                      Gedetailleerde beschrijving van alle zichtbare schade, inclusief foto's van de beschadigingen.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FontAwesomeIcon icon={faCircleCheck} className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Herstelspecificatie</h4>
                    <p className="text-sm text-muted-foreground">
                      Overzicht van alle benodigde onderdelen, materialen en arbeidsuren voor het herstel.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FontAwesomeIcon icon={faCircleCheck} className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Kostenbegroting</h4>
                    <p className="text-sm text-muted-foreground">
                      Gedetailleerde berekening van onderdeelkosten, arbeidskosten, spuitwerk en BTW.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FontAwesomeIcon icon={faCircleCheck} className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Dagwaarde (bij total loss)</h4>
                    <p className="text-sm text-muted-foreground">
                      De marktwaarde van het voertuig direct vóór het ongeval, indien de auto total loss is verklaard.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FontAwesomeIcon icon={faCircleCheck} className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Conclusie en advies</h4>
                    <p className="text-sm text-muted-foreground">
                      Of herstel economisch verantwoord is, of dat het voertuig beter total loss verklaard kan worden.
                    </p>
                  </div>
                </div>
              </div>

              <Card className="bg-amber-50 border-amber-200">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-amber-900">Let op: verborgen schade</h4>
                      <p className="text-sm text-amber-800">
                        Het eerste expertise rapport is vaak gebaseerd op visuele inspectie. Tijdens de reparatie kan 
                        verborgen schade aan het licht komen die extra kosten met zich meebrengt. Dit wordt dan in een 
                        aanvullend rapport (herbegroting) vastgelegd.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Section 3 */}
            <section id="wie-stelt-op" className="mb-12">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm">3</span>
                Wie stelt het expertise rapport op?
              </h2>
              
              <p className="text-muted-foreground mb-4">
                Een expertise rapport wordt opgesteld door een <strong>erkende schade-expert</strong>. Dit is een 
                gespecialiseerde professional die is opgeleid en gecertificeerd om voertuigschade te beoordelen.
              </p>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <Card>
                  <CardContent className="pt-6">
                    <h4 className="font-semibold mb-2">Verzekeraarsexpert</h4>
                    <p className="text-sm text-muted-foreground">
                      Werkt in opdracht van de verzekeringsmaatschappij. Let op: deze expert behartigt primair de 
                      belangen van de verzekeraar, niet die van u.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h4 className="font-semibold mb-2">Onafhankelijke expert</h4>
                    <p className="text-sm text-muted-foreground">
                      Werkt niet voor een verzekeraar en stelt objectief de schade vast. Wij werken altijd met 
                      onafhankelijke experts voor een eerlijke beoordeling.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <p className="text-muted-foreground">
                Bij 112autoschade.nl zorgen wij voor <strong>snelle expertise</strong> door onafhankelijke experts. 
                Zo weet u zeker dat uw belangen worden behartigd en u een eerlijke schadevergoeding krijgt.
              </p>
            </section>

            {/* Section 4 */}
            <section id="wanneer-nodig" className="mb-12">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm">4</span>
                Wanneer is een expertise rapport nodig?
              </h2>
              
              <p className="text-muted-foreground mb-4">
                Een expertise rapport is niet bij elke schade nodig. Of er expertise plaatsvindt, hangt af van 
                verschillende factoren:
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-green-900">Expertise wél nodig bij:</h4>
                    <ul className="text-sm text-green-800 mt-2 space-y-1">
                      <li>• Schade boven € 1.000 à € 1.500 (afhankelijk van verzekeraar)</li>
                      <li>• Complexe of uitgebreide schade</li>
                      <li>• Discussie over de hoogte van de schade</li>
                      <li>• Total loss situaties (bepalen dagwaarde)</li>
                      <li>• Wanneer u of de verzekeraar expertise wilt</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                  <Car className="h-5 w-5 text-gray-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Geen expertise nodig bij:</h4>
                    <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                      <li>• Kleine schades met lage reparatiekosten</li>
                      <li>• Schade die direct door een erkend herstelbedrijf wordt begroot</li>
                      <li>• Gevallen waarbij beide partijen het eens zijn over het schadebedrag</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section id="soorten" className="mb-12">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm">5</span>
                Soorten expertise rapporten
              </h2>
              
              <p className="text-muted-foreground mb-6">
                Er zijn verschillende soorten expertise rapporten, afhankelijk van het doel:
              </p>

              <div className="space-y-4">
                <Card>
                  <CardContent className="pt-6">
                    <h4 className="font-semibold mb-2">1. Schadebegroting (herstelrapport)</h4>
                    <p className="text-sm text-muted-foreground">
                      Het meest voorkomende type. Beschrijft de schade en berekent de herstelkosten. Wordt gebruikt 
                      wanneer het voertuig gerepareerd gaat worden.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h4 className="font-semibold mb-2">2. Total loss rapport (dagwaarderapport)</h4>
                    <p className="text-sm text-muted-foreground">
                      Wordt opgesteld wanneer de reparatiekosten hoger zijn dan de waarde van de auto. Bepaalt de 
                      dagwaarde (marktwaarde vóór het ongeval) en de restwaarde (wat de auto nu nog waard is).
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h4 className="font-semibold mb-2">3. Herbegroting (aanvullend rapport)</h4>
                    <p className="text-sm text-muted-foreground">
                      Wordt gemaakt als tijdens de reparatie blijkt dat er meer schade is dan eerst zichtbaar was. 
                      De extra kosten worden hierin vastgelegd.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h4 className="font-semibold mb-2">4. Contra-expertise</h4>
                    <p className="text-sm text-muted-foreground">
                      Een tweede expertise rapport, aangevraagd wanneer u het niet eens bent met het eerste rapport. 
                      Wordt uitgevoerd door een andere, onafhankelijke expert.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Section 6 */}
            <section id="kosten" className="mb-12">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm">6</span>
                Wat kost een expertise rapport?
              </h2>
              
              <p className="text-muted-foreground mb-4">
                De kosten voor een expertise rapport variëren, maar liggen doorgaans tussen de <strong>€ 150 en € 400</strong>, 
                afhankelijk van de complexiteit van de schade en het type rapport.
              </p>

              <Card className="bg-green-50 border-green-200 mb-6">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <Euro className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-green-900">Goed nieuws: u betaalt niets!</h4>
                      <p className="text-sm text-green-800">
                        Bij een onschuldige aanrijding worden de expertisekosten volledig vergoed door de 
                        WA-verzekeraar van de tegenpartij. U betaalt dus niets voor het expertise rapport. 
                        Dit geldt ook wanneer u via ons uw schade verhaalt.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <p className="text-muted-foreground">
                Let op: vraagt u zelf een contra-expertise aan terwijl de verzekeraar dit niet vergoedt? 
                Dan kunnen de kosten voor uw rekening komen. Bij 112autoschade.nl adviseren wij u hierover 
                en zorgen we dat onnodige kosten worden vermeden.
              </p>
            </section>

            {/* Section 7 */}
            <section id="belang" className="mb-12">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm">7</span>
                Waarom is het expertise rapport zo belangrijk?
              </h2>
              
              <p className="text-muted-foreground mb-6">
                Het expertise rapport is cruciaal voor uw schadeclaim om de volgende redenen:
              </p>

              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary font-bold text-sm">1</span>
                  </span>
                  <div>
                    <h4 className="font-semibold">Bepaalt uw schadevergoeding</h4>
                    <p className="text-sm text-muted-foreground">
                      Het bedrag in het rapport is in principe het bedrag dat u krijgt uitgekeerd. Een te laag 
                      rapport betekent dus minder geld voor u.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary font-bold text-sm">2</span>
                  </span>
                  <div>
                    <h4 className="font-semibold">Officieel bewijs</h4>
                    <p className="text-sm text-muted-foreground">
                      Het rapport dient als officieel bewijs van de schade en de herstelkosten. Dit is belangrijk 
                      bij eventuele geschillen.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary font-bold text-sm">3</span>
                  </span>
                  <div>
                    <h4 className="font-semibold">Basis voor reparatie</h4>
                    <p className="text-sm text-muted-foreground">
                      Het herstelbedrijf gebruikt het rapport als basis voor de reparatie. Alles wat in het rapport 
                      staat, wordt hersteld.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary font-bold text-sm">4</span>
                  </span>
                  <div>
                    <h4 className="font-semibold">Beschermt uw belangen</h4>
                    <p className="text-sm text-muted-foreground">
                      Een goed en volledig rapport zorgt ervoor dat alle schade wordt vergoed, inclusief zaken 
                      die u misschien over het hoofd zou zien.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 8 */}
            <section id="bezwaar" className="mb-12">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm">8</span>
                Niet eens met het rapport?
              </h2>
              
              <p className="text-muted-foreground mb-4">
                Bent u het niet eens met het expertise rapport? Dan heeft u verschillende opties:
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3">
                  <FontAwesomeIcon icon={faCircleCheck} className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <p className="text-muted-foreground">
                    <strong>Contra-expertise aanvragen:</strong> Laat een tweede, onafhankelijke expert de schade 
                    opnieuw beoordelen.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <FontAwesomeIcon icon={faCircleCheck} className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <p className="text-muted-foreground">
                    <strong>Bezwaar maken:</strong> Dien schriftelijk bezwaar in bij de verzekeraar met onderbouwing 
                    waarom het rapport niet klopt.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <FontAwesomeIcon icon={faCircleCheck} className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <p className="text-muted-foreground">
                    <strong>Arbitrage:</strong> Bij blijvend geschil kan een derde expert als arbiter worden aangesteld 
                    die een bindende uitspraak doet.
                  </p>
                </div>
              </div>

              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground">
                    <strong>Tip:</strong> Lees ook ons artikel{" "}
                    <Link href="/blog/expertiserapport-controleren" className="text-primary hover:underline">
                      "Expertiserapport Controleren: 7 Cruciale Punten"
                    </Link>{" "}
                    voor tips over waar u op moet letten voordat u akkoord gaat.
                  </p>
                </CardContent>
              </Card>
            </section>

          </div>

          {/* Related Articles */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Gerelateerde Artikelen</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/blog/wat-doet-schade-expert">
                <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-2">Wat doet een schade-expert?</h3>
                    <p className="text-sm text-muted-foreground">
                      Leer meer over de rol van de schade-expert en wanneer expertise nodig is.
                    </p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/blog/expertiserapport-controleren">
                <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-2">Expertiserapport controleren</h3>
                    <p className="text-sm text-muted-foreground">
                      7 cruciale punten om te controleren voordat u akkoord gaat met het rapport.
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </section>

          {/* Final CTA */}
          <Card className="bg-gradient-to-br from-primary to-blue-600 text-white border-0">
            <CardContent className="text-center py-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Snelle expertise bij uw autoschade?
              </h2>
              <p className="text-lg text-blue-50 mb-6 max-w-2xl mx-auto">
                Wij regelen de expertise en zorgen voor een correcte schadebegroting. 
                U betaalt niets – de tegenpartij betaalt alles.
              </p>
              <Link href="/claim-indienen">
                <Button size="lg" variant="secondary" className="text-lg px-8">
                  Direct Schade Melden
                </Button>
              </Link>
              <p className="text-sm text-blue-100 mt-4">
                Snelle expertise • Geen kosten • Maximale vergoeding
              </p>
            </CardContent>
          </Card>

        </article>
      </div>
    </>
  )
}
