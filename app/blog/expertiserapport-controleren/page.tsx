import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { AlertTriangle, ArrowLeft, FileText, Upload, Eye, Calculator, Phone } from "lucide-react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons"

export const metadata: Metadata = {
  title: "Expertiserapport Controleren: 7 Cruciale Punten om op te Letten (2026)",
  description: "Hoe controleer je een expertiserapport bij autoschade? 7 essentiële punten die u moet checken voordat u akkoord gaat. Expert tips voor maximale schadevergoeding.",
  keywords: [
    "expertiserapport controleren",
    "expertise autoschade",
    "schade-expert",
    "expertiserapport beoordelen",
    "schadebedrag checken",
    "expertise bezwaar",
    "tegen expertise",
    "schade taxatie"
  ],
}

export default function ExpertiserapportControlerenPage() {
  return (
    <div className="min-h-screen bg-white">
      <article className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Breadcrumbs */}
        <Breadcrumbs items={[
          { label: "Blog", href: "/blog" },
          { label: "Expertiserapport controleren" }
        ]} />

        {/* Back button */}
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8">
          <ArrowLeft className="h-4 w-4" />
          Terug naar blog
        </Link>

        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
              Expertise
            </span>
            <span>•</span>
            <span>10 minuten leestijd</span>
            <span>•</span>
            <span>23 januari 2026</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Expertiserapport Controleren: 7 Cruciale Punten om op te Letten
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Een expertiserapport bepaalt het bedrag dat u krijgt uitgekeerd bij autoschade. 
            Maar klopt alles wat erin staat? In deze gids leggen we uit welke 7 punten 
            u kritisch moet controleren voordat u akkoord gaat met de schadevergoeding.
          </p>
        </header>

        {/* Alert Box */}
        <Card className="bg-orange-50 border-orange-300 mb-12">
          <CardContent className="pt-6">
            <div className="flex gap-3">
              <AlertTriangle className="h-6 w-6 text-orange-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold mb-2 text-orange-900">⚠️ Let op: Ga NOOIT direct akkoord!</h3>
                <p className="text-sm text-orange-800">
                  Ongeveer <strong>30% van alle expertiserapporten</strong> bevatten fouten of onvolledigheden 
                  die leiden tot een lagere uitbetaling. Neem altijd de tijd om het rapport grondig te controleren. 
                  U heeft <strong>14 dagen</strong> om bezwaar te maken na ontvangst.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="prose prose-lg max-w-none">
          
          {/* Intro Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Waarom is een expertiserapport belangrijk?</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Het <strong>expertiserapport</strong> (ook wel expertise-rapport of taxatierapport genoemd) is 
              het officiële document dat de schade aan uw auto in kaart brengt na een ongeval. Een onafhankelijke 
              schade-expert beoordeelt:
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <FontAwesomeIcon icon={faCircleCheck} className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                <span>De omvang en aard van de schade</span>
              </li>
              <li className="flex items-start gap-2">
                <FontAwesomeIcon icon={faCircleCheck} className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                <span>De reparatiekosten (arbeidsloon + onderdelen)</span>
              </li>
              <li className="flex items-start gap-2">
                <FontAwesomeIcon icon={faCircleCheck} className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                <span>Eventuele waardevermindering na reparatie</span>
              </li>
              <li className="flex items-start gap-2">
                <FontAwesomeIcon icon={faCircleCheck} className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                <span>Bij total loss: de dagwaarde van het voertuig</span>
              </li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              <strong>Dit rapport bepaalt hoeveel geld u krijgt.</strong> Een fout of onderschatting kan 
              u honderden tot duizenden euro's kosten. Daarom is het essentieel om elk detail te controleren.
            </p>
          </section>

          {/* 7 Points Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-8">De 7 Cruciale Controlepunten</h2>

            {/* Point 1 */}
            <Card className="mb-6 border-2 hover:shadow-lg transition-all">
              <CardHeader className="bg-primary/5">
                <CardTitle className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
                    1
                  </div>
                  Zijn alle beschadigingen opgenomen?
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-muted-foreground mb-4">
                  <strong>Wat checken:</strong> Vergelijk het rapport met de foto's die u direct na het ongeval 
                  heeft gemaakt. Staat élke deuk, kras, scheur of beschadiging erin?
                </p>
                <div className="bg-red-50 border-l-4 border-red-500 p-4 my-4">
                  <p className="text-sm text-red-800 font-medium">❌ Veelgemaakte fouten:</p>
                  <ul className="text-sm text-red-700 mt-2 space-y-1">
                    <li>• Kleine krassen of deuken worden vergeten</li>
                    <li>• Schade aan onderzijde of wielkasten gemist</li>
                    <li>• Interne schade (airbags, elektronica) niet gecontroleerd</li>
                    <li>• Schade aan bumpers of spiegels over het hoofd gezien</li>
                  </ul>
                </div>
                <p className="text-sm font-semibold text-primary">
                  💡 Tip: Maak altijd zelf uitgebreide foto's vanaf alle kanten én de details. Deze zijn uw bewijs!
                </p>
              </CardContent>
            </Card>

            {/* Point 2 */}
            <Card className="mb-6 border-2 hover:shadow-lg transition-all">
              <CardHeader className="bg-primary/5">
                <CardTitle className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
                    2
                  </div>
                  Klopt het uurtarief voor arbeid?
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-muted-foreground mb-4">
                  <strong>Wat checken:</strong> Het uurtarief voor arbeidsloon verschilt per garage. 
                  Check of het tarief realistisch is voor uw regio en type schade.
                </p>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-4">
                  <p className="text-sm font-medium text-blue-900 mb-2">📊 Gemiddelde uurtarieven 2026:</p>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• <strong>Algemene garages:</strong> €55 - €75 per uur</li>
                    <li>• <strong>Merkdealers:</strong> €80 - €120 per uur</li>
                    <li>• <strong>Gespecialiseerde schadegarages:</strong> €65 - €85 per uur</li>
                    <li>• <strong>Spuiterijen (lakschade):</strong> €60 - €90 per uur</li>
                  </ul>
                </div>
                <p className="text-muted-foreground">
                  Als het tarief in het rapport <strong>lager</strong> is dan normaal, kan dit betekenen 
                  dat u onvoldoende vergoed krijgt voor de werkelijke reparatiekosten.
                </p>
              </CardContent>
            </Card>

            {/* Point 3 */}
            <Card className="mb-6 border-2 hover:shadow-lg transition-all">
              <CardHeader className="bg-primary/5">
                <CardTitle className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
                    3
                  </div>
                  Zijn de juiste onderdelen gebruikt?
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-muted-foreground mb-4">
                  <strong>Wat checken:</strong> Zijn er originele onderdelen (OEM) gebruikt in de berekening, 
                  of zijn er goedkopere alternatieven ("aftermarket") opgenomen?
                </p>
                <div className="grid md:grid-cols-2 gap-4 my-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="font-semibold text-green-900 mb-2">✅ U heeft recht op:</p>
                    <ul className="text-sm text-green-800 space-y-1">
                      <li>• Originele merkonderdelen (OEM)</li>
                      <li>• Volledige kwaliteitsgarantie</li>
                      <li>• Geen waardevermindering door goedkope onderdelen</li>
                    </ul>
                  </div>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="font-semibold text-red-900 mb-2">❌ Let op bij:</p>
                    <ul className="text-sm text-red-800 space-y-1">
                      <li>• "Aftermarket" onderdelen</li>
                      <li>• Gebruikt/refurbished parts</li>
                      <li>• "Kwaliteitsonderdelen" (vaak goedkoper)</li>
                    </ul>
                  </div>
                </div>
                <p className="text-sm font-semibold text-primary">
                  💡 Tip: Bij auto's jonger dan 3 jaar heeft u altijd recht op originele onderdelen!
                </p>
              </CardContent>
            </Card>

            {/* Point 4 */}
            <Card className="mb-6 border-2 hover:shadow-lg transition-all">
              <CardHeader className="bg-primary/5">
                <CardTitle className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
                    4
                  </div>
                  Is er rekening gehouden met BTW?
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-muted-foreground mb-4">
                  <strong>Wat checken:</strong> Staat de BTW (21%) vermeld bij de reparatiekosten? 
                  Dit kan een aanzienlijk verschil maken in het totaalbedrag.
                </p>
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-4">
                  <p className="text-sm font-medium text-yellow-900 mb-2">💰 Voorbeeld berekening:</p>
                  <div className="space-y-2 text-sm text-yellow-800">
                    <div className="flex justify-between">
                      <span>Reparatiekosten excl. BTW:</span>
                      <span className="font-semibold">€ 2.500</span>
                    </div>
                    <div className="flex justify-between">
                      <span>BTW (21%):</span>
                      <span className="font-semibold">+ € 525</span>
                    </div>
                    <div className="border-t border-yellow-400 pt-2 flex justify-between font-bold">
                      <span>Totaal inclusief BTW:</span>
                      <span>€ 3.025</span>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  Zonder BTW mist u dus <strong>€525 in dit voorbeeld</strong>. Zorg dat de BTW altijd 
                  is opgenomen in de eindberekening, tenzij u BTW-plichtig bent (zakelijk).
                </p>
              </CardContent>
            </Card>

            {/* Point 5 */}
            <Card className="mb-6 border-2 hover:shadow-lg transition-all">
              <CardHeader className="bg-primary/5">
                <CardTitle className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
                    5
                  </div>
                  Zijn bijkomende kosten meegenomen?
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-muted-foreground mb-4">
                  <strong>Wat checken:</strong> Naast directe reparatiekosten heeft u mogelijk recht 
                  op extra vergoedingen. Controleer of deze zijn opgenomen:
                </p>
                <div className="grid gap-3 my-4">
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <FontAwesomeIcon icon={faCircleCheck} className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">Vervangend vervoer</p>
                      <p className="text-sm text-muted-foreground">
                        Kosten voor een huurauto tijdens reparatie (€30-60/dag)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <FontAwesomeIcon icon={faCircleCheck} className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">Berging & opslag</p>
                      <p className="text-sm text-muted-foreground">
                        Als uw auto moest worden weggesleept en gestald (€150-400)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <FontAwesomeIcon icon={faCircleCheck} className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">Waardevermindering</p>
                      <p className="text-sm text-muted-foreground">
                        Blijvend lagere verkoopwaarde na ernstige schade (5-15%)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <FontAwesomeIcon icon={faCircleCheck} className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">Expertise-kosten</p>
                      <p className="text-sm text-muted-foreground">
                        Kosten van de schade-expert (€200-500, betaald door tegenpartij)
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Point 6 */}
            <Card className="mb-6 border-2 hover:shadow-lg transition-all">
              <CardHeader className="bg-primary/5">
                <CardTitle className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
                    6
                  </div>
                  Klopt de dagwaarde (bij total loss)?
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-muted-foreground mb-4">
                  <strong>Wat checken:</strong> Bij total loss bepaalt de expert de dagwaarde van uw auto. 
                  Dit is het bedrag waarvoor een vergelijkbare auto te koop staat. Maar klopt deze waardering?
                </p>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-4">
                  <p className="text-sm font-medium text-blue-900 mb-2">🔍 Zo controleert u de dagwaarde:</p>
                  <ol className="text-sm text-blue-800 space-y-2 list-decimal ml-4">
                    <li>Zoek op <strong>Autoscout24, Marktplaats, AutoTrack</strong> naar vergelijkbare auto's</li>
                    <li>Let op: zelfde merk, model, bouwjaar, km-stand, uitvoering</li>
                    <li>Neem het gemiddelde van minimaal 3-5 vergelijkbare auto's</li>
                    <li>Tel eventuele opties/upgrades erbij (leder, navigatie, etc.)</li>
                  </ol>
                </div>
                <p className="text-muted-foreground">
                  Ligt de dagwaarde in het rapport <strong>lager</strong> dan marktprijzen? 
                  Dan heeft u recht op een hogere vergoeding. Lever bewijsmateriaal (screenshots van advertenties).
                </p>
              </CardContent>
            </Card>

            {/* Point 7 */}
            <Card className="mb-6 border-2 hover:shadow-lg transition-all">
              <CardHeader className="bg-primary/5">
                <CardTitle className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
                    7
                  </div>
                  Zijn de autogegevens correct?
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-muted-foreground mb-4">
                  <strong>Wat checken:</strong> Soms staan er simpele fouten in het rapport die grote 
                  gevolgen hebben voor de waardering.
                </p>
                <div className="bg-gray-50 rounded-lg p-4 my-4">
                  <p className="font-semibold mb-3">✅ Controleer deze gegevens:</p>
                  <div className="grid md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <FontAwesomeIcon icon={faCircleCheck} className="h-4 w-4 text-green-600" />
                      <span>Kenteken en chassisnummer</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FontAwesomeIcon icon={faCircleCheck} className="h-4 w-4 text-green-600" />
                      <span>Merk, model en uitvoering</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FontAwesomeIcon icon={faCircleCheck} className="h-4 w-4 text-green-600" />
                      <span>Bouwjaar en datum eerste toelating</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FontAwesomeIcon icon={faCircleCheck} className="h-4 w-4 text-green-600" />
                      <span>Kilometerstand op moment expertise</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FontAwesomeIcon icon={faCircleCheck} className="h-4 w-4 text-green-600" />
                      <span>Brandstoftype en motorinhoud</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FontAwesomeIcon icon={faCircleCheck} className="h-4 w-4 text-green-600" />
                      <span>Kleur en laksoort</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm font-semibold text-red-600">
                  ⚠️ Een verkeerde uitvoering (bijv. "Comfort" i.p.v. "Executive") kan duizenden euro's verschil maken!
                </p>
              </CardContent>
            </Card>
          </section>

          {/* What to do if errors */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Wat te doen bij fouten of onduidelijkheden?</h2>
            <div className="bg-primary/5 border-2 border-primary rounded-lg p-6">
              <h3 className="font-bold text-lg mb-4">📝 Stappenplan bij bezwaar:</h3>
              <ol className="space-y-3 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="font-bold text-primary flex-shrink-0">1.</span>
                  <span>
                    <strong>Documenteer alles:</strong> Maak screenshots, verzamel bewijsmateriaal (foto's, 
                    advertenties vergelijkbare auto's, offertes andere garages).
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-primary flex-shrink-0">2.</span>
                  <span>
                    <strong>Reageer schriftelijk binnen 14 dagen:</strong> Stuur een gemotiveerde bezwaarbrief 
                    naar de verzekeraar met uw opmerkingen en onderbouwing.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-primary flex-shrink-0">3.</span>
                  <span>
                    <strong>Vraag om tegen-expertise:</strong> U heeft recht op een tweede onafhankelijke expert 
                    die de schade opnieuw beoordeelt.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-primary flex-shrink-0">4.</span>
                  <span>
                    <strong>Overweeg professionele hulp:</strong> Bij grote bedragen (€5.000+) kan het verstandig 
                    zijn om een schadebureau in te schakelen.
                  </span>
                </li>
              </ol>
            </div>
          </section>

          {/* CTA Section */}
          <section className="mb-12">
            <Card className="bg-gradient-to-r from-primary to-blue-700 text-white border-0">
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Wij controleren uw expertiserapport gratis
                </h2>
                <p className="text-lg mb-6 opacity-95">
                  Laat ons uw expertiserapport controleren. Wij beoordelen of alles klopt en 
                  onderhandelen met de verzekeraar voor de hoogst mogelijke vergoeding.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/claim-indienen">
                    <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                      <Upload className="mr-2 h-5 w-5" />
                      Upload Uw Schadeformulier
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white/10 hover:bg-white/20 border-white/30 text-white">
                      <Phone className="mr-2 h-5 w-5" />
                      Bel Ons Direct
                    </Button>
                  </Link>
                </div>
                <p className="mt-4 text-sm opacity-80">
                  ✓ U betaalt niets • ✓ Tegenpartij betaalt alles • ✓ Gratis expertise-check
                </p>
              </CardContent>
            </Card>
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Veelgestelde vragen over expertiserapporten</h2>
            
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Hoe lang duurt het voordat ik een expertiserapport ontvang?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Gemiddeld ontvangt u het expertiserapport <strong>binnen 7-14 dagen</strong> na de expertise. 
                    Bij complexe schades of total loss kan dit iets langer duren (tot 3 weken). Vraag altijd naar 
                    een indicatie bij de expert.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Mag ik zelf een expert inhuren?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Ja, absoluut. U heeft altijd het recht om een <strong>onafhankelijke contra-expert</strong> 
                    in te schakelen. De kosten hiervan (€300-600) worden door de WA-verzekeraar van de tegenpartij 
                    vergoed als u volledig in uw recht staat.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Wat als ik het niet eens ben met de dagwaarde?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Verzamel bewijs van vergelijkbare auto's op de markt (screenshots Autoscout24, Marktplaats). 
                    Stuur dit mee in uw bezwaarbrief. De verzekeraar moet de dagwaarde onderbouwen. Bij blijvend 
                    geschil kan een <strong>onafhankelijke taxateur</strong> de waarde vaststellen.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Moet ik de expertise bijwonen?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Dit is <strong>niet verplicht maar wel sterk aangeraden</strong>. Door aanwezig te zijn kunt u:
                    (1) de expert attenderen op alle schade, (2) vragen stellen over de waardering, en 
                    (3) eventuele onduidelijkheden direct bespreken. Maak zelf extra foto's voor uw eigen archief.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Hoelang kan ik bezwaar maken tegen een expertiserapport?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    U heeft <strong>14 dagen na ontvangst</strong> van het expertiserapport om schriftelijk 
                    bezwaar te maken. Na deze termijn wordt het rapport vaak als geaccepteerd beschouwd. 
                    Wacht dus niet te lang met controleren!
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Conclusion */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Conclusie: Altijd grondig controleren</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Een expertiserapport is een cruciaal document dat bepaalt hoeveel schadevergoeding u ontvangt. 
              <strong> Ga nooit zomaar akkoord</strong> zonder het grondig te hebben gecontroleerd aan de hand 
              van de 7 punten in deze gids.
            </p>
            <div className="bg-green-50 border-l-4 border-green-500 p-6 my-6">
              <p className="font-bold text-green-900 mb-2">✅ Onthoud:</p>
              <ul className="text-sm text-green-800 space-y-2">
                <li>• 30% van expertiserapporten bevat fouten of onderschattingen</li>
                <li>• U heeft 14 dagen om bezwaar te maken</li>
                <li>• U heeft altijd recht op een tegen-expertise</li>
                <li>• Documenteer alles met foto's en bewijs</li>
                <li>• Bij twijfel: laat het rapport gratis controleren door experts</li>
              </ul>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              <strong>Wij helpen u graag.</strong> Upload uw schadeformulier en wij zorgen ervoor dat het 
              expertiserapport correct is en u de maximale vergoeding ontvangt. U betaalt niets – de 
              WA-verzekeraar van de tegenpartij betaalt alle kosten.
            </p>
          </section>

          {/* Related Articles */}
          <section className="mt-16 pt-12 border-t">
            <h2 className="text-2xl font-bold mb-6">📚 Gerelateerde artikelen</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/blog/hoe-verhaal-ik-autoschade" className="group">
                <Card className="h-full hover:shadow-lg transition-all hover:scale-[1.02]">
                  <CardContent className="pt-6">
                    <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">
                      Hoe verhaal ik autoschade?
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Complete stapsgewijze uitleg voor het verhalen van autoschade bij de tegenpartij.
                    </p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/blog/wa-verzekering-tegenpartij-claimen" className="group">
                <Card className="h-full hover:shadow-lg transition-all hover:scale-[1.02]">
                  <CardContent className="pt-6">
                    <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">
                      WA-verzekering tegenpartij claimen
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Hoe claimt u schade bij de WA-verzekeraar van de tegenpartij? Complete gids.
                    </p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/blog/auto-total-loss-wat-nu" className="group">
                <Card className="h-full hover:shadow-lg transition-all hover:scale-[1.02]">
                  <CardContent className="pt-6">
                    <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">
                      Auto total loss - Wat nu?
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Complete uitleg over total loss regelingen en dagwaarde-uitkering.
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </section>

          {/* Final CTA */}
          <div className="mt-12 text-center">
            <Link href="/claim-indienen">
              <Button size="lg" className="text-lg px-8">
                <Upload className="mr-2 h-5 w-5" />
                Start Nu – Gratis Autoschade Verhalen
              </Button>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Gemiddeld binnen 6 weken uitbetaald • U betaalt niets
            </p>
          </div>
        </div>
      </article>
    </div>
  )
}
