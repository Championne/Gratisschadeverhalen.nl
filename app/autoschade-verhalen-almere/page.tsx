import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Upload, Phone, Clock, Star, Quote } from "lucide-react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons"

export const metadata: Metadata = {
  title: "Autoschade Verhalen Almere | Gratis Hulp bij Schade",
  description: "Autoschade in Almere? Wij verhalen uw schade gratis bij de tegenpartij. Snelle service in heel Almere en omgeving. U betaalt niets!",
  keywords: [
    "autoschade verhalen almere",
    "schade verhalen almere",
    "autoschade almere",
    "schade tegenpartij almere",
    "gratis schade verhalen almere"
  ],
}

// LocalBusiness Schema voor Almere
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://www.autoschadebureau.nl/autoschade-verhalen-almere",
  "name": "Autoschadebureau.nl - Almere",
  "description": "Gratis autoschade verhalen in Almere. Wij claimen uw schade bij de tegenpartij - u betaalt niets.",
  "url": "https://www.autoschadebureau.nl/autoschade-verhalen-almere",
  "telephone": "+31850605357",
  "email": "info@autoschadebureau.nl",
  "areaServed": {
    "@type": "City",
    "name": "Almere",
    "containedInPlace": {
      "@type": "Country",
      "name": "Netherlands"
    }
  },
  "serviceArea": [
    { "@type": "City", "name": "Almere" },
    { "@type": "City", "name": "Lelystad" },
    { "@type": "City", "name": "Zeewolde" },
    { "@type": "City", "name": "Huizen" }
  ],
  "priceRange": "Gratis",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.7",
    "reviewCount": "58"
  }
}

export default function AlmerePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* LocalBusiness Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
              <MapPin className="h-4 w-4" />
              <span className="font-medium">Almere en omgeving</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Autoschade Verhalen in Almere
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              De snelst groeiende stad van Nederland met zijn vele forensen naar Amsterdam - 
              de A6 staat bekend om files en kop-staartbotsingen. Of u nu schade heeft opgelopen 
              op de Stadsring, bent aangereden in winkelcentrum Almere Centrum, of parkeerschade heeft 
              in een van de nieuwbouwwijken - wij verhalen uw schade gratis.
            </p>
            <Link href="/claim-indienen">
              <Button size="lg" className="text-lg px-8">
                <Upload className="mr-2 h-5 w-5" />
                Schade Melden
              </Button>
            </Link>
          </div>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-center">Waarom kiezen Almeerders voor ons?</h2>
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
                    Gemiddeld binnen 6 weken uw schadevergoeding. Wij kennen de Almeerse situatie.
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

          <section className="mb-12 bg-gray-50 p-8 rounded-lg">
            <h2 className="text-3xl font-bold mb-6">Veelvoorkomende schades in Almere</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold mb-3">Almere Stad Centrum</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Parkeerschade in winkelgebied</li>
                  <li>• Aanrijdingen op stadsring</li>
                  <li>• Schade bij parkeergarages</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-3">Almere Buiten & Poort</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Woonwijk parkeerschade</li>
                  <li>• Nieuwbouw gerelateerde schade</li>
                  <li>• Schade op doorgaande wegen</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-3">A6 & A27</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Kop-staartbotsingen richting Amsterdam</li>
                  <li>• Invoegongevallen</li>
                  <li>• File-schade woon-werkverkeer</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-3">Almere Haven</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Parkeerschade oude centrum</li>
                  <li>• Schade bij jachthaven</li>
                  <li>• Recreatieverkeer ongevallen</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-center">Ons werkgebied rond Almere</h2>
            <p className="text-center text-muted-foreground mb-6">
              Wij helpen u bij schade in heel Almere en omgeving:
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                "Almere Stad", "Almere Buiten", "Almere Haven", "Almere Poort",
                "Almere Hout", "Almere Pampus", "Lelystad", "Zeewolde",
                "Huizen", "Naarden", "Bussum", "Hilversum"
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
                      "Elke dag sta ik in de file op de A6 naar Amsterdam. Toen ik van achteren werd aangereden 
                      bij de afrit Almere Stad dacht ik: dit wordt een gedoe. Maar Autoschadebureau.nl nam alles 
                      over. €2.400 vergoed, zonder zorgen!"
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-current" />
                        ))}
                      </div>
                      <span className="font-semibold">- Linda G.</span>
                      <span className="text-muted-foreground">| Almere Buiten</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <Card className="bg-gradient-to-r from-primary to-blue-700 text-white">
            <CardContent className="py-8 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Schade in Almere? Wij regelen het!
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
                  <Button size="lg" variant="outline" className="text-lg px-8 border-white text-white hover:bg-white/10">
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
