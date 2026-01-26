import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { ArrowLeft, Scale, Upload, AlertTriangle, CheckCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Schuldvraag bij Verkeersongeval | Hoe Wordt Schuld Vastgesteld?",
  description: "Ontdek hoe verzekeraars en juristen schuld bepalen bij verkeersongevallen. Van 50/50 tot 100% aansprakelijkheid - alle scenario's uitgelegd met praktische voorbeelden.",
  keywords: [
    "schuldvraag verkeersongeval",
    "wie is schuldig ongeval",
    "aansprakelijkheid vaststellen",
    "50/50 schade",
    "schuld bepalen auto-ongeluk"
  ],
}

export default function BlogPost() {
  return (
    <div className="min-h-screen bg-white">
      <article className="container mx-auto px-4 py-8 max-w-4xl">
        <Breadcrumbs items={[
          { label: "Blog", href: "/blog" },
          { label: "Schuldvraag verkeersongeval" }
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
            <span>7 minuten leestijd</span>
            <span>•</span>
            <span>24 januari 2026</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Schuldvraag bij Verkeersongeval: Hoe Wordt Schuld Vastgesteld?
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Bij elk verkeersongeval moet worden bepaald wie aansprakelijk is. Dit bepaalt wie de 
            schade moet vergoeden. Maar hoe wordt die schuldvraag eigenlijk beantwoord?
          </p>
        </header>

        <Card className="bg-blue-50 border-blue-200 mb-12">
          <CardContent className="pt-6">
            <h2 className="font-bold mb-4 flex items-center gap-2">
              <Scale className="h-5 w-5 text-blue-600" />
              Het belangrijkste principe
            </h2>
            <p className="text-muted-foreground">
              <strong>De verkeersregels bepalen de schuldvraag.</strong> Wie een verkeersregel overtreedt 
              (voorrang negeren, te hard rijden, door rood rijden) is in principe aansprakelijk voor de schade.
            </p>
          </CardContent>
        </Card>

        <div className="prose prose-lg max-w-none">
          
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Hoe bepalen verzekeraars de schuld?</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Wanneer u een schade meldt, beoordeelt de verzekeraar de aansprakelijkheid aan de hand van:
            </p>
            <ul className="space-y-3 text-muted-foreground mb-6">
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">1.</span>
                <span><strong>Het Europees Schadeformulier</strong> - De tekening en omschrijving van het ongeval</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">2.</span>
                <span><strong>Verkeersregels</strong> - Wie had voorrang? Was er een stopteken?</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">3.</span>
                <span><strong>Foto's en bewijs</strong> - Schadepatronen, remsporen, camerabeelden</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">4.</span>
                <span><strong>Getuigenverklaringen</strong> - Onafhankelijke waarnemingen</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">5.</span>
                <span><strong>Politierapport</strong> - Indien de politie ter plaatse was</span>
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Veelvoorkomende scenario's en aansprakelijkheid</h2>
            
            <div className="space-y-6">
              <Card className="border-green-200">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold mb-2">Kop-staartbotsing (achterop gereden)</h3>
                      <p className="text-muted-foreground text-sm">
                        <strong>100% schuld bij de achteroprijder.</strong> Elke bestuurder moet voldoende 
                        afstand houden om tijdig te kunnen stoppen.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-200">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold mb-2">Voorrang negeren op kruispunt</h3>
                      <p className="text-muted-foreground text-sm">
                        <strong>100% schuld bij wie voorrang negeerde.</strong> Verkeersborden en 
                        haaientanden bepalen wie voorrang moet verlenen.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-amber-200">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-6 w-6 text-amber-600 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold mb-2">Gelijkwaardige kruising</h3>
                      <p className="text-muted-foreground text-sm">
                        <strong>Voorrang van rechts geldt.</strong> Wie van links komt en geen voorrang 
                        verleent is 100% aansprakelijk. Bij onduidelijkheid soms 50/50.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-amber-200">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-6 w-6 text-amber-600 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold mb-2">Inhalen en botsing</h3>
                      <p className="text-muted-foreground text-sm">
                        <strong>Meestal schuld bij de inhaler.</strong> Inhalen mag alleen als het veilig 
                        kan. Maar als de ander plotseling linksaf slaat kan het anders liggen.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-red-200">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <Scale className="h-6 w-6 text-red-600 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold mb-2">Parkeerplaats aanrijding</h3>
                      <p className="text-muted-foreground text-sm">
                        <strong>Vaak complex.</strong> Wie achteruitrijdt moet extra opletten. Maar in 
                        parkeergarages gelden speciale regels - vaak 50/50 bij onduidelijkheid.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Wat is 50/50 schade?</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Bij 50/50 schade zijn beide partijen voor de helft aansprakelijk. Dit gebeurt wanneer:
            </p>
            <ul className="space-y-3 text-muted-foreground mb-6">
              <li className="flex items-start gap-3">
                <span className="text-amber-500 font-bold">•</span>
                <span>Beide partijen een verkeersfout maakten</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-500 font-bold">•</span>
                <span>De toedracht niet te achterhalen is</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-500 font-bold">•</span>
                <span>Er geen getuigen of bewijs zijn</span>
              </li>
            </ul>
            
            <Card className="bg-amber-50 border-amber-200">
              <CardContent className="pt-6">
                <p className="text-muted-foreground">
                  <strong>Let op:</strong> Bij 50/50 krijgt u maar de helft van uw schade vergoed. 
                  Daarom is goed bewijs (foto's, getuigen) zo belangrijk!
                </p>
              </CardContent>
            </Card>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">De omkering van de bewijslast</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              In sommige situaties geldt een <strong>omgekeerde bewijslast</strong>. Dit betekent dat 
              de tegenpartij moet bewijzen dat zij NIET schuldig zijn:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="border p-4 rounded-lg">
                <h4 className="font-bold mb-3">🚗 vs 🚴 Auto tegen fietser</h4>
                <p className="text-sm text-muted-foreground">
                  De automobilist is in principe aansprakelijk, tenzij bewezen wordt dat de 
                  fietser schuld had (Artikel 185 WVW).
                </p>
              </div>
              <div className="border p-4 rounded-lg">
                <h4 className="font-bold mb-3">🚗 vs 🚶 Auto tegen voetganger</h4>
                <p className="text-sm text-muted-foreground">
                  Ook hier geldt dat de automobilist moet bewijzen niet schuldig te zijn aan 
                  het ongeval.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Wat als de verzekeraars het niet eens zijn?</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Als de verzekeraars van beide partijen een andere mening hebben over de schuldvraag, 
              zijn er verschillende oplossingen:
            </p>
            <ol className="space-y-4 text-muted-foreground">
              <li className="border-l-4 border-primary pl-4">
                <strong>1. Onderhandeling</strong> - De verzekeraars proberen er samen uit te komen
              </li>
              <li className="border-l-4 border-primary pl-4">
                <strong>2. Geschillencommissie</strong> - Een onafhankelijke commissie beoordeelt de zaak
              </li>
              <li className="border-l-4 border-primary pl-4">
                <strong>3. Rechter</strong> - Uiteindelijk kan de rechter beslissen, maar dit duurt lang en kost geld
              </li>
            </ol>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Tips om de schuldvraag in uw voordeel te beslechten</h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border p-4 rounded-lg bg-green-50">
                <h4 className="font-bold mb-3 text-green-700">✓ Doe dit WEL</h4>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Maak direct foto's van de situatie</li>
                  <li>• Noteer gegevens van getuigen</li>
                  <li>• Vul het schadeformulier nauwkeurig in</li>
                  <li>• Beschrijf exact wat er gebeurde</li>
                  <li>• Bewaar alle documenten</li>
                </ul>
              </div>
              <div className="border p-4 rounded-lg bg-red-50">
                <h4 className="font-bold mb-3 text-red-700">✗ Doe dit NIET</h4>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Schuld bekennen ter plekke</li>
                  <li>• "Sorry" zeggen (kan als schuldbekentenis worden gezien)</li>
                  <li>• Documenten ondertekenen die u niet begrijpt</li>
                  <li>• Te lang wachten met melden</li>
                  <li>• Bewijs weggooien</li>
                </ul>
              </div>
            </div>
          </section>

        </div>

        {/* CTA */}
        <Card className="bg-gradient-to-r from-primary to-blue-700 text-white mt-12">
          <CardContent className="py-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Onzeker over de schuldvraag? Wij helpen gratis
            </h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Upload uw schadeformulier en wij beoordelen kosteloos of u recht heeft op schadevergoeding. 
              Geen vergoeding = geen kosten.
            </p>
            <Link href="/claim-indienen">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                <Upload className="mr-2 h-5 w-5" />
                Gratis Claim Beoordelen
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Related Articles */}
        <section className="mt-12">
          <h3 className="text-xl font-bold mb-4">Gerelateerde artikelen</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/blog/aansprakelijkheid-verkeersongeval">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardContent className="pt-6">
                  <p className="font-semibold">Aansprakelijkheid bij verkeersongevallen</p>
                  <p className="text-sm text-muted-foreground">Juridische achtergrond</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/blog/europees-schadeformulier-invullen">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardContent className="pt-6">
                  <p className="font-semibold">Europees Schadeformulier invullen</p>
                  <p className="text-sm text-muted-foreground">Stap voor stap uitleg</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>

      </article>
    </div>
  )
}
