import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronDown, MessageCircle, Phone, Mail, ArrowRight, CheckCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Veelgestelde Vragen | Autoschade Verhalen - Gratis & Vrijblijvend",
  description: "Alle antwoorden op uw vragen over autoschade verhalen. Wat kost het? Hoe lang duurt het? Wat als tegenpartij niet betaalt? 100% gratis - u betaalt niets.",
  keywords: [
    "veelgestelde vragen autoschade",
    "wat kost autoschade verhalen",
    "hoe lang duurt schade verhaal",
    "gratis autoschade claimen",
    "geen eigen risico autoschade",
    "WA schade tegenpartij vragen",
    "europees schadeformulier vragen"
  ],
}

// FAQ Schema voor Google Featured Snippets
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Wat kost het om autoschade te verhalen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Helemaal niets! U betaalt geen voorschot en geen kosten. Alle kosten voor het verhalen van uw schade worden door de WA-verzekeraar van de tegenpartij betaald. Ook als uw claim niet slaagt, betaalt u niets."
      }
    },
    {
      "@type": "Question",
      "name": "Hoe lang duurt het verhalen van autoschade?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Gemiddeld 4-8 weken. Binnen 24 uur beoordelen we uw claim en starten we contact met de verzekeraar. De meeste claims zijn binnen 6 weken afgerond, afhankelijk van de reactietijd van de tegenpartij."
      }
    },
    {
      "@type": "Question",
      "name": "Moet ik zelf contact opnemen met de verzekeraar van de tegenpartij?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nee, wij doen dat voor u! Zodra u uw claim indient, sturen wij een professionele aansprakelijkheidsbrief naar de WA-verzekeraar van de tegenpartij en onderhandelen namens u."
      }
    },
    {
      "@type": "Question",
      "name": "Wat als de tegenpartij geen WA-verzekering heeft?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Als de tegenpartij geen WA-verzekering heeft, kunt u een claim indienen bij het Waarborgfonds Motorverkeer. Wij helpen u hierbij en begeleiden het proces."
      }
    },
    {
      "@type": "Question",
      "name": "Kan ik zonder advocaat autoschade verhalen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja! Voor de meeste autoschade claims is geen advocaat nodig. Wij zijn gespecialiseerd in buitengerechtelijke schaderegeling. Alleen bij juridische escalatie schakelen we een advocaat in (kosten ook door tegenpartij betaald)."
      }
    },
    {
      "@type": "Question",
      "name": "Gaat mijn premie omhoog als ik via jullie verhaal?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nee! Omdat wij de schade verhalen op de WA-verzekeraar van de TEGENPARTIJ, heeft dit geen invloed op uw eigen verzekering of premie. Uw schadevrije jaren blijven intact."
      }
    },
    {
      "@type": "Question",
      "name": "Moet ik het Europees Schadeformulier hebben ingevuld?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Het helpt enorm, maar het is niet verplicht. Als u het formulier heeft, kunt u het uploaden en wij vullen automatisch de gegevens in via OCR. Zonder formulier kunt u de gegevens ook handmatig invoeren."
      }
    },
    {
      "@type": "Question",
      "name": "Wat als de tegenpartij de schuld ontkent?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Wij onderzoeken de aansprakelijkheid aan de hand van het schadeformulier, foto's, getuigenverklaringen en eventueel politierapporten. In geval van betwisting onderhandelen wij namens u met de verzekeraar."
      }
    }
  ]
}

interface FAQItem {
  category: string
  question: string
  answer: string
  relatedLinks?: { text: string; href: string }[]
}

