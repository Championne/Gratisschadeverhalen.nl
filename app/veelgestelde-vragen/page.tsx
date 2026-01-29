import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronDown, MessageCircle, Phone, Mail, ArrowRight } from "lucide-react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons"

export const metadata: Metadata = {
  title: "Veelgestelde Vragen",
  description: "Alle antwoorden op uw vragen over autoschade verhalen. Wat kost het? Hoe lang duurt het? Wat als tegenpartij niet betaalt? U betaalt niets - snelle expertise.",
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
        "text": "Het helpt enorm, maar het is niet verplicht. Als u het formulier heeft, kunt u het uploaden en wij vullen automatisch de gegevens in. Zonder formulier kunt u de gegevens ook handmatig invoeren."
      }
    },
    {
      "@type": "Question",
      "name": "Wat als de tegenpartij de schuld ontkent?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Wij onderzoeken de aansprakelijkheid aan de hand van het schadeformulier, foto's, getuigenverklaringen en eventueel politierapporten. In geval van betwisting onderhandelen wij namens u met de verzekeraar."
      }
    },
    {
      "@type": "Question",
      "name": "Wat is waardevermindering en krijg ik dat vergoed?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Waardevermindering is het verschil in waarde van uw auto vóór en na het ongeval, ook na reparatie. Bij nieuwere auto's (< 3 jaar) of auto's met lage km-stand kunt u dit vaak claimen."
      }
    },
    {
      "@type": "Question",
      "name": "Moet ik naar een specifieke garage voor de reparatie?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nee, u bent vrij om zelf een garage te kiezen. De verzekeraar mag u niet verplichten naar een specifieke garage te gaan."
      }
    },
    {
      "@type": "Question",
      "name": "Kan ik ook bedrijfsvoertuig schade claimen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja, ook schade aan bedrijfsvoertuigen, bestelwagens of lease-auto's kunnen wij verhalen. Bij lease-auto's stemmen wij af met de leasemaatschappij."
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
    answer: "Het helpt enorm, maar het is niet verplicht. Als u het formulier heeft, kunt u het uploaden en wij vullen automatisch de gegevens in. Zonder formulier kunt u de gegevens ook handmatig invoeren.",
  },
  {
    category: "Technisch & Formulieren",
    question: "Hoe werkt het automatisch inlezen van mijn schadeformulier?",
    answer: "U maakt een foto of scan van het Europees Schadeformulier en uploadt deze. Ons systeem leest automatisch alle gegevens uit (kentekens, data, handtekeningen) en vult deze in. U hoeft alleen te controleren en eventueel aan te vullen.",
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
  {
    category: "Specifieke Situaties",
    question: "Wat als ik geen Europees Schadeformulier heb?",
    answer: "Geen probleem! Het schadeformulier is handig maar niet verplicht. U kunt uw claim ook indienen met het kenteken van de tegenpartij, foto's van de schade en een beschrijving van het ongeval. Wij zoeken de verzekeraar op via het kenteken.",
  },
  {
    category: "Specifieke Situaties",
    question: "Kan ik ook bedrijfsvoertuig schade claimen?",
    answer: "Ja, ook schade aan bedrijfsvoertuigen, bestelwagens of lease-auto's kunnen wij verhalen. Bij lease-auto's stemmen wij af met de leasemaatschappij. BTW-plichtige bedrijven kunnen vaak ook de BTW terugkrijgen.",
  },
  {
    category: "Specifieke Situaties",
    question: "Wat als de tegenpartij in het buitenland woont?",
    answer: "Ook bij buitenlandse tegenpartijen kunnen wij helpen. Binnen de EU gelden dezelfde regels. Wij schakelen indien nodig internationale partners in. Dit kan wel iets langer duren (8-12 weken).",
  },

  // Extra Kosten & Vergoedingen
  {
    category: "Kosten & Betaling",
    question: "Wat is waardevermindering en krijg ik dat vergoed?",
    answer: "Waardevermindering is het verschil in waarde van uw auto vóór en na het ongeval, ook na reparatie. Bij nieuwere auto's (< 3 jaar) of auto's met lage km-stand kunt u dit vaak claimen. Wij beoordelen of dit in uw geval mogelijk is.",
  },
  {
    category: "Kosten & Betaling",
    question: "Krijg ik ook reiskosten en andere bijkomende kosten vergoed?",
    answer: "Ja! Naast de reparatiekosten kunt u ook bijkomende kosten claimen: reiskosten naar de garage, expertisekosten, stallingskosten, en zelfs gederfde inkomsten (bij beroepsgebruik). Wij nemen alle schadeposten mee in de claim.",
  },
  {
    category: "Kosten & Betaling",
    question: "Kan ik ook stilstandschade claimen?",
    answer: "Ja, als u uw auto beroepsmatig gebruikt (taxi, koerier, vertegenwoordiger) kunt u gederfde inkomsten claimen voor de dagen dat uw auto in reparatie is. U moet dit wel kunnen onderbouwen met bijvoorbeeld omzetgegevens.",
  },

  // Proces
  {
    category: "Proces & Tijdlijn",
    question: "Moet ik naar een specifieke garage voor de reparatie?",
    answer: "Nee, u bent vrij om zelf een garage te kiezen. De verzekeraar mag u niet verplichten naar een specifieke garage te gaan. Wij raden wel aan om eerst de expertise af te wachten voordat u laat repareren.",
  },
  {
    category: "Proces & Tijdlijn",
    question: "Hoe snel moet ik de schade melden na het ongeval?",
    answer: "Zo snel mogelijk, bij voorkeur binnen 1-2 weken. Hoewel de wettelijke verjaringstermijn 5 jaar is, wordt bewijs moeilijker naarmate de tijd verstrijkt. Foto's vervagen, getuigen vergeten details. Start daarom snel!",
  },
]

export default function VeelgesteldeVragenPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold">
            Veelgestelde Vragen
          </h1>
        </div>

        {/* All FAQs */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <details key={index} className="group bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              <summary className="flex items-center justify-between p-4 cursor-pointer list-none hover:bg-gray-50 transition-colors">
                <span className="font-semibold text-base pr-4">{faq.question}</span>
                <ChevronDown className="w-5 h-5 text-gray-500 transition-transform group-open:rotate-180 flex-shrink-0" />
              </summary>
              <div className="px-4 pb-4">
                <p className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </p>
                
                {faq.relatedLinks && faq.relatedLinks.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
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
              </div>
            </details>
          ))}
        </div>


        </div>
      </main>
    </div>
  )
}
