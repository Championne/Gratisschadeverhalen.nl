import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Shield, Clock, Euro, FileText, Upload, ChevronRight, Star, Car } from "lucide-react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons"
import { HowToSchema, ReviewSchema } from "@/components/schema/howto-review-schema"
import { PhotoGuideTeaser } from "@/components/photo-guide"

export const metadata: Metadata = {
  title: "Autoschade Verhalen | Gratis Voertuigschade Claimen - Zonder Eigen Risico",
  description: "Verhaal uw autoschade direct bij de tegenpartij. Snelle expertise, zonder eigen risico, zonder premieverhoging. Upload uw schadeformulier - 100% gratis!",
  keywords: [
    "autoschade verhalen", 
    "voertuigschade verhalen", 
    "gratis autoschade verhalen",
    "schade verhalen tegenpartij",
    "autoschade claimen",
    "voertuigschade claimen",
    "zonder eigen risico",
    "geen premieverhoging",
    "europees schadeformulier upload",
    "WA schade tegenpartij",
    "gratis schadeafhandeling"
  ],
  openGraph: {
    title: "Autoschade Verhalen | Zonder Eigen Risico, Zonder Premieverhoging - Gratis",
    description: "Verhaal uw autoschade direct bij de tegenpartij - zonder eigen risico, zonder premieverhoging. Ook met eigen verzekering voordelig! Upload schadeformulier en wij regelen alles gratis.",
    url: "https://www.112autoschade.nl",
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
      "@id": "https://112autoschade.nl/#organization",
      "name": "112autoschade.nl",
      "url": "https://112autoschade.nl",
      "logo": "https://112autoschade.nl/logo.png",
      "description": "Gratis autoschade en voertuigschade verhalen op de tegenpartij - U betaalt niets, tegenpartij betaalt alles",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "NL"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "email": "info@112autoschade.nl",
        "availableLanguage": "Dutch"
      }
    },
    // Service
    {
      "@type": "Service",
      "@id": "https://www.112autoschade.nl/#service",
      "serviceType": "Autoschade Verhalen",
      "name": "Gratis Autoschade en Voertuigschade Verhalen",
      "description": "Professionele afhandeling van autoschade en voertuigschade claims tegen de tegenpartij. Upload uw Europees Schadeformulier en wij regelen alles gratis.",
      "provider": {
        "@id": "https://112autoschade.nl/#organization"
      },
      "areaServed": "NL",
      "priceRange": "Gratis - Tegenpartij betaalt alles"
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
          "text": "Upload een foto of scan van uw ingevulde Europees Schadeformulier. Ons systeem leest automatisch de gegevens in en vult het formulier voor u in. U hoeft alleen te controleren of alles klopt."
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "Controleer en voltooi uw gegevens",
          "text": "Check de automatisch ingevulde velden, voeg foto's van de schade toe, en vul eventuele ontbrekende informatie aan."
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": "Wij nemen het over",
          "text": "Binnen 24 uur* beoordelen wij uw autoschade claim, stellen een professionele aansprakelijkheidsbrief op, en sturen deze naar de WA-verzekeraar van de tegenpartij. *Op werkdagen."
        },
        {
          "@type": "HowToStep",
          "position": 4,
          "name": "Ontvang uw schadevergoeding",
          "text": "Wij onderhandelen voor u met de verzekeraar tot volledige vergoeding. Gemiddeld binnen 6 weken* ontvangt u de uitbetaling. *Afhankelijk van de complexiteit en medewerking van de verzekeraar."
        }
      ],
      "totalTime": "PT6W"
    },
    // Aggregate Rating Schema (voor testimonials/reviews)
    {
      "@type": "LocalBusiness",
      "@id": "https://www.112autoschade.nl/#rating",
      "name": "112autoschade.nl",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "bestRating": "5",
        "worstRating": "1",
        "ratingCount": "127",
        "reviewCount": "89"
      }
    },
    // Review Samples
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "Sophie M."
      },
      "datePublished": "2025-01-15",
      "reviewBody": "Binnen 5 weken mijn schade volledig vergoed gekregen. Geen gedoe, alles ging automatisch! Super blij met de service.",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "itemReviewed": {
        "@type": "Service",
        "name": "Autoschade Verhalen"
      }
    },
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "Thijs R."
      },
      "datePublished": "2025-01-10",
      "reviewBody": "Eindelijk iemand die het echt voor je regelt. Helemaal niets betaald en toch €2.400 schade vergoed binnen 4 weken.",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "itemReviewed": {
        "@type": "Service",
        "name": "Autoschade Verhalen"
      }
    },
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "Noor B."
      },
      "datePublished": "2025-01-08",
      "reviewBody": "Ik dacht dat schade verhalen ingewikkeld was, maar deze site maakte het super makkelijk. Het automatisch inlezen werkte perfect!",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "itemReviewed": {
        "@type": "Service",
        "name": "Autoschade Verhalen"
      }
    },
    // BreadcrumbList Schema
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.112autoschade.nl"
        }
      ]
    },
    // WebSite with SearchAction
    {
      "@type": "WebSite",
      "@id": "https://www.112autoschade.nl/#website",
      "url": "https://www.112autoschade.nl",
      "name": "112autoschade.nl",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://www.112autoschade.nl/blog?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    },
    // FAQ Schema
    {
      "@type": "FAQPage",
      "@id": "https://www.112autoschade.nl/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Kan ik echt gratis mijn autoschade verhalen?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ja, 100% gratis. De WA-verzekeraar van de tegenpartij betaalt ALLE kosten, inclusief onze kosten. U betaalt dus letterlijk niets – geen voorschot, geen verborgen kosten, geen percentage."
          }
        },
        {
          "@type": "Question",
          "name": "Wordt mijn autoschade niet gewoon door mijn eigen verzekeraar verhaald?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Dat hangt af van uw verzekering. Bij alleen WA-verzekering doet uw verzekeraar helemaal niets – u moet zelf verhalen bij de tegenpartij. Bij beperkt casco of allrisk schiet uw verzekeraar wel voor, maar dan betaalt u eigen risico (€300-€1000+), stijgt uw premie volgend jaar, en duurt terugbetaling vaak maanden. Door direct bij de tegenpartij te verhalen via ons: geen eigen risico, geen premieverhoging, sneller geld, en volledig gratis."
          }
        },
        {
          "@type": "Question",
          "name": "Hoe werkt de upload van het Europees Schadeformulier?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Upload simpelweg een foto of scan van uw ingevulde Europees Schadeformulier. Ons slimme systeem leest automatisch alle gegevens uit (zoals kentekens, datum, locatie) en vult het online formulier voor u in. U hoeft alleen te controleren of alles klopt en eventueel aan te vullen."
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
      
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 via-white to-green-50 pt-4 pb-6 md:pt-12 md:pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto text-center">
              {/* Hoofdtitel */}
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 md:mb-8 leading-tight">
                Gratis Autoschade Verhalen op de Tegenpartij
              </h1>
              
              {/* Subtitel */}
              <p className="text-lg md:text-2xl text-muted-foreground mb-3 md:mb-6 max-w-4xl mx-auto">
                <strong className="text-foreground">112autoschade.nl</strong> is een laagdrempelige juridische dienstverlener. Wij verhalen de{" "}
                <strong className="text-foreground">voertuigschade</strong> en{" "}
                <a href="https://unitasletselschade.nl" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-semibold">
                  letselschade
                </a>{" "}
                op de tegenpartij.
              </p>

              <p className="text-base md:text-xl text-muted-foreground mb-2 md:mb-4">
                Van advies en aansprakelijk stellen tot en met een juridische procedure.
              </p>
            </div>
          </div>
        </section>

        {/* Video Explainer Section */}
        <section className="py-8 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="rounded-lg overflow-hidden shadow-xl">
                <video 
                  className="w-full h-auto"
                  controls
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source src="/videos/homepage-explainer.mp4" type="video/mp4" />
                  Je browser ondersteunt video niet.
                </video>
              </div>
            </div>
          </div>
        </section>

      {/* Upload CTA Section */}
        <section className="bg-gray-50 py-6 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {/* Section Title */}
              <div className="text-center mb-4 md:mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Direct uw schade melden
                </h2>
                <p className="mt-3 text-lg text-muted-foreground">
                  Start vandaag nog met het verhalen van uw autoschade
                </p>
              </div>

              {/* Grote Upload CTA Card - Hele card is klikbaar */}
              <Link href="/claim-indienen" className="block group max-w-2xl mx-auto">
                <Card className="border-2 border-primary shadow-2xl bg-gradient-to-br from-primary/5 to-white cursor-pointer hover:shadow-3xl hover:scale-[1.02] transition-all duration-200 active:scale-[0.99]">
                  <CardHeader className="text-center pb-4 pt-8">
                    <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Upload className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-2xl md:text-3xl">
                      Upload hier uw Europees Schadeformulier
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button size="lg" className="w-full text-base sm:text-lg h-14 text-white shadow-lg group-hover:shadow-xl transition-all pointer-events-none">
                      <Upload className="mr-2 h-5 w-5 flex-shrink-0" />
                      <span className="hidden sm:inline">Upload Schadeformulier – Binnen 2 Minuten Klaar</span>
                      <span className="sm:hidden">Upload Formulier</span>
                      <ChevronRight className="ml-2 h-5 w-5 flex-shrink-0" />
                    </Button>

                    <p className="text-center text-xs text-muted-foreground">
                      Geen schadeformulier? <span className="text-primary hover:underline font-medium">Vul dan handmatig in →</span>
                    </p>
                  </CardContent>
                </Card>
              </Link>

              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mt-4 md:mt-8 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faCircleCheck} className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span>U betaalt niets</span>
                </span>
                <span className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faCircleCheck} className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span>Tegenpartij betaalt alles</span>
                </span>
                <span className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faCircleCheck} className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span>U betaalt niets</span>
                </span>
              </div>

              {/* SchadeScan CTA */}
              <div className="mt-6 text-center">
                <Link href="/schadescan" className="inline-flex items-center gap-2 text-primary hover:underline font-medium">
                  <CheckCircle className="h-4 w-4" />
                  Twijfelt u? Doe eerst de gratis SchadeScan →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* USP Section - 3 Key Benefits */}
        <section className="py-6 md:py-12 bg-white border-y">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-3 gap-4 md:gap-8">
                {/* USP 1: Tegenpartij betaalt */}
                <div className="text-center">
                  <div className="mb-6">
                    <div className="w-32 h-32 mx-auto bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg">
                      <Euro className="h-16 w-16 text-white" strokeWidth={2.5} />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3">Tegenpartij betaalt alles</h3>
                  <p className="text-muted-foreground">
                    U betaalt niets. De WA-verzekeraar van de tegenpartij vergoedt alle kosten, inclusief onze kosten.
                  </p>
                </div>

                {/* USP 2: Snelle expertise */}
                <div className="text-center">
                  <div className="mb-6">
                    <div className="w-32 h-32 mx-auto bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                      <Clock className="h-16 w-16 text-white" strokeWidth={2.5} />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3">Snelle expertise</h3>
                  <p className="text-muted-foreground">
                    Professionele beoordeling binnen 24 uur*. Gemiddeld binnen 
                    6 weken* volledig afgehandeld door ervaren specialisten.
                  </p>
                  <p className="text-xs text-muted-foreground mt-2 italic">
                    *Op werkdagen. Doorlooptijd afhankelijk van complexiteit.
                  </p>
                </div>

                {/* USP 3: Claim online volgen */}
                <div className="text-center">
                  <div className="mb-6">
                    <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                      <FileText className="h-16 w-16 text-white" strokeWidth={2.5} />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3">Uw claim online volgen</h3>
                  <p className="text-muted-foreground">
                    Volg de voortgang 24/7 in uw persoonlijke dashboard. 
                    Alle documenten, berichten en updates direct inzichtelijk.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* HOE WERKT HET - 4 Stappen Proces */}
        <section className="py-6 md:py-12 bg-gradient-to-b from-blue-50 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {/* Header */}
              <div className="text-center mb-4 md:mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-3">
                  Zo werkt het
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Van ongeval tot uitbetaling in 4 eenvoudige stappen
                </p>
              </div>

              {/* 4 Stappen */}
              <div className="grid md:grid-cols-4 gap-4 md:gap-8 relative">
                {/* Connecting Line (desktop only) */}
                <div className="hidden md:block absolute top-12 left-0 right-0 h-1 bg-primary" style={{ top: '48px', zIndex: 0 }}></div>

                {/* Step 1 */}
                <div className="relative z-10">
                  <div className="text-center">
                    <div className="w-16 h-16 md:w-24 md:h-24 mx-auto mb-3 md:mb-4 rounded-full bg-primary text-white flex items-center justify-center text-2xl md:text-3xl font-bold shadow-lg">
                      1
                    </div>
                    <div className="bg-white rounded-lg p-4 md:p-6 shadow-md border-2 border-primary/20 min-h-[140px] md:min-h-[180px]">
                      <h3 className="font-bold text-base md:text-lg mb-1 md:mb-2">Upload Formulier</h3>
                      <p className="text-xs md:text-sm text-muted-foreground">
                        Maak foto van uw Europees Schadeformulier en upload. 
                        Wij lezen automatisch alle gegevens in.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="relative z-10">
                  <div className="text-center">
                    <div className="w-16 h-16 md:w-24 md:h-24 mx-auto mb-3 md:mb-4 rounded-full bg-primary text-white flex items-center justify-center text-2xl md:text-3xl font-bold shadow-lg">
                      2
                    </div>
                    <div className="bg-white rounded-lg p-4 md:p-6 shadow-md border-2 border-primary/20 min-h-[140px] md:min-h-[180px]">
                      <h3 className="font-bold text-base md:text-lg mb-1 md:mb-2">Controleer & Verstuur</h3>
                      <p className="text-xs md:text-sm text-muted-foreground">
                        Check de ingevulde gegevens, voeg eventueel foto's toe 
                        en verstuur. Klaar in 2 minuten!
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="relative z-10">
                  <div className="text-center">
                    <div className="w-16 h-16 md:w-24 md:h-24 mx-auto mb-3 md:mb-4 rounded-full bg-primary text-white flex items-center justify-center text-2xl md:text-3xl font-bold shadow-lg">
                      3
                    </div>
                    <div className="bg-white rounded-lg p-4 md:p-6 shadow-md border-2 border-primary/20 min-h-[140px] md:min-h-[180px]">
                      <h3 className="font-bold text-base md:text-lg mb-1 md:mb-2">Wij Regelen Alles</h3>
                      <p className="text-xs md:text-sm text-muted-foreground">
                        Binnen 24 uur* beoordelen we uw claim. Wij sturen 
                        aansprakelijkheidsbrief en onderhandelen. *Op werkdagen.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="relative z-10">
                  <div className="text-center">
                    <div className="w-16 h-16 md:w-24 md:h-24 mx-auto mb-3 md:mb-4 rounded-full bg-primary text-white flex items-center justify-center text-2xl md:text-3xl font-bold shadow-lg">
                      4
                    </div>
                    <div className="bg-white rounded-lg p-4 md:p-6 shadow-md border-2 border-primary/20 min-h-[140px] md:min-h-[180px]">
                      <h3 className="font-bold text-base md:text-lg mb-1 md:mb-2">Uitbetaling</h3>
                      <p className="text-xs md:text-sm text-muted-foreground">
                        Gemiddeld binnen 6 weken* ontvangt u de volledige 
                        schadevergoeding. Wij houden u op de hoogte. *Afhankelijk van complexiteit.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center mt-12">
                <Link href="/claim-indienen" className="inline-block w-full sm:w-auto">
                  <Button size="lg" className="text-base sm:text-lg px-6 sm:px-10 py-6 shadow-xl hover:shadow-2xl transition-all w-full sm:w-auto">
                    <Upload className="mr-2 h-5 w-5 flex-shrink-0" />
                    Meld Uw Schade
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Foto Tips Teaser - Hidden on mobile to reduce scroll */}
        <div className="hidden md:block">
          <PhotoGuideTeaser />
        </div>


        {/* NIEUWE SECTIE: Wanneer heeft u ons nodig? */}
        <section className="py-6 md:py-12 bg-gradient-to-b from-white to-amber-50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-4 md:mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Wanneer heeft u onze service nodig?
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Veel mensen weten niet dat hun eigen verzekering <strong>niet altijd helpt</strong> bij het verhalen van schade
                </p>
              </div>

              {/* Uitleg blok */}
              <Card className="border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-white mb-8">
                <CardContent className="p-6 md:p-8">
                  <div className="space-y-6">
                    {/* Situatie 1: Alleen WA */}
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                        <Car className="h-6 w-6 text-amber-700" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-2">Heeft u alleen een WA-verzekering?</h3>
                        <p className="text-muted-foreground">
                          Dan is materiële schade aan uw eigen voertuig <strong>niet gedekt</strong>. Uw eigen verzekeringsmaatschappij 
                          zal de schade niet vergoeden en ook niet voor u verhalen. U moet zelf actie ondernemen.
                        </p>
                      </div>
                    </div>

                    {/* Situatie 2: Geen rechtsbijstand */}
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                        <Shield className="h-6 w-6 text-amber-700" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-2">Geen verhaalrechtsbijstand of rechtsbijstandverzekering?</h3>
                        <p className="text-muted-foreground">
                          Om schade te verhalen op de tegenpartij heeft u normaal gesproken een <strong>verhaalrechtsbijstand</strong> of 
                          <strong> rechtsbijstandverzekering</strong> nodig. Zonder deze verzekering moet u zelf de schade bij de tegenpartij verhalen.
                        </p>
                      </div>
                    </div>

                    {/* Situatie 3: Zelf verhalen is lastig */}
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                        <FileText className="h-6 w-6 text-amber-700" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-2">Zelf schade verhalen is lastig</h3>
                        <p className="text-muted-foreground">
                          Zelf schade verhalen bij de tegenpartij is voor de meeste mensen een <strong>lastige opgave</strong>. 
                          Vakkennis ontbreekt vaak en men weet niet welke stappen te nemen of welke brieven te schrijven.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Oplossing */}
                  <div className="mt-8 p-6 bg-green-50 border-2 border-green-200 rounded-lg">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="h-6 w-6 text-green-700" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-2 text-green-900">Wij nemen het volledig uit handen - gratis!</h3>
                        <p className="text-green-800 mb-4">
                          112autoschade.nl neemt u dit werk volledig uit handen. Wij sturen een professionele 
                          aansprakelijkheidsbrief, onderhandelen met de verzekeraar, en zorgen dat u uw geld krijgt. 
                          <strong> U betaalt niets</strong> - alle kosten worden verhaald op de tegenpartij.
                        </p>
                        <Link href="/claim-indienen">
                          <Button className="bg-green-600 hover:bg-green-700">
                            <Upload className="mr-2 h-4 w-4" />
                            Begin Met Verhalen
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Waarom zelf verhalen via ons - BESTAANDE SECTIE */}
        <section className="py-6 md:py-12 bg-gradient-to-b from-white to-blue-50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-4 md:mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Waarom uw autoschade via ons verhalen?
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Ook met een eigen autoverzekering is onze dienst vaak <strong>voordeliger, sneller en zonder risico</strong>
                </p>
              </div>

              {/* Voordelen samenvatting */}
              <Card className="border-2 border-primary bg-gradient-to-br from-primary/5 to-white">
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl md:text-3xl">
                    Wij regelen alles, u ontvangt de volledige vergoeding
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                    <div className="flex items-start gap-3 bg-white rounded-lg p-3 md:p-4 border">
                      <FontAwesomeIcon icon={faCircleCheck} className="h-5 w-5 md:h-6 md:w-6 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-sm md:text-base">Geen eigen risico</p>
                        <p className="hidden md:block text-sm text-muted-foreground">
                          De WA-verzekeraar van de tegenpartij betaalt alles.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 bg-white rounded-lg p-3 md:p-4 border">
                      <FontAwesomeIcon icon={faCircleCheck} className="h-5 w-5 md:h-6 md:w-6 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-sm md:text-base">Geen premieverhoging</p>
                        <p className="hidden md:block text-sm text-muted-foreground">
                          Schadevrije jaren blijven behouden.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 bg-white rounded-lg p-3 md:p-4 border">
                      <FontAwesomeIcon icon={faCircleCheck} className="h-5 w-5 md:h-6 md:w-6 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-sm md:text-base">Sneller uitbetaald</p>
                        <p className="hidden md:block text-sm text-muted-foreground">
                          Direct onderhandelen met tegenpartij.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 bg-white rounded-lg p-3 md:p-4 border">
                      <FontAwesomeIcon icon={faCircleCheck} className="h-5 w-5 md:h-6 md:w-6 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-sm md:text-base">Zonder kosten</p>
                        <p className="hidden md:block text-sm text-muted-foreground">
                          U betaalt niets, alle kosten door tegenpartij.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 bg-white rounded-lg p-3 md:p-4 border">
                      <FontAwesomeIcon icon={faCircleCheck} className="h-5 w-5 md:h-6 md:w-6 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-sm md:text-base">Professioneel geregeld</p>
                        <p className="hidden md:block text-sm text-muted-foreground">
                          Wij onderhandelen en regelen alles.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 bg-white rounded-lg p-3 md:p-4 border">
                      <FontAwesomeIcon icon={faCircleCheck} className="h-5 w-5 md:h-6 md:w-6 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-sm md:text-base">U hoeft niets te doen</p>
                        <p className="hidden md:block text-sm text-muted-foreground">
                          Upload schadeformulier en klaar.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 text-center">
                    <Link href="/claim-indienen" className="block">
                      <Button size="lg" className="text-base md:text-lg px-6 md:px-8 w-full md:w-auto">
                        <Upload className="mr-2 h-5 w-5 flex-shrink-0" />
                        <span className="hidden sm:inline">Claim Indienen – 100% Gratis</span>
                        <span className="sm:hidden">Claim Indienen</span>
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Succesverhalen & Testimonials Section */}
        <section id="voorbeelden" className="py-6 md:py-12 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-4 md:mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Wat onze klanten zeggen
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Honderden tevreden klanten gingen u voor – bekijk hun ervaringen
              </p>
            </div>

            <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-4 md:gap-8">
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
                    Ik stond op de parkeerplaats bij de Albert Heijn toen iemand mijn auto raakte. Hij gaf z'n kenteken maar reageerde daarna nergens meer op. Jullie hebben alles voor me geregeld.
                  </p>
                  <p className="text-sm font-semibold text-green-700">
                    € 2.850 vergoed binnen 5 weken – geen eigen risico, geen gedoe.
                  </p>
                </CardContent>
              </Card>

              {/* Case 2 - Hidden on mobile */}
              <Card className="h-full hidden md:block">
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
                    Achterop gereden in de file bij knooppunt Holendrecht. Andere bestuurder zei eerst dat het mijn schuld was, maar foto's spraken voor zich. Bumper eraf, lampen kapot.
                  </p>
                  <p className="text-sm font-semibold text-green-700">
                    € 4.200 + vervangend vervoer binnen 7 weken. Volledig reparatie.
                  </p>
                </CardContent>
              </Card>

              {/* Case 3 - Hidden on mobile */}
              <Card className="h-full hidden md:block">
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
                    Een bestelbus haalde me in op de N201 en kwam te dicht langs - spiegel eraf. Had alleen z'n kenteken opgeschreven, geen schadeformulier. Dacht dat het zonder formulier niet zou lukken maar het ging gewoon.
                  </p>
                  <p className="text-sm font-semibold text-green-700">
                    € 850 binnen 4 weken. Zelfs zonder schadeformulier gelukt!
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Korte testimonials - Hidden on mobile */}
            <div className="hidden md:grid max-w-4xl mx-auto mt-8 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 border text-center">
                <p className="text-sm text-muted-foreground italic mb-3">
                  "Super snel! Binnen 5 weken €2.350 binnen. Heb helemaal niets hoeven doen."
                </p>
                <p className="text-sm font-semibold">Lisa - Amsterdam</p>
              </div>
              <div className="bg-white rounded-lg p-4 border text-center">
                <p className="text-sm text-muted-foreground italic mb-3">
                  "Ik had alleen WA verzekering dus eigen schade niet gedekt. Dit was m'n enige optie en werkte perfect."
                </p>
                <p className="text-sm font-semibold">Mark - Rotterdam</p>
              </div>
              <div className="bg-white rounded-lg p-4 border text-center">
                <p className="text-sm text-muted-foreground italic mb-3">
                  "Had via eigen verzekering €500 eigen risico moeten betalen. Nu €1.850 vergoed zonder kosten!"
                </p>
                <p className="text-sm font-semibold">Emma - Utrecht</p>
              </div>
            </div>

            <div className="text-center mt-8">
              <Link href="/claim-indienen" className="inline-block w-full sm:w-auto">
                <Button size="lg" className="text-base sm:text-lg px-6 sm:px-8 w-full sm:w-auto">
                  <Upload className="mr-2 h-5 w-5 flex-shrink-0" />
                  <span className="hidden sm:inline">Ook Uw Schade Laten Verhalen?</span>
                  <span className="sm:hidden">Uw Schade Verhalen</span>
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Top 5 FAQ Section */}
        <section id="faq" className="py-6 md:py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-4 md:mb-8">
              <h2 className="text-3xl md:text-4xl font-bold">Veelgestelde vragen</h2>
            </div>

            <div className="max-w-4xl mx-auto space-y-2 md:space-y-3">
              {/* FAQ 1 */}
              <details className="group bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                <summary className="flex items-center justify-between p-3 md:p-5 cursor-pointer list-none hover:bg-gray-50 transition-colors">
                  <span className="font-semibold text-base md:text-lg pr-4">Kan ik echt gratis mijn autoschade verhalen?</span>
                  <svg className="w-5 h-5 text-gray-500 transition-transform group-open:rotate-180 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-3 pb-3 md:px-5 md:pb-5">
                  <p className="text-muted-foreground text-sm md:text-base">
                    Ja, 100% gratis. De WA-verzekeraar van de tegenpartij betaalt ALLE kosten, inclusief onze kosten. 
                    U betaalt dus letterlijk niets – geen voorschot, geen verborgen kosten, geen percentage.
                  </p>
                </div>
              </details>

              {/* FAQ 2 */}
              <details className="group bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                <summary className="flex items-center justify-between p-3 md:p-5 cursor-pointer list-none hover:bg-gray-50 transition-colors">
                  <span className="font-semibold text-base md:text-lg pr-4">Hoe lang duurt het verhalen van autoschade?</span>
                  <svg className="w-5 h-5 text-gray-500 transition-transform group-open:rotate-180 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-3 pb-3 md:px-5 md:pb-5">
                  <p className="text-muted-foreground text-sm md:text-base">
                    Gemiddeld 4-8 weken. Binnen 24 uur* beoordelen we uw claim en starten we contact met de verzekeraar. 
                    De meeste claims zijn binnen 6 weken afgerond. *Op werkdagen. Doorlooptijd afhankelijk van complexiteit en medewerking verzekeraar.
                  </p>
                </div>
              </details>

              {/* FAQ 3 */}
              <details className="group bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                <summary className="flex items-center justify-between p-3 md:p-5 cursor-pointer list-none hover:bg-gray-50 transition-colors">
                  <span className="font-semibold text-base md:text-lg pr-4">Gaat mijn premie omhoog als ik via jullie verhaal?</span>
                  <svg className="w-5 h-5 text-gray-500 transition-transform group-open:rotate-180 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-3 pb-3 md:px-5 md:pb-5">
                  <p className="text-muted-foreground text-sm md:text-base">
                    Nee! Omdat wij de schade verhalen op de WA-verzekeraar van de TEGENPARTIJ, heeft dit geen invloed op uw eigen verzekering of premie. 
                    Uw schadevrije jaren blijven intact.
                  </p>
                </div>
              </details>

              {/* FAQ 4 */}
              <details className="group bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                <summary className="flex items-center justify-between p-3 md:p-5 cursor-pointer list-none hover:bg-gray-50 transition-colors">
                  <span className="font-semibold text-base md:text-lg pr-4">Moet ik zelf contact opnemen met de verzekeraar?</span>
                  <svg className="w-5 h-5 text-gray-500 transition-transform group-open:rotate-180 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-3 pb-3 md:px-5 md:pb-5">
                  <p className="text-muted-foreground text-sm md:text-base">
                    Nee, wij doen dat voor u! Zodra u uw claim indient, sturen wij een professionele aansprakelijkheidsbrief naar de WA-verzekeraar van de tegenpartij en onderhandelen namens u.
                  </p>
                </div>
              </details>

              {/* FAQ 5 */}
              <details className="group bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                <summary className="flex items-center justify-between p-3 md:p-5 cursor-pointer list-none hover:bg-gray-50 transition-colors">
                  <span className="font-semibold text-base md:text-lg pr-4">Moet ik het Europees Schadeformulier hebben?</span>
                  <svg className="w-5 h-5 text-gray-500 transition-transform group-open:rotate-180 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-3 pb-3 md:px-5 md:pb-5">
                  <p className="text-muted-foreground text-sm md:text-base">
                    Het helpt enorm, maar het is niet verplicht. U kunt ook claimen met alleen het kenteken van de tegenpartij, foto's van de schade en een beschrijving van het ongeval.
                  </p>
                </div>
              </details>

              {/* Button to full FAQ page */}
              <div className="text-center pt-4">
                <Link href="/veelgestelde-vragen">
                  <Button variant="outline" size="lg">
                    Bekijk alle veelgestelde vragen
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-6 md:py-12 bg-gradient-to-r from-primary to-blue-700 text-white">
          <div className="container mx-auto px-6 sm:px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Klaar om uw autoschade te verhalen?
            </h2>
            <p className="text-xl mb-4 opacity-95 max-w-2xl mx-auto">
              Upload nu uw Europees Schadeformulier en start direct met het verhalen van uw voertuigschade op de tegenpartij
            </p>
            <p className="text-lg mb-8 opacity-90">
              Snelle expertise • Geen risico
            </p>
            <Link href="/claim-indienen" className="inline-block w-full sm:w-auto px-4 sm:px-0">
              <Button size="lg" variant="secondary" className="text-base sm:text-lg px-6 sm:px-10 h-14 shadow-xl hover:shadow-2xl transition-all w-full sm:w-auto">
                Direct Beginnen
                <ChevronRight className="ml-2 h-5 w-5 flex-shrink-0" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Schema Markup for SEO */}
        <HowToSchema />
        <ReviewSchema />
      
    </>
  )
}
