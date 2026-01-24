import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { ArrowLeft, CloudRain, Upload, AlertTriangle } from "lucide-react"

export const metadata: Metadata = {
  title: "Hagelschade & Stormschade Auto | Wat Nu? Dit Zijn Uw Opties",
  description: "Hagelschade of stormschade aan uw auto? Ontdek of u verzekerd bent, hoe u de schade claimt en wanneer u de schade kunt verhalen.",
  keywords: [
    "hagelschade auto",
    "stormschade auto",
    "hagel verzekering",
    "auto beschadigd door storm",
    "hagelschade claimen"
  ],
}

export default function BlogPost() {
  return (
    <div className="min-h-screen bg-white">
      <article className="container mx-auto px-4 py-8 max-w-4xl">
        <Breadcrumbs items={[
          { label: "Blog", href: "/blog" },
          { label: "Hagelschade & stormschade auto" }
        ]} />

        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8">
          <ArrowLeft className="h-4 w-4" />
          Terug naar blog
        </Link>

        <header className="mb-12">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
              Natuur
            </span>
            <span>•</span>
            <span>5 minuten leestijd</span>
            <span>•</span>
            <span>24 januari 2026</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Hagelschade of Stormschade aan Uw Auto: Wat Nu?
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Na een hevige hagelbui of storm kan uw auto flink beschadigd zijn. 
            Wat zijn uw opties en wordt de schade vergoed?
          </p>
        </header>

        <Card className="bg-amber-50 border-amber-200 mb-12">
          <CardContent className="pt-6">
            <h2 className="font-bold mb-4 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
              Belangrijk verschil
            </h2>
            <p className="text-muted-foreground">
              Hagelschade en stormschade vallen onder <strong>natuurgeweld</strong> - er is 
              geen tegenpartij om aan te spreken. De vergoeding hangt af van uw 
              <strong> eigen autoverzekering</strong>.
            </p>
          </CardContent>
        </Card>

        <div className="prose prose-lg max-w-none">
          
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Bent u verzekerd voor hagelschade?</h2>
            
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="border p-4 rounded-lg">
                <h4 className="font-bold mb-2 text-red-600">WA-verzekering</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  <strong>Niet gedekt</strong>
                </p>
                <p className="text-xs text-muted-foreground">
                  WA dekt alleen schade aan anderen, niet aan uw eigen auto.
                </p>
              </div>
              <div className="border p-4 rounded-lg border-orange-300">
                <h4 className="font-bold mb-2 text-orange-600">WA+ / Beperkt casco</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  <strong>Vaak wel gedekt</strong>
                </p>
                <p className="text-xs text-muted-foreground">
                  Hagelschade valt bij de meeste verzekeraars onder 'natuurgeweld'.
                </p>
              </div>
              <div className="border p-4 rounded-lg border-green-300 bg-green-50">
                <h4 className="font-bold mb-2 text-green-600">Allrisk / Volledig casco</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  <strong>Altijd gedekt</strong>
                </p>
                <p className="text-xs text-muted-foreground">
                  Alle schade aan uw eigen auto is verzekerd.
                </p>
              </div>
            </div>

            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">
                  <strong>Tip:</strong> Check uw polisvoorwaarden of bel uw verzekeraar. 
                  Sommige beperkt casco-verzekeringen sluiten hagelschade uit!
                </p>
              </CardContent>
            </Card>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Wat te doen na hagelschade?</h2>
            
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">1</div>
                <div>
                  <h4 className="font-bold">Maak foto's van alle schade</h4>
                  <p className="text-muted-foreground text-sm">Fotografeer alle deuken, ook de kleine. Maak overzichtsfoto's en detailfoto's.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">2</div>
                <div>
                  <h4 className="font-bold">Meld de schade direct bij uw verzekeraar</h4>
                  <p className="text-muted-foreground text-sm">Hoe sneller u meldt, hoe beter. Na grote hagelbuien zijn er vaak lange wachttijden.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">3</div>
                <div>
                  <h4 className="font-bold">Laat de auto niet meteen repareren</h4>
                  <p className="text-muted-foreground text-sm">Wacht op de expertise van de verzekeraar voordat u laat repareren.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0">4</div>
                <div>
                  <h4 className="font-bold">Voorkom verdere schade</h4>
                  <p className="text-muted-foreground text-sm">Dek kapotte ruiten af om waterschade te voorkomen - dit is vaak verplicht.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Wanneer kunt u hagelschade wél verhalen?</h2>
            
            <p className="text-muted-foreground mb-4">
              In sommige gevallen is er toch een tegenpartij om aan te spreken:
            </p>

            <div className="space-y-4">
              <div className="border-l-4 border-green-500 pl-6">
                <h3 className="font-bold mb-2">Parkeergarage/terrein met dak</h3>
                <p className="text-muted-foreground">
                  Als u in een overdekte parkeergarage stond en het dak bezweek door de hagel, 
                  kan de beheerder aansprakelijk zijn voor nalatig onderhoud.
                </p>
              </div>

              <div className="border-l-4 border-green-500 pl-6">
                <h3 className="font-bold mb-2">Vallende takken/bomen</h3>
                <p className="text-muted-foreground">
                  Als een boom van de gemeente of buurman op uw auto valt, kan de eigenaar 
                  aansprakelijk zijn als de boom al ziek of onderhouden was.
                </p>
              </div>

              <div className="border-l-4 border-green-500 pl-6">
                <h3 className="font-bold mb-2">Bouwmaterialen</h3>
                <p className="text-muted-foreground">
                  Als bouwmaterialen van een bouwplaats op uw auto waaien, is de aannemer 
                  mogelijk aansprakelijk.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Reparatiemogelijkheden bij hagelschade</h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border p-4 rounded-lg">
                <h4 className="font-bold mb-2">PDR (Paintless Dent Repair)</h4>
                <p className="text-sm text-muted-foreground">
                  Bij kleine deuken zonder lakschade kan een specialist de deuken van 
                  binnenuit 'uitduwen'. Goedkoper en sneller dan traditionele reparatie.
                </p>
              </div>
              <div className="border p-4 rounded-lg">
                <h4 className="font-bold mb-2">Traditionele reparatie</h4>
                <p className="text-sm text-muted-foreground">
                  Bij grotere deuken of lakschade is plamuren en spuiten nodig. 
                  Duurder maar vaak noodzakelijk.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Veelgestelde vragen</h2>
            
            <div className="space-y-6">
              <div className="border-l-4 border-primary pl-4">
                <h4 className="font-bold mb-2">Stijgt mijn premie na een hagelschade-claim?</h4>
                <p className="text-muted-foreground">
                  Bij de meeste verzekeraars niet, omdat hagelschade 'onvermijdbaar' is. 
                  Maar check uw polisvoorwaarden - sommige verzekeraars zijn strenger.
                </p>
              </div>
              
              <div className="border-l-4 border-primary pl-4">
                <h4 className="font-bold mb-2">Moet ik eigen risico betalen?</h4>
                <p className="text-muted-foreground">
                  Ja, meestal wel. Het eigen risico voor hagelschade kan variëren van 
                  €150 tot €500 of zelfs een percentage van de schade.
                </p>
              </div>

              <div className="border-l-4 border-primary pl-4">
                <h4 className="font-bold mb-2">Kan ik kiezen voor uitkering in plaats van reparatie?</h4>
                <p className="text-muted-foreground">
                  Vaak wel. U kunt het schadebedrag (minus eigen risico) laten uitkeren en 
                  zelf beslissen of u repareert. Handig bij oudere auto's.
                </p>
              </div>
            </div>
          </section>

        </div>

        {/* CTA */}
        <Card className="bg-gradient-to-r from-primary to-blue-700 text-white mt-12">
          <CardContent className="py-8 text-center">
            <CloudRain className="h-12 w-12 mx-auto mb-4 opacity-90" />
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Schade door een derde partij?
            </h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Als uw auto beschadigd is door nalatigheid van een ander (vallende tak, 
              bouwmateriaal, etc.) kunnen wij de schade voor u verhalen - volledig gratis.
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
