
import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, CheckCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Schade Verhalen op het Waarborgfonds | GratisSchadeVerhalen",
  description: "Heeft u materiële autoschade door een onbekende dader? Ontdek hoe GratisSchadeVerhalen u gratis helpt bij het verhalen van schade op het Waarborgfonds. Meer informatie over de voorwaarden en uw rechten.",
  keywords: ["waarborgfonds schade", "schade onbekende dader", "materiële autoschade", "gratis verhaalservice", "verkeersslachtoffer", "eigen risico waarborgfonds", "waarborfonds", "autoschade verhalen"],
}

export default function WaarborgfondsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-green-50 py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
              Schade Verhalen op het Waarborgfonds: Uw Recht op Schadevergoeding
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Heeft u materiële autoschade opgelopen door een onbekende of onverzekerde tegenpartij, of door een onvoorzichtig veroorzaakt ongeval waar niemand voor aansprakelijk blijkt? GratisSchadeVerhalen.nl helpt u kosteloos uw <strong>waarborgfonds schade</strong> te verhalen. Ontdek hoe wij u bijstaan.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/claim-indienen">
                <Button size="lg" className="bg-primary text-white hover:bg-primary-dark">
                  <Upload className="mr-2 h-5 w-5" />
                  Meld Uw Schade Nu Gratis
                </Button>
              </Link>
              <Link href="#hoe-wij-helpen">
                <Button size="lg" variant="outline" className="text-primary border-primary hover:bg-primary/10">
                  Lees Meer
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg prose-blue text-gray-800">
            <h2>Wat is het Waarborgfonds Motorverkeer?</h2>
            <p>
              Het Waarborgfonds Motorverkeer is opgericht om slachtoffers van verkeersongevallen toch een schadevergoeding te kunnen bieden wanneer de veroorzaker onbekend is, onverzekerd is, gestolen was, of sprake is van overmacht. Het fonds vangt deze gevallen op zodat u niet met uw <strong>schade</strong> blijft zitten. Als uw <strong>materiële autoschade</strong> door een onbekende dader is veroorzaakt, stelt het Waarborgfonds u in staat om uw schade toch te verhalen. Bij GratisSchadeVerhalen.nl navigeren wij u door dit complexe proces – volledig <strong>gratis</strong>.
            </p>
            <p>
              Het indienen van een claim bij het Waarborgfonds Motorverkeer kent specifieke regels en voorwaarden waaraan voldaan moet worden. Het is cruciaal dat u de juiste stappen onderneemt en bewijsmateriaal verzamelt. Met onze expertise zorgen wij ervoor dat uw aanvraag correct en volledig wordt ingediend, waardoor uw kansen op een succesvolle afhandeling aanzienlijk toenemen.
            </p>

            <h2 id="situaties">In Welke 5 Situaties Keert het Waarborgfonds Uit?</h2>
            <p>Het Waarborgfonds Motorverkeer biedt uitkomst in specifieke gevallen waarin een normale verzekeringsclaim niet mogelijk is. De 5 belangrijkste situaties waarin een beroep op het Waarborgfonds kan worden gedaan, zijn:</p>
            <ol>
              <li>
                <strong>De motorrijtuigbestuurder is onbekend:</strong> Dit is de meest voorkomende situatie. Denk aan een aanrijding op een parkeerplaats, vluchtmisdrijf na een botsing, of een auto die doorrijdt na het veroorzaken van schade aan uw voertuig terwijl het geparkeerd stond. Het is essentieel dat u direct na het ontdekken van de schade aangifte doet bij de politie. Dit bewijst dat de dader onbekend is gebleven.
              </li>
              <li>
                <strong>De motorrijtuigbestuurder is onverzekerd:</strong> Ondanks de verplichte Wettelijke Aansprakelijkheidsverzekering Motorrijtuigen (WAM-verzekering) rijden er nog steeds onverzekerde voertuigen rond. Wanneer u schade oploopt door een dergelijke partij, kunt u de schade claimen bij het Waarborgfonds.
              </li>
              <li>
                <strong>De motorrijtuigbestuurder is vrijgesteld van verzekeringsplicht:</strong> Dit betreft een zeer beperkt aantal gevallen, zoals bepaalde voertuigen van de overheid of het openbaar vervoer. Dit komt zelden voor bij particuliere schadeclaims.
              </li>
              <li>
                <strong>Het motorrijtuig is gestolen en de bestuurder wist dit:</strong> Wanneer een gestolen voertuig <strong>schade</strong> veroorzaakt en de bestuurder wist dat het voertuig gestolen was (en dus niet verzekerd was), kan het Waarborgfonds de schade vergoeden. Bent u zelf het slachtoffer van een gestolen voertuig dat schade heeft veroorzaakt, nemen wij deze procedure voor u uit handen.
              </li>
              <li>
                <strong>De schade vindt plaats door overmacht/noodtoestand:</strong> Hoewel zeldzaam, kan in uitzonderlijke situaties van zogenaamde overmacht (bijvoorbeeld een auto die door een plotselinge medische noodsituatie van de bestuurder schade veroorzaakt) het Waarborgfonds de schade vergoeden.
              </li>
            </ol>
            <p>
              In al deze situaties, waarbij u met <strong>materiële voertuigschade</strong> kampt, staan wij voor u klaar. Onze service is altijd <strong>gratis</strong>.
            </p>

            <h3>Cruciale Voorwaarden voor een Claim bij het Waarborgfonds</h3>
            <p>
              Een claim indienen bij het Waarborgfonds Motorverkeer vereist strikte naleving van diverse voorwaarden. Het is van groot belang dat u deze in acht neemt, anders kan uw claim worden afgewezen. Wij begeleiden u stap voor stap door deze vereisten:
            </p>
            <ul>
              <li>
                <strong>Aangifte bij de politie:</strong> Bij een onbekende dader dient u <strong>binnen 14 dagen</strong> na het ongeval of het ontdekken van de schade aangifte te doen bij de politie. Zonder politierapport is een claim bij het Waarborgfonds vrijwel kansloos. Bewijs van het contact met de politie (proces-verbaal of registratienummer) is cruciaal.
              </li>
              <li>
                <strong>Onderzoek naar de identiteit van de dader:</strong> U moet zelf aannemelijke inspanningen hebben verricht om de identiteit van de dader te achterhalen. Denk hierbij aan getuigen zoeken, camerabeelden opvragen (indien beschikbaar), briefjes achterlaten of navraag doen in de buurt. Wij kunnen u hierin adviseren en ondersteunen.
              </li>
              <li>
                <strong>Getuigenverklaringen:</strong> Indien er getuigen waren van het ongeval, is het van groot belang om hun contactgegevens te noteren en eventueel een schriftelijke verklaring op te vragen. Dit versterkt uw bewijspositie aanzienlijk.
              </li>
              <li>
                <strong>Termijn voor schade melden:</strong> De schade moet <strong>binnen 3 jaar</strong> na het ontstaan bij het Waarborgfonds gemeld worden. Echter, hoe sneller u de <strong>schade</strong> meldt, hoe beter de bewijspositie vaak is.
              </li>
              <li>
                <strong>Eerlijkheid en volledigheid:</strong> Alle informatie die u aanlevert moet naar waarheid zijn en volledig. Het verstrekken van onjuiste of onvolledige informatie kan leiden tot afwijzing van uw claim.
              </li>
            </ul>

            <h3 id="eigen-risico">Het Eigen Risico bij een Waarborgfonds Claim</h3>
            <p>
              In de meeste gevallen hanteert het Waarborgfonds Motorverkeer een wettelijk <strong>eigen risico van €250,-</strong>. Dit betekent dat bij een toegekende claim de eerste €250,- voor uw eigen rekening blijft. Dit eigen risico is ingesteld om misbruik van het fonds te voorkomen en slachtoffers te stimuleren zoveel mogelijk zelf te doen om de dader te achterhalen. Echter, er zijn uitzonderingen:
            </p>
            <ul>
              <li>
                <strong>Geen eigen risico bij letselschade:</strong> Wanneer u naast materiële schade ook letselschade heeft opgelopen, wordt er geen eigen risico toegepast. Let op: Voor letselschade verwijzen wij u altijd door naar onze partner <Link href="https://www.unitasletselschade.nl" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Unitas Letselschade</Link>, zij zijn gespecialiseerd in dergelijke claims. Ons primaire focus blijft <strong>materiële voertuigschade</strong>.
              </li>
              <li>
                <strong>Geen eigen risico bij bepaalde onverzekerde daders:</strong> In zeer specifieke gevallen, bijvoorbeeld wanneer de dader willens en wetens onverzekerd reed en de schade significant is, kan het Waarborgfonds besluiten het eigen risico niet toe te passen. Dit is echter geen standaard procedure.
              </li>
            </ul>
            <p>
              Het is belangrijk om te weten dat dit eigen risico puur geldt voor de financiële afhandeling via het Waarborgfonds. De service van GratisSchadeVerhalen.nl blijft in alle gevallen <strong>gratis en kosteloos</strong> voor u als gedupeerde.
            </p>

            <h2 id="hoe-wij-helpen">Hoe GratisSchadeVerhalen.nl U Helpt bij Waarborgfonds Schade</h2>
            <p>
              Het verhalen van <strong>schade</strong> op het Waarborgfonds Motorverkeer kan complex, tijdrovend en frustrerend zijn. Er zijn veel regels en valkuilen waar u als leek gemakkelijk in kunt trappen. Dit is waar GratisSchadeVerhalen.nl het verschil maakt. Wij nemen het gehele proces van u over, van het eerste contact tot de uiteindelijke uitkering van uw schade.
            </p>
            <p>
              Onze gespecialiseerde juridische experts hebben jarenlange ervaring met dit soort claims. Wij zorgen voor:
            </p>
            <ul>
              <li>
                <strong>Professionele begeleiding:</strong> Wij adviseren u over de benodigde stappen en documenten.
              </li>
              <li>
                <strong>Complete dossiervorming:</strong> Wij verzamelen alle bewijsstukken, zoals politierapporten, getuigenverklaringen en schaderapporten.
              </li>
              <li>
                <strong>Communicatie met het Waarborgfonds:</strong> Wij onderhouden de correspondentie en voeren de discussies met het Waarborgfonds, zodat u dat niet hoeft te doen.
              </li>
              <li>
                <strong>Maximalisatie van uw schadebedrag:</strong> Wij zorgen ervoor dat alle verhaalbare materiële schade wordt meegenomen in de claim, inclusief waardevermindering van uw voertuig.
              </li>
              <li>
                <strong>Gratis service:</strong> Zoals de naam al zegt, is onze service <strong>geheel kosteloos</strong> voor u als slachtoffer. Onze kosten worden verhaald op de tegenpartij of, in dit geval, rechtstreeks op het Waarborgfonds. Dat is onze belofte.
              </li>
            </ul>
            <p>
              Laat u niet ontmoedigen door de complexiteit. Heeft u <strong>materiële autoschade</strong> door een onbekende dader of in één van de andere situaties waar het Waarborgfonds uitkeert? Neem vandaag nog contact met ons op en laat ons u volledig <strong>gratis</strong> helpen. U heeft recht op een rechtvaardige schadevergoeding!
            </p>

            <h3> veelgestelde Vragen over Schade en het Waarborgfonds</h3>
            <Card className="mb-4">
              <CardHeader>
                <CardTitle className="text-lg">Wat moet ik doen direct na het ontdekken van waarborgfonds schade?</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Meteen foto's maken van de situatie en de schade. Doe vervolgens zo snel mogelijk (binnen 14 dagen) aangifte bij de politie. Probeer ook zelf getuigen of andere bewijzen te verzamelen. Meld de schade zo spoedig mogelijk bij GratisSchadeVerhalen.nl om verdere stappen te bespreken.</p>
              </CardContent>
            </Card>
            <Card className="mb-4">
              <CardHeader>
                <CardTitle className="text-lg">Kan ik een claim indienen als ik de dader niet ken en geen getuigen heb?</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Ja, in veel gevallen is dit mogelijk. De sleutel is dat u aannemelijke inspanningen heeft geleverd om de dader te achterhalen (bijvoorbeeld briefjes, navraag, controle camera's) én dat u tijdig politiële aangifte heeft gedaan. Wij helpen u te bewijzen dat de dader onbekend is gebleven.</p>
              </CardContent>
            </Card>
            <Card className="mb-4">
              <CardHeader>
                <CardTitle className="text-lg">Hoe zit het met mijn eigen risico van €250,-?</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Het Waarborgfonds hanteert een wettelijk eigen risico van €250,- voor materiële schadeclaims. Dit bedrag komt voor uw eigen rekening. Bij letselschade (waarvoor wij u doorverwijzen naar Unitas Letselschade) geldt dit eigen risico overigens niet.</p>
              </CardContent>
            </Card>
            <Card className="mb-4">
              <CardHeader>
                <CardTitle className="text-lg">Hoelang duurt het voordat mijn waaborgfonds schadeclaim wordt afgehandeld?</CardTitle>
              </CardHeader>
              <CardContent>
                <p>De doorlooptijd van Waarborgfonds claims kan variëren, afhankelijk van de complexiteit van het dossier en de benodigde bewijsvoering. Gemiddeld duurt het enkele maanden. Wij houden u uiteraard continu op de hoogte van de voortgang.</p>
              </CardContent>
            </Card>
            <Card className="mb-4">
              <CardHeader>
                <CardTitle className="text-lg">Verhalen jullie ook letselschade in combinatie met materiële schade?</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Onze expertise ligt bij <strong>materiële autoschade</strong>. Voor letselschade werken wij nauw samen met onze gespecialiseerde partner <Link href="https://www.unitasletselschade.nl" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Unitas Letselschade</Link>. Zij nemen uw letselschadeclaim kosteloos in behandeling, terwijl wij uw materiële schade gratis afhandelen. Zo bent u verzekerd van de beste specialisten op elk gebied.</p>
              </CardContent>
            </Card>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Uw Schade Gratis Laten Verhalen op het Waarborgfonds?
          </h2>
          <p className="text-lg mb-8">
            Heeft u <strong>materiële autoschade</strong> en komt u in aanmerking voor een claim bij het Waarborgfonds Motorverkeer? Laat ons u helpen met onze <strong>kosteloze verhaalservice</strong>. Meld uw schade vandaag nog!
          </p>
          <Link href="/claim-indienen">
            <Button size="lg" variant="secondary" className="text-primary-dark hover:bg-secondary-dark">
              <CheckCircle className="mr-2 h-5 w-5" />
              Start Uw Gratis Claim
            </Button>
          </Link>
          <p className="mt-4 text-sm">
            Geen kosten voor u, wij verhalen de kosten op het Waarborgfonds.
          </p>
        </div>
      </section>
    </div>
  )
}
