import React from "react"
import { Metadata } from "next"

import { siteConfig } from "@/config/site"
import { Button } from "@/components/ui/button"

// Export metadata for the "Contact Us" page
export const metadata: Metadata = {
  title: `Contact Us`,
  description: "Get in touch with us to discuss your project or any inquiries.",
  keywords: ["contact", "support", "inquiries", "business", "project"],
  openGraph: {
    title: `Contact Us`,
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
    title: `Contact Us`,
    description:
      "Have questions? Contact us for support, project discussions, or general inquiries.",
    images: [siteConfig.ogImage],
  },
}

const ContactPage = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      {/* Hero Section with Contact Form, 1/2 1/2 on Desktop */}
      <section className="relative flex h-screen w-full flex-col md:flex-row">
        {/* Image Background on the Left */}
        <div
          className="relative h-1/2 w-full bg-cover bg-center md:h-full md:w-1/2"
          style={{
            backgroundImage: `url('/images/posts/crowd-people-walking-street.webp')`,
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Contact Form on the Right */}
        <div className="relative z-10 flex h-full w-full flex-col items-center justify-center bg-background px-6 py-16 md:w-1/2">
          <h1 className="mb-4 text-center text-4xl font-bold text-white sm:text-5xl">
            Get In Touch
          </h1>
          <p className="text-md mb-8 max-w-xl text-center text-slate-200">
            Have a question or want to work together? We'd love to hear from
            you.
          </p>

          {/* Contact Form */}
          <div className="w-full max-w-lg rounded-lg bg-background p-6 shadow-lg">
            <form>
              <div className="mb-4">
                <label
                  className="mb-2 block text-sm font-bold text-gray-700"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Your Name"
                  className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                />
              </div>
              <div className="mb-4">
                <label
                  className="mb-2 block text-sm font-bold text-gray-700"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Your Email"
                  className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                />
              </div>
              <div className="mb-6">
                <label
                  className="mb-2 block text-sm font-bold text-gray-700"
                  htmlFor="message"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  placeholder="Your Message"
                  className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                />
              </div>
              <div className="flex items-center justify-between">
                <Button
                  variant="default"
                  className="focus:shadow-outline rounded px-4 py-2 focus:outline-none"
                  type="submit"
                >
                  Send Message
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Map and Contact Information Section */}
      <section className="w-full bg-background py-16">
        <div className="mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row">
            {/* Google Map */}
            <div className="mb-12 lg:mb-0 lg:w-1/2 lg:pr-8">
              <iframe
                className="h-80 w-full rounded-lg"
                src={`https://www.google.com/maps/embed/v1/place?q=Fort+Lauderdale,+FL&key=${process.env.MAPS_API_KEY}`}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>

            {/* Contact Information */}
            <div className="flex flex-col justify-center lg:w-1/2">
              <p className="mb-4 text-lg text-gray-600">
                Email:{" "}
                <a href="mailto:contact@cadogy.com" className="text-gray-500">
                  contact@cadogy.com
                </a>
              </p>
              <p className="mb-4 text-lg text-gray-600">
                Phone:{" "}
                <a href="tel:+18279108112" className="text-gray-500">
                  +1 (827) 910-8112
                </a>
              </p>
              <p className="text-lg text-gray-600">
                <strong>Hours of Operation:</strong>
                <br />
                Monday - Friday: 9:00 AM - 6:00 PM
                <br />
                Saturday: 10:00 AM - 2:00 PM
                <br />
                Sunday: Closed
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ContactPage
