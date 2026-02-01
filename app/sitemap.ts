import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.112autoschade.nl'
  
  // Static pages
  const staticPages = [
    '',
    '/diensten',
    '/claim-indienen',
    '/veelgestelde-vragen',
    '/blog',
    '/downloads',
    '/intermediairs',
    '/over-ons',
    '/contact',
    '/privacy',
    '/algemene-voorwaarden',
    // Lokale SEO pagina's
    '/autoschade-verhalen-amsterdam',
    '/autoschade-verhalen-rotterdam',
    '/autoschade-verhalen-den-haag',
    '/autoschade-verhalen-utrecht',
    '/autoschade-verhalen-eindhoven',
    '/autoschade-verhalen-tilburg',
    '/autoschade-verhalen-groningen',
    '/autoschade-verhalen-almere',
    '/autoschade-verhalen-breda',
    '/autoschade-verhalen-nijmegen',
    '/autoschade-verhalen-arnhem',
    '/autoschade-verhalen-haarlem',
    '/autoschade-verhalen-zaanstad',
    '/autoschade-verhalen-apeldoorn',
    '/autoschade-verhalen-amersfoort',
  ]

  // Blog posts (alleen bestaande pagina's)
  const blogPosts = [
    '/blog/hoe-verhaal-ik-autoschade',
    '/blog/europees-schadeformulier-invullen',
    '/blog/wat-te-doen-na-ongeval',
    '/blog/auto-total-loss-wat-nu',
    '/blog/aansprakelijkheidsbrief-schrijven',
    '/blog/wa-verzekering-tegenpartij-claimen',
    '/blog/expertiserapport-controleren',
    '/blog/schade-verhalen-zonder-formulier',
    '/blog/dagwaarde-auto-berekenen',
    '/blog/vervangend-vervoer-autoschade',
    '/blog/schade-openstaand-portier',
    '/blog/autoschade-door-fietser',
    '/blog/schade-parkeerplaats-supermarkt',
    // Nieuwe artikelen januari 2026
    '/blog/achterop-gereden-worden',
    '/blog/eigen-risico-terugvragen',
    '/blog/leaseauto-schade-door-ander',
    '/blog/wat-doet-schade-expert',
    '/blog/verzekeraar-betaalt-te-weinig',
    '/blog/hagelschade-stormschade-auto',
    '/blog/goede-fotos-autoschade',
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
