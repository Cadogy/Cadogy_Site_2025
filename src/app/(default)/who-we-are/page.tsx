import { Metadata } from "next"

import { siteConfig } from "@/config/site"
import WhoWeAreContent from "@/components/body/WhoWeAreContent"

export const metadata: Metadata = {
  title: `Who We Are`,
  description:
    "Learn more about the founders Charles Knapp and Dylan Safra, their journey through technology, and how they push boundaries in digital innovation.",
  keywords: [
    "technology",
    "anti-piracy",
    "innovation",
    "digital experiences",
    "team",
  ],
  openGraph: {
    title: `Who We Are - Cadogy`,
    description:
      "Get to know Charles Knapp and Dylan Safra, the minds behind Cadogy, their journey in digital innovation, and how they shape the future of technology.",
    url: `${siteConfig.url.base}/who-we-are`,
    images: [
      {
        url: siteConfig.ogImage,
        alt: `${siteConfig.name} - Who We Are`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Who We Are | ${siteConfig.name}`,
    description:
      "Meet Charles Knapp and Dylan Safra, the team driving innovation in digital experiences and anti-piracy.",
    images: [siteConfig.ogImage],
  },
}

export default function WhoWeAre() {
  return (
    <>
      <WhoWeAreContent />
    </>
  )
}
