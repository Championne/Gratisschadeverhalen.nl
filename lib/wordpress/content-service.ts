/**
 * Content Service
 * Hybride service die WordPress gebruikt indien geconfigureerd,
 * anders terugvalt op hardcoded content
 */

import { BlogPost } from './types'
import { 
  isWordPressConfigured, 
  getBlogPosts as getWPBlogPosts,
  getBlogPostBySlug as getWPBlogPostBySlug,
  getAllPosts
} from './api'
import { 
  getFallbackPosts, 
  getFallbackPostBySlug,
  hasFallbackPost 
} from './fallback-posts'

/**
 * Bepaal of we WordPress of fallback moeten gebruiken
 */
export function useWordPress(): boolean {
  return isWordPressConfigured()
}

/**
 * Haal alle blog posts op
 * Gebruikt WordPress als geconfigureerd, anders fallback
 */
export async function getContentPosts(params?: {
  page?: number
  perPage?: number
  category?: string
}): Promise<{
  posts: BlogPost[]
  totalPages: number
  totalPosts: number
  source: 'wordpress' | 'fallback'
}> {
  if (useWordPress()) {
    try {
      const result = await getWPBlogPosts(params)
      return {
        ...result,
        source: 'wordpress'
      }
    } catch (error) {
      console.error('WordPress fetch failed, using fallback:', error)
      // Fall through to fallback
    }
  }

  // Fallback naar hardcoded posts
  const allPosts = getFallbackPosts()
  const page = params?.page || 1
  const perPage = params?.perPage || 10
  
  // Filter by category if specified
  let filteredPosts = allPosts
  if (params?.category) {
    filteredPosts = allPosts.filter(post => 
      post.category.toLowerCase() === params.category?.toLowerCase()
    )
  }

  // Paginate
  const startIndex = (page - 1) * perPage
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + perPage)
  
  return {
    posts: paginatedPosts,
    totalPages: Math.ceil(filteredPosts.length / perPage),
    totalPosts: filteredPosts.length,
    source: 'fallback'
  }
}

/**
 * Haal een enkele blog post op via slug
 */
export async function getContentPostBySlug(slug: string): Promise<{
  post: BlogPost | null
  source: 'wordpress' | 'fallback'
}> {
  if (useWordPress()) {
    try {
      const post = await getWPBlogPostBySlug(slug)
      if (post) {
        return { post, source: 'wordpress' }
      }
    } catch (error) {
      console.error(`WordPress fetch for "${slug}" failed:`, error)
    }
  }

  // Fallback: check of we een hardcoded pagina hebben
  const fallbackPost = getFallbackPostBySlug(slug)
  return {
    post: fallbackPost,
    source: 'fallback'
  }
}

/**
 * Haal alle post slugs op (voor generateStaticParams)
 */
export async function getAllPostSlugs(): Promise<string[]> {
  const slugs: string[] = []

  // Altijd fallback slugs toevoegen (die hebben hardcoded TSX pagina's)
  const fallbackPosts = getFallbackPosts()
  slugs.push(...fallbackPosts.map(p => p.slug))

  // Als WordPress geconfigureerd is, ook die slugs ophalen
  if (useWordPress()) {
    try {
      const wpPosts = await getAllPosts()
      const wpSlugs = wpPosts.map(p => p.slug)
      
      // Voeg WordPress slugs toe die niet al in fallback zitten
      for (const slug of wpSlugs) {
        if (!slugs.includes(slug)) {
          slugs.push(slug)
        }
      }
    } catch (error) {
      console.error('Failed to get WordPress slugs:', error)
    }
  }

  return slugs
}

/**
 * Check of een post uit WordPress komt of hardcoded is
 */
export async function getPostSource(slug: string): Promise<'wordpress' | 'fallback' | 'not-found'> {
  // Check eerst of het een hardcoded post is
  if (hasFallbackPost(slug)) {
    return 'fallback'
  }

  // Check WordPress
  if (useWordPress()) {
    try {
      const post = await getWPBlogPostBySlug(slug)
      if (post) {
        return 'wordpress'
      }
    } catch (error) {
      console.error(`Error checking WordPress for "${slug}":`, error)
    }
  }

  return 'not-found'
}

/**
 * Haal featured posts op
 */
export async function getFeaturedPosts(limit: number = 6): Promise<BlogPost[]> {
  const { posts } = await getContentPosts({ perPage: 50 })
  return posts.filter(p => p.featured).slice(0, limit)
}

/**
 * Haal posts op per categorie
 */
export async function getPostsByCategory(category: string): Promise<BlogPost[]> {
  const { posts } = await getContentPosts({ category, perPage: 100 })
  return posts
}

/**
 * Haal alle unieke categorieën op
 */
export async function getAllCategories(): Promise<string[]> {
  const { posts } = await getContentPosts({ perPage: 100 })
  const categories = new Set(posts.map(p => p.category))
  return Array.from(categories).sort()
}
