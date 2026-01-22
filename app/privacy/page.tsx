import { Metadata } from "next"
import Link from "next/link"
import { Shield, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Privacybeleid",
  description: "Privacybeleid en AVG informatie van Autoschadebureau.nl",
}

export default function PrivacyPage() {
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

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Privacybeleid</h1>
        
        <div className="prose prose-lg max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">1. Introductie</h2>
            <p className="text-muted-foreground">
              Autoschadebureau.nl respecteert de privacy van alle gebruikers van haar website en draagt er zorg voor dat de persoonlijke informatie die u ons verschaft vertrouwelijk wordt behandeld.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">2. Welke gegevens verzamelen wij?</h2>
            <p className="text-muted-foreground mb-4">
              Wij verzamelen de volgende gegevens:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Naam, email adres en telefoonnummer</li>
              <li>Gegevens over het ongeval (datum, plaats, beschrijving)</li>
              <li>Kenteken van de tegenpartij</li>
              <li>Foto&apos;s van de schade</li>
              <li>Europees Schadeformulier (indien beschikbaar)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">3. Waarvoor gebruiken wij uw gegevens?</h2>
            <p className="text-muted-foreground mb-4">
              Uw gegevens worden gebruikt voor:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Het afhandelen van uw schade claim</li>
              <li>Communicatie met u over de voortgang van uw claim</li>
              <li>Het opstellen van een aansprakelijkheidsbrief</li>
              <li>Communicatie met de WA-verzekeraar van de tegenpartij</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">4. Hoe lang bewaren wij uw gegevens?</h2>
            <p className="text-muted-foreground">
              Wij bewaren uw gegevens niet langer dan noodzakelijk voor de doeleinden waarvoor ze zijn verzameld. Voor schade claims betekent dit dat we uw gegevens bewaren tot 7 jaar na afhandeling van de claim (conform wettelijke verplichtingen).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">5. Delen van gegevens met derden</h2>
            <p className="text-muted-foreground">
              Wij delen uw gegevens alleen met:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>De WA-verzekeraar van de tegenpartij (voor claim afhandeling)</li>
              <li>Juridische adviseurs (indien noodzakelijk)</li>
              <li>Wij verkopen uw gegevens nooit aan derden</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">6. Beveiliging</h2>
            <p className="text-muted-foreground">
              Wij nemen passende beveiligingsmaatregelen om misbruik van en ongeautoriseerde toegang tot uw persoonsgegevens te beperken. Al uw gegevens worden versleuteld opgeslagen en via een beveiligde verbinding (HTTPS) verzonden.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">7. Uw rechten</h2>
            <p className="text-muted-foreground mb-4">
              U heeft het recht om:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Inzage te krijgen in de gegevens die wij van u hebben</li>
              <li>Correctie te vragen van onjuiste gegevens</li>
              <li>Verwijdering te vragen van uw gegevens</li>
              <li>Bezwaar te maken tegen verwerking van uw gegevens</li>
              <li>Overdracht te vragen van uw gegevens</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">8. Cookies</h2>
            <p className="text-muted-foreground">
              Wij gebruiken functionele cookies om de website goed te laten werken. Deze cookies hebben geen gevolgen voor uw privacy. We gebruiken analytische cookies om te begrijpen hoe bezoekers onze website gebruiken, zodat we deze kunnen verbeteren.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">9. Contact</h2>
            <p className="text-muted-foreground">
              Voor vragen over uw privacy of dit privacybeleid kunt u contact met ons opnemen:
            </p>
            <div className="mt-4 space-y-2 text-muted-foreground">
              <p><strong>Email:</strong> <span className="bg-yellow-100 px-2 py-1 rounded font-semibold">[INVULLEN: privacy@gratisschadeverhalen.nl]</span></p>
              <p><strong>Telefoon:</strong> <span className="bg-yellow-100 px-2 py-1 rounded font-semibold">[INVULLEN: 088-1234567]</span></p>
              <p><strong>Post:</strong> Autoschadebureau.nl, <span className="bg-yellow-100 px-2 py-1 rounded font-semibold">[INVULLEN: Straat 123, 1234 AB Plaats]</span>, Nederland</p>
              <p className="text-xs italic mt-4">
                💡 <strong>KvK:</strong> <span className="bg-yellow-100 px-2 py-1 rounded">[INVULLEN]</span> • 
                <strong>BTW:</strong> <span className="bg-yellow-100 px-2 py-1 rounded">[INVULLEN]</span>
              </p>
            </div>
          </section>

          <section>
            <p className="text-sm text-muted-foreground italic">
              Laatst bijgewerkt: {new Date().toLocaleDateString('nl-NL', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}
