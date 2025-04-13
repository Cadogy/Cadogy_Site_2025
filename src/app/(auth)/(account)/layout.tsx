"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import gsap from "gsap"

import { PageTransition } from "@/components/elements/PageTransition"

export default function AuthAccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const gridRef = useRef<HTMLDivElement>(null)
  const mouseTrailRef = useRef<HTMLDivElement>(null)
  const activeSquaresRef = useRef<Map<string, gsap.core.Tween>>(new Map())
  const mousePositionRef = useRef({ x: 0, y: 0 })
  const frameRef = useRef<number>()
  const lastFrameTimeRef = useRef<number>(0)
  const isMovingRef = useRef(false)
  const mouseMoveTimerRef = useRef<NodeJS.Timeout>()
  const animationStoppedRef = useRef(false)

  useEffect(() => {
    if (!gridRef.current || !mouseTrailRef.current) return

    const mouseTrailElement = mouseTrailRef.current

    // Color theme configuration
    const colorThemes = {
      blue: {
        getColor: (hue: number, intensity: number) =>
          `hsla(210, 100%, 70%, ${intensity * 0.7})`,
        getBorderColor: (hue: number, intensity: number) =>
          `hsla(220, 100%, 80%, ${intensity * 0.75})`,
        getGlowColor: (hue: number, intensity: number) =>
          `hsla(200, 100%, 60%, ${intensity * 0.6})`,
      },
      rainbow: {
        getColor: (hue: number, intensity: number) =>
          `hsla(${hue}, 100%, 70%, ${intensity * 0.7})`,
        getBorderColor: (hue: number, intensity: number) =>
          `hsla(${hue}, 100%, 80%, ${intensity * 0.75})`,
        getGlowColor: (hue: number, intensity: number) =>
          `hsla(${hue}, 100%, 60%, ${intensity * 0.6})`,
      },
      custom: {
        getColor: (hue: number, intensity: number) =>
          `hsla(${hue}, 90%, 60%, ${intensity * 0.7})`,
        getBorderColor: (hue: number, intensity: number) =>
          `hsla(${hue}, 90%, 70%, ${intensity * 0.75})`,
        getGlowColor: (hue: number, intensity: number) =>
          `hsla(${hue}, 90%, 50%, ${intensity * 0.6})`,
      },
    }

    // Set the current theme here to easily switch
    const currentTheme = colorThemes.blue // Change to colorThemes.rainbow or colorThemes.custom to switch

    // Create grid
    const createGridSquares = () => {
      const container = gridRef.current
      if (!container) return

      // Clear any existing squares
      container.innerHTML = ""

      const squareSize = 60 // Increase square size to reduce total number
      const containerWidth = window.innerWidth
      const containerHeight = window.innerHeight

      const cols = Math.ceil(containerWidth / squareSize)
      const rows = Math.ceil(containerHeight / squareSize)

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const square = document.createElement("div")
          square.className =
            "absolute opacity-5 border border-white/30 will-change-transform will-change-opacity"
          square.style.width = `${squareSize}px`
          square.style.height = `${squareSize}px`
          square.style.left = `${x * squareSize}px`
          square.style.top = `${y * squareSize}px`
          square.dataset.x = x.toString()
          square.dataset.y = y.toString()
          container.appendChild(square)
        }
      }
    }

    // Update animations with requestAnimationFrame for better performance
    const updateSquares = (time: number) => {
      // Throttle updates to 30fps for better performance
      if (time - lastFrameTimeRef.current < 33) {
        frameRef.current = requestAnimationFrame(updateSquares)
        return
      }

      lastFrameTimeRef.current = time

      // Get current mouse position
      const mouseX = mousePositionRef.current.x
      const mouseY = mousePositionRef.current.y

      // Always update the mouse trail position, even when not moving
      gsap.to(mouseTrailElement, {
        x: mouseX,
        y: mouseY,
        duration: 0.3,
        ease: "power2.out",
      })

      // Only process new squares if the mouse is moving
      if (isMovingRef.current) {
        animationStoppedRef.current = false

        // Animate squares near cursor
        if (!gridRef.current) {
          frameRef.current = requestAnimationFrame(updateSquares)
          return
        }

        const radius = 300
        const squares = gridRef.current.children
        let activeCount = 0
        const maxActiveSquares = 40 // Limit active animations for performance

        // First, sort squares by distance
        const squaresWithDistance: {
          element: HTMLElement
          distance: number
        }[] = []

        for (let i = 0; i < squares.length; i++) {
          const square = squares[i] as HTMLElement
          const squareX =
            parseInt(square.style.left) + parseInt(square.style.width) / 2
          const squareY =
            parseInt(square.style.top) + parseInt(square.style.height) / 2

          const dx = mouseX - squareX
          const dy = mouseY - squareY
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < radius) {
            squaresWithDistance.push({ element: square, distance })
          }
        }

        // Sort by distance (closest first)
        squaresWithDistance.sort((a, b) => a.distance - b.distance)

        // Process only up to maxActiveSquares
        for (
          let i = 0;
          i < Math.min(squaresWithDistance.length, maxActiveSquares);
          i++
        ) {
          const { element: square, distance } = squaresWithDistance[i]

          // Calculate intensity based on distance (closer = more intense)
          const intensity = 1 - distance / radius

          // Create a unique key for this square
          const key = `${square.dataset.x}-${square.dataset.y}`

          // If already being animated, skip
          if (activeSquaresRef.current.has(key)) continue

          // Choose a color based on position
          const hue =
            (parseInt(square.dataset.x || "0") * 5 +
              parseInt(square.dataset.y || "0") * 5) %
            360
          const color = currentTheme.getColor(hue, intensity)
          const borderColor = currentTheme.getBorderColor(hue, intensity)
          const glowColor = currentTheme.getGlowColor(hue, intensity)

          // Create new animation - with simpler property set for performance
          const tween = gsap.to(square, {
            opacity: 0.9 * intensity,
            backgroundColor: color,
            borderColor: borderColor,
            boxShadow: `0 0 10px ${glowColor}`,
            scale: 1 + 0.1 * intensity, // Less scale for better performance
            duration: 0.2, // Faster for better performance
            onComplete: () => {
              gsap.to(square, {
                opacity: 0,
                backgroundColor: "transparent",
                boxShadow: "none",
                borderColor: "rgba(255, 255, 255, 0.1)",
                scale: 1,
                duration: 0.7, // Faster fade out
                onComplete: () => {
                  activeSquaresRef.current.delete(key)

                  // If this was the last active square and mouse is not moving,
                  // we don't need to continue the animation loop
                  if (
                    activeSquaresRef.current.size === 0 &&
                    !isMovingRef.current
                  ) {
                    return
                  } else if (
                    activeSquaresRef.current.size > 0 &&
                    !frameRef.current
                  ) {
                    // If we still have active squares but no animation frame, restart the loop
                    frameRef.current = requestAnimationFrame(updateSquares)
                  }
                },
              })
            },
          })

          activeSquaresRef.current.set(key, tween)
          activeCount++
        }
      }

      // Always continue the animation loop when mouse is moving
      // Or when we have active squares
      if (isMovingRef.current || activeSquaresRef.current.size > 0) {
        frameRef.current = requestAnimationFrame(updateSquares)
      } else {
        // Mark animation as stopped but don't set frameRef to undefined
        // This way we can check if animation is truly stopped
        animationStoppedRef.current = true
        frameRef.current = undefined
      }
    }

    // Store mouse position with minimal processing
    const handleMouseMove = (e: MouseEvent) => {
      const newX = e.clientX
      const newY = e.clientY

      // Always update position
      mousePositionRef.current = { x: newX, y: newY }

      // Set moving flag to true
      isMovingRef.current = true

      // Clear any existing timer
      if (mouseMoveTimerRef.current) {
        clearTimeout(mouseMoveTimerRef.current)
      }

      // Set a timer to mark as not moving after 100ms of no movement
      mouseMoveTimerRef.current = setTimeout(() => {
        isMovingRef.current = false
      }, 100)

      // If animation loop is not running, start it
      if (!frameRef.current) {
        frameRef.current = requestAnimationFrame(updateSquares)
      }
    }

    // Initialize
    createGridSquares()

    // Force reset animation if mouse is moved after a period of inactivity
    const handleMouseDown = () => {
      if (animationStoppedRef.current) {
        // Force animation to restart if it was stopped
        isMovingRef.current = true
        frameRef.current = requestAnimationFrame(updateSquares)

        // Reset the stop timer
        if (mouseMoveTimerRef.current) {
          clearTimeout(mouseMoveTimerRef.current)
        }

        mouseMoveTimerRef.current = setTimeout(() => {
          isMovingRef.current = false
        }, 100)
      }
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    window.addEventListener("mousedown", handleMouseDown, { passive: true })
    window.addEventListener("resize", createGridSquares)

    // Start animation loop
    frameRef.current = requestAnimationFrame(updateSquares)

    return () => {
      // Clean up
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("resize", createGridSquares)

      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }

      if (mouseMoveTimerRef.current) {
        clearTimeout(mouseMoveTimerRef.current)
      }

      // Cleanup animations
      activeSquaresRef.current.forEach((tween) => tween.kill())
      activeSquaresRef.current.clear()
    }
  }, [])

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background">
      {/* Interactive grid pattern */}
      <div ref={gridRef} className="absolute inset-0 z-0 overflow-hidden"></div>

      {/* Mouse trail element */}
      <div
        ref={mouseTrailRef}
        className="pointer-events-none absolute z-0 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-blue-600/5 to-purple-600/5 opacity-0 blur-xl"
      ></div>

      {/* Animated gradient orbs */}
      <div className="animate-blob absolute -left-40 -top-40 h-80 w-80 rounded-full bg-purple-700/20 blur-3xl filter"></div>
      <div className="animate-blob animation-delay-2000 absolute -right-20 top-0 h-72 w-72 rounded-full bg-blue-700/20 blur-3xl filter"></div>
      <div className="animate-blob animation-delay-4000 absolute -bottom-40 left-20 h-72 w-72 rounded-full bg-teal-700/20 blur-3xl filter"></div>

      {/* Main content */}
      <PageTransition>
        <main className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
          {/* Cadogy Shield Logo */}
          <div className="mb-8 flex justify-center">
            <Link href="/">
              <Image
                src="/images/assets/logos/cadogy-shield.svg"
                alt="Cadogy"
                width={60}
                height={60}
                className="h-16 w-auto"
                priority
              />
            </Link>
          </div>

          {children}

          {/* Minimal footer text */}
          <div className="mt-10 text-center text-xs text-white/40">
            © {new Date().getFullYear()} Cadogy. All rights reserved.
          </div>
        </main>
      </PageTransition>
    </div>
  )
}
