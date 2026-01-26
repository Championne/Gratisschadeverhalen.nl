import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { ArrowLeft, User, Upload, AlertTriangle, Scale } from "lucide-react"

export const metadata: Metadata = {
  title: "Aangereden door Minderjarige Bestuurder | Wie Is Aansprakelijk?",
  description: "Bijzondere situatie met minderjarige veroorzaker? Ontdek wie aansprakelijk is - de jongere zelf of de ouders - en hoe u uw schade vergoed krijgt.",
  keywords: [
    "minderjarige bestuurder aansprakelijk",
    "aangereden door kind",
    "schade door minderjarige",
    "ouders aansprakelijk ongeval",
    "jonge bestuurder schade"
  ],
}

export default function BlogPost() {
  return (
    <div className="min-h-screen bg-white">
      <article className="container mx-auto px-4 py-8 max-w-4xl">
        <Breadcrumbs items={[
          { label: "Blog", href: "/blog" },
          { label: "Aansprakelijkheid minderjarige bestuurder" }
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
            <span>5 minuten leestijd</span>
            <span>•</span>
            <span>24 januari 2026</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Aangereden door Minderjarige Bestuurder: Wie Is Aansprakelijk?
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Een 16-jarige op een scooter, een kind op de fiets, of zelfs een minderjarige in 
            een auto - wie betaalt de schade? De juridische situatie is complexer dan u denkt.
          </p>
        </header>

        <Card className="bg-blue-50 border-blue-200 mb-12">
          <CardContent className="pt-6">
            <h2 className="font-bold mb-4 flex items-center gap-2">
              <Scale className="h-5 w-5 text-blue-600" />
              Het belangrijkste principe
            </h2>
            <p className="text-muted-foreground">
              <strong>Bij minderjarige bestuurders (jonger dan 18) zijn vaak de ouders 
              mede-aansprakelijk.</strong> Dit hangt af van de leeftijd en de omstandigheden.
            </p>
          </CardContent>
        </Card>

        <div className="prose prose-lg max-w-none">
          
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Aansprakelijkheid per leeftijdscategorie</h2>
            
            <div className="space-y-6">
              <Card className="border-l-4 border-l-red-500">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-xl font-bold text-red-600">&lt;14</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Kinderen jonger dan 14 jaar</h3>
                      <p className="text-muted-foreground mt-2">
                        <strong>Niet zelf aansprakelijk.</strong> Kinderen onder de 14 kunnen 
                        juridisch geen onrechtmatige daad plegen. De ouders zijn volledig 
                        aansprakelijk voor de schade die hun kind veroorzaakt.
                      </p>
                      <p className="text-sm text-muted-foreground mt-2 italic">
                        Dit heet "risicoaansprakelijkheid" - ouders zijn aansprakelijk ook als 
                        zij geen schuld hebben.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-amber-500">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-xl font-bold text-amber-600">14-15</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Kinderen van 14 en 15 jaar</h3>
                      <p className="text-muted-foreground mt-2">
                        <strong>Het kind én de ouders kunnen aansprakelijk zijn.</strong> Het kind 
                        kan zelf aansprakelijk worden gesteld, maar de ouders zijn mede-aansprakelijk 
                        als zij onvoldoende toezicht hebben gehouden.
                      </p>
                      <p className="text-sm text-muted-foreground mt-2 italic">
                        In de praktijk wordt vaak zowel het kind als de ouders aangesproken.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-xl font-bold text-green-600">16-17</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Jongeren van 16 en 17 jaar</h3>
                      <p className="text-muted-foreground mt-2">
                        <strong>Het kind is zelf aansprakelijk.</strong> Ouders zijn niet meer 
                        automatisch mede-aansprakelijk. Wel kan de jongere vaak terugvallen op 
                        de WA-verzekering (scooter, brommer) of de AVP van de ouders.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Veelvoorkomende situaties</h2>
            
            <div className="space-y-6">
              <div className="border-l-4 border-primary pl-4">
                <h4 className="font-bold mb-2">🛵 Minderjarige op scooter/brommer</h4>
                <p className="text-muted-foreground">
                  Goed nieuws: een scooter of brommer moet WA-verzekerd zijn. U claimt bij de 
                  verzekeraar van het voertuig, ongeacht de leeftijd van de bestuurder. Dit is 
                  dezelfde procedure als bij een volwassene.
                </p>
              </div>
              
              <div className="border-l-4 border-primary pl-4">
                <h4 className="font-bold mb-2">🚴 Kind op de fiets</h4>
                <p className="text-muted-foreground">
                  Een fiets hoeft niet verzekerd te zijn. U moet de schade verhalen op het kind 
                  of de ouders. Vaak hebben ouders een Aansprakelijkheidsverzekering Particulieren 
                  (AVP) die dit dekt.
                </p>
              </div>

              <div className="border-l-4 border-primary pl-4">
                <h4 className="font-bold mb-2">🚗 Minderjarige in auto (zonder rijbewijs)</h4>
                <p className="text-muted-foreground">
                  Een bijzondere situatie. De auto is wel WA-verzekerd, maar de verzekeraar kan 
                  de schade mogelijk verhalen op de eigenaar (die de auto beschikbaar stelde) 
                  of de ouders.
                </p>
              </div>

              <div className="border-l-4 border-primary pl-4">
                <h4 className="font-bold mb-2">🛹 Skater/stepper veroorzaakt schade</h4>
                <p className="text-muted-foreground">
                  Dezelfde regels als bij fietsers. De AVP-verzekering van de ouders is hier 
                  de aangewezen plek om te claimen.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Hoe verhaalt u de schade?</h2>
            
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">1</div>
                <div>
                  <h3 className="font-bold mb-2">Verzamel gegevens</h3>
                  <p className="text-muted-foreground">
                    Vraag naar de naam, het adres en indien mogelijk de verzekeringsgegevens 
                    van de ouders. Bij een bromfiets: noteer het kenteken.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">2</div>
                <div>
                  <h3 className="font-bold mb-2">Check de verzekering</h3>
                  <p className="text-muted-foreground">
                    Bij gemotoriseerde voertuigen: claim bij de WA-verzekeraar. Bij fietsers/
                    voetgangers: vraag naar de AVP-verzekeraar van de ouders.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">3</div>
                <div>
                  <h3 className="font-bold mb-2">Dien een claim in</h3>
                  <p className="text-muted-foreground">
                    Stuur een aansprakelijkheidsstelling naar de ouders (bij kinderen &lt;16) 
                    of naar de jongere zelf (16-17), met kopie naar hun verzekeraar.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">4</div>
                <div>
                  <h3 className="font-bold mb-2">Geen verzekering? Aansprakelijk stellen</h3>
                  <p className="text-muted-foreground">
                    Als er geen verzekering is, kunt u de ouders persoonlijk aansprakelijk 
                    stellen. Zij zijn dan met hun privévermogen aansprakelijk.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Bijzondere aandachtspunten</h2>
            
            <Card className="bg-amber-50 border-amber-200 mb-6">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-6 w-6 text-amber-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold mb-2">Geen verzekering, geen vermogen</h4>
                    <p className="text-muted-foreground text-sm">
                      Sommige gezinnen hebben geen AVP-verzekering én geen vermogen. In dat geval 
                      is verhaal lastig. Uw eigen cascoverzekering of het Waarborgfonds kunnen 
                      dan soms uitkomst bieden.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="border p-4 rounded-lg">
                <h4 className="font-bold mb-3">🏫 Schoolplein ongeval</h4>
                <p className="text-sm text-muted-foreground">
                  Bij ongevallen op school kan ook de school aansprakelijk zijn als er 
                  onvoldoende toezicht was.
                </p>
              </div>
              <div className="border p-4 rounded-lg">
                <h4 className="font-bold mb-3">⚽ Sportvereniging</h4>
                <p className="text-sm text-muted-foreground">
                  Bij schade tijdens sport kan de vereniging aansprakelijk zijn. Zij hebben 
                  vaak een collectieve verzekering.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Veelgestelde vragen</h2>
            
            <div className="space-y-6">
              <div className="border-l-4 border-primary pl-4">
                <h4 className="font-bold mb-2">Wat als de ouders de aansprakelijkheid ontkennen?</h4>
                <p className="text-muted-foreground">
                  Verzamel bewijs (foto's, getuigen) en dien een formele claim in. Bij een 
                  geschil kan uiteindelijk de rechter beslissen. Ouders van kinderen onder 
                  14 zijn vrijwel altijd aansprakelijk.
                </p>
              </div>
              
              <div className="border-l-4 border-primary pl-4">
                <h4 className="font-bold mb-2">Kan een 12-jarige zelf mij betalen?</h4>
                <p className="text-muted-foreground">
                  Nee, minderjarigen kunnen geen rechtsgeldige overeenkomsten sluiten. De 
                  ouders of voogd moeten tekenen en betalen.
                </p>
              </div>

              <div className="border-l-4 border-primary pl-4">
                <h4 className="font-bold mb-2">Moet ik de politie bellen bij schade door een kind?</h4>
                <p className="text-muted-foreground">
                  Bij alleen blikschade is dit niet nodig. Wel verstandig bij: letsel, 
                  doorrijden (het kind fietst weg), of als ouders niet willen meewerken.
                </p>
              </div>

              <div className="border-l-4 border-primary pl-4">
                <h4 className="font-bold mb-2">Mijn kind heeft schade veroorzaakt - wat nu?</h4>
                <p className="text-muted-foreground">
                  Check uw AVP-polis. Meld de schade direct bij uw verzekeraar. Zij handelen 
                  de claim af en beschermen u tegen hoge kosten.
                </p>
              </div>
            </div>
          </section>

        </div>

        {/* CTA */}
        <Card className="bg-gradient-to-r from-primary to-blue-700 text-white mt-12">
          <CardContent className="py-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Schade door minderjarige? Wij helpen u claimen
            </h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Of het nu gaat om een scooter, fiets of ander incident - wij weten hoe we de 
              schade voor u kunnen verhalen. Gratis en zonder risico.
            </p>
            <Link href="/claim-indienen">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                <Upload className="mr-2 h-5 w-5" />
                Gratis Claim Indienen
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
                  <p className="text-sm text-muted-foreground">Algemene juridische achtergrond</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/blog/autoschade-door-fietser">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardContent className="pt-6">
                  <p className="font-semibold">Autoschade door fietser</p>
                  <p className="text-sm text-muted-foreground">Kunt u dit verhalen?</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>

      </article>
    </div>
  )
}
