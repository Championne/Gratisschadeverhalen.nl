import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.autoschadebureau.nl'
  
  // Static pages
  const staticPages = [
    '',
    '/claim-indienen',
    '/over-ons',
    '/contact',
    '/privacy',
    '/algemene-voorwaarden',
  ]

  return staticPages.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly' as 'weekly' | 'monthly',
    priority: route === '' ? 1.0 : route === '/claim-indienen' ? 0.9 : 0.7,
  }))
}
