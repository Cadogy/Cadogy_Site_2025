import { Metadata } from "next"

import { siteConfig } from "@/config/site"
import WhoWeAreContent from "@/components/whoweare/WhoWeAreContent"

export const metadata: Metadata = {
  title: `Experienced Web Developers in Pompano Beach - Who We Are`,
  description:
    "Meet the Cadogy team led by Charles Knapp and Dylan Safra, expert web developers in Pompano Beach, FL. Our passionate professionals deliver cutting-edge websites and secure digital solutions for businesses across South Florida.",
  keywords: [
    "Pompano Beach web developers",
    "South Florida web development team",
    "Charles Knapp developer",
    "Dylan Safra developer",
    "expert web development team",
    "Florida tech company",
    "Pompano Beach technology experts",
    "custom website developers Florida",
    "digital innovation",
    "professional web team",
  ],
  openGraph: {
    title: `Pompano Beach Web Development Experts | Who We Are - Cadogy`,
    description:
      "Meet the skilled web development team at Cadogy, led by Charles Knapp and Dylan Safra. Our Pompano Beach, FL professionals build custom websites and secure digital solutions that help Florida businesses thrive online.",
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
    title: `Pompano Beach Web Development Team | Who We Are - ${siteConfig.name}`,
    description:
      "Meet Charles Knapp and Dylan Safra, leading Cadogy's expert web development team in Pompano Beach, FL. We create custom digital solutions that elevate your business online.",
    images: [siteConfig.ogImage],
  },
}

export default function WhoWeAre() {
  return <WhoWeAreContent />
}
