import { Metadata } from "next"

import { siteConfig } from "@/config/site"

import ContactForm from "./ContactForm"

// Export metadata for the "Contact Us" page
export const metadata: Metadata = {
  title: `Contact Us - ${siteConfig.name}`,
  description: "Get in touch with us to discuss your project or any inquiries.",
  keywords: ["contact", "support", "inquiries", "business", "project"],
  openGraph: {
    title: `Contact Us - ${siteConfig.name}`,
    description:
      "Reach out to our team for business inquiries, support, or collaborations.",
    url: `${siteConfig.url.base}/contact`,
    images: [
      {
        url: siteConfig.ogImage,
        alt: `${siteConfig.name} - Contact Us`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Contact Us - Cadogy`,
    description:
      "Have questions? Contact us for support, project discussions, or general inquiries.",
    images: [siteConfig.ogImage],
  },
}

export default function ContactPage() {
  return <ContactForm />
}
