"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"

interface HeroCarouselProps {
  slides: {
    image: string
    altImage: string
    title: string
    description: string
    link: string
    authorName: string
    authorImage: string
  }[]
}

export function HeroCarousel({ slides }: HeroCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  // Swipe states for mobile only
  const [swipeStart, setSwipeStart] = useState<number | null>(null)
  const [swipeEnd, setSwipeEnd] = useState<number | null>(null)
  const [isSwiping, setIsSwiping] = useState(false)

  // Ref to check screen size for responsiveness
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    // Function to check if screen size is mobile
    const handleResize = () => {
      const containerWidth = containerRef.current?.clientWidth || 0
      setIsMobile(containerWidth < 768) // Sets true if the screen width is less than 768px
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // Add keyboard navigation for A/D keys or arrow keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "d") {
        goToNextSlide()
      } else if (e.key === "ArrowLeft" || e.key === "a") {
        goToPrevSlide()
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  })

  // Configurable layout settings for the carousel
  const mobileSettings = {
    gap: 2, // Gap between slides for mobile as percentage
    mainCardWidth: 86, // Width of the current (main) card for mobile
    visibleNextPrevPercentage: 7, // Amount of next/previous card visible for mobile
  }

  const desktopSettings = {
    gap: 1.25, // Gap between slides for medium+ as percentage
    mainCardWidth: 92, // Width of the current (main) card for medium+
    visibleNextPrevPercentage: 4, // Amount of next/previous card visible for medium+
  }

  const settings = isMobile ? mobileSettings : desktopSettings

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  // Handle swipe start for mobile only
  const handleSwipeStart = (clientX: number) => {
    if (isMobile) {
      setSwipeStart(clientX)
      setIsSwiping(false)
    }
  }

  // Handle swipe move for mobile only
  const handleSwipeMove = (clientX: number) => {
    if (isMobile && swipeStart !== null) {
      const swipeDifference = Math.abs(clientX - swipeStart)
      if (swipeDifference > 10) {
        setIsSwiping(true)
        setSwipeEnd(clientX)
      }
    }
  }

  // Handle swipe end for mobile only
  const handleSwipeEnd = () => {
    if (isMobile && swipeStart !== null && swipeEnd !== null) {
      const swipeDifference = swipeStart - swipeEnd

      // Adjust swipe sensitivity for mobile
      const swipeThreshold = 50

      if (swipeDifference > swipeThreshold) {
        // Swipe left
        goToNextSlide()
      } else if (swipeDifference < -swipeThreshold) {
        // Swipe right
        goToPrevSlide()
      }

      // Reset swipe states
      setSwipeStart(null)
      setSwipeEnd(null)
      setIsSwiping(false)
    }
  }

  // Handle clicks on the previous/next card
  const handleCardClick = (index: number) => {
    if (index !== currentSlide) {
      setCurrentSlide(index)
    }
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden md:h-auto"
    >
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          // Calculating the transformation dynamically based on the settings
          transform: `translateX(calc(-${currentSlide * (settings.mainCardWidth + settings.gap)}% + ${settings.visibleNextPrevPercentage}%))`,
          gap: `${settings.gap}%`, // Dynamic gap between cards
        }}
      >
        {slides.map((slide, index) => {
          const isNextSlide = index === (currentSlide + 1) % slides.length
          const isPrevSlide =
            index === (currentSlide - 1 + slides.length) % slides.length

          return (
            <div
              key={index}
              className={cn(
                "relative h-[620px] flex-shrink-0 select-none transition-transform duration-700 md:h-[735px]",
                isNextSlide || isPrevSlide
                  ? "cursor-pointer transition duration-700 hover:brightness-125"
                  : ""
              )}
              style={{
                width: `${settings.mainCardWidth}%`, // Dynamic width for the main card based on screen size
                backgroundImage: `url(${slide.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "6px",
              }}
              onTouchStart={(e) => handleSwipeStart(e.targetTouches[0].clientX)}
              onTouchMove={(e) => handleSwipeMove(e.targetTouches[0].clientX)}
              onTouchEnd={handleSwipeEnd}
              // Clicks for both mobile and desktop
              onClick={() => handleCardClick(index)}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center rounded-[6px] bg-black/30 p-4 text-white">
                <h2 className="mb-4 text-center text-3xl text-slate-100">
                  {slide.title}
                </h2>
                <p className="hidden max-w-lg text-center text-sm text-slate-200 md:flex">
                  {slide.description}
                </p>
                <Link
                  className="group mt-8 flex items-center rounded-sm bg-background/70 px-4 py-2 text-slate-200 transition duration-500 md:bg-background/20 md:hover:bg-background/30 md:hover:backdrop-blur-sm"
                  href={slide.link}
                >
                  <span className="transition duration-500 group-hover:-translate-x-1">
                    Read More
                  </span>
                  <ArrowRight className="ml-1 h-4 w-4 text-slate-200 transition duration-500 group-hover:translate-x-1 " />
                </Link>
              </div>
            </div>
          )
        })}
      </div>

      {/* Rectangle Navigation */}
      <div className="mt-3 flex justify-center space-x-2">
        {slides.map((_, index) => (
          <div
            key={index}
            className={cn(
              "h-1 w-8 bg-white transition-opacity duration-300 hover:cursor-pointer",
              currentSlide === index ? "opacity-100" : "opacity-30"
            )}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  )
}
