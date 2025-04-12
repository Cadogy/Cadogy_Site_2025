import { useEffect, useState } from "react"

// Import the new components
import GoodAtSection from "./techExpert/GoodAtSection"
import ProjectsSection from "./techExpert/ProjectsSection"

const TechnicalExpert = () => {
  // Fix for window is not defined error
  const [isMounted, setIsMounted] = useState(false)

  // Handle client-side mounting
  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <div className="space-y-16">
      {/* We're Good At Section */}
      <GoodAtSection />

      {/* Projects Section */}
      <ProjectsSection />
    </div>
  )
}

export default TechnicalExpert
