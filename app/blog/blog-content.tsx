"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowRight, FileText } from "lucide-react"

// Blog posts data - UITGEBREID
const blogPosts = [
  {
    slug: "wat-is-expertise-rapport",
    title: "Wat is een Expertise Rapport? Alles over Autoschade Taxatie",
    excerpt: "Wat is een expertise rapport bij autoschade? Leer wat erin staat, wie het opstelt, wanneer het nodig is en hoe het uw schadevergoeding bepaalt.",
    category: "Expertise",
    readTime: "8 min",
    date: "27 januari 2026",
    featured: true,
  },
  {
    slug: "hoe-verhaal-ik-autoschade",
    title: "Hoe verhaal ik autoschade op de tegenpartij? Complete gids 2026",
    excerpt: "Stap-voor-stap uitleg voor het verhalen van uw autoschade. Van ongeval tot uitbetaling - alles wat u moet weten over het claimen bij de WA-verzekeraar van de tegenpartij.",
    category: "Handleiding",
    readTime: "8 min",
    date: "23 januari 2026",
    featured: true,
  },
  {
    slug: "europees-schadeformulier-invullen",
    title: "Europees Schadeformulier correct invullen: veld voor veld uitleg",
    excerpt: "Maak geen fouten op het schadeformulier! Leer precies wat u bij elk vakje moet invullen en welke valkuilen u moet vermijden voor een succesvolle claim.",
    category: "Handleiding",
    readTime: "6 min",
    date: "22 januari 2026",
    featured: true,
  },
  {
    slug: "verschil-wa-allrisk-cascoverzekering",
    title: "WA, Beperkt Casco of Allrisk: welke verzekering voor schade verhaal?",
    excerpt: "Verwar de verzekeringen niet! Ontdek het verschil tussen WA, casco en allrisk en wanneer u zelf schade moet verhalen bij de tegenpartij.",
    category: "Verzekeringen",
    readTime: "5 min",
    date: "20 januari 2026",
    featured: false,
  },
  {
    slug: "wat-te-doen-na-auto-ongeval",
    title: "Wat te doen na een auto-ongeval? Checklist voor directe actie",
    excerpt: "Aangereden of gebotst? Volg deze 10 cruciale stappen direct na het ongeval om uw schadeverhaal niet in gevaar te brengen. Download onze gratis checklist.",
    category: "Praktisch",
    readTime: "7 min",
    date: "18 januari 2026",
    featured: true,
  },
  {
    slug: "eigen-risico-vermijden",
    title: "Eigen risico vermijden: waarom direct verhalen slimmer is",
    excerpt: "Betaal GEEN €500+ eigen risico! Ontdek waarom verhalen bij de tegenpartij financieel voordeliger is dan via uw eigen verzekering claimen.",
    category: "Financieel",
    readTime: "4 min",
    date: "15 januari 2026",
    featured: false,
  },
  {
    slug: "aansprakelijkheid-verkeersongeval",
    title: "Aansprakelijkheid bij verkeersongevallen: wie betaalt de schade?",
    excerpt: "Juridische achtergrond van aansprakelijkheid, cascoregel en omkering bewijslast. Begrijp wanneer de tegenpartij WA-verzekering moet betalen.",
    category: "Juridisch",
    readTime: "6 min",
    date: "12 januari 2026",
    featured: false,
  },
  {
    slug: "parkeerschade-verhalen",
    title: "Parkeerschade verhalen zonder getuigen: kan dat?",
    excerpt: "Auto beschadigd tijdens parkeren en dader gevlucht? Lees hoe u alsnog uw schade vergoed krijgt en wat u wel en niet moet doen.",
    category: "Praktisch",
    readTime: "5 min",
    date: "10 januari 2026",
    featured: false,
  },
  {
    slug: "total-loss-auto-vergoeding",
    title: "Total loss auto: wat krijg ik vergoed van de tegenpartij?",
    excerpt: "Auto total loss na ongeval? Ontdek hoe de dagwaarde wordt bepaald, welke kosten vergoed worden en hoe u het maximale bedrag krijgt.",
    category: "Financieel",
    readTime: "7 min",
    date: "8 januari 2026",
    featured: false,
  },
  // NIEUWE ARTIKELEN - JURIDISCH
  {
    slug: "schuldvraag-verkeersongeval",
    title: "Schuldvraag bij verkeersongeval: hoe wordt schuld vastgesteld?",
    excerpt: "Ontdek hoe verzekeraars en juristen schuld bepalen bij ongevallen. Van 50/50 tot 100% aansprakelijkheid - alle scenario's uitgelegd.",
    category: "Juridisch",
    readTime: "7 min",
    date: "7 januari 2026",
    featured: false,
  },
  {
    slug: "verjaringstermijn-autoschade",
    title: "Verjaringstermijn autoschade: hoe lang kunt u claimen?",
    excerpt: "Let op de termijn! Ontdek binnen welke periode u uw schade moet verhalen en wat er gebeurt als u te laat bent.",
    category: "Juridisch",
    readTime: "5 min",
    date: "5 januari 2026",
    featured: false,
  },
  {
    slug: "getuigenverklaring-verkeersongeval",
    title: "Getuigenverklaring bij verkeersongeval: waarom zo belangrijk?",
    excerpt: "Een goede getuigenverklaring kan uw claim maken of breken. Leer hoe u getuigen correct laat verklaren en wat u moet documenteren.",
    category: "Juridisch",
    readTime: "6 min",
    date: "3 januari 2026",
    featured: false,
  },
  {
    slug: "aansprakelijkheid-minderjarige-bestuurder",
    title: "Aangereden door minderjarige bestuurder: wie is aansprakelijk?",
    excerpt: "Bijzondere situatie met minderjarige veroorzaker? Ontdek wie aansprakelijk is en hoe u uw schade vergoed krijgt.",
    category: "Juridisch",
    readTime: "5 min",
    date: "29 december 2025",
    featured: false,
  },
  // NIEUWE ARTIKELEN - FINANCIEEL
  {
    slug: "schadevergoeding-berekenen",
    title: "Schadevergoeding berekenen: wat mag u claimen?",
    excerpt: "Van reparatiekosten tot huurauto en expertisekosten - ontdek alle kosten die u kunt verhalen op de tegenpartij.",
    category: "Financieel",
    readTime: "8 min",
    date: "27 december 2025",
    featured: false,
  },
  {
    slug: "waardevermindering-auto-claimen",
    title: "Waardevermindering auto claimen na ongeval: zo werkt het",
    excerpt: "Uw auto is minder waard na reparatie? Claim waardevermindering! Leer hoe u dit berekent en onderbouwt bij de verzekeraar.",
    category: "Financieel",
    readTime: "6 min",
    date: "24 december 2025",
    featured: false,
  },
  {
    slug: "huurauto-vergoeding-schade",
    title: "Huurauto vergoeding tijdens reparatie: waar heeft u recht op?",
    excerpt: "Zonder auto tijdens reparatie? Ontdek wanneer u recht heeft op een vervangend vervoer en welke kosten vergoed worden.",
    category: "Financieel",
    readTime: "5 min",
    date: "20 december 2025",
    featured: false,
  },
  {
    slug: "restwaarde-total-loss",
    title: "Restwaarde bij total loss: mag u de auto behouden?",
    excerpt: "Total loss maar u wilt de auto houden? Leer hoe restwaarde werkt en of dit financieel slim is.",
    category: "Financieel",
    readTime: "6 min",
    date: "18 december 2025",
    featured: false,
  },
  // NIEUWE ARTIKELEN - PRAKTISCH
  {
    slug: "foto-maken-na-ongeval",
    title: "Foto's maken na een ongeval: complete checklist",
    excerpt: "Welke foto's moet u maken voor een succesvolle claim? Van overzichtsshots tot detailfoto's - alles wat u moet vastleggen.",
    category: "Praktisch",
    readTime: "5 min",
    date: "15 december 2025",
    featured: false,
  },
  {
    slug: "schade-melden-verzekeraar",
    title: "Schade melden bij verzekeraar: moet dat altijd?",
    excerpt: "Wanneer moet u schade melden bij uw eigen verzekeraar en wanneer niet? Voorkom onnodige premieverhoging!",
    category: "Praktisch",
    readTime: "4 min",
    date: "12 december 2025",
    featured: false,
  },
  {
    slug: "kenteken-tegenpartij-niet-genoteerd",
    title: "Kenteken tegenpartij vergeten te noteren: wat nu?",
    excerpt: "Paniek! U heeft het kenteken niet opgeschreven. Ontdek welke opties u nog heeft om uw schade toch vergoed te krijgen.",
    category: "Praktisch",
    readTime: "5 min",
    date: "10 december 2025",
    featured: false,
  },
  {
    slug: "garage-kiezen-reparatie",
    title: "Garage kiezen voor schadeherstel: rechten en plichten",
    excerpt: "Mag u zelf een garage kiezen? Moet het een dealer zijn? Ontdek uw rechten bij het kiezen van een herstelbedrijf.",
    category: "Praktisch",
    readTime: "6 min",
    date: "8 december 2025",
    featured: false,
  },
  {
    slug: "dashcam-beelden-als-bewijs",
    title: "Dashcam beelden als bewijs bij schade: mag dat in Nederland?",
    excerpt: "U heeft het ongeval op dashcam? Ontdek of u deze beelden mag gebruiken als bewijs en hoe u dit correct doet.",
    category: "Praktisch",
    readTime: "5 min",
    date: "5 december 2025",
    featured: false,
  },
  // NIEUWE ARTIKELEN - VERZEKERINGEN
  {
    slug: "wa-verzekering-tegenpartij-vinden",
    title: "WA-verzekering tegenpartij achterhalen: zo vindt u de verzekeraar",
    excerpt: "Kent u alleen het kenteken? Leer hoe u de verzekeraar van de tegenpartij kunt vinden en contact kunt opnemen.",
    category: "Verzekeringen",
    readTime: "4 min",
    date: "2 december 2025",
    featured: false,
  },
  {
    slug: "no-claim-korting-behouden",
    title: "No-claim korting behouden na ongeval: kan dat?",
    excerpt: "Bang voor verlies van korting? Ontdek wanneer verhalen via de tegenpartij uw no-claim korting behoudt.",
    category: "Verzekeringen",
    readTime: "5 min",
    date: "28 november 2025",
    featured: false,
  },
  {
    slug: "eigen-schuld-gedeeltelijk",
    title: "Gedeeltelijke eigen schuld: hoe werkt 50/50 schade?",
    excerpt: "Beide partijen deels schuldig? Leer hoe gedeelde aansprakelijkheid werkt en wat u vergoed krijgt bij 50/50 schuld.",
    category: "Verzekeringen",
    readTime: "6 min",
    date: "25 november 2025",
    featured: false,
  },
  {
    slug: "rechtsbijstandverzekering-nodig",
    title: "Rechtsbijstandverzekering: is dat nodig voor schade verhalen?",
    excerpt: "Moet u een rechtsbijstandverzekering hebben om schade te verhalen? Ontdek wanneer dit wel en niet nodig is, en hoe wij gratis helpen.",
    category: "Verzekeringen",
    readTime: "5 min",
    date: "29 januari 2026",
    featured: true,
  },
  {
    slug: "verhaalrechtsbijstand-uitgelegd",
    title: "Verhaalrechtsbijstand: Wat Is Het en Wanneer Heeft U Het Nodig?",
    excerpt: "Wat is verhaalrechtsbijstand? Leer wanneer u het nodig heeft om autoschade te verhalen en hoe wij gratis helpen zonder verzekering.",
    category: "Verzekeringen",
    readTime: "6 min",
    date: "29 januari 2026",
    featured: true,
  },
  // NIEUWE ARTIKELEN - HANDLEIDING
  {
    slug: "claim-indienen-zonder-formulier",
    title: "Claim indienen zonder Europees Schadeformulier: stappenplan",
    excerpt: "Geen schadeformulier ingevuld bij het ongeval? Geen paniek! Volg dit stappenplan om alsnog uw claim in te dienen.",
    category: "Handleiding",
    readTime: "7 min",
    date: "18 november 2025",
    featured: false,
  },
  {
    slug: "communiceren-met-verzekeraar",
    title: "Communiceren met de verzekeraar: do's en don'ts",
    excerpt: "Wat moet u wel en niet zeggen tegen de verzekeraar? Vermijd deze valkuilen en versterk uw positie met deze communicatie tips.",
    category: "Handleiding",
    readTime: "6 min",
    date: "15 november 2025",
    featured: false,
  },
  {
    slug: "expertiserapport-beoordelen",
    title: "Expertiserapport beoordelen: waar moet u op letten?",
    excerpt: "Taxateur is langs geweest? Leer hoe u het rapport kritisch beoordeelt en wanneer u bezwaar moet maken tegen de schadeberekening.",
    category: "Handleiding",
    readTime: "8 min",
    date: "12 november 2025",
    featured: false,
  },
  // NIEUWE ARTIKELEN - JANUARI 2026
  {
    slug: "schade-verhalen-zonder-formulier",
    title: "Schade Verhalen Zonder Schadeformulier: Het Kan Wél!",
    excerpt: "Geen Europees Schadeformulier ingevuld na het ongeval? Geen paniek! U kunt nog steeds uw autoschade verhalen bij de tegenpartij.",
    category: "Praktisch",
    readTime: "5 min",
    date: "24 januari 2026",
    featured: true,
  },
  {
    slug: "dagwaarde-auto-berekenen",
    title: "Dagwaarde Auto Berekenen: Zo Krijgt U Waar U Recht Op Heeft",
    excerpt: "Bij autoschade speelt de dagwaarde een cruciale rol. Leer hoe verzekeraars rekenen en voorkom dat u te weinig krijgt.",
    category: "Financieel",
    readTime: "6 min",
    date: "24 januari 2026",
    featured: false,
  },
  {
    slug: "vervangend-vervoer-autoschade",
    title: "Vervangend Vervoer bij Autoschade: Hier Heeft U Recht Op",
    excerpt: "Heeft u recht op een huurauto na een ongeval? Ontdek wat de tegenpartij moet vergoeden en hoe u dit regelt.",
    category: "Rechten",
    readTime: "5 min",
    date: "24 januari 2026",
    featured: false,
  },
  {
    slug: "schade-openstaand-portier",
    title: "Schade Door Openstaand Autoportier: Wie Betaalt?",
    excerpt: "Iemand opent zijn portier net op het moment dat u langsrijdt. Of uw portier wordt geraakt. Wie is aansprakelijk?",
    category: "Praktisch",
    readTime: "5 min",
    date: "24 januari 2026",
    featured: false,
  },
  {
    slug: "autoschade-door-fietser",
    title: "Autoschade Door Fietser: Kunt U Dit Verhalen?",
    excerpt: "Schade aan uw auto veroorzaakt door een fietser? Ontdek wanneer u de schade kunt verhalen en hoe dit werkt.",
    category: "Praktisch",
    readTime: "6 min",
    date: "24 januari 2026",
    featured: false,
  },
  {
    slug: "schade-parkeerplaats-supermarkt",
    title: "Schade op de Parkeerplaats van de Supermarkt",
    excerpt: "U komt terug van boodschappen en ontdekt een deuk. Wie is aansprakelijk en wat kunt u doen?",
    category: "Praktisch",
    readTime: "5 min",
    date: "24 januari 2026",
    featured: false,
  },
  // NIEUWE ARTIKELEN - 24 JANUARI 2026 (FASE 4)
  {
    slug: "achterop-gereden-worden",
    title: "Achterop Gereden Worden: Dit Moet U Weten",
    excerpt: "Een kop-staartbotsing is een van de meest voorkomende ongevallen. Goed nieuws: in 99% van de gevallen is de achteroprijder aansprakelijk.",
    category: "Juridisch",
    readTime: "6 min",
    date: "24 januari 2026",
    featured: true,
  },
  {
    slug: "eigen-risico-terugvragen",
    title: "Eigen Risico Terugvragen: Zo Krijgt U Uw Geld Terug",
    excerpt: "Eigen risico betaald terwijl een ander schuldig was? Ontdek hoe u dit bedrag volledig kunt terugvorderen van de tegenpartij.",
    category: "Financieel",
    readTime: "4 min",
    date: "24 januari 2026",
    featured: false,
  },
  {
    slug: "leaseauto-schade-door-ander",
    title: "Leaseauto Schade Door Ander: Wie Betaalt Wat?",
    excerpt: "Schade aan uw leaseauto door een ander? Ontdek wie aansprakelijk is, wat u moet doen en hoe u extra kosten vermijdt.",
    category: "Praktisch",
    readTime: "5 min",
    date: "24 januari 2026",
    featured: false,
  },
  {
    slug: "wat-doet-schade-expert",
    title: "Wat Doet een Schade-Expert Precies?",
    excerpt: "Bij autoschade hoort u vaak over 'expertise'. Maar wat doet zo'n expert precies en wanneer is het nodig?",
    category: "Handleiding",
    readTime: "5 min",
    date: "24 januari 2026",
    featured: false,
  },
  {
    slug: "verzekeraar-betaalt-te-weinig",
    title: "Verzekeraar Betaalt Te Weinig: Dit Kunt U Doen",
    excerpt: "De verzekeraar biedt minder dan verwacht? U hoeft dit niet te accepteren. Ontdek uw opties voor een hogere vergoeding.",
    category: "Financieel",
    readTime: "6 min",
    date: "24 januari 2026",
    featured: false,
  },
  {
    slug: "hagelschade-stormschade-auto",
    title: "Hagelschade of Stormschade aan Uw Auto: Wat Nu?",
    excerpt: "Na een hevige hagelbui of storm kan uw auto flink beschadigd zijn. Wat zijn uw opties en wordt de schade vergoed?",
    category: "Praktisch",
    readTime: "5 min",
    date: "24 januari 2026",
    featured: false,
  },
  {
    slug: "goede-fotos-autoschade",
    title: "Hoe Maakt U de Beste Foto's voor Uw Autoschade Claim?",
    excerpt: "Leer welke foto's u moet maken na een auto-ongeluk voor de snelste schadeafhandeling. Complete 10-stappen handleiding met praktische tips.",
    category: "Handleiding",
    readTime: "8 min",
    date: "24 januari 2026",
    featured: true,
  },
]

