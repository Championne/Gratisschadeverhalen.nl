import { Metadata } from "next"
import Link from "next/link"
import { Shield, ArrowLeft, Mail, Phone, MapPin, Clock, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export const metadata: Metadata = {
  title: "Contact",
  description: "Neem contact op met Autoschadebureau.nl voor vragen over uw autoschade claim",
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Contact</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Heeft u vragen over het verhalen van uw autoschade? Neem vrijblijvend contact met ons op!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Formulier */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                Stuur ons een bericht
              </CardTitle>
              <CardDescription>
                Wij reageren binnen 24 uur op werkdagen
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="naam">Naam *</Label>
                  <Input id="naam" placeholder="Uw volledige naam" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" type="email" placeholder="uw.email@voorbeeld.nl" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telefoon">Telefoonnummer</Label>
                  <Input id="telefoon" type="tel" placeholder="06-12345678" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="onderwerp">Onderwerp *</Label>
                  <Input id="onderwerp" placeholder="Waar gaat uw vraag over?" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bericht">Bericht *</Label>
                  <Textarea 
                    id="bericht" 
                    placeholder="Typ hier uw vraag of opmerking..." 
                    rows={6}
                    required 
                  />
                </div>

                <Button type="submit" className="w-full" size="lg">
                  <Mail className="mr-2 h-4 w-4" />
                  Verstuur Bericht
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  Door dit formulier te versturen gaat u akkoord met ons <Link href="/privacy" className="text-primary hover:underline">privacybeleid</Link>.
                </p>
              </form>
            </CardContent>
          </Card>

          {/* Contact Informatie */}
          <div className="space-y-6">
            {/* Direct Contact */}
            <Card>
              <CardHeader>
                <CardTitle>Direct Contact</CardTitle>
                <CardDescription>
                  Liever direct contact? Bel of mail ons!
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Telefoon</p>
                    <a 
                      href="tel:0850607905" 
                      className="text-primary hover:underline"
                    >
                      085 060 7905
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Email</p>
                    <a 
                      href="mailto:info@autoschadebureau.nl" 
                      className="text-primary hover:underline"
                    >
                      info@autoschadebureau.nl
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Adres</p>
                    <p className="text-muted-foreground">
                      Einsteinlaan 28<br />
                      2289 CC Rijswijk<br />
                      Nederland
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Openingstijden</p>
                    <p className="text-muted-foreground">
                      Maandag t/m vrijdag<br />
                      09:00 - 17:00 uur
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Google Maps */}
            <Card>
              <CardHeader>
                <CardTitle>Locatie</CardTitle>
                <CardDescription>
                  Bezoek ons kantoor in Rijswijk
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="w-full h-[400px] rounded-b-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2455.5!2d4.322!3d52.037!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c5b7364db2f6a9%3A0x5e5e5e5e5e5e5e5e!2sEinsteinlaan%2028%2C%202289%20CC%20Rijswijk!5e0!3m2!1snl!2snl!4v1706095845123!5m2!1snl!2snl"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Kantoorlocatie Autoschadebureau.nl - Einsteinlaan 28, Rijswijk"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Snelle Links */}
            <Card>
              <CardHeader>
                <CardTitle>Snelle Links</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="/claim-indienen" className="text-primary hover:underline flex items-center gap-2">
                      → Direct een claim indienen
                    </Link>
                  </li>
                  <li>
                    <Link href="/#faq" className="text-primary hover:underline flex items-center gap-2">
                      → Veelgestelde vragen
                    </Link>
                  </li>
                  <li>
                    <Link href="/privacy" className="text-primary hover:underline flex items-center gap-2">
                      → Privacybeleid
                    </Link>
                  </li>
                  <li>
                    <Link href="/algemene-voorwaarden" className="text-primary hover:underline flex items-center gap-2">
                      → Algemene voorwaarden
                    </Link>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
        </div>
      </main>
    </div>
  )
}
