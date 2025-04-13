import type { Metadata } from "next"

import { siteConfig } from "@/config/site"
import { ApiKeysContent } from "@/components/dashboard/api-keys-content"

export const metadata: Metadata = {
  title: `API Keys - ${siteConfig.name}`,
  description: "Manage and generate API keys for your applications",
  keywords: [
    ...siteConfig.keywords,
    "API keys",
    "developer tools",
    "API security",
    "authentication",
  ],
  authors: [{ name: siteConfig.author, url: siteConfig.url.author }],
  creator: siteConfig.author,
  publisher: siteConfig.name,
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: false,
      follow: true,
      noimageindex: true,
    },
  },
  alternates: {
    canonical: `${siteConfig.url.base}/dashboard/api-keys`,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${siteConfig.url.base}/dashboard/api-keys`,
    title: `API Keys - ${siteConfig.name}`,
    description:
      "Manage and generate API keys for secure access to our services",
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} API Keys Management`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `API Keys - ${siteConfig.name}`,
    description:
      "Manage and generate API keys for secure access to our services",
    images: [siteConfig.ogImage],
    creator: "@cadogy",
  },
}

export default function ApiKeysPage() {
  return <ApiKeysContent />
}
