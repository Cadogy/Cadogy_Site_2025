"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { Search } from "lucide-react"

export default function NoArticlesFound() {
  const containerRef = useRef<HTMLDivElement>(null)
  const searchIconRef = useRef<HTMLDivElement>(null)
  const emptyDocsRef = useRef<HTMLDivElement>(null)
  const docRefs = useRef<(HTMLDivElement | null)[]>([])

  // Reset refs array when component mounts
  useEffect(() => {
    docRefs.current = docRefs.current.slice(0, 3)
  }, [])

  useEffect(() => {
    if (
      !containerRef.current ||
      !searchIconRef.current ||
      !emptyDocsRef.current
    )
      return

    const container = containerRef.current
    const searchIcon = searchIconRef.current
    const emptyDocs = emptyDocsRef.current
    const docElements = docRefs.current.filter(Boolean) as HTMLDivElement[]

    // Create GSAP timeline for the animation - run only once
    const tl = gsap.timeline()

    // Set initial positions
    gsap.set(searchIcon, {
      scale: 1,
      opacity: 0.9,
      transformOrigin: "center center",
    })

    gsap.set(docElements, {
      opacity: 0,
      y: 30,
    })

    // Animate the search icon in a circular motion (faster)
    tl.to(searchIcon, {
      duration: 1.5, // Reduced from 2s to 1.5s
      motionPath: {
        path: [
          { x: 0, y: 0 },
          { x: 30, y: -30 },
          { x: 0, y: -60 },
          { x: -30, y: -30 },
          { x: 0, y: 0 },
          { x: 30, y: 30 },
          { x: 0, y: 60 },
          { x: -30, y: 30 },
          { x: 0, y: 0 },
        ],
        curviness: 1.5,
      },
      ease: "power1.inOut",
    })

      // Search icon pulse (no delay)
      .to(searchIcon, {
        duration: 0.4, // Reduced from 0.5s to 0.4s
        scale: 1.3,
        opacity: 1,
        ease: "power1.out",
      })
      .to(searchIcon, {
        duration: 0.4, // Reduced from 0.5s to 0.4s
        scale: 1,
        ease: "elastic.out(1, 0.3)",
      })

      // Staggered document appearance (start slightly earlier)
      .to(
        docElements,
        {
          duration: 0.6, // Reduced from 0.8s to 0.6s
          opacity: 1,
          y: 0,
          ease: "back.out(1.7)",
          stagger: 0.15, // Reduced from 0.25s to 0.15s
        },
        "-=0.5" // Start earlier (-0.5 instead of -0.4)
      )

      // Small hover effect on search icon
      .to(
        searchIcon,
        {
          y: -3,
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
        },
        "-=0.2"
      ) // Start the hover a bit earlier

    // Add individual floating animations to each document with different timing
    docElements.forEach((doc, index) => {
      gsap.to(doc, {
        y: -4 + index * 1.5, // Different heights for each document
        rotation: (index - 1) * 5 - 2, // Slight rotation adjustment
        duration: 1.8 + index * 0.2, // Different durations
        delay: 0.5 + index * 0.15, // Much shorter delay
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })
    })

    return () => {
      tl.kill()
      docElements.forEach((doc) => {
        gsap.killTweensOf(doc)
      })
    }
  }, [])

  return (
    <div className="flex h-96 flex-col items-center justify-center rounded-lg bg-muted/30 px-4">
      <div
        ref={containerRef}
        className="relative flex h-64 w-full max-w-md flex-col items-center justify-center overflow-hidden"
      >
        <div className="relative flex h-full w-full flex-col items-center">
          {/* Search icon element */}
          <div
            ref={searchIconRef}
            className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 p-3">
              <Search className="h-6 w-6 text-primary" />
            </div>
          </div>

          {/* Empty documents */}
          <div
            ref={emptyDocsRef}
            className="absolute left-0 right-0 top-[65%] flex justify-center space-x-4"
          >
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                ref={(el) => {
                  docRefs.current[i - 1] = el
                }}
                className="h-16 w-12 rounded border-2 border-muted-foreground/20 bg-background/50"
                style={{
                  transform: `rotate(${(i - 2) * 5}deg)`,
                }}
              >
                {/* Document lines */}
                <div className="mt-3 space-y-1.5 px-2">
                  <div className="h-1 w-8 rounded-full bg-muted-foreground/20"></div>
                  <div className="h-1 w-6 rounded-full bg-muted-foreground/20"></div>
                  <div className="h-1 w-7 rounded-full bg-muted-foreground/20"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-2 text-center">
        <p className="text-lg font-medium text-foreground">No articles found</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Try adjusting your search criteria.
        </p>
      </div>
    </div>
  )
}
