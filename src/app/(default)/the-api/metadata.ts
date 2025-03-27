import { Metadata } from "next"

import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
  title: "The API",
  description:
    "Explore the powerful features of The API by Cadogy - your gateway to AI-powered content generation, research, and development.",
  openGraph: {
    title: "The API - Cadogy",
    description:
      "Explore the powerful features of The API by Cadogy - your gateway to AI-powered content generation, research, and development.",
    url: `${siteConfig.url.base}/the-api`,
    images: [{ url: siteConfig.ogImage, alt: "Cadogy API" }],
  },
}
