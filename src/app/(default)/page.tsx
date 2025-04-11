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
import ApiSection from "@/components/home/apiSection"
import TechnicalExpert from "@/components/home/technicalExpert"
import WebInfastructure from "@/components/home/webInfastructure"
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
      {/* Hero Section */}
      <section className="w-full">
        <HeroCarousel />
      </section>

      {/* Text Slide */}
      <section className="w-full bg-background mb-24">
        <TextSlideEffect />
      </section>

      {/* Main Content Sections - Added consistent padding and spacing */}
      <div className="mx-auto max-w-[94%] px-4 md:max-w-[90%] lg:px-8 pb-24">
        {/* Technical Expertise Section */}
        <section className="mb-32">
          <TechnicalExpert />
        </section>

        {/* Web Infrastructure & SEO Expertise Section */}
        <section className="mb-16">
          <WebInfastructure />
        </section>

        {/* Learn More Link */}
        <div className="flex justify-center pt-8">
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