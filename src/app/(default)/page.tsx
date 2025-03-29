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
  Check,
  FileText,
  Gauge,
  Image,
  Lock,
  Shield,
  TestTube2,
  Users,
  Zap,
  Server,
} from "lucide-react"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { HeroCarousel } from "@/components/elements/HeroCarousel"
import TextSlideEffect from "@/components/elements/TextSlideEffect"

// Simplified technology item component without tooltips
interface TechItemProps {
  src: string
  alt: string
  description?: string
  index?: number
}

function TechItem({ src, alt, index = 0 }: TechItemProps) {
  // Map index to specific gradient classes
  const getGradientClass = () => {
    switch (index % 12) {
      case 0: return "bg-gradient-to-r from-blue-50 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-800/30";
      case 1: return "bg-gradient-to-r from-purple-50 to-pink-100 dark:from-purple-900/30 dark:to-pink-800/30";
      case 2: return "bg-gradient-to-r from-green-50 to-emerald-100 dark:from-green-900/30 dark:to-emerald-800/30";
      case 3: return "bg-gradient-to-r from-orange-50 to-amber-100 dark:from-orange-900/30 dark:to-amber-800/30";
      case 4: return "bg-gradient-to-r from-sky-50 to-blue-100 dark:from-sky-900/30 dark:to-blue-800/30";
      case 5: return "bg-gradient-to-r from-rose-50 to-red-100 dark:from-rose-900/30 dark:to-red-800/30";
      case 6: return "bg-gradient-to-r from-yellow-50 to-lime-100 dark:from-yellow-900/30 dark:to-lime-800/30";
      case 7: return "bg-gradient-to-r from-fuchsia-50 to-purple-100 dark:from-fuchsia-900/30 dark:to-purple-800/30";
      case 8: return "bg-gradient-to-r from-cyan-50 to-teal-100 dark:from-cyan-900/30 dark:to-teal-800/30";
      case 9: return "bg-gradient-to-r from-pink-50 to-rose-100 dark:from-pink-900/30 dark:to-rose-800/30";
      case 10: return "bg-gradient-to-r from-indigo-50 to-violet-100 dark:from-indigo-900/30 dark:to-violet-800/30";
      case 11: return "bg-gradient-to-r from-emerald-50 to-green-100 dark:from-emerald-900/30 dark:to-green-800/30";
      default: return "bg-gradient-to-r from-blue-50 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-800/30";
    }
  };
  
  return (
    <div className={`group relative flex flex-col items-center justify-center overflow-hidden rounded-lg ${getGradientClass()} p-4 text-center transition-all duration-300 hover:shadow-md dark:border-neutral-800 dark:hover:border-neutral-700`}>
      <div className="relative z-10 flex flex-col items-center">
        <img src={src} alt={alt} className="mb-3 h-12 w-12 dark:invert-[0.85] transition-all" />
        <span className="text-sm text-muted-foreground">{alt}</span>
      </div>
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
      <div className="mx-auto max-w-[94%] px-4 pt-16 sm:px-6 md:max-w-[90%] lg:px-8">

        {/* API Platform Section - Redesigned */}
        <div className="mt-3 md:mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col items-center py-6 text-center">
              <h2 className="mb-4 text-3xl font-medium tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                Our API Platform
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
                Access cutting-edge AI capabilities through our unified API, enabling your applications with powerful tools for media generation, content creation, code generation, and research.
              </p>
            </div>
          </motion.div>

          {/* Redesigned API Features with Interactive Layout */}
          <div className="mt-16 relative">
            {/* API Capabilities Interactive Layout */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-12 relative">
              {/* API Hub Card - Spans full width on mobile, center column on desktop */}
              <motion.div 
                className="col-span-full md:col-span-4 md:col-start-5 md:row-span-2 overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5 backdrop-blur-sm border border-primary/20 shadow-lg shadow-primary/5 rounded-xl z-10 order-1 md:order-2 md:translate-y-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5 }}
              >
                <div className="p-6 md:p-8">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center rounded-full bg-primary/10 p-3 mb-4">
                      <Cloud className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-medium text-foreground">Unified API Access</h3>
                    <p className="mt-2 text-sm text-muted-foreground">One endpoint, multiple AI capabilities</p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex items-center p-2.5 rounded-md bg-background/80">
                      <div className="w-2 h-2 rounded-full bg-green-400 mr-2.5"></div>
                      <span className="text-sm text-foreground">Simple integration</span>
                    </div>
                    <div className="flex items-center p-2.5 rounded-md bg-background/80">
                      <div className="w-2 h-2 rounded-full bg-blue-400 mr-2.5"></div>
                      <span className="text-sm text-foreground">Predictable pricing</span>
                    </div>
                    <div className="flex items-center p-2.5 rounded-md bg-background/80">
                      <div className="w-2 h-2 rounded-full bg-amber-400 mr-2.5"></div>
                      <span className="text-sm text-foreground">Detailed documentation</span>
                    </div>
                    <div className="flex items-center p-2.5 rounded-md bg-background/80">
                      <div className="w-2 h-2 rounded-full bg-purple-400 mr-2.5"></div>
                      <span className="text-sm text-foreground">Reliable uptime</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-border text-center">
                    <div className="text-sm text-muted-foreground mb-2">Ready to get started?</div>
                    <Link
                      href="/the-api"
                      className="inline-flex items-center space-x-1 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90"
                    >
                      <span>Read the overview</span>
                      <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
              
              {/* Left Column Features */}
              <div className="space-y-8 col-span-full md:col-span-4 order-2 md:order-1">
                {/* Media Generation - Top Left */}
                <motion.div 
                  className="overflow-hidden bg-card border border-border rounded-xl relative"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <div className="md:flex md:items-center">
                    <div className="w-full md:w-2/5 h-36 md:h-auto overflow-hidden">
                      <div className="h-full w-full p-4 flex items-center justify-center">
                        <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                          <Image className="h-10 w-10 text-white" />
                        </div>
                      </div>
                    </div>
                    <div className="p-5 md:p-6 w-full md:w-3/5">
                      <h3 className="text-lg font-medium text-foreground">Media Generation</h3>
                      <p className="mt-2 text-sm text-muted-foreground">Create stunning visuals, videos, and audio content with AI.</p>
                      <div className="mt-4">
                        <Link href="/the-api/features" className="text-sm font-medium text-primary hover:underline inline-flex items-center">
                          Learn more
                          <ArrowRight className="ml-1 inline-block h-3 w-3" />
                        </Link>
                      </div>
                    </div>
                  </div>
                  
                  {/* Connecting line (desktop only) */}
                  <div className="hidden md:block absolute top-1/2 -right-4 w-4 h-px bg-border/50"></div>
                </motion.div>
                
                {/* Content Creation - Bottom Left */}
                <motion.div 
                  className="overflow-hidden bg-card border border-border rounded-xl relative"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="md:flex md:items-center">
                    <div className="w-full md:w-2/5 h-36 md:h-auto overflow-hidden">
                      <div className="h-full w-full p-4 flex items-center justify-center">
                        <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                          <FileText className="h-10 w-10 text-white" />
                        </div>
                      </div>
                    </div>
                    <div className="p-5 md:p-6 w-full md:w-3/5">
                      <h3 className="text-lg font-medium text-foreground">Content Creation</h3>
                      <p className="mt-2 text-sm text-muted-foreground">Generate engaging content for blogs, marketing, and more.</p>
                      <div className="mt-4">
                        <Link href="/the-api/features" className="text-sm font-medium text-primary hover:underline inline-flex items-center">
                          Learn more
                          <ArrowRight className="ml-1 inline-block h-3 w-3" />
                        </Link>
                      </div>
                    </div>
                  </div>
                  
                  {/* Connecting line (desktop only) */}
                  <div className="hidden md:block absolute top-1/2 -right-4 w-4 h-px bg-border/50"></div>
                </motion.div>
              </div>
              
              {/* Right Column Features */}
              <div className="space-y-8 col-span-full md:col-span-4 md:col-start-9 order-3">
                {/* Code Generation - Top Right */}
                <motion.div 
                  className="overflow-hidden bg-card border border-border rounded-xl relative"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <div className="md:flex md:items-center md:flex-row-reverse">
                    <div className="w-full md:w-2/5 h-36 md:h-auto overflow-hidden">
                      <div className="h-full w-full p-4 flex items-center justify-center">
                        <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                          <Code className="h-10 w-10 text-white" />
                        </div>
                      </div>
                    </div>
                    <div className="p-5 md:p-6 w-full md:w-3/5">
                      <h3 className="text-lg font-medium text-foreground">Code Generation</h3>
                      <p className="mt-2 text-sm text-muted-foreground">Transform natural language into working code.</p>
                      <div className="mt-4">
                        <Link href="/the-api/features" className="text-sm font-medium text-primary hover:underline inline-flex items-center">
                          Learn more
                          <ArrowRight className="ml-1 inline-block h-3 w-3" />
                        </Link>
                      </div>
                    </div>
                  </div>
                  
                  {/* Connecting line (desktop only) */}
                  <div className="hidden md:block absolute top-1/2 -left-4 w-4 h-px bg-border/50"></div>
                </motion.div>
                
                {/* Research Tools - Bottom Right */}
                <motion.div 
                  className="overflow-hidden bg-card border border-border rounded-xl relative"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <div className="md:flex md:items-center md:flex-row-reverse">
                    <div className="w-full md:w-2/5 h-36 md:h-auto overflow-hidden">
                      <div className="h-full w-full p-4 flex items-center justify-center">
                        <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                          <TestTube2 className="h-10 w-10 text-white" />
                        </div>
                      </div>
                    </div>
                    <div className="p-5 md:p-6 w-full md:w-3/5">
                      <h3 className="text-lg font-medium text-foreground">Research Tools</h3>
                      <p className="mt-2 text-sm text-muted-foreground">Extract insights from data and conduct research.</p>
                      <div className="mt-4">
                        <Link href="/the-api/features" className="text-sm font-medium text-primary hover:underline inline-flex items-center">
                          Learn more
                          <ArrowRight className="ml-1 inline-block h-3 w-3" />
                        </Link>
                      </div>
                    </div>
                  </div>
                  
                  {/* Connecting line (desktop only) */}
                  <div className="hidden md:block absolute top-1/2 -left-4 w-4 h-px bg-border/50"></div>
                </motion.div>
              </div>
            </div>
          </div>

        </div>

        {/* Technical Expertise Section */}
        <div className="mt-32 space-y-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="py-6 text-center">
              <h2 className="mb-4 text-3xl font-medium tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                Technical Expertise
              </h2>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground md:mx-auto">
                Our comprehensive technical knowledge spans cutting-edge frameworks, infrastructure optimization, and AI development
              </p>
            </div>
          </motion.div>

          {/* Expertise Showcase */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Expertise Card 1 - Frontend */}
            <motion.div
              className="rounded-lg bg-card p-6 border-border"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="mb-4 h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 p-3 flex items-center justify-center">
                <Code className="h-6 w-6 text-white" strokeWidth={1.5} />
              </div>
              <h3 className="mb-3 text-xl font-medium text-foreground">Modern Frontend</h3>
              <p className="mb-4 text-muted-foreground">
                We deliver exceptional user experiences using React, Next.js, and TypeScript, with modern styling through TailwindCSS and Radix UI.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="mr-2 mt-1 h-4 w-4 text-green-500" />
                  <span className="text-sm text-muted-foreground">Server and client components</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 mt-1 h-4 w-4 text-green-500" />
                  <span className="text-sm text-muted-foreground">Type-safe development</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 mt-1 h-4 w-4 text-green-500" />
                  <span className="text-sm text-muted-foreground">Responsive design systems</span>
                </li>
              </ul>
            </motion.div>

            {/* Expertise Card 2 - Backend */}
            <motion.div
              className="rounded-lg bg-card p-6 border-border"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="mb-4 h-12 w-12 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 p-3 flex items-center justify-center">
                <Server className="h-6 w-6 text-white" strokeWidth={1.5} />
              </div>
              <h3 className="mb-3 text-xl font-medium text-foreground">Robust Backend</h3>
              <p className="mb-4 text-muted-foreground">
                We architect scalable backend systems using Node.js, Express, and modern database solutions like MongoDB and MariaDB.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="mr-2 mt-1 h-4 w-4 text-green-500" />
                  <span className="text-sm text-muted-foreground">RESTful API design</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 mt-1 h-4 w-4 text-green-500" />
                  <span className="text-sm text-muted-foreground">Advanced data modeling</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 mt-1 h-4 w-4 text-green-500" />
                  <span className="text-sm text-muted-foreground">Real-time data processing</span>
                </li>
              </ul>
            </motion.div>

            {/* Expertise Card 3 - Security */}
            <motion.div
              className="rounded-lg bg-card p-6 border-border"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="mb-4 h-12 w-12 rounded-lg bg-gradient-to-br from-purple-500 to-violet-600 p-3 flex items-center justify-center">
                <Shield className="h-6 w-6 text-white" strokeWidth={1.5} />
              </div>
              <h3 className="mb-3 text-xl font-medium text-foreground">Security Expertise</h3>
              <p className="mb-4 text-muted-foreground">
                We implement industry-leading security practices, from encryption protocols to advanced DNS protection and access control systems.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="mr-2 mt-1 h-4 w-4 text-green-500" />
                  <span className="text-sm text-muted-foreground">DDoS mitigation</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 mt-1 h-4 w-4 text-green-500" />
                  <span className="text-sm text-muted-foreground">Anti-piracy solutions</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 mt-1 h-4 w-4 text-green-500" />
                  <span className="text-sm text-muted-foreground">Zero-trust architecture</span>
                </li>
              </ul>
            </motion.div>

            {/* Expertise Card 4 - AI/ML */}
            <motion.div
              className="rounded-lg bg-card p-6 border-border"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="mb-4 h-12 w-12 rounded-lg bg-gradient-to-br from-orange-500 to-amber-600 p-3 flex items-center justify-center">
                <Brain className="h-6 w-6 text-white" strokeWidth={1.5} />
              </div>
              <h3 className="mb-3 text-xl font-medium text-foreground">AI & Machine Learning</h3>
              <p className="mb-4 text-muted-foreground">
                We develop custom AI models for computer vision, natural language processing, and predictive analytics using Python and specialized frameworks.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="mr-2 mt-1 h-4 w-4 text-green-500" />
                  <span className="text-sm text-muted-foreground">Custom model training</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 mt-1 h-4 w-4 text-green-500" />
                  <span className="text-sm text-muted-foreground">Computer vision systems</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 mt-1 h-4 w-4 text-green-500" />
                  <span className="text-sm text-muted-foreground">Multi-modal AI development</span>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Dedicated Projects Section */}
          <motion.div
            className="mt-16 rounded-xl bg-card/40 p-8 border border-border"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div>
                <div className="mb-4 inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  Featured Project
                </div>
                <h3 className="mb-4 text-2xl font-medium text-foreground">PlayerBay</h3>
                <p className="mb-6 text-muted-foreground">
                  We&apos;re developing PlayerBay, an innovative online marketplace for Fortnite accounts, in-game currencies, and digital assets. Our platform will connect gamers and studios through an easy-to-use SDK API that unifies asset engines to work cross-game, revolutionizing how in-game items are traded.
                </p>
                <div className="mb-6">
                  <div className="inline-flex items-center rounded-md bg-amber-100 dark:bg-amber-900/30 px-2.5 py-0.5 text-xs font-medium text-amber-800 dark:text-amber-400">
                    <Zap className="mr-1 h-3 w-3" />
                    <span>Under Development</span>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">
                    This groundbreaking platform will feature a secure marketplace, cross-game asset integration, and enterprise-grade infrastructure built on our proven technology stack.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">React</span>
                  <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">Node.js</span>
                  <span className="rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">MongoDB</span>
                  <span className="rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">AWS</span>
                  <span className="rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900/30 dark:text-red-400">GraphQL</span>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-64 w-full max-w-md overflow-hidden rounded-lg sm:h-72 md:h-80">
                  <img
                    src="/images/playerbay_demo.png" 
                    alt="PlayerBay gaming marketplace"
                    className="h-full w-full object-cover bg-black/20 dark:bg-white/5 p-2"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/5 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2">
                      <div className="h-2.5 w-2.5 rounded-full bg-amber-500 animate-pulse" />
                      <span className="text-xs font-medium text-white/90">Coming Soon</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Web Infrastructure & SEO Expertise - Replacing Client Success Stories */}
        <div className="mt-32 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col items-center py-6 text-center">
              <h2 className="mb-4 text-3xl font-medium tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                Web Infrastructure & SEO Expertise
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
                We build high-performance, secure websites optimized for search engines, leveraging enterprise-grade infrastructure and advanced optimization techniques
              </p>
            </div>
          </motion.div>

          <div className="mt-12 grid gap-8 grid-cols-1 lg:grid-cols-2">
            {/* Cloudflare Integration */}
            <motion.div 
              className="bg-card overflow-hidden border border-border rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="h-48 overflow-hidden bg-gradient-to-r from-[#F6821F] via-[#F9A838] to-[#FEDB01] flex items-center justify-center">
                <img 
                  src="/images/assets/stack-logos/cloudflare-icon.svg" 
                  alt="Cloudflare" 
                  className="h-24 w-24"
                />
              </div>
              <div className="p-6">
                <h3 className="mb-3 text-xl font-medium text-foreground">Enterprise-Grade Infrastructure</h3>
                <p className="mb-4 text-muted-foreground">
                  We integrate Cloudflare&apos;s advanced security and performance features into every project, providing enterprise-level protection against DDoS attacks, malicious bots, and other threats.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-start">
                    <div className="mr-3 mt-1 h-6 w-6 flex-shrink-0 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                      <Shield className="h-3 w-3 text-orange-500" />
                    </div>
                    <span className="text-sm text-muted-foreground">DDoS protection</span>
                  </div>
                  <div className="flex items-start">
                    <div className="mr-3 mt-1 h-6 w-6 flex-shrink-0 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                      <Zap className="h-3 w-3 text-orange-500" />
                    </div>
                    <span className="text-sm text-muted-foreground">Global CDN</span>
                  </div>
                  <div className="flex items-start">
                    <div className="mr-3 mt-1 h-6 w-6 flex-shrink-0 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                      <Lock className="h-3 w-3 text-orange-500" />
                    </div>
                    <span className="text-sm text-muted-foreground">SSL encryption</span>
                  </div>
                  <div className="flex items-start">
                    <div className="mr-3 mt-1 h-6 w-6 flex-shrink-0 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                      <Gauge className="h-3 w-3 text-orange-500" />
                    </div>
                    <span className="text-sm text-muted-foreground">Edge optimization</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* SEO Optimization */}
            <motion.div 
              className="bg-card overflow-hidden border border-border rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="h-48 overflow-hidden bg-gradient-to-r from-blue-500 via-blue-400 to-cyan-400 flex items-center justify-center">
                <div className="relative h-24 w-24 rounded-full bg-white/20 flex items-center justify-center">
                  <BarChart3 className="h-12 w-12 text-white" strokeWidth={1.5} />
                </div>
              </div>
              <div className="p-6">
                <h3 className="mb-3 text-xl font-medium text-foreground">Advanced SEO Optimization</h3>
                <p className="mb-4 text-muted-foreground">
                  Our comprehensive SEO approach combines technical excellence with content strategy, helping your site rank higher in search results and drive qualified organic traffic.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-start">
                    <div className="mr-3 mt-1 h-6 w-6 flex-shrink-0 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <Code className="h-3 w-3 text-blue-500" />
                    </div>
                    <span className="text-sm text-muted-foreground">Technical SEO</span>
                  </div>
                  <div className="flex items-start">
                    <div className="mr-3 mt-1 h-6 w-6 flex-shrink-0 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <FileText className="h-3 w-3 text-blue-500" />
                    </div>
                    <span className="text-sm text-muted-foreground">Content strategy</span>
                  </div>
                  <div className="flex items-start">
                    <div className="mr-3 mt-1 h-6 w-6 flex-shrink-0 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <ArrowRight className="h-3 w-3 text-blue-500" />
                    </div>
                    <span className="text-sm text-muted-foreground">Conversion optimization</span>
                  </div>
                  <div className="flex items-start">
                    <div className="mr-3 mt-1 h-6 w-6 flex-shrink-0 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <BarChart3 className="h-3 w-3 text-blue-500" />
                    </div>
                    <span className="text-sm text-muted-foreground">Analytics & reporting</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Case Highlight */}
          <motion.div 
            className="mt-12 rounded-xl bg-card p-0 border border-border overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-6 md:p-8">
                <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-4">
                  Our Approach
                </div>
                <h3 className="text-xl font-medium text-foreground mb-4">E-Commerce SEO Transformation</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-start">
                    <div className="mr-3 mt-1 h-6 w-6 flex-shrink-0 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                      <span className="text-xs font-bold text-indigo-500">1</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-foreground">Comprehensive Technical Analysis</h4>
                      <p className="text-xs text-muted-foreground mt-1">We identify critical performance issues including load times, mobile responsiveness, content structure, and schema implementation.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mr-3 mt-1 h-6 w-6 flex-shrink-0 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                      <span className="text-xs font-bold text-indigo-500">2</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-foreground">Infrastructure Optimization</h4>
                      <p className="text-xs text-muted-foreground mt-1">We deploy enterprise-grade CDNs, optimize assets, implement modern loading techniques, and refine database performance.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mr-3 mt-1 h-6 w-6 flex-shrink-0 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                      <span className="text-xs font-bold text-indigo-500">3</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-foreground">Strategic Content Enhancement</h4>
                      <p className="text-xs text-muted-foreground mt-1">We restructure page hierarchies with enhanced schema markup, develop targeted content strategies, and implement advanced internal linking.</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="mr-3 mt-1 h-6 w-6 flex-shrink-0 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                      <span className="text-xs font-bold text-indigo-500">4</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-foreground">Measurable Performance Gains</h4>
                      <p className="text-xs text-muted-foreground mt-1">Our proven methodology consistently achieves first-page rankings for competitive keywords, significant organic traffic growth, and substantial conversion improvements.</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center pt-4 border-t border-border">
                  <div className="flex items-center">
                    <Shield className="h-5 w-5 text-primary mr-2" />
                    <span className="text-sm font-medium text-foreground">Enterprise-Grade Solutions</span>
                  </div>
                  <div className="ml-auto">
                    <Link href="/" className="text-xs font-medium text-primary hover:underline flex items-center">
                      Explore Our SEO Services
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 p-6 md:p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-56 h-56 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-56 h-56 bg-purple-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
                
                <div className="relative z-10 space-y-6">
                  <div className="flex items-end justify-between mb-2">
                    <h4 className="text-sm font-medium text-white/90">Typical Client Results</h4>
                    <div className="flex items-center">
                      <span className="inline-block w-3 h-3 rounded-full bg-green-500 mr-1.5"></span>
                      <span className="text-xs text-white/70">After</span>
                      <span className="inline-block w-3 h-3 rounded-full bg-white/30 ml-3 mr-1.5"></span>
                      <span className="text-xs text-white/70">Before</span>
                    </div>
                  </div>
                  
                  {/* Responsive Chart - Height adjusts based on screen size */}
                  <div className="h-36 sm:h-40 md:h-44 w-full rounded-md bg-white/5 p-3 flex items-end">
                    <div className="flex-1 flex items-end justify-around h-full">
                      {/* Simplified mobile view with fewer bars on small screens */}
                      {[10, 8, 6, 4, 2, 1].map((position) => (
                        <div key={position} className="relative h-full flex flex-col justify-end items-center sm:hidden">
                          {/* Before bar */}
                          <div 
                            className={`w-4 bg-white/30 mx-0.5 ${position === 10 ? 'h-[10%]' : 'h-[2%]'}`}
                          ></div>
                          {/* After bar */}
                          <div 
                            className={`w-4 bg-green-500 mx-0.5 ${position === 1 ? 'h-[90%]' : position < 3 ? 'h-[70%]' : 'h-[5%]'}`}
                          ></div>
                          <span className="text-[10px] text-white/60 mt-1">{position}</span>
                        </div>
                      ))}
                      
                      {/* Full chart for larger screens */}
                      {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((position) => (
                        <div key={`lg-${position}`} className="relative h-full flex-col justify-end items-center hidden sm:flex">
                          {/* Before bar */}
                          <div 
                            className={`w-3 bg-white/30 mx-0.5 ${position === 10 ? 'h-[10%]' : 'h-[2%]'}`}
                          ></div>
                          {/* After bar */}
                          <div 
                            className={`w-3 bg-green-500 mx-0.5 ${position === 1 ? 'h-[90%]' : position < 3 ? 'h-[70%]' : 'h-[5%]'}`}
                          ></div>
                          <span className="text-[10px] text-white/60 mt-1">{position}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Responsive metrics grid - stack on mobile, side by side on larger screens */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Load Time Metric */}
                    <div className="bg-white/5 rounded-md p-3">
                      <p className="text-xs text-white/60 mb-1">Average Page Load Time</p>
                      <div className="flex items-end justify-between">
          <div>
                          <p className="text-sm font-medium text-white/90">Before</p>
                          <p className="text-xl font-bold text-white">4.2s</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-white/90">After</p>
                          <p className="text-xl font-bold text-green-400">0.8s</p>
                        </div>
                        <div className="h-16 w-px bg-white/20 mx-2"></div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-green-400">-81%</p>
                          <p className="text-xs text-white/60">Reduction</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Traffic Growth Metric */}
                    <div className="bg-white/5 rounded-md p-3">
                      <p className="text-xs text-white/60 mb-1">Organic Traffic Growth</p>
                      <div className="flex items-end justify-between">
                        <div>
                          <p className="text-xl font-bold text-white">14K</p>
                          <p className="text-sm font-medium text-white/90">Before</p>
                        </div>
                        <div className="h-16 w-px bg-white/20 mx-2"></div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-green-400">44K</p>
                          <p className="text-sm font-medium text-white/90">After</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* <div className="mt-12 flex justify-center">
            <Link
              href="/"
              className="group inline-flex items-center rounded-md bg-card border border-border px-6 py-3 text-sm font-medium text-foreground transition-all hover:bg-muted"
            >
              <span>Explore our web services</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div> */}
          </div>

          {/* Learn More Link */}
          <div className="flex justify-center py-8">
            <Link
              href="/who-we-are"
              className="group flex items-center space-x-1 rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90"
            >
              <span>Learn more about our team</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

      </div>
    </div>
  )
}
