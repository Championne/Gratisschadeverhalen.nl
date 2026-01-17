import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Shield, Clock, Euro, FileText, Phone } from "lucide-react"

export const metadata: Metadata = {
  title: "Gratis je Autoschade Verhalen op de Tegenpartij – 100% No Cure No Pay",
  description: "Volledig gratis je materiële autoschade verhalen op de WA-verzekeraar van de tegenpartij. Wij regelen alles voor je, van A tot Z. 100% no cure no pay garantie.",
  keywords: ["gratis autoschade verhalen", "WA schade tegenpartij", "no cure no pay", "aansprakelijkheidsbrief", "schadeafhandeling"],
  openGraph: {
    title: "Gratis je Autoschade Verhalen op de Tegenpartij – 100% No Cure No Pay",
    description: "Volledig gratis je materiële autoschade verhalen. Wij regelen alles voor je.",
    url: "https://gratisschadeverhalen.nl",
  },
}

// JSON-LD Schema voor SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://gratisschadeverhalen.nl/#organization",
      "name": "Gratisschadeverhalen.nl",
      "url": "https://gratisschadeverhalen.nl",
      "logo": "https://gratisschadeverhalen.nl/logo.png",
      "description": "Gratis verhalen van materiële autoschade op de tegenpartij",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "NL"
      }
    },
    {
      "@type": "Service",
      "@id": "https://gratisschadeverhalen.nl/#service",
      "serviceType": "Schadeafhandeling",
      "provider": {
        "@id": "https://gratisschadeverhalen.nl/#organization"
      },
      "areaServed": "NL",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Autoschade Verhaal Diensten",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Gratis Autoschade Verhalen",
              "description": "100% no cure no pay schadeafhandeling"
            }
          }
        ]
      }
    },
    {
      "@type": "FAQPage",
      "@id": "https://gratisschadeverhalen.nl/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Is het echt gratis?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ja, volledig gratis. Wij werken 100% no cure no pay. Je betaalt niets als we je schade niet succesvol verhalen."
          }
        },
        {
          "@type": "Question",
          "name": "Hoe lang duurt het proces?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Gemiddeld binnen 2-4 weken ontvang je een eerste reactie. De totale afhandeling kan 4-8 weken duren, afhankelijk van de complexiteit."
          }
        },
        {
          "@type": "Question",
          "name": "Wat heb ik nodig om een claim in te dienen?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Je hebt nodig: kenteken van de tegenpartij, foto's van de schade, het Europees Schadeformulier (indien beschikbaar), en een beschrijving van het ongeval."
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
        <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-40">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">Gratisschadeverhalen.nl</span>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#hoe-werkt-het" className="text-sm hover:text-primary transition-colors">
                Hoe werkt het?
              </a>
              <a href="#voordelen" className="text-sm hover:text-primary transition-colors">
                Voordelen
              </a>
              <a href="#faq" className="text-sm hover:text-primary transition-colors">
                Veelgestelde vragen
              </a>
              <Link href="/login">
                <Button variant="outline" size="sm">Inloggen</Button>
              </Link>
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 via-white to-green-50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Gratis je Autoschade Verhalen op de Tegenpartij – <span className="text-primary">100% No Cure No Pay</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8">
                Ben je aangereden door een ander? Verhaal je materiële schade volledig <strong>gratis</strong> op de WA-verzekeraar van de tegenpartij. Wij regelen alles voor je, van A tot Z.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/claim-indienen">
                  <Button size="lg" className="text-lg px-8">
                    <FileText className="mr-2 h-5 w-5" />
                    Claim Indienen
                  </Button>
                </Link>
                <a href="#hoe-werkt-het">
                  <Button size="lg" variant="outline" className="text-lg px-8">
                    Hoe werkt het?
                  </Button>
                </a>
              </div>
              <p className="mt-6 text-sm text-muted-foreground">
                ✓ Geen voorschot nodig &nbsp;•&nbsp; ✓ Geen verborgen kosten &nbsp;•&nbsp; ✓ Uitbetaling binnen 4-8 weken
              </p>
            </div>
          </div>
        </section>

        {/* Voordelen Section */}
        <section id="voordelen" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Waarom Gratisschadeverhalen.nl?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Wij maken het verhalen van je autoschade simpel, snel en volkomen gratis.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              <Card>
                <CardHeader>
                  <Euro className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>100% Gratis</CardTitle>
                  <CardDescription>
                    Geen voorschot, geen verborgen kosten. Je betaalt niets.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <Clock className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Snel Afgehandeld</CardTitle>
                  <CardDescription>
                    Gemiddeld binnen 4-8 weken volledig afgehandeld.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <Shield className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>No Cure No Pay</CardTitle>
                  <CardDescription>
                    Je betaalt alleen als we succesvol zijn. Niets meer, niets minder.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <CheckCircle className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Professioneel Team</CardTitle>
                  <CardDescription>
                    Ervaren schadebehandelaars die jouw belangen behartigen.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <FileText className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Alles uit handen</CardTitle>
                  <CardDescription>
                    Wij regelen alle communicatie met de verzekeraar.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <Phone className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Persoonlijk Contact</CardTitle>
                  <CardDescription>
                    Altijd op de hoogte via je persoonlijke dashboard.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Hoe werkt het Section */}
        <section id="hoe-werkt-het" className="py-16 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Hoe werkt het?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                In 4 simpele stappen verhaal je jouw autoschade
              </p>
            </div>
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Vul het formulier in</h3>
                  <p className="text-muted-foreground">
                    Dien je claim in via ons online formulier. Upload foto&apos;s van de schade en het Europees Schadeformulier. Ons OCR-systeem vult automatisch veel velden voor je in.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Wij nemen contact op</h3>
                  <p className="text-muted-foreground">
                    Binnen 24 uur beoordelen wij je claim en nemen contact met je op. We stellen een professionele aansprakelijkheidsbrief op en sturen deze naar de WA-verzekeraar.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Wij onderhandelen voor jou</h3>
                  <p className="text-muted-foreground">
                    Onze experts onderhandelen met de verzekeraar en zorgen ervoor dat je de volledige schadevergoeding ontvangt. Je kunt alles live volgen in je dashboard.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Uitbetaling</h3>
                  <p className="text-muted-foreground">
                    Zodra de verzekeraar akkoord gaat, ontvang je de schadevergoeding direct op je rekening. Gemiddeld binnen 4-8 weken volledig afgehandeld.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Veelgestelde Vragen</h2>
            </div>
            <div className="max-w-3xl mx-auto space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Is het echt gratis?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Ja, volledig gratis. Wij werken 100% no cure no pay. Je betaalt niets als we je schade niet succesvol verhalen. Er zijn geen verborgen kosten of voorschotten nodig.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Hoe lang duurt het proces?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Gemiddeld binnen 2-4 weken ontvang je een eerste reactie van de verzekeraar. De totale afhandeling kan 4-8 weken duren, afhankelijk van de complexiteit van de claim en de medewerking van de tegenpartij.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Wat heb ik nodig om een claim in te dienen?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Je hebt het volgende nodig:
                  </p>
                  <ul className="list-disc list-inside mt-2 text-muted-foreground space-y-1">
                    <li>Kenteken van de tegenpartij</li>
                    <li>Foto&apos;s van de schade aan je auto</li>
                    <li>Het Europees Schadeformulier (indien beschikbaar)</li>
                    <li>Beschrijving van het ongeval (datum, tijd, plaats)</li>
                    <li>Je contactgegevens</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Wat gebeurt er als ik ook letselschade heb?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Ons platform is specifiek voor <strong>materiële schade</strong>. Als je ook letselschade hebt (zoals whiplash, pijn, of medische klachten), verwijzen wij je door naar onze partner{" "}
                    <a href="https://unitasletsenschade.nl" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      Unitas Letselschade
                    </a>
                    , die gespecialiseerd is in letselschadeclaims.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Wat als de verzekeraar niet betaalt?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Als de verzekeraar weigert te betalen of niet reageert, onderzoeken wij juridische stappen. In de meeste gevallen komen we tot een schikking. Je betaalt niets als we niet succesvol zijn (no cure no pay).
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Is mijn data veilig?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Ja, wij nemen privacy zeer serieus. Al je gegevens worden versleuteld opgeslagen en conform de AVG/GDPR wetgeving behandeld. We delen nooit je persoonlijke informatie met derden zonder jouw toestemming.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Klaar om je schade te verhalen?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Start vandaag nog en ontvang je schadevergoeding binnen 4-8 weken
            </p>
            <Link href="/claim-indienen">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                <FileText className="mr-2 h-5 w-5" />
                Claim Nu Indienen
              </Button>
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                  <span className="font-bold">Gratisschadeverhalen.nl</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Gratis verhalen van materiële autoschade op de WA-verzekeraar van de tegenpartij. 100% no cure no pay.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Links</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/" className="text-muted-foreground hover:text-primary">Home</Link></li>
                  <li><Link href="/claim-indienen" className="text-muted-foreground hover:text-primary">Claim Indienen</Link></li>
                  <li><Link href="/login" className="text-muted-foreground hover:text-primary">Inloggen</Link></li>
                  <li><Link href="/privacy" className="text-muted-foreground hover:text-primary">Privacy</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Contact</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>Email: info@gratisschadeverhalen.nl</li>
                  <li>Telefoon: 088-1234567</li>
                  <li>Ma-Vr: 09:00 - 17:00</li>
                </ul>
              </div>
            </div>
            <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
              <p>&copy; {new Date().getFullYear()} Gratisschadeverhalen.nl. Alle rechten voorbehouden.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
