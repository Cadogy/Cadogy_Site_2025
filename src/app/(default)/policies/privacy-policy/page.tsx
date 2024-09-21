import React from "react"
import { Metadata } from "next"

import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
  title: `Privacy Policy`,
  description:
    "Welcome to Cadogy's Privacy Policy page. Your privacy is critically important to us.",
  keywords: ["company", "mission", "team", "digital experiences", "innovation"],
  openGraph: {
    title: `Privacy Policy - Cadogy`,
    description:
      "Welcome to Cadogy's Privacy Policy page. Your privacy is critically important to us.",
    url: `${siteConfig.url.base}/who-we-are`,
    images: [
      {
        url: siteConfig.ogImage,
        alt: `${siteConfig.name} - Privacy Policy`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Privacy Policy | ${siteConfig.name}`,
    description:
      "Welcome to Cadogy's Privacy Policy page. Your privacy is critically important to us.",
    images: [siteConfig.ogImage],
  },
}

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy-container container px-4 py-10">
      <div className="mb-[3.5rem] mt-[5rem] flex flex-col items-center">
        <h2 className="text-[14px] text-muted-foreground">#policies</h2>
        <h1 className="text-[50px]">Privacy Policy</h1>
      </div>
      <p>
        Welcome to Cadogy&apos;s Privacy Policy page. Your privacy is critically
        important to us.
      </p>

      <section className="mt-8">
        <h2 className="mb-4 text-2xl font-semibold">Information We Collect</h2>
        <p>
          We collect various types of information in connection with the
          services we provide, including:
        </p>
        <ul className="list-disc pl-5">
          <li>
            Personal information you provide directly to us (such as name, email
            address).
          </li>
          <li>
            Automatically collected data (like browser information, IP address,
            etc.).
          </li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-2xl font-semibold">
          How We Use Your Information
        </h2>
        <p>We use the information we collect to:</p>
        <ul className="list-disc pl-5">
          <li>Provide and maintain our services.</li>
          <li>Improve and personalize your experience on Cadogy.</li>
          <li>
            Communicate with you regarding updates, promotions, or changes in
            services.
          </li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-2xl font-semibold">
          Sharing Your Information
        </h2>
        <p>
          We do not share your personal information with third parties except as
          necessary to provide services or comply with legal obligations.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-2xl font-semibold">Your Privacy Choices</h2>
        <p>You may choose to:</p>
        <ul className="list-disc pl-5">
          <li>Update or correct your personal information.</li>
          <li>Opt-out of certain communications from us.</li>
          <li>Request deletion of your data.</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-2xl font-semibold">Contact Us</h2>
        <p>
          If you have any questions or concerns about our privacy practices,
          please contact us at support@cadogy.com.
        </p>
      </section>
    </div>
  )
}

export default PrivacyPolicy
