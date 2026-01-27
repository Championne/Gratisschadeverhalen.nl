import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { ArrowLeft, Camera, Car, MapPin, FileText, Sun, Ruler, AlertTriangle, Eye, Upload, Lightbulb, Clock, HelpCircle, Info } from "lucide-react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons"

export const metadata: Metadata = {
  title: "Hoe Maakt U de Beste Foto's voor Uw Autoschade Claim? | Complete Gids",
  description: "Leer welke foto's u moet maken na een auto-ongeluk voor de snelste schadeafhandeling. 10 stappen handleiding met praktische tips voor uw autoschade claim.",
  keywords: [
    "foto's autoschade",
    "autoschade foto's maken",
    "welke foto's schadeformulier",
    "foto's na auto ongeluk",
    "autoschade verhalen foto's",
    "voertuigschade documenteren",
    "schade foto's verzekering",
    "europees schadeformulier foto's"
  ],
}

// HowTo + FAQPage Schema voor Google
const combinedSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "HowTo",
      "name": "Hoe maakt u de beste foto's voor uw autoschade claim?",
      "description": "Complete handleiding voor het maken van effectieve foto's na een auto-ongeluk. Deze foto's versnellen uw schadeclaim en verhogen de kans op volledige vergoeding.",
      "totalTime": "PT10M",
      "estimatedCost": {
        "@type": "MonetaryAmount",
        "currency": "EUR",
        "value": "0"
      },
      "supply": [
        {
          "@type": "HowToSupply",
          "name": "Smartphone met camera"
        }
      ],
      "tool": [
        {
          "@type": "HowToTool",
          "name": "Telefoon camera"
        }
      ],
      "step": [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": "Overzichtsfoto van de locatie",
          "text": "Maak een brede foto van de hele locatie inclusief de weg, kruispunt of parkeerplaats. Stap een paar meter achteruit voor het beste overzicht."
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "Beide voertuigen samen fotograferen",
          "text": "Leg de positie van beide auto's vast direct na het ongeval, voordat voertuigen worden verplaatst. Dit toont hoe de botsing is gebeurd."
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": "Close-ups van schade aan uw auto",
          "text": "Maak gedetailleerde foto's van alle schade aan uw eigen voertuig. Fotografeer elke deuk, kras en kapot onderdeel apart."
        },
        {
          "@type": "HowToStep",
          "position": 4,
          "name": "Schade aan voertuig tegenpartij",
          "text": "Documenteer ook de schade aan het voertuig van de tegenpartij als bewijs van de impact."
        },
        {
          "@type": "HowToStep",
          "position": 5,
          "name": "Kentekens fotograferen",
          "text": "Maak een scherpe foto van het kenteken van de tegenpartij. Dit is essentieel om de verzekeraar te kunnen achterhalen."
        },
        {
          "@type": "HowToStep",
          "position": 6,
          "name": "Remsporen en glasscherven vastleggen",
          "text": "Fotografeer eventuele remsporen, glasscherven of andere sporen op de weg die kunnen helpen bij reconstructie."
        },
        {
          "@type": "HowToStep",
          "position": 7,
          "name": "Verkeersborden documenteren",
          "text": "Leg relevante verkeersborden vast: voorrangsborden, stopborden, snelheidslimieten die kunnen helpen bepalen wie voorrang had."
        },
        {
          "@type": "HowToStep",
          "position": 8,
          "name": "Weersomstandigheden vastleggen",
          "text": "Maak een foto die de weersomstandigheden toont als het regenachtig, mistig of glad was."
        },
        {
          "@type": "HowToStep",
          "position": 9,
          "name": "Europees schadeformulier fotograferen",
          "text": "Maak een duidelijke foto van het ingevulde Europees schadeformulier voordat u het opstuurt."
        },
        {
          "@type": "HowToStep",
          "position": 10,
          "name": "Upload naar uw schadeclaim",
          "text": "Upload alle foto's bij uw schadeclaim via autoschadebureau.nl voor de snelste afhandeling."
        }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Hoeveel foto's moet ik maken van mijn autoschade?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Maak minimaal 5-10 foto's: overzicht van de locatie, beide voertuigen samen, close-ups van alle schade, het kenteken van de tegenpartij, en eventuele verkeersborden of remsporen. Meer foto's is beter dan te weinig."
          }
        },
        {
          "@type": "Question",
          "name": "Kan ik ook video maken in plaats van foto's?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ja, video kan nuttig zijn als aanvulling. Loop langzaam rond beide voertuigen en zoom in op de schade. Houd de video kort (30-60 seconden) en stabiel. Foto's blijven echter het belangrijkst voor uw claim."
          }
        },
        {
          "@type": "Question",
          "name": "Wat als het donker is wanneer het ongeval gebeurt?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Gebruik de flitser van uw telefoon en maak meerdere foto's. Zet uw auto koplampen aan voor extra verlichting. Als de foto's te donker zijn, probeer de volgende ochtend nog extra foto's te maken van de schade."
          }
        },
        {
          "@type": "Question",
          "name": "Moet ik foto's maken als de politie ter plaatse komt?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ja, absoluut! De politie maakt geen foto's voor uw verzekeringsclaim. Hun proces-verbaal is nuttig, maar eigen foto's zijn essentieel voor uw schadeclaim bij de verzekeraar."
          }
        },
        {
          "@type": "Question",
          "name": "Mag ik foto's maken van de tegenpartij en zijn auto?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ja, u mag foto's maken van voertuigen en kentekens op de openbare weg. Dit geldt als documentatie van het ongeval. Maak geen close-up foto's van personen zonder toestemming."
          }
        },
        {
          "@type": "Question",
          "name": "Wat als ik vergeten ben foto's te maken op de plek van het ongeval?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Maak alsnog zo snel mogelijk foto's van de schade aan uw auto. Ga eventueel terug naar de locatie voor overzichtsfoto's. Een schadeclaim zonder foto's is lastiger maar niet onmogelijk."
          }
        },
        {
          "@type": "Question",
          "name": "In welk formaat moet ik foto's uploaden?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "De meeste smartphones maken foto's in JPEG formaat, wat prima is. Zorg dat de foto's scherp en goed belicht zijn. Bewerk de foto's niet en gebruik geen filters."
          }
        }
      ]
    }
  ]
}

