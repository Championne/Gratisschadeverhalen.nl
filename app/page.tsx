import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Shield, Clock, Euro, FileText, Upload, ChevronRight, Star } from "lucide-react"

export const metadata: Metadata = {
  title: "Autoschade Verhalen | Gratis Voertuigschade Claimen - Zonder Eigen Risico",
  description: "Verhaal uw autoschade direct bij de tegenpartij - zonder eigen risico, zonder premieverhoging. Upload uw schadeformulier en wij regelen alles gratis. Ook met eigen verzekering voordelig!",
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
    url: "https://autoschadebureau.nl",
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
      "@id": "https://autoschadebureau.nl/#organization",
      "name": "Autoschadebureau.nl",
      "url": "https://autoschadebureau.nl",
      "logo": "https://autoschadebureau.nl/logo.png",
      "description": "Gratis autoschade en voertuigschade verhalen op de tegenpartij - U betaalt niets, tegenpartij betaalt alles",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "NL"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "email": "info@autoschadebureau.nl",
        "availableLanguage": "Dutch"
      }
    },
    // Service
    {
      "@type": "Service",
      "@id": "https://autoschadebureau.nl/#service",
      "serviceType": "Autoschade Verhalen",
      "name": "Gratis Autoschade en Voertuigschade Verhalen",
      "description": "Professionele afhandeling van autoschade en voertuigschade claims tegen de tegenpartij. Upload uw Europees Schadeformulier en wij regelen alles gratis.",
      "provider": {
        "@id": "https://autoschadebureau.nl/#organization"
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
          "text": "Upload een foto of scan van uw ingevulde Europees Schadeformulier. Ons OCR-systeem leest automatisch de gegevens in en vult het formulier voor u in. U hoeft alleen te controleren of alles klopt.",
          "image": "https://autoschadebureau.nl/step1.jpg"
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "Controleer en voltooi uw gegevens",
          "text": "Check de automatisch ingevulde velden, voeg foto's van de schade toe, en vul eventuele ontbrekende informatie aan.",
          "image": "https://autoschadebureau.nl/step2.jpg"
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": "Wij nemen het over",
          "text": "Binnen 24 uur beoordelen wij uw autoschade claim, stellen een professionele aansprakelijkheidsbrief op, en sturen deze naar de WA-verzekeraar van de tegenpartij.",
          "image": "https://autoschadebureau.nl/step3.jpg"
        },
        {
          "@type": "HowToStep",
          "position": 4,
          "name": "Ontvang uw schadevergoeding",
          "text": "Wij onderhandelen voor u met de verzekeraar tot volledige vergoeding. Gemiddeld binnen 6 weken ontvangt u de uitbetaling. Volledig gratis - u betaalt alleen bij succes.",
          "image": "https://autoschadebureau.nl/step4.jpg"
        }
      ],
      "totalTime": "PT6W"
    },
    // Aggregate Rating Schema (voor testimonials/reviews)
    {
      "@type": "LocalBusiness",
      "@id": "https://autoschadebureau.nl/#rating",
      "name": "Autoschadebureau.nl",
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
      "reviewBody": "Ik dacht dat schade verhalen ingewikkeld was, maar deze site maakte het super makkelijk. OCR werkte perfect!",
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
          "item": "https://autoschadebureau.nl"
        }
      ]
    },
    // WebSite with SearchAction
    {
      "@type": "WebSite",
      "@id": "https://autoschadebureau.nl/#website",
      "url": "https://autoschadebureau.nl",
      "name": "Autoschadebureau.nl",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://autoschadebureau.nl/blog?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    },
    // FAQ Schema
    {
      "@type": "FAQPage",
      "@id": "https://autoschadebureau.nl/#faq",
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
      
      {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 via-white to-green-50 pt-12 pb-16 md:pt-16 md:pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto text-center">
              {/* Hoofdtitel */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8 leading-tight">
                De verhaalservice voor uw voertuig- en letselschade
              </h1>
              
              {/* Subtitel */}
              <p className="text-xl md:text-2xl text-muted-foreground mb-6 max-w-4xl mx-auto">
                <strong className="text-foreground">Autoschadebureau.nl</strong> is een laagdrempelige juridische dienstverlener. Wij verhalen de{" "}
                <strong className="text-foreground">voertuigschade</strong> en{" "}
                <a href="https://unitasletselschade.nl" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-semibold">
                  letselschade
                </a>{" "}
                op de tegenpartij.
              </p>

              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                Van advies en aansprakelijk stellen tot en met een juridische procedure.
              </p>

              {/* Letselschade Banner */}
              <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-6 mb-10 max-w-3xl mx-auto">
                <p className="text-base md:text-lg text-purple-900">
                  <strong>Letselschade?</strong> Wij detecteren automatisch letsel en verwijzen u door naar onze gespecialiseerde partner{" "}
                  <a href="https://unitasletselschade.nl" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-bold">
                    Unitas Letselschade
                  </a>{" "}
                  voor optimale begeleiding.
                </p>
              </div>
            </div>
          </div>
        </section>

      {/* Upload CTA Section */}
        <section className="bg-gray-50 py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {/* Grote Upload CTA Card - Hele card is klikbaar */}
              <Link href="/claim-indienen" className="block group max-w-2xl mx-auto">
                <Card className="border-2 border-primary shadow-2xl bg-gradient-to-br from-primary/5 to-white cursor-pointer hover:shadow-3xl hover:scale-[1.02] transition-all duration-200 active:scale-[0.99]">
                  {/* Urgency Badge */}
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-red-500 text-white px-6 py-1 rounded-full text-sm font-bold shadow-lg animate-pulse">
                      ⚡ Start binnen 2 minuten
                    </div>
                  </div>
                  
                  <CardHeader className="text-center pb-4 pt-8">
                    <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Upload className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-2xl md:text-3xl mb-2">
                      Upload hier uw Europees Schadeformulier
                    </CardTitle>
                    <CardDescription className="text-base">
                      Maak een foto of scan en wij lezen het automatisch in.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button size="lg" className="w-full text-base sm:text-lg h-14 text-white shadow-lg group-hover:shadow-xl transition-all pointer-events-none">
                      <Upload className="mr-2 h-5 w-5 flex-shrink-0" />
                      <span className="hidden sm:inline">Start Nu – Gratis Autoschade Verhalen</span>
                      <span className="sm:hidden">Start Nu – Gratis</span>
                      <ChevronRight className="ml-2 h-5 w-5 flex-shrink-0" />
                    </Button>

                    <p className="text-center text-xs text-muted-foreground">
                      Geen schadeformulier? <span className="text-primary hover:underline font-medium">Vul dan handmatig in →</span>
                    </p>
                  </CardContent>
                </Card>
              </Link>

              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mt-8 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span>U betaalt niets</span>
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span>Tegenpartij betaalt alles</span>
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span>100% gratis</span>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* USP Section - 3 Key Benefits */}
        <section className="py-12 md:py-16 bg-white border-y">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                {/* USP 1: Tegenpartij betaalt */}
                <div className="text-center">
                  <div className="relative mb-6">
                    <div className="w-32 h-32 mx-auto bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg">
                      <div className="absolute inset-0 bg-yellow-600/20 rounded-full transform rotate-45"></div>
                      <Euro className="h-16 w-16 text-white relative z-10" strokeWidth={2.5} />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3">Tegenpartij betaalt alles</h3>
                  <p className="text-muted-foreground">
                    U betaalt niets. De WA-verzekeraar van de tegenpartij vergoedt alle kosten, inclusief onze kosten.
                  </p>
                </div>

                {/* USP 2: Snelle expertise */}
                <div className="text-center">
                  <div className="relative mb-6">
                    <div className="w-32 h-32 mx-auto bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                      <div className="absolute inset-0 bg-green-700/20 rounded-full transform rotate-45"></div>
                      <Clock className="h-16 w-16 text-white relative z-10" strokeWidth={2.5} />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3">Snelle expertise</h3>
                  <p className="text-muted-foreground">
                    Professionele beoordeling binnen 24 uur. Gemiddeld binnen 
                    6 weken volledig afgehandeld door ervaren specialisten.
                  </p>
                </div>

                {/* USP 3: Claim online volgen */}
                <div className="text-center">
                  <div className="relative mb-6">
                    <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                      <div className="absolute inset-0 bg-blue-700/20 rounded-full transform rotate-45"></div>
                      <FileText className="h-16 w-16 text-white relative z-10" strokeWidth={2.5} />
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

        {/* Trust Badges & Social Proof */}
        <section className="py-8 bg-gray-50 border-b">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              {/* Trust Badges Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {/* Badge 1: SSL Beveiligd */}
                <div className="bg-white border-2 border-gray-200 rounded-lg p-4 text-center hover:border-green-400 hover:shadow-md transition-all">
                  <div className="flex justify-center mb-2">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                      <Shield className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                  <p className="font-bold text-sm mb-1">SSL Beveiligd</p>
                  <p className="text-xs text-muted-foreground">Uw gegevens zijn veilig</p>
                </div>

                {/* Badge 2: 100% Gratis */}
                <div className="bg-white border-2 border-gray-200 rounded-lg p-4 text-center hover:border-yellow-400 hover:shadow-md transition-all">
                  <div className="flex justify-center mb-2">
                    <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                      <Euro className="h-6 w-6 text-yellow-600" />
                    </div>
                  </div>
                  <p className="font-bold text-sm mb-1">100% Gratis</p>
                  <p className="text-xs text-muted-foreground">U betaalt niets</p>
                </div>

                {/* Badge 3: Snelle Expertise */}
                <div className="bg-white border-2 border-gray-200 rounded-lg p-4 text-center hover:border-blue-400 hover:shadow-md transition-all">
                  <div className="flex justify-center mb-2">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                      <Clock className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <p className="font-bold text-sm mb-1">Snelle Expertise</p>
                  <p className="text-xs text-muted-foreground">Direct starten</p>
                </div>

                {/* Badge 4: Nederlandse Service */}
                <div className="bg-white border-2 border-gray-200 rounded-lg p-4 text-center hover:border-red-400 hover:shadow-md transition-all">
                  <div className="flex justify-center mb-2">
                    <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                      <span className="text-2xl">🇳🇱</span>
                    </div>
                  </div>
                  <p className="font-bold text-sm mb-1">NL Service</p>
                  <p className="text-xs text-muted-foreground">Nederlandstalig team</p>
                </div>
              </div>

              {/* Mini Testimonial */}
              <div className="mt-8 text-center">
                <div className="flex justify-center gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground italic">
                  "Binnen 5 weken mijn schade volledig vergoed gekregen. Geen gedoe, alles ging automatisch!"
                </p>
                <p className="text-xs text-muted-foreground mt-1">- Sophie M. uit Amsterdam</p>
              </div>
            </div>
          </div>
        </section>

        {/* HOE WERKT HET - 4 Stappen Proces */}
        <section className="py-16 md:py-20 bg-gradient-to-b from-blue-50 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {/* Header */}
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Zo werkt het
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Van ongeval tot uitbetaling in 4 eenvoudige stappen
                </p>
              </div>

              {/* 4 Stappen */}
              <div className="grid md:grid-cols-4 gap-8 relative">
                {/* Connecting Line (desktop only) */}
                <div className="hidden md:block absolute top-12 left-0 right-0 h-1 bg-gradient-to-r from-primary via-blue-400 to-green-500" style={{ top: '48px', zIndex: 0 }}></div>

                {/* Step 1 */}
                <div className="relative z-10">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-primary text-white flex items-center justify-center text-3xl font-bold shadow-lg">
                      1
                    </div>
                    <div className="bg-white rounded-lg p-6 shadow-md border-2 border-primary/20 min-h-[180px]">
                      <h3 className="font-bold text-lg mb-2">Upload Formulier</h3>
                      <p className="text-sm text-muted-foreground">
                        Maak foto van uw Europees Schadeformulier en upload. 
                        OCR leest automatisch alle gegevens.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="relative z-10">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-blue-500 text-white flex items-center justify-center text-3xl font-bold shadow-lg">
                      2
                    </div>
                    <div className="bg-white rounded-lg p-6 shadow-md border-2 border-blue-200 min-h-[180px]">
                      <h3 className="font-bold text-lg mb-2">Controleer & Verstuur</h3>
                      <p className="text-sm text-muted-foreground">
                        Check de ingevulde gegevens, voeg eventueel foto's toe 
                        en verstuur. Klaar in 2 minuten!
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="relative z-10">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-orange-500 text-white flex items-center justify-center text-3xl font-bold shadow-lg">
                      3
                    </div>
                    <div className="bg-white rounded-lg p-6 shadow-md border-2 border-orange-200 min-h-[180px]">
                      <h3 className="font-bold text-lg mb-2">Wij Regelen Alles</h3>
                      <p className="text-sm text-muted-foreground">
                        Binnen 24 uur beoordelen we uw claim. Wij sturen 
                        aansprakelijkheidsbrief en onderhandelen.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="relative z-10">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-green-500 text-white flex items-center justify-center text-3xl font-bold shadow-lg">
                      4
                    </div>
                    <div className="bg-white rounded-lg p-6 shadow-md border-2 border-green-200 min-h-[180px]">
                      <h3 className="font-bold text-lg mb-2">Uitbetaling</h3>
                      <p className="text-sm text-muted-foreground">
                        Gemiddeld binnen 6 weken ontvangt u de volledige 
                        schadevergoeding. Wij houden u op de hoogte.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center mt-12">
                <Link href="/claim-indienen" className="inline-block w-full sm:w-auto">
                  <Button size="lg" className="text-base sm:text-lg px-6 sm:px-10 py-6 shadow-xl hover:shadow-2xl transition-all w-full sm:w-auto">
                    <Upload className="mr-2 h-5 w-5 flex-shrink-0" />
                    Start Nu – Klaar in 2 Minuten
                  </Button>
                </Link>
                <p className="text-sm text-muted-foreground mt-3">
                  ⚡ Binnen 24 uur krijgt u al een eerste beoordeling
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Badges Section */}
        <section className="py-12 bg-white border-y">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-8">
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
                  Vertrouwd door duizenden Nederlanders
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
                {/* Badge 1: 100% Veilig */}
                <div className="text-center p-4 rounded-lg bg-gray-50">
                  <Shield className="h-10 w-10 mx-auto mb-2 text-green-600" />
                  <p className="font-semibold text-sm">100% Veilig</p>
                  <p className="text-xs text-muted-foreground">AVG Compliant</p>
                </div>

                {/* Badge 2: SSL Beveiligd */}
                <div className="text-center p-4 rounded-lg bg-gray-50">
                  <CheckCircle className="h-10 w-10 mx-auto mb-2 text-blue-600" />
                  <p className="font-semibold text-sm">SSL Beveiligd</p>
                  <p className="text-xs text-muted-foreground">256-bit Encryptie</p>
                </div>

                {/* Badge 3: 100% Gratis */}
                <div className="text-center p-4 rounded-lg bg-gray-50">
                  <Euro className="h-10 w-10 mx-auto mb-2 text-yellow-600" />
                  <p className="font-semibold text-sm">100% Gratis</p>
                  <p className="text-xs text-muted-foreground">U betaalt niets</p>
                </div>

                {/* Badge 4: Nederlandse Service */}
                <div className="text-center p-4 rounded-lg bg-gray-50">
                  <Star className="h-10 w-10 mx-auto mb-2 text-orange-600" />
                  <p className="font-semibold text-sm">NL Service</p>
                  <p className="text-xs text-muted-foreground">Altijd Bereikbaar</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 bg-gradient-to-b from-white to-blue-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {/* Header */}
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Wat onze klanten zeggen
                </h2>
                <p className="text-xl text-muted-foreground">
                  Meer dan 1.000+ tevreden klanten gingen u voor
                </p>
              </div>

              {/* Testimonials Grid */}
              <div className="grid md:grid-cols-3 gap-6">
                {/* Testimonial 1 */}
                <Card className="border-2">
                  <CardContent className="pt-6">
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4 italic">
                      "Super snel en makkelijk! Foto gemaakt van mijn schadeformulier, 
                      geüpload, en binnen 5 weken had ik €2.350 op mijn rekening. 
                      Helemaal niets voor hoeven betalen!"
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600">
                        SM
                      </div>
                      <div>
                        <p className="font-semibold">Sophie M.</p>
                        <p className="text-sm text-muted-foreground">Amsterdam</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Testimonial 2 */}
                <Card className="border-2 border-primary">
                  <CardContent className="pt-6">
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4 italic">
                      "Eindelijk een partij die het voor je regelt zonder gedoe. 
                      Dashboard werkt perfect, je ziet precies wat er gebeurt. 
                      Professionele aanpak!"
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center font-bold text-green-600">
                        TR
                      </div>
                      <div>
                        <p className="font-semibold">Thijs R.</p>
                        <p className="text-sm text-muted-foreground">Rotterdam</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Testimonial 3 */}
                <Card className="border-2">
                  <CardContent className="pt-6">
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4 italic">
                      "Via mijn eigen verzekering had ik €500 eigen risico moeten betalen. 
                      Nu kreeg ik €1.850 vergoed zonder iets te betalen. Echt een aanrader!"
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center font-bold text-purple-600">
                        NB
                      </div>
                      <div>
                        <p className="font-semibold">Noor B.</p>
                        <p className="text-sm text-muted-foreground">Utrecht</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Review Platform Note */}
              <div className="text-center mt-8">
                <p className="text-sm text-muted-foreground">
                  Reviews worden verzameld via TrustPilot • Geverifieerde klanten
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Waarom zelf verhalen via ons - NIEUWE SECTIE */}
        <section className="py-12 bg-gradient-to-b from-white to-blue-50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Waarom uw autoschade via ons verhalen?
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Ook met een eigen autoverzekering is onze dienst vaak <strong>voordeliger, sneller en zonder risico</strong>
                </p>
              </div>

              {/* Uitleg cards */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {/* Alleen WA verzekering */}
                <Card className="border-2 border-orange-200 bg-orange-50/50">
                  <CardHeader>
                    <CardTitle className="flex items-start gap-3">
                      <span className="text-2xl">⚠️</span>
                      <span>Heeft u alleen WA-verzekering?</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-muted-foreground">
                      Dan doet <strong>uw eigen verzekeraar helemaal niets</strong> voor uw schade als een ander u aanrijdt.
                    </p>
                    <div className="bg-white border border-orange-200 rounded-lg p-4">
                      <p className="text-sm font-semibold text-orange-900 mb-2">Wat betekent dit?</p>
                      <ul className="text-sm space-y-2 text-orange-800">
                        <li className="flex items-start gap-2">
                          <span className="text-orange-600 mt-0.5">•</span>
                          <span>U moet zelf contact opnemen met de tegenpartij-verzekeraar</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-orange-600 mt-0.5">•</span>
                          <span>U moet zelf een aansprakelijkheidsbrief schrijven</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-orange-600 mt-0.5">•</span>
                          <span>U moet zelf onderhandelen over de schadevergoeding</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-orange-600 mt-0.5">•</span>
                          <span>Of u betaalt de reparatie zelf uit eigen zak</span>
                        </li>
                      </ul>
                    </div>
                    <p className="text-sm font-semibold text-green-700 bg-green-50 border border-green-200 rounded-lg p-3">
                      ✅ <strong>Wij regelen dit alles gratis voor u!</strong> U hoeft niets zelf te doen.
                    </p>
                  </CardContent>
                </Card>

                {/* Beperkt Casco / Allrisk */}
                <Card className="border-2 border-blue-200 bg-blue-50/50">
                  <CardHeader>
                    <CardTitle className="flex items-start gap-3">
                      <span className="text-2xl">💰</span>
                      <span>Heeft u beperkt casco of allrisk?</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-muted-foreground">
                      Uw verzekeraar schiet WEL voor, maar dat heeft <strong>vervelende nadelen</strong>:
                    </p>
                    <div className="bg-white border border-blue-200 rounded-lg p-4">
                      <p className="text-sm font-semibold text-blue-900 mb-2">Nadelen eigen verzekeraar gebruiken:</p>
                      <ul className="text-sm space-y-2 text-blue-800">
                        <li className="flex items-start gap-2">
                          <span className="text-red-600 mt-0.5">✗</span>
                          <span><strong>Eigen risico betalen</strong> (€300-€1000+)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-600 mt-0.5">✗</span>
                          <span><strong>Premie stijgt volgend jaar</strong> (schadevrije jaren kwijt)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-600 mt-0.5">✗</span>
                          <span><strong>Lange wachttijd</strong> op terugbetaling eigen risico (maanden)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-600 mt-0.5">✗</span>
                          <span><strong>Vaak laten ze het liggen:</strong> "Verhaal het zelf maar"</span>
                        </li>
                      </ul>
                    </div>
                    <p className="text-sm font-semibold text-green-700 bg-green-50 border border-green-200 rounded-lg p-3">
                      ✅ <strong>Wij verhalen direct bij de tegenpartij!</strong> Geen eigen risico, geen premieverhoging.
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Voordelen samenvatting */}
              <Card className="border-2 border-primary bg-gradient-to-br from-primary/5 to-white">
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl md:text-3xl">
                    Uw voordelen: Direct verhalen bij de tegenpartij
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                    <div className="flex items-start gap-3 bg-white rounded-lg p-4 border">
                      <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold mb-1">Geen eigen risico</p>
                        <p className="text-sm text-muted-foreground">
                          De WA-verzekeraar van de tegenpartij betaalt alles. U betaalt niks uit eigen zak.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 bg-white rounded-lg p-4 border">
                      <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold mb-1">Geen premieverhoging</p>
                        <p className="text-sm text-muted-foreground">
                          Uw eigen verzekering wordt niet gebruikt. Schadevrije jaren blijven behouden.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 bg-white rounded-lg p-4 border">
                      <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold mb-1">Sneller uitbetaald</p>
                        <p className="text-sm text-muted-foreground">
                          Direct onderhandelen met tegenpartij. Geen wachten op regres van uw eigen verzekeraar.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 bg-white rounded-lg p-4 border">
                      <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold mb-1">Volledig gratis</p>
                        <p className="text-sm text-muted-foreground">
                          U betaalt niets. De WA-verzekeraar van de tegenpartij vergoedt ALLE kosten, inclusief onze kosten.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 bg-white rounded-lg p-4 border">
                      <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold mb-1">Professioneel voor u geregeld</p>
                        <p className="text-sm text-muted-foreground">
                          Wij schrijven de aansprakelijkheidsbrief, onderhandelen, en dreigen indien nodig met juridische stappen.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 bg-white rounded-lg p-4 border">
                      <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold mb-1">U hoeft niets zelf te doen</p>
                        <p className="text-sm text-muted-foreground">
                          Geen contact met verzekeraars, geen gedoe. Upload schadeformulier en wij regelen de rest.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 text-center">
                    <Link href="/claim-indienen" className="block">
                      <Button size="lg" className="text-base md:text-lg px-6 md:px-8 w-full md:w-auto">
                        <Upload className="mr-2 h-5 w-5 flex-shrink-0" />
                        <span className="hidden sm:inline">Start Nu – Verhaal Uw Autoschade Gratis</span>
                        <span className="sm:hidden">Start Nu – Claim Gratis</span>
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Hoe werkt het Section */}
        <section id="hoe-werkt-het" className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
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
                        Gemiddeld binnen 6 weken volledig afgehandeld. Volledig gratis – alle kosten worden door de tegenpartij betaald.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Voorbeeldcases Section */}
        <section id="voorbeelden" className="py-12 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
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
                    <strong>Situatie:</strong> Mevrouw Dekker werd aangereden op een supermarktparkeerplaats. De tegenpartij gaf haar kenteken, 
                    maar wilde daarna niet meer reageren.
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    <strong>Onze aanpak:</strong> Wij hebben direct contact gezocht met de WA-verzekeraar van de tegenpartij, 
                    een expertiserapport aangevraagd, en aansprakelijkheid vastgesteld.
                  </p>
                  <p className="text-sm font-semibold text-green-700">
                    Resultaat: Volledige vergoeding van € 2.850 binnen 5 weken. Mevrouw Dekker betaalde helemaal niets.
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
                    <strong>Situatie:</strong> Meneer Visser werd van achteren aangereden in een file op de A2. 
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
                    <strong>Situatie:</strong> Meneer Scholten kreeg spiegelschade toen een auto hem inhaalde en te dicht langs kwam. 
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

            <div className="text-center mt-8">
              <Link href="/claim-indienen" className="inline-block w-full sm:w-auto">
                <Button size="lg" className="text-base sm:text-lg px-6 sm:px-8 w-full sm:w-auto">
                  <Upload className="mr-2 h-5 w-5 flex-shrink-0" />
                  <span className="hidden sm:inline">Start uw autoschade claim nu</span>
                  <span className="sm:hidden">Start uw claim nu</span>
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Waarom gratis Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Waarom is autoschade verhalen bij ons gratis?
                </h2>
                <p className="text-lg text-muted-foreground">
                  De <strong>WA-verzekeraar van de tegenpartij</strong> betaalt ALLE kosten. Dit betekent:
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <Euro className="h-10 w-10 text-primary mb-2" />
                    <CardTitle>Tegenpartij betaalt alles</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      De WA-verzekeraar van de schuldige partij betaalt de volledige schadevergoeding én onze kosten. 
                      U betaalt dus nooit iets – niet vooraf, en ook niet achteraf.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CheckCircle className="h-10 w-10 text-primary mb-2" />
                    <CardTitle>U betaalt niets</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      De WA-verzekeraar van de tegenpartij betaalt ALLE kosten, inclusief onze kosten. 
                      U hoeft dus letterlijk niets te betalen – geen voorschot, geen percentage, helemaal niets.
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
                      U volgt uw claim 24/7 online en ziet alle updates direct in uw dashboard. 
                      Geen verrassingen, alle kosten worden door de tegenpartij betaald.
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
        <section id="faq" className="py-12 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
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
                    Ja, 100% gratis. De WA-verzekeraar van de tegenpartij betaalt ALLE kosten, inclusief onze kosten. 
                    U betaalt dus letterlijk niets – geen voorschot, geen verborgen kosten, geen percentage. Alles wordt door de tegenpartij vergoed.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-primary/30 bg-primary/5">
                <CardHeader>
                  <CardTitle className="text-lg">Wordt mijn autoschade niet gewoon door mijn eigen verzekeraar verhaald?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Dit is een veelgestelde vraag! Het antwoord hangt af van uw type verzekering:
                  </p>
                  
                  <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded">
                    <p className="font-semibold text-orange-900 mb-2">📋 Alleen WA-verzekering?</p>
                    <p className="text-sm text-orange-800">
                      Dan doet <strong>uw eigen verzekeraar helemaal niets</strong> voor schade die een ander u heeft aangedaan. 
                      WA dekt alleen schade die u aan anderen veroorzaakt. U moet zelf verhalen bij de tegenpartij – of via ons (gratis).
                    </p>
                  </div>

                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                    <p className="font-semibold text-blue-900 mb-2">💰 Beperkt casco of allrisk?</p>
                    <p className="text-sm text-blue-800 mb-2">
                      Uw verzekeraar schiet WEL voor, maar met vervelende nadelen:
                    </p>
                    <ul className="text-sm text-blue-800 space-y-1 ml-4">
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 mt-0.5">✗</span>
                        <span>U betaalt <strong>eigen risico</strong> (€300-€1000+)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 mt-0.5">✗</span>
                        <span>Uw <strong>premie stijgt volgend jaar</strong> (schadevrije jaren kwijt)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 mt-0.5">✗</span>
                        <span><strong>Lange wachttijd</strong> op terugbetaling eigen risico (soms maanden)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 mt-0.5">✗</span>
                        <span>Vaak zeggen ze: <strong>"Verhaal het zelf maar bij de tegenpartij"</strong></span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                    <p className="font-semibold text-green-900 mb-2">✅ Onze aanpak: Direct verhalen bij de tegenpartij</p>
                    <ul className="text-sm text-green-800 space-y-1 ml-4">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Geen eigen risico</strong> – tegenpartij betaalt alles</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Geen premieverhoging</strong> – uw verzekering blijft onaangetast</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Sneller uitbetaald</strong> – gemiddeld binnen 6 weken</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Volledig gratis</strong> – u betaalt niets, tegenpartij betaalt alles</span>
                      </li>
                    </ul>
                  </div>

                  <p className="text-sm font-medium text-primary">
                    💡 Conclusie: Ook met een eigen verzekering is onze dienst vaak voordeliger, sneller en zonder risico!
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
                    gespecialiseerde partner <a href="https://www.unitasletselschade.nl" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">Unitas Letselschade</a>. 
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
                    In <strong>95% van de gevallen</strong> komen we uiteindelijk tot een schikking. U betaalt altijd niets – alle kosten worden door de WA-verzekeraar van de tegenpartij betaald.
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
        <section className="py-12 bg-gradient-to-r from-primary to-blue-700 text-white">
          <div className="container mx-auto px-6 sm:px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Klaar om uw autoschade gratis te verhalen?
            </h2>
            <p className="text-xl mb-4 opacity-95 max-w-2xl mx-auto">
              Upload nu uw Europees Schadeformulier en start direct met het verhalen van uw voertuigschade op de tegenpartij
            </p>
            <p className="text-lg mb-8 opacity-90">
              Snelle expertise • Geen risico
            </p>
            <Link href="/claim-indienen" className="inline-block w-full sm:w-auto px-4 sm:px-0">
              <Button size="lg" variant="secondary" className="text-base sm:text-lg px-4 sm:px-10 h-14 shadow-xl hover:shadow-2xl transition-all w-full sm:w-auto">
                <Upload className="mr-2 h-5 w-5 flex-shrink-0" />
                <span className="hidden sm:inline">Start Nu – Upload Schadeformulier</span>
                <span className="sm:hidden">Start Nu</span>
                <ChevronRight className="ml-2 h-5 w-5 flex-shrink-0" />
              </Button>
            </Link>
            <p className="mt-6 text-sm opacity-80">
              Geen Europees Schadeformulier? Ook dan kunt u uw autoschade claimen – vul gewoon handmatig in
            </p>
          </div>
        </section>

      
    </>
  )
}
