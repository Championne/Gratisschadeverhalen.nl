import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, AlertTriangle, Upload, Phone } from "lucide-react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons"

export const metadata: Metadata = {
  title: "WA Verzekering Tegenpartij Claimen: Complete Gids 2025",
  description: "Alles over het claimen bij de WA-verzekering van de tegenpartij. Stap voor stap uitleg, rechten, termijnen en veelgemaakte fouten voorkomen.",
  keywords: [
    "wa verzekering tegenpartij claimen",
    "schade verhalen tegenpartij",
    "wa schade claimen",
    "aansprakelijkheid tegenpartij",
    "eigen risico vermijden",
    "premie niet verhogen",
    "wa verzekeraar contacteren"
  ],
}

export default function WAVerzekeringClaimenPage() {
  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Link href="/blog" className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
          <ArrowLeft className="h-4 w-4" />
          Terug naar Knowledge Base
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium">Verzekeringen</span>
            <span>•</span>
            <span>8 min leestijd</span>
            <span>•</span>
            <span>24 januari 2025</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            WA Verzekering Tegenpartij Claimen: Complete Gids 2025
          </h1>
          
          <p className="text-xl text-muted-foreground">
            Aangereden door iemand anders? U kunt de schade verhalen op de WA-verzekering van de tegenpartij. 
            Geen eigen risico, geen premieverhoging. Leer hoe het werkt en welke rechten u heeft.
          </p>
        </div>

        <Card className="border-2 border-primary bg-primary/5 mb-8">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Upload className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-2">💡 Wij regelen het gratis voor u!</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Upload uw schadeformulier en wij contacteren de WA-verzekeraar van de tegenpartij. 
                  U betaalt niets - alle kosten worden door hen vergoed.
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
          <h2>Wat is Een WA-Verzekering?</h2>
          <p>
            Een <strong>WA-verzekering</strong> (Wettelijke Aansprakelijkheidsverzekering) is in Nederland <strong>verplicht</strong> voor elke auto. 
            Deze verzekering dekt de schade die u met uw auto aan anderen toebrengt - zoals schade aan hun voertuig, letsel, of materiële schade.
          </p>

          <Card className="my-6 border-l-4 border-l-blue-500">
            <CardContent className="p-4">
              <p className="font-semibold mb-2">🎯 Belangrijk Om Te Weten:</p>
              <ul className="text-sm space-y-1 ml-4">
                <li>• De WA-verzekering van de <strong>tegenpartij</strong> vergoedt <strong>uw</strong> schade</li>
                <li>• U hoeft uw eigen verzekering NIET te gebruiken</li>
                <li>• Uw premie blijft gelijk (geen premieverhoging)</li>
                <li>• U betaalt geen eigen risico</li>
              </ul>
            </CardContent>
          </Card>

          <h2>Waarom Bij De Tegenpartij Claimen? (3 Grote Voordelen)</h2>

          <div className="grid md:grid-cols-3 gap-4 my-6">
            <Card className="border-2 border-green-200 bg-green-50">
              <CardContent className="p-4 text-center">
                <div className="text-3xl mb-2">💰</div>
                <h4 className="font-bold mb-2">Geen Eigen Risico</h4>
                <p className="text-sm text-muted-foreground">
                  Bespaar €300-€1000+ eigen risico dat u WEL betaalt bij eigen verzekering
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-200 bg-blue-50">
              <CardContent className="p-4 text-center">
                <div className="text-3xl mb-2">📈</div>
                <h4 className="font-bold mb-2">Premie Blijft Gelijk</h4>
                <p className="text-sm text-muted-foreground">
                  Uw no-claim korting blijft intact. Geen premieverhoging volgend jaar!
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-200 bg-purple-50">
              <CardContent className="p-4 text-center">
                <div className="text-3xl mb-2">⚡</div>
                <h4 className="font-bold mb-2">Snellere Afhandeling</h4>
                <p className="text-sm text-muted-foreground">
                  Direct verhalen = vaak sneller dan via eigen casco verzekering
                </p>
              </CardContent>
            </Card>
          </div>

          <h2>Stap Voor Stap: Claimen Bij WA-Verzekering Tegenpartij</h2>

          <div className="space-y-6 my-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">1</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Verzamel Alle Gegevens</h3>
                <p className="text-muted-foreground mb-2">U heeft nodig:</p>
                <ul className="text-sm space-y-1 ml-4">
                  <li>✅ Ingevuld Europees Schadeformulier (door beide partijen getekend)</li>
                  <li>✅ Kenteken tegenpartij (zeer belangrijk!)</li>
                  <li>✅ Naam + polisnummer WA-verzekeraar tegenpartij</li>
                  <li>✅ Foto's van schade (beide auto's)</li>
                  <li>✅ Getuigenverklaringen (indien van toepassing)</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">2</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Zoek De Verzekeraar Van De Tegenpartij</h3>
                <p className="text-muted-foreground mb-3">3 manieren om de verzekeraar te vinden:</p>
                <div className="bg-blue-50 p-4 rounded-lg space-y-2 text-sm">
                  <p><strong>Optie 1:</strong> Check het Europees Schadeformulier - staat onder veld 8</p>
                  <p><strong>Optie 2:</strong> Bel Verbond van Verzekeraars: 070 - 333 88 88 (met kenteken tegenpartij)</p>
                  <p><strong>Optie 3:</strong> <Link href="/claim-indienen" className="text-primary hover:underline">Upload bij ons</Link> - wij zoeken het automatisch op!</p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">3</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Meld De Schade Bij WA-Verzekeraar Tegenpartij</h3>
                <p className="text-muted-foreground mb-3">
                  <strong>Let op:</strong> Dit is een juridisch proces. Een professionele aansprakelijkheidsbrief verhoogt uw kans op succes enorm.
                </p>
                <Card className="bg-yellow-50 border-yellow-200">
                  <CardContent className="p-4">
                    <p className="text-sm mb-2"><strong>⚠️ Veelgemaakte fouten bij zelf melden:</strong></p>
                    <ul className="text-xs space-y-1 ml-4">
                      <li>• Onvolledige schademelding → verzekeraar wijst claim af</li>
                      <li>• Verkeerde juridische termen → claim wordt niet serieus genomen</li>
                      <li>• Te late melding → verzuimtermijn verlopen</li>
                      <li>• Geen duidelijke aansprakelijkstelling → geen resultaat</li>
                    </ul>
                    <div className="mt-3 pt-3 border-t">
                      <p className="text-sm font-semibold text-green-900">✅ Beter: Laat ons het doen</p>
                      <p className="text-xs text-green-800">
                        Wij sturen een professionele aansprakelijkheidsbrief met alle juridische vereisten. 
                        Verzekeraars reageren sneller en positiever op professionele schademeldingen.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">4</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Wacht Op Reactie Verzekeraar</h3>
                <p className="text-muted-foreground mb-2">De WA-verzekeraar heeft <strong>4 weken</strong> de tijd om te reageren:</p>
                <ul className="text-sm space-y-2 ml-4">
                  <li><FontAwesomeIcon icon={faCircleCheck} className="inline h-4 w-4 text-green-600 mr-2" /><strong>Akkoord:</strong> Ze accepteren aansprakelijkheid en starten schadevergoeding</li>
                  <li><AlertTriangle className="inline h-4 w-4 text-yellow-600 mr-2" /><strong>Gedeeltelijk akkoord:</strong> Bijv. 70/30 schuld verdeling</li>
                  <li><AlertTriangle className="inline h-4 w-4 text-red-600 mr-2" /><strong>Afwijzing:</strong> Ze ontkennen aansprakelijkheid (juridische stappen nodig)</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">5</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Schade Laten Taxeren</h3>
                <p className="text-muted-foreground mb-2">
                  De verzekeraar stuurt een expert om de schade te taxeren. U heeft het recht om:
                </p>
                <ul className="text-sm space-y-1 ml-4">
                  <li>✅ Eigen garage te kiezen voor reparatie</li>
                  <li>✅ Meerdere offertes aan te vragen</li>
                  <li>✅ Aanwezig te zijn bij expertise</li>
                  <li>✅ Een contra-expertise te laten uitvoeren (kosten worden vergoed bij gelijk)</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">6</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Ontvang Schadevergoeding</h3>
                <p className="text-muted-foreground">
                  Gemiddeld binnen <strong>4-8 weken</strong> na akkoord ontvangt u de volledige schadevergoeding, 
                  inclusief alle bijkomende kosten zoals expertise, huurauto, en administratie.
                </p>
              </div>
            </div>
          </div>

          <h2>Welke Kosten Kunt U Verhalen?</h2>

          <Card className="my-6 bg-green-50 border-2 border-green-200">
            <CardContent className="p-6">
              <h3 className="font-bold text-lg mb-4">✅ U Kunt ALLES Verhalen:</h3>
              
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-semibold mb-2">🚗 Directe Schadekosten:</p>
                  <ul className="space-y-1 ml-4">
                    <li>• Reparatiekosten (volledige herstel)</li>
                    <li>• Vervangingswaarde (bij total loss)</li>
                    <li>• Waardevermindering na reparatie</li>
                    <li>• Bergingskosten/taksen</li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold mb-2">💼 Bijkomende Kosten:</p>
                  <ul className="space-y-1 ml-4">
                    <li>• Huurauto tijdens reparatie</li>
                    <li>• Expertisekosten</li>
                    <li>• Administratiekosten</li>
                    <li>• Juridische kosten (indien nodig)</li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold mb-2">📄 Extra Vergoedingen:</p>
                  <ul className="space-y-1 ml-4">
                    <li>• OV-kosten (zonder huurauto)</li>
                    <li>• Parkeerkosten expertiselocatie</li>
                    <li>• Eigen tijd (forfaitair bedrag)</li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold mb-2">👤 Bij Letsel Ook:</p>
                  <ul className="space-y-1 ml-4">
                    <li>• Medische kosten</li>
                    <li>• Inkomensderving</li>
                    <li>• Smartengeld</li>
                    <li>• Revalidatiekosten</li>
                  </ul>
                </div>
              </div>

              <div className="mt-4 p-3 bg-purple-50 border border-purple-200 rounded">
                <p className="text-xs">
                  <strong>💡 Letselschade?</strong> Wij detecteren automatisch letsel-indicaties en verwijzen u door naar 
                  onze gespecialiseerde partner <strong>Unitas Letselschade</strong>.
                </p>
              </div>
            </CardContent>
          </Card>

          <h2>Veelgemaakte Fouten (Voorkom Deze!)</h2>

          <div className="space-y-4 my-8">
            <Card className="border-l-4 border-l-red-500 bg-red-50">
              <CardContent className="p-4">
                <h4 className="font-semibold text-red-900 mb-2">❌ Fout 1: Direct Eigen Verzekering Bellen</h4>
                <p className="text-sm mb-2">
                  Bij WA-verzekering doet uw verzekeraar niets. Bij casco/allrisk betaalt u eigen risico EN stijgt premie.
                </p>
                <p className="text-xs text-green-700"><strong>✅ Beter:</strong> Eerst verhalen bij tegenpartij. Eigen verzekering als uiterste noodmaatregel.</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-red-500 bg-red-50">
              <CardContent className="p-4">
                <h4 className="font-semibold text-red-900 mb-2">❌ Fout 2: Te Lang Wachten</h4>
                <p className="text-sm mb-2">
                  Juridisch heeft u 5 jaar, maar bewijs vervalt en verzekeraars worden argwanend bij late claims.
                </p>
                <p className="text-xs text-green-700"><strong>✅ Beter:</strong> Start binnen 1-2 weken na ongeval.</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-red-500 bg-red-50">
              <CardContent className="p-4">
                <h4 className="font-semibold text-red-900 mb-2">❌ Fout 3: Te Snel Akkoord Gaan Met Laag Bedrag</h4>
                <p className="text-sm mb-2">
                  Verzekeraars bieden vaak eerst een te laag bedrag aan ("take it or leave it").
                </p>
                <p className="text-xs text-green-700"><strong>✅ Beter:</strong> Laat ons onderhandelen. Wij kennen de marktconforme bedragen.</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-red-500 bg-red-50">
              <CardContent className="p-4">
                <h4 className="font-semibold text-red-900 mb-2">❌ Fout 4: Geen Bewijs Bewaren</h4>
                <p className="text-sm mb-2">
                  "Het staat op het formulier" is vaak niet genoeg. Foto's en getuigen zijn cruciaal.
                </p>
                <p className="text-xs text-green-700"><strong>✅ Beter:</strong> 20-30 foto's maken + getuigenverklaringen.</p>
              </CardContent>
            </Card>
          </div>

          <h2>Wat Als De Verzekeraar Weigert Te Betalen?</h2>

          <p>Verzekeraars wijzen claims soms af, bijvoorbeeld bij:</p>
          <ul>
            <li>• Onduidelijke aansprakelijkheid (50/50 schuld)</li>
            <li>• Tegenpartij ontkent schuld</li>
            <li>• Onvoldoende bewijs</li>
            <li>• Procedurele fouten in aansprakelijkstelling</li>
          </ul>

          <Card className="my-6 bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <h4 className="font-bold mb-3">🔧 Oplossingen bij Weigering:</h4>
              
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-semibold mb-1">1️⃣ Formele Sommatie</p>
                  <p className="text-muted-foreground">
                    Juridische brief met herhaalde eis + termijn (meestal 14 dagen). 
                    In 60% van gevallen lost dit het op.
                  </p>
                </div>

                <div>
                  <p className="font-semibold mb-1">2️⃣ Klacht Bij Kifid (Geschillencommissie)</p>
                  <p className="text-muted-foreground">
                    Onafhankelijke instantie die gratis oordeelt over geschillen met verzekeraars. 
                    Binding uitspraak binnen 3-6 maanden.
                  </p>
                </div>

                <div>
                  <p className="font-semibold mb-1">3️⃣ Gerechtelijke Procedure</p>
                  <p className="text-muted-foreground">
                    Als laatste optie: juridische procedure starten. Kosten worden bij winst op tegenpartij verhaald. 
                    Wij schakelen advocaat in indien nodig.
                  </p>
                </div>
              </div>

              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded">
                <p className="text-xs text-green-900">
                  <strong>✅ Wij regelen escalatie:</strong> Onze ervaren juristen weten precies hoe verzekeraars 
                  te overtuigen. In 95% van gevallen bereiken we een schikking zonder rechtbank.
                </p>
              </div>
            </CardContent>
          </Card>

          <h2>Hoelang Duurt Het Verhaal Proces?</h2>

          <div className="bg-gray-50 p-6 rounded-lg my-6">
            <h3 className="font-bold mb-4">⏱️ Gemiddelde Tijdlijn:</h3>
            
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <div className="bg-blue-600 text-white rounded px-2 py-1 text-xs font-bold flex-shrink-0">Dag 1</div>
                <p>U dient claim in via Autoschadebureau.nl</p>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-blue-600 text-white rounded px-2 py-1 text-xs font-bold flex-shrink-0">Dag 1-2</div>
                <p>Wij beoordelen claim en stellen aansprakelijkheidsbrief op</p>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-blue-600 text-white rounded px-2 py-1 text-xs font-bold flex-shrink-0">Week 1</div>
                <p>Verzekeraar tegenpartij ontvangt formele aansprakelijkstelling</p>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-green-600 text-white rounded px-2 py-1 text-xs font-bold flex-shrink-0">Week 2-4</div>
                <p>Verzekeraar onderzoekt claim, stuurt expert, en geeft standpunt</p>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-green-600 text-white rounded px-2 py-1 text-xs font-bold flex-shrink-0">Week 4-6</div>
                <p>Onderhandeling over schadebedrag (indien akkoord met aansprakelijkheid)</p>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-purple-600 text-white rounded px-2 py-1 text-xs font-bold flex-shrink-0">Week 6-8</div>
                <p><strong>Uitbetaling!</strong> U ontvangt schadevergoeding op uw rekening</p>
              </div>
            </div>

            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
              <p className="text-xs">
                <strong>⚠️ Let op:</strong> Bij gecompliceerde claims (betwiste aansprakelijkheid, total loss, letsel) 
                kan het proces 10-16 weken duren.
              </p>
            </div>
          </div>

          <h2>Veelgestelde Vragen</h2>

          <div className="space-y-4 my-8">
            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold mb-2">💰 Betaal ik iets aan jullie?</h4>
                <p className="text-sm text-muted-foreground">
                  Nee! Alle kosten voor het verhalen worden door de WA-verzekeraar van de tegenpartij betaald. 
                  U betaalt letterlijk niets - ook niet bij mislukking.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold mb-2">📞 Moet ik zelf de verzekeraar bellen?</h4>
                <p className="text-sm text-muted-foreground">
                  Nee, wij doen alle communicatie voor u. U hoeft alleen uw claim in te dienen en wij regelen de rest.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold mb-2">🚗 Kan ik mijn auto laten repareren tijdens het proces?</h4>
                <p className="text-sm text-muted-foreground">
                  Ja, maar wacht eerst op goedkeuring van de verzekeraar of expertise. Anders riskeert u dat ze niet alles vergoeden.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold mb-2">⏰ Wat als 4 weken voorbij zijn zonder reactie?</h4>
                <p className="text-sm text-muted-foreground">
                  Wij sturen een herinnering (ingebrekestelling). Na 6 weken zonder reactie starten we formele procedures.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="my-8 border-2 border-primary bg-gradient-to-br from-primary/5 to-white">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">
                Klaar Om Te Claimen Bij De Tegenpartij?
              </h3>
              <p className="text-muted-foreground mb-6">
                Upload uw schadeformulier en wij starten direct met verhaal op de WA-verzekeraar van de tegenpartij. 
                Binnen 24 uur krijgt u al een eerste beoordeling.
              </p>
              <Link href="/claim-indienen">
                <Button size="lg" className="text-lg px-8">
                  <Upload className="mr-2 h-5 w-5" />
                  Start Nu Uw Gratis Claim
                </Button>
              </Link>
              <p className="text-sm text-muted-foreground mt-4">
                100% gratis • Geen eigen risico • Premie blijft gelijk
              </p>
            </CardContent>
          </Card>

          <div className="mt-12 pt-8 border-t">
            <h3 className="text-xl font-bold mb-4">📚 Gerelateerde Artikelen</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/blog/hoe-verhaal-ik-autoschade" className="block p-4 border rounded-lg hover:border-primary hover:shadow-md transition-all">
                <h4 className="font-semibold mb-2">Hoe verhaal ik autoschade op de tegenpartij?</h4>
                <p className="text-sm text-muted-foreground">Complete gids voor het schade verhalen proces</p>
              </Link>
              
              <Link href="/blog/wat-te-doen-na-ongeval" className="block p-4 border rounded-lg hover:border-primary hover:shadow-md transition-all">
                <h4 className="font-semibold mb-2">Wat te doen na een auto-ongeval?</h4>
                <p className="text-sm text-muted-foreground">Stap voor stap checklist direct na de botsing</p>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
