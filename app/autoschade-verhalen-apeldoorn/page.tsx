import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Upload, Phone, Clock, Star, Quote } from "lucide-react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons"

export const metadata: Metadata = {
  title: "Autoschade Verhalen Apeldoorn | Gratis Hulp bij Schade",
  description: "Autoschade in Apeldoorn? Wij verhalen uw schade gratis bij de tegenpartij. Snelle service in heel Apeldoorn en omgeving. U betaalt niets!",
  keywords: [
    "autoschade verhalen apeldoorn",
    "schade verhalen apeldoorn",
    "autoschade apeldoorn",
    "schade tegenpartij apeldoorn",
    "gratis schade verhalen apeldoorn"
  ],
}

// LocalBusiness Schema voor Apeldoorn
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://www.112autoschade.nl/autoschade-verhalen-apeldoorn",
  "name": "112autoschade.nl - Apeldoorn",
  "description": "Gratis autoschade verhalen in Apeldoorn. Wij claimen uw schade bij de tegenpartij - u betaalt niets.",
  "url": "https://www.112autoschade.nl/autoschade-verhalen-apeldoorn",
  "telephone": "+31850605357",
  "email": "info@112autoschade.nl",
  "areaServed": {
    "@type": "City",
    "name": "Apeldoorn",
    "containedInPlace": {
      "@type": "Country",
      "name": "Netherlands"
    }
  },
  "serviceArea": [
    { "@type": "City", "name": "Apeldoorn" },
    { "@type": "City", "name": "Deventer" },
    { "@type": "City", "name": "Zutphen" },
    { "@type": "City", "name": "Epe" }
  ],
  "priceRange": "Gratis",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "32"
  }
}

export default function ApeldoornPage() {
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
              <span className="font-medium">Apeldoorn en omgeving</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Autoschade Verhalen in Apeldoorn
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              De groene stad aan de Veluwe met druk verkeer op de A1 en A50, recreatieverkeer naar 
              de Apenheul en het Paleis Het Loo - Apeldoorn kent diverse verkeerssituaties. 
              Of u nu schade heeft opgelopen in het centrum, bent aangereden op de Laan van Malkenschoten, 
              of wildschade heeft op de Veluwe - wij verhalen uw schade gratis.
            </p>
            <Link href="/claim-indienen">
              <Button size="lg" className="text-lg px-8">
                <Upload className="mr-2 h-5 w-5" />
                Schade Melden
              </Button>
            </Link>
          </div>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-center">Waarom kiezen Apeldoorners voor ons?</h2>
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
                    Gemiddeld binnen 6 weken uw schadevergoeding. Wij kennen de Apeldoornse situatie.
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
            <h2 className="text-3xl font-bold mb-6">Veelvoorkomende schades in Apeldoorn</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold mb-3">Centrum & Binnenstad</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Parkeerschade bij winkels</li>
                  <li>• Aanrijdingen in winkelgebied</li>
                  <li>• Schade bij parkeergarages</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-3">De Maten & Zuidbroek</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Woonwijk parkeerschade</li>
                  <li>• Schade bij winkelcentra</li>
                  <li>• Ongevallen op rondwegen</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-3">A1 & A50</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Kop-staartbotsingen in files</li>
                  <li>• Invoegongevallen</li>
                  <li>• Schade door wegwerkzaamheden</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-3">Veluwe & Omgeving</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Wild-aanrijdingen</li>
                  <li>• Recreatieverkeer schade</li>
                  <li>• Provinciale wegen ongevallen</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-center">Ons werkgebied rond Apeldoorn</h2>
            <p className="text-center text-muted-foreground mb-6">
              Wij helpen u bij schade in heel Apeldoorn en omgeving:
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                "Apeldoorn Centrum", "De Maten", "Ugchelen", "Zuidbroek",
                "Berg en Bos", "Orden", "Zevenhuizen", "Osseveld",
                "Deventer", "Zutphen", "Epe", "Vaassen"
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
                      "Een hert sprong voor mijn auto op de Veluwe. De schade was fors maar de tegenpartij 
                      was lastig te achterhalen. 112autoschade.nl vond uit dat een ander voertuig het 
                      hert had opgejaagd. Uiteindelijk €3.800 vergoed!"
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-current" />
                        ))}
                      </div>
                      <span className="font-semibold">- Henk B.</span>
                      <span className="text-muted-foreground">| Apeldoorn-Ugchelen</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <Card className="bg-gradient-to-r from-primary to-blue-700 text-white">
            <CardContent className="py-8 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Schade in Apeldoorn? Wij regelen het!
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
