"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { HeroCarousel } from "@/components/elements/HeroCarousel"
import TextSlideEffect from "@/components/elements/TextSlideEffect"
import TechnicalExpert from "@/components/home/technicalExpert"
import WebInfastructure from "@/components/home/webInfastructure"

export default function Home() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if the device is mobile by setting a breakpoint for screen width
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
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
      <section className="mb-24 w-full bg-background">
        <TextSlideEffect />
      </section>

      {/* Main Content Sections - Added consistent padding and spacing */}
      <div className="mx-auto max-w-[94%] px-4 pb-24 md:max-w-[90%] lg:px-8">
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
