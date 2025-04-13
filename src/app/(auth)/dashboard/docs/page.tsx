import type { Metadata } from "next"

import { siteConfig } from "@/config/site"
import { DocsContent } from "@/components/dashboard/docs-content"

export const metadata: Metadata = {
  title: `API Documentation - ${siteConfig.name}`,
  description:
    "Comprehensive guides and examples to help you integrate with our API",
  keywords: [
    ...siteConfig.keywords,
    "API documentation",
    "developer guides",
    "code examples",
    "API integration",
  ],
  authors: [{ name: siteConfig.author, url: siteConfig.url.author }],
  creator: siteConfig.author,
  publisher: siteConfig.name,
  robots: {
    index: true, // Documentation can be indexed for developer discovery
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: `${siteConfig.url.base}/dashboard/docs`,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${siteConfig.url.base}/dashboard/docs`,
    title: `API Documentation - ${siteConfig.name}`,
    description:
      "Comprehensive guides and code examples to help you integrate with our API",
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} API Documentation`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `API Documentation - ${siteConfig.name}`,
    description:
      "Comprehensive guides and code examples to help you integrate with our API",
    images: [siteConfig.ogImage],
    creator: "@cadogy",
  },
}

export default function DocsPage() {
  return <DocsContent />
}
