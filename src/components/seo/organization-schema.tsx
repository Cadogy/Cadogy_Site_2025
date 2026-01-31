export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Cadogy",
    "alternateName": "Cadogy Web Development",
    "url": "https://www.cadogy.com",
    "logo": "https://www.cadogy.com/images/assets/logos/cadogy-shield.svg",
    "description": "Crafting exceptional digital experiences through innovative web development, secure infrastructure, and custom solutions for businesses in South Florida and beyond.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "3801 N Capital Of Texas Hwy Ste E240-180",
      "addressLocality": "Austin",
      "addressRegion": "TX",
      "postalCode": "78746-1416",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 30.3508,
      "longitude": -97.7968
    },
    "sameAs": [
      "https://www.instagram.com/cadogyweb",
      "https://www.github.com/cadogy",
      "https://www.linkedin.com/company/cadogy"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "hello@cadogy.com",
      "contactType": "Customer Service",
      "availableLanguage": "English"
    },
    "founder": [
      {
        "@type": "Person",
        "name": "Charles Knapp",
        "jobTitle": "Co-Founder & Lead Developer"
      },
    ],
    "foundingDate": "2020",
    "knowsAbout": [
      "Web Development",
      "Cybersecurity",
      "Digital Rights Management",
      "Custom Software Solutions",
      "API Development",
      "Cloud Infrastructure"
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
