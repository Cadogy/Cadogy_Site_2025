"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowRight,
  BarChart3,
  Code,
  ExternalLink,
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

// Modern service card component with subtle animations
const ServiceCard = ({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
}) => (
  <motion.div
    className="group relative flex h-full cursor-default flex-col overflow-hidden rounded-2xl bg-neutral-900/40 p-6 sm:p-8"
    whileHover={{ backgroundColor: "rgba(23, 23, 23, 0.6)" }}
    transition={{ duration: 0.3, ease: "easeInOut" }}
  >
    <motion.div
      className="mb-4 rounded-full bg-neutral-800/70 p-3 text-slate-200 sm:mb-5"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
    </motion.div>
    <h3 className="mb-2 text-lg font-medium text-slate-100 sm:mb-3">{title}</h3>
    <p className="text-sm text-slate-200">{description}</p>
  </motion.div>
)

// Simplified tech stack component with subtle animations
const TechItem = ({ icon, title }: { icon: string; title: string }) => (
  <motion.div
    className="flex flex-col items-center gap-3 rounded-2xl bg-neutral-900/40 p-4 text-center sm:p-5"
    whileHover={{ backgroundColor: "rgba(23, 23, 23, 0.6)" }}
    transition={{ duration: 0.3 }}
  >
    <motion.img
      src={icon}
      alt={title}
      className="h-10 w-10 sm:h-12 sm:w-12"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    />
    <h4 className="text-sm font-medium text-slate-200">{title}</h4>
  </motion.div>
)

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

