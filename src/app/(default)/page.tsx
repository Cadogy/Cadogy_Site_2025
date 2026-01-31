"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { HeroCarousel } from "@/components/elements/HeroCarousel"
import TextSlideEffect from "@/components/elements/TextSlideEffect"
import { StatsSection } from "@/components/stats/StatsSection"
import { getStatsData } from "@/lib/stats/utils"
import { ServicesBentoSection } from "@/components/home/ServicesBentoSection"
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

      {/* Stats Section */}
      <StatsSection stats={getStatsData()} />

      {/* Services Bento Section */}
      <ServicesBentoSection />

      {/* Main Content Sections - Added consistent padding and spacing */}
      <div className="mx-auto max-w-[94%] px-4 md:max-w-[90%] lg:px-8">
        {/* Technical Expertise Section */}
        <section className="">
          <TechnicalExpert />
        </section>

        {/* Web Infrastructure & SEO Expertise Section */}
        {/* <section className="">
          <WebInfastructure />
        </section> */}
      </div>
    </div>
  )
}
