import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { ArrowLeft, AlertTriangle, Upload, FileText } from "lucide-react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons"

export const metadata: Metadata = {
  title: "Europees Schadeformulier Invullen: Complete Gids 2025",
  description: "Stap voor stap uitleg over het correct invullen van het Europese aanrijdingsformulier. Veelgemaakte fouten voorkomen en maximale schadevergoeding krijgen.",
  keywords: [
    "europees schadeformulier invullen",
    "aanrijdingsformulier",
    "constatformulier",
    "schadeformulier auto",
    "europees schadeformulier uitleg",
    "vakjes schadeformulier",
    "ongevalsformulier invullen"
  ],
}

// Article Schema
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Europees Schadeformulier Invullen: Complete Gids 2025",
  "description": "Uitgebreide handleiding voor het correct invullen van het Europese aanrijdingsformulier na een auto-ongeval",
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
  "datePublished": "2025-01-24",
  "dateModified": "2025-01-24"
}

export default function EuropeesSchadeformulierPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="min-h-screen bg-white">
        <main className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Breadcrumbs */}
          <Breadcrumbs items={[
            { label: "Blog", href: "/blog" },
            { label: "Europees Schadeformulier Invullen" }
          ]} />

          {/* Back Button */}
          <Link href="/blog" className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
            <ArrowLeft className="h-4 w-4" />
            Terug naar Knowledge Base
          </Link>

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">Handleiding</span>
              <span>•</span>
              <span>12 min leestijd</span>
              <span>•</span>
              <span>24 januari 2025</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Europees Schadeformulier Invullen: Complete Gids 2025
            </h1>
            
            <p className="text-xl text-muted-foreground">
              Stap voor stap uitleg over het correct invullen van het Europese aanrijdingsformulier. 
              Voorkom veelgemaakte fouten en maximaliseer uw kans op volledige schadevergoeding.
            </p>
          </div>

          {/* Quick Upload CTA */}
          <Card className="border-2 border-primary bg-primary/5 mb-8">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Upload className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-2">💡 Al ingevuld? Upload direct!</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Ons systeem leest het formulier automatisch in. U hoeft het niet handmatig over te typen.
                  </p>
                  <Link href="/claim-indienen">
                    <Button>
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Schadeformulier
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            {/* Intro */}
            <h2>Wat is het Europees Schadeformulier?</h2>
            <p>
              Het Europees Schadeformulier (ook wel <strong>Europees Aanrijdingsformulier</strong> of <strong>Constatformulier</strong> 
              genoemd) is een gestandaardiseerd formulier dat na een verkeersongeval wordt ingevuld door beide betrokken partijen. 
              Dit formulier is cruciaal voor het succesvol verhalen van uw autoschade.
            </p>

            <Card className="my-6 border-l-4 border-l-yellow-500">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold mb-1">Waarom is dit formulier zo belangrijk?</p>
                    <p className="text-sm text-muted-foreground">
                      Het Europees Schadeformulier dient als officieel bewijs van het ongeval en de omstandigheden. 
                      Verzekeraars baseren hun aansprakelijkheidsbeoordeling grotendeels op dit document.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <h2>Waar vind ik het formulier?</h2>
            <p>U heeft meestal al een Europees Schadeformulier in uw dashboardkastje gekregen van uw verzekeraar toen u uw autoverzekering afsloot. Heeft u deze niet bij de hand?</p>
            
            <ul>
              <li><strong>Download online:</strong> Zoek op "Europees Schadeformulier PDF Nederland" of vraag bij uw verzekeraar</li>
              <li><strong>Bij APK-keuring:</strong> Veel garages geven gratis nieuwe formulieren mee</li>
              <li><strong>Via Verbond van Verzekeraars:</strong> Op hun website beschikbaar</li>
            </ul>

            <h2>Wanneer moet u het formulier invullen?</h2>
            <p className="font-semibold text-lg">Direct na het ongeval - op de plek van de aanrijding!</p>
            <p>
              Vul het formulier altijd <strong>onmiddellijk na het ongeval</strong> in, nog voordat u de plaats van het ongeval verlaat. 
              Neem de tijd om het zorgvuldig en volledig in te vullen. Haast leidt tot fouten die later uw claim kunnen belemmeren.
            </p>

            <Card className="my-6 bg-red-50 border-red-200">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold mb-1 text-red-900">Let op!</p>
                    <p className="text-sm text-red-800">
                      Rijd NOOIT weg zonder het formulier in te vullen, tenzij de tegenpartij weigert (bel dan de politie). 
                      Een later ingevuld formulier heeft veel minder bewijskracht.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <h2>Stap voor Stap: Het Formulier Invullen</h2>
            <p>Het Europees Schadeformulier bestaat uit twee identieke doordrukexemplaren: één voor u, één voor de tegenpartij. Beide partijen vullen elk hun eigen kant in.</p>

            <h3>📋 Sectie 1-6: Basale Ongevalsgegevens</h3>
            <p>Deze velden vullen beide partijen <strong>identiek</strong> in:</p>

            <div className="bg-blue-50 p-6 rounded-lg my-6">
              <h4 className="font-bold mb-3">Veld 1: Datum en Tijdstip</h4>
              <ul className="space-y-2 text-sm">
                <li><FontAwesomeIcon icon={faCircleCheck} className="inline h-4 w-4 text-green-600 mr-2" />Datum: DD-MM-JJJJ formaat</li>
                <li><FontAwesomeIcon icon={faCircleCheck} className="inline h-4 w-4 text-green-600 mr-2" />Tijd: Uur:Minuten (bijv. 14:30)</li>
                <li><strong>Tip:</strong> Check uw telefoon voor de exacte tijd als u twijfelt</li>
              </ul>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg my-6">
              <h4 className="font-bold mb-3">Veld 2: Plaats</h4>
              <ul className="space-y-2 text-sm">
                <li><FontAwesomeIcon icon={faCircleCheck} className="inline h-4 w-4 text-green-600 mr-2" />Straatnaam + huisnummer (of "ter hoogte van...")</li>
                <li><FontAwesomeIcon icon={faCircleCheck} className="inline h-4 w-4 text-green-600 mr-2" />Postcode en plaatsnaam</li>
                <li><strong>Tip:</strong> Gebruik Google Maps voor de exacte locatie als u twijfelt</li>
              </ul>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg my-6">
              <h4 className="font-bold mb-3">Veld 3: Gewonden</h4>
              <ul className="space-y-2 text-sm">
                <li>Kruis <strong>JA</strong> aan als iemand gewond is (ook bij lichte pijn!)</li>
                <li>Zelfs bij twijfel over whiplash: kruis JA aan</li>
                <li><strong>Belangrijk:</strong> Dit opent de mogelijkheid voor letselschade claim later</li>
              </ul>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg my-6">
              <h4 className="font-bold mb-3">Veld 4: Schade aan Andere Objecten</h4>
              <ul className="space-y-2 text-sm">
                <li>Kruis JA aan als er schade is aan: vangrail, verkeersbord, lantaarnpaal, fiets, etc.</li>
                <li>Noteer <strong>wat</strong> beschadigd is</li>
              </ul>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg my-6">
              <h4 className="font-bold mb-3">Veld 5: Getuigen</h4>
              <ul className="space-y-2 text-sm">
                <li><FontAwesomeIcon icon={faCircleCheck} className="inline h-4 w-4 text-green-600 mr-2" />Naam + adres van getuigen</li>
                <li><FontAwesomeIcon icon={faCircleCheck} className="inline h-4 w-4 text-green-600 mr-2" />Telefoonnummer (indien mogelijk)</li>
                <li><strong>Tip:</strong> Ook passagiers kunnen getuige zijn, maar onafhankelijke getuigen wegen zwaarder</li>
              </ul>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg my-6">
              <h4 className="font-bold mb-3">Veld 6: Verzekeringsnemer Voertuig A/B</h4>
              <p className="text-sm mb-2">Vul <strong>uw eigen gegevens</strong> in op uw kant (links of rechts):</p>
              <ul className="space-y-2 text-sm">
                <li><FontAwesomeIcon icon={faCircleCheck} className="inline h-4 w-4 text-green-600 mr-2" />Achternaam + voornaam verzekeringsnemer</li>
                <li><FontAwesomeIcon icon={faCircleCheck} className="inline h-4 w-4 text-green-600 mr-2" />Adres, postcode, plaats</li>
                <li><FontAwesomeIcon icon={faCircleCheck} className="inline h-4 w-4 text-green-600 mr-2" />Land (meestal: Nederland)</li>
                <li><FontAwesomeIcon icon={faCircleCheck} className="inline h-4 w-4 text-green-600 mr-2" />Telefoonnummer of email</li>
                <li><strong>Let op:</strong> Dit is de eigenaar van de verzekering, niet altijd de bestuurder!</li>
              </ul>
            </div>

            <h3>📋 Sectie 7-8: Voertuig- en Verzekeringsgegevens</h3>

            <div className="bg-blue-50 p-6 rounded-lg my-6">
              <h4 className="font-bold mb-3">Veld 7: Voertuig</h4>
              <ul className="space-y-2 text-sm">
                <li><FontAwesomeIcon icon={faCircleCheck} className="inline h-4 w-4 text-green-600 mr-2" />Merk (bijv. Volkswagen, Toyota, BMW)</li>
                <li><FontAwesomeIcon icon={faCircleCheck} className="inline h-4 w-4 text-green-600 mr-2" />Type (bijv. Golf, Aygo, 3-Serie)</li>
                <li><FontAwesomeIcon icon={faCircleCheck} className="inline h-4 w-4 text-green-600 mr-2" /><strong>Kenteken</strong> (zeer belangrijk - controleer 2x!)</li>
                <li><strong>Tip:</strong> Check het kenteken van de tegenpartij goed - een fout kenteken maakt verhalen bijna onmogelijk</li>
              </ul>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg my-6">
              <h4 className="font-bold mb-3">Veld 8: Verzekeringsmaatschappij</h4>
              <ul className="space-y-2 text-sm">
                <li><FontAwesomeIcon icon={faCircleCheck} className="inline h-4 w-4 text-green-600 mr-2" />Naam verzekeraar (bijv. Aegon, Allianz, Nationale Nederlanden)</li>
                <li><FontAwesomeIcon icon={faCircleCheck} className="inline h-4 w-4 text-green-600 mr-2" />Polisnummer (staat op uw verzekeringspas)</li>
                <li><FontAwesomeIcon icon={faCircleCheck} className="inline h-4 w-4 text-green-600 mr-2" />Groene kaart nummer (alleen bij buitenlandse ongevallen)</li>
                <li><strong>Tip:</strong> Maak een foto van de verzekeringspas van de tegenpartij met uw telefoon</li>
              </ul>
            </div>

            <h3>📋 Sectie 9-11: Bestuurder en Schade</h3>

            <div className="bg-blue-50 p-6 rounded-lg my-6">
              <h4 className="font-bold mb-3">Veld 9: Bestuurder</h4>
              <p className="text-sm mb-2">Als u zelf reed: vul hier uw gegevens in. Bij andere bestuurder:</p>
              <ul className="space-y-2 text-sm">
                <li><FontAwesomeIcon icon={faCircleCheck} className="inline h-4 w-4 text-green-600 mr-2" />Naam bestuurder</li>
                <li><FontAwesomeIcon icon={faCircleCheck} className="inline h-4 w-4 text-green-600 mr-2" />Geboortedatum</li>
                <li><FontAwesomeIcon icon={faCircleCheck} className="inline h-4 w-4 text-green-600 mr-2" />Adres</li>
                <li><FontAwesomeIcon icon={faCircleCheck} className="inline h-4 w-4 text-green-600 mr-2" />Rijbewijsnummer</li>
                <li><FontAwesomeIcon icon={faCircleCheck} className="inline h-4 w-4 text-green-600 mr-2" />Categorie rijbewijs (bijv. B voor auto)</li>
              </ul>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg my-6">
              <h4 className="font-bold mb-3">Veld 10: Aanduiding Eerste Schokpunt</h4>
              <p className="text-sm mb-3">Teken met een pijl <strong>waar op uw auto</strong> de eerste aanraking/botsing was:</p>
              <ul className="space-y-2 text-sm">
                <li>Linksvoor, rechtsvoor, linksachter, rechtsachter</li>
                <li>Of: zijkant, achterkant volledig, voorkant volledig</li>
                <li><strong>Tip:</strong> Dit moet overeenkomen met de zichtbare schade</li>
              </ul>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg my-6">
              <h4 className="font-bold mb-3">Veld 11: Zichtbare Schade aan Voertuig</h4>
              <p className="text-sm mb-2">Beschrijf alle schade <strong>globaal maar volledig:</strong></p>
              <ul className="space-y-2 text-sm">
                <li>"Deuk linksvoor, koplamp kapot, bumper beschadigd"</li>
                <li>"Kras langs gehele rechterzijde"</li>
                <li>"Achterklep ingedeukt, achterlicht gebroken"</li>
                <li><strong>Let op:</strong> Ook kleine krassen en deuken noteren! Inwendige schade komt pas bij expertise naar voren.</li>
              </ul>
            </div>

            <h3>🚗 Sectie 12-13: Omstandigheden van het Ongeval (CRUCIAAL!)</h3>

            <Card className="my-6 bg-yellow-50 border-yellow-300 border-2">
              <CardContent className="p-6">
                <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                  <AlertTriangle className="h-6 w-6 text-yellow-600" />
                  Dit is het BELANGRIJKSTE deel!
                </h4>
                <p className="text-sm mb-3">
                  Veld 12 en 13 bepalen grotendeels <strong>wie aansprakelijk is</strong>. Lees elke optie zorgvuldig en kruis <strong>alleen</strong> aan wat echt van toepassing is.
                </p>
              </CardContent>
            </Card>

            <div className="bg-blue-50 p-6 rounded-lg my-6">
              <h4 className="font-bold mb-3">Veld 12: Omstandigheden</h4>
              <p className="text-sm mb-3">Kruis alle situaties aan die op <strong>uw voertuig</strong> van toepassing waren:</p>
              
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-semibold mb-2">Veelvoorkomende opties:</p>
                  <ul className="space-y-1">
                    <li>1. Stond stil</li>
                    <li>2. Stond geparkeerd</li>
                    <li>3. Wilde uitvoegen</li>
                    <li>4. Voegde uit</li>
                    <li>5. Voegde in</li>
                    <li>6. Verliet parkeerplaats</li>
                    <li>7. Ging parkeerplaats op</li>
                    <li>8. Reed uit uitrit</li>
                    <li>9. Wilde afslaan</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold mb-2">Meer opties:</p>
                  <ul className="space-y-1">
                    <li>10. Sloeg af</li>
                    <li>11. Achteruitrijdend</li>
                    <li>12. Inhalen</li>
                    <li>13. Van rijstrook veranderen</li>
                    <li>14. Had voorrang</li>
                    <li>15. Kwam van rechts</li>
                    <li>16. Negeerde stopbord/rood licht</li>
                    <li>17. Botste achterkant andere auto</li>
                  </ul>
                </div>
              </div>

              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded">
                <p className="text-sm font-semibold text-red-900">⚠️ Veelgemaakte fouten:</p>
                <ul className="text-xs text-red-800 mt-2 space-y-1">
                  <li>• Kruis NIET meer aan dan waar - dit verzwakt uw positie</li>
                  <li>• Bij twijfel: kruis NIET aan</li>
                  <li>• "Had voorrang" (14) is cruciaal als u voorrang had!</li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg my-6">
              <h4 className="font-bold mb-3">Veld 13: Schets van Ongeval</h4>
              <p className="text-sm mb-3">Teken een <strong>eenvoudige, duidelijke schets</strong>:</p>
              
              <ul className="space-y-2 text-sm">
                <li><FontAwesomeIcon icon={faCircleCheck} className="inline h-4 w-4 text-green-600 mr-2" />Teken de weg(en) met straatnamen</li>
                <li><FontAwesomeIcon icon={faCircleCheck} className="inline h-4 w-4 text-green-600 mr-2" />Geef rijrichting aan met pijlen</li>
                <li><FontAwesomeIcon icon={faCircleCheck} className="inline h-4 w-4 text-green-600 mr-2" />Teken beide auto's op het moment van botsing</li>
                <li><FontAwesomeIcon icon={faCircleCheck} className="inline h-4 w-4 text-green-600 mr-2" />Markeer verkeersborden (voorrang, stoplicht, etc.)</li>
                <li><FontAwesomeIcon icon={faCircleCheck} className="inline h-4 w-4 text-green-600 mr-2" />Gebruik A en B voor de voertuigen</li>
              </ul>

              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded">
                <p className="text-sm font-semibold text-green-900">✅ Tips voor een goede schets:</p>
                <ul className="text-xs text-green-800 mt-2 space-y-1">
                  <li>• Houd het simpel - geen kunstwerk nodig</li>
                  <li>• Laat zien WIE waar vandaan kwam</li>
                  <li>• Noteer belangrijke details (bijv. "A had groen licht")</li>
                  <li>• Bij rotonde: teken de cirkel en geef richting aan</li>
                </ul>
              </div>
            </div>

            <h3>📋 Sectie 14: Opmerkingen</h3>
            <div className="bg-blue-50 p-6 rounded-lg my-6">
              <p className="text-sm mb-3">Hier kunt u <strong>extra context</strong> toevoegen:</p>
              <ul className="space-y-2 text-sm">
                <li>"Tegenpartij keek op telefoon"</li>
                <li>"Ik had voorrang (bord aanwezig)"</li>
                <li>"Weersomstandigheden: regen, slecht zicht"</li>
                <li>"Andere bestuurder gaf schuld toe ter plaatse"</li>
              </ul>
              <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded">
                <p className="text-xs text-yellow-800">
                  <strong>Let op:</strong> Geef geen schuld toe! Schrijf alleen <strong>feiten</strong>, geen meningen of excuses.
                </p>
              </div>
            </div>

            <h3>✍️ Sectie 15: Handtekeningen</h3>
            <Card className="my-6 bg-green-50 border-green-300">
              <CardContent className="p-6">
                <h4 className="font-bold mb-3">Beide partijen tekenen!</h4>
                <ul className="space-y-2 text-sm">
                  <li><FontAwesomeIcon icon={faCircleCheck} className="inline h-4 w-4 text-green-600 mr-2" />U tekent op uw kant (A of B)</li>
                  <li><FontAwesomeIcon icon={faCircleCheck} className="inline h-4 w-4 text-green-600 mr-2" />Tegenpartij tekent op hun kant</li>
                  <li><FontAwesomeIcon icon={faCircleCheck} className="inline h-4 w-4 text-green-600 mr-2" />Beide handtekeningen zijn zichtbaar op beide exemplaren (doordruk)</li>
                </ul>
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded">
                  <p className="text-sm font-semibold text-red-900">⚠️ Belangrijk!</p>
                  <p className="text-xs text-red-800 mt-1">
                    <strong>Door te tekenen bevestigt u ALLEEN dat de gegevens kloppen, NIET dat u schuld erkent!</strong> 
                    Teken dus gerust, ook al bent u het oneens over schuld.
                  </p>
                </div>
              </CardContent>
            </Card>

            <h2>Veelgemaakte Fouten (en hoe te voorkomen)</h2>

            <div className="space-y-4 my-6">
              <Card className="border-l-4 border-l-red-500">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-red-900 mb-2">❌ Fout 1: Te veel vakjes aanvinken bij veld 12</h4>
                  <p className="text-sm text-muted-foreground">
                    <strong>Oplossing:</strong> Vink alleen aan wat echt gebeurde. Bij twijfel: niet aanvinken.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-red-500">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-red-900 mb-2">❌ Fout 2: Verkeerd kenteken noteren</h4>
                  <p className="text-sm text-muted-foreground">
                    <strong>Oplossing:</strong> Maak altijd een foto van het kenteken én de verzekeringspas van de tegenpartij.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-red-500">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-red-900 mb-2">❌ Fout 3: Schuld toegeven in opmerkingen</h4>
                  <p className="text-sm text-muted-foreground">
                    <strong>Oplossing:</strong> Schrijf alleen feiten. "Ik zag het niet" of "Sorry" is een schuldbekentenis!
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-red-500">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-red-900 mb-2">❌ Fout 4: Onduidelijke schets</h4>
                  <p className="text-sm text-muted-foreground">
                    <strong>Oplossing:</strong> Teken simpel maar duidelijk. Laat zien WIE waar vandaan kwam en WAT er gebeurde.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-red-500">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-red-900 mb-2">❌ Fout 5: Niet alle schade noteren</h4>
                  <p className="text-sm text-muted-foreground">
                    <strong>Oplossing:</strong> Noteer ook kleine krassen. Verborgen schade komt pas bij expertise naar voren.
                  </p>
                </CardContent>
              </Card>
            </div>

            <h2>Na het Invullen: Volgende Stappen</h2>
            
            <div className="space-y-4 my-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">1</div>
                <div>
                  <h4 className="font-semibold mb-1">Maak Foto's van het Formulier</h4>
                  <p className="text-sm text-muted-foreground">
                    Fotografeer beide zijden van het ingevulde formulier, plus de handtekeningen. Dit is uw back-up.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">2</div>
                <div>
                  <h4 className="font-semibold mb-1">Maak Foto's van de Schade</h4>
                  <p className="text-sm text-muted-foreground">
                    Fotografeer alle schade aan beide voertuigen, plus de omgeving (verkeersborden, wegmarkeringen, etc.)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">3</div>
                <div>
                  <h4 className="font-semibold mb-1">Scheidt de Exemplaren</h4>
                  <p className="text-sm text-muted-foreground">
                    Haal voorzichtig de doordrukexemplaren uit elkaar. U houdt één exemplaar, tegenpartij krijgt het andere.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">4</div>
                <div>
                  <h4 className="font-semibold mb-1">Upload naar 112autoschade.nl</h4>
                  <p className="text-sm text-muted-foreground">
                    Upload het formulier bij ons. Wij lezen het automatisch in via OCR en starten direct met uw claim!
                  </p>
                </div>
              </div>
            </div>

            <h2>Wat als de Tegenpartij Weigert te Tekenen?</h2>
            <p>Dit komt soms voor. In dat geval:</p>
            <ol>
              <li><strong>Bel de politie</strong> - Zij kunnen een proces-verbaal opmaken</li>
              <li><strong>Vul uw kant in</strong> - Ook zonder handtekening tegenpartij heeft het formulier waarde</li>
              <li><strong>Verzamel bewijs</strong> - Foto's, getuigen, dashcam beelden</li>
              <li><strong>Noteer kenteken</strong> - Dit is essentieel om de verzekeraar te vinden</li>
            </ol>

            <h2>Europees Schadeformulier bij Buitenlandse Ongevallen</h2>
            <p>
              Het Europees Schadeformulier werkt in <strong>alle EU-landen</strong> (plus Zwitserland, Noorwegen, IJsland). 
              Het formulier is meertalig - elke bestuurder kan het in zijn eigen taal invullen. De veldnummers zijn overal hetzelfde.
            </p>
            <Card className="my-6 bg-blue-50">
              <CardContent className="p-4">
                <p className="text-sm">
                  <strong>💡 Tip:</strong> Bij een ongeval in het buitenland kunt u alsnog de schade verhalen via ons. 
                  Het proces is hetzelfde, alleen duurt het vaak iets langer (6-10 weken in plaats van 4-8 weken).
                </p>
              </CardContent>
            </Card>

            <h2>Conclusie</h2>
            <p>
              Het correct invullen van het Europees Schadeformulier is cruciaal voor een succesvolle autoschade claim. 
              Neem de tijd, controleer alle gegevens, en teken geen schuld toe. Met een goed ingevuld formulier is de kans 
              op volledige schadevergoeding maximaal.
            </p>

            {/* Final CTA */}
            <Card className="my-8 border-2 border-primary bg-gradient-to-br from-primary/5 to-white">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">
                  Formulier Ingevuld? Start Nu Uw Claim!
                </h3>
                <p className="text-muted-foreground mb-6">
                  Upload uw Europees Schadeformulier en wij lezen het automatisch in. 
                  Binnen 24 uur start uw autoschadespecialist met uw claim.
                </p>
                <Link href="/claim-indienen">
                  <Button size="lg" className="text-lg px-8">
                    <Upload className="mr-2 h-5 w-5" />
                    Upload Schadeformulier Nu
                  </Button>
                </Link>
                <p className="text-sm text-muted-foreground mt-4">
                  Snelle expertise • Geen kosten
                </p>
              </CardContent>
            </Card>

            {/* Related Articles */}
            <div className="mt-12 pt-8 border-t">
              <h3 className="text-xl font-bold mb-4">📚 Gerelateerde Artikelen</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <Link href="/blog/hoe-verhaal-ik-autoschade" className="block p-4 border rounded-lg hover:border-primary hover:shadow-md transition-all">
                  <h4 className="font-semibold mb-2">Hoe verhaal ik autoschade op de tegenpartij?</h4>
                  <p className="text-sm text-muted-foreground">Complete gids voor het schade verhalen proces</p>
                </Link>
                
                <Link href="/veelgestelde-vragen" className="block p-4 border rounded-lg hover:border-primary hover:shadow-md transition-all">
                  <h4 className="font-semibold mb-2">Veelgestelde Vragen</h4>
                  <p className="text-sm text-muted-foreground">Alle antwoorden op uw vragen over autoschade verhalen</p>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
