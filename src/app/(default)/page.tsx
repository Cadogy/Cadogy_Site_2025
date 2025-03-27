"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowRight,
  BarChart3,
  Brain,
  Cloud,
  Code,
  Gauge,
  Lock,
  Users,
  Zap,
} from "lucide-react"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { HeroCarousel } from "@/components/elements/HeroCarousel"
import TextSlideEffect from "@/components/elements/TextSlideEffect"
import { Icons } from "@/components/icons"

// Animation variants for staggered animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
}

// Define gradients for cards
const gradients = {
  cybersecurity: "bg-gradient-to-r from-blue-600 via-blue-400 to-indigo-400",
  webDev:
    "bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-yellow-500 via-purple-500 to-red-500",
  performance: "bg-gradient-to-bl from-green-400 via-emerald-400 to-teal-400",
  piracy: "bg-gradient-to-tl from-orange-500 via-amber-500 to-yellow-400",
  dataAnalytics:
    "bg-[conic-gradient(at_bottom_left,_var(--tw-gradient-stops))] from-indigo-500 via-purple-500 to-pink-500",
  digitalRights:
    "bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-blue-600 via-purple-600 to-orange-500",
  cloudSolutions: "bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600",
  aiMl: "bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-fuchsia-500 via-purple-600 to-blue-700",
}

// Simplified technology item component without tooltips
interface TechItemProps {
  src: string
  alt: string
  description?: string
}

function TechItem({ src, alt }: TechItemProps) {
  return (
    <div className="group relative flex flex-col items-center justify-center overflow-hidden rounded-lg bg-neutral-900/40 p-4 text-center transition-all duration-300">
      <div className="relative z-10 flex flex-col items-center">
        <img src={src} alt={alt} className="mb-3 h-12 w-12" />
        <span className="text-sm text-slate-300">{alt}</span>
      </div>

      {/* Hover indicator - subtle highlight effect */}
      <div className="absolute inset-0 z-0 bg-blue-500/0 transition-colors duration-300"></div>
    </div>
  )
}