const categories = ["Alle", "Handleiding", "Praktisch", "Verzekeringen", "Juridisch", "Financieel", "Rechten"]

export function BlogContent() {
  const [selectedCategory, setSelectedCategory] = useState("Alle")

  // Filter posts based on selected category
  const filteredPosts = selectedCategory === "Alle" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory)

  const featuredPosts = filteredPosts.filter(post => post.featured)
  const regularPosts = filteredPosts.filter(post => !post.featured)

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Blog
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Praktische tips, juridische informatie en complete handleidingen voor het verhalen van uw autoschade. 
            Alles wat u moet weten op één plek - nu met {blogPosts.length} artikelen!
          </p>
        </div>

        {/* Categories Filter - NOW INTERACTIVE */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={cat === selectedCategory ? "default" : "outline"}
              size="sm"
              className="rounded-full"
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
              {cat !== "Alle" && (
                <span className="ml-2 text-xs">
                  ({blogPosts.filter(p => p.category === cat).length})
                </span>
              )}
            </Button>
          ))}
        </div>

        {/* Results count */}
        <div className="text-center mb-8">
          <p className="text-sm text-muted-foreground">
            {filteredPosts.length} artikel{filteredPosts.length !== 1 ? 'en' : ''} gevonden
            {selectedCategory !== "Alle" && ` in categorie "${selectedCategory}"`}
          </p>
        </div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded">UITGELICHT</span>
              Meest gelezen artikelen
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {featuredPosts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`}>
                  <Card className="h-full hover:shadow-lg transition-all hover:scale-[1.02] cursor-pointer border-2 border-primary/20">
                    <CardHeader>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                        <span className="bg-primary/10 text-primary px-2 py-1 rounded font-medium">
                          {post.category}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.readTime}
                        </span>
                      </div>
                      <CardTitle className="text-lg leading-tight mb-2 hover:text-primary transition-colors">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="text-sm">
                        {post.excerpt}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {post.date}
                        </div>
                        <span className="flex items-center gap-1 text-primary font-medium">
                          Lees meer
                          <ArrowRight className="h-3 w-3" />
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* All Posts */}
        {regularPosts.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-6">
              {selectedCategory === "Alle" ? "Alle artikelen" : `${selectedCategory} artikelen`}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {regularPosts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`}>
                  <Card className="h-full hover:shadow-lg transition-all hover:scale-[1.01] cursor-pointer">
                    <CardHeader>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                        <span className="bg-muted text-foreground px-2 py-1 rounded font-medium">
                          {post.category}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.readTime}
                        </span>
                      </div>
                      <CardTitle className="text-lg leading-tight mb-2 hover:text-primary transition-colors">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="text-sm">
                        {post.excerpt}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {post.date}
                        </div>
                        <span className="flex items-center gap-1 text-primary font-medium">
                          Lees meer
                          <ArrowRight className="h-3 w-3" />
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* No results message */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              Geen artikelen gevonden in deze categorie.
            </p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => setSelectedCategory("Alle")}
            >
              Bekijk alle artikelen
            </Button>
          </div>
        )}

        {/* CTA Section */}
        <section className="mt-16">
          <Card className="bg-gradient-to-br from-primary to-blue-600 text-white border-0">
            <CardContent className="text-center py-12">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-90" />
              <h2 className="text-3xl font-bold mb-4">Klaar om uw schade te verhalen?</h2>
              <p className="text-xl mb-8 text-blue-50 max-w-2xl mx-auto">
                Nu u alles weet over autoschade verhalen, is het tijd voor actie. 
                Upload uw schadeformulier en wij regelen de rest!
              </p>
              <Link href="/claim-indienen">
                <Button size="lg" variant="secondary" className="text-lg px-8">
                  Start Nu – Gratis Claim Indienen
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <p className="text-sm text-blue-100 mt-4">
                100% gratis • Alle kosten betaald door tegenpartij • Gemiddeld binnen 6 weken
              </p>
            </CardContent>
          </Card>
        </section>
        </div>
      </main>
    </div>
  )
}