const faqs: FAQItem[] = [
  // Kosten & Betaling
  {
    category: "Kosten & Betaling",
    question: "Wat kost het om autoschade te verhalen?",
    answer: "Helemaal niets! U betaalt geen voorschot en geen kosten. Alle kosten voor het verhalen van uw schade worden door de WA-verzekeraar van de tegenpartij betaald. Ook als uw claim niet slaagt, betaalt u niets.",
  },
  {
    category: "Kosten & Betaling",
    question: "Wanneer betaal ik iets?",
    answer: "Nooit. U betaalt letterlijk niets aan ons. De WA-verzekeraar van de tegenpartij betaalt alle kosten, inclusief onze vergoeding. Dit staat ook in de wet (artikel 6:96 BW).",
  },
  {
    category: "Kosten & Betaling",
    question: "Zijn er verborgen kosten?",
    answer: "Absoluut niet. We hebben geen verborgen kosten, geen administratiekosten, geen succespercentage. Alles is 100% gratis voor u. Transparantie staat bij ons voorop.",
  },

  // Proces & Tijdlijn
  {
    category: "Proces & Tijdlijn",
    question: "Hoe lang duurt het verhalen van autoschade?",
    answer: "Gemiddeld 4-8 weken. Binnen 24 uur beoordelen we uw claim en starten we contact met de verzekeraar. De meeste claims zijn binnen 6 weken afgerond, afhankelijk van de reactietijd van de tegenpartij.",
  },
  {
    category: "Proces & Tijdlijn",
    question: "Moet ik zelf contact opnemen met de verzekeraar van de tegenpartij?",
    answer: "Nee, wij doen dat voor u! Zodra u uw claim indient, sturen wij een professionele aansprakelijkheidsbrief naar de WA-verzekeraar van de tegenpartij en onderhandelen namens u. U hoeft niets zelf te doen.",
  },
  {
    category: "Proces & Tijdlijn",
    question: "Kan ik de voortgang van mijn claim volgen?",
    answer: "Ja! U heeft toegang tot een persoonlijk dashboard waar u realtime de status van uw claim kunt volgen. U krijgt ook automatisch updates via email bij belangrijke ontwikkelingen.",
    relatedLinks: [{ text: "Ga naar Mijn Dossier", href: "/dashboard" }],
  },
  {
    category: "Proces & Tijdlijn",
    question: "Wat gebeurt er na het indienen van mijn claim?",
    answer: "Binnen 24 uur beoordeelt uw autoschadespecialist de claim. Vervolgens sturen wij een aansprakelijkheidsbrief naar de WA-verzekeraar van de tegenpartij. We onderhandelen over de schadevergoeding en houden u op de hoogte.",
  },

  // Technisch & Formulieren
  {
    category: "Technisch & Formulieren",
    question: "Moet ik het Europees Schadeformulier hebben ingevuld?",
    answer: "Het helpt enorm, maar het is niet verplicht. Als u het formulier heeft, kunt u het uploaden en wij vullen automatisch de gegevens in via OCR-technologie. Zonder formulier kunt u de gegevens ook handmatig invoeren.",
  },
  {
    category: "Technisch & Formulieren",
    question: "Hoe werkt de OCR-upload?",
    answer: "U maakt een foto of scan van het Europees Schadeformulier en uploadt deze. Onze AI-technologie leest automatisch alle gegevens uit (kentekens, data, handtekeningen) en vult deze in. U hoeft alleen te controleren en eventueel aan te vullen.",
  },
  {
    category: "Technisch & Formulieren",
    question: "Welke documenten heb ik nodig?",
    answer: "Minimaal: het Europees Schadeformulier (of gegevens van beide auto's). Optioneel maar handig: foto's van de schade, getuigenverklaringen, politierapport (bij ernstige ongevallen), rijbewijs en kentekenbewijs.",
  },

  // Verzekeringen & Aansprakelijkheid
  {
    category: "Verzekeringen & Aansprakelijkheid",
    question: "Gaat mijn premie omhoog als ik via jullie verhaal?",
    answer: "Nee! Omdat wij de schade verhalen op de WA-verzekeraar van de TEGENPARTIJ, heeft dit geen invloed op uw eigen verzekering of premie. Uw schadevrije jaren blijven intact. U hoeft uw eigen verzekering niet eens te informeren.",
  },
  {
    category: "Verzekeringen & Aansprakelijkheid",
    question: "Wat als de tegenpartij geen WA-verzekering heeft?",
    answer: "Als de tegenpartij geen WA-verzekering heeft (onverzekerd rijden is illegaal in Nederland), kunt u een claim indienen bij het Waarborgfonds Motorverkeer. Wij helpen u hierbij en begeleiden het proces.",
  },
  {
    category: "Verzekeringen & Aansprakelijkheid",
    question: "Wat als de tegenpartij de schuld ontkent?",
    answer: "Wij onderzoeken de aansprakelijkheid aan de hand van het schadeformulier, foto's, getuigenverklaringen en eventueel politierapporten. In geval van betwisting onderhandelen wij namens u met de verzekeraar. Indien nodig schakelen we juridische expertise in.",
  },
  {
    category: "Verzekeringen & Aansprakelijkheid",
    question: "Kan ik ook verhalen als ik zelf deels schuld had?",
    answer: "Ja, ook bij gedeelde schuld (bijvoorbeeld 70/30) kunt u het percentage van de tegenpartij verhalen. Wij beoordelen de aansprakelijkheidsverdeling en onderhandelen over de vergoeding.",
  },

  // Juridisch
  {
    category: "Juridisch",
    question: "Kan ik zonder advocaat autoschade verhalen?",
    answer: "Ja! Voor de meeste autoschade claims is geen advocaat nodig. Wij zijn gespecialiseerd in buitengerechtelijke schaderegeling en onderhandelen direct met verzekeraars. Alleen bij juridische escalatie (< 5% van de gevallen) schakelen we een advocaat in - kosten ook door tegenpartij betaald.",
  },
  {
    category: "Juridisch",
    question: "Wat als de verzekeraar niet wil betalen?",
    answer: "Dan escaleren wij de claim. Eerst via formele sommatie, daarna indien nodig via gerechtelijke procedure. U betaalt ook in dat geval niets - alle juridische kosten worden op de tegenpartij verhaald.",
  },
  {
    category: "Juridisch",
    question: "Is er een termijn waarbinnen ik moet claimen?",
    answer: "De wettelijke verjaringstermijn voor verkeersongevallen is 5 jaar. Maar hoe eerder u start, hoe beter - bewijs kan verloren gaan en herinneringen vervagen. Start idealiter binnen 1-2 weken na het ongeval.",
  },

  // Specifieke Situaties
  {
    category: "Specifieke Situaties",
    question: "Werken jullie ook met letselschade?",
    answer: "Wij focussen op materiële voertuigschade. Voor letselschade (whiplash, hoofdpijn, verwondingen) werken we samen met onze gespecialiseerde partner Unitas Letselschade. Ons systeem herkent automatisch letsel-indicaties en informeert u.",
    relatedLinks: [
      { text: "Meer over letselschade", href: "/diensten#letselschade" },
      { text: "Unitas Letselschade", href: "https://www.unitasletselschade.nl" }
    ],
  },
  {
    category: "Specifieke Situaties",
    question: "Wat als mijn auto total loss is?",
    answer: "Ook bij total loss helpen wij u. We verhalen de dagwaarde van uw auto, plus bijkomende kosten zoals taksen, expertise, huurauto en eventuele restschuld. Total loss claims vereisen expertise - wij regelen dit voor u.",
  },
  {
    category: "Specifieke Situaties",
    question: "Kan ik een huurauto krijgen tijdens het schade verhaal?",
    answer: "Ja, u heeft recht op een vervangend vervoer als uw auto niet rijdbaar is. Wij helpen u een huurauto te regelen en verhalen deze kosten op de WA-verzekeraar van de tegenpartij.",
  },
]

