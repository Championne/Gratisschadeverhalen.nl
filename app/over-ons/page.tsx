import { Metadata } from "next"
import Link from "next/link"
import { Shield, ArrowLeft, Target, Heart, Users, TrendingUp, CheckCircle, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Over Ons",
  description: "Over Autoschadebureau.nl - Gratis autoschade verhalen met 100% no cure no pay",
}

export default function OverOnsPage() {
  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Over Autoschadebureau.nl</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Wij maken het verhalen van autoschade <strong>eenvoudig, snel en volledig gratis</strong>. 
            Upload uw schadeformulier en wij regelen de rest – 100% no cure no pay.
          </p>
        </div>

        {/* Missie */}
        <section className="mb-10">
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
                Wij maken het proces <strong>simpel, transparant en volledig gratis</strong>. Geen voorschot, geen verborgen kosten – 
                alleen een klein percentage bij succes.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Waarom Wij? */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Waarom Autoschadebureau.nl?</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>100% No Cure No Pay</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  U betaalt <strong>niets vooraf</strong> en <strong>niets bij mislukking</strong>. 
                  Alleen bij succesvol verhaal van uw autoschade betaalt u een klein percentage. Transparant en eerlijk.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Slimme Technologie</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Upload een foto van uw Europees Schadeformulier en ons <strong>OCR-systeem leest automatisch alle gegevens in</strong>. 
                  U hoeft alleen te controleren en aan te vullen. Binnen minuten bent u klaar.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>Persoonlijke Aanpak</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Elke claim wordt <strong>persoonlijk beoordeeld</strong> en afgehandeld. 
                  U krijgt een dedicated contactpersoon en kunt altijd de status van uw claim volgen via uw dashboard.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Hoe het werkt - Kort */}
        <section className="mb-16">
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
                    OCR vult automatisch alle velden in, u controleert
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

        {/* Waarden */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Onze Kernwaarden</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-l-4 border-l-primary">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Transparantie
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Geen verborgen kosten, geen verrassingen. U weet precies waar u aan toe bent. 
                  Alle voorwaarden en kosten zijn helder gecommuniceerd vóórdat u start.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Eerlijkheid
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Wij nemen alleen claims aan die kansrijk zijn. Als uw claim weinig kans van slagen heeft, 
                  zeggen we dat eerlijk – zodat u geen valse verwachtingen heeft.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-blue-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  Klantgericht
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Uw belang staat voorop. Wij werken voor u, niet voor verzekeraars. 
                  U krijgt persoonlijke aandacht en kunt altijd contact met ons opnemen voor vragen.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-orange-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-orange-600" />
                  Innovatie
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Door slim gebruik van technologie (OCR, AI-screening) maken we het proces 
                  sneller en goedkoper – dat voordeel geven we door aan u.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Partner Samenwerking */}
        <section className="mb-16">
          <Card className="bg-purple-50/50 border-purple-200 border-2">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-purple-100 flex items-center justify-center">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <CardTitle className="text-2xl">Samenwerking met Specialisten</CardTitle>
            </CardHeader>
            <CardContent className="text-center max-w-3xl mx-auto">
              <p className="text-muted-foreground mb-6">
                Wij focussen op <strong>materiële schade aan voertuigen</strong> (autoschade/voertuigschade). 
                Voor <strong>letselschade</strong> (whiplash, hoofdpijn, etc.) werken wij samen met gespecialiseerde partners:
              </p>
              <div className="bg-white border-2 border-purple-300 rounded-lg p-6 inline-block">
                <p className="font-semibold text-lg mb-2">🤝 Partner voor Letselschade</p>
                <a 
                  href="https://www.unitasletselschade.nl" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline text-lg font-medium"
                >
                  Unitas Letselschade →
                </a>
                <p className="text-sm text-muted-foreground mt-2">
                  Gespecialiseerd in letselschade claims met jarenlange ervaring
                </p>
              </div>
              <p className="text-sm text-muted-foreground mt-6">
                💡 <strong>Automatische doorverwijzing:</strong> Ons systeem herkent automatisch letselschade-indicaties 
                (zoals "pijn", "whiplash", "hoofdpijn") en informeert u over de mogelijkheid van letselschade verhaal.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Statistieken (Placeholders) */}
        <section className="mb-16">
          <Card className="bg-gradient-to-r from-primary/5 to-blue-50 border-2 border-primary/20">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl">Onze Resultaten</CardTitle>
              <CardDescription className="text-base">
                Cijfers die voor zich spreken (update zodra data beschikbaar is)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-6 text-center">
                <div className="bg-white rounded-lg p-6 shadow">
                  <div className="text-4xl font-bold text-primary mb-2 bg-yellow-100 inline-block px-3 py-1 rounded">
                    [XXX]
                  </div>
                  <p className="text-sm text-muted-foreground">Claims Succesvol Afgehandeld</p>
                </div>

                <div className="bg-white rounded-lg p-6 shadow">
                  <div className="text-4xl font-bold text-primary mb-2 bg-yellow-100 inline-block px-3 py-1 rounded">
                    €[X]M
                  </div>
                  <p className="text-sm text-muted-foreground">Totaal Uitgekeerd aan Klanten</p>
                </div>

                <div className="bg-white rounded-lg p-6 shadow">
                  <div className="text-4xl font-bold text-primary mb-2 bg-yellow-100 inline-block px-3 py-1 rounded">
                    [X.X]
                  </div>
                  <p className="text-sm text-muted-foreground">Gemiddelde Beoordeling (uit 5)</p>
                </div>

                <div className="bg-white rounded-lg p-6 shadow">
                  <div className="text-4xl font-bold text-primary mb-2 bg-yellow-100 inline-block px-3 py-1 rounded">
                    [XX]
                  </div>
                  <p className="text-sm text-muted-foreground">Gemiddelde Afhandeltijd (dagen)</p>
                </div>
              </div>
              <p className="text-center text-xs text-muted-foreground mt-6 italic">
                💡 Update deze cijfers zodra u voldoende data heeft verzameld
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Team Section (Optioneel) */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-6">Ons Team</h2>
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

        {/* CTA Section */}
        <section>
          <Card className="bg-gradient-to-br from-primary to-blue-600 text-white border-0">
            <CardContent className="text-center py-12">
              <h2 className="text-3xl font-bold mb-4">Klaar om uw autoschade te verhalen?</h2>
              <p className="text-xl mb-8 text-blue-50">
                Upload nu uw schadeformulier en wij regelen de rest – 100% gratis!
              </p>
              <Link href="/claim-indienen">
                <Button size="lg" variant="secondary" className="text-lg px-8">
                  <Shield className="mr-2 h-5 w-5" />
                  Start Nu – Gratis Claim Indienen
                </Button>
              </Link>
              <p className="text-sm text-blue-100 mt-4">
                Geen voorschot • Geen verborgen kosten • Betaal alleen bij succes
              </p>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  )
}
