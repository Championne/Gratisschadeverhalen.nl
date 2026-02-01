'use client'

// HowTo Schema for "Hoe werkt het" sections
export function HowToSchema() {
  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Hoe verhaal ik mijn autoschade?',
    description: 'Stap voor stap uitleg voor het verhalen van autoschade op de tegenpartij',
    image: 'https://www.112autoschade.nl/og-image.jpg',
    totalTime: 'PT10M',
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'EUR',
      value: '0',
    },
    supply: [
      {
        '@type': 'HowToSupply',
        name: 'Europees Schadeformulier',
      },
      {
        '@type': 'HowToSupply',
        name: 'Foto\'s van de schade',
      },
    ],
    tool: [
      {
        '@type': 'HowToTool',
        name: 'Smartphone of scanner',
      },
    ],
    step: [
      {
        '@type': 'HowToStep',
        name: 'Upload uw Europees Schadeformulier',
        text: 'Upload een foto of scan van uw ingevulde Europees Schadeformulier. Ons systeem leest automatisch alle gegevens in.',
        image: 'https://www.112autoschade.nl/step-1.jpg',
        url: 'https://www.112autoschade.nl#upload',
      },
      {
        '@type': 'HowToStep',
        name: 'Wij beoordelen uw claim',
        text: 'Ons team beoordeelt uw claim en controleert de aansprakelijkheid van de tegenpartij.',
        image: 'https://www.112autoschade.nl/step-2.jpg',
        url: 'https://www.112autoschade.nl/diensten#beoordeling',
      },
      {
        '@type': 'HowToStep',
        name: 'Wij regelen de expertise',
        text: 'Wij schakelen een onafhankelijke expert in die de schade vastlegt in een officieel expertiserapport.',
        image: 'https://www.112autoschade.nl/step-3.jpg',
        url: 'https://www.112autoschade.nl/diensten#expertise',
      },
      {
        '@type': 'HowToStep',
        name: 'U ontvangt uw vergoeding',
        text: 'Na akkoord van de verzekeraar wordt het schadebedrag direct naar u overgemaakt. U betaalt niets.',
        image: 'https://www.112autoschade.nl/step-4.jpg',
        url: 'https://www.112autoschade.nl/diensten#uitbetaling',
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
    />
  )
}

// Review Schema for testimonials
export function ReviewSchema() {
  const reviews = [
    {
      '@context': 'https://schema.org',
      '@type': 'Review',
      itemReviewed: {
        '@type': 'Service',
        name: 'Autoschade Verhaal Service',
        provider: {
          '@type': 'Organization',
          name: '112autoschade.nl',
        },
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5',
        bestRating: '5',
      },
      author: {
        '@type': 'Person',
        name: 'Linda van der Berg',
      },
      reviewBody: 'Binnen 4 weken volledige vergoeding ontvangen voor bumperklap in Amsterdam. €3.450 uitgekeerd inclusief vervangend vervoer. Geen gedoe, alles perfect geregeld!',
      datePublished: '2025-01-15',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Review',
      itemReviewed: {
        '@type': 'Service',
        name: 'Autoschade Verhaal Service',
        provider: {
          '@type': 'Organization',
          name: '112autoschade.nl',
        },
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5',
        bestRating: '5',
      },
      author: {
        '@type': 'Person',
        name: 'Marco Jansen',
      },
      reviewBody: 'Total loss claim van €18.500 binnen 5 weken volledig uitgekeerd. Dagwaarde plus restant eigen verzekering, alles keurig afgehandeld. Ik betaalde niets!',
      datePublished: '2025-01-10',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Review',
      itemReviewed: {
        '@type': 'Service',
        name: 'Autoschade Verhaal Service',
        provider: {
          '@type': 'Organization',
          name: '112autoschade.nl',
        },
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5',
        bestRating: '5',
      },
      author: {
        '@type': 'Person',
        name: 'Sophie Vermeulen',
      },
      reviewBody: 'Koplamp en spatbord vervangen na aanrijding. €2.150 ontvangen binnen 3 weken. Online kon ik alles volgen, super transparant!',
      datePublished: '2025-01-08',
    },
  ]

  return (
    <>
      {reviews.map((review, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(review) }}
        />
      ))}
    </>
  )
}