export default function Home() {
  const [isMobile, setIsMobile] = useState(false)

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
    <div className="bg-background">
      {/* Hero Section - Not Modified */}
      <section className="w-full">
        <HeroCarousel />
      </section>

      {/* Text Slide - Not Modified */}
      <section className="w-full bg-background">
        <TextSlideEffect />
      </section>

      {/* Services Section - Redesigned with Gradients */}
      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col items-center py-6 text-center">
            <h2 className="mb-4 text-3xl font-medium tracking-tight text-slate-100 sm:text-4xl lg:text-5xl">
              Our Services
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-slate-400 sm:text-xl">
              We provide cutting-edge solutions in cybersecurity, web
              development, and digital rights management, helping businesses
              achieve their technological goals securely and efficiently.
            </p>
          </div>
        </motion.div>

        {/* Service Cards Grid - Using Gradient Cards */}
        <motion.div
          className="grid grid-cols-2 gap-4 gap-y-6 sm:gap-6 md:grid-cols-3 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Card 1 - Cybersecurity */}
          <motion.div variants={itemVariants}>
            <div
              className={`group relative aspect-square overflow-hidden rounded-lg ${gradients.cybersecurity} p-4 transition-all duration-300 sm:p-6`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-background/5 to-background/20" />
              <div className="relative z-10 flex h-full flex-col">
                <Lock
                  className="mb-2 h-5 w-5 text-white/90 sm:mb-0 sm:h-8 sm:w-8"
                  strokeWidth={1.5}
                />
                <div className="mt-auto">
                  <h4 className="text-sm font-medium text-white sm:text-lg">
                    Advanced Cybersecurity
                  </h4>
                  <p className="mt-1 line-clamp-3 text-xs text-white/80 sm:mt-2 sm:line-clamp-none sm:text-sm">
                    Comprehensive security solutions including DNS security,
                    encryption and system protection.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 2 - Web Development */}
          <motion.div variants={itemVariants}>
            <div
              className={`group relative aspect-square overflow-hidden rounded-lg ${gradients.webDev} p-4 transition-all duration-300 sm:p-6`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-background/5 to-background/20" />
              <div className="relative z-10 flex h-full flex-col">
                <Code
                  className="mb-2 h-5 w-5 text-white/90 sm:mb-0 sm:h-8 sm:w-8"
                  strokeWidth={1.5}
                />
                <div className="mt-auto">
                  <h4 className="text-sm font-medium text-white sm:text-lg">
                    Modern Web Development
                  </h4>
                  <p className="mt-1 line-clamp-3 text-xs text-white/80 sm:mt-2 sm:line-clamp-none sm:text-sm">
                    Full-stack development with modern frameworks like Next.js
                    and TailwindCSS.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 3 - Performance */}
          <motion.div variants={itemVariants}>
            <div
              className={`group relative aspect-square overflow-hidden rounded-lg ${gradients.performance} p-4 transition-all duration-300 sm:p-6`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-background/5 to-background/20" />
              <div className="relative z-10 flex h-full flex-col">
                <Gauge
                  className="mb-2 h-5 w-5 text-white/90 sm:mb-0 sm:h-8 sm:w-8"
                  strokeWidth={1.5}
                />
                <div className="mt-auto">
                  <h4 className="text-sm font-medium text-white sm:text-lg">
                    Performance Optimization
                  </h4>
                  <p className="mt-1 line-clamp-3 text-xs text-white/80 sm:mt-2 sm:line-clamp-none sm:text-sm">
                    Streamlining digital information and solutions for maximum
                    efficiency and performance.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 4 - Anti-Piracy */}
          <motion.div variants={itemVariants}>
            <div
              className={`group relative aspect-square overflow-hidden rounded-lg ${gradients.piracy} p-4 transition-all duration-300 sm:p-6`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-background/5 to-background/20" />
              <div className="relative z-10 flex h-full flex-col">
                <Zap
                  className="mb-2 h-5 w-5 text-white/90 sm:mb-0 sm:h-8 sm:w-8"
                  strokeWidth={1.5}
                />
                <div className="mt-auto">
                  <h4 className="text-sm font-medium text-white sm:text-lg">
                    Security Solutions
                  </h4>
                  <p className="mt-1 line-clamp-3 text-xs text-white/80 sm:mt-2 sm:line-clamp-none sm:text-sm">
                    Cutting-edge content and information protection for digital
                    assets and your website.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 5 - Data Analytics */}
          <motion.div variants={itemVariants}>
            <div
              className={`group relative aspect-square overflow-hidden rounded-lg ${gradients.dataAnalytics} p-4 transition-all duration-300 sm:p-6`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-background/5 to-background/20" />
              <div className="relative z-10 flex h-full flex-col">
                <BarChart3
                  className="mb-2 h-5 w-5 text-white/90 sm:mb-0 sm:h-8 sm:w-8"
                  strokeWidth={1.5}
                />
                <div className="mt-auto">
                  <h4 className="text-sm font-medium text-white sm:text-lg">
                    Data-Driven Analytics
                  </h4>
                  <p className="mt-1 line-clamp-3 text-xs text-white/80 sm:mt-2 sm:line-clamp-none sm:text-sm">
                    Strategic insights through advanced data analysis and
                    artificial intelligence.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 6 - Digital Rights */}
          <motion.div variants={itemVariants}>
            <div
              className={`group relative aspect-square overflow-hidden rounded-lg ${gradients.digitalRights} p-4 transition-all duration-300 sm:p-6`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-background/5 to-background/20" />
              <div className="relative z-10 flex h-full flex-col">
                <Users
                  className="mb-2 h-5 w-5 text-white/90 sm:mb-0 sm:h-8 sm:w-8"
                  strokeWidth={1.5}
                />
                <div className="mt-auto">
                  <h4 className="text-sm font-medium text-white sm:text-lg">
                    Digital Rights Management
                  </h4>
                  <p className="mt-1 line-clamp-3 text-xs text-white/80 sm:mt-2 sm:line-clamp-none sm:text-sm">
                    Systems for managing digital rights and permissions for
                    end-users and administration.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 7 - Cloud Solutions */}
          <motion.div variants={itemVariants}>
            <div
              className={`group relative aspect-square overflow-hidden rounded-lg ${gradients.cloudSolutions} p-4 transition-all duration-300 sm:p-6`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-background/5 to-background/20" />
              <div className="relative z-10 flex h-full flex-col">
                <Cloud
                  className="mb-2 h-5 w-5 text-white/90 sm:mb-0 sm:h-8 sm:w-8"
                  strokeWidth={1.5}
                />
                <div className="mt-auto">
                  <h4 className="text-sm font-medium text-white sm:text-lg">
                    Cloud Infrastructure
                  </h4>
                  <p className="mt-1 line-clamp-3 text-xs text-white/80 sm:mt-2 sm:line-clamp-none sm:text-sm">
                    Scalable and secure cloud server solutions for businesses of
                    all sizes and industries.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 8 - AI & Machine Learning */}
          <motion.div variants={itemVariants}>
            <div
              className={`group relative aspect-square overflow-hidden rounded-lg ${gradients.aiMl} p-4 transition-all duration-300 sm:p-6`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-background/5 to-background/20" />
              <div className="relative z-10 flex h-full flex-col">
                <Brain
                  className="mb-2 h-5 w-5 text-white/90 sm:mb-0 sm:h-8 sm:w-8"
                  strokeWidth={1.5}
                />
                <div className="mt-auto">
                  <h4 className="text-sm font-medium text-white sm:text-lg">
                    AI & Machine Learning
                  </h4>
                  <p className="mt-1 line-clamp-3 text-xs text-white/80 sm:mt-2 sm:line-clamp-none sm:text-sm">
                    Custom AI solutions and machine learning models for advanced
                    data processing.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Technical Expertise Section */}
        <div className="mt-32 space-y-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="py-6 text-center">
              <h2 className="mb-4 text-3xl font-medium tracking-tight text-slate-100 sm:text-4xl lg:text-5xl">
                Technical Expertise
              </h2>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-400 md:mx-auto">
                Our team brings extensive experience across a wide range of
                technologies, with particular expertise in cybersecurity and
                modern web development
              </p>
            </div>
          </motion.div>

          {/* Main Expertise Section with Image */}
          <div className="relative">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
              <div className="relative z-10 text-center md:text-left">
                <h3 className="text-2xl font-medium text-slate-100">
                  Our approach to technology
                </h3>
                <p className="mt-4 text-slate-400">
                  We focus on delivering solutions that combine cutting-edge
                  technology with practical business value. Our expertise spans
                  from advanced cybersecurity and data analytics to modern web
                  development and digital rights management.
                </p>
                <p className="mt-4 text-slate-400">
                  We&apos;re developing sophisticated systems capable of
                  analyzing and understanding visual information with
                  unprecedented accuracy. From asset generation to security
                  applications, our solutions transform raw visual data into
                  actionable insights and products.
                </p>
                <p className="mt-4 text-slate-400">
                  Our development process prioritizes security, performance, and
                  scalability. We build robust systems that protect your data
                  while delivering exceptional user experiences through
                  intuitive interfaces and responsive design.
                </p>
                <p className="mt-4 text-slate-400">
                  Looking ahead, we&apos;re dedicated to pushing the boundaries
                  of what&apos;s possible through continuous learning and
                  innovation. We&apos;re actively exploring the development of
                  more powerful AI models that combine multiple data modalities,
                  enabling systems that can understand context in ways similar
                  to human perception.
                </p>
              </div>
              <div className="relative hidden aspect-square overflow-hidden rounded-lg transition-all duration-500 md:block">
                {/* Image instead of gradient */}
                <img
                  src="/images/cadogy_training_computer_vision_ddetecting_transportation.jpg"
                  alt="Technology expertise"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-background/20 to-background/40" />
              </div>
            </div>
          </div>

          {/* Technologies We Use */}
          <div className="mt-24">
            <h3 className="my-8 text-center text-xl font-medium text-slate-100">
              Technologies We Use
            </h3>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              <TechItem
                src="/images/assets/stack-logos/nextjs-icon.svg"
                alt="Next.js"
              />
              <TechItem
                src="/images/assets/stack-logos/reactjs-icon.svg"
                alt="React"
              />
              <TechItem
                src="/images/assets/stack-logos/mongodb-icon.svg"
                alt="MongoDB"
              />
              <TechItem
                src="/images/assets/stack-logos/tailwindcss-icon.svg"
                alt="Tailwind"
              />
              <TechItem
                src="/images/assets/stack-logos/typescript-icon.svg"
                alt="TypeScript"
              />
              <TechItem
                src="/images/assets/stack-logos/nodejs-icon.svg"
                alt="Node.js"
              />

              {/* Additional technologies - Row 2 */}
              <TechItem
                src="/images/assets/stack-logos/python-icon.svg"
                alt="Python"
              />
              <TechItem
                src="/images/assets/stack-logos/nvidia-icon.svg"
                alt="Nvidia"
              />
              <TechItem
                src="/images/assets/stack-logos/openai-icon.svg"
                alt="OpenAI"
              />
              <TechItem
                src="/images/assets/stack-logos/anthropic-icon.svg"
                alt="Anthropic"
              />
              <TechItem
                src="/images/assets/stack-logos/aws-icon.svg"
                alt="AWS"
              />
              <TechItem src="/images/assets/logos/github.svg" alt="GitHub" />
            </div>
          </div>

          {/* Learn More Link */}
          <div className="flex justify-center py-8">
            <Link
              href="/who-we-are"
              className="group flex items-center space-x-1 rounded-sm border border-neutral-700 bg-neutral-900/40 px-6 py-3 text-sm font-medium text-slate-200 transition-all hover:bg-neutral-800/60"
            >
              <span>Learn more about our team</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
