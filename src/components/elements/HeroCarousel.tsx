"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

import { WP_Post } from "@/types/wordpress"
import { cn } from "@/lib/utils"
import {
  decodeHtml,
  extractExcerpt,
  getAllPosts,
  PLACEHOLDER_IMAGE,
  preventImageCaching,
} from "@/lib/wordpress-api"
import { Button } from "@/components/ui/button"

// Define a WordPress compatible interface for slides
export interface CarouselSlide {
  image: string
  altImage?: string
  title: string
  description: string
  link: string
  authorName?: string
  authorImage?: string
}

interface HeroCarouselProps {
  // Optional custom slides - if not provided, the component will fetch WordPress posts
  slides?: CarouselSlide[]
  maxSlides?: number
}

export function HeroCarousel({
  slides: customSlides,
  maxSlides = 5,
}: HeroCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  // WordPress posts state
  const [posts, setPosts] = useState<WP_Post[]>([])
  const [loading, setLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false) // Track refresh state separately
  const [error, setError] = useState<string | null>(null)

  // Swipe states for mobile only
  const [swipeStart, setSwipeStart] = useState<number | null>(null)
  const [swipeEnd, setSwipeEnd] = useState<number | null>(null)
  const [isSwiping, setIsSwiping] = useState(false)

  // Ref to check screen size for responsiveness
  const containerRef = useRef<HTMLDivElement | null>(null)

  // Fetch WordPress posts if custom slides aren't provided
  useEffect(() => {
    if (customSlides) {
      setLoading(false)
      return
    }

    async function fetchPosts() {
      try {
        // Clear any cached posts first
        setPosts([])
        setLoading(true)

        const fetchedPosts = await getAllPosts()
        setPosts(fetchedPosts)
        setError(null)
      } catch (err) {
        console.error("Error fetching WordPress posts:", err)
        setError("Failed to load articles")
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()

    // Create event listener for refreshing carousel from navbar logo click
    const handleRefreshCarousel = () => {
      // console.log('Refreshing hero carousel slides...')
      setCurrentSlide(0) // Reset to first slide

      // Set refreshing state to true for animation
      setIsRefreshing(true)

      // Fetch new posts
      fetchPosts()

      // Reset refreshing state after a short delay to show animation
      setTimeout(() => {
        setIsRefreshing(false)
      }, 1000)
    }

    // Add event listener
    window.addEventListener("refreshHeroCarousel", handleRefreshCarousel)

    // Cleanup
    return () => {
      window.removeEventListener("refreshHeroCarousel", handleRefreshCarousel)
    }
  }, [customSlides])

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
      const swipeThreshold = isMobile ? 30 : 50

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

  // Convert WordPress posts to slides format
  const getWordPressSlides = (): CarouselSlide[] => {
    return posts.slice(0, maxSlides).map((post) => {
      // Get the featured image URL or use a placeholder
      const image =
        post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
        PLACEHOLDER_IMAGE

      // Get the author information
      const author = post._embedded?.author?.[0] || null
      const authorName = author?.name || "Cadogy Team"
      const authorImage =
        author?.avatar_urls?.["96"] || "/images/avatar-placeholder.jpg"

      return {
        image,
        altImage: decodeHtml(post.title.rendered),
        title: decodeHtml(post.title.rendered),
        description: extractExcerpt(post.excerpt.rendered, 200),
        link: `/articles/${post.slug}`,
        authorName,
        authorImage,
      }
    })
  }

  // Determine which slides to use: custom slides or WordPress posts
  const slides = customSlides || getWordPressSlides()

  // Handle loading and error states
  if (loading) {
    return (
      <div className="relative w-full overflow-hidden md:h-auto">
        {/* Skeleton Loader that precisely matches the actual carousel layout */}
        <div
          className="flex transition-all duration-500 ease-in-out"
          style={{
            transform: `translateX(calc(${settings.visibleNextPrevPercentage}%))`, // Match the initial position of the loaded carousel
            gap: `${settings.gap}%`,
          }}
        >
          {/* Main slide skeleton */}
          <div
            className="relative h-[620px] flex-shrink-0 rounded-lg bg-neutral-900/60 md:h-[735px]"
            style={{
              width: `${settings.mainCardWidth}%`,
            }}
          >
            {/* Content overlay - centered exactly like the actual content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center rounded-lg bg-black/50 p-4">
              {/* Author skeleton */}
              {/* <div className="mb-2 flex items-center justify-center">
                <div className="mr-2 h-5 w-5 animate-pulse rounded-md bg-neutral-800/80 sm:h-6 sm:w-6"></div>
                <div className="h-3 w-20 animate-pulse rounded bg-neutral-800/80"></div>
              </div> */}

              {/* Title skeleton */}
              <div className="mb-4 h-7 w-3/4 animate-pulse rounded-md bg-neutral-800/80 text-center sm:h-8 md:h-10"></div>

              {/* Description skeleton */}
              <div className="mb-4 hidden w-full max-w-lg md:block">
                <div className="mx-auto h-4 w-full animate-pulse rounded bg-neutral-800/80"></div>
                <div className="mx-auto mt-2 h-4 w-5/6 animate-pulse rounded bg-neutral-800/80"></div>
                <div className="mx-auto mt-2 h-4 w-4/6 animate-pulse rounded bg-neutral-800/80"></div>
              </div>

              {/* Button skeleton */}
              <div className="h-8 w-28 animate-pulse rounded-sm bg-neutral-800/80 sm:h-10 sm:w-32"></div>
            </div>

            {/* Shimmer effect */}
            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-neutral-800/20 to-transparent"></div>
          </div>

          {/* Edge of next slide (right) - match the actual next slide visibility */}
          <div
            className="relative h-[620px] flex-shrink-0 rounded-lg bg-neutral-900/40 md:h-[735px]"
            style={{
              width: `${settings.visibleNextPrevPercentage * 2}%`,
            }}
          ></div>
        </div>

        {/* Skeleton pagination indicators - match actual indicator styles */}
        <div className="absolute bottom-2 left-0 right-0 flex justify-center sm:bottom-4">
          <div className="flex space-x-1 rounded-md bg-black/20 px-2 py-1 backdrop-blur-sm sm:space-x-2 sm:px-3 sm:py-1.5">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className={`h-1.5 rounded-full sm:h-2 ${
                  index === 0
                    ? "w-4 animate-pulse bg-white sm:w-6"
                    : "w-1.5 animate-pulse bg-white/60 sm:w-2"
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return <div className="p-8 text-center text-red-400">{error}</div>
  }

  if (slides.length === 0) {
    return (
      <div className="p-8 text-center text-slate-200">
        No articles found. Check back soon!
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className="animate-fadeIn relative w-full overflow-hidden md:h-auto"
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

          // Ensure the image URL has cache busting
          const slideImage = slide.image.includes("wp.cadogy.com")
            ? preventImageCaching(slide.image)
            : slide.image

          return (
            <div
              key={index}
              className={cn(
                "relative h-[620px] flex-shrink-0 select-none transition-transform duration-300 md:h-[735px]",
                isNextSlide || isPrevSlide
                  ? "cursor-pointer transition duration-300 hover:brightness-125"
                  : ""
              )}
              style={{
                width: `${settings.mainCardWidth}%`, // Dynamic width for the main card based on screen size
                backgroundImage: `url(${slideImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "0.5rem",
              }}
              onTouchStart={(e) => handleSwipeStart(e.targetTouches[0].clientX)}
              onTouchMove={(e) => handleSwipeMove(e.targetTouches[0].clientX)}
              onTouchEnd={handleSwipeEnd}
              // Clicks for both mobile and desktop
              onClick={() => handleCardClick(index)}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center rounded-lg bg-black/50 p-4 text-center">
                <div className="flex w-full max-w-3xl flex-col items-center px-3 sm:px-6 md:px-8">
                  {/* Author section with fixed height */}
                  {/* <div className="mb-2 flex h-6 items-center justify-center md:mb-3">
                    {slide.authorName && (
                      <>
                        {slide.authorImage && (
                          <img
                            src={slide.authorImage}
                            alt={slide.authorName}
                            className="mr-2 h-5 w-5 rounded-full sm:h-6 sm:w-6"
                          />
                        )}
                        <span className="text-xs text-slate-300 sm:text-sm">
                          {slide.authorName}
                        </span>
                      </>
                    )}
                  </div> */}

                  {/* Title with fixed height based on screen size - now clickable */}
                  <div className="mb-3 min-h-[2.5rem] sm:mb-2 sm:min-h-[3rem] md:min-h-[3.5rem] lg:min-h-[4rem]">
                    <Link
                      href={slide.link}
                      className="group/title inline-block"
                    >
                      <h2 className="line-clamp-2 text-base font-bold leading-tight text-white transition-colors sm:text-xl md:text-2xl lg:text-3xl">
                        {slide.title}
                      </h2>
                    </Link>
                  </div>

                  {/* Description with fixed height - now visible on mobile */}
                  <div className="mb-3 min-h-[2rem] w-full sm:mb-4 sm:min-h-[4rem]">
                    <p className="mx-auto !line-clamp-2 max-w-lg text-xs leading-tight text-slate-200 sm:!line-clamp-2 sm:text-sm sm:leading-relaxed md:text-base">
                      {slide.description}
                    </p>
                  </div>

                  {/* Button with consistent placement */}
                  <div className="h-10">
                    <Button variant="hero" size="hero" asChild>
                      <Link
                        href={slide.link}
                        className="inline-flex items-center"
                      >
                        <span>Read Article</span>
                        <ArrowRight className="ml-1 h-3 w-3 sm:ml-2 sm:h-4 sm:w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Rectangle Navigation */}
      <div className="absolute bottom-2 left-0 right-0 flex justify-center sm:bottom-4">
        <div className="flex space-x-1 rounded-md bg-black/20 px-2 py-1 backdrop-blur-sm sm:space-x-2 sm:px-3 sm:py-1.5">
          <div className="relative flex space-x-1 sm:space-x-2">
            {slides.map((_, i) => (
              <button
                key={i}
                className="relative h-1.5 sm:h-2"
                style={{
                  width: i === currentSlide ? "1.5rem" : "0.375rem",
                  transition: "width 0.3s ease",
                }}
                onClick={() => setCurrentSlide(i)}
                aria-label={`Go to slide ${i + 1}`}
              >
                {/* Background dot (always visible) */}
                <motion.div className="absolute inset-0 rounded-md bg-white/60 hover:bg-white/80" />

                {/* Animated active dot with layoutId for morphing effect */}
                {i === currentSlide && (
                  <motion.div
                    layoutId="activeDot"
                    className="absolute inset-0 rounded-md bg-white"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
