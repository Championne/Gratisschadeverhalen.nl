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

  return staticPages.map((route) => ({
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
}
