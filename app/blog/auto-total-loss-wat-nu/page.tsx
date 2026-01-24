import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, CheckCircle, AlertTriangle, Upload, Calculator } from "lucide-react"

export const metadata: Metadata = {
  title: "Auto Total Loss Na Ongeval: Complete Gids 2025 | Wat Nu?",
  description: "Uw auto is total loss verklaard? Leer alles over dagwaarde, restwaarde, uitkering, en hoe u maximale vergoeding krijgt van de tegenpartij.",
  keywords: [
    "total loss auto",
    "auto total loss wat nu",
    "total loss vergoeding",
    "dagwaarde auto",
    "restwaarde total loss",
    "auto economische total loss",
    "technische total loss"
  ],
}

export default function TotalLossAutoPage() {
  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Link href="/blog" className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
          <ArrowLeft className="h-4 w-4" />
          Terug naar Knowledge Base
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
            <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full font-medium">Financieel</span>
            <span>•</span>
            <span>10 min leestijd</span>
            <span>•</span>
            <span>24 januari 2025</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Auto Total Loss Na Ongeval: Complete Gids 2025
          </h1>
          
          <p className="text-xl text-muted-foreground">
            Uw auto is total loss verklaard na een ongeval? Een vervelende situatie, maar u heeft recht op volledige vergoeding. 
            Leer hoe total loss werkt, wat u kunt claimen, en hoe u maximale uitkering krijgt.
          </p>
        </div>

        <Card className="border-2 border-red-200 bg-red-50 mb-8">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <AlertTriangle className="h-8 w-8 text-red-600 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-lg mb-2 text-red-900">⚠️ Total Loss? Wij Regelen Maximale Vergoeding!</h3>
                <p className="text-sm text-red-800 mb-4">
                  Total loss claims zijn complex. Verzekeraars bieden vaak te weinig aan. Wij onderhandelen voor volledige 
                  dagwaarde + alle bijkomende kosten (taksen, huurauto, expertise, administratie).
                </p>
                <Link href="/claim-indienen">
                  <Button variant="destructive">
                    <Upload className="mr-2 h-4 w-4" />
                    Start Total Loss Claim
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="prose prose-lg max-w-none">
          <h2>Wat Is Total Loss?</h2>
          <p>
            Een auto is <strong>total loss</strong> wanneer de reparatiekosten hoger zijn dan de waarde van de auto. 
            De verzekeraar verklaart de auto dan "total loss" en keert de <strong>dagwaarde</strong> uit in plaats van reparatiekosten.
          </p>

          <h3>2 Soorten Total Loss:</h3>

          <div className="grid md:grid-cols-2 gap-4 my-6">
            <Card className="border-2 border-orange-200 bg-orange-50">
              <CardContent className="p-4">
                <h4 className="font-bold mb-2">🔧 Technische Total Loss</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Auto is <strong>fysiek onherstelbaar</strong> of onveilig om te repareren.
                </p>
                <p className="text-xs">
                  <strong>Voorbeelden:</strong> Chassis vervormd, motor zwaar beschadigd, complete uitbrand
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-yellow-200 bg-yellow-50">
              <CardContent className="p-4">
                <h4 className="font-bold mb-2">💰 Economische Total Loss</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Reparatie is <strong>technisch mogelijk maar te duur</strong> (meestal &gt; 60-70% van dagwaarde).
                </p>
                <p className="text-xs">
                  <strong>Voorbeeld:</strong> Auto van €8.000 met €6.000 schade = economisch total loss
                </p>
              </CardContent>
            </Card>
          </div>

          <h2>Hoe Wordt Dagwaarde Bepaald?</h2>

          <p>
            De <strong>dagwaarde</strong> is wat uw auto waard was <strong>direct vóór het ongeval</strong> op de vrije markt. 
            Dit is NIET de aankoopprijs of nieuwprijs, maar de realistische verkoopwaarde.
          </p>

          <Card className="my-6 bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <h3 className="font-bold mb-4">📊 Factoren Die Dagwaarde Bepalen:</h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Merk, Model & Uitvoering</p>
                    <p className="text-muted-foreground text-xs">Premium merken behouden waarde beter dan budget merken</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Kilometerstand</p>
                    <p className="text-muted-foreground text-xs">Lagere km-stand = hogere waarde (gemiddeld €0,10-€0,20 per km verschil)</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Bouwjaar & Leeftijd</p>
                    <p className="text-muted-foreground text-xs">Auto's verliezen 15-20% waarde per jaar (eerste jaren sneller)</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Onderhoudsstaat</p>
                    <p className="text-muted-foreground text-xs">Recent onderhoud, nieuwe APK, onderhoudsboekje aanwezig = hogere waarde</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Opties & Accessoires</p>
                    <p className="text-muted-foreground text-xs">Leder, navigatie, trekhaak, xenon = waardeverhogend</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Marktprijzen</p>
                    <p className="text-muted-foreground text-xs">Vergelijkbare auto's op AutoTrack, Marktplaats, AutoScout24</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <h3>Hoe Wordt Dagwaarde Berekend?</h3>

          <p>Verzekeraars gebruiken meestal één van deze methoden:</p>

          <div className="bg-gray-50 p-6 rounded-lg my-6">
            <div className="space-y-4 text-sm">
              <div>
                <p className="font-semibold mb-2">1️⃣ Marktplaats-methode (Meest Gebruikt)</p>
                <p className="text-muted-foreground">
                  Taxateur zoekt 3-5 vergelijkbare auto's te koop op Marktplaats, AutoTrack, etc. 
                  Gemiddelde verkoopprijs = dagwaarde.
                </p>
              </div>

              <div>
                <p className="font-semibold mb-2">2️⃣ ANWB/Eurotax Waardetabellen</p>
                <p className="text-muted-foreground">
                  Gestandaardiseerde waardetabellen op basis van merk/model/jaar/km. 
                  Minder nauwkeurig maar sneller.
                </p>
              </div>

              <div>
                <p className="font-semibold mb-2">3️⃣ Vakgarage Taxatie</p>
                <p className="text-muted-foreground">
                  Onafhankelijke expert beoordeelt auto fysiek. Meest betrouwbaar maar duurder.
                </p>
              </div>
            </div>
          </div>

          <h2>Wat Kunt U Claimen Bij Total Loss?</h2>

          <Card className="my-6 bg-green-50 border-2 border-green-200">
            <CardContent className="p-6">
              <h3 className="font-bold text-lg mb-4">✅ Volledige Schadevergoeding Bestaat Uit:</h3>
              
              <div className="space-y-4 text-sm">
                <div className="bg-white p-4 rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold">💰 Dagwaarde Auto</p>
                    <p className="text-muted-foreground">Hoofdbedrag</p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Marktconforme waarde direct vóór ongeval
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold">➕ BTW (indien van toepassing)</p>
                    <p className="text-muted-foreground">+21%</p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Alleen als u BPM-vrije vervanger koopt (import)
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold">➖ Restwaarde (wraking)</p>
                    <p className="text-muted-foreground">-€500-€3000</p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Waarde autowrak (u kunt auto behouden tegen aftrek restwaarde)
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold">🚗 Bergingskosten</p>
                    <p className="text-muted-foreground">€150-€500</p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Taksen, afslepen naar garage/berging
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold">📄 Expertisekosten</p>
                    <p className="text-muted-foreground">€300-€800</p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Taxatie door verzekeraar (wordt altijd vergoed)
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold">🚙 Huurauto</p>
                    <p className="text-muted-foreground">€30-€50/dag</p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Maximaal 14-21 dagen vanaf total loss melding
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold">💼 Administratiekosten</p>
                    <p className="text-muted-foreground">€50-€150</p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Eigen tijd, formulieren, kenteken opzeggen, etc.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold">📊 BPM-vergoeding</p>
                    <p className="text-muted-foreground">Variabel</p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Indien auto jonger dan 3 maanden (pro-rata vergoeding onbenutte BPM)
                  </p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded">
                <p className="text-sm font-semibold mb-2">💡 Rekenvoorbeeld:</p>
                <div className="text-xs space-y-1">
                  <p>Dagwaarde auto: <strong>€12.000</strong></p>
                  <p>Restwaarde (wraking): <strong>- €1.500</strong></p>
                  <p>Bergingskosten: <strong>+ €350</strong></p>
                  <p>Expertise: <strong>+ €450</strong></p>
                  <p>Huurauto (14 dagen): <strong>+ €560</strong></p>
                  <p>Administratie: <strong>+ €100</strong></p>
                  <p className="pt-2 border-t mt-2 font-bold text-base">Totaal uit te keren: <strong className="text-green-700">€11.960</strong></p>
                </div>
              </div>
            </CardContent>
          </Card>

          <h2>Restwaarde: Mag U De Auto Behouden?</h2>

          <p>
            Ja! U mag uw total loss auto behouden, maar dan wordt de <strong>restwaarde</strong> (wrakwaarde) 
            afgetrokken van uw uitkering.
          </p>

          <h3>Wanneer Is Dit Slim?</h3>

          <div className="grid md:grid-cols-2 gap-4 my-6">
            <Card className="border-l-4 border-l-green-500">
              <CardContent className="p-4">
                <p className="font-semibold text-green-900 mb-2">✅ Voordelen Auto Behouden:</p>
                <ul className="text-sm space-y-1 ml-4">
                  <li>• Onderdelen verkopen (vaak meer waard dan restwaarde)</li>
                  <li>• Auto repareren voor eigen gebruik (bij kleine schade)</li>
                  <li>• Sentimentele waarde (klassieke auto, custom modifications)</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-red-500">
              <CardContent className="p-4">
                <p className="font-semibold text-red-900 mb-2">❌ Nadelen Auto Behouden:</p>
                <ul className="text-sm space-y-1 ml-4">
                  <li>• U moet auto zelf laten slopen (kosten €50-€150)</li>
                  <li>• Kenteken opzeggen, verzekering regelen</li>
                  <li>• Verzekeraar taxeert restwaarde vaak te hoog</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="my-6 bg-yellow-50 border-yellow-300">
            <CardContent className="p-4">
              <p className="text-sm mb-2"><strong>💡 Tip:</strong> Laat restwaarde taxeren door onafhankelijke partij als u twijfelt!</p>
              <p className="text-xs text-muted-foreground">
                Sloperijen geven vaak gratis indicatie. Als hun bod lager is dan restwaarde verzekeraar = 
                beter auto afgeven aan verzekeraar.
              </p>
            </CardContent>
          </Card>

          <h2>Procedure Na Total Loss Verklaring</h2>

          <div className="space-y-6 my-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center font-bold flex-shrink-0">1</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Expert Verklaart Auto Total Loss</h3>
                <p className="text-muted-foreground text-sm">
                  Na expertise concludeert de taxateur dat reparatie economisch niet rendabel is. 
                  U ontvangt schriftelijke bevestiging.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center font-bold flex-shrink-0">2</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Verzekeraar Stelt Dagwaarde Vast</h3>
                <p className="text-muted-foreground text-sm mb-2">
                  Taxateur berekent dagwaarde o.b.v. marktprijzen. U ontvangt <strong>expertiserapport</strong> met:
                </p>
                <ul className="text-sm space-y-1 ml-4">
                  <li>• Dagwaarde berekening</li>
                  <li>• Referentie-advertenties (vergelijkbare auto's)</li>
                  <li>• Restwaarde inschatting</li>
                  <li>• Foto's van uw auto vóór ongeval (indien beschikbaar)</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold flex-shrink-0">3</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">U Beslist: Akkoord of Bezwaar?</h3>
                <p className="text-muted-foreground text-sm mb-2">
                  Controleer het expertiserapport zorgvuldig:
                </p>
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-3">
                    <p className="text-sm font-semibold mb-2">🔍 Check deze punten:</p>
                    <ul className="text-xs space-y-1 ml-4">
                      <li>• Zijn referentie-auto's echt vergelijkbaar? (km, jaar, uitvoering)</li>
                      <li>• Klopt de kilometerstand die genoemd wordt?</li>
                      <li>• Zijn opties/accessoires meegenomen? (leder, navi, trekhaak)</li>
                      <li>• Is onderhoudshistorie meegewogen?</li>
                      <li>• Klopt de restwaarde inschatting?</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-yellow-600 text-white flex items-center justify-center font-bold flex-shrink-0">4</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Bij Bezwaar: Contra-Expertise</h3>
                <p className="text-muted-foreground text-sm mb-2">
                  Bent u het oneens met de dagwaarde? U heeft recht op <strong>contra-expertise</strong>:
                </p>
                <ul className="text-sm space-y-1 ml-4">
                  <li>• U laat uw eigen expert de auto taxeren</li>
                  <li>• Kosten: €400-€800 (wordt vergoed bij gelijk)</li>
                  <li>• Bij groot verschil: arbitrage (onafhankelijke derde expert)</li>
                </ul>
                <Card className="mt-3 bg-green-50 border-green-200">
                  <CardContent className="p-3">
                    <p className="text-xs text-green-900">
                      <strong>💡 Wij regelen dit:</strong> Wij schakelen contra-expert in indien nodig en onderhandelen 
                      tot marktconforme dagwaarde bereikt is.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold flex-shrink-0">5</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Uitkering & Afwikkeling</h3>
                <p className="text-muted-foreground text-sm">
                  Bij akkoord ontvangt u binnen 5-10 werkdagen de volledige vergoeding. Auto wordt opgehaald door 
                  verzekeraar (of u behoudt tegen aftrek restwaarde).
                </p>
              </div>
            </div>
          </div>

          <h2>Veelgemaakte Fouten Bij Total Loss (Voorkom Deze!)</h2>

          <div className="space-y-4 my-8">
            <Card className="border-l-4 border-l-red-500 bg-red-50">
              <CardContent className="p-4">
                <h4 className="font-semibold text-red-900 mb-2">❌ Fout 1: Direct Akkoord Gaan Met Eerste Bod</h4>
                <p className="text-sm mb-2">
                  Verzekeraars bieden vaak 10-20% te weinig aan in eerste instantie ("neem het of laat het").
                </p>
                <p className="text-xs text-green-700">
                  <strong>✅ Beter:</strong> Vraag altijd expertiserapport + referenties. Vergelijk zelf op Marktplaats. 
                  Onderhandel indien te laag.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-red-500 bg-red-50">
              <CardContent className="p-4">
                <h4 className="font-semibold text-red-900 mb-2">❌ Fout 2: Geen Rekening Houden Met Restschuld</h4>
                <p className="text-sm mb-2">
                  Heeft u nog een lening/lease lopen? Dagwaarde moet hoger zijn dan restschuld, anders houdt u schuld over!
                </p>
                <p className="text-xs text-green-700">
                  <strong>✅ Beter:</strong> Check restschuld direct. Overweeg GAP-verzekering (dekt verschil).
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-red-500 bg-red-50">
              <CardContent className="p-4">
                <h4 className="font-semibold text-red-900 mb-2">❌ Fout 3: Vergeten Bijkomende Kosten Te Claimen</h4>
                <p className="text-sm mb-2">
                  Veel mensen claimen alleen dagwaarde, maar vergeten taksen, huurauto, expertise, administratie.
                </p>
                <p className="text-xs text-green-700">
                  <strong>✅ Beter:</strong> Claim ALLES. Bewaar alle bonnen. Wij zorgen dat niets gemist wordt.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-red-500 bg-red-50">
              <CardContent className="p-4">
                <h4 className="font-semibold text-red-900 mb-2">❌ Fout 4: Auto Laten Repareren Voordat Total Loss Vastgesteld Is</h4>
                <p className="text-sm mb-2">
                  Als u repareert voordat expert komt = verzekeraar kan weigeren te betalen ("bewijs is weg").
                </p>
                <p className="text-xs text-green-700">
                  <strong>✅ Beter:</strong> Wacht ALTIJD op expertise. Laat auto staan tot taxateur geweest is.
                </p>
              </CardContent>
            </Card>
          </div>

          <h2>Veelgestelde Vragen Over Total Loss</h2>

          <div className="space-y-4 my-8">
            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold mb-2">💰 Krijg ik meer als ik de auto laat repareren?</h4>
                <p className="text-sm text-muted-foreground">
                  Nee. Bij total loss is reparatie per definitie te duur. U krijgt dagwaarde, ongeacht of u repareert of niet.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold mb-2">📅 Hoe lang duurt total loss afwikkeling?</h4>
                <p className="text-sm text-muted-foreground">
                  Gemiddeld 3-6 weken vanaf expertise tot uitbetaling. Bij contra-expertise kan het 8-12 weken duren.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold mb-2">🚗 Wat als mijn auto meer waard was door nieuwe banden/APK?</h4>
                <p className="text-sm text-muted-foreground">
                  Recent onderhoud, nieuwe banden, verse APK verhogen de dagwaarde! Lever bewijzen (facturen, APK-keur) 
                  aan bij expertise.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold mb-2">💳 Wat als ik nog lening heb lopen op de auto?</h4>
                <p className="text-sm text-muted-foreground">
                  Uitkering gaat naar schuldeiser (bank/lease) eerst. Restant krijgt u. Is dagwaarde lager dan schuld? 
                  Dan houdt u restschuld over (GAP-verzekering kan dit dekken).
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="my-8 border-2 border-primary bg-gradient-to-br from-primary/5 to-white">
            <CardContent className="p-8 text-center">
              <Calculator className="h-16 w-16 mx-auto mb-4 text-primary" />
              <h3 className="text-2xl font-bold mb-4">
                Auto Total Loss? Wij Zorgen Voor Maximale Uitkering!
              </h3>
              <p className="text-muted-foreground mb-6">
                Total loss claims zijn complex. Verzekeraars bieden vaak te weinig. Wij onderhandelen voor u tot 
                marktconforme dagwaarde + alle bijkomende kosten. Gemiddeld €1.500-€3.000 meer uitkering!
              </p>
              <Link href="/claim-indienen">
                <Button size="lg" className="text-lg px-8">
                  <Upload className="mr-2 h-5 w-5" />
                  Start Total Loss Claim
                </Button>
              </Link>
              <p className="text-sm text-muted-foreground mt-4">
                100% gratis • U betaalt niets • Ook bij mislukking geen kosten
              </p>
            </CardContent>
          </Card>

          <div className="mt-12 pt-8 border-t">
            <h3 className="text-xl font-bold mb-4">📚 Gerelateerde Artikelen</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/blog/wa-verzekering-tegenpartij-claimen" className="block p-4 border rounded-lg hover:border-primary hover:shadow-md transition-all">
                <h4 className="font-semibold mb-2">WA Verzekering Tegenpartij Claimen</h4>
                <p className="text-sm text-muted-foreground">Hoe u schade verhaalt op de tegenpartij</p>
              </Link>
              
              <Link href="/veelgestelde-vragen" className="block p-4 border rounded-lg hover:border-primary hover:shadow-md transition-all">
                <h4 className="font-semibold mb-2">Veelgestelde Vragen</h4>
                <p className="text-sm text-muted-foreground">Alle antwoorden over autoschade verhalen</p>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
