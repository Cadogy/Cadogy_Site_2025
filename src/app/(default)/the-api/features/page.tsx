import { Metadata } from "next"

import { siteConfig } from "@/config/site"

import FeaturesClient from "./components/FeaturesClient"

export const metadata: Metadata = {
  title: `API Features | ${siteConfig.name}`,
  description:
    "Explore the powerful features of The API by Cadogy - your gateway to AI-powered content generation, research, and development.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${siteConfig.url.base}/the-api/features`,
    title: `API Features | ${siteConfig.name}`,
    description:
      "Explore the powerful features of The API by Cadogy - your gateway to AI-powered content generation, research, and development.",
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Cadogy API Features",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `API Features | ${siteConfig.name}`,
    description:
      "Explore the powerful features of The API by Cadogy - your gateway to AI-powered content generation, research, and development.",
    images: [siteConfig.ogImage],
  },
}

export default async function FeaturesPage() {
  return <FeaturesClient />
}
