"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  ArrowRight,
  BarChart3,
  Code,
  Gauge,
  Lock,
  Users,
  Zap,
} from "lucide-react"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { HeroCarousel } from "@/components/elements/HeroCarousel"
import TextSlideEffect from "@/components/elements/TextSlideEffect"
import { Icons } from "@/components/icons"

// New components
const FeaturedService = ({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
}) => (
  <div className="group flex flex-col rounded-lg bg-neutral-900/50 p-6 transition-all duration-300">
    <div className="mb-4 rounded-full bg-neutral-800 p-3 text-blue-400">
      <Icon className="h-6 w-6" />
    </div>
    <h3 className="mb-2 text-xl font-medium text-slate-100">{title}</h3>
    <p className="text-sm text-slate-200">{description}</p>
  </div>
)

const testimonials = [
  {
    quote:
      "Cadogy's cybersecurity solutions completely transformed how we approach data protection. Their expertise in anti-piracy technology saved us countless hours and resources.",
    author: "Samantha R.",
    position: "CTO, TechVision Solutions",
    image: "/images/testimonials/testimonial-1.jpg",
  },
  {
    quote:
      "Working with Charles and Dylan on our digital rights management system was eye-opening. Their technical knowledge combined with strategic thinking delivered exceptional results.",
    author: "Michael T.",
    position: "Director of Content, MediaStream",
    image: "/images/testimonials/testimonial-2.jpg",
  },
  {
    quote:
      "Their MERN stack expertise helped us completely revamp our platform with modern technologies while maintaining the highest security standards.",
    author: "Alex K.",
    position: "Lead Developer, InnovateTech",
    image: "/images/testimonials/testimonial-3.jpg",
  },
]

// Remove the hardcoded article content since we'll use real MDX content
// Featured articles for the sticky articles section
const realArticles = [
  {
    title:
      "Protecting Companies IP. Lessons from Real-World Anti-Piracy Efforts",
    description:
      "Based on practical experiences in anti-piracy, we explore the realistic steps and technology required to combat digital piracy.",
    date: "September 19th, 2024",
    slug: "/articles/can-piracy-be-stopped",
    coverImage: "/images/posts/crowd-people-walking-street.webp",
  },
  {
    title: "Nvidia's AI Revolution: How GPU Technology Is Changing the Future",
    description:
      "Nvidia's latest advancements in AI chips and GPU technology are setting the stage for a new era in artificial intelligence and machine learning.",
    date: "October 1st, 2024",
    slug: "/articles/nvidia-ai-gpu-revolution-2024-2025",
    coverImage: "/images/posts/jensen_nvidia_ai_processor.jpg",
  },
  {
    title:
      "Can You Train Your Own Large Language Model? It's Easier Than You Think",
    description:
      "Training your own LLM locally is not only feasible but essential for the future of small businesses.",
    date: "September 20th, 2024",
    slug: "/articles/how-to-train-your-own-large-language-model-for-business-ai",
    coverImage: "/images/posts/nvidia-grace-hopper-superchip.jpg",
  },
]

// Remove technical articles since we'll use real articles data

const TechStackItem = ({
  title,
  description,
}: {
  title: string
  description: string
}) => (
  <div className="mb-6">
    <h4 className="mb-2 text-lg font-medium text-slate-100">{title}</h4>
    <p className="text-sm text-slate-200">{description}</p>
  </div>
)

