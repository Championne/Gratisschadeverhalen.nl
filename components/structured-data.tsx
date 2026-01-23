export function StructuredData() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Autoschadebureau.nl',
    image: 'https://www.autoschadebureau.nl/og-image.jpg',
    '@id': 'https://www.autoschadebureau.nl',
    url: 'https://www.autoschadebureau.nl',
    telephone: '+31850607905',
    priceRange: '€€',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Einsteinlaan 28',
      addressLocality: 'Rijswijk',
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
      // Add social media profiles when available
    ],
    description: 'Gratis autoschade verhalen met 100% no cure no pay. Upload uw Europees Schadeformulier en wij regelen de rest.',
    areaServed: {
      '@type': 'Country',
      name: 'Netherlands',
    },
    serviceType: 'Autoschade Verhaal',
    
    // Add Service schema
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Autoschade Verhaal Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Gratis Autoschade Verhaal',
            description: 'Verhaal uw autoschade op de tegenpartij zonder voorschot, 100% no cure no pay',
          },
        },
      ],
    },
  }

  // Website schema
  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Autoschadebureau.nl',
    url: 'https://www.autoschadebureau.nl',
    description: 'Gratis autoschade verhalen met automatische OCR-verwerking',
    publisher: {
      '@type': 'Organization',
      name: 'Autoschadebureau.nl',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
    </>
  )
}
