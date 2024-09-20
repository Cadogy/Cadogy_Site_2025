"use client"

import React, { useEffect, useRef, useState } from "react"

const TextSlideEffect = () => {
  const [hasScrolled, setHasScrolled] = useState(false) // For blur-in effect
  const [fontSize, setFontSize] = useState("1rem")
  const baseSpeed = 1
  const maxSpeed = 10
  const textRef = useRef<HTMLDivElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const positionRef = useRef(0)
  const speedRef = useRef(baseSpeed)
  const targetSpeedRef = useRef(baseSpeed)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Infinite scrolling effect (starts automatically)
  useEffect(() => {
    let animationFrameId: number

    const animateText = () => {
      const textElement = textRef.current
      const containerElement = containerRef.current

      if (textElement && containerElement) {
        const textWidth = textElement.scrollWidth / 2 // Half the width to account for duplication
        const containerWidth = containerElement.offsetWidth // Width of the container

        // Smoothly update speed towards the target speed
        speedRef.current += (targetSpeedRef.current - speedRef.current) * 0.05

        // Update the position continuously using current speed
        positionRef.current -= speedRef.current

        // If the entire first text has scrolled out of view, reset the position for the loop
        if (positionRef.current <= -textWidth) {
          positionRef.current = 0 // Reset position to the beginning for seamless looping
        }

        // Apply the position to the text element
        textElement.style.transform = `translateX(${positionRef.current}px)`
      }

      // Loop the animation using requestAnimationFrame
      animationFrameId = requestAnimationFrame(animateText)
    }

    // Set initial position to 0.3 * containerWidth for all devices
    const setInitialPosition = () => {
      const textElement = textRef.current
      const containerElement = containerRef.current
      if (textElement && containerElement) {
        const containerWidth = containerElement.offsetWidth

        // Set the initial position to 0.3 * containerWidth for all devices
        positionRef.current = containerWidth * 0.2

        // Apply the position to the text
        textElement.style.transform = `translateX(${positionRef.current}px)`
      }
    }

    setInitialPosition()
    animateText()

    // Trigger the blur-in effect after a brief delay
    setHasScrolled(true)

    // Cleanup the animation when the component unmounts
    return () => cancelAnimationFrame(animationFrameId)
  }, [])

  // Adjust font size based on container size and screen width
  useEffect(() => {
    const containerElement = containerRef.current

    const resizeObserver = new ResizeObserver(() => {
      if (containerElement) {
        const containerWidth = containerElement.offsetWidth

        // Check screen size for tablets and smaller devices
        const isTabletOrSmaller =
          window.matchMedia("(max-width: 768px)").matches

        // Use different scale factors based on screen size
        const scaleFactor = isTabletOrSmaller
          ? containerWidth / 125
          : containerWidth / 250

        // Adjust font size based on container width and scale factor
        const newFontSize = `calc(1rem * ${scaleFactor})`
        setFontSize(newFontSize)
      }
    })

    if (containerElement) {
      resizeObserver.observe(containerElement)
    }

    // Cleanup observer when component unmounts
    return () => {
      if (containerElement) {
        resizeObserver.unobserve(containerElement)
      }
    }
  }, [])

  // Handle scroll/swipe events to adjust velocity
  useEffect(() => {
    const handleScroll = () => {
      // On scroll, we target maxSpeed but change speed smoothly
      targetSpeedRef.current = maxSpeed

      // Clear any existing timeout to prevent premature deceleration
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }

      // After scrolling stops, gradually return to base speed
      scrollTimeoutRef.current = setTimeout(() => {
        targetSpeedRef.current = baseSpeed // Slowly decrease back to base speed
      }, 100) as unknown as NodeJS.Timeout
    }

    // Listen for both mouse wheel and touch interactions for scrolling speed adjustment
    window.addEventListener("wheel", handleScroll)
    window.addEventListener("touchmove", handleScroll) // Trigger speed change on touch drag

    // Cleanup event listeners when the component unmounts
    return () => {
      window.removeEventListener("wheel", handleScroll)
      window.removeEventListener("touchmove", handleScroll)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [])

  return (
    <div
      className="relative mx-auto max-w-[94%] overflow-hidden py-3 pt-6"
      ref={containerRef}
    >
      {/* Left and Right gradient overlays for the blurry darkness effect */}
      <div
        className="pointer-events-none absolute left-0 top-0 h-full w-[16%] bg-gradient-to-r from-background to-transparent"
        style={{ zIndex: 1 }}
      />
      <div
        className="pointer-events-none absolute right-0 top-0 h-full w-[16%] bg-gradient-to-l from-background to-transparent"
        style={{ zIndex: 1 }}
      />

      <div
        className={`duration-400 relative z-0 flex whitespace-nowrap transition-all ease-out ${
          hasScrolled ? "blur-in" : ""
        }`}
        ref={textRef}
        style={{
          filter: hasScrolled ? "blur(0)" : "blur(10px)",
          opacity: hasScrolled ? 1 : 0,
          transition: "filter 0.2s ease-out, opacity 2s ease-out",
        }}
      >
        <p
          className="px-[1%] font-thin"
          style={{ fontSize, lineHeight: "1.25" }}
        >
          The most powerful technologies are the ones that empower others.
        </p>
        {/* Duplicate the text for seamless scrolling */}
        <p
          className="px-[1%] font-thin"
          style={{ fontSize, lineHeight: "1.25" }}
        >
          The most powerful technologies are the ones that empower others.
        </p>
      </div>
    </div>
  )
}

export default TextSlideEffect
