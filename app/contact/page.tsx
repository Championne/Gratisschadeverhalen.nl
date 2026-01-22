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
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">Autoschadebureau.nl</span>
          </Link>
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Terug
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="text-center mb-12">
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
                    <p className="text-muted-foreground bg-yellow-100 inline-block px-2 py-1 rounded">
                      [INVULLEN: 088-1234567]
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Email</p>
                    <a 
                      href="mailto:info@gratisschadeverhalen.nl" 
                      className="text-primary hover:underline bg-yellow-100 inline-block px-2 py-1 rounded"
                    >
                      [INVULLEN: info@gratisschadeverhalen.nl]
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Adres</p>
                    <p className="text-muted-foreground bg-yellow-100 inline-block px-2 py-1 rounded">
                      [INVULLEN: Straat 123]<br />
                      [INVULLEN: 1234 AB Plaats]<br />
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

            {/* WhatsApp Contact */}
            <Card className="border-green-200 bg-green-50/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  WhatsApp Contact
                </CardTitle>
                <CardDescription>
                  Direct chatten? Stuur ons een WhatsApp bericht!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Voor snelle vragen kunt u ons ook bereiken via WhatsApp. Wij reageren binnen 24 uur op werkdagen.
                </p>
                <a 
                  href="https://wa.me/[INVULLEN-TELEFOONNUMMER-ZONDER-SPATIES]?text=Hallo,%20ik%20heb%20een%20vraag%20over%20het%20verhalen%20van%20mijn%20autoschade"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <Button variant="outline" className="border-green-600 text-green-700 hover:bg-green-50">
                    <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    Open WhatsApp Chat
                  </Button>
                </a>
                <p className="text-xs text-muted-foreground mt-3 bg-yellow-100 p-2 rounded">
                  💡 <strong>Let op:</strong> Vervang in de link hierboven [INVULLEN-TELEFOONNUMMER-ZONDER-SPATIES] door uw daadwerkelijke WhatsApp nummer (bijv. 31612345678 voor +31 6 12345678)
                </p>
              </CardContent>
            </Card>

            {/* Bedrijfsgegevens */}
            <Card className="bg-blue-50/50 border-blue-200">
              <CardHeader>
                <CardTitle>Bedrijfsgegevens</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="grid grid-cols-2 gap-2">
                  <p className="font-semibold">KvK-nummer:</p>
                  <p className="text-muted-foreground bg-yellow-100 px-2 py-1 rounded">[INVULLEN]</p>
                  
                  <p className="font-semibold">BTW-nummer:</p>
                  <p className="text-muted-foreground bg-yellow-100 px-2 py-1 rounded">[INVULLEN]</p>
                  
                  <p className="font-semibold">IBAN:</p>
                  <p className="text-muted-foreground bg-yellow-100 px-2 py-1 rounded text-xs">[INVULLEN]</p>
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

        {/* Google Maps Placeholder */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Locatie</CardTitle>
            <CardDescription>
              Ons kantoor is gevestigd op het onderstaande adres
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center border-2 border-dashed border-gray-300">
              <div className="text-center space-y-4">
                <MapPin className="h-16 w-16 text-gray-400 mx-auto" />
                <div className="space-y-2">
                  <p className="text-lg font-semibold text-gray-600">Google Maps Placeholder</p>
                  <p className="text-sm text-muted-foreground max-w-md">
                    Zodra het bedrijfsadres bekend is, kan hier een Google Maps iframe worden toegevoegd met de exacte locatie.
                  </p>
                  <div className="bg-yellow-100 p-3 rounded text-xs text-left max-w-xl mx-auto">
                    <p className="font-semibold mb-1">📍 Google Maps Integratie:</p>
                    <p className="text-muted-foreground">
                      1. Ga naar Google Maps<br />
                      2. Zoek je adres<br />
                      3. Klik op "Delen" → "Kaart insluiten"<br />
                      4. Kopieer de iframe HTML<br />
                      5. Vervang dit placeholder met de iframe
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
