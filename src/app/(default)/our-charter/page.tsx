import { Metadata } from "next"

import { siteConfig } from "@/config/site"
import OurCharterContent from "@/components/body/OurCharterContent"
import WhoWeAreContent from "@/components/body/WhoWeAreContent"

export const metadata: Metadata = {
  title: `Our Charter - ${siteConfig.name}`,
  description: "Cadogy's guiding principles and strategic vision for creating innovative technology solutions, focusing on security, API development, and ethical innovation.",
  keywords: [
    "technology",
    "anti-piracy",
    "innovation",
    "digital experiences",
    "team",
    "API development",
    "security solutions",
    "ethical technology",
    "digital rights management"
  ],
  openGraph: {
    title: `Our Charter - Cadogy`,
    description: "Our guiding principles and strategic direction for developing secure, ethical technology solutions that empower creators and businesses.",
    url: `${siteConfig.url.base}/our-charter`,
    images: [
      {
        url: siteConfig.ogImage,
        alt: `${siteConfig.name} - Our Charter`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Our Charter | ${siteConfig.name}`,
    description: "Our guiding principles and strategic direction for developing secure, ethical technology solutions that empower creators and businesses.",
    images: [siteConfig.ogImage],
  },
}

export default function OurCharterPage() {
  return (
    <>
      <OurCharterContent />
    </>
  )
}
