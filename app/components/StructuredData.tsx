export default function StructuredData() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Vrvo',
    description: 'Enterprise-grade programmatic advertising and business transformation consulting for ambitious SMBs',
    url: 'https://vrvo.co',
    logo: 'https://vrvo.co/logo/vrvo_logo.png',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '1580 N Logan St Ste 660',
      addressLocality: 'Denver',
      addressRegion: 'Colorado',
      postalCode: '80203-1994',
      addressCountry: 'US'
    },
    areaServed: {
      '@type': 'Country',
      name: 'United States'
    },
    serviceType: [
      'Programmatic Advertising',
      'Digital Marketing Strategy',
      'Business Transformation Consulting',
      'Marketing Technology Implementation'
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Digital Marketing Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Programmatic Advertising',
            description: 'Enterprise DSP management and automated bidding strategies'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Strategic Marketing',
            description: 'Integrated multi-channel marketing campaigns'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Business Transformation',
            description: 'MarTech stack optimization and CRM implementation'
          }
        }
      ]
    }
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is programmatic advertising?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Programmatic advertising is automated, data-driven ad buying that uses real-time bidding to reach your target audience across display, video, and native channels at scale.'
        }
      },
      {
        '@type': 'Question',
        name: 'How does Vrvo differ from traditional agencies?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Vrvo provides enterprise-grade programmatic advertising and business transformation consulting typically reserved for Fortune 500 companies, made accessible for ambitious SMBs with transparent pricing and month-to-month partnerships.'
        }
      },
      {
        '@type': 'Question',
        name: 'What services does Vrvo offer?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Vrvo offers three core services: Programmatic Advertising (enterprise DSP management), Strategic Marketing (integrated multi-channel campaigns), and Business Transformation (MarTech implementation and optimization).'
        }
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  )
}
