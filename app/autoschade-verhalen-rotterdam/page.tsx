import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Upload, Phone, Clock, Star, Quote } from "lucide-react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons"

export const metadata: Metadata = {
  title: "Autoschade Verhalen Rotterdam | Gratis Hulp bij Schade",
  description: "Autoschade in Rotterdam? Wij verhalen uw schade gratis bij de tegenpartij. Snelle service in heel Rotterdam en omgeving. U betaalt niets!",
  keywords: [
    "autoschade verhalen rotterdam",
    "schade verhalen rotterdam",
    "autoschade rotterdam",
    "schade tegenpartij rotterdam",
    "gratis schade verhalen rotterdam"
  ],
}

// LocalBusiness Schema voor Rotterdam
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://www.112autoschade.nl/autoschade-verhalen-rotterdam",
  "name": "112autoschade.nl - Rotterdam",
  "description": "Gratis autoschade verhalen in Rotterdam. Wij claimen uw schade bij de tegenpartij - u betaalt niets.",
  "url": "https://www.112autoschade.nl/autoschade-verhalen-rotterdam",
  "telephone": "+31850605357",
  "email": "info@112autoschade.nl",
  "areaServed": {
    "@type": "City",
    "name": "Rotterdam",
    "containedInPlace": {
      "@type": "Country",
      "name": "Netherlands"
    }
  },
  "serviceArea": [
    { "@type": "City", "name": "Rotterdam" },
    { "@type": "City", "name": "Schiedam" },
    { "@type": "City", "name": "Capelle aan den IJssel" },
    { "@type": "City", "name": "Barendrecht" }
  ],
  "priceRange": "Gratis",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "98"
  }
}

export default function RotterdamPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* LocalBusiness Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          
          {/* Hero */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
              <MapPin className="h-4 w-4" />
              <span className="font-medium">Rotterdam en omgeving</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Autoschade Verhalen in Rotterdam
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Als havenstad met het drukste wegennet van Nederland kent Rotterdam veel verkeerssituaties. 
              Of het nu een kop-staartbotsing is bij de Erasmusbrug, schade door vrachtwagens in het havengebied, 
              of een aanrijding in de Maastunnel - wij verhalen uw autoschade gratis bij de tegenpartij.
            </p>
            <Link href="/claim-indienen">
              <Button size="lg" className="text-lg px-8">
                <Upload className="mr-2 h-5 w-5" />
                Schade Melden
              </Button>
            </Link>
          </div>

          {/* Waarom lokaal */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-center">Waarom kiezen Rotterdammers voor ons?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faCircleCheck} className="h-5 w-5 text-green-600" />
                    100% Gratis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    U betaalt niets. Alle kosten worden door de WA-verzekeraar van de tegenpartij betaald.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    Snelle Afhandeling
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Gemiddeld binnen 6 weken uw schadevergoeding. Wij kennen de Rotterdamse situatie.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-primary" />
                    Persoonlijk Contact
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Direct contact met uw dossierbehandelaar. Geen wachtrijen of keuzemenu's.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Veelvoorkomende schades */}
          <section className="mb-12 bg-gray-50 p-8 rounded-lg">
            <h2 className="text-3xl font-bold mb-6">Veelvoorkomende schades in Rotterdam</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold mb-3">Centrum & Kop van Zuid</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Parkeerschade in parkeergarages</li>
                  <li>• Aanrijdingen bij tramlijnen</li>
                  <li>• Schade op drukke kruispunten</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-3">Havengebied & A15</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Vrachtverkeer gerelateerde schade</li>
                  <li>• Schade op industrieterreinen</li>
                  <li>• File-ongevallen</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-3">Rotterdam Zuid</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Parkeerschade in woonwijken</li>
                  <li>• Ongevallen op doorgaande wegen</li>
                  <li>• Schade bij winkelcentra</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-3">Ring & Snelwegen</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Kop-staartbotsingen A20/A16</li>
                  <li>• Invoegongevallen</li>
                  <li>• Schade door wegwerkzaamheden</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Werkgebied */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-center">Ons werkgebied rond Rotterdam</h2>
            <p className="text-center text-muted-foreground mb-6">
              Wij helpen u bij schade in heel Rotterdam en omgeving:
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                "Rotterdam Centrum", "Rotterdam Zuid", "Rotterdam Noord", "Kralingen",
                "Feijenoord", "Overschie", "Hillegersberg", "Hoek van Holland",
                "Capelle a/d IJssel", "Schiedam", "Vlaardingen", "Spijkenisse", "Barendrecht", "Ridderkerk"
              ].map((area) => (
                <span key={area} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                  {area}
                </span>
              ))}
            </div>
          </section>

          {/* Testimonial */}
          <section className="mb-12">
            <Card className="bg-blue-50 border-blue-100">
              <CardContent className="py-8">
                <div className="flex items-start gap-4">
                  <Quote className="h-10 w-10 text-primary/30 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-lg text-gray-700 mb-4 italic">
                      "Werd aangereden op de A15 door een vrachtwagen. Dacht dat het een hoop gedoe zou worden, 
                      maar 112autoschade.nl regelde alles. Mijn schade van €4.200 was binnen 6 weken vergoed. 
                      Top service voor Rotterdammers!"
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-current" />
                        ))}
                      </div>
                      <span className="font-semibold">- Richard K.</span>
                      <span className="text-muted-foreground">| Rotterdam-Kralingen</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* CTA */}
          <Card className="bg-gradient-to-r from-primary to-blue-700 text-white">
            <CardContent className="py-8 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Schade in Rotterdam? Wij regelen het!
              </h2>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Upload uw schadeformulier of foto's en wij nemen binnen 24 uur contact met u op.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/claim-indienen">
                  <Button size="lg" variant="secondary" className="text-lg px-8">
                    <Upload className="mr-2 h-5 w-5" />
                    Schade Melden
                  </Button>
                </Link>
                <Link href="tel:0850605357">
                  <Button size="lg" className="text-lg px-8 bg-white text-primary hover:bg-gray-100">
                    <Phone className="mr-2 h-5 w-5" />
                    085 060 5357
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

        </div>
      </main>
    </div>
  )
}
