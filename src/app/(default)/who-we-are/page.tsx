import { Metadata } from "next"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { Button } from "@/components/ui/button"

// Export metadata for this specific page
export const metadata: Metadata = {
  title: `Who We Are - Cadogy`,
  description:
    "Learn more about our mission, approach, and team at our company.",
  keywords: ["company", "mission", "team", "digital experiences", "innovation"],
  openGraph: {
    title: `Who We Are - Cadogy`,
    description:
      "Discover our team of passionate innovators and learn more about how we shape the future of digital experiences.",
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
      "Meet our team of innovators shaping the future of digital experiences.",
    images: [siteConfig.ogImage],
  },
}

export default function WhoWeAre() {
  return (
    <>
      <header className="mb-20 bg-gradient-to-r from-neutral-800 to-stone-800 py-20 text-center">
        <h1 className="mb-6 text-4xl tracking-tight sm:text-5xl md:text-6xl">
          Shaping the future of digital experiences
        </h1>
        <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
          We&apos;re a team of passionate innovators, dedicated to transforming
          ideas into exceptional digital realities.
        </p>
      </header>

      <div className="container mx-auto px-4 pb-16 sm:px-6 lg:px-8">
        <section className="mb-20">
          <h2 className="mb-6 text-2xl font-semibold">Our Mission</h2>
          <p className="text-md mb-6">
            At the intersection of creativity and technology, we strive to push
            the boundaries of what&apos;s possible. Our mission is to empower
            businesses and individuals with cutting-edge solutions that not only
            meet their needs but exceed their expectations.
          </p>
          <p className="text-md mb-6">
            We believe that great design and powerful functionality should
            coexist seamlessly. That&apos;s why we approach every project with a
            holistic view, ensuring that form and function work in perfect
            harmony.
          </p>
        </section>

        <section className="mb-20">
          <h2 className="mb-6 text-2xl font-semibold">Our Approach</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <h3 className="mb-2 text-lg">Innovation First</h3>
              <p className="text-muted-foreground">
                We constantly explore emerging technologies and methodologies to
                stay ahead of the curve and deliver forward-thinking solutions.
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-lg">User-Centric Design</h3>
              <p className="text-muted-foreground">
                Our designs prioritize user experience, ensuring intuitive
                interfaces that delight and engage users at every touchpoint.
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-lg">Collaborative Process</h3>
              <p className="text-muted-foreground">
                We work closely with our clients, fostering open communication
                and iterative development to achieve the best possible outcomes.
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-lg">Scalable Solutions</h3>
              <p className="text-muted-foreground">
                Our solutions are built to grow with your business, providing
                long-term value and adaptability in an ever-changing digital
                landscape.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="mb-6 text-2xl font-semibold">Our Team</h2>
          <p className="text-md mb-6">
            Behind every successful project is a team of dedicated
            professionals. Our diverse group of experts brings together a wealth
            of experience from various fields, including design, development,
            strategy, and project management.
          </p>
          <p className="text-md mb-6">
            We&apos;re united by our passion for excellence and our commitment
            to delivering exceptional results. Each team member brings a unique
            perspective and skill set, allowing us to tackle complex challenges
            with creativity and precision.
          </p>
        </section>

        <section className="rounded-sm bg-stone-800 p-8 text-center">
          <h2 className="mb-6 text-2xl font-semibold">
            Ready to bring your vision to life?
          </h2>
          <p className="mb-8 text-lg text-muted-foreground">
            Let&apos;s collaborate and create something extraordinary together.
          </p>
          <Button
            asChild
            size="sm"
            variant="default"
            className="rounded-md px-8"
          >
            <Link href="/contact-us">Get in Touch</Link>
          </Button>
        </section>
      </div>
    </>
  )
}
