import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Shield, ArrowLeft, Target, Heart, Users, TrendingUp, Award, Car } from "lucide-react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Over Ons",
  description: "Over Autoschadebureau.nl - Snelle expertise bij autoschade verhalen. Gratis, u betaalt niets.",
}

export default function OverOnsPage() {
  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Over Autoschadebureau.nl</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Wij maken het verhalen van autoschade <strong>eenvoudig, snel en volledig gratis</strong>.
          </p>
        </div>

        {/* Missie */}
        <section className="mb-12">
          <Card className="border-2 border-primary">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-3xl">Onze Missie</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                <strong>Elke automobilist verdient een eerlijke kans om zijn schade verhaald te krijgen.</strong> 
                Veel mensen weten niet dat ze schade kunnen verhalen op de tegenpartij, of ze vinden het te ingewikkeld. 
                Wij maken het proces <strong>simpel, transparant en volledig gratis</strong>. U betaalt niets – 
                alle kosten worden door de WA-verzekeraar van de tegenpartij vergoed.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Hoe het werkt - Kort */}
        <section className="mb-12">
          <Card className="bg-gradient-to-br from-blue-50 to-white border-2">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl">Zo Simpel Werkt Het</CardTitle>
              <CardDescription className="text-base">
                Van ongeval tot uitbetaling in 4 eenvoudige stappen
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="h-16 w-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    1
                  </div>
                  <h3 className="font-semibold mb-2">Upload Formulier</h3>
                  <p className="text-sm text-muted-foreground">
                    Scan of foto van Europees Schadeformulier uploaden
                  </p>
                </div>

                <div className="text-center">
                  <div className="h-16 w-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    2
                  </div>
                  <h3 className="font-semibold mb-2">Automatisch Invullen</h3>
                  <p className="text-sm text-muted-foreground">
                    Ons systeem vult automatisch alle velden in, u controleert
                  </p>
                </div>

                <div className="text-center">
                  <div className="h-16 w-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    3
                  </div>
                  <h3 className="font-semibold mb-2">Wij Regelen</h3>
                  <p className="text-sm text-muted-foreground">
                    Wij sturen aansprakelijkheidsbrief en onderhandelen
                  </p>
                </div>

                <div className="text-center">
                  <div className="h-16 w-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    4
                  </div>
                  <h3 className="font-semibold mb-2">Uitbetaling</h3>
                  <p className="text-sm text-muted-foreground">
                    Gemiddeld binnen 6 weken ontvangt u de vergoeding
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Partner Letselschade */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-6">Onze Partner voor Letselschade</h2>
          <a 
            href="https://www.unitasletselschade.nl" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block max-w-md mx-auto group"
          >
            <Card className="bg-white border border-gray-200 hover:border-primary hover:shadow-xl transition-all duration-300">
              <CardContent className="py-8 px-6 text-center">
                <Image 
                  src="/unitas-letselschade-logo.png" 
                  alt="Unitas Letselschade" 
                  width={200}
                  height={200}
                  className="w-48 h-auto mx-auto mb-4 object-contain"
                />
                <p className="text-primary font-medium group-hover:underline">
                  Bezoek website →
                </p>
              </CardContent>
            </Card>
          </a>
        </section>

        {/* Team Section (Optioneel) */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-6">Uw Autoschadespecialist</h2>
          <Card className="max-w-3xl mx-auto">
            <CardContent className="text-center py-12">
              <div className="h-24 w-24 rounded-full bg-gray-200 mx-auto mb-6 flex items-center justify-center">
                <Users className="h-12 w-12 text-gray-400" />
              </div>
              <p className="text-muted-foreground mb-4">
                <span className="bg-yellow-100 px-2 py-1 rounded font-semibold">[OPTIONEEL: Voeg teamleden toe]</span>
              </p>
              <p className="text-sm text-muted-foreground max-w-xl mx-auto">
                Hier kunt u foto's, namen en functies van teamleden toevoegen zodra het bedrijf operationeel is. 
                Dit vergroot het vertrouwen en maakt de dienst persoonlijker.
              </p>
            </CardContent>
          </Card>
        </section>

        </div>
      </main>
    </div>
  )
}
