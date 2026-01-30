import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Upload, Shield, AlertTriangle, CheckCircle, HelpCircle } from "lucide-react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons"

export const metadata: Metadata = {
  title: "Verhaalrechtsbijstand: Wat Is Het en Wanneer Heeft U Het Nodig? | 2026",
  description: "Wat is verhaalrechtsbijstand? Leer wanneer u het nodig heeft om autoschade te verhalen, wat het verschil is met rechtsbijstand, en hoe wij gratis helpen zonder verzekering.",
  keywords: [
    "verhaalrechtsbijstand",
    "verhaalrecht",
    "rechtsbijstand schade verhalen",
    "autoschade verhalen zonder rechtsbijstand",
    "wa verzekering verhalen",
    "schade verhalen tegenpartij",
    "gratis schade verhalen"
  ],
}

export default function VerhaalrechtsbijstandPage() {
  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Link href="/blog" className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
          <ArrowLeft className="h-4 w-4" />
          Terug naar Blog
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">Verzekeringen</span>
            <span>•</span>
            <span>6 min leestijd</span>
            <span>•</span>
            <span>29 januari 2026</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Verhaalrechtsbijstand: Wat Is Het en Wanneer Heeft U Het Nodig?
          </h1>
          
          <p className="text-xl text-muted-foreground">
            Veel automobilisten weten niet dat ze zonder verhaalrechtsbijstand zelf hun schade moeten verhalen. 
            Ontdek wat het is, wanneer u het nodig heeft, en hoe wij gratis kunnen helpen.
          </p>
        </div>

        <Card className="border-2 border-primary bg-primary/5 mb-8">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Upload className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-2">💡 Geen verhaalrechtsbijstand? Wij helpen gratis!</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Ook zonder rechtsbijstandverzekering kunt u uw schade professioneel laten verhalen. 
                  Wij doen dit volledig gratis - de tegenpartij betaalt alle kosten.
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
          <h2>Wat Is Verhaalrechtsbijstand?</h2>
          
          <p>
            <strong>Verhaalrechtsbijstand</strong> is een specifieke dekking binnen uw autoverzekering of rechtsbijstandverzekering 
            die u helpt om schade te verhalen op een aansprakelijke tegenpartij. Het is als het ware juridische hulp 
            om uw geld terug te krijgen van degene die de schade heeft veroorzaakt.
          </p>

          <Card className="my-6 border-l-4 border-l-blue-500">
            <CardContent className="p-4">
              <p className="font-semibold mb-2">🎯 In het kort:</p>
              <p className="text-sm">
                Verhaalrechtsbijstand = juridische hulp om schade te verhalen op de tegenpartij die aansprakelijk is 
                voor uw schade. Dit kan onderdeel zijn van uw autoverzekering of een aparte rechtsbijstandverzekering.
              </p>
            </CardContent>
          </Card>

          <h2>Waarom Is Verhaalrechtsbijstand Belangrijk?</h2>

          <p>
            Wanneer u alleen een <strong>WA-verzekering</strong> heeft (de wettelijk verplichte verzekering), 
            dekt deze uitsluitend schade die u aan anderen toebrengt. Uw eigen schade is niet gedekt.
          </p>

          <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-6 my-6">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
              Het probleem zonder verhaalrechtsbijstand:
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <span className="text-amber-600 font-bold">1.</span>
                <span>U wordt aangereden door een ander (niet uw schuld)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-600 font-bold">2.</span>
                <span>Uw WA-verzekering vergoedt niets (dekt alleen schade aan anderen)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-600 font-bold">3.</span>
                <span>Uw verzekeraar verhaalt de schade NIET voor u (dat is niet hun taak)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-600 font-bold">4.</span>
                <span><strong>U moet zelf de schade verhalen bij de tegenpartij</strong></span>
              </li>
            </ul>
          </div>

          <p>
            Dit is voor de meeste mensen een <strong>lastige opgave</strong>. U moet zelf:
          </p>

          <ul>
            <li>De verzekeraar van de tegenpartij achterhalen</li>
            <li>Een formele aansprakelijkheidsbrief schrijven</li>
            <li>Onderhandelen over het schadebedrag</li>
            <li>Juridische procedures starten bij weigering</li>
          </ul>

          <h2>Verschil: Verhaalrechtsbijstand vs. Rechtsbijstandverzekering</h2>

          <div className="grid md:grid-cols-2 gap-4 my-6">
            <Card className="border-2 border-blue-200">
              <CardContent className="p-4">
                <h4 className="font-bold mb-3 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  Verhaalrechtsbijstand
                </h4>
                <ul className="text-sm space-y-2">
                  <li>✅ Specifiek voor schadeverhaal</li>
                  <li>✅ Vaak onderdeel van autoverzekering</li>
                  <li>✅ Beperkt tot verkeersschade</li>
                  <li>✅ Meestal goedkoper</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-200">
              <CardContent className="p-4">
                <h4 className="font-bold mb-3 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-purple-600" />
                  Rechtsbijstandverzekering
                </h4>
                <ul className="text-sm space-y-2">
                  <li>✅ Brede juridische dekking</li>
                  <li>✅ Aparte verzekering</li>
                  <li>✅ Ook voor andere geschillen</li>
                  <li>✅ Uitgebreidere hulp</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="my-6 border-l-4 border-l-yellow-500 bg-yellow-50">
            <CardContent className="p-4">
              <p className="font-semibold mb-2">⚠️ Let op bij uw polis!</p>
              <p className="text-sm">
                Niet elke autoverzekering bevat verhaalrechtsbijstand. Check uw polisvoorwaarden of bel uw verzekeraar 
                om te weten of u deze dekking heeft. Staat er niets over verhaal? Dan moet u het zelf doen of uitbesteden.
              </p>
            </CardContent>
          </Card>

          <h2>Wanneer Heeft U Verhaalrechtsbijstand Nodig?</h2>

          <p>U heeft verhaalrechtsbijstand (of een alternatief) nodig wanneer:</p>

          <div className="space-y-4 my-6">
            <Card className="border-l-4 border-l-green-500">
              <CardContent className="p-4">
                <h4 className="font-semibold mb-2">✅ Situatie 1: U heeft alleen WA-verzekering</h4>
                <p className="text-sm text-muted-foreground">
                  Uw eigen schade is niet gedekt. Bij een ongeval door een ander moet u zelf verhalen.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500">
              <CardContent className="p-4">
                <h4 className="font-semibold mb-2">✅ Situatie 2: U wilt eigen risico terugkrijgen</h4>
                <p className="text-sm text-muted-foreground">
                  Ook met casco/allrisk betaalt u eigen risico. Dit kunt u terugvorderen van de tegenpartij.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500">
              <CardContent className="p-4">
                <h4 className="font-semibold mb-2">✅ Situatie 3: Verzekeraar weigert te betalen</h4>
                <p className="text-sm text-muted-foreground">
                  De tegenpartij of hun verzekeraar betwist aansprakelijkheid. Juridische hulp is nodig.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500">
              <CardContent className="p-4">
                <h4 className="font-semibold mb-2">✅ Situatie 4: U wilt premieverhoging voorkomen</h4>
                <p className="text-sm text-muted-foreground">
                  Door direct bij de tegenpartij te verhalen (i.p.v. eigen verzekering) blijft uw premie gelijk.
                </p>
              </CardContent>
            </Card>
          </div>

          <h2>Geen Verhaalrechtsbijstand? Dit Zijn Uw Opties</h2>

          <div className="grid md:grid-cols-2 gap-6 my-8">
            <Card className="border-2">
              <CardContent className="p-6">
                <h4 className="font-bold mb-3">Optie 1: Zelf Verhalen</h4>
                <div className="space-y-2 text-sm">
                  <p className="flex items-center gap-2">
                    <span className="text-red-500">✗</span> Tijdrovend (weken/maanden)
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-red-500">✗</span> Juridische kennis vereist
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-red-500">✗</span> Verzekeraars nemen leken minder serieus
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-red-500">✗</span> Risico op lagere vergoeding
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-500 bg-green-50">
              <CardContent className="p-6">
                <h4 className="font-bold mb-3 text-green-900">Optie 2: Via Autoschadebureau.nl (Gratis!)</h4>
                <div className="space-y-2 text-sm text-green-800">
                  <p className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faCircleCheck} className="h-4 w-4 text-green-600" /> Professionele aanpak
                  </p>
                  <p className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faCircleCheck} className="h-4 w-4 text-green-600" /> U betaalt niets
                  </p>
                  <p className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faCircleCheck} className="h-4 w-4 text-green-600" /> Ervaren onderhandelaars
                  </p>
                  <p className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faCircleCheck} className="h-4 w-4 text-green-600" /> Maximale vergoeding
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <h2>Hoe Werkt Onze Gratis Verhaalservice?</h2>

          <p>
            Wij bieden een <strong>gratis alternatief</strong> voor verhaalrechtsbijstand. 
            Hoe kan dat gratis? Omdat wij onze kosten verhalen op de WA-verzekeraar van de tegenpartij. 
            Dit is wettelijk toegestaan en verzekeraars zijn verplicht deze kosten te vergoeden.
          </p>

          <div className="bg-blue-50 p-6 rounded-lg my-6">
            <h3 className="font-bold mb-4">📋 Zo werkt het:</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">1</div>
                <p><strong>U meldt uw schade</strong> - Upload schadeformulier en foto's</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
                <p><strong>Wij stellen tegenpartij aansprakelijk</strong> - Professionele juridische brief</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">3</div>
                <p><strong>Wij onderhandelen</strong> - Voor maximale vergoeding</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">4</div>
                <p><strong>U ontvangt uw geld</strong> - Gemiddeld binnen 6 weken</p>
              </div>
            </div>
          </div>

          <h2>Veelgestelde Vragen</h2>

          <div className="space-y-4 my-8">
            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <HelpCircle className="h-4 w-4 text-primary" />
                  Heb ik verhaalrechtsbijstand nodig als ik allrisk heb?
                </h4>
                <p className="text-sm text-muted-foreground">
                  Bij allrisk vergoedt uw eigen verzekeraar de schade, maar u betaalt wel eigen risico en uw premie kan stijgen. 
                  Door te verhalen bij de tegenpartij voorkomt u dit. Verhaalrechtsbijstand (of onze service) helpt daarbij.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <HelpCircle className="h-4 w-4 text-primary" />
                  Wat kost verhaalrechtsbijstand normaal?
                </h4>
                <p className="text-sm text-muted-foreground">
                  Een rechtsbijstandverzekering kost €10-25 per maand. Verhaalrechtsbijstand als aanvulling op uw autoverzekering 
                  kost vaak €3-8 per maand extra. Via ons is schadeverhaal volledig gratis.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <HelpCircle className="h-4 w-4 text-primary" />
                  Kan ik alsnog verhalen als ik geen rechtsbijstand heb?
                </h4>
                <p className="text-sm text-muted-foreground">
                  Ja! U kunt altijd zelf verhalen of het aan ons uitbesteden. Onze service is gratis en werkt 
                  als een professioneel alternatief voor verhaalrechtsbijstand.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <HelpCircle className="h-4 w-4 text-primary" />
                  Waarom is jullie service gratis?
                </h4>
                <p className="text-sm text-muted-foreground">
                  Wij verhalen onze kosten op de WA-verzekeraar van de tegenpartij. Dit zijn zogenaamde 
                  "buitengerechtelijke kosten" die verzekeraars wettelijk verplicht zijn te vergoeden. 
                  U betaalt dus echt niets.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="my-8 border-2 border-primary bg-gradient-to-br from-primary/5 to-white">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">
                Geen Verhaalrechtsbijstand? Geen Probleem!
              </h3>
              <p className="text-muted-foreground mb-6">
                Wij verhalen uw autoschade professioneel en volledig gratis. Upload uw schadeformulier 
                en wij regelen de rest. Gemiddeld binnen 6 weken uw geld terug.
              </p>
              <Link href="/claim-indienen">
                <Button size="lg" className="text-lg px-8">
                  <Upload className="mr-2 h-5 w-5" />
                  Start Nu Uw Gratis Claim
                </Button>
              </Link>
              <p className="text-sm text-muted-foreground mt-4">
                100% gratis • Geen verzekering nodig • Professionele aanpak
              </p>
            </CardContent>
          </Card>

          <div className="mt-12 pt-8 border-t">
            <h3 className="text-xl font-bold mb-4">📚 Gerelateerde Artikelen</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/blog/rechtsbijstandverzekering-nodig" className="block p-4 border rounded-lg hover:border-primary hover:shadow-md transition-all">
                <h4 className="font-semibold mb-2">Rechtsbijstandverzekering: is dat nodig?</h4>
                <p className="text-sm text-muted-foreground">Wanneer u wel of geen rechtsbijstand nodig heeft</p>
              </Link>
              
              <Link href="/blog/wa-verzekering-tegenpartij-claimen" className="block p-4 border rounded-lg hover:border-primary hover:shadow-md transition-all">
                <h4 className="font-semibold mb-2">WA-verzekering tegenpartij claimen</h4>
                <p className="text-sm text-muted-foreground">Complete gids voor claimen bij de tegenpartij</p>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
