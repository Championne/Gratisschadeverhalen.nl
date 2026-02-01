
import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, CheckCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Letselschade - Informatie en Doorverwijzing | Gratisschadeverhalen.nl",
  description: "Heeft u letselschade na een ongeval? Op deze pagina vindt u uitgebreide informatie over letselschade en verwijzen wij u graag door naar onze partner Unitas Letselschade voor gespecialiseerde hulp. Gratisschadeverhalen.nl richt zich op gratis verhaal van materiële voertuigschade.",
  keywords: ["letselschade", "letselschade na ongeval", "schadevergoeding letselschade", "Unitas Letselschade", "persoonlijk letsel", "schade doorverwijzing"],
}

export default function LetselschadePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-green-50 py-12 md:py-20 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
              Letselschade: Informatie en de juiste weg naar Hulp na een ongeval
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Heeft u letsel opgelopen door een ongeval? Op deze pagina bieden we u essentiële informatie over letselschade. Hoewel Gratisschadeverhalen.nl gespecialiseerd is in het <strong>gratis verhalen van materiële voertuigschade</strong>, begrijpen we dat persoonlijk letsel een grote impact heeft. Daarom verwijzen wij u voor gespecialiseerde juridische bijstand bij letselschade graag door naar <strong>onze ervaren partner, Unitas Letselschade</strong>.
            </p>
            <div className="flex justify-center flex-wrap gap-4">
              <Link href="https://www.unitasletselschade.nl" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-all duration-300">
                  Direct contact met Unitas Letselschade
                </Button>
              </Link>
              <Link href="/claim-indienen">
                <Button size="lg" variant="outline" className="bg-white hover:bg-gray-50 text-orange-500 border-orange-500 font-semibold py-3 px-8 rounded-full shadow-lg transition-all duration-300">
                  <Upload className="mr-2 h-5 w-5" />
                  Materiële Schade Melden (Gratis)
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Referral to Unitas Section (Prominent) */}
      <section className="py-12 md:py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto shadow-xl border-t-4 border-orange-500 rounded-lg">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-3xl font-bold text-gray-800">
                Uw Partner voor Letselschade: Unitas Letselschade
              </CardTitle>
            </CardHeader>
            <CardContent className="text-lg text-gray-700 space-y-6">
              <p>
                Bij Gratisschadeverhalen.nl richten we ons volledig op het <strong>kosteloos verhalen van uw materiële autoschade</strong>. Dit omvat schade aan uw voertuig, expertisekosten, huurautokosten en alle overige directe materiële gevolgen van een ongeval.
              </p>
              <p>
                Letselschade, oftewel persoonlijk letsel, is echter een vak apart en vereist gespecialiseerde juridische kennis. Denk aan whiplash, botbreuken, psychische klachten of langdurige arbeidsongeschiktheid. Deze complexe claims vragen om een andere aanpak en expertise.
              </p>
              <p className="font-semibold text-gray-800">
                Daarom werken wij al jaren succesvol samen met <Link href="https://www.unitasletselschade.nl" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Unitas Letselschade</Link>. Zij zijn dé specialist in Nederland als het gaat om het claimen van letselschade na verkeersongevallen of andere ongevallen.
              </p>
              <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-8">
                <Image
                  src="/images/logo_unitas.png" // Placeholder, replace with actual Unitas logo path
                  alt="Unitas Letselschade Logo"
                  width={200}
                  height={80}
                  className="object-contain"
                />
                <div className="text-center md:text-left">
                  <p className="text-xl font-bold text-orange-500">Waarom Unitas Letselschade?</p>
                  <ul className="list-disc list-inside text-gray-700">
                    <li>Jarenlange ervaring en expertise in letselschaderecht.</li>
                    <li>Persoonlijke begeleiding en een menselijke aanpak.</li>
                    <li>Altijd kosteloze hulp voor het slachtoffer.</li>
                    <li>Transparante communicatie.</li>
                  </ul>
                  <p className="mt-4">
                    Bezoek hun website voor meer informatie of neem direct contact op:
                  </p>
                  <Link href="https://www.unitasletselschade.nl" target="_blank" rel="noopener noreferrer">
                    <Button className="mt-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold">
                      Naar Unitas Letselschade
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Content Sections - What is Letselschade */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg prose-blue text-gray-800">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 border-b-2 border-orange-500 pb-2">
              Wat is Letselschade precies?
            </h2>
            <p>
              Letselschade verwijst naar de schade die een persoon lijdt als gevolg van lichamelijk of geestelijk letsel, veroorzaakt door toedoen van een ander. Dit kan variëren van lichte verwondingen tot ernstige en blijvende beperkingen. Het doel van een letselschadeclaim is om de benadeelde in de situatie te brengen die zou hebben bestaan als het ongeval niet had plaatsgevonden. Dit omvat zowel materiële als immateriële schade.
            </p>
            <h3>Soorten Letselschade</h3>
            <p>
              Letselschade is een breed begrip en kan verschillende vormen aannemen. Hieronder vallen onder andere:
            </p>
            <ul>
              <li>
                <strong>Lichamelijk letsel:</strong> Dit zijn alle fysieke verwondingen zoals botbreuken, whiplash, kneuzingen, brandwonden, rugklachten, hersenletsel, etc.
              </li>
              <li>
                <strong>Psychisch letsel:</strong> Onzichtbaar, maar vaak net zo ingrijpend, zoals posttraumatische stressstoornis (PTSS), angststoornissen, depressie, concentratieproblemen en slaapstoornissen.
              </li>
              <li>
                <strong>Overige schadeposten:</strong> Naast het directe letsel kunnen er diverse financiële gevolgen zijn die onder letselschade vallen.
              </li>
            </ul>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 border-b-2 border-orange-500 pb-2 mt-12">
              Veelvoorkomende Schadeposten bij Letselschade
            </h2>
            <p>
              Wanneer u te maken krijgt met letselschade, kunnen hier diverse kosten en verliezen uit voortvloeien. Unitas Letselschade helpt u bij het in kaart brengen en claimen van al deze schadeposten, zodat u zich kunt richten op uw herstel. Enkele voorbeelden zijn:
            </p>
            <ul>
              <li>
                <strong>Medische kosten:</strong> Dit omvat alle kosten die niet gedekt worden door uw zorgverzekering, zoals eigen risico, behandelingen bij niet-gecontracteerde therapeuten, en medicatie.
              </li>
              <li>
                <strong>Verlies van arbeidsvermogen:</strong> Als u door het letsel (tijdelijk) niet of minder kunt werken, heeft u recht op compensatie voor het gederfde inkomen.
              </li>
              <li>
                <strong>Kosten voor huishoudelijke hulp:</strong> Indien u door het letsel niet langer zelf het huishouden kunt doen en hulp moet inschakelen.
              </li>
              <li>
                <strong>Reiskosten:</strong> Kosten voor reizen naar artsen, therapeuten, of andere medische afspraken.
              </li>
              <li>
                <strong>Smartengeld:</strong> Een vergoeding voor de immateriële schade, zoals gederfde levensvreugde, pijn en verdriet, littekens en andere esthetische schade. Dit is een compensatie voor het leed dat u is aangedaan.
              </li>
              <li>
                <strong>Kosten voor aanpassingen in huis of aan de auto:</strong> Noodzakelijke aanpassingen om uw leven met het letsel draaglijker te maken.
              </li>
              <li>
                <strong>Studievertraging:</strong> Indien uw letsel leidt tot vertraging in uw studie, kunt u hiervoor een vergoeding claimen.
              </li>
            </ul>
            <p>
              Het berekenen van letselschade is maatwerk en kan complex zijn, vooral bij blijvend letsel. Het is van cruciaal belang om hierbij professionele hulp in te schakelen, zoals Unitas Letselschade biedt. Hun expertise zorgt ervoor dat alle schadeposten correct worden geïdentificeerd en geclaimd.
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 border-b-2 border-orange-500 pb-2 mt-12">
              Ons Focus: Gratis Verhaal van Materiële Voertuigschade
            </h2>
            <p>
              Bij Gratisschadeverhalen.nl zijn wij de experts in het <strong>gratis en volledig ontzorgen</strong> van slachtoffers van autoschade. Wij richten ons op schade die direct aan uw voertuig is ontstaan en de bijkomende materiële kosten. Ons team van deskundigen staat klaar om de afhandeling van uw schadeclaim volledig uit handen te nemen, zonder dat u daarvoor hoeft te betalen.
            </p>
            <h3>Wat Wij Wél voor u Doen:</h3>
            <ul>
              <li>
                <strong>Materiële Autoschade Verhalen:</strong> Van blikschade tot total loss, wij zorgen dat de schade aan uw auto wordt vergoed door de aansprakelijke partij.
              </li>
              <li>
                <strong>Gratis Verhaalservice:</strong> Onze service is 100% kosteloos voor u als benadeelde partij, de kosten worden verhaald op de tegenpartij.
              </li>
              <li>
                <strong>Online Dashboard:</strong> Volg de status van uw claim 24/7 via ons persoonlijke online dashboard. Volledige transparantie en altijd inzicht.
              </li>
              <li>
                <strong>Expertise en Taxatie Coördinatie:</strong> Wij regelen de schade-expert die de omvang van de schade vakkundig vaststelt. Dit is essentieel voor een eerlijke vergoeding.
              </li>
              <li>
                <strong>Juridische bijstand bij weigering tegenpartij:</strong> Indien de aansprakelijke partij of diens verzekeraar weigerachtig is, schakelen wij juridische middelen in om uw recht te halen.
              </li>
              <li>
                <strong>Waarborgfonds Claims:</strong> Heeft u schade door een onbekende dader, of was de tegenpartij onverzekerd? Ook dan helpen wij u bij het claimen van uw schade bij het Waarborgfonds Motorverkeer. Zie ook onze speciale pagina over <Link href="/waarborgfonds" className="text-blue-600 hover:underline">Waarborgfonds</Link> voor meer informatie.
              </li>
            </ul>
            <p>
              Wij zorgen ervoor dat u krijgt waar u recht op heeft, snel en zonder gedoe. Uw focus ligt op uw dagelijkse bezigheden, de onze op het regelen van uw autoschade.
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 border-b-2 border-orange-500 pb-2 mt-12">
              Het Belang van Gescheiden Expertise
            </h2>
            <p>
              Het is van groot belang om bij een ongeval met zowel materiële schade als letselschade de juiste gespecialiseerde hulp in te schakelen voor elk type schade.
            </p>
            <p>
              Gratisschadeverhalen.nl ontzorgt u volledig bij de materiële schade aan uw voertuig. Wij regelen de taxatie, de communicatie met verzekeraars en zorgen voor de volledige afhandeling zodat u snel weer zorgeloos de weg op kunt. Hierbij staat de <strong>gratis verhaalservice</strong> centraal.
            </p>
            <p>
              Voor letselschade is de aanpak anders en intensiever. De gevolgen van letsel zijn vaak langdurig en de berekening van de schade is complex. Unitas Letselschade heeft hierin jarenlange, diepgaande expertise. Zij begeleiden u van A tot Z, verzamelen medische informatie, onderhandelen met verzekeraars en zorgen voor een maximale schadevergoeding voor uw geleden en toekomstige leed. Ook de diensten van Unitas Letselschade zijn voor letselschadeslachtoffers in de meeste gevallen kosteloos, omdat de kosten eveneens verhaald worden op de aansprakelijke partij.
            </p>
            <p className="font-semibold text-gray-800">
              Door deze scheiding van expertise zorgen we ervoor dat u voor beide schadetypen de best mogelijke en meest gespecialiseerde hulp ontvangt. Dit garandeert een optimale afhandeling van zowel uw materiële als uw letselschade.
            </p>
            <p className="font-semibold text-gray-800 mt-6">
              Heeft u zowel materiële schade als letselschade? Dan kunt u de materiële schade direct bij ons melden. Voor de letselschade neemt u contact op met onze partner Unitas. Beiden werken nauw samen om u zo goed mogelijk te helpen.
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 border-b-2 border-orange-500 pb-2 mt-12">
              Gratisschadeverhalen.nl: Uw Partner bij Materiële Autoschade
            </h2>
            <p>
              Bij een aanrijding waarbij uw auto beschadigd raakt, is het laatste waar u op zit te wachten, gedoe met papierwerk en verzekeraars. Wij nemen deze zorg volledig uit handen. Ons proces is eenvoudig en transparant:
            </p>
            <ol>
              <li>
                <strong>Schade Melden:</strong> U meldt de materiële schade eenvoudig en snel via ons online <Link href="/claim-indienen" className="text-blue-600 hover:underline">schadeformulier</Link>. Voeg foto's en eventuele documenten toe.
              </li>
              <li>
                <strong>Afhandeling door Experts:</strong> Onze schade-experts beoordelen uw zaak en nemen contact op met de aansprakelijke partij en diens verzekeraar.
              </li>
              <li>
                <strong>Herstel en Vergoeding:</strong> Zodra de aansprakelijkheid is erkend, regelen wij de expertise en zorgen voor een snelle uitbetaling van uw schade, bijvoorbeeld voor herstel bij een garage naar keuze.
              </li>
            </ol>
            <p>
              Denk eraan: Onze service voor materiële schade is altijd <strong>gratis en kosteloos</strong> voor u! Dit geldt voor alle schades waarvoor een tegenpartij aansprakelijk is.
            </p>
            <p>
              Voor meer informatie over ons proces, kunt u terecht op onze pagina "<Link href="/hoe-werkt-het" className="text-blue-600 hover:underline">Hoe Werkt Het?</Link>".
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 border-b-2 border-orange-500 pb-2 mt-12">
              Veelgestelde Vragen over Letselschade en Materiële Schade
            </h2>
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">Wat is het verschil tussen materiële schade en letselschade?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Materiële schade betreft schade aan bezittingen, zoals uw auto, kleding of andere eigendommen. Letselschade verwijst naar lichamelijk of geestelijk letsel dat u oploopt en de daaruit voortvloeiende kosten, zoals medische kosten, verlies van inkomen en smartengeld. Gratisschadeverhalen.nl behandelt materiële schade, Unitas Letselschade is onze partner voor letselschade.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">Regelt Gratisschadeverhalen.nl ook mijn letselschade?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Nee, Gratisschadeverhalen.nl is gespecialiseerd in het gratis verhalen van <strong>materiële autoschade</strong>. Voor letselschade werken wij exclusief samen met onze partner <Link href="https://www.unitasletselschade.nl" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Unitas Letselschade</Link>, die hiervoor de juiste expertise heeft.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">Zijn de diensten van Unitas Letselschade ook gratis?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Ja, in de meeste gevallen zijn de diensten van Unitas Letselschade voor het slachtoffer ook kosteloos. Net als bij materiële schade worden deze kosten verhaald op de aansprakelijke partij. U hoeft dus geen honorarium aan Unitas te betalen.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">Waarom is het belangrijk om letselschade apart te claimen?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Letselschadeclaims zijn vaak complex en langdurig, met veel meer facetten dan materiële schadeclaims. Het vereist specialistische kennis van medische en juridische aspecten. Door gespecialiseerde partijen in te schakelen voor elk type schade (Gratisschadeverhalen.nl voor materieel, Unitas voor letsel) bent u verzekerd van de beste en meest optimale afhandeling van beide schades.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">Wat moet ik doen als ik naast letsel ook materiële schade heb?</Card口感
                </CardHeader>
                <CardContent>
                  <p>
                    U kunt de materiële schade aan uw voertuig direct en gratis melden via ons <Link href="/claim-indienen" className="text-blue-600 hover:underline">online schadeformulier</Link>. Voor uw letselschade neemt u contact op met onze partner <Link href="https://www.unitasletselschade.nl" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Unitas Letselschade</Link>. De teams van Gratisschadeverhalen.nl en Unitas werken vaak samen om een gecoördineerde afhandeling te garanderen.
                  </p>
                </CardContent>
              </Card>
            </div>


          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-red-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Heeft u materiële schade of wilt u direct hulp bij letselschade?
          </h2>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Voor materiële autoschade staan wij direct voor u klaar – 100% gratis en ontzorgd. Voor letselschade verwijzen we u met het volste vertrouwen door naar onze gespecialiseerde partner.
          </p>
          <div className="flex justify-center flex-wrap gap-4">
            <Link href="/claim-indienen">
              <Button size="lg" className="bg-white hover:bg-gray-100 text-orange-600 font-semibold py-3 px-8 rounded-full shadow-lg transition-all duration-300">
                <Upload className="mr-2 h-5 w-5" />
                Materiële Schade Nu Melden (Gratis)
              </Button>
            </Link>
            <Link href="https://www.unitasletselschade.nl" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="bg-transparent border-2 border-white hover:bg-white hover:text-orange-500 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-all duration-300">
                Contact Unitas Letselschade (voor letsel)
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
