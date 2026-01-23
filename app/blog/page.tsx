import { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowRight, FileText } from "lucide-react"

export const metadata: Metadata = {
  title: "Blog - Tips & Guides over Autoschade Verhalen",
  description: "Ontdek alles over autoschade verhalen, schadeafhandeling, verzekeringen en meer. Praktische tips, juridische informatie en stap-voor-stap handleidingen.",
  keywords: [
    "autoschade blog",
    "schade verhalen tips",
    "autoschade informatie",
    "verzekering informatie",
    "schadeafhandeling guide"
  ],
}

// Blog posts data
const blogPosts = [
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
    slug: "parkeerscade-verhalen",
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
]

const categories = ["Alle", "Handleiding", "Praktisch", "Verzekeringen", "Juridisch", "Financieel"]

export default function BlogPage() {
  const featuredPosts = blogPosts.filter(post => post.featured)
  const regularPosts = blogPosts.filter(post => !post.featured)

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Autoschade Blog & Knowledge Base
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Praktische tips, juridische informatie en complete handleidingen voor het verhalen van uw autoschade. 
            Alles wat u moet weten op één plek.
          </p>
        </div>

        {/* Categories Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={cat === "Alle" ? "default" : "outline"}
              size="sm"
              className="rounded-full"
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* Featured Posts */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded">FEATURED</span>
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

        {/* All Posts */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Alle artikelen</h2>
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
                100% gratis • No cure no pay • Gemiddeld binnen 6 weken
              </p>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  )
}
