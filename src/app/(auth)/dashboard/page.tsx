import type { Metadata } from "next"

import { siteConfig } from "@/config/site"
import { DashboardContent } from "@/components/dashboard/dashboard-content"

export const metadata: Metadata = {
  title: `Dashboard - ${siteConfig.name}`,
  description:
    "Manage your Cadogy account, API keys, and view your usage statistics.",
  keywords: [
    ...siteConfig.keywords,
    "dashboard",
    "API keys",
    "analytics",
    "user profile",
    "admin panel",
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
    canonical: `${siteConfig.url.base}/dashboard`,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${siteConfig.url.base}/dashboard`,
    title: `Dashboard - ${siteConfig.name}`,
    description:
      "Access your Cadogy account dashboard, manage your API keys, and view usage statistics.",
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} Dashboard Preview`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Dashboard - ${siteConfig.name}`,
    description:
      "Access your Cadogy account dashboard, manage your API keys, and view usage statistics.",
    images: [siteConfig.ogImage],
    creator: "@cadogy",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 2,
  },
  category: "Dashboard",
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": `${siteConfig.name} Dashboard`,
    "format-detection": "telephone=no",
  },
}

export default function DashboardPage() {
  return <DashboardContent />
}
