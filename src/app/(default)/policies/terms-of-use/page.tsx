import React from "react"
import { Metadata } from "next"

import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
  title: `Terms of Use - ${siteConfig.name}`,
  description:
    "Review Cadogy's Terms of Use outlining the rules and guidelines for using our website and services. Learn about user responsibilities, intellectual property rights, and more.",
  keywords: ["terms of use", "terms and conditions", "website terms", "user agreement", "legal terms", "service terms", "website rules"],
  openGraph: {
    title: `Terms of Use - ${siteConfig.name}`,
    description:
      "Review Cadogy's Terms of Use outlining the rules and guidelines for using our website and services. Learn about user responsibilities, intellectual property rights, and more.",
    url: `${siteConfig.url.base}/policies/terms-of-use`,
    images: [
      {
        url: siteConfig.ogImage,
        alt: `${siteConfig.name} - Terms of Use`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Terms of Use | ${siteConfig.name}`,
    description:
      "Review Cadogy's Terms of Use outlining the rules and guidelines for using our website and services. Learn about user responsibilities, intellectual property rights, and more.",
    images: [siteConfig.ogImage],
  },
}

const TermsOfUse = () => {
  return (
    <div className="terms-of-use-container container px-4 pb-10">
      <div className="mb-[3.5rem] mt-[5rem] flex flex-col items-center">
        <h2 className="text-[14px] text-muted-foreground">#policies</h2>
        <h1 className="text-[50px]">Terms of Use</h1>
      </div>
      <p>
        Welcome to Cadogy. By accessing or using our website, you agree to
        comply with and be bound by the following terms and conditions.
      </p>

      <section className="mt-8">
        <h2 className="mb-4 text-2xl font-semibold">Acceptance of Terms</h2>
        <p>
          By using Cadogy, you agree to follow and be bound by these Terms of
          Use, which may be updated by us from time to time without prior
          notice.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-2xl font-semibold">User Responsibilities</h2>
        <p>As a user of Cadogy, you agree not to:</p>
        <ul className="list-disc pl-5">
          <li>Use the site for any illegal or unauthorized purpose.</li>
          <li>
            Engage in any activity that interferes with the performance or
            function of the site.
          </li>
          <li>Submit false or misleading information.</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-2xl font-semibold">Intellectual Property</h2>
        <p>
          All content on Cadogy, including text, graphics, logos, and images, is
          owned by or licensed to Cadogy and is protected by copyright and other
          intellectual property laws.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-2xl font-semibold">Termination of Use</h2>
        <p>
          We reserve the right to suspend or terminate your access to Cadogy at
          any time, without notice, for conduct that we believe violates these
          Terms of Use or is harmful to other users of the site.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-2xl font-semibold">Limitation of Liability</h2>
        <p>
          Cadogy will not be liable for any damages arising from the use or
          inability to use our website, including any direct, indirect,
          incidental, or consequential damages.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-2xl font-semibold">Governing Law</h2>
        <p>
          These Terms of Use are governed by the laws of the jurisdiction in
          which Cadogy operates, without regard to its conflict of law
          principles.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-2xl font-semibold">Contact Us</h2>
        <p>
          If you have any questions about these Terms of Use, please contact us
          at support@cadogy.com.
        </p>
      </section>
    </div>
  )
}

export default TermsOfUse
