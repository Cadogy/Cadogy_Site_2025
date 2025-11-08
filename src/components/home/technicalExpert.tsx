import { useEffect, useState } from "react"

import GoodAtSection from "./techExpert/GoodAtSection"
import ImpactSection from "./techExpert/ImpactSection"

const TechnicalExpert = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <div className="space-y-16">
      <GoodAtSection />
      <ImpactSection />
    </div>
  )
}

export default TechnicalExpert