export default function BlogPost() {
  return (
    <div className="min-h-screen bg-white">
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(combinedSchema) }}
      />
      
      <article className="container mx-auto px-4 py-8 max-w-4xl">
        <Breadcrumbs items={[
          { label: "Blog", href: "/blog" },
          { label: "Foto's voor autoschade claim" }
        ]} />

        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8">
          <ArrowLeft className="h-4 w-4" />
          Terug naar blog
        </Link>

        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full font-medium">
              Handleiding
            </span>
            <span>•</span>
            <span>8 minuten leestijd</span>
            <span>•</span>
            <span>24 januari 2026</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Hoe Maakt U de Beste Foto's voor Uw Autoschade Claim?
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Na een auto-ongeluk is het maken van goede foto's essentieel voor een snelle en 
            succesvolle schadeclaim. In deze handleiding leggen we precies uit welke foto's 
            u nodig heeft en hoe u ze het beste maakt.
          </p>
        </header>

        {/* Quick Summary Card */}
        <Card className="bg-orange-50 border-orange-200 mb-12">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Camera className="h-6 w-6 text-orange-600 flex-shrink-0 mt-1" />
              <div>
                <h2 className="font-bold text-lg mb-2">In het kort</h2>
                <p className="text-muted-foreground mb-3">
                  Maak minimaal deze 4 foto's: <strong>1)</strong> overzicht locatie, <strong>2)</strong> beide auto's samen, 
                  <strong>3)</strong> close-ups van alle schade, <strong>4)</strong> kenteken tegenpartij. Meer foto's = snellere afhandeling.
                </p>
                <div className="flex items-center gap-2 text-sm text-orange-700">
                  <Clock className="h-4 w-4" />
                  <span>Kost maar 5 minuten, bespaart weken wachttijd</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="prose prose-lg max-w-none">
          
          {/* Waarom foto's belangrijk zijn */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Waarom zijn goede foto's zo belangrijk?</h2>
            
            <p className="text-muted-foreground leading-relaxed mb-6">
              Bij het verhalen van <Link href="/" className="text-primary hover:underline font-medium">autoschade</Link> of{" "}
              <strong>voertuigschade</strong> spelen foto's een cruciale rol. Ze vormen vaak het belangrijkste 
              bewijs voor uw claim. Zonder goede foto's kan de verzekeraar van de tegenpartij:
            </p>

            <ul className="space-y-3 text-muted-foreground mb-6">
              <li className="flex items-start gap-3">
                <span className="text-red-500 mt-1">✗</span>
                <span>De omvang van de schade betwisten</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 mt-1">✗</span>
                <span>Beweren dat de schade al bestond voor het ongeval</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 mt-1">✗</span>
                <span>De aansprakelijkheid in twijfel trekken</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 mt-1">✗</span>
                <span>Extra expertise of onderzoek eisen (wat weken duurt)</span>
              </li>
            </ul>

            <div className="bg-green-50 border-l-4 border-green-500 p-6 my-6">
              <h3 className="font-bold mb-2 text-green-900">Het goede nieuws</h3>
              <p className="text-green-800">
                Met complete foto-documentatie verloopt uw claim gemiddeld <strong>2-3 weken sneller</strong>. 
                Ons OCR-systeem kan bovendien gegevens automatisch uitlezen als u ook het{" "}
                <Link href="/blog/europees-schadeformulier-invullen" className="text-green-700 hover:underline font-medium">
                  Europees schadeformulier
                </Link> fotografeert.
              </p>
            </div>
          </section>

          {/* 10 Stappen Handleiding */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">10 Stappen: Welke Foto's Moet U Maken?</h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Volg deze handleiding direct na het ongeval. U heeft alleen uw smartphone nodig. 
              Maak liever te veel dan te weinig foto's - u kunt ze altijd nog weggooien.
            </p>

            <div className="space-y-6">
              {/* Stap 1 */}
              <div className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                  <span className="font-bold text-orange-700">1</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="h-5 w-5 text-orange-600" />
                    <h3 className="font-bold text-lg">Overzichtsfoto van de locatie</h3>
                  </div>
                  <p className="text-muted-foreground mb-2">
                    Stap een paar meter achteruit en maak een brede foto van de hele situatie. 
                    Leg de weg, het kruispunt of de parkeerplaats vast. Dit helpt later bij het 
                    bepalen van de aansprakelijkheid en toont de verkeerssituatie.
                  </p>
                  <p className="text-sm bg-orange-50 text-orange-700 px-3 py-2 rounded inline-flex items-center gap-2">
                    <Lightbulb className="h-4 w-4" />
                    Tip: Maak deze foto vanuit meerdere hoeken
                  </p>
                </div>
              </div>

              {/* Stap 2 */}
              <div className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                  <span className="font-bold text-orange-700">2</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Car className="h-5 w-5 text-orange-600" />
                    <h3 className="font-bold text-lg">Beide voertuigen samen</h3>
                  </div>
                  <p className="text-muted-foreground mb-2">
                    Fotografeer beide auto's in hun positie direct na het ongeval. Dit is misschien 
                    wel de belangrijkste foto omdat het toont hoe de botsing is gebeurd. 
                    <strong className="text-foreground"> Doe dit VOORDAT de voertuigen worden verplaatst!</strong>
                  </p>
                  <p className="text-sm bg-red-50 text-red-700 px-3 py-2 rounded inline-flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Belangrijk: Maak deze foto als allereerste
                  </p>
                </div>
              </div>

              {/* Stap 3 */}
              <div className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                  <span className="font-bold text-orange-700">3</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Camera className="h-5 w-5 text-orange-600" />
                    <h3 className="font-bold text-lg">Close-ups van schade aan uw auto</h3>
                  </div>
                  <p className="text-muted-foreground mb-2">
                    Ga dichtbij staan en maak gedetailleerde foto's van alle schade. Fotografeer elke 
                    deuk, kras, gebroken lamp of kapot onderdeel apart. Meerdere foto's per beschadiging 
                    is beter - van dichtbij én van een kleine afstand.
                  </p>
                  <p className="text-sm bg-orange-50 text-orange-700 px-3 py-2 rounded inline-flex items-center gap-2">
                    <Lightbulb className="h-4 w-4" />
                    Tip: Gebruik daglicht of de flitser voor scherpe beelden
                  </p>
                </div>
              </div>

              {/* Stap 4 */}
              <div className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                  <span className="font-bold text-orange-700">4</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Eye className="h-5 w-5 text-orange-600" />
                    <h3 className="font-bold text-lg">Schade aan het voertuig van de tegenpartij</h3>
                  </div>
                  <p className="text-muted-foreground mb-2">
                    Leg ook de schade aan de andere auto vast. Dit voorkomt later discussie over 
                    wat er precies is gebeurd en bewijst de impact. Als de tegenpartij bezwaar maakt, 
                    kunt u de foto ook vanaf de openbare weg maken.
                  </p>
                </div>
              </div>

              {/* Stap 5 */}
              <div className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                  <span className="font-bold text-orange-700">5</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="h-5 w-5 text-orange-600" />
                    <h3 className="font-bold text-lg">Kenteken van de tegenpartij</h3>
                  </div>
                  <p className="text-muted-foreground mb-2">
                    Dit is essentieel! Met het kenteken kunnen wij de verzekeraar van de tegenpartij 
                    achterhalen. Zorg dat alle letters en cijfers scherp en leesbaar zijn. Maak ook 
                    een foto van uw eigen kenteken voor de volledigheid.
                  </p>
                  <p className="text-sm bg-green-50 text-green-700 px-3 py-2 rounded inline-flex items-center gap-2">
                    <FontAwesomeIcon icon={faCircleCheck} className="h-4 w-4" />
                    Zonder kenteken is het veel lastiger om schade te verhalen
                  </p>
                </div>
              </div>

              {/* Stap 6 */}
              <div className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                  <span className="font-bold text-orange-700">6</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Ruler className="h-5 w-5 text-orange-600" />
                    <h3 className="font-bold text-lg">Remsporen, glasscherven en andere sporen</h3>
                  </div>
                  <p className="text-muted-foreground mb-2">
                    Zijn er remsporen op de weg? Glasscherven? Afgebroken onderdelen? Fotografeer alles. 
                    Dit kan helpen bij het reconstrueren van het ongeval en de snelheid bepalen. 
                    Leg een voorwerp (uw schoen bijvoorbeeld) ernaast voor schaalreferentie.
                  </p>
                </div>
              </div>

              {/* Stap 7 */}
              <div className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                  <span className="font-bold text-orange-700">7</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-5 w-5 text-orange-600" />
                    <h3 className="font-bold text-lg">Relevante verkeersborden</h3>
                  </div>
                  <p className="text-muted-foreground mb-2">
                    Maak foto's van verkeersborden in de buurt: voorrangsborden, stopborden, 
                    snelheidslimieten, verbodsborden. Let ook op wegmarkeringen (strepen, haaientanden) 
                    en verkeerslichten. Dit kan cruciaal zijn voor het bepalen wie voorrang had.
                  </p>
                </div>
              </div>

              {/* Stap 8 */}
              <div className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                  <span className="font-bold text-orange-700">8</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Sun className="h-5 w-5 text-orange-600" />
                    <h3 className="font-bold text-lg">Weersomstandigheden</h3>
                  </div>
                  <p className="text-muted-foreground mb-2">
                    Was het regenachtig, mistig, glad of slecht zicht? Maak een foto die dit toont. 
                    Bij gladheid: fotografeer ook de staat van het wegdek. Weersomstandigheden kunnen 
                    relevant zijn voor de aansprakelijkheidsvraag.
                  </p>
                </div>
              </div>

              {/* Stap 9 */}
              <div className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                  <span className="font-bold text-orange-700">9</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="h-5 w-5 text-orange-600" />
                    <h3 className="font-bold text-lg">Het Europees schadeformulier</h3>
                  </div>
                  <p className="text-muted-foreground mb-2">
                    Heeft u samen met de tegenpartij het Europees schadeformulier ingevuld? Maak een 
                    duidelijke foto voordat u het opstuurt. Ons{" "}
                    <Link href="/claim-indienen" className="text-primary hover:underline font-medium">
                      OCR-systeem
                    </Link>{" "}
                    kan de gegevens automatisch uitlezen, wat u veel typ-werk bespaart.
                  </p>
                </div>
              </div>

              {/* Stap 10 */}
              <div className="flex gap-4 p-4 bg-primary/5 rounded-lg border-2 border-primary/20">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                  <span className="font-bold text-white">10</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Upload className="h-5 w-5 text-primary" />
                    <h3 className="font-bold text-lg">Upload alles bij uw claim</h3>
                  </div>
                  <p className="text-muted-foreground mb-3">
                    Klaar met fotograferen? Upload alle foto's direct bij het{" "}
                    <Link href="/claim-indienen" className="text-primary hover:underline font-medium">
                      indienen van uw claim
                    </Link>. 
                    Wij analyseren de foto's, stellen de aansprakelijkheidsbrief op, en verhalen 
                    uw <strong>autoschade</strong> volledig gratis bij de tegenpartij.
                  </p>
                  <Link href="/claim-indienen">
                    <Button className="mt-2">
                      <Upload className="mr-2 h-4 w-4" />
                      Direct Claim Indienen
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Tips voor specifieke situaties */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Tips voor Specifieke Situaties</h2>

            <div className="grid md:grid-cols-2 gap-4">
              <Card className="border-2">
                <CardContent className="pt-6">
                  <h3 className="font-bold mb-2 flex items-center gap-2">
                    🌙 Ongeval in het donker
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Gebruik de flitser en maak meerdere foto's. Zet koplampen aan voor extra licht. 
                    Kom de volgende ochtend terug voor extra foto's van de schade bij daglicht.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardContent className="pt-6">
                  <h3 className="font-bold mb-2 flex items-center gap-2">
                    🅿️ Parkeerschade
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Fotografeer ook de parkeervakken, eventuele camera's in de buurt, en noteer 
                    de tijd. Als de dader weg is: maak een briefje met uw gegevens voor getuigen.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardContent className="pt-6">
                  <h3 className="font-bold mb-2 flex items-center gap-2">
                    🛣️ Ongeval op de snelweg
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Veiligheid eerst! Zet uw gevarendriehoek neer en ga achter de vangrail staan. 
                    Maak foto's alleen als het veilig kan. Hectometerpaaltjes zijn handig voor locatie.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardContent className="pt-6">
                  <h3 className="font-bold mb-2 flex items-center gap-2">
                    🌧️ Slecht weer
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Bescherm uw telefoon tegen regen. Bij mist of sneeuw: laat de omstandigheden 
                    duidelijk zien op de foto. De staat van het wegdek kan relevant zijn.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* FAQ Sectie */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Veelgestelde Vragen</h2>

            <div className="space-y-4">
              <details className="group bg-white border border-gray-200 rounded-lg overflow-hidden">
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none hover:bg-gray-50">
                  <span className="font-semibold pr-4">Hoeveel foto's moet ik maken?</span>
                  <HelpCircle className="h-5 w-5 text-gray-400 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-5 pb-5">
                  <p className="text-muted-foreground">
                    Maak minimaal 5-10 foto's. Dit omvat: overzicht locatie, beide voertuigen, 
                    close-ups van alle schade, kenteken tegenpartij, en relevante verkeersborden. 
                    Meer foto's is altijd beter dan te weinig - u kunt ze later altijd nog weggooien.
                  </p>
                </div>
              </details>

              <details className="group bg-white border border-gray-200 rounded-lg overflow-hidden">
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none hover:bg-gray-50">
                  <span className="font-semibold pr-4">Kan ik ook video maken?</span>
                  <HelpCircle className="h-5 w-5 text-gray-400 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-5 pb-5">
                  <p className="text-muted-foreground">
                    Ja, video kan een goede aanvulling zijn. Loop langzaam rond beide voertuigen 
                    en zoom in op de schade. Houd de video kort (30-60 seconden) en stabiel. 
                    Let op: foto's blijven het belangrijkst voor de claim.
                  </p>
                </div>
              </details>

              <details className="group bg-white border border-gray-200 rounded-lg overflow-hidden">
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none hover:bg-gray-50">
                  <span className="font-semibold pr-4">Wat als het donker is?</span>
                  <HelpCircle className="h-5 w-5 text-gray-400 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-5 pb-5">
                  <p className="text-muted-foreground">
                    Gebruik de flitser van uw telefoon en maak meerdere foto's. Zet uw auto 
                    koplampen aan voor extra verlichting. Als de foto's te donker zijn, 
                    probeer de volgende ochtend nog extra foto's te maken van de schade.
                  </p>
                </div>
              </details>

              <details className="group bg-white border border-gray-200 rounded-lg overflow-hidden">
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none hover:bg-gray-50">
                  <span className="font-semibold pr-4">Moet ik foto's maken als de politie er is?</span>
                  <HelpCircle className="h-5 w-5 text-gray-400 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-5 pb-5">
                  <p className="text-muted-foreground">
                    Ja, absoluut! De politie maakt geen foto's voor uw verzekeringsclaim. 
                    Hun proces-verbaal is nuttig, maar eigen foto's zijn essentieel voor uw 
                    schadeclaim bij de verzekeraar van de tegenpartij.
                  </p>
                </div>
              </details>

              <details className="group bg-white border border-gray-200 rounded-lg overflow-hidden">
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none hover:bg-gray-50">
                  <span className="font-semibold pr-4">Mag ik foto's maken van de tegenpartij?</span>
                  <HelpCircle className="h-5 w-5 text-gray-400 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-5 pb-5">
                  <p className="text-muted-foreground">
                    U mag foto's maken van voertuigen en kentekens op de openbare weg. Dit geldt 
                    als documentatie van het ongeval. Maak geen close-up foto's van personen 
                    zonder hun toestemming.
                  </p>
                </div>
              </details>

              <details className="group bg-white border border-gray-200 rounded-lg overflow-hidden">
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none hover:bg-gray-50">
                  <span className="font-semibold pr-4">Wat als ik vergeten ben foto's te maken?</span>
                  <HelpCircle className="h-5 w-5 text-gray-400 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-5 pb-5">
                  <p className="text-muted-foreground">
                    Maak alsnog zo snel mogelijk foto's van de schade aan uw auto. Ga eventueel 
                    terug naar de locatie voor overzichtsfoto's. Een schadeclaim zonder foto's 
                    is lastiger maar niet onmogelijk - wij helpen u graag.
                  </p>
                </div>
              </details>

              <details className="group bg-white border border-gray-200 rounded-lg overflow-hidden">
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none hover:bg-gray-50">
                  <span className="font-semibold pr-4">In welk formaat moet ik foto's uploaden?</span>
                  <HelpCircle className="h-5 w-5 text-gray-400 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-5 pb-5">
                  <p className="text-muted-foreground">
                    De meeste smartphones maken foto's in JPEG formaat, wat prima is. Zorg dat 
                    de foto's scherp en goed belicht zijn. Bewerk de foto's niet en gebruik geen 
                    filters - de verzekeraar wil de originele beelden zien.
                  </p>
                </div>
              </details>
            </div>
          </section>

          {/* Gerelateerde artikelen */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Gerelateerde artikelen</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/blog/hoe-verhaal-ik-autoschade" className="block p-4 border rounded-lg hover:border-primary transition-colors">
                <h4 className="font-bold mb-2">Hoe verhaal ik autoschade?</h4>
                <p className="text-sm text-muted-foreground">Complete gids voor het schade verhalen proces.</p>
              </Link>
              <Link href="/blog/europees-schadeformulier-invullen" className="block p-4 border rounded-lg hover:border-primary transition-colors">
                <h4 className="font-bold mb-2">Europees schadeformulier invullen</h4>
                <p className="text-sm text-muted-foreground">Veld voor veld uitleg voor foutloos invullen.</p>
              </Link>
              <Link href="/blog/wat-te-doen-na-ongeval" className="block p-4 border rounded-lg hover:border-primary transition-colors">
                <h4 className="font-bold mb-2">Wat te doen na een ongeval?</h4>
                <p className="text-sm text-muted-foreground">Checklist voor directe actie na een botsing.</p>
              </Link>
              <Link href="/blog/schade-verhalen-zonder-formulier" className="block p-4 border rounded-lg hover:border-primary transition-colors">
                <h4 className="font-bold mb-2">Schade verhalen zonder formulier</h4>
                <p className="text-sm text-muted-foreground">Het kan wél, ook zonder schadeformulier.</p>
              </Link>
            </div>
          </section>

        </div>

        {/* CTA */}
        <Card className="bg-gradient-to-r from-primary to-blue-700 text-white mt-12">
          <CardContent className="py-8 text-center">
            <Camera className="h-12 w-12 mx-auto mb-4 opacity-90" />
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Foto's gemaakt? Dien nu uw claim in!
            </h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Upload uw foto's en schadeformulier. Wij verhalen uw autoschade volledig gratis 
              bij de tegenpartij. Gemiddeld binnen 6 weken uitbetaald.
            </p>
            <Link href="/claim-indienen">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                <Upload className="mr-2 h-5 w-5" />
                Gratis Claim Indienen
              </Button>
            </Link>
            <p className="text-sm text-blue-200 mt-4">
              100% gratis • Tegenpartij betaalt alle kosten • Binnen 24 uur reactie
            </p>
          </CardContent>
        </Card>

      </article>
    </div>
  )
}
