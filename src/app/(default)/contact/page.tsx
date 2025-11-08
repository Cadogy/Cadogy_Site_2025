import { Metadata } from "next"

import { siteConfig } from "@/config/site"
import { getSiteSettings } from "@/lib/get-site-settings"

import ContactForm from "./ContactForm"

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()

  return {
    title: `Contact Us - ${settings.siteName}`,
    description:
      "Get in touch with us to discuss your project or any inquiries.",
    keywords: ["contact", "support", "inquiries", "business", "project"],
    openGraph: {
      title: `Contact Us - ${settings.siteName}`,
      description:
        "Reach out to our team for business inquiries, support, or collaborations.",
      url: `${siteConfig.url.base}/contact`,
      images: [
        {
          url: siteConfig.ogImage,
          alt: `${settings.siteName} - Contact Us`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Contact Us - ${settings.siteName}`,
      description:
        "Have questions? Contact us for support, project discussions, or general inquiries.",
      images: [siteConfig.ogImage],
    },
  }
}

export default function ContactPage() {
  return (
    <div className="relative">
      <div
        className="absolute inset-0 z-[-1] h-full w-full bg-cover bg-center bg-no-repeat opacity-5"
        style={{
          backgroundImage:
            "url('/images/assets/backgrounds/cadogy_abstract_background.jpg')",
        }}
      ></div>
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background via-background to-transparent"></div>
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background via-background to-transparent"></div>
      <ContactForm />
    </div>
  )
}
