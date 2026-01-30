import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Upload, Shield, CheckCircle, XCircle, HelpCircle } from "lucide-react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons"

export const metadata: Metadata = {
  title: "Rechtsbijstandverzekering: Is Dat Nodig Voor Schade Verhalen? | 2026",
  description: "Moet u een rechtsbijstandverzekering hebben om autoschade te verhalen? Ontdek wanneer het wel en niet nodig is, en hoe wij gratis helpen zonder verzekering.",
  keywords: [
    "rechtsbijstandverzekering",
    "rechtsbijstand autoschade",
    "schade verhalen zonder rechtsbijstand",
    "rechtsbijstand nodig",
    "autoschade verhalen verzekering",
    "gratis schade verhalen"
  ],
}

export default function RechtsbijstandverzekeringNodigPage() {
  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Link href="/blog" className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
          <ArrowLeft className="h-4 w-4" />
          Terug naar Blog
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium">Verzekeringen</span>
            <span>•</span>
            <span>5 min leestijd</span>
            <span>•</span>
            <span>29 januari 2026</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Rechtsbijstandverzekering: Is Dat Nodig Voor Schade Verhalen?
          </h1>
          
          <p className="text-xl text-muted-foreground">
            Veel mensen denken dat ze een rechtsbijstandverzekering nodig hebben om autoschade te verhalen. 
            Dat is niet altijd waar. Ontdek wanneer u het wel en niet nodig heeft.
          </p>
        </div>

        <Card className="border-2 border-primary bg-primary/5 mb-8">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Upload className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-2">💡 Spoiler: Wij zijn uw gratis alternatief!</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Geen rechtsbijstandverzekering? Geen probleem. Wij verhalen uw autoschade gratis. 
                  Alle kosten worden door de tegenpartij betaald.
                </p>
                <Link href="/claim-indienen">
                  <Button>
                    <Upload className="mr-2 h-4 w-4" />
                    Start Gratis Claim
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="prose prose-lg max-w-none">
          <h2>Wat Is Een Rechtsbijstandverzekering?</h2>
          
          <p>
            Een <strong>rechtsbijstandverzekering</strong> is een verzekering die juridische hulp biedt bij geschillen. 
            Dit kan variëren van een conflict met uw werkgever tot een burenruzie, en ook bij verkeersongevallen.
          </p>

          <p>
            Bij autoschade helpt een rechtsbijstandverzekering u om de schade te verhalen op de aansprakelijke partij. 
            De verzekeraar regelt dan alle juridische zaken, van brieven schrijven tot eventuele rechtszaken.
          </p>

          <Card className="my-6 border-l-4 border-l-blue-500">
            <CardContent className="p-4">
              <p className="font-semibold mb-2">🎯 Verschillende soorten rechtsbijstand:</p>
              <ul className="text-sm space-y-1 ml-4">
                <li>• <strong>Verkeer</strong> - Specifiek voor verkeersongevallen</li>
                <li>• <strong>Consument</strong> - Conflicten met bedrijven</li>
                <li>• <strong>Wonen</strong> - Huur/koop geschillen</li>
                <li>• <strong>Inkomen</strong> - Arbeidsconflicten</li>
                <li>• <strong>Compleet</strong> - Alle bovenstaande + meer</li>
              </ul>
            </CardContent>
          </Card>

          <h2>Wanneer Heeft U Rechtsbijstand NIET Nodig?</h2>

          <p>
            Het goede nieuws: voor het verhalen van autoschade heeft u <strong>niet per se</strong> een rechtsbijstandverzekering nodig. 
            Er zijn situaties waarin u prima zonder kunt:
          </p>

          <div className="space-y-4 my-6">
            <Card className="border-l-4 border-l-green-500 bg-green-50">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">✅ Duidelijke aansprakelijkheid</h4>
                    <p className="text-sm text-muted-foreground">
                      Als de tegenpartij duidelijk schuldig is (bijv. achterop gereden), accepteren verzekeraars 
                      meestal snel aansprakelijkheid. Juridische hulp is dan vaak niet nodig.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500 bg-green-50">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">✅ U gebruikt een professionele verhaalservice</h4>
                    <p className="text-sm text-muted-foreground">
                      Services zoals Autoschadebureau.nl nemen alle juridische zaken over. 
                      Wij schrijven aansprakelijkheidsbrieven, onderhandelen, en escaleren indien nodig - gratis.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500 bg-green-50">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">✅ Kleine schades met goede documentatie</h4>
                    <p className="text-sm text-muted-foreground">
                      Bij kleine schades met duidelijke foto's en schadeformulier verloopt het proces meestal soepel 
                      zonder uitgebreide juridische hulp.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <h2>Wanneer Is Rechtsbijstand WEL Handig?</h2>

          <p>
            Er zijn situaties waarin een rechtsbijstandverzekering wél waardevol kan zijn:
          </p>

          <div className="space-y-4 my-6">
            <Card className="border-l-4 border-l-amber-500 bg-amber-50">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-amber-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">⚠️ Betwiste aansprakelijkheid</h4>
                    <p className="text-sm text-muted-foreground">
                      Als onduidelijk is wie schuldig is (50/50 situaties) en het om grote bedragen gaat, 
                      kan langdurige juridische bijstand nodig zijn.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-amber-500 bg-amber-50">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-amber-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">⚠️ Letselschade</h4>
                    <p className="text-sm text-muted-foreground">
                      Bij letselschade (whiplash, gebroken botten, etc.) zijn de bedragen hoger en de procedures complexer. 
                      Rechtsbijstand kan dan waardevol zijn. Wij verwijzen door naar specialist Unitas Letselschade.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-amber-500 bg-amber-50">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-amber-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">⚠️ Buitenlandse schades</h4>
                    <p className="text-sm text-muted-foreground">
                      Schade in het buitenland kan complexer zijn door andere wetgeving en taalbarrières. 
                      Rechtsbijstand met internationale dekking is dan handig.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <h2>Vergelijking: Rechtsbijstand vs. Gratis Verhaalservice</h2>

          <div className="overflow-x-auto my-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 text-left border">Aspect</th>
                  <th className="p-3 text-left border">Rechtsbijstandverzekering</th>
                  <th className="p-3 text-left border bg-green-50">Autoschadebureau.nl</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border font-medium">Kosten</td>
                  <td className="p-3 border">€10-25/maand</td>
                  <td className="p-3 border bg-green-50 font-semibold text-green-700">Gratis</td>
                </tr>
                <tr>
                  <td className="p-3 border font-medium">Wanneer afsluiten</td>
                  <td className="p-3 border">Vóór het ongeval</td>
                  <td className="p-3 border bg-green-50">Na het ongeval</td>
                </tr>
                <tr>
                  <td className="p-3 border font-medium">Eigen risico</td>
                  <td className="p-3 border">Vaak €250-500</td>
                  <td className="p-3 border bg-green-50 font-semibold text-green-700">Geen</td>
                </tr>
                <tr>
                  <td className="p-3 border font-medium">Wachttijd</td>
                  <td className="p-3 border">3-6 maanden</td>
                  <td className="p-3 border bg-green-50">Direct</td>
                </tr>
                <tr>
                  <td className="p-3 border font-medium">Dekking</td>
                  <td className="p-3 border">Breed (ook andere geschillen)</td>
                  <td className="p-3 border bg-green-50">Specifiek autoschade</td>
                </tr>
                <tr>
                  <td className="p-3 border font-medium">Letselschade</td>
                  <td className="p-3 border">Ja (met dekking)</td>
                  <td className="p-3 border bg-green-50">Doorverwijzing partner</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>Onze Aanbeveling</h2>

          <Card className="my-6 bg-blue-50 border-2 border-blue-200">
            <CardContent className="p-6">
              <h3 className="font-bold text-lg mb-4">🎯 Ons advies:</h3>
              
              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">1</div>
                  <div>
                    <p className="font-semibold">Voor alleen materiële autoschade:</p>
                    <p className="text-muted-foreground">
                      Rechtsbijstand is niet nodig. Gebruik onze gratis service of verhaal zelf bij duidelijke schuld.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
                  <div>
                    <p className="font-semibold">Voor bredere bescherming:</p>
                    <p className="text-muted-foreground">
                      Overweeg rechtsbijstand als u ook bescherming wilt bij arbeidsconflicten, consumentenzaken, 
                      of letselschade. Let op wachttijden!
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">3</div>
                  <div>
                    <p className="font-semibold">Nu al schade? Start bij ons:</p>
                    <p className="text-muted-foreground">
                      Heeft u nu schade en geen rechtsbijstand? Begin direct bij ons - het is gratis en werkt 
                      net zo professioneel als een rechtsbijstandverzekeraar.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <h2>Veelgestelde Vragen</h2>

          <div className="space-y-4 my-8">
            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <HelpCircle className="h-4 w-4 text-primary" />
                  Kan ik nog rechtsbijstand afsluiten na een ongeval?
                </h4>
                <p className="text-sm text-muted-foreground">
                  Ja, maar er geldt meestal een wachttijd van 3-6 maanden. U kunt de verzekering dus niet 
                  direct gebruiken voor een ongeval dat net gebeurd is. Daarom is onze service een goed alternatief.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <HelpCircle className="h-4 w-4 text-primary" />
                  Mijn autoverzekering heeft "rechtshulp" - is dat hetzelfde?
                </h4>
                <p className="text-sm text-muted-foreground">
                  Vaak niet volledig. Veel autoverzekeringen bieden beperkte rechtshulp, maar geen volledige 
                  verhaalrechtsbijstand. Check uw polis of bel uw verzekeraar voor duidelijkheid.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <HelpCircle className="h-4 w-4 text-primary" />
                  Waarom zou ik kiezen voor jullie i.p.v. rechtsbijstand?
                </h4>
                <p className="text-sm text-muted-foreground">
                  Onze service is gratis, direct beschikbaar (geen wachttijd), en zonder eigen risico. 
                  Voor puur materiële autoschade zijn wij een efficiënt en kosteloos alternatief.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <HelpCircle className="h-4 w-4 text-primary" />
                  Wat als de verzekeraar weigert te betalen?
                </h4>
                <p className="text-sm text-muted-foreground">
                  Wij escaleren dan namens u: formele sommatie, klacht bij Kifid, en indien nodig juridische stappen. 
                  In 95% van gevallen bereiken we een schikking zonder rechtbank.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="my-8 border-2 border-primary bg-gradient-to-br from-primary/5 to-white">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">
                Schade Verhalen Zonder Rechtsbijstand? Wij Helpen Gratis!
              </h3>
              <p className="text-muted-foreground mb-6">
                Geen rechtsbijstandverzekering nodig. Upload uw schadeformulier en wij regelen alles professioneel. 
                Gemiddeld binnen 6 weken uw geld terug - en u betaalt niets.
              </p>
              <Link href="/claim-indienen">
                <Button size="lg" className="text-lg px-8">
                  <Upload className="mr-2 h-5 w-5" />
                  Start Nu Uw Gratis Claim
                </Button>
              </Link>
              <p className="text-sm text-muted-foreground mt-4">
                100% gratis • Direct beschikbaar • Professionele aanpak
              </p>
            </CardContent>
          </Card>

          <div className="mt-12 pt-8 border-t">
            <h3 className="text-xl font-bold mb-4">📚 Gerelateerde Artikelen</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/blog/verhaalrechtsbijstand-uitgelegd" className="block p-4 border rounded-lg hover:border-primary hover:shadow-md transition-all">
                <h4 className="font-semibold mb-2">Verhaalrechtsbijstand uitgelegd</h4>
                <p className="text-sm text-muted-foreground">Wat is verhaalrechtsbijstand en wanneer heeft u het nodig?</p>
              </Link>
              
              <Link href="/blog/verschil-wa-allrisk-cascoverzekering" className="block p-4 border rounded-lg hover:border-primary hover:shadow-md transition-all">
                <h4 className="font-semibold mb-2">WA vs Casco vs Allrisk</h4>
                <p className="text-sm text-muted-foreground">Verschil tussen verzekeringen voor schade verhalen</p>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
