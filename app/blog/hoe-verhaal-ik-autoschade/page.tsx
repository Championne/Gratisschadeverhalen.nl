import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { AlertTriangle, ArrowLeft, FileText, Upload } from "lucide-react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons"

export const metadata: Metadata = {
  title: "Hoe verhaal ik autoschade op de tegenpartij? Complete gids 2026",
  description: "Stap-voor-stap uitleg voor het verhalen van autoschade bij de WA-verzekeraar van de tegenpartij. Van ongeval tot uitbetaling - alles wat u moet weten.",
  keywords: [
    "autoschade verhalen",
    "schade verhalen tegenpartij",
    "WA schade claimen",
    "aansprakelijkheidsbrief",
    "schade verhaal procedure"
  ],
}

export default function BlogPost() {
  return (
    <div className="min-h-screen bg-white">
      <article className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Breadcrumbs */}
        <Breadcrumbs items={[
          { label: "Blog", href: "/blog" },
          { label: "Hoe verhaal ik autoschade" }
        ]} />

        {/* Back button */}
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8">
          <ArrowLeft className="h-4 w-4" />
          Terug naar blog
        </Link>

        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
              Handleiding
            </span>
            <span>•</span>
            <span>8 minuten leestijd</span>
            <span>•</span>
            <span>23 januari 2026</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Hoe verhaal ik autoschade op de tegenpartij? Complete gids 2026
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Aangereden door iemand anders? Dan heeft u recht op volledige schadevergoeding. 
            In deze complete gids leggen we stap-voor-stap uit hoe u uw autoschade verhaalt bij 
            de WA-verzekeraar van de tegenpartij – zonder kosten, zonder eigen risico.
          </p>
        </header>

        {/* Table of Contents */}
        <Card className="bg-blue-50 border-blue-200 mb-12">
          <CardContent className="pt-6">
            <h2 className="font-bold mb-4 flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Inhoudsopgave
            </h2>
            <nav className="space-y-2 text-sm">
              <a href="#wanneer" className="block text-primary hover:underline">1. Wanneer kan ik autoschade verhalen?</a>
              <a href="#direct-na-ongeval" className="block text-primary hover:underline">2. Direct na het ongeval: 5 cruciale stappen</a>
              <a href="#gegevens-verzamelen" className="block text-primary hover:underline">3. Welke gegevens moet ik verzamelen?</a>
              <a href="#schadeformulier" className="block text-primary hover:underline">4. Het Europees Schadeformulier invullen</a>
              <a href="#claim-indienen" className="block text-primary hover:underline">5. De claim indienen bij de WA-verzekeraar</a>
              <a href="#aansprakelijkheidsbrief" className="block text-primary hover:underline">6. De aansprakelijkheidsbrief</a>
              <a href="#onderhandelen" className="block text-primary hover:underline">7. Onderhandelen met de verzekeraar</a>
              <a href="#uitbetaling" className="block text-primary hover:underline">8. Uitbetaling en afrond

ing</a>
              <a href="#valkuilen" className="block text-primary hover:underline">9. Veel voorkomende valkuilen</a>
              <a href="#wij-regelen" className="block text-primary hover:underline">10. Waarom wij het voor u regelen</a>
            </nav>
          </CardContent>
        </Card>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          
          <section id="wanneer" className="mb-12">
            <h2 className="text-3xl font-bold mb-6">1. Wanneer kan ik autoschade verhalen?</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              U kunt autoschade verhalen bij de tegenpartij wanneer <strong>de andere bestuurder 
              aansprakelijk is voor het ongeval</strong>. Dit betekent dat de tegenpartij een fout 
              heeft gemaakt waardoor uw auto beschadigd is geraakt.
            </p>
            
            <div className="bg-green-50 border-l-4 border-green-500 p-6 my-6">
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <FontAwesomeIcon icon={faCircleCheck} className="h-5 w-5 text-green-600" />
                U kunt verhalen bij:
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>✅ Kop-staart botsing (u werd van achteren aangereden)</li>
                <li>✅ Tegenpartij reed door rood licht</li>
                <li>✅ Tegenpartij negeerde voorrangsregel</li>
                <li>✅ Inhaalmanoeuvre ging fout</li>
                <li>✅ Parkeerschade door ander (met kenteken)</li>
                <li>✅ Gedeelde schuld (u krijgt percentage vergoed)</li>
              </ul>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 my-6">
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                Belangrijk om te weten:
              </h3>
              <p className="text-muted-foreground mb-2">
                <strong>Ook bij gedeelde schuld</strong> (bijvoorbeeld 70/30) kunt u verhalen! 
                U krijgt dan het percentage vergoed waarvoor de ander aansprakelijk is.
              </p>
              <p className="text-muted-foreground">
                <strong>Alleen WA-verzekering?</strong> Dan MOET u zelf verhalen bij de tegenpartij. 
                Uw eigen verzekeraar doet dit niet voor u.
              </p>
            </div>
          </section>

          <section id="direct-na-ongeval" className="mb-12">
            <h2 className="text-3xl font-bold mb-6">2. Direct na het ongeval: 5 cruciale stappen</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              De eerste minuten na een ongeval zijn cruciaal voor een succesvol schadeverhaal. 
              Volg deze stappen nauwkeurig:
            </p>

            <div className="space-y-6">
              <div className="border-l-4 border-primary pl-6">
                <h3 className="text-xl font-bold mb-2">Stap 1: Veiligheid waarborgen</h3>
                <p className="text-muted-foreground">
                  Zet uw waarschuwingslichten aan, plaats een gevarendriehoek en check of 
                  iedereen ongedeerd is. Bij letsel: bel 112.
                </p>
              </div>

              <div className="border-l-4 border-primary pl-6">
                <h3 className="text-xl font-bold mb-2">Stap 2: NOOIT schuld bekennen</h3>
                <p className="text-muted-foreground">
                  Zeg NOOIT "sorry, het was mijn schuld". Ook niet uit beleefdheid! Dit kan 
                  later tegen u gebruikt worden. Blijf feitelijk.
                </p>
              </div>

              <div className="border-l-4 border-primary pl-6">
                <h3 className="text-xl font-bold mb-2">Stap 3: Gegevens uitwisselen</h3>
                <p className="text-muted-foreground">
                  Wissel NAW-gegevens, kenteken, verzekeringsinformatie en telefoonnummer uit 
                  met de tegenpartij. Maak foto's van rijbewijzen en verzekeringspassen.
                </p>
              </div>

              <div className="border-l-4 border-primary pl-6">
                <h3 className="text-xl font-bold mb-2">Stap 4: Foto's maken</h3>
                <p className="text-muted-foreground">
                  Maak foto's van: schade aan beide auto's, situatie (vanuit meerdere hoeken), 
                  remsporen, verkeersborden, getuigen. Hoe meer bewijs, hoe beter.
                </p>
              </div>

              <div className="border-l-4 border-primary pl-6">
                <h3 className="text-xl font-bold mb-2">Stap 5: Europees Schadeformulier invullen</h3>
                <p className="text-muted-foreground">
                  Vul samen het Europees Schadeformulier (groene) in. Teken ALLEEN de 
                  feiten-sectie. Teken NOOIT de schuldbekentenis!
                </p>
              </div>
            </div>
          </section>

          <section id="gegevens-verzamelen" className="mb-12">
            <h2 className="text-3xl font-bold mb-6">3. Welke gegevens moet ik verzamelen?</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Voor een succesvolle claim heeft u deze gegevens nodig:
            </p>

            <Card className="mb-6">
              <CardContent className="pt-6">
                <h3 className="font-bold mb-4">📋 Checklist gegevens:</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Van de tegenpartij:</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>☑️ Volledige naam</li>
                      <li>☑️ Adres</li>
                      <li>☑️ Telefoonnummer</li>
                      <li>☑️ Kenteken</li>
                      <li>☑️ Verzekeringsmaatschappij</li>
                      <li>☑️ Polisnummer</li>
                      <li>☑️ Rijbewijsnummer (foto)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Van het ongeval:</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>☑️ Datum en tijd</li>
                      <li>☑️ Exacte locatie</li>
                      <li>☑️ Weersomstandigheden</li>
                      <li>☑️ Foto's van schade</li>
                      <li>☑️ Foto's van situatie</li>
                      <li>☑️ Getuigen (NAW)</li>
                      <li>☑️ Politierapport (indien aanwezig)</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="bg-red-50 border-l-4 border-red-500 p-6 my-6">
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                LET OP: Valkuil!
              </h3>
              <p className="text-muted-foreground">
                Geeft de tegenpartij geen gegevens? Noteer het kenteken, maak een foto 
                en doe aangifte bij de politie. U kunt dan via de RDW het adres achterhalen.
              </p>
            </div>
          </section>

          <section id="schadeformulier" className="mb-12">
            <h2 className="text-3xl font-bold mb-6">4. Het Europees Schadeformulier invullen</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Het groene Europees Schadeformulier (ook wel "aanrijdingsformulier" genoemd) is 
              het belangrijkste document voor uw claim. Vul het ALTIJD in, ook bij "kleine" schade.
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 my-6">
              <h3 className="font-bold mb-4">✨ Innovatie: Automatisch Inlezen bij Autoschadebureau.nl</h3>
              <p className="text-muted-foreground mb-4">
                Bij ons kunt u simpelweg een <strong>foto of scan van uw schadeformulier 
                uploaden</strong>. Ons geavanceerde OCR-systeem leest automatisch alle 
                gegevens uit en vult het online formulier voor u in. U hoeft alleen te 
                controleren en eventueel aan te vullen!
              </p>
              <Link href="/claim-indienen">
                <Button className="w-full">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload nu uw schadeformulier
                </Button>
              </Link>
            </div>

            <h3 className="text-xl font-bold mb-4 mt-8">Tips voor het invullen:</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex gap-3">
                <span className="text-primary font-bold">1.</span>
                <span><strong>Schrijf duidelijk en leesbaar</strong> – onleesbare formulieren 
                vertragen het proces.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">2.</span>
                <span><strong>Teken een schets</strong> – hoe grover, hoe beter. Geef rijrichtingen 
                aan met pijlen.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">3.</span>
                <span><strong>Vink de juiste vakjes aan</strong> bij "omstandigheden" 
                (bijvoorbeeld "reed achteruit", "negeerde stopbord").</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">4.</span>
                <span><strong>NOOIT schuld bekennen</strong> – kruis geen vakjes aan die schuld 
                impliceren als u het niet eens bent.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">5.</span>
                <span><strong>Handtekening</strong> – teken alleen de vakken die u heeft ingevuld, 
                niet de gehele verklaring.</span>
              </li>
            </ul>
          </section>

          <section id="claim-indienen" className="mb-12">
            <h2 className="text-3xl font-bold mb-6">5. De claim indienen bij de WA-verzekeraar</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Nu komt de belangrijkste stap: de schademelding en claim indienen bij de 
              WA-verzekeraar van de tegenpartij (niet uw eigen verzekeraar!).
            </p>

            <h3 className="text-xl font-bold mb-4">Wat moet u insturen?</h3>
            <ul className="space-y-2 text-muted-foreground mb-6">
              <li>📄 Kopie Europees Schadeformulier</li>
              <li>📷 Foto's van de schade</li>
              <li>📷 Foto's van de situatie</li>
              <li>📝 Omschrijving van het ongeval</li>
              <li>💶 Offerte(s) voor reparatie</li>
              <li>🧾 Eventuele extra kosten (taxatie, sleepkosten, vervangend vervoer)</li>
            </ul>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 my-6">
              <h3 className="font-bold mb-3">💡 Wij regelen dit volledig voor u</h3>
              <p className="text-muted-foreground mb-4">
                Bij Autoschadebureau.nl hoeft u dit niet zelf te doen. Wij:
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                <li>✅ Stellen professionele aansprakelijkheidsbrief op</li>
                <li>✅ Verzamelen alle benodigde documenten</li>
                <li>✅ Communiceren met de WA-verzekeraar</li>
                <li>✅ Onderhandelen voor maximale vergoeding</li>
                <li>✅ Zorgen voor snelle afhandeling</li>
              </ul>
              <Link href="/claim-indienen">
                <Button variant="outline" className="w-full">
                  Laat ons het regelen – 100% gratis
                </Button>
              </Link>
            </div>
          </section>

          <section id="aansprakelijkheidsbrief" className="mb-12">
            <h2 className="text-3xl font-bold mb-6">6. De aansprakelijkheidsbrief</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              De aansprakelijkheidsbrief is een formele brief waarin u de tegenpartij (via hun 
              WA-verzekeraar) <strong>aansprakelijk stelt voor de schade</strong> en een 
              schadevergoeding eist.
            </p>

            <h3 className="text-xl font-bold mb-4">Wat moet er in de brief?</h3>
            <ul className="space-y-2 text-muted-foreground mb-6">
              <li>📌 Uw NAW-gegevens en kenteken</li>
              <li>📌 NAW-gegevens tegenpartij en verzekeraar</li>
              <li>📌 Datum, tijd en plaats ongeval</li>
              <li>📌 Feitelijke omschrijving ongeval (geen meningen!)</li>
              <li>📌 Waarom de tegenpartij aansprakelijk is</li>
              <li>📌 Specificatie van de schade en kosten</li>
              <li>📌 Totaalbedrag schadevergoeding</li>
              <li>📌 Betalingstermijn (meestal 14 dagen)</li>
            </ul>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 my-6">
              <h3 className="font-bold mb-3">⚠️ Let op juridische taal</h3>
              <p className="text-muted-foreground">
                Een aansprakelijkheidsbrief moet <strong>juridisch correct</strong> zijn. 
                Fouten kunnen leiden tot afwijzing. Wij hebben jarenlange ervaring en kennen 
                alle juridische vereisten. Laat het aan ons over.
              </p>
            </div>
          </section>

          <section id="onderhandelen" className="mb-12">
            <h2 className="text-3xl font-bold mb-6">7. Onderhandelen met de verzekeraar</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Verzekeraars proberen vaak <strong>zo min mogelijk uit te betalen</strong>. 
              Typische tactieken:
            </p>

            <ul className="space-y-3 text-muted-foreground mb-6">
              <li className="flex gap-3">
                <span className="text-red-600">❌</span>
                <span><strong>Gedeelde schuld claimen</strong> ("u had ook kunnen remmen")</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-600">❌</span>
                <span><strong>Schade onderwaarderen</strong> ("die deuk valt wel mee")</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-600">❌</span>
                <span><strong>Discussie over kosten</strong> ("die taxatie was niet nodig")</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-600">❌</span>
                <span><strong>Proces vertragen</strong> (hopen dat u opgeeft)</span>
              </li>
            </ul>

            <div className="bg-green-50 border-l-4 border-green-500 p-6 my-6">
              <h3 className="font-bold mb-3">✅ Waarom professionele hulp loont</h3>
              <p className="text-muted-foreground mb-4">
                Wij kennen alle tactieken en weten hoe we verzekeraars moeten aanpakken. 
                Ons gemiddelde uitbetaling ligt <strong>23% hoger</strong> dan zelfstandige claims 
                omdat we:
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>✓ Alle mogelijke kosten claimen (die u misschien vergeet)</li>
                <li>✓ Juridisch correct argumenteren</li>
                <li>✓ Niet toegeven bij ongefundeerde afwijzingen</li>
                <li>✓ Doorprocederen indien nodig (zonder extra kosten voor u)</li>
              </ul>
            </div>
          </section>

          <section id="uitbetaling" className="mb-12">
            <h2 className="text-3xl font-bold mb-6">8. Uitbetaling en afronding</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Als de verzekeraar akkoord gaat met de claim, ontvangt u een 
              <strong>schikkingsvoorstel</strong>. Dit bevat:
            </p>

            <ul className="space-y-2 text-muted-foreground mb-6">
              <li>💰 Het bedrag dat wordt uitgekeerd</li>
              <li>📄 Specificatie van de kosten</li>
              <li>⚖️ Eventuele afwijkingen van uw claim</li>
              <li>📝 Finale kwijting (u tekent akkoord)</li>
            </ul>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 my-6">
              <h3 className="font-bold mb-3">🎯 Wij checken het voorstel</h3>
              <p className="text-muted-foreground">
                Voordat u tekent, beoordelen wij of het voorstel <strong>volledig en eerlijk</strong> is. 
                Te laag? Dan onderhandelen we door. Pas als het optimaal is, ronden we af. 
                U krijgt altijd het maximale bedrag.
              </p>
            </div>

            <h3 className="text-xl font-bold mb-4 mt-8">Gemiddelde doorlooptijd:</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>⏱️ <strong>1-2 weken:</strong> Eerste reactie verzekeraar</li>
              <li>⏱️ <strong>2-4 weken:</strong> Beoordeling en voorstel</li>
              <li>⏱️ <strong>4-8 weken:</strong> Finale uitbetaling</li>
            </ul>
          </section>

          <section id="valkuilen" className="mb-12">
            <h2 className="text-3xl font-bold mb-6">9. Veel voorkomende valkuilen</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Vermijd deze fouten die uw schadeverhaal kunnen verpesten:
            </p>

            <div className="space-y-4">
              <div className="bg-red-50 border-l-4 border-red-500 p-4">
                <h4 className="font-bold text-red-900 mb-2">❌ Valkuil 1: Schuld bekennen</h4>
                <p className="text-sm text-red-800">
                  "Sorry!" zeggen op de plaats van het ongeval wordt gezien als schuldbekentenis. 
                  Dit kan uw claim volledig torpederen.
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-4">
                <h4 className="font-bold text-red-900 mb-2">❌ Valkuil 2: Te snel akkoord gaan</h4>
                <p className="text-sm text-red-800">
                  Verzekeraars bieden vaak eerst een <strong>te laag bedrag</strong> in de 
                  hoop dat u direct akkoord gaat. Onderhandel altijd!
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-4">
                <h4 className="font-bold text-red-900 mb-2">❌ Valkuil 3: Niet alles claimen</h4>
                <p className="text-sm text-red-800">
                  Vergeet niet: taxatiekosten, sleepkosten, vervangend vervoer, 
                  waardeverlies – dit alles kunt u claimen!
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-4">
                <h4 className="font-bold text-red-900 mb-2">❌ Valkuil 4: Te laat claimen</h4>
                <p className="text-sm text-red-800">
                  Wacht niet te lang! Bewijs verdwijnt, getuigen vergeten, en juridisch 
                  is er een verjaringstermijn van 5 jaar.
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-4">
                <h4 className="font-bold text-red-900 mb-2">❌ Valkuil 5: Direct via eigen verzekeraar claimen</h4>
                <p className="text-sm text-red-800">
                  Bij alleen WA-verzekering doet uw verzekeraar niks. Bij casco/allrisk 
                  betaalt u eigen risico en stijgt uw premie. Verhaal EERST zelf bij tegenpartij!
                </p>
              </div>
            </div>
          </section>

          <section id="wij-regelen" className="mb-12">
            <h2 className="text-3xl font-bold mb-6">10. Waarom wij het voor u regelen</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Zoals u ziet: autoschade verhalen is een complex proces met veel juridische 
              valkuilen. <strong>Eén fout kan duizenden euro's kosten.</strong>
            </p>

            <Card className="bg-gradient-to-br from-blue-50 to-white border-2 border-primary">
              <CardContent className="pt-8 space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-3">✨ Waarom Autoschadebureau.nl?</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-3">
                      <FontAwesomeIcon icon={faCircleCheck} className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                      <span><strong>U betaalt niets</strong> – tegenpartij betaalt alles</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <FontAwesomeIcon icon={faCircleCheck} className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                      <span><strong>Gemiddeld 23% hogere uitbetaling</strong> dan zelfstandig claimen</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <FontAwesomeIcon icon={faCircleCheck} className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                      <span><strong>Automatisch inlezen</strong> – upload foto schadeformulier, wij doen de rest</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <FontAwesomeIcon icon={faCircleCheck} className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                      <span><strong>Realtime dashboard</strong> – volg uw claim 24/7 online</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <FontAwesomeIcon icon={faCircleCheck} className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                      <span><strong>Snelle expertise</strong> – direct starten met uw claim</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <FontAwesomeIcon icon={faCircleCheck} className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                      <span><strong>Jarenlange ervaring</strong> met verzekeraars en juridische procedures</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-6 border-t">
                  <Link href="/claim-indienen">
                    <Button size="lg" className="w-full text-lg">
                      Start nu – Upload uw schadeformulier
                    </Button>
                  </Link>
                  <p className="text-center text-sm text-muted-foreground mt-3">
                    Geen voorschot • Geen verborgen kosten • 100% gratis bij mislukking
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Conclusion */}
          <section className="bg-blue-50 border-l-4 border-primary p-8 rounded-r-lg mt-12">
            <h2 className="text-2xl font-bold mb-4">Conclusie</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Autoschade verhalen bij de tegenpartij is uw <strong>wettelijk recht</strong>, 
              maar vereist kennis van juridische procedures, onderhandelingstactieken en 
              verzekeringsjargon. Eén fout kan honderden tot duizenden euro's kosten.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Waarom het risico nemen? <strong>Laat ons het gratis voor u regelen</strong> 
              en ontvang gemiddeld 23% meer uitbetaling. U betaalt alleen bij succes, 
              dus u heeft letterlijk niets te verliezen.
            </p>
          </section>

          {/* Related Articles */}
          <section className="mt-16 pt-12 border-t">
            <h2 className="text-2xl font-bold mb-6">📚 Gerelateerde artikelen</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/blog/europees-schadeformulier-invullen" className="group">
                <Card className="h-full hover:shadow-lg transition-all hover:scale-[1.02]">
                  <CardContent className="pt-6">
                    <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">
                      Europees Schadeformulier invullen
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Veld-voor-veld uitleg en tips
                    </p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/blog/wat-te-doen-na-auto-ongeval" className="group">
                <Card className="h-full hover:shadow-lg transition-all hover:scale-[1.02]">
                  <CardContent className="pt-6">
                    <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">
                      Wat te doen na ongeval?
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Checklist voor directe actie
                    </p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/blog/aansprakelijkheid-verkeersongeval" className="group">
                <Card className="h-full hover:shadow-lg transition-all hover:scale-[1.02]">
                  <CardContent className="pt-6">
                    <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">
                      Aansprakelijkheid uitgelegd
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Juridische achtergrond
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </section>

        </div>
      </article>
    </div>
  )
}
