"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

const GeminiScan = () => {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!gridRef.current) return

    const dots = gridRef.current.querySelectorAll(".gemini-dot")

    // GSAP pulse animation (staggered)
    gsap.to(dots, {
      opacity: 0.1,
      duration: 1,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
      stagger: {
        each: 0.05,
        from: "center",
      },
    })
  }, [])

  return (
    <div
      ref={gridRef}
      className="grid-cols-20 pointer-events-none absolute inset-0 z-50 grid grid-rows-12 gap-2"
    >
      {Array.from({ length: 240 }).map((_, i) => (
        <span
          key={i}
          className="gemini-dot block h-1.5 w-1.5 rounded-full bg-white opacity-20"
        />
      ))}
      <div className="animate-sweep pointer-events-none absolute inset-0 z-50 bg-gradient-to-br from-transparent via-white/10 to-transparent" />
    </div>
  )
}

export default GeminiScan
