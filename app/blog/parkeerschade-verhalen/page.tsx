import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { ArrowLeft, ParkingCircle, Upload, Camera, Eye, AlertTriangle, CheckCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Parkeerschade Verhalen Zonder Getuigen: Kan Dat? | Autoschadebureau.nl",
  description: "Auto beschadigd tijdens parkeren en dader gevlucht? Lees hoe u alsnog uw schade vergoed krijgt en wat u wel en niet moet doen.",
  keywords: ["parkeerschade verhalen", "auto beschadigd parkeren", "dader gevlucht", "parkeerplaats schade"],
}

export default function BlogPost() {
  return (
    <div className="min-h-screen bg-white">
      <article className="container mx-auto px-4 py-8 max-w-4xl">
        <Breadcrumbs items={[
          { label: "Blog", href: "/blog" },
          { label: "Parkeerschade verhalen" }
        ]} />

        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8">
          <ArrowLeft className="h-4 w-4" />
          Terug naar blog
        </Link>

        <header className="mb-12">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full font-medium">Praktisch</span>
            <span>•</span>
            <span>5 minuten leestijd</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Parkeerschade Verhalen Zonder Getuigen: Kan Dat?
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            U komt terug bij uw auto en ontdekt een deuk of kras. De veroorzaker is nergens te 
            bekennen. Een frustrerende situatie, maar er zijn mogelijkheden.
          </p>
        </header>

        <div className="prose prose-lg max-w-none">
          <h2>Stap 1: Documenteer de schade direct</h2>
          
          <p>
            Zodra u de schade ontdekt, is het belangrijk om alles vast te leggen. Dit vergroot 
            uw kansen op vergoeding aanzienlijk.
          </p>

          <div className="grid md:grid-cols-2 gap-4 my-6">
            <Card className="border-2">
              <CardContent className="pt-6">
                <Camera className="h-8 w-8 text-primary mb-4" />
                <h3 className="font-bold mb-2">Maak foto's</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Close-ups van de schade</li>
                  <li>• Overzicht van de parkeerplek</li>
                  <li>• Eventuele verfsporen of bewijs</li>
                  <li>• Uw auto in de omgeving</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="pt-6">
                <Eye className="h-8 w-8 text-primary mb-4" />
                <h3 className="font-bold mb-2">Zoek getuigen</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Vraag omstanders</li>
                  <li>• Check omliggende winkels</li>
                  <li>• Vraag naar camera's</li>
                  <li>• Noteer contactgegevens</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <h2>Stap 2: Controleer op camera's</h2>

          <p>
            Veel parkeerplaatsen en winkelcentra hebben beveiligingscamera's. Deze kunnen 
            cruciaal bewijs leveren:
          </p>

          <ul>
            <li>Vraag bij de beheerder van de parkeerplaats naar camerabeelden</li>
            <li>Noteer de exacte tijd en locatie</li>
            <li>Dien zo snel mogelijk een verzoek in - beelden worden vaak snel overschreven</li>
            <li>Bij weigering kan de politie helpen met een vordering</li>
          </ul>

          <Card className="bg-amber-50 border-amber-200 my-6">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold mb-2">Tijd is cruciaal!</h3>
                  <p className="text-muted-foreground">
                    Camerabeelden worden vaak binnen 24-72 uur overschreven. Handel dus snel en 
                    dien dezelfde dag nog een verzoek in bij de parkeerplaatsbeheerder.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <h2>Stap 3: Doe aangifte bij de politie</h2>

          <p>
            Hoewel de politie vaak weinig kan doen bij parkeerschade, is aangifte toch belangrijk:
          </p>

          <ul>
            <li>U krijgt een bewijs van aangifte voor uw verzekering</li>
            <li>Als de dader later wordt gevonden, staat uw zaak geregistreerd</li>
            <li>Bij meerdere meldingen op dezelfde locatie kan de politie actie ondernemen</li>
          </ul>

          <h2>Wanneer kunt u wel verhalen?</h2>

          <p>
            U kunt de schade verhalen wanneer:
          </p>

          <div className="space-y-3 my-6">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-1" />
              <div>
                <p className="font-medium">De dader is bekend</p>
                <p className="text-sm text-muted-foreground">Via camerabeelden, getuigen of een briefje achtergelaten</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-1" />
              <div>
                <p className="font-medium">Er zijn verfsporen</p>
                <p className="text-sm text-muted-foreground">Kleur en type verf kan worden gematcht met een verdacht voertuig</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-1" />
              <div>
                <p className="font-medium">Iemand heeft het gezien</p>
                <p className="text-sm text-muted-foreground">Een getuigenverklaring kan doorslaggevend zijn</p>
              </div>
            </div>
          </div>

          <h2>Wat als de dader onbekend blijft?</h2>

          <p>
            Als u de veroorzaker niet kunt achterhalen, zijn er nog enkele opties:
          </p>

          <ul>
            <li><strong>Cascoverzekering:</strong> Dekt parkeerschade (met eigen risico)</li>
            <li><strong>Waarborgfonds:</strong> Alleen bij letselschade of grotere materiële schade (vanaf €500) door een motorrijtuig</li>
            <li><strong>Rechtsbijstand:</strong> Kan helpen bij het opsporen van de dader</li>
          </ul>

          <h2>Voorkomen is beter dan genezen</h2>

          <p>
            Een paar tips om parkeerschade te voorkomen:
          </p>

          <ul>
            <li>Parkeer niet naast auto's met deukjes of deuken</li>
            <li>Kies een plek aan het einde van de rij of tegen een muur</li>
            <li>Overweeg een dashcam met parkeermodus</li>
            <li>Vermijd drukke parkeerplaatsen op piekmomenten</li>
          </ul>

          <h2>Heeft u de dader wel kunnen achterhalen?</h2>

          <p>
            Gelukkig, dan kunnen wij u helpen met het verhalen van de schade. Wij nemen contact 
            op met de WA-verzekering van de veroorzaker en zorgen dat u krijgt waar u recht op heeft.
          </p>
        </div>

        <Card className="bg-gradient-to-r from-primary to-blue-700 text-white mt-12">
          <CardContent className="py-8 text-center">
            <ParkingCircle className="h-12 w-12 mx-auto mb-4 opacity-90" />
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Dader van parkeerschade bekend?</h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Wij verhalen de schade gratis voor u. Upload uw gegevens en wij handelen het af.
            </p>
            <Link href="/claim-indienen">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                <Upload className="mr-2 h-5 w-5" />
                Gratis Claim Indienen
              </Button>
            </Link>
          </CardContent>
        </Card>
      </article>
    </div>
  )
}
