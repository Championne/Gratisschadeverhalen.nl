/**
 * Fallback blog posts data
 * Wordt gebruikt wanneer WordPress niet geconfigureerd is
 * Dit zijn de huidige hardcoded posts uit blog-content.tsx
 */

import { BlogPost } from './types'

// Huidige hardcoded blog posts als fallback
export const fallbackBlogPosts: BlogPost[] = [
  {
    slug: "wat-is-expertise-rapport",
    title: "Wat is een Expertise Rapport? Alles over Autoschade Taxatie",
    excerpt: "Wat is een expertise rapport bij autoschade? Leer wat erin staat, wie het opstelt, wanneer het nodig is en hoe het uw schadevergoeding bepaalt.",
    content: "", // Content staat in de individuele TSX bestanden
    category: "Expertise",
    readTime: "8 min",
    date: "2026-01-27",
    dateFormatted: "27 januari 2026",
    featured: true,
  },
  {
    slug: "hoe-verhaal-ik-autoschade",
    title: "Hoe verhaal ik autoschade op de tegenpartij? Complete gids 2026",
    excerpt: "Stap-voor-stap uitleg voor het verhalen van uw autoschade. Van ongeval tot uitbetaling - alles wat u moet weten over het claimen bij de WA-verzekeraar van de tegenpartij.",
    content: "",
    category: "Handleiding",
    readTime: "8 min",
    date: "2026-01-23",
    dateFormatted: "23 januari 2026",
    featured: true,
  },
  {
    slug: "europees-schadeformulier-invullen",
    title: "Europees Schadeformulier correct invullen: veld voor veld uitleg",
    excerpt: "Maak geen fouten op het schadeformulier! Leer precies wat u bij elk vakje moet invullen en welke valkuilen u moet vermijden voor een succesvolle claim.",
    content: "",
    category: "Handleiding",
    readTime: "6 min",
    date: "2026-01-22",
    dateFormatted: "22 januari 2026",
    featured: true,
  },
  {
    slug: "verhaalrechtsbijstand-uitgelegd",
    title: "Verhaalrechtsbijstand: Wat Is Het en Wanneer Heeft U Het Nodig?",
    excerpt: "Wat is verhaalrechtsbijstand? Leer wanneer u het nodig heeft om autoschade te verhalen en hoe wij gratis helpen zonder verzekering.",
    content: "",
    category: "Verzekeringen",
    readTime: "6 min",
    date: "2026-01-29",
    dateFormatted: "29 januari 2026",
    featured: true,
  },
  {
    slug: "rechtsbijstandverzekering-nodig",
    title: "Rechtsbijstandverzekering: is dat nodig voor schade verhalen?",
    excerpt: "Moet u een rechtsbijstandverzekering hebben om schade te verhalen? Ontdek wanneer dit wel en niet nodig is, en hoe wij gratis helpen.",
    content: "",
    category: "Verzekeringen",
    readTime: "5 min",
    date: "2026-01-29",
    dateFormatted: "29 januari 2026",
    featured: true,
  },
  {
    slug: "verschil-wa-allrisk-cascoverzekering",
    title: "WA, Beperkt Casco of Allrisk: welke verzekering voor schade verhaal?",
    excerpt: "Verwar de verzekeringen niet! Ontdek het verschil tussen WA, casco en allrisk en wanneer u zelf schade moet verhalen bij de tegenpartij.",
    content: "",
    category: "Verzekeringen",
    readTime: "5 min",
    date: "2026-01-20",
    dateFormatted: "20 januari 2026",
    featured: false,
  },
  {
    slug: "achterop-gereden-worden",
    title: "Achterop Gereden Worden: Dit Moet U Weten",
    excerpt: "Een kop-staartbotsing is een van de meest voorkomende ongevallen. Goed nieuws: in 99% van de gevallen is de achteroprijder aansprakelijk.",
    content: "",
    category: "Juridisch",
    readTime: "6 min",
    date: "2026-01-24",
    dateFormatted: "24 januari 2026",
    featured: true,
  },
  {
    slug: "schade-verhalen-zonder-formulier",
    title: "Schade Verhalen Zonder Schadeformulier: Het Kan Wél!",
    excerpt: "Geen Europees Schadeformulier ingevuld na het ongeval? Geen paniek! U kunt nog steeds uw autoschade verhalen bij de tegenpartij.",
    content: "",
    category: "Praktisch",
    readTime: "5 min",
    date: "2026-01-24",
    dateFormatted: "24 januari 2026",
    featured: true,
  },
  {
    slug: "goede-fotos-autoschade",
    title: "Hoe Maakt U de Beste Foto's voor Uw Autoschade Claim?",
    excerpt: "Leer welke foto's u moet maken na een auto-ongeluk voor de snelste schadeafhandeling. Complete 10-stappen handleiding met praktische tips.",
    content: "",
    category: "Handleiding",
    readTime: "8 min",
    date: "2026-01-24",
    dateFormatted: "24 januari 2026",
    featured: true,
  },
  {
    slug: "eigen-risico-vermijden",
    title: "Eigen risico vermijden: waarom direct verhalen slimmer is",
    excerpt: "Betaal GEEN €500+ eigen risico! Ontdek waarom verhalen bij de tegenpartij financieel voordeliger is dan via uw eigen verzekering claimen.",
    content: "",
    category: "Financieel",
    readTime: "4 min",
    date: "2026-01-15",
    dateFormatted: "15 januari 2026",
    featured: false,
  },
  {
    slug: "aansprakelijkheid-verkeersongeval",
    title: "Aansprakelijkheid bij verkeersongevallen: wie betaalt de schade?",
    excerpt: "Juridische achtergrond van aansprakelijkheid, cascoregel en omkering bewijslast. Begrijp wanneer de tegenpartij WA-verzekering moet betalen.",
    content: "",
    category: "Juridisch",
    readTime: "6 min",
    date: "2026-01-12",
    dateFormatted: "12 januari 2026",
    featured: false,
  },
  {
    slug: "parkeerschade-verhalen",
    title: "Parkeerschade verhalen zonder getuigen: kan dat?",
    excerpt: "Auto beschadigd tijdens parkeren en dader gevlucht? Lees hoe u alsnog uw schade vergoed krijgt en wat u wel en niet moet doen.",
    content: "",
    category: "Praktisch",
    readTime: "5 min",
    date: "2026-01-10",
    dateFormatted: "10 januari 2026",
    featured: false,
  },
  {
    slug: "wa-verzekering-tegenpartij-claimen",
    title: "WA-verzekering tegenpartij claimen: Complete Gids",
    excerpt: "Alles over het claimen bij de WA-verzekering van de tegenpartij. Stap voor stap uitleg, rechten, termijnen en veelgemaakte fouten voorkomen.",
    content: "",
    category: "Verzekeringen",
    readTime: "8 min",
    date: "2026-01-24",
    dateFormatted: "24 januari 2026",
    featured: false,
  },
  {
    slug: "total-loss-auto-vergoeding",
    title: "Total loss auto: wat krijg ik vergoed van de tegenpartij?",
    excerpt: "Auto total loss na ongeval? Ontdek hoe de dagwaarde wordt bepaald, welke kosten vergoed worden en hoe u het maximale bedrag krijgt.",
    content: "",
    category: "Financieel",
    readTime: "7 min",
    date: "2026-01-08",
    dateFormatted: "8 januari 2026",
    featured: false,
  },
  {
    slug: "dagwaarde-auto-berekenen",
    title: "Dagwaarde Auto Berekenen: Zo Krijgt U Waar U Recht Op Heeft",
    excerpt: "Bij autoschade speelt de dagwaarde een cruciale rol. Leer hoe verzekeraars rekenen en voorkom dat u te weinig krijgt.",
    content: "",
    category: "Financieel",
    readTime: "6 min",
    date: "2026-01-24",
    dateFormatted: "24 januari 2026",
    featured: false,
  },
  {
    slug: "eigen-risico-terugvragen",
    title: "Eigen Risico Terugvragen: Zo Krijgt U Uw Geld Terug",
    excerpt: "Eigen risico betaald terwijl een ander schuldig was? Ontdek hoe u dit bedrag volledig kunt terugvorderen van de tegenpartij.",
    content: "",
    category: "Financieel",
    readTime: "4 min",
    date: "2026-01-24",
    dateFormatted: "24 januari 2026",
    featured: false,
  },
  {
    slug: "verzekeraar-betaalt-te-weinig",
    title: "Verzekeraar Betaalt Te Weinig: Dit Kunt U Doen",
    excerpt: "De verzekeraar biedt minder dan verwacht? U hoeft dit niet te accepteren. Ontdek uw opties voor een hogere vergoeding.",
    content: "",
    category: "Financieel",
    readTime: "6 min",
    date: "2026-01-24",
    dateFormatted: "24 januari 2026",
    featured: false,
  },
  {
    slug: "leaseauto-schade-door-ander",
    title: "Leaseauto Schade Door Ander: Wie Betaalt Wat?",
    excerpt: "Schade aan uw leaseauto door een ander? Ontdek wie aansprakelijk is, wat u moet doen en hoe u extra kosten vermijdt.",
    content: "",
    category: "Praktisch",
    readTime: "5 min",
    date: "2026-01-24",
    dateFormatted: "24 januari 2026",
    featured: false,
  },
  {
    slug: "autoschade-door-fietser",
    title: "Autoschade Door Fietser: Kunt U Dit Verhalen?",
    excerpt: "Schade aan uw auto veroorzaakt door een fietser? Ontdek wanneer u de schade kunt verhalen en hoe dit werkt.",
    content: "",
    category: "Praktisch",
    readTime: "6 min",
    date: "2026-01-24",
    dateFormatted: "24 januari 2026",
    featured: false,
  },
  {
    slug: "schade-parkeerplaats-supermarkt",
    title: "Schade op de Parkeerplaats van de Supermarkt",
    excerpt: "U komt terug van boodschappen en ontdekt een deuk. Wie is aansprakelijk en wat kunt u doen?",
    content: "",
    category: "Praktisch",
    readTime: "5 min",
    date: "2026-01-24",
    dateFormatted: "24 januari 2026",
    featured: false,
  },
]

/**
 * Haal fallback posts op (voor wanneer WordPress niet beschikbaar is)
 */
export function getFallbackPosts(): BlogPost[] {
  return fallbackBlogPosts
}

/**
 * Haal fallback post op via slug
 */
export function getFallbackPostBySlug(slug: string): BlogPost | null {
  return fallbackBlogPosts.find(post => post.slug === slug) || null
}

/**
 * Check of een slug bestaat in fallback posts
 */
export function hasFallbackPost(slug: string): boolean {
  return fallbackBlogPosts.some(post => post.slug === slug)
}