export default function VeelgesteldeVragenPage() {
  // Group FAQs by category
  const categories = Array.from(new Set(faqs.map(f => f.category)))

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="container mx-auto px-4 py-12 max-w-5xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Veelgestelde Vragen
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Alle antwoorden op uw vragen over gratis autoschade verhalen. Staat uw vraag er niet bij? 
            Neem gerust contact met ons op!
          </p>
          
          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span>100% Gratis - U betaalt niets</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span>Gemiddeld 4-8 weken afhandeling</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span>Geen invloed op uw premie</span>
            </div>
          </div>
        </div>

        {/* Categories Navigation */}
        <div className="mb-12">
          <Card className="bg-blue-50/50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-lg">📑 Categorieën</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {categories.map((category) => (
                  <a
                    key={category}
                    href={`#${category.toLowerCase().replace(/\s+/g, '-')}`}
                    className="flex items-center justify-between p-3 bg-white border border-blue-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all"
                  >
                    <span className="font-medium text-sm">{category}</span>
                    <ChevronDown className="h-4 w-4 text-blue-600" />
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Sections by Category */}
        {categories.map((category) => {
          const categoryFaqs = faqs.filter(f => f.category === category)
          
          return (
            <section 
              key={category} 
              id={category.toLowerCase().replace(/\s+/g, '-')}
              className="mb-12 scroll-mt-24"
            >
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <span className="text-primary">{category}</span>
                <span className="text-sm font-normal text-muted-foreground">
                  ({categoryFaqs.length} vragen)
                </span>
              </h2>

              <div className="space-y-4">
                {categoryFaqs.map((faq, index) => (
                  <Card key={index} className="border-l-4 border-l-primary hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-start gap-3">
                        <span className="text-primary font-bold text-xl">Q</span>
                        <span>{faq.question}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-start gap-3 mb-4">
                        <span className="text-green-600 font-bold text-xl">A</span>
                        <p className="text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                      
                      {faq.relatedLinks && faq.relatedLinks.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <p className="text-sm font-semibold mb-2">📎 Gerelateerd:</p>
                          <div className="flex flex-wrap gap-2">
                            {faq.relatedLinks.map((link, i) => (
                              <Link 
                                key={i} 
                                href={link.href}
                                className="text-sm text-primary hover:underline flex items-center gap-1"
                              >
                                {link.text}
                                <ArrowRight className="h-3 w-3" />
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )
        })}

        {/* Still Have Questions CTA */}
        <section className="mt-16">
          <Card className="bg-gradient-to-br from-primary to-blue-600 text-white border-0">
            <CardContent className="text-center py-12">
              <MessageCircle className="h-16 w-16 mx-auto mb-6 opacity-90" />
              <h2 className="text-3xl font-bold mb-4">Staat uw vraag er niet bij?</h2>
              <p className="text-xl mb-8 text-blue-50">
                Geen probleem! Neem contact met ons op en we helpen u graag verder.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/contact">
                  <Button size="lg" variant="secondary" className="text-lg px-8">
                    <Mail className="mr-2 h-5 w-5" />
                    Stel uw vraag
                  </Button>
                </Link>
                <a href="tel:0850607905">
                  <Button size="lg" variant="outline" className="text-lg px-8 bg-white/10 border-white/30 text-white hover:bg-white/20">
                    <Phone className="mr-2 h-5 w-5" />
                    085 060 7905
                  </Button>
                </a>
              </div>

              <p className="text-sm text-blue-100 mt-6">
                Of start direct met uw gratis claim →
              </p>
              <Link href="/claim-indienen">
                <Button size="lg" variant="secondary" className="mt-3">
                  Gratis Claim Indienen
                </Button>
              </Link>
            </CardContent>
          </Card>
        </section>

        {/* Quick Links */}
        <section className="mt-12 grid md:grid-cols-3 gap-6">
          <Link href="/diensten">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader>
                <CardTitle className="text-lg">📋 Onze Diensten</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Bekijk alle diensten die wij aanbieden voor autoschade verhalen
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/over-ons">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader>
                <CardTitle className="text-lg">🏢 Over Ons</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Leer meer over wie wij zijn en hoe wij werken
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/blog">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader>
                <CardTitle className="text-lg">📚 Knowledge Base</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Handige artikelen en tips over autoschade verhalen
                </p>
              </CardContent>
            </Card>
          </Link>
        </section>
      </main>
    </div>
  )
}