export default function Home() {
  const [isMobile, setIsMobile] = useState(false)

  // Use realArticles data for the carousel slides
  const slides = realArticles.map((article) => ({
    link: article.slug,
    image: article.coverImage,
    altImage: article.coverImage, // Same image as primary for now
    title: article.title,
    description: article.description,
    authorName: article.slug.includes("dylan") ? "Dylan" : "Charles", // Basic author assignment
    authorImage: article.slug.includes("dylan")
      ? "/images/authors/dylan_s_author.jpg"
      : "/images/authors/charles_k_author.jpg",
  }))

  useEffect(() => {
    // Check if the device is mobile by setting a breakpoint for screen width
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768) // Mobile breakpoint at 768px
    }

    handleResize() // Set initial value
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <>
      {/* Hero Section - Full Width */}
      <section className="w-full">
        <HeroCarousel slides={slides} />
      </section>

      {/* Text Slide - Full Width */}
      <section className="w-full bg-background">
        <TextSlideEffect />
      </section>

      {/* Featured Services Section - Boxed */}
      <section className="mx-auto my-24 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-400">
            What We Offer
          </h2>
          <h3 className="text-3xl font-bold text-slate-100">Our Services</h3>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-slate-200">
            We provide cutting-edge solutions in cybersecurity, web development,
            and digital rights management, helping businesses achieve their
            technological goals securely and efficiently.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <FeaturedService
            icon={Lock}
            title="Advanced Cybersecurity"
            description="Comprehensive security solutions including DNS security, encryption methodologies, and system protection against emerging threats."
          />
          <FeaturedService
            icon={Code}
            title="Modern Web Development"
            description="Full-stack development with the MERN stack (MongoDB, Express, React, Node.js) and modern frontend frameworks like Next.js and TailwindCSS."
          />
          <FeaturedService
            icon={Gauge}
            title="Performance Optimization"
            description="Streamlining digital solutions for maximum efficiency, from backend database structures to frontend user experiences."
          />
          <FeaturedService
            icon={Zap}
            title="Anti-Piracy Solutions"
            description="Cutting-edge content protection strategies for digital assets, ensuring your intellectual property remains secure in the digital landscape."
          />
          <FeaturedService
            icon={BarChart3}
            title="Data-Driven Analytics"
            description="Strategic insights through advanced data analysis, helping your business make informed decisions for growth and optimization."
          />
          <FeaturedService
            icon={Users}
            title="Digital Rights Management"
            description="Comprehensive systems for managing digital rights and permissions, protecting creators while enabling authorized access."
          />
        </div>
      </section>

      {/* Expertise Showcase Section - Full Width with Inner Box */}
      <section className="w-full bg-neutral-900/30 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="flex flex-col justify-center">
              <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-400">
                Our Expertise
              </h2>
              <h3 className="mb-6 text-3xl font-bold text-slate-100">
                Technical Proficiency
              </h3>
              <p className="mb-8 text-sm text-slate-200">
                Our team brings extensive experience across a wide range of
                technologies, with particular expertise in cybersecurity, MERN
                stack development, and cutting-edge innovations in AI and
                machine learning integration.
              </p>

              <div className="mt-4 space-y-6">
                <TechStackItem
                  title="Cybersecurity & Anti-Piracy"
                  description="Expertise in implementing advanced DNS security layers, encryption protocols, and custom anti-piracy solutions that protect digital assets while maintaining optimal performance."
                />
                <TechStackItem
                  title="MERN Stack Development"
                  description="Deep knowledge of MongoDB, Express.js, React.js, and Node.js, allowing us to build scalable, maintainable full-stack applications with modern architecture patterns."
                />
                <TechStackItem
                  title="AI & Machine Learning"
                  description="Implementation of AI solutions for enhanced security monitoring, content protection, and business analytics that transform raw data into actionable intelligence."
                />
                <TechStackItem
                  title="Cloud Infrastructure"
                  description="Experience with AWS, Google Cloud Platform, and other cloud providers to create resilient, scalable architectures that meet enterprise-level performance needs."
                />
              </div>

              <div className="mt-8">
                <Link
                  href="/who-we-are"
                  className="group flex items-center text-sm font-semibold text-blue-400"
                >
                  <span className="mr-1">Learn more about our team</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="aspect-square overflow-hidden rounded-lg bg-neutral-900">
                <img
                  src="/images/posts/nvidia-dgx-spark-and-nvidia-dgx-station.jpg"
                  alt="Technology expertise visualization"
                  className="h-full w-full object-cover opacity-90"
                />
              </div>

              {/* Tech stack logos - reduced to 4 well-placed icons */}
              <div className="absolute -right-4 -top-4 rounded-full border border-neutral-800 bg-neutral-900 p-3">
                <img
                  src="/images/assets/stack-logos/nextjs-icon.svg"
                  alt="NextJS"
                  className="h-10 w-10"
                />
              </div>

              <div className="absolute bottom-8 left-16 rounded-full border border-neutral-800 bg-neutral-900 p-3">
                <img
                  src="/images/assets/stack-logos/reactjs-icon.svg"
                  alt="ReactJS"
                  className="h-10 w-10"
                />
              </div>

              <div className="absolute -left-4 top-1/3 rounded-full border border-neutral-800 bg-neutral-900 p-3">
                <img
                  src="/images/assets/stack-logos/mongodb-icon.svg"
                  alt="MongoDB"
                  className="h-10 w-10"
                />
              </div>

              <div className="absolute -right-4 bottom-1/3 rounded-full border border-neutral-800 bg-neutral-900 p-3">
                <img
                  src="/images/assets/stack-logos/tailwindcss-icon.svg"
                  alt="TailwindCSS"
                  className="h-10 w-10"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Section - with Sticky Sidebar */}
      <section className="mx-auto my-24 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-400">
            Knowledge Center
          </h2>
          <h3 className="text-3xl font-bold text-slate-100">
            Featured Articles
          </h3>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-slate-200">
            Explore our latest insights on cybersecurity, web development, and
            technological innovation.
          </p>
        </div>

        <div className="relative flex flex-col gap-10 lg:flex-row">
          {/* Main feature content - Left side */}
          <div className="w-full lg:w-7/12">
            {realArticles.length > 0 ? (
              realArticles.slice(0, 2).map((article, index) => (
                <div
                  key={index}
                  className="mb-16 overflow-hidden rounded-lg bg-neutral-900/50"
                >
                  <Link href={article.slug} className="group block">
                    <div className="aspect-video w-full overflow-hidden">
                      <div
                        className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                        style={{
                          backgroundImage: `url(${article.coverImage})`,
                        }}
                      />
                    </div>
                    <div className="p-6">
                      <p className="mb-2 text-sm text-slate-400">
                        {article.date}
                      </p>
                      <h4 className="mb-3 text-2xl font-medium text-slate-100">
                        {article.title}
                      </h4>
                      <p className="text-sm text-slate-200">
                        {article.description}
                      </p>
                      <div className="mt-4 flex items-center text-blue-400">
                        <span className="text-sm font-medium">Read more</span>
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              // Placeholder when no articles are available
              <div className="flex h-64 items-center justify-center rounded-lg bg-neutral-900/50">
                <p className="text-center text-slate-400">
                  New articles coming soon. Stay tuned!
                </p>
              </div>
            )}
          </div>

          {/* Sticky sidebar - Right side */}
          <div className="relative lg:w-5/12">
            <div className="lg:sticky lg:top-24 lg:pb-24">
              <h4 className="mb-6 text-lg font-medium text-slate-100">
                More Articles
              </h4>
              <div className="space-y-6">
                {realArticles.length > 0 ? (
                  realArticles.map((article, index) => (
                    <div
                      key={index}
                      className="group relative overflow-hidden rounded-lg bg-neutral-900/50"
                    >
                      <Link href={article.slug} className="block">
                        <div className="flex flex-col md:flex-row">
                          {/* Fix the image layout for the sidebar */}
                          <div className="md:w-28 md:flex-shrink-0 md:self-stretch">
                            <div
                              className="relative h-full w-full"
                              style={{ aspectRatio: "1/1" }}
                            >
                              <img
                                src={article.coverImage}
                                alt={article.title}
                                className="h-full w-full object-cover"
                              />
                            </div>
                          </div>
                          <div className="flex flex-1 flex-col justify-center p-4">
                            <p className="mb-1 text-xs text-slate-400">
                              {article.date}
                            </p>
                            <h5 className="line-clamp-2 font-medium text-slate-100">
                              {article.title}
                            </h5>
                            <div className="mt-2 hidden text-xs text-slate-200 md:line-clamp-2">
                              {article.description}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))
                ) : (
                  // Placeholder for sidebar
                  <div className="rounded-lg bg-neutral-900/50 p-6">
                    <p className="text-center text-slate-400">
                      More articles coming soon
                    </p>
                  </div>
                )}
              </div>
              <div className="mt-8">
                <Link
                  href="/articles"
                  className="group flex items-center text-sm font-semibold text-blue-400"
                >
                  <span className="mr-1">View all articles</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Full Width */}
      <section className="w-full bg-neutral-900/30 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-6 text-3xl font-bold text-slate-100 md:text-4xl">
              Ready to Transform Your Digital Presence?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-sm text-slate-200 md:text-base">
              Partner with us to leverage our technical expertise and transform
              your ideas into secure, scalable, and innovative digital
              solutions.
            </p>
            <div className="flex flex-row items-center justify-center space-x-4 space-y-0 sm:space-x-6">
              <Link
                className="group flex w-auto items-center justify-center rounded-sm bg-background/70 px-5 py-3 text-slate-200 transition duration-500 md:bg-background/20 md:hover:bg-background/30 md:hover:backdrop-blur-sm"
                href="/contact-us"
              >
                <span className="text-base font-medium transition duration-500 group-hover:-translate-x-1 sm:text-sm">
                  Get Started
                </span>
                <ArrowRight className="ml-2 h-5 w-5 text-slate-200 transition duration-500 group-hover:translate-x-1 sm:h-4 sm:w-4" />
              </Link>
              <Link
                className="group flex w-auto items-center justify-center rounded-sm border border-neutral-800 bg-transparent px-5 py-3 text-slate-200 transition duration-500 md:hover:bg-background/10 md:hover:backdrop-blur-sm"
                href="/our-charter"
              >
                <span className="text-base font-medium transition duration-500 group-hover:-translate-x-1 sm:text-sm">
                  Learn More
                </span>
                <ArrowRight className="ml-2 h-5 w-5 text-slate-200 transition duration-500 group-hover:translate-x-1 sm:h-4 sm:w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
