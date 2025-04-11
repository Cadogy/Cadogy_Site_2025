import { Metadata } from "next"

import { siteConfig } from "@/config/site"

import FeaturesClient from "./components/FeaturesClient"

export const metadata: Metadata = {
  title: `API Features | ${siteConfig.name}`,
  description:
    "Discover the complete feature set of Cadogy's API platform. From content generation to data analysis, our API offers powerful tools to enhance your business applications and workflows.",
  keywords: [
    "API features", 
    "API capabilities", 
    "content generation", 
    "data analysis API", 
    "AI features", 
    "development tools", 
    "API documentation",
    "web services",
    "Cadogy API features"
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${siteConfig.url.base}/the-api/features`,
    title: `API Features | ${siteConfig.name}`,
    description:
      "Discover the complete feature set of Cadogy's API platform. From content generation to data analysis, our API offers powerful tools to enhance your business applications and workflows.",
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
      "Discover the complete feature set of Cadogy's API platform. From content generation to data analysis, our API offers powerful tools to enhance your business applications and workflows.",
    images: [siteConfig.ogImage],
  },
}

export default async function FeaturesPage() {
  return <FeaturesClient />
}
