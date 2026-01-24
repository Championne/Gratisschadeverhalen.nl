export function StructuredData() {
  // Enhanced LocalBusiness schema with reviews and ratings
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://www.autoschadebureau.nl/#organization',
    name: 'Autoschadebureau.nl',
    alternateName: 'Autoschade Bureau',
    legalName: 'Autoschadebureau.nl',
    image: 'https://www.autoschadebureau.nl/og-image.jpg',
    logo: 'https://www.autoschadebureau.nl/logo.png',
    url: 'https://www.autoschadebureau.nl',
    telephone: '+31850607905',
    email: 'info@autoschadebureau.nl',
    priceRange: 'Gratis',
    paymentAccepted: 'No Cure No Pay',
    currenciesAccepted: 'EUR',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Einsteinlaan 28',
      addressLocality: 'Rijswijk',
      addressRegion: 'Zuid-Holland',
      postalCode: '2289 CC',
      addressCountry: 'NL',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 52.0378,
      longitude: 4.3135,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '17:00',
      },
    ],
    sameAs: [
      'https://www.linkedin.com/company/autoschadebureau',
      'https://www.facebook.com/autoschadebureau',
    ],
    description: 'Gratis autoschade en voertuigschade verhalen op de WA-verzekeraar van de tegenpartij. Geen voorschot, u betaalt niets. Automatische OCR-verwerking van het Europees Schadeformulier.',
    slogan: 'De verhaalservice voor uw voertuig- en letselschade',
    areaServed: [
      {
        '@type': 'Country',
        name: 'Netherlands',
      },
      {
        '@type': 'City',
        name: 'Amsterdam',
      },
      {
        '@type': 'City',
        name: 'Rotterdam',
      },
      {
        '@type': 'City',
        name: 'Den Haag',
      },
      {
        '@type': 'City',
        name: 'Utrecht',
      },
      {
        '@type': 'City',
        name: 'Eindhoven',
      },
      {
        '@type': 'City',
        name: 'Rijswijk',
      },
    ],
    knowsAbout: [
      'Autoschade Verhaal',
      'Voertuigschade Verhaal',
      'WA Schade Tegenpartij',
      'Europees Schadeformulier',
      'Aansprakelijkheidsbrief',
      'Expertiserapport',
      'Total Loss Regeling',
    ],
    
    // Aggregate Rating (based on testimonials)
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '127',
      bestRating: '5',
      worstRating: '1',
    },
    
    // Service Catalog
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Autoschade Verhaal Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Gratis Autoschade Verhaal',
            description: 'Verhaal uw autoschade op de WA-verzekeraar van de tegenpartij zonder voorschot',
            provider: {
              '@type': 'LocalBusiness',
              name: 'Autoschadebureau.nl',
            },
            areaServed: 'NL',
            availableChannel: {
              '@type': 'ServiceChannel',
              serviceUrl: 'https://www.autoschadebureau.nl',
            },
          },
          price: '0',
          priceCurrency: 'EUR',
          availability: 'https://schema.org/InStock',
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Voertuigschade Verhaal',
            description: 'Verhaal alle voertuigschade inclusief expertise en schadeherstellers',
            provider: {
              '@type': 'LocalBusiness',
              name: 'Autoschadebureau.nl',
            },
          },
          price: '0',
          priceCurrency: 'EUR',
        },
      ],
    },
  }

  // Website schema with search action
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://www.autoschadebureau.nl/#website',
    name: 'Autoschadebureau.nl',
    url: 'https://www.autoschadebureau.nl',
    description: 'Gratis autoschade en voertuigschade verhalen met automatische OCR-verwerking',
    publisher: {
      '@type': 'Organization',
      '@id': 'https://www.autoschadebureau.nl/#organization',
      name: 'Autoschadebureau.nl',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://www.autoschadebureau.nl/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  }

  // Organization schema
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://www.autoschadebureau.nl/#organization',
    name: 'Autoschadebureau.nl',
    url: 'https://www.autoschadebureau.nl',
    logo: 'https://www.autoschadebureau.nl/logo.png',
    description: 'Gratis autoschade verhalen - U betaalt niets, tegenpartij betaalt alles',
    foundingDate: '2024',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Einsteinlaan 28',
      addressLocality: 'Rijswijk',
      addressRegion: 'Zuid-Holland',
      postalCode: '2289 CC',
      addressCountry: 'NL',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+31850607905',
      contactType: 'customer service',
      areaServed: 'NL',
      availableLanguage: ['Dutch'],
    },
  }

  // Professional Service schema
  const professionalServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Autoschadebureau.nl',
    image: 'https://www.autoschadebureau.nl/og-image.jpg',
    '@id': 'https://www.autoschadebureau.nl/#service',
    url: 'https://www.autoschadebureau.nl',
    telephone: '+31850607905',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Einsteinlaan 28',
      addressLocality: 'Rijswijk',
      postalCode: '2289 CC',
      addressCountry: 'NL',
    },
    priceRange: 'Gratis',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '17:00',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }}
      />
    </>
  )
}
