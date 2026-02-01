import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://112autoschade.nl'
  
  // Core pages
  const corePages = [
    '',
    '/claim-indienen',
    '/diensten',
    '/hoe-werkt-het',
    '/schadescan',
    '/over-ons',
    '/contact',
    '/intermediairs',
    '/veelgestelde-vragen',
    '/downloads',
    '/blog',
  ]

  // Service pages
  const servicePages = [
    '/materiele-schade',
    '/letselschade',
    '/artikel-185-wvw',
    '/waarborgfonds',
    '/schade-expert',
  ]

  // Forms & Tools
  const toolPages = [
    '/getuigenverklaring',
    '/aansprakelijkstelling',
    '/oprijverklaring',
    '/witness-statement',
  ]

  // Legal pages
  const legalPages = [
    '/privacy',
    '/algemene-voorwaarden',
  ]

  // Regional pages
  const regions = [
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

  // Blog articles
  const blogArticles = [
    '/blog/wat-te-doen-na-ongeval',
    '/blog/wat-is-expertise-rapport',
    '/blog/wat-doet-schade-expert',
    '/blog/wa-verzekering-tegenpartij-claimen',
    '/blog/verzekeraar-betaalt-te-weinig',
    '/blog/vervangend-vervoer-autoschade',
    '/blog/verschil-wa-allrisk-cascoverzekering',
    '/blog/verjaringstermijn-autoschade',
    '/blog/verhaalrechtsbijstand-uitgelegd',
    '/blog/schuldvraag-verkeersongeval',
    '/blog/schade-verhalen-zonder-formulier',
    '/blog/schade-parkeerplaats-supermarkt',
    '/blog/schade-openstaand-portier',
    '/blog/rechtsbijstandverzekering-nodig',
    '/blog/parkeerschade-verhalen',
    '/blog/leaseauto-schade-door-ander',
    '/blog/hoe-verhaal-ik-autoschade',
    '/blog/hagelschade-stormschade-auto',
    '/blog/goede-fotos-autoschade',
    '/blog/getuigenverklaring-verkeersongeval',
    '/blog/expertiserapport-controleren',
    '/blog/europees-schadeformulier-invullen',
    '/blog/eigen-risico-vermijden',
    '/blog/eigen-risico-terugvragen',
    '/blog/dagwaarde-auto-berekenen',
    '/blog/autoschade-door-fietser',
    '/blog/auto-total-loss-wat-nu',
    '/blog/achterop-gereden-worden',
    '/blog/aansprakelijkheidsbrief-schrijven',
    '/blog/aansprakelijkheid-verkeersongeval',
    '/blog/aansprakelijkheid-minderjarige-bestuurder',
  ]

  // Combine all pages with their priorities
  const routes: MetadataRoute.Sitemap = [
    // Core pages (highest priority)
    ...corePages.map(route => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: route === '' ? 1 : 0.9,
    })),

    // Service pages (high priority)
    ...servicePages.map(route => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),

    // Tools and forms (medium-high priority)
    ...toolPages.map(route => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),

    // Regional pages (medium priority)
    ...regions.map(route => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),

    // Blog articles (medium priority)
    ...blogArticles.map(route => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),

    // Legal pages (lower priority)
    ...legalPages.map(route => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    })),
  ]

  return routes
}
