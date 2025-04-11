import { Metadata } from "next"

import { siteConfig } from "@/config/site"

import ApiOverviewClient from "./components/ApiOverviewClient"

export const metadata: Metadata = {
  title: `The API - ${siteConfig.name}`,
  description:
    "Access Cadogy's unified API for all your AI and web development needs. Our powerful API platform offers content generation, research tools, and custom development solutions for businesses.",
  keywords: [
    "unified API", 
    "AI API", 
    "content generation API", 
    "development API", 
    "web services API", 
    "Cadogy API platform", 
    "API integration",
    "AI tools",
    "developer resources"
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${siteConfig.url.base}/the-api`,
    title: `The API | ${siteConfig.name}`,
    description:
      "Access Cadogy's unified API for all your AI and web development needs. Our powerful API platform offers content generation, research tools, and custom development solutions for businesses.",
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Cadogy API",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `The API | ${siteConfig.name}`,
    description:
      "Access Cadogy's unified API for all your AI and web development needs. Our powerful API platform offers content generation, research tools, and custom development solutions for businesses.",
    images: [siteConfig.ogImage],
  },
}

export default function ApiOverviewPage() {
  return <ApiOverviewClient />
}
