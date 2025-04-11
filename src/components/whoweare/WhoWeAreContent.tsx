"use client"

import { useEffect, useState } from "react"

import CTASection from "./CTASection"
import HeroSection from "./HeroSection"
import MissionSection from "./MissionSection"
import TeamSection from "./TeamSection"
import TechStackSection from "./TechStackSection"

const WhoWeAreContent = () => {
  // Add a unique key to force component re-rendering and prevent stale cache issues
  const [mountKey, setMountKey] = useState<string>("")
  
  useEffect(() => {
    // Generate a unique key on component mount
    setMountKey(`who-we-are-${Date.now()}`)
  }, [])

  return (
    <div className="bg-background" key={mountKey}>
      <HeroSection />
      <MissionSection />
      <TeamSection />
      <TechStackSection />
      {/* <CTASection /> */}
    </div>
  )
}

export default WhoWeAreContent 