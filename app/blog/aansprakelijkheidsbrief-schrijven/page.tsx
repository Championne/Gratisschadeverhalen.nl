import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { ArrowLeft, AlertTriangle, Upload, FileText, Download } from "lucide-react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons"

export const metadata: Metadata = {
  title: "Aansprakelijkheidsbrief Schrijven: Gratis Template + Uitleg 2025",
  description: "Complete gids voor het schrijven van een aansprakelijkheidsbrief na auto-ongeval. Gratis template, juridische tips, en veelgemaakte fouten voorkomen.",
  keywords: [
    "aansprakelijkheidsbrief schrijven",
    "aansprakelijkheidsbrief template",
    "aansprakelijkheidsstelling auto",
    "brief verzekeraar tegenpartij",
    "schadebrief opstellen",
    "aansprakelijkheid auto ongeval"
  ],
}

export default function AansprakelijkheidsbriefPage() {
  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Breadcrumbs */}
        <Breadcrumbs items={[
          { label: "Blog", href: "/blog" },
          { label: "Aansprakelijkheidsbrief Schrijven" }
        ]} />

        <Link href="/blog" className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
          <ArrowLeft className="h-4 w-4" />
          Terug naar Knowledge Base
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">Juridisch</span>
            <span>•</span>
            <span>12 min leestijd</span>
            <span>•</span>
            <span>24 januari 2025</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Aansprakelijkheidsbrief Schrijven: Gratis Template + Uitleg 2025
          </h1>
          
          <p className="text-xl text-muted-foreground">
            Een professionele aansprakelijkheidsbrief is cruciaal voor succesvolle schade verhaal. 
            Leer stap voor stap hoe u een juridisch correcte brief opstelt, inclusief gratis template.
          </p>
        </div>

        <Card className="border-2 border-primary bg-primary/5 mb-8">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-2">💡 Wij Stellen De Brief Voor U Op!</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Een professionele aansprakelijkheidsbrief met alle juridische vereisten verhoogt uw kans op succes enorm. 
                  Wij regelen dit gratis voor u - inclusief verzending naar verzekeraar.
                </p>
                <Link href="/claim-indienen">
                  <Button>
                    <Upload className="mr-2 h-4 w-4" />
                    Laat Ons Het Regelen
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="prose prose-lg max-w-none">
          <h2>Wat Is Een Aansprakelijkheidsbrief?</h2>
          <p>
            Een <strong>aansprakelijkheidsbrief</strong> (of aansprakelijkheidsstelling) is een formele juridische brief waarmee u 
            de tegenpartij (en hun WA-verzekeraar) aansprakelijk stelt voor de schade die u heeft geleden na een auto-ongeval.
          </p>

          <Card className="my-6 border-l-4 border-l-blue-500">
            <CardContent className="p-4">
              <p className="font-semibold mb-2">🎯 Doel Van De Brief:</p>
              <ul className="text-sm space-y-1 ml-4">
                <li>✅ Formele claim indienen bij WA-verzekeraar tegenpartij</li>
                <li>✅ Aansprakelijkheid juridisch vaststellen</li>
                <li>✅ Schadevergoeding eisen met onderbouwing</li>
                <li>✅ Redelijke termijn stellen voor reactie</li>
                <li>✅ Bewijs veiligstellen (verzuimtermijn voorkomen)</li>
              </ul>
            </CardContent>
          </Card>

          <h2>Waarom Is Een Professionele Brief Belangrijk?</h2>

          <div className="grid md:grid-cols-2 gap-4 my-6">
            <Card className="border-2 border-green-200 bg-green-50">
              <CardContent className="p-4">
                <h4 className="font-bold mb-2 text-green-900">✅ Met Professionele Brief:</h4>
                <ul className="text-sm space-y-1">
                  <li>• Verzekeraar neemt claim serieus</li>
                  <li>• Snellere reactie (vaak binnen 2 weken)</li>
                  <li>• Hogere kans op volledige vergoeding</li>
                  <li>• Juridisch waterdichte aansprakelijkheidsstelling</li>
                  <li>• Alle wettelijke vereisten aanwezig</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-red-200 bg-red-50">
              <CardContent className="p-4">
                <h4 className="font-bold mb-2 text-red-900">❌ Zonder/Slechte Brief:</h4>
                <ul className="text-sm space-y-1">
                  <li>• Verzekeraar negeert of wijst direct af</li>
                  <li>• Lange wachttijden (maanden)</li>
                  <li>• Lagere vergoeding ("take it or leave it")</li>
                  <li>• Juridische fouten = claim ongeldig</li>
                  <li>• Extra correspondentie nodig</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <h2>Wat Moet Er In Een Aansprakelijkheidsbrief Staan?</h2>

          <div className="space-y-4 my-6">
            <Card className="border-l-4 border-l-primary">
              <CardContent className="p-4">
                <h4 className="font-semibold mb-2">1️⃣ Uw Gegevens (Eiser)</h4>
                <ul className="text-sm space-y-1 ml-4">
                  <li>• Volledige naam</li>
                  <li>• Adres, postcode, woonplaats</li>
                  <li>• Telefoonnummer + email</li>
                  <li>• Kenteken uw auto</li>
                  <li>• Uw verzekeraar + polisnummer (optioneel)</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-primary">
              <CardContent className="p-4">
                <h4 className="font-semibold mb-2">2️⃣ Gegevens Tegenpartij + Verzekeraar</h4>
                <ul className="text-sm space-y-1 ml-4">
                  <li>• Naam bestuurder tegenpartij</li>
                  <li>• Adres (indien bekend)</li>
                  <li>• Kenteken auto tegenpartij</li>
                  <li>• <strong>WA-verzekeraar tegenpartij + polisnummer</strong> (essentieel!)</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-primary">
              <CardContent className="p-4">
                <h4 className="font-semibold mb-2">3️⃣ Feiten Van Het Ongeval</h4>
                <ul className="text-sm space-y-1 ml-4">
                  <li>• Datum, tijd, en plaats ongeval</li>
                  <li>• Objectieve beschrijving wat er gebeurde</li>
                  <li>• Weersomstandigheden (indien relevant)</li>
                  <li>• Verwijzing naar Europees Schadeformulier (indien ingevuld)</li>
                  <li>• Getuigen (naam + contactgegevens)</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-primary">
              <CardContent className="p-4">
                <h4 className="font-semibold mb-2">4️⃣ Aansprakelijkheidsstelling</h4>
                <ul className="text-sm space-y-1 ml-4">
                  <li>• Waarom tegenpartij aansprakelijk is (juridische grondslag)</li>
                  <li>• Verwijzing naar artikel 6:162 BW (onrechtmatige daad)</li>
                  <li>• Causaal verband tussen ongeval en schade</li>
                  <li>• Eventueel: verkeersregels die tegenpartij overtrad</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-primary">
              <CardContent className="p-4">
                <h4 className="font-semibold mb-2">5️⃣ Schadeomschrijving + Bedrag</h4>
                <ul className="text-sm space-y-1 ml-4">
                  <li>• Gedetailleerde beschrijving van alle schade</li>
                  <li>• Reparatiekosten (offerte garage bijvoegen)</li>
                  <li>• Bijkomende kosten (huurauto, taksen, expertise)</li>
                  <li>• Totaalbedrag schadepost</li>
                  <li>• Bijlagen: foto's, offertes, bonnen</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-primary">
              <CardContent className="p-4">
                <h4 className="font-semibold mb-2">6️⃣ Eis + Termijnstelling</h4>
                <ul className="text-sm space-y-1 ml-4">
                  <li>• Duidelijke eis: "Hierbij stel ik u aansprakelijk voor..."</li>
                  <li>• Totaalbedrag dat u claimt</li>
                  <li>• Redelijke termijn voor reactie (meestal 14 dagen)</li>
                  <li>• Gevolgen bij niet reageren (juridische stappen, wettelijke rente)</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-primary">
              <CardContent className="p-4">
                <h4 className="font-semibold mb-2">7️⃣ Afsluiting + Bijlagen</h4>
                <ul className="text-sm space-y-1 ml-4">
                  <li>• Professionele afsluiting ("Met vriendelijke groet")</li>
                  <li>• Handtekening + naam</li>
                  <li>• Datum</li>
                  <li>• Lijst van bijlagen (schadeformulier, foto's, offertes)</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <h2>📄 Gratis Template Aansprakelijkheidsbrief</h2>

          <Card className="my-8 bg-gray-50 border-2 border-gray-300">
            <CardContent className="p-6">
              <div className="font-mono text-sm space-y-4 whitespace-pre-wrap">
{`[UW NAAM]
[UW ADRES]
[POSTCODE] [WOONPLAATS]
Telefoon: [UW TELEFOON]
Email: [UW EMAIL]

Aan:
[NAAM WA-VERZEKERAAR TEGENPARTIJ]
[ADRES VERZEKERAAR]
[POSTCODE] [WOONPLAATS]

Datum: [DD-MM-JJJJ]

Betreft: Aansprakelijkheidsstelling schade d.d. [DATUM ONGEVAL]

Geachte heer/mevrouw,

Bij deze stel ik u en uw verzekerde, de heer/mevrouw [NAAM TEGENPARTIJ], 
aansprakelijk voor de schade die ik heb geleden als gevolg van het 
verkeersongeval op [DATUM ONGEVAL] te [PLAATS ONGEVAL].

**1. FEITEN**

Op [DATUM] omstreeks [TIJDSTIP] heeft zich een aanrijding voorgedaan 
tussen mijn voertuig (kenteken: [UW KENTEKEN]) en het voertuig van uw 
verzekerde (kenteken: [KENTEKEN TEGENPARTIJ]) te [PLAATS + STRAAT].

Het ongeval vond als volgt plaats:
[BESCHRIJVING ONGEVAL - OBJECTIEF, GEEN MENINGEN]

Bijvoorbeeld:
"Ik reed op de [straatnaam] richting [bestemming]. Bij de kruising 
met [andere straat] negeerde de tegenpartij een stopbord en reed 
zonder te stoppen de kruising op, waardoor een botsing ontstond. 
De tegenpartij raakte mijn voertuig aan de rechterzijde."

Het ongeval is vastgelegd in het Europees Schadeformulier (zie bijlage).

**2. AANSPRAKELIJKHEID**

De aansprakelijkheid voor dit ongeval ligt volledig bij uw verzekerde, 
op grond van artikel 6:162 BW (onrechtmatige daad). 

Uw verzekerde heeft:
- [REDEN 1: bijv. "een stopbord genegeerd"]
- [REDEN 2: bijv. "geen voorrang verleend"]
- [Etc.]

Door deze verkeersovertreding(en) heeft uw verzekerde onrechtmatig 
gehandeld, waardoor ik schade heb geleden. Het causaal verband tussen 
het handelen van uw verzekerde en mijn schade is evident.

**3. SCHADE**

Als gevolg van het ongeval heb ik de volgende schade geleden:

a) Materiële schade voertuig:
   - Reparatiekosten: € [BEDRAG] (zie bijgevoegde offerte)
   
b) Bijkomende kosten:
   - Taksen/bergingskosten: € [BEDRAG]
   - Expertise: € [BEDRAG]
   - Huurauto ([X] dagen à € [BEDRAG]): € [BEDRAG]
   - Administratiekosten: € [BEDRAG]

**Totale schadepost: € [TOTAALBEDRAG]**

**4. EIS**

Hierbij stel ik u en uw verzekerde aansprakelijk voor bovengenoemde 
schade en verzoek ik u om binnen 14 dagen na dagtekening van deze 
brief schriftelijk te bevestigen dat u aansprakelijkheid erkent en 
dat u de volledige schade zult vergoeden.

Indien u niet binnen gestelde termijn reageert of aansprakelijkheid 
ontkent, behoud ik mij het recht voor om verdere juridische stappen 
te ondernemen. Over het schadebedrag is vanaf de datum van het ongeval 
de wettelijke rente verschuldigd.

**5. BIJLAGEN**

1. Kopie Europees Schadeformulier
2. Foto's van schade
3. Reparatieofferte garage [naam garage]
4. Factuur taksen/bergen
5. Factuur huurauto
6. [Evt. getuigenverklaringen]

Ik vertrouw erop dat u deze zaak spoedig en conform afhandelt.

Met vriendelijke groet,

[HANDTEKENING]

[UW NAAM]
[DATUM]`}
              </div>

              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded">
                <p className="text-sm font-semibold mb-2">💡 Deze template gebruiken?</p>
                <p className="text-xs text-muted-foreground">
                  Kopieer de tekst, vul uw gegevens in, en verstuur aangetekend naar de verzekeraar. 
                  <strong> Of nog beter:</strong> Upload uw claim bij ons en wij stellen een professionele brief op!
                </p>
              </div>
            </CardContent>
          </Card>

          <h2>Veelgemaakte Fouten (Voorkom Deze!)</h2>

          <div className="space-y-4 my-8">
            <Card className="border-l-4 border-l-red-500 bg-red-50">
              <CardContent className="p-4">
                <h4 className="font-semibold text-red-900 mb-2">❌ Fout 1: Emotionele/Beschuldigende Toon</h4>
                <p className="text-sm mb-2">
                  "Die idioot reed als een gek!" = niet professioneel en verzwakt uw positie.
                </p>
                <p className="text-xs text-green-700">
                  <strong>✅ Beter:</strong> "De tegenpartij reed harder dan toegestaan" (objectief, zakelijk).
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-red-500 bg-red-50">
              <CardContent className="p-4">
                <h4 className="font-semibold text-red-900 mb-2">❌ Fout 2: Geen Juridische Grondslag Noemen</h4>
                <p className="text-sm mb-2">
                  Alleen "ik wil geld" is niet genoeg. U moet juridische basis geven (art. 6:162 BW).
                </p>
                <p className="text-xs text-green-700">
                  <strong>✅ Beter:</strong> Verwijs altijd naar onrechtmatige daad (artikel 6:162 BW).
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-red-500 bg-red-50">
              <CardContent className="p-4">
                <h4 className="font-semibold text-red-900 mb-2">❌ Fout 3: Onvolledige Schadeopsomming</h4>
                <p className="text-sm mb-2">
                  Alleen reparatiekosten noemen = u mist huurauto, expertise, taksen, administratie.
                </p>
                <p className="text-xs text-green-700">
                  <strong>✅ Beter:</strong> Claim ALLES. Elke kost apart vermelden met bedrag.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-red-500 bg-red-50">
              <CardContent className="p-4">
                <h4 className="font-semibold text-red-900 mb-2">❌ Fout 4: Geen Termijn Stellen</h4>
                <p className="text-sm mb-2">
                  Zonder termijn kan verzekeraar maandenlang wachten zonder gevolgen.
                </p>
                <p className="text-xs text-green-700">
                  <strong>✅ Beter:</strong> Stel altijd 14 dagen termijn + vermeld gevolgen (juridische stappen, rente).
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-red-500 bg-red-50">
              <CardContent className="p-4">
                <h4 className="font-semibold text-red-900 mb-2">❌ Fout 5: Niet Aangetekend Versturen</h4>
                <p className="text-sm mb-2">
                  Gewone post = verzekeraar kan zeggen "nooit ontvangen".
                </p>
                <p className="text-xs text-green-700">
                  <strong>✅ Beter:</strong> Altijd aangetekend met ontvangstbevestiging versturen.
                </p>
              </CardContent>
            </Card>
          </div>

          <h2>Hoe Verstuurt U De Brief?</h2>

          <div className="bg-blue-50 p-6 rounded-lg my-6">
            <h3 className="font-bold mb-4">📬 Verzendopties (Van Best naar Minder Goed):</h3>
            
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-xs font-bold">1</div>
                <div>
                  <p className="font-semibold">Aangetekend met Ontvangstbevestiging</p>
                  <p className="text-muted-foreground text-xs">
                    Juridisch bewijs van ontvangst. Verzekeraar kan niet ontkennen. 
                    <strong> → BESTE OPTIE</strong>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-yellow-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-xs font-bold">2</div>
                <div>
                  <p className="font-semibold">Email + Aangetekend (Dubbele Verzending)</p>
                  <p className="text-muted-foreground text-xs">
                    Email voor snelheid, aangetekend voor juridische waarde. Veiligste optie.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-orange-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-xs font-bold">3</div>
                <div>
                  <p className="font-semibold">Email met Leesbevestiging</p>
                  <p className="text-muted-foreground text-xs">
                    Sneller maar minder juridische waarde. Leesbevestiging is bewijs.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-xs font-bold">4</div>
                <div>
                  <p className="font-semibold">Gewone Post</p>
                  <p className="text-muted-foreground text-xs">
                    AFGERADEN - geen bewijs van ontvangst. Alleen als noodoplossing.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <h2>Wat Gebeurt Er Na Verzending?</h2>

          <div className="space-y-6 my-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold flex-shrink-0">1</div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Verzekeraar Ontvangt Brief</h3>
                <p className="text-sm text-muted-foreground">
                  Binnen 2-5 werkdagen na verzending. Bij aangetekend heeft u ontvangstbevestiging.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold flex-shrink-0">2</div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Verzekeraar Beoordeelt Claim (14 Dagen)</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Binnen de gestelde termijn (meestal 14 dagen) beslist verzekeraar:
                </p>
                <ul className="text-sm space-y-1 ml-4">
                  <li>• <strong>Akkoord</strong> - Ze accepteren aansprakelijkheid</li>
                  <li>• <strong>Meer info nodig</strong> - Ze vragen aanvullende stukken</li>
                  <li>• <strong>Gedeeltelijk akkoord</strong> - Bijv. 70/30 schuld</li>
                  <li>• <strong>Afwijzing</strong> - Ze ontkennen aansprakelijkheid</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold flex-shrink-0">3</div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Bij Akkoord: Schaderegeling Start</h3>
                <p className="text-sm text-muted-foreground">
                  Expert komt taxeren, u krijgt offerte/rapport, onderhandeling over bedrag, uitbetaling (4-8 weken).
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center font-bold flex-shrink-0">4</div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Bij Afwijzing: Escalatie</h3>
                <p className="text-sm text-muted-foreground">
                  Formele sommatie → Kifid klacht → Juridische procedure (wij regelen dit voor u).
                </p>
              </div>
            </div>
          </div>

          <h2>Veelgestelde Vragen</h2>

          <div className="space-y-4 my-8">
            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold mb-2">📧 Kan ik de brief ook per email sturen?</h4>
                <p className="text-sm text-muted-foreground">
                  Ja, maar stuur ook aangetekend. Email is snel maar heeft minder juridische waarde. 
                  Bij geschil is aangetekend ontvangstbevestiging bewijs.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold mb-2">⏰ Wat als verzekeraar niet reageert binnen 14 dagen?</h4>
                <p className="text-sm text-muted-foreground">
                  Stuur herinnering (ingebrekestelling) met nieuwe termijn van 7 dagen. Vermeld dat u anders 
                  juridische stappen onderneemt + wettelijke rente in rekening brengt.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold mb-2">💰 Moet ik het exacte schadebedrag al weten?</h4>
                <p className="text-sm text-muted-foreground">
                  Bij eerste aansprakelijkstelling mag u voorlopig bedrag noemen ("ten minste €X"). 
                  Exacte bedrag kan later volgen na expertise. Wel: claim alvast ALLE kostenposten.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold mb-2">📎 Welke bijlagen moet ik meesturen?</h4>
                <p className="text-sm text-muted-foreground">
                  Minimaal: Europees Schadeformulier + foto's schade. 
                  Handig: reparatieofferte, facturen (taksen, huurauto), getuigenverklaringen.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="my-8 border-2 border-primary bg-gradient-to-br from-primary/5 to-white">
            <CardContent className="p-8 text-center">
              <FileText className="h-16 w-16 mx-auto mb-4 text-primary" />
              <h3 className="text-2xl font-bold mb-4">
                Liever Professionele Aansprakelijkheidsbrief?
              </h3>
              <p className="text-muted-foreground mb-6">
                Onze juristen stellen dagelijks professionele aansprakelijkheidsbrieven op die voldoen aan alle 
                juridische eisen. Verzekeraars reageren sneller en positiever op onze brieven. 
                <strong> U betaalt niets - snelle expertise!</strong>
              </p>
              <Link href="/claim-indienen">
                <Button size="lg" className="text-lg px-8">
                  <Upload className="mr-2 h-5 w-5" />
                  Upload Claim - Wij Regelen De Brief
                </Button>
              </Link>
              <p className="text-sm text-muted-foreground mt-4">
                ⚡ Binnen 24 uur professionele brief + verzending naar verzekeraar
              </p>
            </CardContent>
          </Card>

          <div className="mt-12 pt-8 border-t">
            <h3 className="text-xl font-bold mb-4">📚 Gerelateerde Artikelen</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/blog/wa-verzekering-tegenpartij-claimen" className="block p-4 border rounded-lg hover:border-primary hover:shadow-md transition-all">
                <h4 className="font-semibold mb-2">WA Verzekering Tegenpartij Claimen</h4>
                <p className="text-sm text-muted-foreground">Complete gids voor verhalen bij tegenpartij</p>
              </Link>
              
              <Link href="/blog/hoe-verhaal-ik-autoschade" className="block p-4 border rounded-lg hover:border-primary hover:shadow-md transition-all">
                <h4 className="font-semibold mb-2">Hoe Verhaal Ik Autoschade?</h4>
                <p className="text-sm text-muted-foreground">Stap voor stap proces van A tot Z</p>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
