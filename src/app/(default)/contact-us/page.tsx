import React from "react"
import { Metadata } from "next"

import { siteConfig } from "@/config/site"

// Export metadata for the "Contact Us" page
export const metadata: Metadata = {
  title: `Contact Us`,
  description: "Get in touch with us to discuss your project or any inquiries.",
  keywords: ["contact", "support", "inquiries", "business", "project"],
  openGraph: {
    title: `Contact Us - Cadogy`,
    description:
      "Reach out to our team for business inquiries, support, or collaborations.",
    url: `${siteConfig.url.base}/contact-us`,
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

const ContactPage = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-background p-6">
      <div className="mb-[3.5rem] mt-[5rem] flex flex-col items-center">
        <h1 className="text-[32px] md:text-[50px]">Get in Touch</h1>{" "}
      </div>
      <div className="flex flex-col items-center text-center text-slate-200 md:text-left">
        <p className="mb-4">
          We’re here to help you with any inquiries or projects. Reach out to us
          through the following channels:
        </p>

        <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
          {/* LinkedIn */}
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-semibold">LinkedIn:</h3>
            <a
              href="https://www.linkedin.com/company/cadogy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-300 hover:underline"
            >
              Cadogy LinkedIn
            </a>
          </div>

          {/* Email */}
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-semibold">Email:</h3>
            <a
              href="mailto:contact@cadogy.com"
              className="text-slate-300 hover:underline"
            >
              contact@cadogy.com
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage
