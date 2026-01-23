import { Metadata } from 'next'

interface PageMetadata {
  title: string
  description: string
  path?: string
  image?: string
}

export function generateMetadata({
  title,
  description,
  path = '',
  image = '/og-image.jpg',
}: PageMetadata): Metadata {
  const baseUrl = 'https://www.autoschadebureau.nl'
  const url = `${baseUrl}${path}`
  const fullTitle = title.includes('Autoschadebureau') ? title : `${title} | Autoschadebureau.nl`

  return {
    title: fullTitle,
    description,
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: 'Autoschadebureau.nl',
      images: [
        {
          url: `${baseUrl}${image}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'nl_NL',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [`${baseUrl}${image}`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: url,
    },
  }
}
