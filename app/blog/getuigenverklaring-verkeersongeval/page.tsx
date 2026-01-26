import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { ArrowLeft, Users, Upload, CheckCircle, FileText } from "lucide-react"

export const metadata: Metadata = {
  title: "Getuigenverklaring bij Verkeersongeval | Waarom Zo Belangrijk?",
  description: "Een goede getuigenverklaring kan uw claim maken of breken. Leer hoe u getuigen correct laat verklaren en wat u moet documenteren na een ongeval.",
  keywords: [
    "getuigenverklaring verkeersongeval",
    "getuige auto-ongeluk",
    "getuigen verzamelen ongeval",
    "verklaring getuige schade",
    "bewijs verkeersongeval"
  ],
}

export default function BlogPost() {
  return (
    <div className="min-h-screen bg-white">
      <article className="container mx-auto px-4 py-8 max-w-4xl">
        <Breadcrumbs items={[
          { label: "Blog", href: "/blog" },
          { label: "Getuigenverklaring verkeersongeval" }
        ]} />

        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8">
          <ArrowLeft className="h-4 w-4" />
          Terug naar blog
        </Link>

        <header className="mb-12">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-medium">
              Juridisch
            </span>
            <span>•</span>
            <span>6 minuten leestijd</span>
            <span>•</span>
            <span>24 januari 2026</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Getuigenverklaring bij Verkeersongeval: Waarom Zo Belangrijk?
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Bij een geschil over de toedracht van een ongeval kan een getuigenverklaring het 
            verschil maken tussen volledige vergoeding en lege handen.
          </p>
        </header>

        <Card className="bg-green-50 border-green-200 mb-12">
          <CardContent className="pt-6">
            <h2 className="font-bold mb-4 flex items-center gap-2">
              <Users className="h-5 w-5 text-green-600" />
              De kracht van getuigen
            </h2>
            <p className="text-muted-foreground">
              <strong>Een onafhankelijke getuige weegt zwaar.</strong> Verzekeraars en rechters 
              hechten veel waarde aan verklaringen van personen die geen belang hebben bij de uitkomst.
            </p>
          </CardContent>
        </Card>

        <div className="prose prose-lg max-w-none">
          
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Waarom zijn getuigen zo belangrijk?</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Bij veel verkeersongevallen is er discussie over de toedracht. Beide partijen hebben 
              hun eigen versie van het verhaal. In zulke gevallen kan een getuige:
            </p>
            <ul className="space-y-3 text-muted-foreground mb-6">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-1" />
                <span><strong>De doorslag geven</strong> bij een woord-tegen-woord situatie</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-1" />
                <span><strong>50/50 beslissingen voorkomen</strong> door de schuld duidelijk aan te wijzen</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-1" />
                <span><strong>Uw verhaal ondersteunen</strong> met onafhankelijke waarnemingen</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-1" />
                <span><strong>Details vastleggen</strong> die u zelf misschien bent vergeten</span>
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Direct na het ongeval: getuigen benaderen</h2>
            
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">1</div>
                <div>
                  <h3 className="font-bold mb-2">Kijk om u heen</h3>
                  <p className="text-muted-foreground">
                    Wie stond er op de stoep? Wie zat er in een geparkeerde auto? Wie fietste voorbij? 
                    Spreek deze mensen direct aan.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">2</div>
                <div>
                  <h3 className="font-bold mb-2">Vraag vriendelijk om medewerking</h3>
                  <p className="text-muted-foreground">
                    "Heeft u gezien wat er gebeurde? Zou u bereid zijn een verklaring af te leggen? 
                    Uw hulp zou enorm waardevol zijn."
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">3</div>
                <div>
                  <h3 className="font-bold mb-2">Noteer contactgegevens</h3>
                  <p className="text-muted-foreground">
                    Vraag om naam, telefoonnummer en eventueel e-mailadres. Noteer ook het tijdstip 
                    en waar de getuige stond.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">4</div>
                <div>
                  <h3 className="font-bold mb-2">Maak een korte opname (optioneel)</h3>
                  <p className="text-muted-foreground">
                    Met toestemming van de getuige kunt u een korte video-verklaring opnemen op uw 
                    telefoon. Dit is extra zekerheid.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Wat moet in een getuigenverklaring staan?</h2>
            
            <Card className="bg-blue-50 border-blue-200 mb-6">
              <CardContent className="pt-6">
                <h4 className="font-bold mb-4 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  Essentiële onderdelen
                </h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span><strong>Persoonsgegevens:</strong> Volledige naam, adres, geboortedatum</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span><strong>Datum en tijd:</strong> Wanneer vond het ongeval plaats?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span><strong>Locatie:</strong> Waar stond de getuige? Wat was het zicht?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span><strong>Waarnemingen:</strong> Wat zag de getuige precies gebeuren?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span><strong>Handtekening:</strong> Ondertekend en gedateerd</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <div className="border p-4 rounded-lg bg-gray-50">
              <h4 className="font-bold mb-3">Voorbeeldtekst getuigenverklaring</h4>
              <p className="text-sm text-muted-foreground italic">
                "Ondergetekende, [naam], geboren op [datum] te [plaats], wonende te [adres], 
                verklaart het volgende te hebben waargenomen:
                <br /><br />
                Op [datum] omstreeks [tijd] bevond ik mij op [locatie]. Ik zag dat [beschrijving van 
                wat de getuige waarnam, zo specifiek mogelijk].
                <br /><br />
                Naar waarheid opgemaakt en ondertekend te [plaats] op [datum].
                <br /><br />
                Handtekening: _______________"
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Soorten getuigen en hun waarde</h2>
            
            <div className="space-y-4">
              <Card className="border-green-200">
                <CardContent className="pt-6">
                  <h4 className="font-bold mb-2 text-green-700">🌟 Onafhankelijke getuigen (meest waardevol)</h4>
                  <p className="text-muted-foreground text-sm">
                    Voorbijgangers, andere weggebruikers, omwonenden die geen relatie hebben met 
                    de betrokken partijen. Hun verklaring weegt het zwaarst.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-amber-200">
                <CardContent className="pt-6">
                  <h4 className="font-bold mb-2 text-amber-700">⚡ Passagiers (waardevol, maar partijdig)</h4>
                  <p className="text-muted-foreground text-sm">
                    Uw passagiers kunnen getuigen, maar verzekeraars weten dat zij mogelijk 
                    partijdig zijn. Hun verklaring ondersteunt, maar is niet doorslaggevend.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-blue-200">
                <CardContent className="pt-6">
                  <h4 className="font-bold mb-2 text-blue-700">📹 Camera's (objectief bewijs)</h4>
                  <p className="text-muted-foreground text-sm">
                    Dashcams, beveiligingscamera's van winkels, of verkeerscamera's zijn 
                    uitstekend bewijs. Check of er camera's in de buurt hingen!
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Geen getuigen? Dit kunt u doen</h2>
            
            <ul className="space-y-4 text-muted-foreground">
              <li className="border-l-4 border-primary pl-4">
                <strong>Check beveiligingscamera's</strong> - Vraag bij nabijgelegen winkels, 
                bedrijven of woningen of zij camerabeelden hebben.
              </li>
              <li className="border-l-4 border-primary pl-4">
                <strong>Plaats een oproep</strong> - Een berichtje op sociale media of een 
                briefje bij de lokale supermarkt kan getuigen opleveren.
              </li>
              <li className="border-l-4 border-primary pl-4">
                <strong>Contacteer de politie</strong> - Als de politie ter plaatse was, 
                hebben zij mogelijk getuigen genoteerd.
              </li>
              <li className="border-l-4 border-primary pl-4">
                <strong>Fysiek bewijs</strong> - Remsporen, schadepatronen en foto's kunnen 
                ook de toedracht ondersteunen.
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Veelgestelde vragen</h2>
            
            <div className="space-y-6">
              <div className="border-l-4 border-primary pl-4">
                <h4 className="font-bold mb-2">Kan een getuige weigeren een verklaring af te leggen?</h4>
                <p className="text-muted-foreground">
                  Ja, niemand is verplicht om mee te werken. Wees daarom vriendelijk en leg uit 
                  waarom hun hulp belangrijk is. De meeste mensen willen helpen.
                </p>
              </div>
              
              <div className="border-l-4 border-primary pl-4">
                <h4 className="font-bold mb-2">Moet een getuige naar de rechtbank?</h4>
                <p className="text-muted-foreground">
                  In de meeste gevallen niet. Een schriftelijke verklaring volstaat. Alleen bij 
                  een rechtszaak kan een getuige worden opgeroepen.
                </p>
              </div>

              <div className="border-l-4 border-primary pl-4">
                <h4 className="font-bold mb-2">Wat als de getuige zich later bedenkt?</h4>
                <p className="text-muted-foreground">
                  Een eenmaal ondertekende verklaring blijft geldig. Daarom is het belangrijk 
                  om zo snel mogelijk na het ongeval een schriftelijke verklaring te verkrijgen.
                </p>
              </div>

              <div className="border-l-4 border-primary pl-4">
                <h4 className="font-bold mb-2">Mag ik mijn passagier als getuige opgeven?</h4>
                <p className="text-muted-foreground">
                  Ja, maar wees eerlijk over de relatie. Een verzwijging kan uw geloofwaardigheid 
                  schaden. Passagiersverklaringen zijn ondersteunend bewijs.
                </p>
              </div>
            </div>
          </section>

        </div>

        {/* CTA */}
        <Card className="bg-gradient-to-r from-primary to-blue-700 text-white mt-12">
          <CardContent className="py-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Heeft u getuigen? Wij verwerken ze in uw claim
            </h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Upload uw schadeformulier samen met eventuele getuigenverklaringen. 
              Wij zorgen dat alles correct wordt ingediend.
            </p>
            <Link href="/claim-indienen">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                <Upload className="mr-2 h-5 w-5" />
                Claim Indienen met Bewijs
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Related Articles */}
        <section className="mt-12">
          <h3 className="text-xl font-bold mb-4">Gerelateerde artikelen</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/blog/schuldvraag-verkeersongeval">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardContent className="pt-6">
                  <p className="font-semibold">Schuldvraag bij verkeersongeval</p>
                  <p className="text-sm text-muted-foreground">Hoe wordt schuld vastgesteld?</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/blog/goede-fotos-autoschade">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardContent className="pt-6">
                  <p className="font-semibold">Goede foto's maken na ongeval</p>
                  <p className="text-sm text-muted-foreground">Fotografeer de juiste details</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>

      </article>
    </div>
  )
}
