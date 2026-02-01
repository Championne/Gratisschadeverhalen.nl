import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { getBlogPost, getAllBlogSlugs } from "@/lib/markdown"
import { ArrowLeft, Calendar, User, Clock } from "lucide-react"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = getAllBlogSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)
  
  if (!post) {
    return { title: 'Artikel niet gevonden' }
  }

  return {
    title: `${post.title} | 112autoschade.nl`,
    description: post.description,
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    }
  }
}

export default async function MarkdownBlogPage({ params }: PageProps) {
  const { slug } = await params
  const post = getBlogPost(slug)

  if (!post) {
    notFound()
  }

  // Estimate reading time (avg 200 words per minute)
  const wordCount = post.content.split(/\s+/).length
  const readingTime = Math.ceil(wordCount / 200)

  // Article Schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.description,
    "image": post.image,
    "datePublished": post.date,
    "author": {
      "@type": "Organization",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "112autoschade.nl",
      "logo": {
        "@type": "ImageObject",
        "url": "https://112autoschade.nl/logo.png"
      }
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="min-h-screen bg-white">
        <main className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Breadcrumbs */}
          <Breadcrumbs items={[
            { label: "Blog", href: "/blog" },
            { label: post.title }
          ]} />

          <Link href="/blog" className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
            <ArrowLeft className="h-4 w-4" />
            Terug naar Knowledge Base
          </Link>

          <article>
            {/* Header */}
            <header className="mb-8">
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-4">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
                  Artikel
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {readingTime} min leestijd
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(post.date).toLocaleDateString('nl-NL', { 
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </span>
                <span className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {post.author}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {post.title}
              </h1>

              {post.description && (
                <p className="text-xl text-gray-600 leading-relaxed">
                  {post.description}
                </p>
              )}
            </header>

            {/* Content */}
            <div 
              className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-primary prose-strong:text-gray-900 prose-li:text-gray-700 prose-blockquote:border-l-primary prose-blockquote:text-gray-600"
              dangerouslySetInnerHTML={{ __html: post.htmlContent }}
            />

            {/* CTA Section */}
            <div className="mt-12 p-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl text-white">
              <h2 className="text-2xl font-bold mb-4">
                Hulp nodig bij uw schade?
              </h2>
              <p className="text-blue-100 mb-6">
                Wij verhalen uw autoschade volledig gratis. De kosten verhalen wij op de tegenpartij.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" variant="secondary">
                  <Link href="/claim-indienen">
                    Direct claim indienen
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <Link href="/schadescan">
                    Gratis SchadeScan
                  </Link>
                </Button>
              </div>
            </div>
          </article>

          {/* Related Articles Suggestion */}
          <div className="mt-12 pt-8 border-t">
            <h3 className="text-xl font-semibold mb-4">Meer artikelen</h3>
            <div className="flex flex-wrap gap-3">
              <Link 
                href="/blog" 
                className="text-primary hover:underline"
              >
                Bekijk alle artikelen →
              </Link>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
