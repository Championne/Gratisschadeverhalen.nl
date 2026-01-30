import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Upload, Calendar, Clock, User } from "lucide-react"
import { 
  getContentPostBySlug, 
  getAllPostSlugs,
  getPostSource,
  getContentPosts
} from "@/lib/wordpress"

interface Props {
  params: Promise<{ slug: string }>
}

// Genereer alle blog URLs voor static generation
export async function generateStaticParams() {
  const slugs = await getAllPostSlugs()
  return slugs.map((slug) => ({ slug }))
}

// Genereer SEO metadata vanuit WordPress of fallback
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const { post } = await getContentPostBySlug(slug)
  
  if (!post) {
    return {
      title: 'Post niet gevonden',
    }
  }

  return {
    title: post.seo?.title || `${post.title} | Autoschadebureau.nl`,
    description: post.seo?.description || post.excerpt,
    openGraph: {
      title: post.seo?.title || post.title,
      description: post.seo?.description || post.excerpt,
      type: 'article',
      publishedTime: post.date,
      images: post.seo?.ogImage ? [post.seo.ogImage] : post.featuredImage ? [post.featuredImage.url] : [],
    },
  }
}

export default async function WordPressBlogPost({ params }: Props) {
  const { slug } = await params
  
  // Check waar de post vandaan moet komen
  const source = await getPostSource(slug)
  
  // Als het een fallback post is, redirect naar de hardcoded versie
  if (source === 'fallback') {
    // De hardcoded pagina's staan in /blog/[slug]
    // Dit component is alleen voor WordPress posts
    notFound()
  }

  // Haal WordPress post op
  const { post } = await getContentPostBySlug(slug)
  
  if (!post) {
    notFound()
  }

  // Haal gerelateerde posts op
  const { posts: allPosts } = await getContentPosts({ perPage: 4 })
  const relatedPosts = allPosts
    .filter(p => p.slug !== slug && p.category === post.category)
    .slice(0, 2)

  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Link href="/blog" className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
          <ArrowLeft className="h-4 w-4" />
          Terug naar Blog
        </Link>

        <article>
          {/* Header */}
          <header className="mb-8">
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-3">
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
                {post.category}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {post.readTime}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {post.dateFormatted}
              </span>
              {post.author && (
                <span className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  {post.author.name}
                </span>
              )}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {post.title}
            </h1>
            
            <p className="text-xl text-muted-foreground">
              {post.excerpt}
            </p>
          </header>

          {/* Featured Image */}
          {post.featuredImage && (
            <div className="mb-8 rounded-lg overflow-hidden">
              <img 
                src={post.featuredImage.url} 
                alt={post.featuredImage.alt}
                width={post.featuredImage.width}
                height={post.featuredImage.height}
                className="w-full h-auto"
              />
            </div>
          )}

          {/* CTA Box */}
          <Card className="border-2 border-primary bg-primary/5 mb-8">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Upload className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-2">💡 Wij regelen het gratis voor u!</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Upload uw schadeformulier en wij verhalen uw schade op de tegenpartij. 
                    U betaalt niets - alle kosten worden door hen vergoed.
                  </p>
                  <Link href="/claim-indienen">
                    <Button>
                      <Upload className="mr-2 h-4 w-4" />
                      Start Gratis Claim
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Content */}
          <div 
            className="prose prose-lg max-w-none prose-headings:font-bold prose-a:text-primary prose-img:rounded-lg"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Bottom CTA */}
          <Card className="my-8 border-2 border-primary bg-gradient-to-br from-primary/5 to-white">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">
                Klaar om uw schade te verhalen?
              </h3>
              <p className="text-muted-foreground mb-6">
                Upload uw schadeformulier en wij starten direct. 
                Binnen 24 uur krijgt u een eerste beoordeling.
              </p>
              <Link href="/claim-indienen">
                <Button size="lg" className="text-lg px-8">
                  <Upload className="mr-2 h-5 w-5" />
                  Start Nu Uw Gratis Claim
                </Button>
              </Link>
              <p className="text-sm text-muted-foreground mt-4">
                100% gratis • Geen eigen risico • Gemiddeld binnen 6 weken
              </p>
            </CardContent>
          </Card>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="mt-12 pt-8 border-t">
              <h3 className="text-xl font-bold mb-4">📚 Gerelateerde Artikelen</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {relatedPosts.map((related) => (
                  <Link 
                    key={related.slug}
                    href={`/blog/${related.slug}`} 
                    className="block p-4 border rounded-lg hover:border-primary hover:shadow-md transition-all"
                  >
                    <h4 className="font-semibold mb-2">{related.title}</h4>
                    <p className="text-sm text-muted-foreground line-clamp-2">{related.excerpt}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>
    </div>
  )
}
