import { Metadata } from "next"
import Link from "next/link"
import { Handshake, Users, Clock, Shield, CheckCircle, Building2, Car, Briefcase, ArrowRight, Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Partner worden? | Intermediair Programma Materiële Autoschade",
  description: "Werk samen met Gratisschadeverhalen.nl als intermediair voor kosteloos verhaal van materiële autoschade. Ideaal voor verzekeringsadviseurs, garages & fleetmanagers.",
  keywords: ["intermediair autoschade", "partner schadebedrijf", "schade tussenpersonen", "verzekeringsadviseur", "fleetmanager schade", "gratis schadeverhaal partner"],
}

const benefits = [
  {
    icon: Shield,
    title: "100% Kosteloos voor uw Cliënt",
    description: "Onze kosten worden direct verhaald op de WA-verzekeraar van de aansprakelijke partij. Geen eigen risico, geen kosten voor u of uw cliënt."
  },
  {
    icon: Clock,
    title: "Volledige Ontzorging",
    description: "Wij nemen de complete schadeafhandeling uit handen, van de eerste melding tot en met het verhaal van de schade. Bespaart u en uw cliënt veel tijd en stress."
  },
  {
    icon: CheckCircle,
    title: "Expertise in Materiële Autoschade",
    description: "Wij zijn gespecialiseerd in autoschade waarbij de tegenpartij aansprakelijk is: aanrijdingen, parkeerschade, kop-staartbotsingen en meer."
  },
  {
    icon: Users,
    title: "Verbeterde Klanttevredenheid",
    description: "Door uw cliënten te verwijzen naar een betrouwbare en kosteloze oplossing versterkt u de klantrelatie en bouwt u aan loyaliteit."
  },
]

const targetAudience = [
  {
    icon: Briefcase,
    title: "Verzekeringsadviseurs",
    description: "Bied uw klanten een complete service voor materiële autoschade, zelfs als hun polis geen rechtsbijstand voor verhaal biedt."
  },
  {
    icon: Car,
    title: "Schadeherstelbedrijven",
    description: "Ontzorg uw klanten door ze direct door te verwijzen voor het verhalen van reparatiekosten."
  },
  {
    icon: Building2,
    title: "Fleetmanagers & Leasemaatschappijen",
    description: "Zorg voor snelle en efficiënte afhandeling van schades aan uw wagenpark, zonder interne administratieve lasten."
  },
]

const steps = [
  {
    number: 1,
    title: "Dien uw aanvraag in",
    description: "Neem contact met ons op via onderstaand formulier of telefoonnummer."
  },
  {
    number: 2,
    title: "Kennismakingsgesprek",
    description: "We plannen een persoonlijk gesprek om uw behoeften te bespreken."
  },
  {
    number: 3,
    title: "Start samenwerking",
    description: "Na een succesvolle kennismaking kunt u direct beginnen met het verwijzen van cliënten."
  },
]

export default function IntermediairsPage() {
  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Handshake className="h-4 w-4" />
              Partnerprogramma
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Samenwerken met Gratisschadeverhalen.nl
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Breid uw servicepakket uit met <strong>kosteloze hulp</strong> bij het verhalen van materiële autoschade voor uw cliënten.
            </p>
          </div>

          {/* Benefits Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Waarom Partnership met Ons?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <Card key={index} className="border-2 hover:border-primary transition-colors">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <benefit.icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{benefit.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Target Audience Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-4">Voor Wie is Ons Programma?</h2>
            <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
              Speciaal ontworpen voor professionals die regelmatig te maken krijgen met materiële autoschadeclaims.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {targetAudience.map((audience, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="h-16 w-16 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-4">
                      <audience.icon className="h-8 w-8 text-orange-600" />
                    </div>
                    <CardTitle>{audience.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">{audience.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* How to Become Partner */}
          <section className="mb-16">
            <Card className="bg-gradient-to-br from-blue-50 to-white border-2">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl">Hoe Wordt u Partner?</CardTitle>
                <CardDescription className="text-base">
                  In 3 eenvoudige stappen aan de slag
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-8">
                  {steps.map((step) => (
                    <div key={step.number} className="text-center">
                      <div className="h-16 w-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                        {step.number}
                      </div>
                      <h3 className="font-semibold mb-2">{step.title}</h3>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* CTA Section */}
          <section className="mb-12">
            <Card className="bg-primary text-white">
              <CardContent className="py-12 text-center">
                <h2 className="text-3xl font-bold mb-4">Interesse in een Partnership?</h2>
                <p className="text-lg mb-8 opacity-90">
                  Neem vandaag nog contact met ons op en ontdek hoe wij samen uw cliënten kunnen helpen.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="mailto:info@autoschadebureau.nl">
                    <Button size="lg" variant="secondary" className="gap-2">
                      <Mail className="h-5 w-5" />
                      info@autoschadebureau.nl
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button size="lg" variant="outline" className="gap-2 bg-transparent border-white text-white hover:bg-white/10">
                      <ArrowRight className="h-5 w-5" />
                      Contact Formulier
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Back Link */}
          <div className="text-center">
            <Link href="/" className="text-primary hover:underline inline-flex items-center gap-2">
              ← Terug naar Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
