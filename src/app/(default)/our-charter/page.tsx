import { Metadata } from "next"

import { siteConfig } from "@/config/site"
import OurCharterContent from "@/components/body/OurCharterContent"
import WhoWeAreContent from "@/components/body/WhoWeAreContent"

export const metadata: Metadata = {
  title: `Our Charter`,
  description: "",
  keywords: [
    "technology",
    "anti-piracy",
    "innovation",
    "digital experiences",
    "team",
  ],
  openGraph: {
    title: `Our Charter - Cadogy`,
    description: "",
    url: `${siteConfig.url.base}/who-we-are`,
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
    description: "",
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
