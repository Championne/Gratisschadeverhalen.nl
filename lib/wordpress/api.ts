/**
 * WordPress REST API Client
 * Haalt content op van headless WordPress installatie
 */

import {
  WPPost,
  WPCategory,
  WPPage,
  BlogPost,
  GetPostsParams,
  WPPostsResponse,
} from './types'

// WordPress API URL uit environment variables
const WP_API_URL = process.env.WORDPRESS_API_URL || process.env.NEXT_PUBLIC_WORDPRESS_API_URL

// Check of WordPress is geconfigureerd
export function isWordPressConfigured(): boolean {
  return !!WP_API_URL && WP_API_URL !== 'https://example.com'
}

// Base fetch functie met error handling
async function wpFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  if (!WP_API_URL) {
    throw new Error('WORDPRESS_API_URL is niet geconfigureerd')
  }

  const url = `${WP_API_URL}/wp-json/wp/v2${endpoint}`
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    // ISR: Cache voor 5 minuten, dan revalidate
    next: { revalidate: 300 },
  })

  if (!response.ok) {
    throw new Error(`WordPress API error: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

// Haal totaal aantal pagina's uit response headers
function getTotalPages(response: Response): number {
  return parseInt(response.headers.get('X-WP-TotalPages') || '1', 10)
}

function getTotalPosts(response: Response): number {
  return parseInt(response.headers.get('X-WP-Total') || '0', 10)
}

/**
 * Haal alle blog posts op
 */
export async function getPosts(params: GetPostsParams = {}): Promise<WPPostsResponse> {
  if (!WP_API_URL) {
    return { posts: [], totalPages: 0, totalPosts: 0 }
  }

  const {
    page = 1,
    perPage = 10,
    category,
    search,
    orderBy = 'date',
    order = 'desc',
  } = params

  const queryParams = new URLSearchParams({
    page: page.toString(),
    per_page: perPage.toString(),
    orderby: orderBy,
    order: order,
    _embed: 'true', // Include featured images, author, categories
  })

  if (category) {
    queryParams.set('categories', category)
  }

  if (search) {
    queryParams.set('search', search)
  }

  const url = `${WP_API_URL}/wp-json/wp/v2/posts?${queryParams.toString()}`
  
  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    next: { revalidate: 300 },
  })

  if (!response.ok) {
    console.error('WordPress API error:', response.status)
    return { posts: [], totalPages: 0, totalPosts: 0 }
  }

  const posts: WPPost[] = await response.json()
  
  return {
    posts,
    totalPages: getTotalPages(response),
    totalPosts: getTotalPosts(response),
  }
}

/**
 * Haal alle posts op (voor generateStaticParams)
 */
export async function getAllPosts(): Promise<WPPost[]> {
  if (!WP_API_URL) {
    return []
  }

  const allPosts: WPPost[] = []
  let page = 1
  let hasMore = true

  while (hasMore) {
    const { posts, totalPages } = await getPosts({ page, perPage: 100 })
    allPosts.push(...posts)
    hasMore = page < totalPages
    page++
  }

  return allPosts
}

/**
 * Haal een enkele post op via slug
 */
export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  if (!WP_API_URL) {
    return null
  }

  try {
    const posts = await wpFetch<WPPost[]>(`/posts?slug=${slug}&_embed=true`)
    return posts[0] || null
  } catch (error) {
    console.error(`Error fetching post with slug "${slug}":`, error)
    return null
  }
}

/**
 * Haal een post op via ID
 */
export async function getPostById(id: number): Promise<WPPost | null> {
  if (!WP_API_URL) {
    return null
  }

  try {
    return await wpFetch<WPPost>(`/posts/${id}?_embed=true`)
  } catch (error) {
    console.error(`Error fetching post with id "${id}":`, error)
    return null
  }
}

/**
 * Haal alle categorieën op
 */
export async function getCategories(): Promise<WPCategory[]> {
  if (!WP_API_URL) {
    return []
  }

  try {
    return await wpFetch<WPCategory[]>('/categories?per_page=100')
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

/**
 * Haal een pagina op via slug
 */
export async function getPageBySlug(slug: string): Promise<WPPage | null> {
  if (!WP_API_URL) {
    return null
  }

  try {
    const pages = await wpFetch<WPPage[]>(`/pages?slug=${slug}&_embed=true`)
    return pages[0] || null
  } catch (error) {
    console.error(`Error fetching page with slug "${slug}":`, error)
    return null
  }
}

/**
 * Transformeer WordPress post naar frontend BlogPost formaat
 */
export function transformPost(post: WPPost): BlogPost {
  // Extract featured image
  const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0]
  const featuredImage = featuredMedia ? {
    url: featuredMedia.source_url,
    alt: featuredMedia.alt_text || post.title.rendered,
    width: featuredMedia.media_details?.width || 1200,
    height: featuredMedia.media_details?.height || 630,
  } : undefined

  // Extract category
  const categories = post._embedded?.['wp:term']?.[0] || []
  const category = categories[0]?.name || post.acf?.categorie || 'Algemeen'

  // Extract author
  const authorData = post._embedded?.author?.[0]
  const author = authorData ? {
    name: authorData.name,
    avatar: authorData.avatar_urls?.['96'],
  } : undefined

  // Format date
  const date = new Date(post.date)
  const dateFormatted = date.toLocaleDateString('nl-NL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  // Clean excerpt (remove HTML tags)
  const excerpt = post.excerpt.rendered
    .replace(/<[^>]*>/g, '')
    .replace(/\n/g, ' ')
    .trim()

  // SEO data from Yoast
  const seo = post.yoast_head_json ? {
    title: post.yoast_head_json.title || post.title.rendered,
    description: post.yoast_head_json.description || excerpt,
    ogImage: post.yoast_head_json.og_image?.[0]?.url,
  } : undefined

  return {
    slug: post.slug,
    title: post.title.rendered,
    excerpt,
    content: post.content.rendered,
    category,
    readTime: post.acf?.leestijd || '5 min',
    date: post.date,
    dateFormatted,
    featured: post.acf?.featured || false,
    featuredImage,
    author,
    seo,
  }
}

/**
 * Haal getransformeerde posts op
 */
export async function getBlogPosts(params: GetPostsParams = {}): Promise<{
  posts: BlogPost[]
  totalPages: number
  totalPosts: number
}> {
  const { posts, totalPages, totalPosts } = await getPosts(params)
  
  return {
    posts: posts.map(transformPost),
    totalPages,
    totalPosts,
  }
}

/**
 * Haal getransformeerde post op via slug
 */
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const post = await getPostBySlug(slug)
  if (!post) return null
  return transformPost(post)
}

/**
 * Zoek posts
 */
export async function searchPosts(query: string): Promise<BlogPost[]> {
  const { posts } = await getPosts({ search: query, perPage: 20 })
  return posts.map(transformPost)
}

/**
 * Haal gerelateerde posts op (zelfde categorie)
 */
export async function getRelatedPosts(
  currentSlug: string,
  category: string,
  limit: number = 3
): Promise<BlogPost[]> {
  const { posts } = await getBlogPosts({ perPage: limit + 1, category })
  
  // Filter huidige post eruit
  return posts
    .filter(post => post.slug !== currentSlug)
    .slice(0, limit)
}
