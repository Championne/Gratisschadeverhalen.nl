import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload } from "lucide-react"

export const metadata: Metadata = {
  title: "Artikel 185 WVW Uitgelegd: Alles over Aansprakelijkheid bij Ongevallen | GratisSchadeverhalen.nl",
  description: "Een diepgaande uitleg van Artikel 185 WVW. Begrijp de bescherming voor zwakke verkeersdeelnemers, de 50%-regel en hoe GratisSchadeverhalen.nl u gratis helpt bij materiële autoschade.",
  keywords: ["artikel 185 wvw", "wegenverkeerswet", "aansprakelijkheid ongeval", "zwakke verkeersdeelnemers", "50% regel", "eigen schuld", "overmacht", "verhaalservice", "gratis schade verhalen"],
}

export default function Artikel185WvwPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-green-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Artikel 185 WVW: Uw Rechten als Zwakke Verkeersdeelnemer Uitgelegd
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Hebt u als fietser of voetganger schade opgelopen door een motorvoertuig? Artikel 185 van de Wegenverkeerswet (WVW) beschermt u. Begrijp uw positie en ontdek hoe GratisSchadeverhalen.nl u kosteloos helpt bij het verhalen van uw materiële autoschade.
            </p>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <h2>Wat houdt Artikel 185 WVW precies in?</h2>
            <p>
              Artikel 185 van de Wegenverkeerswet (WVW) is een cruciaal wetsartikel in het Nederlandse aansprakelijkheidsrecht bij verkeersongevallen. Het beschermt de zogeheten <a href="#zwakke-verkeersdeelnemers" className="text-primary hover:underline">zwakke verkeersdeelnemers</a> tegen schade veroorzaakt door <a href="#sterke-verkeersdeelnemers" className="text-primary hover:underline">motorrijtuigen</a>. In essentie bepaalt dit artikel dat de eigenaar of houder van een motorrijtuig vrijwel altijd aansprakelijk is voor schade toegebracht aan ongemotoriseerde verkeersdeelnemers, zoals fietsers en voetgangers, tenzij er sprake is van overmacht of opzet.
            </p>
            <p>
              Dit betekent dat als u als fietser of voetganger wordt aangereden door een auto, motor of vrachtwagen, de bestuurder van dat motorvoertuig in principe aansprakelijk is voor uw schade, ook al is hij of zij niet direct ‘schuldig’ in de zin van een verkeersfout. De wetgever heeft deze bescherming in het leven geroepen omdat een motorvoertuig inherent gevaarlijker is en meer schade kan veroorzaken dan een fietser of voetganger. Dit staat bekend als de <a href="#risico-aansprakelijkheid" className="text-primary hover:underline">risicoaansprakelijkheid</a>.
            </p>

            <h3 id="zwakke-verkeersdeelnemers">Wie zijn "zwakke verkeersdeelnemers"?</h3>
            <p>
              Onder zwakke verkeersdeelnemers vallen alle weggebruikers die niet met een motorvoertuig deelnemen aan het verkeer. Denk hierbij aan:
            </p>
            <ul>
              <li>Voetgangers</li>
              <li>Fietsers (ook op e-bikes en speed pedelecs)</li>
              <li>Skaters en steppers</li>
              <li>Bestuurders van handbewogen invalidenvoertuigen</li>
              <li>Kinderen en mensen met een beperking</li>
            </ul>
            <p>
              Het gaat hierbij dus om personen die bij een ongeval doorgaans het onderspit delven ten opzichte van een motorvoertuig.
            </p>

            <h3 id="sterke-verkeersdeelnemers">Wie zijn "sterke verkeersdeelnemers"?</h3>
            <p>
              Sterke verkeersdeelnemers zijn zij die zich voortbewegen in een motorrijtuig. Dit zijn onder andere:
            </p>
            <ul>
              <li>Auto's</li>
              <li>Motoren</li>
              <li>Vrachtwagens</li>
              <li>Bussen</li>
              <li>Scooters en bromfietsen (hoewel deze ook een speciale positie kunnen hebben t.o.v. nog grotere motorvoertuigen)</li>
            </ul>
            <p>
              De eigenaar of houder van zo'n motorvoertuig draagt de risicoaansprakelijkheid voortvloeiend uit Artikel 185 WVW.
            </p>

            <h2>De Risicoaansprakelijkheid en de "Tenzij"-clausule</h2>
            <p>
              Zoals gezegd, is de eigenaar van het motorrijtuig in principe aansprakelijk. Echter, er zijn uitzonderingen. Dit is de 'tenzij'-clausule in Artikel 185 WVW. Aansprakelijkheid kan worden beperkt of uitgesloten als er sprake is van:
            </p>

            <h3>Overmacht (Force Majeure)</h3>
            <p>
              Van overmacht is sprake wanneer de bestuurder van het motorrijtuig een fout van de zwakke verkeersdeelnemer redelijkerwijs niet kon vermijden. Dit is een zeer zware bewijslast. Een bestuurder moet aantonen dat hij of zij <strong>niet de minste blaam treft</strong> en dat er geen enkele verkeersfout is gemaakt, hoe klein ook. In de praktijk wordt dit zelden aangenomen door de rechter. Denk aan gevallen waarin een fietser plotseling met hoge snelheid tegen een stilstaande auto aanrijdt, zonder dat de bestuurder enige mogelijkheid had om dit te voorkomen.
            </p>

            <h3>Eigen Schuld van de Zwakke Verkeersdeelnemer</h3>
            <p>
              Meestal is er geen sprake van pure overmacht aan de zijde van de bestuurder van het motorvoertuig. Vaak is er wel sprake van eigen schuld aan de zijde van de zwakke verkeersdeelnemer. Dit betekent dat de fietser of voetganger zelf (deels) verantwoordelijk is voor het ontstaan van de aanrijding. Denk aan door rood licht rijden, geen voorrang verlenen of onoplettendheid.
            </p>
            <p>
              Hoewel er sprake kan zijn van eigen schuld, betekent dit niet dat de schade niet vergoed wordt. Door de beschermende aard van Artikel 185 WVW gelden er speciale regels:
            </p>

            <h4 id="50-regel">De 50%-regel (Billijkheidscorrectie)</h4>
            <p>
              Standaard rechtspraak heeft de zogenaamde '50%-regel' geïntroduceerd. Dit houdt in dat indien er sprake is van eigen schuld aan de zijde van de zwakke verkeersdeelnemer, de schade van de fietser/voetganger toch voor minimaal 50% wordt vergoed. Dit is een vaste regel, tenzij er sprake is van opzet of aan opzet grenzende roekeloosheid aan de kant van de zwakke verkeersdeelnemer.
            </p>
            <p>
              Zelfs als een fietser aantoonbaar 80% eigen schuld heeft aan een ongeval, zal zijn materiële schade toch voor minimaal 50% door de verzekering van het motorvoertuig worden gedragen. Dit is een belangrijke sociale waarborg.
            </p>

            <h4 id="14-min-regel">De 100% of '14-min'-regel voor kinderen</h4>
            <p>
              Voor kinderen tot 14 jaar geldt een nog verdergaande bescherming. Als een kind onder de 14 jaar bij het ongeval betrokken is en hierbij schade oploopt door een motorrijtuig, wordt de schade in principe altijd voor 100% vergoed. Dit is alleen anders als er sprake is van opzet of aan opzet grenzende roekeloosheid van het kind, wat in de praktijk zelden voorkomt en zeer moeilijk te bewijzen is. De gedachte hierachter is dat van jonge kinderen niet verwacht kan worden dat zij de risico's van het verkeer volledig kunnen inschatten.
            </p>

            <h3>Opzet of aan opzet grenzende roekeloosheid</h3>
            <p>
              Dit is de enige situatie waarin de zwakke verkeersdeelnemer helemaal geen recht heeft op schadevergoeding. Hierbij moet aangetoond worden dat de zwakke verkeersdeelnemer het ongeval opzettelijk heeft veroorzaakt of zich zodanig roekeloos heeft gedragen dat dit gelijk gesteld moet worden aan opzet. Dit komt zelden voor en is extreem moeilijk te bewijzen.
            </p>

            <h2>Materiële Autoschade Verhalen met Artikel 185 WVW</h2>
            <p>
              De focus van Artikel 185 WVW ligt op de bescherming van de zwakke verkeersdeelnemer. Echter, in de praktijk zien we vaak situaties waarin de eigenaar van een motorvoertuig zelf schade oploopt door een ander motorvoertuig, of waarbij de schuldvraag complexer is. GratisSchadeverhalen.nl is gespecialiseerd in het <strong>gratis verhalen van uw materiële autoschade</strong>, ongeacht of Artikel 185 WVW van toepassing is of niet.
            </p>
            <p>
              Bij verkeersongevallen waarbij twee of meer motorvoertuigen betrokken zijn, is Artikel 185 WVW niet direct van toepassing op de onderlinge relatie van deze voertuigen. Dan gelden de algemene verkeersregels en het bewijsrecht. Toch kan de kennis van Artikel 185 WVW en de interpretatie van aansprakelijkheid van belang zijn in bredere schadeclaims.
            </p>
            <p>
              Onze service richt zich specifiek op het kosteloos verhalen van de schade aan uw voertuig, zoals uw auto, motor of bromfiets. Dit omvat onder andere herstelkosten, transportkosten, waardevermindering en kosten voor vervangend vervoer.
            </p>

            <h3>Hoe GratisSchadeverhalen.nl u helpt</h3>
            <p>
              Bij een aanrijding waarbij u materiële autoschade oploopt, kan Artikel 185 WVW een gunstige positie creëren, mocht u als zwakke verkeersdeelnemer zijn aangereden. Maar ook in andere gevallen staan wij voor u klaar. Wij bieden een complete en <strong>gratis verhaalservice</strong> voor particulieren en bedrijven. Dit betekent dat u geen kosten maakt voor onze juridische bijstand; de kosten worden direct verhaald op de aansprakelijke tegenpartij of diens verzekeraar.
            </p>
            <p>
              Ons proces in het kort:
            </p>
            <ol>
              <li><strong>Schade melden:</strong> U meldt eenvoudig uw materiële schade via ons <Link href="/claim-indienen" className="text-primary hover:underline">online schadeformulier</Link>.</li>
              <li><strong>Wij regelen alles:</strong> Wij nemen alle communicatie met de tegenpartij en verzekeraar uit handen. Wij verzamelen bewijsmateriaal, stellen de aansprakelijkheidsbrief op en onderhandelen over de hoogte van de schadevergoeding.</li>
              <li><strong>Expertise:</strong> Indien nodig coördineren wij een schade-expertise om de omvang van uw materiële schade vast te stellen. <Link href="/schade-expert" className="text-primary hover:underline">Lees meer over de schade-expert</Link>.</li>
              <li><strong>Uitkering:</strong> Zodra de aansprakelijkheid is erkend en de schade is vastgesteld, zorgen wij ervoor dat de vergoeding snel naar u wordt overgemaakt.</li>
            </ol>
            <p>
              U heeft 24/7 inzicht in de voortgang van uw dossier via ons <Link href="/dashboard" className="text-primary hover:underline">persoonlijke online dashboard</Link>.
            </p>

            <h3>Wat als de Tegenpartij Onbekend of Onverzekerd is? Het Waarborgfonds.</h3>
            <p>
              Soms heeft u schade, maar is de dader onbekend of onverzekerd. In dat geval kunt u mogelijk een beroep doen op het Waarborgfonds Motorverkeer. Ook hierbij kunnen wij u <strong>kosteloos ondersteunen</strong> met het indienen van de claim en het doorlopen van het proces. <Link href="/waarborgfonds" className="text-primary hover:underline">Ontdek meer over het Waarborgfonds</Link>.
            </p>

            <h3>Letselschade? Wij verwijzen u door.</h3>
            <p>
              Artikel 185 WVW is vooral bekend van de bescherming bij lichamelijk letsel. Hoewel GratisSchadeverhalen.nl zich specialiseert in materiële autoschade, begrijpen wij dat letselschade na een ongeval ook van groot belang is. Voor de behandeling van letselschade werken wij nauw samen met <strong>onze partner Unitas Letselschade</strong>. Zij zijn de experts op dit gebied en kunnen u professioneel begeleiden bij het verhalen van uw letselschade. Wij verwijzen u graag naar hen door voor gespecialiseerde hulp.
            </p>

            <h2>Veelgestelde Vragen over Artikel 185 WVW en Schade Verhalen</h2>

            <Card className="mb-4">
              <CardHeader>
                <CardTitle className="text-xl">1. Geldt Artikel 185 WVW altijd?</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Nee, Artikel 185 WVW geldt alleen voor schade toegebracht door een motorrijtuig aan een ongemotoriseerde verkeersdeelnemer (fietser, voetganger, etc.). Bij ongevallen tussen twee motorrijtuigen gelden de algemene aansprakelijkheidsregels uit het Burgerlijk Wetboek.</p>
              </CardContent>
            </Card>

            <Card className="mb-4">
              <CardHeader>
                <CardTitle className="text-xl">2. Wat betekent de 50%-regel precies voor mijn schade?</CardTitle>
              </CardHeader>
              <CardContent>
                <p>De 50%-regel betekent dat, ongeacht de mate van eigen schuld van de zwakke verkeersdeelnemer, minimaal 50% van zijn of haar schade wordt vergoed door de verzekeraar van het motorvoertuig. Dit is een bescherming ingebouwd in de wet.</p>
              </CardContent>
            </Card>

            <Card className="mb-4">
              <CardHeader>
                <CardTitle className="text-xl">3. Ik ben als fietser aangereden door een fiets, is Artikel 185 WVW dan van toepassing?</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Nee, Artikel 185 WVW is alleen van toepassing als een motorrijtuig betrokken is. Bij een aanrijding tussen twee fietsers geldt het Burgerlijk Wetboek en moet de schuld (en dus de aansprakelijkheid) worden aangetoond op basis van verkeersfouten.</p>
              </CardContent>
            </Card>
            
            <Card className="mb-4">
              <CardHeader>
                <CardTitle className="text-xl">4. Wat als de bestuurder van het motorvoertuig zegt dat het mijn eigen schuld was?</CardTTitle>
              </CardHeader>
              <CardContent>
                <p>Zelfs bij eigen schuld van de zwakke verkeersdeelnemer gelden de beschermende regels van Artikel 185 WVW, zoals de 50%-regel. Het is belangrijk dat u dit niet zomaar accepteert en juridische hulp inschakelt. GratisSchadeverhalen.nl helpt u hier gratis bij voor uw materiële schade.</p>
              </CardContent>
            </Card>

            <Card className="mb-4">
              <CardHeader>
                <CardTitle className="text-xl">5. Zijn de diensten van GratisSchadeverhalen.nl ook écht gratis?</CardTTitle>
              </CardHeader>
              <CardContent>
                <p>Ja, absoluut. Onze service voor het verhalen van uw materiële autoschade is 100% kosteloos voor u als benadeelde partij. Dit komt omdat wij onze kosten direct verhalen op de aansprakelijke tegenpartij, zoals de Nederlandse wet voorschrijft.</p>
              </CardContent>
            </Card>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Materiële Schade Geleden? Meld Het Vandaag Nog Gratis!
          </h2>
          <p className="mb-6 text-lg">
            Laat u niet ontmoedigen door de complexiteit van schadeclaims. Onze expertise staat voor u klaar. Meld uw schade en wij zorgen voor de rest, geheel kosteloos.
          </p>
          <Link href="/claim-indienen">
            <Button size="lg" variant="secondary" className="bg-green-500 hover:bg-green-600 text-white">
              <Upload className="mr-2 h-5 w-5" />
              Start Uw Gratis Schadeclaim
            </Button>
          </Link>
          <p className="mt-4 text-sm">
            Heeft u letselschade? Neem contact op met <a href="https://www.unitasletselschade.nl" target="_blank" rel="noopener noreferrer" className="text-blue-200 hover:text-blue-100 underline">onze partner Unitas Letselschade</a>.
          </p>
        </div>
      </section>
    </div>
  )
}