/**
 * WordPress Headless CMS Integration
 * 
 * Gebruik:
 * ```typescript
 * import { getContentPosts, getContentPostBySlug, useWordPress } from '@/lib/wordpress'
 * 
 * // Hybride: gebruikt WordPress als geconfigureerd, anders fallback
 * const { posts, source } = await getContentPosts()
 * console.log(`Posts van: ${source}`) // 'wordpress' of 'fallback'
 * ```
 * 
 * Configuratie:
 * Voeg WORDPRESS_API_URL toe aan je .env.local:
 * ```
 * WORDPRESS_API_URL=https://autoschadebedrijf.nl
 * ```
 * 
 * Laat leeg om hardcoded content te gebruiken.
 */

// Core API functions
export * from './api'

// TypeScript types
export * from './types'

// Hybrid content service (recommended)
export * from './content-service'

// Fallback data
export { getFallbackPosts, hasFallbackPost } from './fallback-posts'
