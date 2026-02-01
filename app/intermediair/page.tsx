import { Metadata } from "next"
import Link from "next/link"
import { Shield, Users, TrendingUp, Clock, CheckCircle, Building2, Car, Handshake, ArrowRight, Phone, Mail } from "lucide-react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export const metadata: Metadata = {
  title: "Voor Intermediairs | 112autoschade.nl",
  description: "Partner worden van 112autoschade.nl? Meld schades voor uw klanten en ontvang een aantrekkelijke vergoeding. Voor schadeherstelbedrijven, autobedrijven en assurantiekantoren.",
}

export default function IntermediairPage() {
  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
              <Handshake className="h-4 w-4" />
              <span className="font-medium text-sm">Voor Zakelijke Partners</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Word Intermediair Partner</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Meld autoschades voor uw klanten en help hen hun schade te verhalen. 
              Snelle expertise, wij regelen alles, uw klant betaalt niets.
            </p>
          </div>

          {/* Voor wie */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-center mb-8">Voor Wie?</h2>
            <div className="grid md:grid-cols-4 gap-4">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Car className="h-10 w-10 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold">Schadeherstelbedrijven</h3>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Building2 className="h-10 w-10 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold">Autobedrijven</h3>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Shield className="h-10 w-10 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold">Assurantiekantoren</h3>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Users className="h-10 w-10 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold">Leasemaatschappijen</h3>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Voordelen */}
          <section className="mb-12">
            <Card className="border-2 border-primary">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Waarom Samenwerken?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <FontAwesomeIcon icon={faCircleCheck} className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold">Extra Service voor Uw Klanten</h3>
                      <p className="text-muted-foreground text-sm">
                        Bied uw klanten een complete oplossing: reparatie én schadeverhaal in één keer geregeld.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FontAwesomeIcon icon={faCircleCheck} className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold">Geen Werk voor U</h3>
                      <p className="text-muted-foreground text-sm">
                        Wij handelen het volledige verhaalproces af. U meldt alleen de schade aan.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FontAwesomeIcon icon={faCircleCheck} className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold">Klanttevredenheid</h3>
                      <p className="text-muted-foreground text-sm">
                        Uw klanten zijn blij: ze krijgen hun schade vergoed zonder gedoe en zonder kosten.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FontAwesomeIcon icon={faCircleCheck} className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold">Eigen Dashboard</h3>
                      <p className="text-muted-foreground text-sm">
                        Volg alle ingediende claims realtime via uw eigen intermediair dashboard.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FontAwesomeIcon icon={faCircleCheck} className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold">Snelle Expertise</h3>
                      <p className="text-muted-foreground text-sm">
                        Gemiddeld 4-6 weken doorlooptijd. Snelle expertise en afhandeling – uw klant krijgt snel zijn geld.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FontAwesomeIcon icon={faCircleCheck} className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold">Gratis voor Uw Klant</h3>
                      <p className="text-muted-foreground text-sm">
                        Uw klant betaalt niets. Alle kosten worden verhaald op de tegenpartij.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Hoe werkt het */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-center mb-8">Hoe Werkt Het?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="h-12 w-12 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    1
                  </div>
                  <h3 className="font-semibold mb-2">Aanmelden als Partner</h3>
                  <p className="text-sm text-muted-foreground">
                    Vul het aanmeldformulier in en ontvang uw inloggegevens voor het intermediair portaal.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="h-12 w-12 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    2
                  </div>
                  <h3 className="font-semibold mb-2">Schade Indienen</h3>
                  <p className="text-sm text-muted-foreground">
                    Meld de schade van uw klant via het portaal. Upload het schadeformulier en foto's.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="h-12 w-12 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    3
                  </div>
                  <h3 className="font-semibold mb-2">Wij Regelen de Rest</h3>
                  <p className="text-sm text-muted-foreground">
                    Wij verhalen de schade op de tegenpartij. U en uw klant worden op de hoogte gehouden.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Contact / Aanmelden */}
          <section className="mb-12">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Aanmeldformulier */}
              <Card>
                <CardHeader>
                  <CardTitle>Aanmelden als Intermediair</CardTitle>
                  <CardDescription>
                    Vul uw gegevens in en wij nemen contact met u op
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="bedrijfsnaam">Bedrijfsnaam *</Label>
                      <Input id="bedrijfsnaam" placeholder="Uw bedrijfsnaam" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactpersoon">Contactpersoon *</Label>
                      <Input id="contactpersoon" placeholder="Naam contactpersoon" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input id="email" type="email" placeholder="email@bedrijf.nl" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="telefoon">Telefoonnummer *</Label>
                      <Input id="telefoon" type="tel" placeholder="0XX-XXXXXXX" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="type">Type Bedrijf</Label>
                      <Input id="type" placeholder="Bijv. Schadeherstelbedrijf, Autodealer" />
                    </div>
                    <Button type="submit" className="w-full" size="lg">
                      Aanmelden als Partner
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Direct Contact */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Direct Contact</CardTitle>
                    <CardDescription>
                      Liever eerst even bellen?
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-semibold">Telefoon</p>
                        <a href="tel:0850605357" className="text-primary hover:underline">
                          085 060 5357
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-semibold">Email</p>
                        <a href="mailto:partners@112autoschade.nl" className="text-primary hover:underline">
                          partners@112autoschade.nl
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-3">Al Partner?</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Log in op het intermediair portaal om schades te melden en uw claims te beheren.
                    </p>
                    <Link href="/dashboard">
                      <Button variant="outline" className="w-full">
                        Inloggen Intermediair Portaal
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  )
}
