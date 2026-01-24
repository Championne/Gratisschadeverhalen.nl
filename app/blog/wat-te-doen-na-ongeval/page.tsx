import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { ChecklistDownload } from "@/components/checklist-download"
import { ArrowLeft, AlertTriangle, Upload, Phone, Camera, FileText } from "lucide-react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons"

export const metadata: Metadata = {
  title: "Wat Te Doen Na Een Auto-Ongeval? Complete Checklist 2025",
  description: "Stap voor stap uitleg wat u direct na een verkeersongeval moet doen. Juridische tips, praktische acties en veelgemaakte fouten voorkomen.",
  keywords: [
    "wat te doen na ongeval",
    "auto-ongeval stappenplan",
    "na aanrijding checklist",
    "verkeersongeval procedure",
    "na botsing wat doen",
    "ongeval protocol",
    "autoschade na ongeval"
  ],
}

// HowTo Schema
const howtoSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Wat te doen na een auto-ongeval",
  "description": "Stap voor stap acties die u direct na een verkeersongeval moet nemen voor optimale schadeafhandeling",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Controleer op gewonden en schakel hulpdiensten in indien nodig",
      "text": "Controleer direct of er gewonden zijn. Bij twijfel: bel 112. Veiligheid gaat voor alles."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Beveilig de plaats van het ongeval",
      "text": "Zet waarschuwingsdriehoek, schakel alarmlichten in, eventueel verkeersregelaars inzetten."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Vul Europees Schadeformulier in met tegenpartij",
      "text": "Vul ter plaatse samen het Europees Schadeformulier in. Teken geen schuld toe!"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Maak foto's van alle schade en de situatie",
      "text": "Fotografeer beide voertuigen, schade, kentekens, omgeving, verkeersborden."
    },
    {
      "@type": "HowToStep",
      "position": 5,
      "name": "Verzamel getuigengegevens",
      "text": "Noteer naam, adres en telefoonnummer van getuigen."
    },
    {
      "@type": "HowToStep",
      "position": 6,
      "name": "Start claim via Autoschadebureau.nl",
      "text": "Upload schadeformulier en foto's. Wij regelen het verhaal op de tegenpartij gratis voor u."
    }
  ]
}

