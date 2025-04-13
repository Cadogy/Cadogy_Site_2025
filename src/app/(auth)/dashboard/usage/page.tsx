import type { Metadata } from "next"

import { siteConfig } from "@/config/site"
import { UsageContent } from "@/components/dashboard/usage-content"

export const metadata: Metadata = {
  title: `API Usage Statistics - ${siteConfig.name}`,
  description:
    "Monitor your API usage and remaining quota for this billing cycle",
  keywords: [
    ...siteConfig.keywords,
    "API usage",
    "analytics",
    "quota management",
    "billing",
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
    canonical: `${siteConfig.url.base}/dashboard/usage`,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${siteConfig.url.base}/dashboard/usage`,
    title: `API Usage Statistics - ${siteConfig.name}`,
    description:
      "Monitor your API usage, view detailed analytics, and manage your quota",
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} API Usage Dashboard`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `API Usage Statistics - ${siteConfig.name}`,
    description:
      "Monitor your API usage, view detailed analytics, and manage your quota",
    images: [siteConfig.ogImage],
    creator: "@cadogy",
  },
}

export default function UsagePage() {
  return <UsageContent />
}
