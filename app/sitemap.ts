import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.autoschadebureau.nl'
  
  // Static pages
  const staticPages = [
    '',
    '/diensten',
    '/claim-indienen',
    '/veelgestelde-vragen',
    '/blog',
    '/over-ons',
    '/contact',
    '/privacy',
    '/algemene-voorwaarden',
  ]

  // Blog posts
  const blogPosts = [
    '/blog/hoe-verhaal-ik-autoschade',
    '/blog/europees-schadeformulier-invullen',
    '/blog/wat-te-doen-na-ongeval',
    '/blog/auto-total-loss-wat-nu',
    '/blog/aansprakelijkheidsbrief-schrijven',
    '/blog/wa-verzekering-tegenpartij-claimen',
  ]

  const staticSitemap = staticPages.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : route === '/blog' ? 'weekly' : 'monthly' as 'weekly' | 'monthly',
    priority: route === '' ? 1.0 
      : route === '/claim-indienen' ? 0.9 
      : route === '/diensten' ? 0.8 
      : route === '/veelgestelde-vragen' ? 0.8
      : route === '/blog' ? 0.7
      : 0.6,
  }))

  const blogSitemap = blogPosts.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as 'monthly',
    priority: 0.6,
  }))

  return [...staticSitemap, ...blogSitemap]
}
