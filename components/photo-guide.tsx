"use client"

import { useState } from "react"
import Link from "next/link"
import { Camera, Car, MapPin, FileText, Sun, Ruler, AlertTriangle, Eye, ChevronDown, ChevronUp, Info, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Foto stappen data - herbruikbaar
const photoSteps = [
  {
    id: 1,
    icon: MapPin,
    title: "Overzichtsfoto locatie",
    shortDesc: "Wegrituatie en omgeving",
    fullDesc: "Maak een foto van de hele locatie zodat de situatie duidelijk is. Leg de weg, kruispunt of parkeerplaats vast. Dit helpt bij het bepalen van de aansprakelijkheid.",
    tip: "Stap een paar meter achteruit voor een breed beeld",
  },
  {
    id: 2,
    icon: Car,
    title: "Beide voertuigen samen",
    shortDesc: "Positie na het ongeval",
    fullDesc: "Fotografeer beide auto's in hun positie direct na het ongeval. Dit toont hoe de botsing is gebeurd en wie waar stond. Doe dit voordat voertuigen worden verplaatst.",
    tip: "Maak deze foto als eerste, voordat auto's worden verzet",
  },
  {
    id: 3,
    icon: Camera,
    title: "Schade aan uw auto",
    shortDesc: "Alle deuken en krassen",
    fullDesc: "Maak close-up foto's van alle schade aan uw voertuig. Fotografeer elke deuk, kras en kapot onderdeel apart. Hoe meer detail, hoe beter.",
    tip: "Ga dichtbij staan en maak meerdere foto's per beschadiging",
  },
  {
    id: 4,
    icon: Eye,
    title: "Schade aan tegenpartij",
    shortDesc: "Bewijs van impact",
    fullDesc: "Leg ook de schade aan het voertuig van de tegenpartij vast. Dit kan later discussie voorkomen over wat er precies is gebeurd.",
    tip: "Vraag toestemming of maak de foto vanaf de openbare weg",
  },
  {
    id: 5,
    icon: FileText,
    title: "Kentekens",
    shortDesc: "Beide kentekens leesbaar",
    fullDesc: "Fotografeer het kenteken van de tegenpartij duidelijk leesbaar. Dit is essentieel om de verzekeraar te achterhalen. Maak ook een foto van uw eigen kenteken.",
    tip: "Zorg dat letters en cijfers scherp zijn",
  },
  {
    id: 6,
    icon: Ruler,
    title: "Afstanden en sporen",
    shortDesc: "Remsporen en glasscherven",
    fullDesc: "Leg remsporen, glasscherven of andere sporen op de weg vast. Dit kan helpen bij het reconstrueren van het ongeval en de snelheid bepalen.",
    tip: "Gebruik een voorwerp als referentie voor de grootte",
  },
  {
    id: 7,
    icon: AlertTriangle,
    title: "Verkeersborden",
    shortDesc: "Relevante bebording",
    fullDesc: "Fotografeer relevante verkeersborden in de buurt: voorrangsborden, stopborden, snelheidslimieten. Dit kan helpen bepalen wie voorrang had.",
    tip: "Let ook op wegmarkeringen en stoplichten",
  },
  {
    id: 8,
    icon: Sun,
    title: "Weersomstandigheden",
    shortDesc: "Zicht en wegdek",
    fullDesc: "Was het regenachtig, mistig of glad? Maak een foto die de weersomstandigheden toont. Dit kan relevant zijn voor de aansprakelijkheid.",
    tip: "Bij slecht weer: fotografeer ook de staat van het wegdek",
  },
]

// Teaser versie voor landingpage (4 belangrijkste stappen)
export function PhotoGuideTeaser() {
  const teaserSteps = photoSteps.slice(0, 4)
  
  return (
    <section className="py-10 md:py-12 bg-gradient-to-b from-white to-orange-50">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Maak deze foto's voor de snelste afhandeling
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Goede foto's versnellen uw claim aanzienlijk. Met deze 4 essentiële foto's 
              heeft u de beste kans op snelle uitbetaling.
            </p>
          </div>

          {/* Grid met 4 stappen */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {teaserSteps.map((step) => (
              <Card key={step.id} className="text-center hover:shadow-md transition-shadow border-2 hover:border-orange-200">
                <CardContent className="pt-6">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-orange-100 flex items-center justify-center">
                    <step.icon className="h-7 w-7 text-orange-600" />
                  </div>
                  <h3 className="font-bold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.shortDesc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA naar blog */}
          <div className="text-center">
            <Link href="/blog/goede-fotos-autoschade">
              <Button variant="outline" className="group">
                <Camera className="mr-2 h-4 w-4" />
                Meer foto tips in ons blog
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

// Volledige handleiding voor formulier (accordion)
export function PhotoGuideAccordion() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="mb-6">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-orange-50 border border-orange-200 rounded-lg hover:bg-orange-100 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-orange-200 flex items-center justify-center">
            <Camera className="h-5 w-5 text-orange-700" />
          </div>
          <div className="text-left">
            <p className="font-semibold text-orange-900">Welke foto's moet ik maken?</p>
            <p className="text-sm text-orange-700">8 tips voor de beste schadeclaim</p>
          </div>
        </div>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-orange-600" />
        ) : (
          <ChevronDown className="h-5 w-5 text-orange-600" />
        )}
      </button>

      {isOpen && (
        <div className="mt-4 p-4 bg-white border border-orange-200 rounded-lg">
          <div className="grid gap-4">
            {photoSteps.map((step) => (
              <div key={step.id} className="flex gap-4 p-3 rounded-lg hover:bg-gray-50">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                  <span className="font-bold text-orange-700">{step.id}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <step.icon className="h-4 w-4 text-orange-600" />
                    <h4 className="font-semibold">{step.title}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{step.fullDesc}</p>
                  <p className="text-xs bg-orange-50 text-orange-700 px-2 py-1 rounded inline-flex items-center gap-1">
                    <Info className="h-3 w-3" />
                    Tip: {step.tip}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t text-center">
            <Link href="/blog/goede-fotos-autoschade" className="text-sm text-orange-600 hover:underline">
              Lees de volledige foto handleiding →
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

// Compacte inline versie
export function PhotoGuideInline() {
  return (
    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
      <div className="flex items-start gap-3">
        <Camera className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
        <div>
          <p className="font-medium text-orange-900 mb-2">Upload minimaal deze foto's:</p>
          <ul className="text-sm text-orange-800 space-y-1">
            <li>• <strong>Overzicht</strong> - de locatie en beide auto's</li>
            <li>• <strong>Schade</strong> - close-ups van alle beschadigingen</li>
            <li>• <strong>Kenteken</strong> - van de tegenpartij (leesbaar)</li>
          </ul>
          <Link href="/blog/goede-fotos-autoschade" className="text-xs text-orange-600 hover:underline mt-2 inline-block">
            Meer tips →
          </Link>
        </div>
      </div>
    </div>
  )
}
