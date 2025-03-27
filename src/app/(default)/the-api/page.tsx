import { Metadata } from "next"

import { siteConfig } from "@/config/site"

import ApiOverviewClient from "./components/ApiOverviewClient"

export const metadata: Metadata = {
  title: `The API`,
  description:
    "One unified API for all your AI needs. Access state-of-the-art artificial intelligence tools through a single, intuitive API.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${siteConfig.url.base}/the-api`,
    title: `The API | ${siteConfig.name}`,
    description:
      "One unified API for all your AI needs. Access state-of-the-art artificial intelligence tools through a single, intuitive API.",
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
      "One unified API for all your AI needs. Access state-of-the-art artificial intelligence tools through a single, intuitive API.",
    images: [siteConfig.ogImage],
  },
}

export default function ApiOverviewPage() {
  return <ApiOverviewClient />
}
