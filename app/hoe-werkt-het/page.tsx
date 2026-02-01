import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image" // Added for potential future use or if Image component needed for visual aids
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, CheckCircle, Car, Euro, Gavel, FileText } from "lucide-react"

export const metadata: Metadata = {
  title: "Hoe Werkt Het? Uw Gratis Autoschade Verhalen in 6 Stappen | Gratisschadeverhalen.nl",
  description: "Ontdek hoe Gratisschadeverhalen.nl u gratis helpt bij het verhalen van materiële autoschade. Een duidelijk 6-stappenplan van melding tot uitbetaling, zonder gedoe.",
  keywords: ["hoe werkt het", "autoschade verhalen", "gratis verhaalservice", "materiële schade", "schade afhandelen", "stappenplan autoschade", "waarborgfonds schade", "schade melden"],
}

export default function HoeWerktHetPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-green-50 py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
              Hoe Werkt Het? <span className="text-primary">Uw Autoschade Gratis Verhalen</span> in 6 Stappen
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Materiële autoschade verhalen hoeft niet lastig te zijn. Bij Gratisschadeverhalen.nl regelen we het volledige proces voor u, <strong className="text-primary">helemaal kosteloos</strong>. Volg ons eenvoudige stappenplan en ontdek hoe wij u ontzorgen.
            </p>
            <div className="flex justify-center">
              <Link href="/claim-indienen">
                <Button size="lg" className="bg-primary hover:bg-primary-dark text-white text-lg px-8 py-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105">
                  <Upload className="mr-3 h-6 w-6" />
                  Meld Uw Schade Nu Gratis
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Introductie */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-4xl prose prose-lg text-gray-800">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-gray-900">
            Gratis Materieel Autoschade Verhaal: Zo Doen Wij Dat
          </h2>
          <p>
            Een auto-ongeluk is al vervelend genoeg. De nasleep, met formulieren invullen, contact met verzekeraars en experts, kan een hoop stress opleveren. Daarom is Gratisschadeverhalen.nl er. Wij bieden een <strong className="text-primary">volledig gratis verhaalservice</strong> voor uw materiële autoschade. Of het nu gaat om blikschade, total loss of enkel krassen; als een andere partij aansprakelijk is, verhalen wij de kosten op de tegenpartij. U betaalt niets aan ons, nooit. Onze kosten worden namelijk vergoed door de aansprakelijke verzekeraar.
          </p>
          <p>
            We richten ons uitsluitend op <strong className="text-primary">materiële voertuigschade</strong>. Dit betekent schade aan uw voertuig zelf, en geen complexere zaken zoals letselschade (waarvoor we u wel graag doorverwijzen naar <Link href="/letselschade" className="text-primary hover:underline">onze partner Unitas Letselschade</Link>). Laten we stap voor stap bekijken hoe wij te werk gaan om uw schade effectief en kosteloos te verhalen.
          </p>
        </div>
      </section>

      {/* 6-Stappen Plan */}
      <section className="py-12 bg-gradient-to-r from-gray-50 to-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center text-gray-900">
            Ons Duidelijke 6-Stappenplan voor Autoschade Verhalen
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Stap 1 */}
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col p-6 border border-gray-200 rounded-lg">
              <CardHeader className="items-center text-center pb-4">
                <div className="bg-blue-100 text-blue-600 rounded-full p-4 mb-4">
                  <FileText className="h-8 w-8" />
                </div>
                <CardTitle className="text-2xl font-semibold">Stap 1: Schademelding & Documenten Uploaden</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow text-gray-700 text-center">
                <p>
                  De eerste stap is het online melden van uw schade via ons beveiligde portaal. Vul ons eenvoudige formulier in met de details van het ongeval. Verzamel alle beschikbare documenten: een ingevuld en ondertekend Europees Schadeformulier (indien aanwezig), foto's van de schade, gegevens van getuigen en de tegenpartij. Heeft u geen schadeformulier? Geen probleem, wij helpen u verder. U kunt deze documenten digitaal en veilig <Link href="/downloads" className="text-primary hover:underline">uploaden in uw persoonlijke dashboard</Link>. Dit kan snel en eenvoudig, vaak al binnen enkele minuten.
                </p>
                <div className="mt-4 text-sm text-gray-500">
                  <p><em>Tip: Zorg voor duidelijke foto's van de schade aan beide voertuigen en de situatie ter plaatse.</em></p>
                </div>
              </CardContent>
            </Card>

            {/* Stap 2 */}
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col p-6 border border-gray-200 rounded-lg">
              <CardHeader className="items-center text-center pb-4">
                <div className="bg-green-100 text-green-600 rounded-full p-4 mb-4">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <CardTitle className="text-2xl font-semibold">Stap 2: Dossier Aanmaak & Indienen</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow text-gray-700 text-center">
                <p>
                  Nadat u uw schade heeft gemeld en de benodigde documenten heeft geüpload, starten wij direct met het aanmaken van uw dossier. Onze experts controleren alle informatie zorgvuldig op volledigheid en consistentie. Eventuele ontbrekende gegevens vragen wij bij u op. Zodra uw dossier compleet is, dienen wij de schade officieel in bij de verzekeraar van de tegenpartij. U kunt de status van uw dossier 24/7 volgen via ons <Link href="#" className="text-primary hover:underline">online dashboard</Link>, zodat u altijd op de hoogte bent van de voortgang.
                </p>
                <div className="mt-4 text-sm text-gray-500">
                  <p><em>Wij zorgen ervoor dat alle benodigde informatie correct wordt aangeleverd.</em></p>
                </div>
              </CardContent>
            </Card>

            {/* Stap 3 */}
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col p-6 border border-gray-200 rounded-lg">
              <CardHeader className="items-center text-center pb-4">
                <div className="bg-yellow-100 text-yellow-600 rounded-full p-4 mb-4">
                  <Gavel className="h-8 w-8" />
                </div>
                <CardTitle className="text-2xl font-semibold">Stap 3: Aansprakelijkheid Vaststellen</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow text-gray-700 text-center">
                <p>
                  Dit is een cruciale stap. Wij beoordelen de situatie op basis van de verkeersregels, bewijsstukken en eventuele getuigenverklaringen. Ons doel is om de aansprakelijkheid van de tegenpartij glashelder te krijgen. Vaak erkennen verzekeraars de aansprakelijkheid snel, maar soms is er discussie. In dat geval gaan wij de dialoog aan en zetten we juridische stappen in om uw recht op schadevergoeding te waarborgen. We benaderen de tegenpartij en hun verzekeraar direct om de zaak in gang te zetten.
                </p>
                <div className="mt-4 text-sm text-gray-500">
                  <p><em>Wij zijn gespecialiseerd in het vaststellen van aansprakelijkheid bij <Link href="/materiele-schade" className="text-primary hover:underline">materiële autoschade</Link>.</em></p>
                </div>
              </CardContent>
            </Card>

            {/* Stap 4 */}
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col p-6 border border-gray-200 rounded-lg">
              <CardHeader className="items-center text-center pb-4">
                <div className="bg-red-100 text-red-600 rounded-full p-4 mb-4">
                  <Car className="h-8 w-8" />
                </div>
                <CardTitle className="text-2xl font-semibold">Stap 4: Schade Expertise & Vaststelling</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow text-gray-700 text-center">
                <p>
                  Om de exacte hoogte van de schade aan uw voertuig vast te stellen, coördineren wij (indien nodig) een schade-expert. Deze onafhankelijke expert bekijkt de schade aan uw auto en maakt een gedetailleerd expertise rapport op. Dit rapport wordt gebruikt als basis voor de schadevergoeding. Wij regelen de afspraak, de communicatie en de gehele afwikkeling met de expert. Alle kosten van deze expertise worden verhaald op de aansprakelijke partij, zodat het voor u <strong className="text-primary">gratis</strong> blijft. Lees meer over het proces van een schade-expert op onze <Link href="/schade-expert" className="text-primary hover:underline">expertise pagina</Link>.
                </p>
                <div className="mt-4 text-sm text-gray-500">
                  <p><em>Zowel de expertise als onze dienstverlening is voor u kosteloos.</em></p>
                </div>
              </CardContent>
            </Card>

            {/* Stap 5 */}
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col p-6 border border-gray-200 rounded-lg">
              <CardHeader className="items-center text-center pb-4">
                <div className="bg-purple-100 text-purple-600 rounded-full p-4 mb-4">
                  <Euro className="h-8 w-8" />
                </div>
                <CardTitle className="text-2xl font-semibold">Stap 5: Onderhandeling & Afwikkeling</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow text-gray-700 text-center">
                <p>
                  Zodra de schade is vastgesteld, starten wij de onderhandelingen met de verzekeraar van de tegenpartij. Ons team van specialisten streeft naar een maximale schadevergoeding voor u, inclusief eventuele bijkomende kosten zoals vervangend vervoer of gederfde inkomsten indien van toepassing (bijvoorbeeld bij zakelijk gebruik van de auto). Wij zorgen ervoor dat alle posten correct worden meegenomen en verdedigen uw belangen. Mochten er complicaties ontstaan of weigert de verzekeraar mee te werken, dan zetten wij indien nodig juridische stappen in om uw schade alsnog te verhalen. Dit alles zonder dat u zich zorgen hoeft te maken over de kosten.
                </p>
                <div className="mt-4 text-sm text-gray-500">
                  <p><em>Wij vechten voor de maximale vergoeding waar u recht op heeft.</em></p>
                </div>
              </CardContent>
            </Card>

            {/* Stap 6 */}
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col p-6 border border-gray-200 rounded-lg">
              <CardHeader className="items-center text-center pb-4">
                <div className="bg-blue-100 text-blue-600 rounded-full p-4 mb-4">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <CardTitle className="text-2xl font-semibold">Stap 6: Uitbetaling Schadevergoeding</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow text-gray-700 text-center">
                <p>
                  Zodra een accoord is bereikt over de schadevergoeding, zorgen wij ervoor dat het geld zo snel mogelijk op uw rekening wordt gestort. U ontvangt de volledige schadevergoeding direct van de aansprakelijke verzekeraar, zonder dat hier kosten van onze dienstverlening vanaf gaan. U heeft immers recht op een volledige compensatie van uw materiële autoschade. Met ons <Link href="#" className="text-primary hover:underline">online dashboard</Link> houdt u tot het laatste moment inzicht in het proces en de verwachte uitbetaling.
                </p>
                <div className="mt-4 text-sm text-gray-500">
                  <p><em>De schadevergoeding wordt direct aan u overgemaakt.</em></p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Belangrijke Overwegingen */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-4xl prose prose-lg text-gray-800">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-gray-900">
            Belangrijke Overwegingen bij Autoschade Verhalen
          </h2>

          <h3 className="text-2xl font-semibold mt-8 mb-4">
            Gemiddelde Doorlooptijd: Realistische Verwachtingen
          </h3>
          <p>
            Vanaf het moment van melding tot de uiteindelijke uitbetaling duurt het verhalen van uw materiële autoschade gemiddeld <strong className="text-primary">6 tot 8 weken</strong>. De exacte duur hangt af van verschillende factoren, zoals de snelheid waarmee de tegenpartij en hun verzekeraar reageren, de complexiteit van de aansprakelijkheidsvraag, en de tijd die nodig is voor expertise. Wij doen er alles aan om het proces zo snel en efficiënt mogelijk te laten verlopen. U wordt via ons online dashboard continu op de hoogte gehouden van de status.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">
            Schade met een Buitenlandse Tegenpartij
          </h3>
          <p>
            Ook als de tegenpartij een buitenlandse verzekeraar heeft of uit een ander land komt, kunnen wij u helpen met het verhalen van uw materiële autoschade. Dit proces kan soms iets langer duren vanwege internationale procedures en communicatie, maar de basisprincipes van onze gratis verhaalservice blijven hetzelfde. Wij beschikken over de expertise om ook deze complexe zaken voor u af te handelen.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">
            Wat als er Geen Europees Schadeformulier is?
          </h3>
          <p>
            Het Europees Schadeformulier is een belangrijk document, maar het ontbreken ervan is geen reden tot paniek. Mocht het schadeformulier niet zijn ingevuld of ondertekend door de tegenpartij, dan vragen wij u om zoveel mogelijk andere bewijsstukken aan te leveren. Denk aan foto's van de situatie, kentekengegevens van de tegenpartij, namen en contactgegevens van getuigen (indien aanwezig) of een politierapport. Met deze informatie kunnen onze experts vaak alsnog de aansprakelijkheid vaststellen en de schade voor u verhalen. We helpen u graag met het verzamelen van de juiste gegevens. Bekijk ook onze <Link href="/downloads" className="text-primary hover:underline">downloads pagina</Link> voor handige templates, zoals een getuigenverklaring.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">
            Transparantie met Uw Persoonlijke Dashboard
          </h3>
          <p>
            Bij Gratisschadeverhalen.nl vinden we transparantie essentieel. Daarom krijgt u direct toegang tot uw persoonlijke online dashboard. Hierin kunt u 24/7 de status van uw schadeclaim inzien, communicatie met verzekeraars volgen, alle relevante documenten inzien én nieuwe stukken uploaden. Direct inzicht in uw dossier, altijd en overal. Zo bent u altijd volledig op de hoogte en behoudt u de controle, zonder dat u zelf actief achter de updates aan hoeft te jagen. Onze service is ontworpen om u volledig te ontzorgen, van begin tot eind.
          </p>
          {/* TODO: Overweeg hier een screenshot van het dashboard toe te voegen om de functionaliteit te visualiseren. Bijvoorbeeld een overzichtspagina met claim status. */}

          <h3 className="text-2xl font-semibold mt-8 mb-4">
            Focus op Materiële Voertuigschade
          </h3>
          <p>
            Wij zijn specialist in het verhalen van <Link href="/materiele-schade" className="text-primary hover:underline">materiële voertuigschade</Link>. Dit omvat schade aan uw auto, motor, scooter of ander motorvoertuig. Wij behandelen <strong>geen</strong> zaken zoals lease, loonregres, opstal/inboedel of directe letselschade. Heeft u echter wel letselschade opgelopen, dan verwijzen wij u graag door naar <strong className="text-primary">onze partner Unitas Letselschade</strong>. Zij zijn gespecialiseerd in het verlenen van juridische bijstand bij personenschade en kunnen u daar verder mee helpen. Onze focus stelt ons in staat om de beste en meest efficiënte gratis verhaalservice te bieden voor uw autoschade. Ook voor claims via het <Link href="/waarborgfonds" className="text-primary hover:underline">Waarborgfonds</Link> kunt u bij ons terecht.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white text-center">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Klaar om Uw Materiële Autoschade Gratis te Laten Verhalen?
          </h2>
          <p className="text-xl mb-8">
            Begin vandaag nog met het indienen van uw claim. Het is snel, eenvoudig en bovenal: <strong className="font-semibold">volledig kosteloos voor u als benadeelde</strong>.
          </p>
          <Link href="/claim-indienen">
            <Button size="lg" variant="secondary" className="text-primary bg-white hover:bg-gray-100 text-lg px-10 py-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105">
              <Upload className="mr-3 h-6 w-6" />
              Meld Uw Gratis Schadeclaim
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
