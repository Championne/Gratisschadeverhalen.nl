/**
 * WordPress REST API Types
 * Types voor de WordPress headless CMS integratie
 */

// WordPress Post object van REST API
export interface WPPost {
  id: number
  date: string
  date_gmt: string
  modified: string
  modified_gmt: string
  slug: string
  status: 'publish' | 'draft' | 'pending' | 'private'
  type: string
  link: string
  title: {
    rendered: string
  }
  content: {
    rendered: string
    protected: boolean
  }
  excerpt: {
    rendered: string
    protected: boolean
  }
  author: number
  featured_media: number
  categories: number[]
  tags: number[]
  // Embedded data (wanneer _embed query parameter gebruikt wordt)
  _embedded?: {
    author?: WPAuthor[]
    'wp:featuredmedia'?: WPMedia[]
    'wp:term'?: WPTerm[][]
  }
  // ACF custom fields
  acf?: {
    leestijd?: string
    featured?: boolean
    categorie?: string
  }
  // Yoast SEO data
  yoast_head_json?: WPYoastSEO
}

// WordPress Author
export interface WPAuthor {
  id: number
  name: string
  url: string
  description: string
  slug: string
  avatar_urls: {
    [key: string]: string
  }
}

// WordPress Media (featured image)
export interface WPMedia {
  id: number
  date: string
  slug: string
  type: string
  link: string
  title: {
    rendered: string
  }
  alt_text: string
  media_details: {
    width: number
    height: number
    sizes: {
      [key: string]: {
        file: string
        width: number
        height: number
        source_url: string
      }
    }
  }
  source_url: string
}

// WordPress Term (category/tag)
export interface WPTerm {
  id: number
  link: string
  name: string
  slug: string
  taxonomy: 'category' | 'post_tag'
}

// WordPress Category
export interface WPCategory {
  id: number
  count: number
  description: string
  link: string
  name: string
  slug: string
  parent: number
}

// Yoast SEO data
export interface WPYoastSEO {
  title: string
  description: string
  canonical: string
  og_locale: string
  og_type: string
  og_title: string
  og_description: string
  og_url: string
  og_site_name: string
  og_image?: {
    url: string
    width: number
    height: number
    type: string
  }[]
  twitter_card: string
  twitter_title: string
  twitter_description: string
  schema?: {
    '@context': string
    '@graph': unknown[]
  }
}

// WordPress Page
export interface WPPage {
  id: number
  date: string
  slug: string
  status: 'publish' | 'draft' | 'pending' | 'private'
  title: {
    rendered: string
  }
  content: {
    rendered: string
  }
  excerpt: {
    rendered: string
  }
  featured_media: number
  parent: number
  menu_order: number
  acf?: Record<string, unknown>
  yoast_head_json?: WPYoastSEO
  _embedded?: {
    'wp:featuredmedia'?: WPMedia[]
  }
}

// API Response types
export interface WPPostsResponse {
  posts: WPPost[]
  totalPages: number
  totalPosts: number
}

// Getransformeerde blog post voor frontend gebruik
export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  content: string
  category: string
  readTime: string
  date: string
  dateFormatted: string
  featured: boolean
  featuredImage?: {
    url: string
    alt: string
    width: number
    height: number
  }
  author?: {
    name: string
    avatar?: string
  }
  seo?: {
    title: string
    description: string
    ogImage?: string
  }
}

// Query parameters voor posts ophalen
export interface GetPostsParams {
  page?: number
  perPage?: number
  category?: string
  search?: string
  orderBy?: 'date' | 'title' | 'modified'
  order?: 'asc' | 'desc'
}