export default function WatTeDoennaNaOngevalblogPost() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howtoSchema) }}
      />

      <div className="min-h-screen bg-white">
        <main className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Breadcrumbs */}
          <Breadcrumbs items={[
            { label: "Blog", href: "/blog" },
            { label: "Wat Te Doen Na Ongeval" }
          ]} />

          <Link href="/blog" className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
            <ArrowLeft className="h-4 w-4" />
            Terug naar Knowledge Base
          </Link>

          <div className="mb-8">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full font-medium">Praktisch</span>
              <span>•</span>
              <span>10 min leestijd</span>
              <span>•</span>
              <span>24 januari 2025</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Wat Te Doen Na Een Auto-Ongeval? Complete Checklist 2025
            </h1>
            
            <p className="text-xl text-muted-foreground">
              Een ongeval is stressvol. Deze complete checklist helpt u stap voor stap door het proces, 
              zodat u niets vergeet en uw kansen op volledige schadevergoeding maximaliseert.
            </p>
          </div>

          <Card className="border-2 border-red-200 bg-red-50 mb-8">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <AlertTriangle className="h-8 w-8 text-red-600 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg mb-2 text-red-900">🚨 EERSTE PRIORITEIT: VEILIGHEID</h3>
                  <p className="text-sm text-red-800">
                    Gewonden? Bel direct <strong>112</strong>. Bij twijfel over letsel: altijd bellen. 
                    Veiligheid gaat boven schadeafhandeling!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="prose prose-lg max-w-none">
            <h2>🚗 Direct Na De Botsing (Eerste 5 Minuten)</h2>

            <div className="bg-blue-50 p-6 rounded-lg my-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">1</span>
                Stop en Blijf Ter Plaatse
              </h3>
              <p className="text-sm mb-3">
                <strong>Juridische verplichting:</strong> U MOET stoppen na een ongeval, ook bij kleine schade. 
                Doorrijden is een misdrijf (vluchtmisdrijf) en kan leiden tot:
              </p>
              <ul className="text-sm space-y-1 ml-6">
                <li>• Boete tot €8.700</li>
                <li>• 2 jaar rijontzegging</li>
                <li>• Gevangenisstraf bij ernstig letsel</li>
                <li>• Uw verzekering dekt de schade NIET</li>
              </ul>
              <Card className="mt-4 bg-green-50 border-green-200">
                <CardContent className="p-3">
                  <p className="text-xs text-green-900">
                    <strong>✅ Wat wel:</strong> Parkeer veilig (indien mogelijk) en zet alarmlichten aan.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg my-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">2</span>
                Controleer Op Gewonden
              </h3>
              <p className="text-sm mb-3">Check direct of iemand gewond is:</p>
              <ul className="text-sm space-y-2 ml-6">
                <li><FontAwesomeIcon icon={faCircleCheck} className="inline h-4 w-4 text-green-600 mr-2" /><strong>Uzelf:</strong> Voelt u pijn? Zelfs lichte hoofdpijn kan whiplash zijn</li>
                <li><FontAwesomeIcon icon={faCircleCheck} className="inline h-4 w-4 text-green-600 mr-2" /><strong>Passagiers:</strong> Vraag actief "Voel je je goed?"</li>
                <li><FontAwesomeIcon icon={faCircleCheck} className="inline h-4 w-4 text-green-600 mr-2" /><strong>Tegenpartij:</strong> Check ook of zij gewond zijn</li>
              </ul>
              <Card className="mt-4 bg-red-50 border-red-200">
                <CardContent className="p-3">
                  <p className="text-xs text-red-900">
                    <strong>⚠️ Bij twijfel:</strong> Bel 112. Sommige letsels zijn niet direct zichtbaar (whiplash, inwendige bloeding).
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg my-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">3</span>
                Beveilig De Plaats Van Het Ongeval
              </h3>
              <p className="text-sm mb-3">Voorkom vervolgongevallen:</p>
              <ul className="text-sm space-y-2 ml-6">
                <li><FontAwesomeIcon icon={faCircleCheck} className="inline h-4 w-4 text-green-600 mr-2" /><strong>Alarmlichten:</strong> Beide auto's alarmlichten aan</li>
                <li><FontAwesomeIcon icon={faCircleCheck} className="inline h-4 w-4 text-green-600 mr-2" /><strong>Waarschuwingsdriehoek:</strong> Plaats 30-50 meter voor het ongeval (op snelweg: 100 meter)</li>
                <li><FontAwesomeIcon icon={faCircleCheck} className="inline h-4 w-4 text-green-600 mr-2" /><strong>Hesje:</strong> Trek fluohesje aan voordat u uitstapt (verplicht in auto!)</li>
                <li><FontAwesomeIcon icon={faCircleCheck} className="inline h-4 w-4 text-green-600 mr-2" /><strong>Veilige plaats:</strong> Ga achter de vangrail staan op snelwegen</li>
              </ul>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg my-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">4</span>
                Bel 112 (Indien Nodig)
              </h3>
              <p className="text-sm mb-3"><strong>Bel direct 112 bij:</strong></p>
              <ul className="text-sm space-y-1 ml-6">
                <li>• Gewonden of letsel (ook bij twijfel)</li>
                <li>• Ernstige schade (auto's total loss)</li>
                <li>• Verkeersopstopping op snelweg</li>
                <li>• Tegenpartij is agressief of dronken</li>
                <li>• Tegenpartij rijdt door (vluchtmisdrijf)</li>
                <li>• Olie/brandstof op de weg</li>
              </ul>
              <Card className="mt-4 bg-blue-50 border-blue-200">
                <CardContent className="p-3">
                  <p className="text-xs text-blue-900">
                    <strong>💡 Wat vertelt u aan 112?</strong> Locatie, aantal gewonden, ernst van ongeval, verkeerssituatie.
                  </p>
                </CardContent>
              </Card>
            </div>

            <h2>📋 Gegevens Uitwisselen (Minuut 5-15)</h2>

            <div className="bg-purple-50 p-6 rounded-lg my-6 border-2 border-purple-300">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">5</span>
                Vul Europees Schadeformulier In
              </h3>
              <p className="text-sm mb-3">
                <strong>Dit is het BELANGRIJKSTE document!</strong> Het Europees Schadeformulier bepaalt grotendeels wie aansprakelijk is.
              </p>
              <ul className="text-sm space-y-2 ml-6 mb-4">
                <li><FontAwesomeIcon icon={faCircleCheck} className="inline h-4 w-4 text-green-600 mr-2" />Vul het ter plaatse in, SAMEN met de tegenpartij</li>
                <li><FontAwesomeIcon icon={faCircleCheck} className="inline h-4 w-4 text-green-600 mr-2" />Neem de tijd - haast leidt tot fouten</li>
                <li><FontAwesomeIcon icon={faCircleCheck} className="inline h-4 w-4 text-green-600 mr-2" />Teken geen schuld toe ("sorry", "mijn fout")</li>
                <li><FontAwesomeIcon icon={faCircleCheck} className="inline h-4 w-4 text-green-600 mr-2" />Controleer alle gegevens VOORDAT u tekent</li>
              </ul>
              <Link href="/blog/europees-schadeformulier-invullen">
                <Button variant="outline" size="sm" className="w-full">
                  <FileText className="mr-2 h-4 w-4" />
                  Lees: Europees Schadeformulier Invullen (Complete Gids)
                </Button>
              </Link>
            </div>

            <div className="bg-green-50 p-6 rounded-lg my-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">6</span>
                Noteer ALLE Gegevens Van De Tegenpartij
              </h3>
              <p className="text-sm mb-3">Verzamel deze informatie (ook al staat het op het formulier):</p>
              
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="bg-white p-3 rounded border">
                  <p className="font-semibold mb-2">🚗 Voertuig:</p>
                  <ul className="space-y-1 text-xs">
                    <li>• Kenteken (CONTROLEER 2x!)</li>
                    <li>• Merk & model</li>
                    <li>• Kleur</li>
                  </ul>
                </div>

                <div className="bg-white p-3 rounded border">
                  <p className="font-semibold mb-2">👤 Bestuurder:</p>
                  <ul className="space-y-1 text-xs">
                    <li>• Naam + geboortedatum</li>
                    <li>• Adres</li>
                    <li>• Telefoonnummer</li>
                    <li>• Rijbewijsnummer</li>
                  </ul>
                </div>

                <div className="bg-white p-3 rounded border">
                  <p className="font-semibold mb-2">🛡️ Verzekering:</p>
                  <ul className="space-y-1 text-xs">
                    <li>• Naam verzekeraar</li>
                    <li>• Polisnummer</li>
                    <li>• Foto van verzekeringspas!</li>
                  </ul>
                </div>

                <div className="bg-white p-3 rounded border">
                  <p className="font-semibold mb-2">👥 Extra:</p>
                  <ul className="space-y-1 text-xs">
                    <li>• Naam passagiers</li>
                    <li>• Getuigen (naam + tel)</li>
                    <li>• Kenteken eventuele 3e auto</li>
                  </ul>
                </div>
              </div>

              <Card className="mt-4 bg-yellow-50 border-yellow-300">
                <CardContent className="p-3">
                  <p className="text-xs text-yellow-900">
                    <strong>💡 PRO TIP:</strong> Maak foto's van het rijbewijs en verzekeringspas van de tegenpartij 
                    met uw telefoon. Dit voorkomt typefouten!
                  </p>
                </CardContent>
              </Card>
            </div>

            <h2>📸 Bewijs Vastleggen (Minuut 15-25)</h2>

            <div className="bg-orange-50 p-6 rounded-lg my-6 border-2 border-orange-300">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="bg-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">7</span>
                <Camera className="h-6 w-6 text-orange-600" />
                Maak Uitgebreide Foto's
              </h3>
              <p className="text-sm mb-4">
                <strong>Foto's zijn cruciaal bewijs!</strong> Maak minstens 20-30 foto's vanuit verschillende hoeken:
              </p>

              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-sm mb-2">📷 Overzichtsfoto's (4-6 stuks):</p>
                  <ul className="text-xs space-y-1 ml-6">
                    <li>• Beide auto's samen in beeld, van verschillende kanten</li>
                    <li>• De hele situatie: weg, rijstroken, omgeving</li>
                    <li>• Positie van beide auto's na botsing</li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold text-sm mb-2">🚗 Schade aan uw auto (8-10 stuks):</p>
                  <ul className="text-xs space-y-1 ml-6">
                    <li>• Elke deuk, kras, beschadiging close-up</li>
                    <li>• Van meerdere hoeken per schade</li>
                    <li>• Ook kleine krassen tellen!</li>
                    <li>• Binnenkant (airbag, dashboard) bij ernstige botsing</li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold text-sm mb-2">🚙 Schade aan auto tegenpartij (4-6 stuks):</p>
                  <ul className="text-xs space-y-1 ml-6">
                    <li>• Ook hun schade fotograferen</li>
                    <li>• Toont het schokpunt/botshoek</li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold text-sm mb-2">🚦 Omgeving & Context (6-8 stuks):</p>
                  <ul className="text-xs space-y-1 ml-6">
                    <li>• Verkeersborden (voorrang, stoplichten, snelheidslimiet)</li>
                    <li>• Wegmarkeringen (haaientanden, zebrapad, onderbroken lijn)</li>
                    <li>• Remsporen op de weg (indien aanwezig)</li>
                    <li>• Afstand tussen auto's</li>
                    <li>• Weer/weersomstandigheden (nat wegdek, zon in gezicht)</li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold text-sm mb-2">🔢 Kentekens & Documenten (2-3 stuks):</p>
                  <ul className="text-xs space-y-1 ml-6">
                    <li>• Kenteken van beide auto's (leesbaar!)</li>
                    <li>• Verzekeringspas tegenpartij</li>
                    <li>• Rijbewijs tegenpartij (met toestemming)</li>
                  </ul>
                </div>
              </div>

              <Card className="mt-4 bg-red-50 border-red-200">
                <CardContent className="p-3">
                  <p className="text-xs text-red-900">
                    <strong>⚠️ Privacy:</strong> Vraag toestemming voor foto's van personen. Kentekens en schade mag altijd.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg my-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">8</span>
                Verzamel Getuigenverklaringen
              </h3>
              <p className="text-sm mb-3">Zijn er getuigen? Hun verklaring kan doorslaggevend zijn!</p>
              <ul className="text-sm space-y-2 ml-6">
                <li><FontAwesomeIcon icon={faCircleCheck} className="inline h-4 w-4 text-green-600 mr-2" />Vraag naam, adres, telefoonnummer</li>
                <li><FontAwesomeIcon icon={faCircleCheck} className="inline h-4 w-4 text-green-600 mr-2" />Laat hen kort opschrijven wat ze zagen</li>
                <li><FontAwesomeIcon icon={faCircleCheck} className="inline h-4 w-4 text-green-600 mr-2" />Vraag of ze willen verklaren bij verzekeraar (niet verplicht)</li>
                <li><FontAwesomeIcon icon={faCircleCheck} className="inline h-4 w-4 text-green-600 mr-2" />Ook passagiers zijn getuigen (wel minder objectief)</li>
              </ul>
            </div>

            <h2>🚫 VEELGEMAAKTE FOUTEN (Voorkom Deze!)</h2>

            <div className="space-y-4 my-8">
              <Card className="border-l-4 border-l-red-500 bg-red-50">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-red-900 mb-2">❌ Fout 1: Schuld Toegeven</h4>
                  <p className="text-sm mb-2">
                    Zeg NOOIT: "Sorry, het was mijn fout" of "Ik zag u niet". Dit is een juridische schuldbekentenis!
                  </p>
                  <p className="text-xs text-green-700"><strong>✅ Wel zeggen:</strong> "Gaat het met u? Laten we het formulier invullen."</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-red-500 bg-red-50">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-red-900 mb-2">❌ Fout 2: Wegrijden Voordat Formulier Ingevuld Is</h4>
                  <p className="text-sm mb-2">
                    Zonder ingevuld formulier heeft u nauwelijks bewijs. Neem de tijd!
                  </p>
                  <p className="text-xs text-green-700"><strong>✅ Wel doen:</strong> Blijf kalm, vul alles rustig in, controleer gegevens.</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-red-500 bg-red-50">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-red-900 mb-2">❌ Fout 3: Geen Foto's Maken</h4>
                  <p className="text-sm mb-2">
                    "Ik vertrouw de tegenpartij wel" - FOUT! Verzekeraars kunnen later alles ontkennen.
                  </p>
                  <p className="text-xs text-green-700"><strong>✅ Wel doen:</strong> Altijd foto's maken, ook bij kleine schade.</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-red-500 bg-red-50">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-red-900 mb-2">❌ Fout 4: Direct Eigen Verzekeraar Bellen</h4>
                  <p className="text-sm mb-2">
                    Als u niet schuld heeft: bel NIET uw eigen verzekeraar! Dit kan uw premie verhogen.
                  </p>
                  <p className="text-xs text-green-700"><strong>✅ Wel doen:</strong> Laat ons de schade verhalen op de tegenpartij (gratis!).</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-red-500 bg-red-50">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-red-900 mb-2">❌ Fout 5: Ruzie Maken Met Tegenpartij</h4>
                  <p className="text-sm mb-2">
                    Emoties lopen hoog. Blijf kalm! Ruzie bemoeilijkt schadeafhandeling enorm.
                  </p>
                  <p className="text-xs text-green-700"><strong>✅ Wel doen:</strong> Blijf vriendelijk en zakelijk. Laat discussie over schuld aan verzekeraars.</p>
                </CardContent>
              </Card>
            </div>

            <h2>📋 Na Verlaten Plaats Ongeval (Eerste 24 Uur)</h2>

            <div className="bg-gray-50 p-6 rounded-lg my-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="bg-gray-700 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">9</span>
                Start Uw Claim Bij Autoschadebureau.nl
              </h3>
              <p className="text-sm mb-4">
                <strong>Waarom zo snel?</strong> Hoe sneller u start, hoe beter. Bewijs kan vervagen en verzekeraar moet binnen redelijke termijn geïnformeerd worden.
              </p>
              <ul className="text-sm space-y-2 ml-6 mb-4">
                <li><FontAwesomeIcon icon={faCircleCheck} className="inline h-4 w-4 text-green-600 mr-2" />Upload foto/scan van Europees Schadeformulier</li>
                <li><FontAwesomeIcon icon={faCircleCheck} className="inline h-4 w-4 text-green-600 mr-2" />Upload alle foto's van de schade</li>
                <li><FontAwesomeIcon icon={faCircleCheck} className="inline h-4 w-4 text-green-600 mr-2" />Wij lezen formulier automatisch in via OCR</li>
                <li><FontAwesomeIcon icon={faCircleCheck} className="inline h-4 w-4 text-green-600 mr-2" />Binnen 24 uur start uw schadespecialist</li>
              </ul>
              <Link href="/claim-indienen">
                <Button className="w-full" size="lg">
                  <Upload className="mr-2 h-5 w-5" />
                  Start Nu Uw Gratis Claim
                </Button>
              </Link>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg my-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="bg-gray-700 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">10</span>
                Check Op Letselschade (Eerste 48 Uur)
              </h3>
              <p className="text-sm mb-3">Lichamelijke klachten zijn niet altijd direct zichtbaar:</p>
              <ul className="text-sm space-y-2 ml-6">
                <li><AlertTriangle className="inline h-4 w-4 text-yellow-600 mr-2" />Hoofdpijn, nekpijn, rugpijn → mogelijk whiplash</li>
                <li><AlertTriangle className="inline h-4 w-4 text-yellow-600 mr-2" />Duizeligheid, misselijkheid → hersenschudding?</li>
                <li><AlertTriangle className="inline h-4 w-4 text-yellow-600 mr-2" />Pijn die toeneemt → ga naar huisarts</li>
              </ul>
              <Card className="mt-4 bg-purple-50 border-purple-200">
                <CardContent className="p-3">
                  <p className="text-xs text-purple-900">
                    <strong>💡 Letselschade?</strong> Wij detecteren automatisch indicaties en verwijzen u door naar 
                    onze gespecialiseerde partner <strong>Unitas Letselschade</strong>.
                  </p>
                </CardContent>
              </Card>
            </div>

            <h2>🚦 Speciale Situaties</h2>

            <div className="space-y-4 my-6">
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2">🚗 Wat als tegenpartij doorrijdt?</h4>
                  <ol className="text-sm space-y-1 ml-6">
                    <li>1. Noteer kenteken + rijrichting</li>
                    <li>2. Bel direct 112 (vluchtmisdrijf!)</li>
                    <li>3. Zoek getuigen</li>
                    <li>4. Maak foto's van uw schade</li>
                    <li>5. Doe aangifte bij politie</li>
                  </ol>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2">📱 Wat als tegenpartij weigert te tekenen?</h4>
                  <ol className="text-sm space-y-1 ml-6">
                    <li>1. Blijf kalm en vriendelijk</li>
                    <li>2. Bel politie voor proces-verbaal</li>
                    <li>3. Vul uw kant van formulier wel in</li>
                    <li>4. Verzamel extra bewijs (foto's, getuigen)</li>
                    <li>5. Noteer kenteken tegenpartij</li>
                  </ol>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2">🍺 Wat als tegenpartij dronken is?</h4>
                  <ol className="text-sm space-y-1 ml-6">
                    <li>1. Bel direct 112 (dronken rijden is misdrijf)</li>
                    <li>2. Ga discussie NIET aan</li>
                    <li>3. Wacht op politie</li>
                    <li>4. Noteer gedrag in opmerkingen formulier</li>
                  </ol>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2">🚙 Wat bij schade aan geparkeerde auto (zonder eigenaar)?</h4>
                  <ol className="text-sm space-y-1 ml-6">
                    <li>1. Laat briefje achter met uw gegevens</li>
                    <li>2. Maak foto's van schade + kenteken</li>
                    <li>3. Zoek eigenaar in buurt</li>
                    <li>4. Indien niet gevonden: doe melding bij politie</li>
                  </ol>
                </CardContent>
              </Card>
            </div>

            <h2>📞 Belangrijke Telefoonnummers (Bewaar Deze!)</h2>

            <div className="grid md:grid-cols-2 gap-4 my-6">
              <Card className="bg-red-50">
                <CardContent className="p-4">
                  <p className="font-bold text-lg mb-1">🚨 112</p>
                  <p className="text-sm text-muted-foreground">Ambulance, politie, brandweer (bij gewonden/ernstig ongeval)</p>
                </CardContent>
              </Card>

              <Card className="bg-yellow-50">
                <CardContent className="p-4">
                  <p className="font-bold text-lg mb-1">🚙 ANWB Wegenwacht</p>
                  <p className="text-sm text-muted-foreground">088 - 269 28 88 (Bij pech/auto niet rijdbaar)</p>
                </CardContent>
              </Card>

              <Card className="bg-blue-50">
                <CardContent className="p-4">
                  <p className="font-bold text-lg mb-1">📞 Autoschadebureau.nl</p>
                  <p className="text-sm text-muted-foreground">085 060 7905 (Gratis schade verhalen)</p>
                </CardContent>
              </Card>

              <Card className="bg-green-50">
                <CardContent className="p-4">
                  <p className="font-bold text-lg mb-1">🏥 Huisartsenpost</p>
                  <p className="text-sm text-muted-foreground">Via 0900 - 1 GEMEENTE (bij twijfel over letsel)</p>
                </CardContent>
              </Card>
            </div>

            <h2>✅ Samenvatting: Complete Checklist</h2>

            <Card className="my-8 bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200">
              <CardContent className="p-6">
                <h3 className="font-bold text-xl mb-4">📋 Direct Na Ongeval (Print & Bewaar In Auto!)</h3>
                
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 text-xs font-bold">1</div>
                    <p><strong>Stop</strong> en blijf ter plaatse</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 text-xs font-bold">2</div>
                    <p><strong>Gewonden?</strong> Bel 112</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 text-xs font-bold">3</div>
                    <p><strong>Beveilig:</strong> Alarmlichten + driehoek + hesje</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 text-xs font-bold">4</div>
                    <p><strong>Vul formulier in</strong> met tegenpartij (geen schuld toegeven!)</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 text-xs font-bold">5</div>
                    <p><strong>Foto's:</strong> 20-30 stuks (schade + omgeving + kentekens)</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 text-xs font-bold">6</div>
                    <p><strong>Getuigen:</strong> Naam + telefoon + korte verklaring</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 text-xs font-bold">7</div>
                    <p><strong>Start claim</strong> binnen 24 uur via Autoschadebureau.nl</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="my-8 border-2 border-primary bg-gradient-to-br from-primary/5 to-white">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">
                  Ongeval Gehad? Start Nu Uw Gratis Claim!
                </h3>
                <p className="text-muted-foreground mb-6">
                  Upload uw formulier en foto's. Wij regelen het verhaal op de tegenpartij - 100% gratis voor u.
                </p>
                <Link href="/claim-indienen">
                  <Button size="lg" className="text-lg px-8">
                    <Upload className="mr-2 h-5 w-5" />
                    Upload Nu & Start Claim
                  </Button>
                </Link>
                <p className="text-sm text-muted-foreground mt-4">
                  ⚡ Binnen 24 uur eerste beoordeling • Gemiddeld binnen 6 weken afgehandeld
                </p>
              </CardContent>
            </Card>

            {/* DOWNLOADABLE CHECKLIST */}
            <div className="my-12">
              <ChecklistDownload
                title="Download: Complete Ongeval Checklist"
                description="Print deze checklist en bewaar in uw handschoenenkastje. Zo bent u voorbereid bij een ongeval."
                checklistItems={[
                  "1. Zorg voor veiligheid - Waarschuwingsdriehoek en veiligheidsvest",
                  "2. Bel 112 bij gewonden of grote materiële schade",
                  "3. Maak foto's van alle voertuigen, schade en situatie",
                  "4. Wissel gegevens uit met tegenpartij (naam, kenteken, verzekeraar)",
                  "5. Zoek getuigen en noteer contactgegevens",
                  "6. Vul Europees Schadeformulier in (NIET tekenen bij twijfel)",
                  "7. Doe GEEN schuldbekentenis ('sorry' = schuld erkennen)",
                  "8. Bel politie bij vluchtmisdrijf of alcoholvermoeden",
                  "9. Noteer exacte tijd, datum en locatie ongeval",
                  "10. Maak aantekeningen over ongevalsverloop",
                  "11. Upload alles binnen 24 uur naar Autoschadebureau.nl",
                  "12. Bewaar alle documenten en bonnetjes (sleepkosten, etc.)"
                ]}
              />
            </div>

            <div className="mt-12 pt-8 border-t">
              <h3 className="text-xl font-bold mb-4">📚 Gerelateerde Artikelen</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <Link href="/blog/europees-schadeformulier-invullen" className="block p-4 border rounded-lg hover:border-primary hover:shadow-md transition-all">
                  <h4 className="font-semibold mb-2">Europees Schadeformulier Invullen: Complete Gids</h4>
                  <p className="text-sm text-muted-foreground">Stap voor stap uitleg voor het correct invullen</p>
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
