"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"

import HeroSection from "./HeroSection"
import MissionSection from "./MissionSection"
import TeamSection from "./TeamSection"
import TechStackSection from "./TechStackSection"

const WhoWeAreContent = () => {
  const mainRef = useRef<HTMLDivElement>(null)
  // Unique key to force re-rendering and prevent stale cache issues
  const [mountKey, setMountKey] = useState<string>("")

  // Initialize animations
  useEffect(() => {
    // Generate unique key on component mount
    setMountKey(`who-we-are-${Date.now()}`)

    // Simple GSAP animation for sections
    const sections = document.querySelectorAll(".section")
    const mainElement = mainRef.current

    if (!mainElement || sections.length === 0) return

    // Basic fade in for main container
    gsap.fromTo(
      mainElement,
      { opacity: 0 },
      { opacity: 1, duration: 0.8, ease: "power2.out" }
    )

    // Simple animations for sections
    sections.forEach((section, i) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2 * i,
          ease: "power2.out",
        }
      )
    })
  }, [])

  return (
    <div
      ref={mainRef}
      className="relative overflow-hidden bg-background"
      key={mountKey}
    >
      {/* Decorative gradient overlay */}
      <div className="bg-grid-white/[0.02] pointer-events-none fixed inset-0 bg-[size:60px_60px] opacity-20" />

      {/* Hero Section - Full height with striking visuals */}
      <section className="section relative min-h-screen">
        <HeroSection />
      </section>

      {/* Mission Section - Unique layout with visual elements */}
      <section className="section relative">
        <MissionSection />
      </section>

      {/* Team Section - Clean profile cards with interactions */}
      <section className="section relative bg-gradient-to-b from-background to-background/70">
        <TeamSection />
      </section>

      {/* Tech Stack Section - Interactive grid */}
      <section className="section relative">
        <TechStackSection />
      </section>
    </div>
  )
}

export default WhoWeAreContent
