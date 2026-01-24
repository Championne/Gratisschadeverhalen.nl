import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { ArrowLeft, AlertTriangle, Upload, CheckCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Achterop Gereden Worden | Wat Te Doen & Wie Is Aansprakelijk?",
  description: "Achterop gereden? Ontdek wie aansprakelijk is, wat u moet doen en hoe u uw schade vergoed krijgt. In 99% van de gevallen is de achteroprijder schuldig.",
  keywords: [
    "achterop gereden",
    "kop-staart botsing",
    "achteropaanrijding schade",
    "wie is schuldig achterop gereden",
    "schade verhalen achterop aangereden"
  ],
}

export default function BlogPost() {
  return (
    <div className="min-h-screen bg-white">
      <article className="container mx-auto px-4 py-8 max-w-4xl">
        <Breadcrumbs items={[
          { label: "Blog", href: "/blog" },
          { label: "Achterop gereden worden" }
        ]} />

        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8">
          <ArrowLeft className="h-4 w-4" />
          Terug naar blog
        </Link>

        <header className="mb-12">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full font-medium">
              Aansprakelijkheid
            </span>
            <span>•</span>
            <span>6 minuten leestijd</span>
            <span>•</span>
            <span>24 januari 2026</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Achterop Gereden Worden: Dit Moet U Weten
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Een kop-staartbotsing is een van de meest voorkomende verkeersongevallen in Nederland. 
            Goed nieuws: in vrijwel alle gevallen is de achteroprijder aansprakelijk.
          </p>
        </header>

        <Card className="bg-green-50 border-green-200 mb-12">
          <CardContent className="pt-6">
            <h2 className="font-bold mb-4 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              De hoofdregel
            </h2>
            <p className="text-muted-foreground">
              <strong>In 99% van de gevallen is de achteroprijder volledig aansprakelijk.</strong> 
              U hoeft alleen aan te tonen dat u van achteren bent aangereden - de rest regelen wij.
            </p>
          </CardContent>
        </Card>

        <div className="prose prose-lg max-w-none">
          
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Waarom is de achteroprijder bijna altijd schuldig?</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              In het Nederlandse verkeersrecht geldt een simpele regel: elke bestuurder moet voldoende 
              afstand houden tot zijn voorganger om tijdig te kunnen stoppen. Dit heet de 
              <strong> volgafstandregel</strong>.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Als u achterop wordt gereden, betekent dit per definitie dat de achterligger:
            </p>
            <ul className="space-y-3 text-muted-foreground mb-6">
              <li className="flex items-start gap-3">
                <span className="text-red-500 font-bold">•</span>
                <span>Onvoldoende afstand hield</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 font-bold">•</span>
                <span>Niet oplette (telefoon, afleiding)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 font-bold">•</span>
                <span>Te hard reed voor de omstandigheden</span>
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Wat moet u doen na een kop-staartbotsing?</h2>
            
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">1</div>
                <div>
                  <h3 className="font-bold mb-2">Zet uw auto veilig neer</h3>
                  <p className="text-muted-foreground">Schakel uw alarmlichten in en zet indien mogelijk een gevarendriehoek neer.</p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">2</div>
                <div>
                  <h3 className="font-bold mb-2">Controleer op letsel</h3>
                  <p className="text-muted-foreground">Check uzelf en passagiers. Bij whiplash-klachten (nekpijn, hoofdpijn) altijd naar de huisarts!</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">3</div>
                <div>
                  <h3 className="font-bold mb-2">Vul het Europees Schadeformulier in</h3>
                  <p className="text-muted-foreground">Wissel gegevens uit met de tegenpartij: naam, kenteken, verzekeraar, polisnummer.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">4</div>
                <div>
                  <h3 className="font-bold mb-2">Maak foto's</h3>
                  <p className="text-muted-foreground">Fotografeer de schade aan beide auto's, de positie van de voertuigen en eventuele remsporen.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">5</div>
                <div>
                  <h3 className="font-bold mb-2">Dien uw claim in</h3>
                  <p className="text-muted-foreground">Upload het schadeformulier bij ons - wij regelen de rest volledig gratis.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Uitzonderingen: wanneer bent u wél (deels) schuldig?</h2>
            
            <Card className="bg-amber-50 border-amber-200 mb-6">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-6 w-6 text-amber-600 flex-shrink-0" />
                  <div>
                    <p className="font-bold mb-2">Let op: dit zijn zeldzame uitzonderingen</p>
                    <p className="text-muted-foreground text-sm">
                      In de meeste gevallen blijft de achteroprijder 100% aansprakelijk, ook bij onderstaande situaties.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <ul className="space-y-4 text-muted-foreground">
              <li className="border-l-4 border-amber-500 pl-4">
                <strong>Plotseling remmen zonder reden</strong> - Als u zonder verkeersoorzaak keihard 
                remt (bijvoorbeeld om iemand te 'straffen'), kunt u deels aansprakelijk zijn.
              </li>
              <li className="border-l-4 border-amber-500 pl-4">
                <strong>Defecte achterlichten</strong> - Als uw remlichten niet werkten, kan dit 
                medeaansprakelijkheid opleveren.
              </li>
              <li className="border-l-4 border-amber-500 pl-4">
                <strong>Achteruitrijden</strong> - Als u achteruit reed en werd aangereden, ligt 
                de aansprakelijkheid waarschijnlijk bij u.
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Welke schade kunt u claimen?</h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border p-4 rounded-lg">
                <h4 className="font-bold mb-3 text-green-700">✓ Materiële schade</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Reparatiekosten</li>
                  <li>• Waardevermindering</li>
                  <li>• Vervangend vervoer (huurauto)</li>
                  <li>• Expertisekosten</li>
                  <li>• Berging en stallingskosten</li>
                </ul>
              </div>
              <div className="border p-4 rounded-lg">
                <h4 className="font-bold mb-3 text-green-700">✓ Bijkomende kosten</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Reiskosten naar garage</li>
                  <li>• Telefoon/administratiekosten</li>
                  <li>• Gederfde inkomsten (zakelijk)</li>
                  <li>• Medische kosten (bij letsel)</li>
                  <li>• Smartengeld (bij letsel)</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Veelgestelde vragen</h2>
            
            <div className="space-y-6">
              <div className="border-l-4 border-primary pl-4">
                <h4 className="font-bold mb-2">Wat als de achteroprijder zegt dat ik plots remde?</h4>
                <p className="text-muted-foreground">
                  Dit is geen geldig verweer. Elke bestuurder moet rekening houden met plotseling 
                  remmen van de voorganger. De achteroprijder blijft aansprakelijk.
                </p>
              </div>
              
              <div className="border-l-4 border-primary pl-4">
                <h4 className="font-bold mb-2">Moet ik de politie bellen?</h4>
                <p className="text-muted-foreground">
                  Bij alleen blikschade is dit niet verplicht. Wel verstandig bij: letsel, 
                  doorrijden, dronkenschap, of als de tegenpartij niet wil meewerken.
                </p>
              </div>

              <div className="border-l-4 border-primary pl-4">
                <h4 className="font-bold mb-2">Ik heb whiplash-klachten, wat nu?</h4>
                <p className="text-muted-foreground">
                  Ga direct naar de huisarts en laat uw klachten documenteren. Whiplash valt onder 
                  letselschade - wij verwijzen u door naar onze partner voor letselschade.
                </p>
              </div>
            </div>
          </section>

        </div>

        {/* CTA */}
        <Card className="bg-gradient-to-r from-primary to-blue-700 text-white mt-12">
          <CardContent className="py-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Achterop gereden? Wij verhalen uw schade gratis
            </h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Upload uw schadeformulier en wij regelen alles met de verzekeraar van de tegenpartij. 
              U betaalt niets, ook niet als uw claim niet slaagt.
            </p>
            <Link href="/claim-indienen">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                <Upload className="mr-2 h-5 w-5" />
                Gratis Claim Indienen
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Related Articles */}
        <section className="mt-12">
          <h3 className="text-xl font-bold mb-4">Gerelateerde artikelen</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/blog/europees-schadeformulier-invullen">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardContent className="pt-6">
                  <p className="font-semibold">Europees Schadeformulier invullen</p>
                  <p className="text-sm text-muted-foreground">Stap voor stap uitleg</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/blog/vervangend-vervoer-autoschade">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardContent className="pt-6">
                  <p className="font-semibold">Vervangend vervoer bij autoschade</p>
                  <p className="text-sm text-muted-foreground">Uw recht op een huurauto</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>

      </article>
    </div>
  )
}