// Add fadeInUp variants for the CTA section
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
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
    <>
      {/* Hero Section - Full Width */}
      <section className="w-full">
        <HeroCarousel />
      </section>

      {/* Text Slide - Full Width */}
      <section className="w-full bg-background">
        <TextSlideEffect />
      </section>

      {/* Services Section - Modern, Flat Design */}
      <section className="container mx-auto px-4 py-16 sm:py-20 md:py-24">
        <motion.div
          className="mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col items-center text-center">
            <h2 className="mb-4 text-2xl font-bold leading-tight text-slate-100 sm:text-3xl md:text-4xl">
              Our Services
            </h2>
            <p className="mx-auto max-w-2xl text-sm text-slate-200">
              We provide cutting-edge solutions in cybersecurity, web
              development, and digital rights management, helping businesses
              achieve their technological goals securely and efficiently.
            </p>
          </div>
        </motion.div>

        {/* Service cards with staggered animations */}
        <motion.div
          className="mx-auto max-w-6xl"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <motion.div variants={itemVariants}>
              <ServiceCard
                icon={Lock}
                title="Advanced Cybersecurity"
                description="Comprehensive security solutions including DNS security, encryption methodologies, and system protection against emerging threats."
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <ServiceCard
                icon={Code}
                title="Modern Web Development"
                description="Full-stack development with the MERN stack (MongoDB, Express, React, Node.js) and modern frontend frameworks like Next.js and TailwindCSS."
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <ServiceCard
                icon={Gauge}
                title="Performance Optimization"
                description="Streamlining digital solutions for maximum efficiency, from backend database structures to frontend user experiences."
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <ServiceCard
                icon={Zap}
                title="Anti-Piracy Solutions"
                description="Cutting-edge content protection strategies for digital assets, ensuring your intellectual property remains secure in the digital landscape."
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <ServiceCard
                icon={BarChart3}
                title="Data-Driven Analytics"
                description="Strategic insights through advanced data analysis, helping your business make informed decisions for growth and optimization."
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <ServiceCard
                icon={Users}
                title="Digital Rights Management"
                description="Comprehensive systems for managing digital rights and permissions, protecting creators while enabling authorized access."
              />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Technical Expertise Section - Innovative Layout */}
      <section className="relative w-full overflow-hidden py-16 sm:py-20 md:py-24">
        <div className="absolute inset-0 bg-neutral-900/30"></div>
        <div className="container relative mx-auto px-4">
          <motion.div
            className="mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col items-center text-center">
              <h2 className="mb-4 text-2xl font-bold leading-tight text-slate-100 sm:text-3xl md:text-4xl">
                Technical Expertise
              </h2>
              <p className="mx-auto max-w-2xl text-sm text-slate-200">
                Our team brings extensive experience across a wide range of
                technologies, with particular expertise in cybersecurity, modern
                web development, and cutting-edge innovations.
              </p>
            </div>
          </motion.div>

          {/* Expertise Cards - More Visual Approach with Sophisticated Animations */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Left Column - Cybersecurity & Web Dev */}
            <div className="space-y-6">
              <motion.div
                className="rounded-2xl bg-neutral-900/50 p-6 backdrop-blur-sm sm:p-8"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
                whileHover={{ backgroundColor: "rgba(23, 23, 23, 0.7)" }}
              >
                <div className="flex items-center">
                  <motion.div
                    className="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-800/70 sm:h-14 sm:w-14"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Lock className="h-6 w-6 text-slate-200 sm:h-7 sm:w-7" />
                  </motion.div>
                  <h3 className="ml-4 text-lg font-medium text-slate-100 sm:text-xl">
                    Cybersecurity
                  </h3>
                </div>
                <div className="ml-16 mt-4">
                  <p className="mb-3 text-sm text-slate-200">
                    Advanced DNS security, encryption protocols, and intrusion
                    prevention systems that safeguard digital assets.
                  </p>
                  <motion.div
                    className="flex flex-wrap gap-2"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <span className="inline-flex rounded-full bg-neutral-800/70 px-3 py-1 text-xs text-slate-200">
                      Advanced Threat Detection
                    </span>
                    <span className="inline-flex rounded-full bg-neutral-800/70 px-3 py-1 text-xs text-slate-200">
                      Zero-trust Architecture
                    </span>
                    <span className="inline-flex rounded-full bg-neutral-800/70 px-3 py-1 text-xs text-slate-200">
                      Penetration Testing
                    </span>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                className="rounded-2xl bg-neutral-900/50 p-6 backdrop-blur-sm sm:p-8"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{ backgroundColor: "rgba(23, 23, 23, 0.7)" }}
              >
                <div className="flex items-center">
                  <motion.div
                    className="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-800/70 sm:h-14 sm:w-14"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Code className="h-6 w-6 text-slate-200 sm:h-7 sm:w-7" />
                  </motion.div>
                  <h3 className="ml-4 text-lg font-medium text-slate-100 sm:text-xl">
                    Web Development
                  </h3>
                </div>
                <div className="ml-16 mt-4">
                  <p className="mb-3 text-sm text-slate-200">
                    Full-stack development using modern frameworks and libraries
                    for fast, scalable applications.
                  </p>
                  <motion.div
                    className="flex flex-wrap gap-2"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <span className="inline-flex rounded-full bg-neutral-800/70 px-3 py-1 text-xs text-slate-200">
                      React/Next.js
                    </span>
                    <span className="inline-flex rounded-full bg-neutral-800/70 px-3 py-1 text-xs text-slate-200">
                      Node.js Microservices
                    </span>
                    <span className="inline-flex rounded-full bg-neutral-800/70 px-3 py-1 text-xs text-slate-200">
                      Serverless Architecture
                    </span>
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Data & AI */}
            <div className="space-y-6">
              <motion.div
                className="rounded-2xl bg-neutral-900/50 p-6 backdrop-blur-sm sm:p-8"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
                whileHover={{ backgroundColor: "rgba(23, 23, 23, 0.7)" }}
              >
                <div className="flex items-center">
                  <motion.div
                    className="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-800/70 sm:h-14 sm:w-14"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <BarChart3 className="h-6 w-6 text-slate-200 sm:h-7 sm:w-7" />
                  </motion.div>
                  <h3 className="ml-4 text-lg font-medium text-slate-100 sm:text-xl">
                    Data & Analytics
                  </h3>
                </div>
                <div className="ml-16 mt-4">
                  <p className="mb-3 text-sm text-slate-200">
                    Transforming raw data into actionable insights through
                    advanced analytics and visualization.
                  </p>
                  <motion.div
                    className="flex flex-wrap gap-2"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <span className="inline-flex rounded-full bg-neutral-800/70 px-3 py-1 text-xs text-slate-200">
                      Business Intelligence
                    </span>
                    <span className="inline-flex rounded-full bg-neutral-800/70 px-3 py-1 text-xs text-slate-200">
                      Predictive Modeling
                    </span>
                    <span className="inline-flex rounded-full bg-neutral-800/70 px-3 py-1 text-xs text-slate-200">
                      Real-time Dashboards
                    </span>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                className="rounded-2xl bg-neutral-900/50 p-6 backdrop-blur-sm sm:p-8"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{ backgroundColor: "rgba(23, 23, 23, 0.7)" }}
              >
                <div className="flex items-center">
                  <motion.div
                    className="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-800/70 sm:h-14 sm:w-14"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Zap className="h-6 w-6 text-slate-200 sm:h-7 sm:w-7" />
                  </motion.div>
                  <h3 className="ml-4 text-lg font-medium text-slate-100 sm:text-xl">
                    AI Integration
                  </h3>
                </div>
                <div className="ml-16 mt-4">
                  <p className="mb-3 text-sm text-slate-200">
                    Implementing AI solutions to enhance security, automate
                    processes, and provide deeper insights.
                  </p>
                  <motion.div
                    className="flex flex-wrap gap-2"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <span className="inline-flex rounded-full bg-neutral-800/70 px-3 py-1 text-xs text-slate-200">
                      Machine Learning
                    </span>
                    <span className="inline-flex rounded-full bg-neutral-800/70 px-3 py-1 text-xs text-slate-200">
                      Natural Language Processing
                    </span>
                    <span className="inline-flex rounded-full bg-neutral-800/70 px-3 py-1 text-xs text-slate-200">
                      Computer Vision
                    </span>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Tech Stack - With Enhanced Animations */}
          <motion.div
            className="mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="mb-8 text-center text-xl font-medium text-slate-100 sm:text-2xl">
              Technologies We Use
            </h3>
            <motion.div
              className="flex flex-wrap justify-center gap-4 sm:gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div variants={itemVariants}>
                <TechItem
                  icon="/images/assets/stack-logos/nextjs-icon.svg"
                  title="Next.js"
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <TechItem
                  icon="/images/assets/stack-logos/reactjs-icon.svg"
                  title="React"
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <TechItem
                  icon="/images/assets/stack-logos/mongodb-icon.svg"
                  title="MongoDB"
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <TechItem
                  icon="/images/assets/stack-logos/tailwindcss-icon.svg"
                  title="Tailwind"
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <TechItem
                  icon="/images/assets/stack-logos/typescript-icon.svg"
                  title="TypeScript"
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <TechItem
                  icon="/images/assets/stack-logos/nodejs-icon.svg"
                  title="Node.js"
                />
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            className="mt-12 flex justify-center sm:mt-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                href="/who-we-are"
                className="group flex items-center rounded-full bg-neutral-800/70 px-6 py-3 text-sm font-medium text-slate-200 transition-all duration-300"
              >
                <span>Learn more about our team</span>
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 1.5,
                  }}
                >
                  <ArrowRight className="ml-2 h-4 w-4" />
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section - Full Width with Fixed Background */}
      <section className="relative w-full py-16 sm:py-20 md:py-24">
        <div className="absolute inset-0 bg-neutral-900"></div>
        <div className="container relative mx-auto px-4">
          <motion.div
            className="mx-auto max-w-3xl text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-4 text-2xl font-bold text-slate-100 sm:mb-6 sm:text-3xl md:text-4xl">
              Ready to Transform Your Digital Presence?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-sm text-slate-200 sm:mb-10">
              Partner with us to leverage our technical expertise and transform
              your ideas into secure, scalable, and innovative digital
              solutions.
            </p>
            <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-center sm:space-x-6 sm:space-y-0">
              <motion.div variants={fadeInUp}>
                <Button
                  variant="hero"
                  size="hero"
                  className="group flex items-center justify-center rounded-full bg-neutral-800 px-8 py-3 text-sm font-medium text-slate-100 transition-all duration-300"
                  asChild
                >
                  <Link href="/contact-us" className="inline-flex items-center">
                    Request a demo
                    <ArrowRight className="ml-1 h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-0.5" />
                  </Link>
                </Button>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Button
                  variant="hero"
                  size="hero"
                  className="group flex items-center justify-center rounded-full bg-neutral-800/20 px-8 py-3 text-sm font-medium text-slate-200 transition-all duration-300"
                  asChild
                >
                  <Link
                    href="/our-charter"
                    className="inline-flex items-center"
                  >
                    Explore the API
                    <ArrowRight className="ml-1 h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-0.5" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
