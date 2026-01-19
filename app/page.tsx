import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Shield, Clock, Euro, FileText, Upload, ChevronRight, Star } from "lucide-react"

export const metadata: Metadata = {
  title: "Autoschade Verhalen | Gratis Voertuigschade Claimen bij Tegenpartij",
  description: "Upload uw Europees Schadeformulier en verhaal uw autoschade gratis op de tegenpartij. Automatische OCR-verwerking, 100% no cure no pay. Wij regelen uw voertuigschade van A tot Z.",
  keywords: [
    "autoschade verhalen", 
    "voertuigschade verhalen", 
    "gratis autoschade verhalen",
    "schade verhalen tegenpartij",
    "autoschade claimen",
    "voertuigschade claimen",
    "europees schadeformulier upload",
    "WA schade tegenpartij",
    "gratis schadeafhandeling"
  ],
  openGraph: {
    title: "Autoschade Verhalen | Upload Direct Uw Schadeformulier - Gratis",
    description: "Verhaal uw autoschade of voertuigschade gratis op de tegenpartij. Upload uw schadeformulier en wij regelen alles. 100% no cure no pay.",
    url: "https://gratisschadeverhalen.nl",
    type: "website",
    locale: "nl_NL",
  },
}

// JSON-LD Schema voor Google
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    // Organization
    {
      "@type": "Organization",
      "@id": "https://gratisschadeverhalen.nl/#organization",
      "name": "Gratisschadeverhalen.nl",
      "url": "https://gratisschadeverhalen.nl",
      "logo": "https://gratisschadeverhalen.nl/logo.png",
      "description": "Gratis autoschade en voertuigschade verhalen op de tegenpartij - 100% no cure no pay",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "NL"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "email": "info@gratisschadeverhalen.nl",
        "availableLanguage": "Dutch"
      }
    },
    // Service
    {
      "@type": "Service",
      "@id": "https://gratisschadeverhalen.nl/#service",
      "serviceType": "Autoschade Verhalen",
      "name": "Gratis Autoschade en Voertuigschade Verhalen",
      "description": "Professionele afhandeling van autoschade en voertuigschade claims tegen de tegenpartij. Upload uw Europees Schadeformulier en wij regelen alles gratis.",
      "provider": {
        "@id": "https://gratisschadeverhalen.nl/#organization"
      },
      "areaServed": "NL",
      "priceRange": "Gratis - 100% No Cure No Pay"
    },
    // HowTo Schema
    {
      "@type": "HowTo",
      "name": "Hoe verhaal ik mijn autoschade op de tegenpartij?",
      "description": "Stap voor stap uitleg voor het verhalen van uw autoschade of voertuigschade op de WA-verzekering van de tegenpartij",
      "step": [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": "Upload uw Europees Schadeformulier",
          "text": "Upload een foto of scan van uw ingevulde Europees Schadeformulier. Ons OCR-systeem leest automatisch de gegevens in en vult het formulier voor u in. U hoeft alleen te controleren of alles klopt.",
          "image": "https://gratisschadeverhalen.nl/step1.jpg"
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "Controleer en voltooi uw gegevens",
          "text": "Check de automatisch ingevulde velden, voeg foto's van de schade toe, en vul eventuele ontbrekende informatie aan.",
          "image": "https://gratisschadeverhalen.nl/step2.jpg"
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": "Wij nemen het over",
          "text": "Binnen 24 uur beoordelen wij uw autoschade claim, stellen een professionele aansprakelijkheidsbrief op, en sturen deze naar de WA-verzekeraar van de tegenpartij.",
          "image": "https://gratisschadeverhalen.nl/step3.jpg"
        },
        {
          "@type": "HowToStep",
          "position": 4,
          "name": "Ontvang uw schadevergoeding",
          "text": "Wij onderhandelen voor u met de verzekeraar tot volledige vergoeding. Gemiddeld binnen 6 weken ontvangt u de uitbetaling. Volledig gratis - u betaalt alleen bij succes.",
          "image": "https://gratisschadeverhalen.nl/step4.jpg"
        }
      ],
      "totalTime": "PT6W"
    },
    // FAQ Schema
    {
      "@type": "FAQPage",
      "@id": "https://gratisschadeverhalen.nl/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Kan ik echt gratis mijn autoschade verhalen?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ja, 100% gratis. Wij werken uitsluitend op no cure no pay basis. U betaalt helemaal niets als uw autoschade claim niet slaagt. Geen voorschot, geen verborgen kosten, geen verrassingen."
          }
        },
        {
          "@type": "Question",
          "name": "Hoe werkt de upload van het Europees Schadeformulier?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Upload simpelweg een foto of scan van uw ingevulde Europees Schadeformulier. Ons slimme OCR-systeem leest automatisch alle gegevens uit (zoals kentekens, datum, locatie) en vult het online formulier voor u in. U hoeft alleen te controleren of alles klopt en eventueel aan te vullen."
          }
        },
        {
          "@type": "Question",
          "name": "Wat is het verschil tussen autoschade en voertuigschade?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Er is geen verschil - beide termen betekenen hetzelfde: materiële schade aan uw voertuig na een ongeval. Wij gebruiken 'autoschade' en 'voertuigschade' door elkaar, omdat beide termen veel worden gezocht door mensen die hun schade willen verhalen."
          }
        },
        {
          "@type": "Question",
          "name": "Hoe lang duurt het om mijn voertuigschade vergoed te krijgen?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Gemiddeld duurt een autoschade claim 4 tot 8 weken. Binnen 2 weken ontvangt u meestal een eerste reactie van de verzekeraar. De snelheid hangt af van de complexiteit van uw schade en de medewerking van de tegenpartij."
          }
        },
        {
          "@type": "Question",
          "name": "Wat heb ik nodig om mijn schade te kunnen verhalen?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "U heeft minimaal nodig: het kenteken van de tegenpartij, foto's van de autoschade, en bij voorkeur het ingevulde Europees Schadeformulier. Ook handig: de datum en locatie van het ongeval, en een korte omschrijving van wat er gebeurde."
          }
        },
        {
          "@type": "Question",
          "name": "Werkt dit ook voor motorschade of schade aan andere voertuigen?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ja! Onze dienst werkt voor alle soorten voertuigschade: personenauto's, motoren, scooters, bestelauto's, en zelfs fietsen. Zolang de tegenpartij aansprakelijk is en een WA-verzekering heeft, kunnen wij uw schade verhalen."
          }
        },
        {
          "@type": "Question",
          "name": "Wat als ik ook lichamelijke klachten heb na het ongeval?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ons platform richt zich specifiek op materiële schade aan uw voertuig. Bij lichamelijke klachten zoals whiplash, hoofdpijn, of andere letselschade verwijzen wij u door naar onze gespecialiseerde partner Unitas Letselschade."
          }
        },
        {
          "@type": "Question",
          "name": "Kan ik mijn claim volgen?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Absoluut! Zodra u uw autoschade claim heeft ingediend, krijgt u toegang tot uw persoonlijke dashboard. Daar ziet u real-time de status van uw claim, alle communicatie met de verzekeraar, en wanneer u uitbetaling kunt verwachten."
          }
        },
        {
          "@type": "Question",
          "name": "Wat als de verzekeraar van de tegenpartij weigert te betalen?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Wij hebben ruime ervaring met weigerende verzekeraars. In dat geval onderzoeken wij juridische stappen en schakelen indien nodig een advocaat in. In 95% van de gevallen komen we tot een schikking. U betaalt niets als we uw voertuigschade niet succesvol verhalen."
          }
        },
        {
          "@type": "Question",
          "name": "Moet ik zelf nog contact hebben met de verzekeraar?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Nee, dat hoeft niet. Wij nemen alle communicatie met de WA-verzekeraar van de tegenpartij voor onze rekening. U hoeft alleen uw autoschade claim in te dienen en verder niets te doen. Wij houden u op de hoogte via uw dashboard."
          }
        }
      ]
    }
  ]
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="flex flex-col min-h-screen">
        {/* Header / Navigation */}
        <header className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Shield className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">Gratisschadeverhalen.nl</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#hoe-werkt-het" className="text-sm font-medium hover:text-primary transition-colors">
                Hoe werkt het?
              </a>
              <a href="#voorbeelden" className="text-sm font-medium hover:text-primary transition-colors">
                Voorbeelden
              </a>
              <a href="#faq" className="text-sm font-medium hover:text-primary transition-colors">
                Veelgestelde vragen
              </a>
              <Link href="/login">
                <Button variant="outline" size="sm">Inloggen</Button>
              </Link>
            </nav>
          </div>
        </header>

        {/* Hero Section met Grote Upload CTA */}
        <section className="bg-gradient-to-br from-blue-50 via-white to-green-50 pt-12 pb-20 md:pt-16 md:pb-28">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {/* Hoofdtitel */}
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
                  Gratis Uw <span className="text-primary">Autoschade Verhalen</span> – Upload Direct Uw Schadeformulier
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground mb-4 max-w-4xl mx-auto">
                  Aangereden? Verhaal uw autoschade of voertuigschade <strong>volledig gratis</strong> op de WA-verzekering van de tegenpartij. 
                  Wij regelen alles – van aansprakelijkheidsbrief tot uitbetaling.
                </p>
                <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground flex-wrap">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>100% Gratis</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>No Cure No Pay</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Gemiddeld 6 weken</span>
                  </div>
                </div>
              </div>

              {/* Grote Upload CTA Card */}
              <Card className="border-2 border-primary shadow-2xl bg-gradient-to-br from-primary/5 to-white max-w-2xl mx-auto">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Upload className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl md:text-3xl mb-2">
                    Upload hier uw Europees Schadeformulier
                  </CardTitle>
                  <CardDescription className="text-base">
                    <strong>Scan of maak een foto?</strong> Wij lezen het automatisch in met OCR. 
                    U hoeft alleen nog te controleren en aan te vullen.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm">
                    <p className="text-blue-900 font-medium mb-2">✨ Zo simpel werkt het:</p>
                    <ul className="space-y-1 text-blue-800">
                      <li>1. Upload foto/scan van uw schadeformulier</li>
                      <li>2. Wij vullen automatisch alle velden in (kentekens, datum, etc.)</li>
                      <li>3. U controleert en vult eventueel aan</li>
                      <li>4. Klaar! Wij starten direct uw autoschade claim</li>
                    </ul>
                  </div>
                  
                  <Link href="/claim-indienen" className="block">
                    <Button size="lg" className="w-full text-lg h-14 text-white shadow-lg hover:shadow-xl transition-all">
                      <Upload className="mr-2 h-5 w-5" />
                      Start Nu – Gratis Autoschade Verhalen
                      <ChevronRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>

                  <p className="text-center text-xs text-muted-foreground">
                    Geen schadeformulier? <Link href="/claim-indienen" className="text-primary hover:underline font-medium">Vul dan handmatig in →</Link>
                  </p>
                </CardContent>
              </Card>

              <p className="text-center mt-8 text-sm text-muted-foreground">
                Geen voorschot • Geen verborgen kosten • Betaal alleen bij succes
              </p>
            </div>
          </div>
        </section>

        {/* Hoe werkt het Section */}
        <section id="hoe-werkt-het" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Zo verhalen wij uw autoschade in 4 stappen
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Van schademelding tot uitbetaling: wij regelen uw volledige voertuigschade claim tegen de tegenpartij
              </p>
            </div>

            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
              {/* Stap 1 */}
              <Card className="border-2 hover:border-primary transition-colors">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">
                      1
                    </div>
                    <div>
                      <CardTitle className="text-xl mb-2">Upload schadeformulier of vul handmatig in</CardTitle>
                      <CardDescription>
                        Upload een foto van uw Europees Schadeformulier en ons OCR-systeem vult automatisch 80% van de velden in. 
                        Of vul alles handmatig in – hoe u wilt. Voeg foto's van uw autoschade toe en een korte omschrijving.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              {/* Stap 2 */}
              <Card className="border-2 hover:border-primary transition-colors">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">
                      2
                    </div>
                    <div>
                      <CardTitle className="text-xl mb-2">Wij beoordelen en nemen contact op</CardTitle>
                      <CardDescription>
                        Binnen 24 uur bekijken wij uw voertuigschade claim. We stellen een professionele aansprakelijkheidsbrief op 
                        en sturen deze direct naar de WA-verzekeraar van de tegenpartij. U krijgt toegang tot uw persoonlijke dashboard.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              {/* Stap 3 */}
              <Card className="border-2 hover:border-primary transition-colors">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">
                      3
                    </div>
                    <div>
                      <CardTitle className="text-xl mb-2">Wij onderhandelen voor u</CardTitle>
                      <CardDescription>
                        Onze ervaren schadebehandelaars onderhandelen met de verzekeraar tot u de volledige vergoeding voor uw autoschade ontvangt. 
                        U volgt alles real-time in uw dashboard. Wij houden u op de hoogte van elke ontwikkeling.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              {/* Stap 4 */}
              <Card className="border-2 hover:border-primary transition-colors">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">
                      4
                    </div>
                    <div>
                      <CardTitle className="text-xl mb-2">Uitbetaling schadevergoeding</CardTitle>
                      <CardDescription>
                        Zodra de verzekeraar akkoord gaat, ontvangt u de volledige schadevergoeding direct op uw rekening. 
                        Gemiddeld binnen 6 weken volledig afgehandeld. Volledig gratis – u betaalt alleen bij succes (no cure no pay).
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Voorbeeldcases Section */}
        <section id="voorbeelden" className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Succesverhalen: Autoschade verhalen in de praktijk
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Echte voorbeelden van hoe wij voertuigschade claims succesvol hebben afgehandeld
              </p>
            </div>

            <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
              {/* Case 1 */}
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-3">
                    <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  </div>
                  <CardTitle className="text-lg">Aangereden op parkeerplaats – € 2.850 vergoed</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    <strong>Situatie:</strong> Mevrouw De Vries werd aangereden op een supermarktparkeerplaats. De tegenpartij gaf haar kenteken, 
                    maar wilde daarna niet meer reageren.
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    <strong>Onze aanpak:</strong> Wij hebben direct contact gezocht met de WA-verzekeraar van de tegenpartij, 
                    een taxatierapport aangevraagd, en aansprakelijkheid vastgesteld.
                  </p>
                  <p className="text-sm font-semibold text-green-700">
                    Resultaat: Volledige vergoeding van € 2.850 binnen 5 weken. Mevrouw De Vries betaalde helemaal niets.
                  </p>
                </CardContent>
              </Card>

              {/* Case 2 */}
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-3">
                    <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  </div>
                  <CardTitle className="text-lg">Kop-staartbotsing op snelweg – € 4.200 vergoed</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    <strong>Situatie:</strong> De heer Jansen werd van achteren aangereden in een file op de A2. 
                    Bumper en achterlichten zwaar beschadigd. De tegenpartij ontkende aanvankelijk schuld.
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    <strong>Onze aanpak:</strong> Met foto's en het Europees Schadeformulier hebben wij duidelijk aansprakelijkheid aangetoond. 
                    De verzekeraar accepteerde volledige aansprakelijkheid.
                  </p>
                  <p className="text-sm font-semibold text-green-700">
                    Resultaat: € 4.200 schadevergoeding binnen 7 weken. Volledige reparatie vergoed, inclusief vervangend vervoer.
                  </p>
                </CardContent>
              </Card>

              {/* Case 3 */}
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-3">
                    <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  </div>
                  <CardTitle className="text-lg">Spiegelschade bij inhalen – € 850 vergoed</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    <strong>Situatie:</strong> Meneer Pietersen kreeg spiegelschade toen een auto hem inhaalde en te dicht langs kwam. 
                    Geen Europees Schadeformulier ingevuld, alleen kenteken genoteerd.
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    <strong>Onze aanpak:</strong> Via het kenteken hebben wij de verzekeraar achterhaald. 
                    Met foto's en getuigenverklaring aansprakelijkheid hard gemaakt.
                  </p>
                  <p className="text-sm font-semibold text-green-700">
                    Resultaat: € 850 uitbetaald binnen 4 weken. Ondanks ontbrekend schadeformulier toch volledige vergoeding.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-12">
              <Link href="/claim-indienen">
                <Button size="lg" className="text-lg px-8">
                  <Upload className="mr-2 h-5 w-5" />
                  Start uw autoschade claim nu
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Waarom gratis Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Waarom is autoschade verhalen bij ons gratis?
                </h2>
                <p className="text-lg text-muted-foreground">
                  Wij werken op basis van <strong>100% no cure no pay</strong>. Dit betekent:
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <Euro className="h-10 w-10 text-primary mb-2" />
                    <CardTitle>Geen kosten vooraf</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      U betaalt geen cent voordat uw autoschade succesvol is verhaald. Geen voorschot, geen inschrijfkosten, 
                      geen verborgen tarieven.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CheckCircle className="h-10 w-10 text-primary mb-2" />
                    <CardTitle>Alleen betalen bij succes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Pas als de verzekeraar uw voertuigschade volledig heeft vergoed, rekenen wij een klein percentage van de uitbetaling. 
                      Mislukt de claim? Dan betaalt u niets.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <Shield className="h-10 w-10 text-primary mb-2" />
                    <CardTitle>Volledige transparantie</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      U weet van tevoren precies wat het kost als uw autoschade claim slaagt. Geen verrassingen achteraf. 
                      Alles staat duidelijk in de voorwaarden.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <Clock className="h-10 w-10 text-primary mb-2" />
                    <CardTitle>Wij nemen alle risico</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Als de verzekeraar niet betaalt of er komt geen akkoord, hebben wij al uren werk verricht zonder dat u iets betaalt. 
                      Dat risico nemen wij volledig voor onze rekening.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Uitgebreide FAQ Section */}
        <section id="faq" className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Veelgestelde vragen over autoschade verhalen</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Alles wat u moet weten over het gratis verhalen van uw voertuigschade
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Kan ik echt gratis mijn autoschade verhalen?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Ja, 100% gratis. Wij werken uitsluitend op no cure no pay basis. U betaalt helemaal niets als uw autoschade claim niet slaagt. 
                    Geen voorschot, geen verborgen kosten, geen verrassingen. Alleen bij succes betaalt u een klein percentage van de ontvangen schadevergoeding.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Hoe werkt de upload van het Europees Schadeformulier?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Upload simpelweg een foto of scan van uw ingevulde Europees Schadeformulier. Ons slimme OCR-systeem (Optical Character Recognition) 
                    leest automatisch alle gegevens uit – zoals kentekens, datum, locatie, en beschrijving – en vult het online formulier voor u in. 
                    U hoeft alleen te controleren of alles klopt en eventueel aan te vullen. Dit bespaart u veel tijd bij het indienen van uw voertuigschade claim.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Wat is het verschil tussen autoschade en voertuigschade?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Er is geen verschil – beide termen betekenen hetzelfde: materiële schade aan uw voertuig na een ongeval waarbij de tegenpartij aansprakelijk is. 
                    Wij gebruiken zowel 'autoschade' als 'voertuigschade' omdat beide termen veel worden gezocht door mensen die hun schade willen verhalen. 
                    Onze dienst werkt voor alle soorten voertuigen: auto's, motoren, scooters, bestelauto's, en zelfs fietsen.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Hoe lang duurt het om mijn voertuigschade vergoed te krijgen?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Gemiddeld duurt een autoschade claim <strong>4 tot 8 weken</strong> van start tot uitbetaling. Binnen 2 weken ontvangt u meestal 
                    een eerste reactie van de WA-verzekeraar van de tegenpartij. De exacte duur hangt af van de complexiteit van uw schade, de hoogte 
                    van het bedrag, en de medewerking van de tegenpartij. Simpele claims met duidelijke aansprakelijkheid gaan vaak sneller.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Wat heb ik nodig om mijn autoschade te kunnen verhalen?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-3">
                    Voor een succesvolle voertuigschade claim heeft u minimaal het volgende nodig:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li><strong>Kenteken tegenpartij:</strong> Essentieel om de verzekeraar te achterhalen</li>
                    <li><strong>Foto's van de schade:</strong> Zo veel mogelijk, van verschillende hoeken</li>
                    <li><strong>Europees Schadeformulier:</strong> Bij voorkeur ingevuld en ondertekend door beide partijen</li>
                    <li><strong>Datum en locatie:</strong> Wanneer en waar vond het ongeval plaats?</li>
                    <li><strong>Korte beschrijving:</strong> Wat gebeurde er precies?</li>
                    <li><strong>Uw contactgegevens:</strong> Zodat wij u op de hoogte kunnen houden</li>
                  </ul>
                  <p className="text-muted-foreground mt-3">
                    Geen schadeformulier? Geen probleem – wij kunnen ook zonder werken, zolang u het kenteken en foto's heeft.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Werkt dit ook voor motorschade of schade aan andere voertuigen?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Ja! Onze dienst werkt voor <strong>alle soorten voertuigschade</strong>: personenauto's, motoren, scooters, brommers, bestelauto's, 
                    campers, en zelfs fietsen. Zolang de tegenpartij aansprakelijk is voor het ongeval en een WA-verzekering heeft, kunnen wij uw schade verhalen. 
                    Het maakt niet uit of u een kleine deuk of total loss heeft – elke claim behandelen we met dezelfde zorg.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Wat als ik ook lichamelijke klachten heb na het ongeval?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Ons platform richt zich specifiek op <strong>materiële schade</strong> aan uw voertuig (autoschade/voertuigschade). 
                    Bij lichamelijke klachten zoals whiplash, hoofdpijn, rugklachten, of andere letselschade verwijzen wij u door naar onze 
                    gespecialiseerde partner <a href="https://unitasletsenschade.nl" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">Unitas Letselschade</a>. 
                    Zij hebben ruime ervaring met letselschadeclaims en kunnen u helpen met het verhalen van uw persoonlijke schade.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Kan ik mijn autoschade claim volgen?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Absoluut! Zodra u uw voertuigschade claim heeft ingediend, krijgt u automatisch toegang tot uw persoonlijke online dashboard. 
                    Daar ziet u real-time de status van uw claim, alle communicatie met de verzekeraar, geüploade documenten, en wanneer u uitbetaling kunt verwachten. 
                    U ontvangt ook email notificaties bij belangrijke updates. Zo bent u altijd volledig op de hoogte van de voortgang van uw autoschade claim.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Wat als de verzekeraar van de tegenpartij weigert te betalen?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Wij hebben ruime ervaring met weigerende of traag reagerende verzekeraars. Als een verzekeraar initieel weigert uw voertuigschade te vergoeden, 
                    onderzoeken wij de zaak grondig en bouwen een sterker dossier. Indien nodig schakelen we een gespecialiseerde advocaat in voor juridische stappen. 
                    In <strong>95% van de gevallen</strong> komen we uiteindelijk tot een schikking. U betaalt helemaal niets als we uw autoschade niet succesvol verhalen – dat is ons no cure no pay principe.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Moet ik zelf nog contact hebben met de WA-verzekeraar?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Nee, dat hoeft absoluut niet en raden we zelfs af. Zodra u uw autoschade claim bij ons indient, nemen <strong>wij alle communicatie</strong> 
                    met de WA-verzekeraar van de tegenpartij voor onze rekening. Wij sturen de aansprakelijkheidsbrief, beantwoorden vragen van de verzekeraar, 
                    onderhandelen over de schadevergoeding, en zorgen voor uitbetaling. U hoeft alleen uw claim in te dienen en verder niets meer te doen. 
                    Wij houden u via uw dashboard op de hoogte van alle ontwikkelingen.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-blue-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Klaar om uw autoschade gratis te verhalen?
            </h2>
            <p className="text-xl mb-4 opacity-95 max-w-2xl mx-auto">
              Upload nu uw Europees Schadeformulier en start direct met het verhalen van uw voertuigschade op de tegenpartij
            </p>
            <p className="text-lg mb-8 opacity-90">
              100% Gratis • No Cure No Pay • Gemiddeld 6 weken • Geen risico
            </p>
            <Link href="/claim-indienen">
              <Button size="lg" variant="secondary" className="text-lg px-10 h-14 shadow-xl hover:shadow-2xl transition-all">
                <Upload className="mr-2 h-5 w-5" />
                Start Nu – Upload Schadeformulier
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <p className="mt-6 text-sm opacity-80">
              Geen Europees Schadeformulier? Ook dan kunt u uw autoschade claimen – vul gewoon handmatig in
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                  <span className="font-bold">Gratisschadeverhalen.nl</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Gratis autoschade en voertuigschade verhalen op de WA-verzekeraar van de tegenpartij. 100% no cure no pay.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Snelle Links</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link></li>
                  <li><Link href="/claim-indienen" className="text-muted-foreground hover:text-primary transition-colors">Claim Indienen</Link></li>
                  <li><a href="#hoe-werkt-het" className="text-muted-foreground hover:text-primary transition-colors">Hoe werkt het?</a></li>
                  <li><a href="#voorbeelden" className="text-muted-foreground hover:text-primary transition-colors">Voorbeelden</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Account</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/login" className="text-muted-foreground hover:text-primary transition-colors">Inloggen</Link></li>
                  <li><Link href="/registreren" className="text-muted-foreground hover:text-primary transition-colors">Registreren</Link></li>
                  <li><Link href="/dashboard" className="text-muted-foreground hover:text-primary transition-colors">Dashboard</Link></li>
                  <li><Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">Privacy</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Contact</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>Email: info@gratisschadeverhalen.nl</li>
                  <li>Telefoon: 088-1234567</li>
                  <li>Maandag t/m vrijdag</li>
                  <li>09:00 - 17:00 uur</li>
                </ul>
              </div>
            </div>
            <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
              <p className="mb-2">
                <strong>Populaire zoektermen:</strong> autoschade verhalen • voertuigschade verhalen • gratis autoschade verhalen • 
                schade verhalen tegenpartij • autoschade claimen • WA schade verhalen
              </p>
              <p>&copy; {new Date().getFullYear()} Gratisschadeverhalen.nl. Alle rechten voorbehouden.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
