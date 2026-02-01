import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { ArrowLeft, Scale, Upload, AlertTriangle, CheckCircle, Users } from "lucide-react"

export const metadata: Metadata = {
  title: "Aansprakelijkheid bij Verkeersongevallen: Wie Betaalt de Schade? | 112autoschade.nl",
  description: "Juridische achtergrond van aansprakelijkheid, cascoregel en omkering bewijslast. Begrijp wanneer de tegenpartij WA-verzekering moet betalen.",
  keywords: ["aansprakelijkheid verkeersongeval", "wie betaalt schade", "WA verzekering aansprakelijk", "schuld verkeersongeval"],
}

export default function BlogPost() {
  return (
    <div className="min-h-screen bg-white">
      <article className="container mx-auto px-4 py-8 max-w-4xl">
        <Breadcrumbs items={[
          { label: "Blog", href: "/blog" },
          { label: "Aansprakelijkheid verkeersongeval" }
        ]} />

        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8">
          <ArrowLeft className="h-4 w-4" />
          Terug naar blog
        </Link>

        <header className="mb-12">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-medium">Juridisch</span>
            <span>•</span>
            <span>6 minuten leestijd</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Aansprakelijkheid bij Verkeersongevallen: Wie Betaalt de Schade?
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Na een verkeersongeval rijst direct de vraag: wie is aansprakelijk? Het antwoord bepaalt 
            wie de schade moet vergoeden. In dit artikel leggen we de juridische basis uit.
          </p>
        </header>

        <div className="prose prose-lg max-w-none">
          <h2>Wat betekent aansprakelijkheid?</h2>
          
          <p>
            Aansprakelijkheid betekent dat iemand verantwoordelijk is voor de gevolgen van zijn 
            handelen. Bij verkeersongevallen gaat het om de vraag: wie heeft de fout gemaakt die 
            tot de schade heeft geleid? De aansprakelijke partij moet de schade vergoeden.
          </p>

          <p>
            In Nederland is elke autobezitter verplicht een WA-verzekering (Wettelijke Aansprakelijkheid) 
            te hebben. Deze verzekering vergoedt de schade die de verzekerde aan anderen veroorzaakt.
          </p>

          <h2>Hoe wordt aansprakelijkheid vastgesteld?</h2>

          <p>
            Bij het vaststellen van aansprakelijkheid kijken verzekeraars naar verschillende factoren:
          </p>

          <ul>
            <li><strong>Verkeersregels:</strong> Wie heeft een regel overtreden?</li>
            <li><strong>Het schadeformulier:</strong> Wat hebben partijen zelf verklaard?</li>
            <li><strong>Getuigenverklaringen:</strong> Wat zagen derden?</li>
            <li><strong>Technisch bewijs:</strong> Schadebeeld, remsporen, etc.</li>
            <li><strong>Dashcam beelden:</strong> Steeds vaker als bewijs gebruikt</li>
          </ul>

          <h2>Veelvoorkomende situaties en aansprakelijkheid</h2>

          <div className="space-y-4 my-8">
            <Card className="border-l-4 border-green-500">
              <CardContent className="pt-6">
                <h3 className="font-bold mb-2 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Kop-staartbotsing
                </h3>
                <p className="text-muted-foreground">
                  De achteroprijder is vrijwel altijd 100% aansprakelijk. Er geldt een verplichting 
                  om voldoende afstand te houden om tijdig te kunnen stoppen.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-green-500">
              <CardContent className="pt-6">
                <h3 className="font-bold mb-2 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Voorrangsfout
                </h3>
                <p className="text-muted-foreground">
                  Wie geen voorrang verleent terwijl dit wel moet, is aansprakelijk. Dit geldt bij 
                  haaientanden, stopborden en voorrangswegen.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-amber-500">
              <CardContent className="pt-6">
                <h3 className="font-bold mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-600" />
                  Uitwijkmanoeuvre
                </h3>
                <p className="text-muted-foreground">
                  Complexere situatie. Wie van rijbaan wisselt zonder te kijken is aansprakelijk, 
                  maar de situatie bepaalt vaak de precieze verdeling.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-amber-500">
              <CardContent className="pt-6">
                <h3 className="font-bold mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-600" />
                  Parkeerschade
                </h3>
                <p className="text-muted-foreground">
                  Wie de fout maakt bij parkeren is aansprakelijk. Dit kan zowel de uitparkeerder 
                  als de passerende auto zijn, afhankelijk van de situatie.
                </p>
              </CardContent>
            </Card>
          </div>

          <h2>Bijzondere bescherming voor zwakke verkeersdeelnemers</h2>

          <p>
            In Nederland geldt extra bescherming voor fietsers en voetgangers. Artikel 185 van de 
            Wegenverkeerswet bepaalt dat de automobilist in principe aansprakelijk is bij een 
            ongeval met een fietser of voetganger, tenzij hij overmacht kan bewijzen.
          </p>

          <p>
            Dit noemen we de <strong>omkering van de bewijslast</strong>. De automobilist moet 
            bewijzen dat hem niets te verwijten valt, in plaats van dat de fietser moet bewijzen 
            dat de automobilist fout zat.
          </p>

          <h2>Gedeelde aansprakelijkheid (50/50)</h2>

          <p>
            Soms zijn beide partijen deels schuldig aan een ongeval. In dat geval wordt de 
            aansprakelijkheid verdeeld. Bij een 50/50 verdeling betaalt elke verzekeraar de 
            helft van de totale schade.
          </p>

          <p>
            Dit komt voor bij onduidelijke situaties, bijvoorbeeld wanneer beide partijen 
            tegenstrijdige verklaringen afleggen en er geen getuigen of bewijs is.
          </p>

          <Card className="bg-blue-50 border-blue-200 my-6">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Scale className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold mb-2">Tip: documenteer alles</h3>
                  <p className="text-muted-foreground">
                    Hoe meer bewijs u heeft, hoe sterker uw positie. Maak altijd{" "}
                    <Link href="/blog/goede-fotos-autoschade" className="text-primary hover:underline">foto's</Link>, 
                    noteer getuigengegevens en vul het{" "}
                    <Link href="/blog/europees-schadeformulier-invullen" className="text-primary hover:underline">schadeformulier</Link> correct in.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <h2>Wat als de tegenpartij de schuld ontkent?</h2>

          <p>
            Het komt voor dat de tegenpartij of diens verzekeraar de aansprakelijkheid betwist. 
            In dat geval is het belangrijk om:
          </p>

          <ul>
            <li>Alle bewijzen te verzamelen en bewaren</li>
            <li>Getuigenverklaringen op te vragen</li>
            <li>Eventueel politierapporten op te vragen</li>
            <li>Professionele hulp in te schakelen</li>
          </ul>

          <p>
            Wij hebben ervaring met het aantonen van aansprakelijkheid en kennen de juridische 
            kaders. Ook bij betwiste claims kunnen wij u helpen.
          </p>

          <h2>Verjaringstermijn</h2>

          <p>
            Let op: u heeft niet onbeperkt de tijd om schade te verhalen. De verjaringstermijn 
            voor verkeersschade is <strong>5 jaar</strong> vanaf het moment dat u bekend bent met 
            de schade en de aansprakelijke partij.
          </p>
        </div>

        <Card className="bg-gradient-to-r from-primary to-blue-700 text-white mt-12">
          <CardContent className="py-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Hulp nodig bij aansprakelijkheidsvragen?</h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Wij bepalen de aansprakelijkheid en verhalen uw schade. Volledig gratis.
            </p>
            <Link href="/claim-indienen">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                <Upload className="mr-2 h-5 w-5" />
                Gratis Claim Indienen
              </Button>
            </Link>
          </CardContent>
        </Card>
      </article>
    </div>
  )
}
