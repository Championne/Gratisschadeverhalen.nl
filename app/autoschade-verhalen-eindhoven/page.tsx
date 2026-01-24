import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Upload, Phone, Clock, Star, Quote } from "lucide-react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons"

export const metadata: Metadata = {
  title: "Autoschade Verhalen Eindhoven | Gratis Hulp bij Schade",
  description: "Autoschade in Eindhoven? Wij verhalen uw schade gratis bij de tegenpartij. Snelle service in heel Eindhoven en omgeving. U betaalt niets!",
  keywords: [
    "autoschade verhalen eindhoven",
    "schade verhalen eindhoven",
    "autoschade eindhoven",
    "schade tegenpartij eindhoven",
    "gratis schade verhalen eindhoven"
  ],
}

// LocalBusiness Schema voor Eindhoven
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://www.autoschadebureau.nl/autoschade-verhalen-eindhoven",
  "name": "Autoschadebureau.nl - Eindhoven",
  "description": "Gratis autoschade verhalen in Eindhoven. Wij claimen uw schade bij de tegenpartij - u betaalt niets.",
  "url": "https://www.autoschadebureau.nl/autoschade-verhalen-eindhoven",
  "telephone": "+31850605357",
  "email": "info@autoschadebureau.nl",
  "areaServed": {
    "@type": "City",
    "name": "Eindhoven",
    "containedInPlace": {
      "@type": "Country",
      "name": "Netherlands"
    }
  },
  "serviceArea": [
    { "@type": "City", "name": "Eindhoven" },
    { "@type": "City", "name": "Veldhoven" },
    { "@type": "City", "name": "Best" },
    { "@type": "City", "name": "Helmond" }
  ],
  "priceRange": "Gratis",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.7",
    "reviewCount": "64"
  }
}

export default function EindhovenPage() {
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
              <span className="font-medium">Eindhoven en omgeving</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Autoschade Verhalen in Eindhoven
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              De Brainport-regio met zijn High Tech Campus, het PSV stadion en de drukke A2 - 
              Eindhoven kent veel verkeersbewegingen. Of u nu schade heeft opgelopen bij Strijp-S, 
              bent aangereden op de Kennedylaan, of parkeerschade heeft bij de Heuvel - wij verhalen uw schade gratis.
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
            <h2 className="text-3xl font-bold mb-6 text-center">Waarom kiezen Eindhovenaren voor ons?</h2>
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
                    Gemiddeld binnen 6 weken uw schadevergoeding. Wij kennen de Eindhovense situatie.
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
            <h2 className="text-3xl font-bold mb-6">Veelvoorkomende schades in Eindhoven</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold mb-3">Centrum & Binnenstad</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Parkeerschade bij 18 Septemberplein</li>
                  <li>• Aanrijdingen op drukke kruispunten</li>
                  <li>• Schade in parkeergarages</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-3">High Tech Campus & Strijp</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Woon-werkverkeer ongevallen</li>
                  <li>• Parkeerschade bedrijventerreinen</li>
                  <li>• Schade bij evenementen Strijp-S</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-3">Ring & A2/A67</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Kop-staartbotsingen in files</li>
                  <li>• Invoegongevallen</li>
                  <li>• Schade door wegwerkzaamheden</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-3">Woensel & Tongelre</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Woonwijk parkeerschade</li>
                  <li>• Schade bij winkelcentra</li>
                  <li>• Ongevallen op doorgaande wegen</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Werkgebied */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-center">Ons werkgebied rond Eindhoven</h2>
            <p className="text-center text-muted-foreground mb-6">
              Wij helpen u bij schade in heel Eindhoven en omgeving:
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                "Eindhoven Centrum", "Strijp", "Woensel", "Tongelre",
                "Stratum", "Gestel", "Meerhoven", "Acht",
                "Veldhoven", "Best", "Geldrop", "Nuenen", "Son en Breugel", "Helmond"
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
                      "Mijn auto stond geparkeerd bij de High Tech Campus toen een collega tegen mijn bumper reed. 
                      Autoschadebureau.nl heeft de volledige schade van €2.100 verhaald zonder dat ik er iets 
                      voor hoefde te betalen. Ideaal voor drukke mensen!"
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-current" />
                        ))}
                      </div>
                      <span className="font-semibold">- Jeroen H.</span>
                      <span className="text-muted-foreground">| Strijp</span>
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
                Schade in Eindhoven? Wij regelen het!
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
