"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import {
  ArrowRight,
  Code,
  Cpu,
  Database,
  ExternalLink,
  Globe,
  Layers,
  Server,
  Shield,
  Zap,
} from "lucide-react"

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const imageContainerRef = useRef<HTMLDivElement>(null)
  const [shapes, setShapes] = useState<
    Array<{
      id: string
      type: string
      color: string
      icon: string
      size: number
      initialX: number
      initialY: number
      targetX: number
      targetY: number
      rotation: number
      delay: number
    }>
  >([])
  const [animationComplete, setAnimationComplete] = useState(false)

  // Generate shapes positioned behind the featured image
  useEffect(() => {
    if (!sectionRef.current || !imageContainerRef.current) return

    const sectionRect = sectionRef.current.getBoundingClientRect()
    const imageRect = imageContainerRef.current.getBoundingClientRect()

    // Central position of the image
    const centerX = imageRect.left + imageRect.width / 2 - sectionRect.left
    const centerY = imageRect.top + imageRect.height / 2 - sectionRect.top

    // Define content zone to avoid (make elements spawn outside this area)
    const contentZoneWidth = Math.max(imageRect.width + 100, 800) // Main content width plus padding
    const contentZoneHeight = sectionRect.height * 0.7 // Vertical content area to avoid
    const contentLeft = centerX - contentZoneWidth / 2
    const contentRight = centerX + contentZoneWidth / 2
    const contentTop = centerY - contentZoneHeight / 2
    const contentBottom = centerY + contentZoneHeight / 2

    // Shape types with matching icons and colors
    const shapeData = [
      { type: "circle", color: "primary", icon: "code" },
      { type: "rounded", color: "blue", icon: "server" },
      { type: "square", color: "indigo", icon: "globe" },
      { type: "square", color: "purple", icon: "database" },
      { type: "circle", color: "teal", icon: "zap" },
      { type: "rounded", color: "amber", icon: "layers" },
      { type: "rounded", color: "rose", icon: "shield" },
      { type: "square", color: "cyan", icon: "cpu" },
      { type: "circle", color: "primary", icon: "code" },
      { type: "rounded", color: "blue", icon: "server" },
      { type: "circle", color: "indigo", icon: "globe" },
      { type: "square", color: "purple", icon: "database" },
    ]

    // Store positioned shapes to check for collisions
    const positionedShapes: Array<{ x: number; y: number; radius: number }> = []

    // Minimum distance between shapes to ensure good distribution - increased for better spacing
    const minDistanceBetween = 220

    // Create shapes with initial position at the image center and target positions distributed on sides
    const newShapes = shapeData.map((data, index) => {
      // Size varies by shape type with more variation
      const size = 70 + (index % 4) * 20

      // Spawn delay is staggered by index, but also by which side the element appears on
      const delay = 0.05 + index * 0.08

      // Initial position (slightly randomized around center)
      const initialX = centerX + (Math.random() * 20 - 10)
      const initialY = centerY + (Math.random() * 20 - 10)

      // Determine which side this element should go to (alternating left/right/top/bottom)
      // Even distribution around the content rectangle
      let targetX = 0
      let targetY = 0
      let attempts = 0
      let positioned = false

      // Edge padding with more variation
      const padding = 80 + Math.random() * 40

      // Keep trying positions until we find one far enough from existing shapes
      // Increased max attempts to ensure we find a good position
      while (!positioned && attempts < 50) {
        attempts++

        // Determine which region to place this shape - with randomization
        const regionOptions = [0, 1, 2, 3, 4, 5, 6, 7]
        const region =
          regionOptions[Math.floor(Math.random() * regionOptions.length)]

        // Place elements on the edges of the screen, avoiding the content area
        switch (region) {
          // Left side - top and bottom quadrants
          case 0:
            targetX = Math.random() * (contentLeft - padding - size) + padding
            targetY = Math.random() * (contentTop - padding - size) + padding
            break
          case 1:
            targetX = Math.random() * (contentLeft - padding - size) + padding
            targetY =
              Math.random() *
                (sectionRect.height - contentBottom - padding - size) +
              contentBottom +
              padding
            break

          // Right side - top and bottom quadrants
          case 2:
            targetX =
              Math.random() *
                (sectionRect.width - contentRight - padding - size) +
              contentRight +
              padding
            targetY = Math.random() * (contentTop - padding - size) + padding
            break
          case 3:
            targetX =
              Math.random() *
                (sectionRect.width - contentRight - padding - size) +
              contentRight +
              padding
            targetY =
              Math.random() *
                (sectionRect.height - contentBottom - padding - size) +
              contentBottom +
              padding
            break

          // Left side - middle area
          case 4:
            targetX = Math.random() * (contentLeft - padding - size) + padding
            targetY =
              Math.random() * (contentBottom - contentTop - size) + contentTop
            break

          // Right side - middle area
          case 5:
            targetX =
              Math.random() *
                (sectionRect.width - contentRight - padding - size) +
              contentRight +
              padding
            targetY =
              Math.random() * (contentBottom - contentTop - size) + contentTop
            break

          // Top and bottom - center areas (but not overlapping content)
          case 6:
            targetX =
              Math.random() * (contentRight - contentLeft - size) + contentLeft
            targetY = Math.random() * (contentTop - padding - size) + padding
            break
          case 7:
            targetX =
              Math.random() * (contentRight - contentLeft - size) + contentLeft
            targetY =
              Math.random() *
                (sectionRect.height - contentBottom - padding - size) +
              contentBottom +
              padding
            break
        }

        // Ensure values are within safe bounds
        targetX = Math.max(
          padding,
          Math.min(targetX, sectionRect.width - size - padding)
        )
        targetY = Math.max(
          padding,
          Math.min(targetY, sectionRect.height - size - padding)
        )

        // Check for minimum distance from other shapes - strict check here
        let tooClose = false
        for (const shape of positionedShapes) {
          const dx = targetX - shape.x
          const dy = targetY - shape.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          // We want a larger minimum distance during initial placement
          if (distance < minDistanceBetween) {
            tooClose = true
            break
          }
        }

        // Only accept positions that aren't too close to others, unless we've tried too many times
        if (!tooClose) {
          positioned = true
          positionedShapes.push({
            x: targetX,
            y: targetY,
            radius: size / 2,
          })
        } else if (attempts >= 50) {
          // As a fallback, find the position that's furthest from all other shapes
          let bestDistance = 0
          let bestX = targetX
          let bestY = targetY

          // Try 10 random positions and pick the best one
          for (let i = 0; i < 10; i++) {
            const testX =
              Math.random() * (sectionRect.width - 2 * padding) + padding
            const testY =
              Math.random() * (sectionRect.height - 2 * padding) + padding

            // Find minimum distance to any existing shape
            let minDistance = Infinity
            for (const shape of positionedShapes) {
              const dx = testX - shape.x
              const dy = testY - shape.y
              const distance = Math.sqrt(dx * dx + dy * dy)
              minDistance = Math.min(minDistance, distance)
            }

            // If this position is better than our previous best, update it
            if (minDistance > bestDistance) {
              bestDistance = minDistance
              bestX = testX
              bestY = testY
            }
          }

          // Use the best position we found
          targetX = bestX
          targetY = bestY
          positioned = true
          positionedShapes.push({
            x: targetX,
            y: targetY,
            radius: size / 2,
          })
        }
      }

      // Random rotation with much more variety
      const rotation = Math.random() * 360

      return {
        id: `shape-${index}`,
        ...data,
        size,
        initialX,
        initialY,
        targetX,
        targetY,
        rotation,
        delay,
      }
    })

    setShapes(newShapes)
  }, [])

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (!sectionRef.current || !animationComplete) return

      const { width, height } = sectionRef.current.getBoundingClientRect()

      // Update shape positions on resize to keep them within bounds
      setShapes((prev) =>
        prev.map((shape) => {
          // Reposition shapes to remain within bounds
          const padding = 100
          const maxX = width - shape.size - padding
          const maxY = height - shape.size - padding

          const targetX = Math.max(padding, Math.min(shape.targetX, maxX))
          const targetY = Math.max(padding, Math.min(shape.targetY, maxY))

          return { ...shape, targetX, targetY }
        })
      )
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [animationComplete])

  // GSAP animations setup
  useGSAP(() => {
    if (shapes.length === 0) return

    const timeline = gsap.timeline({
      onComplete: () => setAnimationComplete(true),
    })

    // First animate shapes from center to their target positions
    shapes.forEach((shape) => {
      const element = document.getElementById(shape.id)
      if (!element) return

      // Set initial position
      gsap.set(element, {
        x: shape.initialX,
        y: shape.initialY,
        rotation: 0,
        scale: 0.2,
        opacity: 0,
      })

      // Animate to target position with confetti-like effect
      timeline.to(
        element,
        {
          x: shape.targetX,
          y: shape.targetY,
          rotation: shape.rotation,
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          delay: shape.delay,
        },
        0
      )
    })

    // After shapes are positioned, initialize draggable functionality
    timeline.call(() => {
      initDraggable()
    })

    // Function to initialize draggable behavior
    const initDraggable = async () => {
      try {
        const [DraggableModule, InertiaPluginModule] = await Promise.all([
          import("gsap/Draggable"),
          import("gsap/InertiaPlugin"),
        ])

        const Draggable = DraggableModule.default
        const InertiaPlugin = InertiaPluginModule.default

        gsap.registerPlugin(Draggable, InertiaPlugin)

        // Track all draggable elements for collision detection
        const draggableElements: {
          element: HTMLElement
          instance: any
          bounds: DOMRect
        }[] = []

        // Initialize draggable elements
        shapes.forEach((shape) => {
          const element = document.getElementById(shape.id)
          if (!element) return

          // Set up draggable with bounds checking and improved inertia
          const draggable = Draggable.create(element, {
            type: "x,y",
            bounds: sectionRef.current,
            inertia: true,
            edgeResistance: 0.5, // Reduced edge resistance for smoother edge interaction
            throwResistance: 400, // Lower resistance for better inertia feeling
            overshootTolerance: 0.8, // Increased to allow more natural overshooting
            minimumMovement: 1, // Respond to slight movements for better precision
            onClick: function () {
              // Add a bit of playful bounce when clicked
              gsap.to(element, {
                scale: 1.15,
                duration: 0.3,
                ease: "back.out(2)",
                yoyo: true,
                repeat: 1,
              })
            },
            onDragStart: function () {
              // Bring element to front when dragging
              gsap.set(element, { zIndex: 50 })

              gsap.to(element, {
                scale: 1.1,
                boxShadow: "0 15px 35px rgba(0,0,0,0.3)",
                duration: 0.2,
                ease: "power1.out",
              })

              // Pause hover animation during drag
              gsap.killTweensOf(element, "rotation")

              // Add subtle "pickup" effect
              gsap.to(element, {
                y: "-=5",
                duration: 0.2,
                ease: "power2.out",
              })
            },
            onDrag: function () {
              // Add slight rotation based on direction for natural feel
              const direction = this.getDirection
                ? this.getDirection("start").angle
                : 0

              gsap.to(element, {
                rotation: `+=${Math.random() * 3 * (direction > 0 ? 1 : -1)}`,
                duration: 0.1,
                overwrite: true,
              })

              // Check for collisions with other elements
              checkCollisions(element, this)
            },
            onDragEnd: function () {
              gsap.to(element, {
                scale: 1,
                boxShadow: "0 5px 15px rgba(0,0,0,0.15)",
                duration: 0.3,
                ease: "power2.out",
                onComplete: () => {
                  // Restore z-index after animation completes
                  setTimeout(() => {
                    gsap.set(element, { zIndex: 10 })
                  }, 300)

                  // Resume hover animation
                  addHoverAnimation(element, shape)
                },
              })
            },
            onThrowUpdate: function () {
              // Add natural rotation during throw
              gsap.to(element, {
                rotation: `+=${Math.random() * 2}`,
                duration: 0.1,
                overwrite: true,
              })

              // Continue checking for collisions during inertia throw
              checkCollisions(element, this)
            },
            onThrowComplete: function () {
              gsap.to(element, {
                rotation: shape.rotation,
                duration: 1,
                ease: "elastic.out(0.5, 0.3)",
              })
            },
          })

          // Store reference to the draggable element and its instance
          draggableElements.push({
            element,
            instance: draggable[0],
            bounds: element.getBoundingClientRect(),
          })

          // Add subtle hover/idle animation
          addHoverAnimation(element, shape)
        })

        // Function to check for and handle collisions between elements
        function checkCollisions(
          currentElement: HTMLElement,
          dragInstance: any
        ) {
          const currentBounds = currentElement.getBoundingClientRect()

          draggableElements.forEach(({ element, instance, bounds }) => {
            // Skip self-collision
            if (element === currentElement) return

            // Update real-time bounds
            const otherBounds = element.getBoundingClientRect()

            // Calculate center points
            const currentCenterX = currentBounds.left + currentBounds.width / 2
            const currentCenterY = currentBounds.top + currentBounds.height / 2
            const otherCenterX = otherBounds.left + otherBounds.width / 2
            const otherCenterY = otherBounds.top + otherBounds.height / 2

            // Calculate distance between centers
            const dx = currentCenterX - otherCenterX
            const dy = currentCenterY - otherCenterY
            const distance = Math.sqrt(dx * dx + dy * dy)

            // Calculate minimum distance before collision (sum of radii)
            const minDistance =
              ((currentBounds.width + otherBounds.width) / 2) * 0.9 // Increased from 0.8 to reduce overlap

            // Check for collision
            if (distance < minDistance) {
              // Calculate normalized direction vector
              const nx = dx / distance
              const ny = dy / distance

              // Calculate overlap
              const overlap = minDistance - distance

              // Apply repulsion force to both elements
              // We always push the other element a bit, even if it's being dragged
              // This makes interaction feel more physical

              // Get the current positions
              const currentTransform =
                (gsap.getProperty(currentElement, "transform") as string) || ""
              const currentX =
                (gsap.getProperty(currentElement, "x") as number) || 0
              const currentY =
                (gsap.getProperty(currentElement, "y") as number) || 0

              const otherTransform =
                (gsap.getProperty(element, "transform") as string) || ""
              const otherX = (gsap.getProperty(element, "x") as number) || 0
              const otherY = (gsap.getProperty(element, "y") as number) || 0

              // Calculate repulsion amounts - stronger for non-dragged element
              const activeRepulsionForce = 0.3 // Less force for the active element
              const inactiveRepulsionForce = 1.2 // More force for inactive elements

              // Active element gets pushed slightly
              if (dragInstance.isActive) {
                gsap.to(currentElement, {
                  x: currentX + nx * overlap * activeRepulsionForce,
                  y: currentY + ny * overlap * activeRepulsionForce,
                  duration: 0.3,
                  ease: "power1.out",
                })
              }

              // Inactive element gets pushed more
              gsap.to(element, {
                x: otherX - nx * overlap * inactiveRepulsionForce,
                y: otherY - ny * overlap * inactiveRepulsionForce,
                rotation: `+=${Math.random() * 15 - 7.5}`,
                duration: 0.3,
                ease: "back.out(1.5)",
              })

              // Add a little bounce effect
              gsap.to(element, {
                scale: 1.05,
                duration: 0.15,
                yoyo: true,
                repeat: 1,
                ease: "power1.inOut",
              })

              // Make elements wobble slightly after collision
              gsap.to(element, {
                rotation: `+=${Math.random() * 8 - 4}`,
                duration: 0.5,
                ease: "elastic.out(1, 0.3)",
                delay: 0.15,
              })
            }
          })
        }

        // After initializing all elements, make sure none are overlapping
        // This ensures elements are properly spaced even after window resize
        setTimeout(() => {
          // Run multiple passes to resolve all overlaps
          for (let pass = 0; pass < 3; pass++) {
            draggableElements.forEach(({ element: currentElement }, i) => {
              const currentBounds = currentElement.getBoundingClientRect()

              draggableElements.forEach(({ element: otherElement }, j) => {
                // Skip self-comparison
                if (i === j) return

                const otherBounds = otherElement.getBoundingClientRect()

                // Calculate centers and distance
                const currentCenterX =
                  currentBounds.left + currentBounds.width / 2
                const currentCenterY =
                  currentBounds.top + currentBounds.height / 2
                const otherCenterX = otherBounds.left + otherBounds.width / 2
                const otherCenterY = otherBounds.top + otherBounds.height / 2

                const dx = currentCenterX - otherCenterX
                const dy = currentCenterY - otherCenterY
                const distance = Math.sqrt(dx * dx + dy * dy)

                // Minimum acceptable distance
                const minDistance =
                  ((currentBounds.width + otherBounds.width) / 2) * 1.1

                if (distance < minDistance) {
                  // They're too close, move them apart
                  const nx = dx / (distance || 1) // Normalize, avoid division by 0
                  const ny = dy / (distance || 1)

                  const overlap = minDistance - distance
                  const moveAmount = overlap / 2 // Split the movement between the two elements

                  // Get current positions
                  const currentX =
                    (gsap.getProperty(currentElement, "x") as number) || 0
                  const currentY =
                    (gsap.getProperty(currentElement, "y") as number) || 0
                  const otherX =
                    (gsap.getProperty(otherElement, "x") as number) || 0
                  const otherY =
                    (gsap.getProperty(otherElement, "y") as number) || 0

                  // Adjust both elements' positions
                  gsap.set(currentElement, {
                    x: currentX + nx * moveAmount,
                    y: currentY + ny * moveAmount,
                  })

                  gsap.set(otherElement, {
                    x: otherX - nx * moveAmount,
                    y: otherY - ny * moveAmount,
                  })
                }
              })
            })
          }
        }, 1500) // Wait for initial animation to complete
      } catch (error) {
        console.error("Error setting up GSAP animations:", error)
      }
    }

    // Function to add hover and idle animations
    const addHoverAnimation = (element: HTMLElement, shape: any) => {
      // Create hover effect
      element.addEventListener("mouseenter", () => {
        gsap.to(element, {
          scale: 1.08,
          boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
          duration: 0.3,
          ease: "power2.out",
          zIndex: 15, // Bring slightly forward on hover
        })
      })

      element.addEventListener("mouseleave", () => {
        gsap.to(element, {
          scale: 1,
          boxShadow: "0 5px 15px rgba(0,0,0,0.15)",
          duration: 0.3,
          ease: "power2.out",
          zIndex: 10, // Restore z-index
        })
      })

      // More varied continuous subtle animation
      gsap.to(element, {
        y: `+=${10 + Math.random() * 15}`,
        rotation: `${shape.rotation + (Math.random() > 0.5 ? 8 : -8)}`,
        duration: 3 + Math.random() * 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: Math.random() * 2,
      })
    }
  }, [shapes])

  // Helper function to get shape classes and render icon
  const getShapeClasses = (shape: { type: string; color: string }) => {
    // Shape class
    let shapeClass = ""
    switch (shape.type) {
      case "circle":
        shapeClass = "rounded-full"
        break
      case "square":
        shapeClass = "rounded-md"
        break
      case "hexagon":
        shapeClass = "hexagon"
        break
      case "rounded":
        shapeClass = "rounded-2xl"
        break
    }

    // Color classes for gradient
    let bgGradient = ""
    let borderColor = ""
    switch (shape.color) {
      case "primary":
        bgGradient = "bg-gradient-to-br from-primary/20 to-primary/5"
        borderColor = "border-primary/30"
        break
      case "blue":
        bgGradient = "bg-gradient-to-br from-blue-500/20 to-blue-500/5"
        borderColor = "border-blue-500/30"
        break
      case "indigo":
        bgGradient = "bg-gradient-to-br from-indigo-500/20 to-indigo-500/5"
        borderColor = "border-indigo-500/30"
        break
      case "purple":
        bgGradient = "bg-gradient-to-br from-purple-500/20 to-purple-500/5"
        borderColor = "border-purple-500/30"
        break
      case "teal":
        bgGradient = "bg-gradient-to-br from-teal-500/20 to-teal-500/5"
        borderColor = "border-teal-500/30"
        break
      case "amber":
        bgGradient = "bg-gradient-to-br from-amber-500/20 to-amber-500/5"
        borderColor = "border-amber-500/30"
        break
      case "rose":
        bgGradient = "bg-gradient-to-br from-rose-500/20 to-rose-500/5"
        borderColor = "border-rose-500/30"
        break
      case "cyan":
        bgGradient = "bg-gradient-to-br from-cyan-500/20 to-cyan-500/5"
        borderColor = "border-cyan-500/30"
        break
    }

    return { shapeClass, bgGradient, borderColor }
  }

  // Helper function to render icon by name
  const renderIcon = (iconName: string, color: string) => {
    const iconSize = 24
    const iconColor = `text-${color.replace("primary", "primary").replace("500", "600")}`

    switch (iconName) {
      case "code":
        return <Code className={iconColor} size={iconSize} />
      case "server":
        return <Server className={iconColor} size={iconSize} />
      case "globe":
        return <Globe className={iconColor} size={iconSize} />
      case "database":
        return <Database className={iconColor} size={iconSize} />
      case "zap":
        return <Zap className={iconColor} size={iconSize} />
      case "layers":
        return <Layers className={iconColor} size={iconSize} />
      case "shield":
        return <Shield className={iconColor} size={iconSize} />
      case "cpu":
        return <Cpu className={iconColor} size={iconSize} />
      default:
        return null
    }
  }

  return (
    <div
      ref={sectionRef}
      className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-background"
    >
      {/* Draggable elements container */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {shapes.map((shape) => {
          const { shapeClass, bgGradient, borderColor } = getShapeClasses(shape)

          return (
            <div
              key={shape.id}
              id={shape.id}
              className={`draggable-element absolute cursor-grab border-2 active:cursor-grabbing ${shapeClass} ${bgGradient} ${borderColor} flex items-center justify-center shadow-lg backdrop-blur-md will-change-transform`}
              style={{
                width: `${shape.size}px`,
                height: `${shape.size}px`,
                position: "absolute",
                top: 0,
                left: 0,
                transformOrigin: "center center",
              }}
            >
              {renderIcon(shape.icon, shape.color)}
            </div>
          )
        })}
      </div>

      {/* Subtle gradient overlay */}
      <div className="bg-gradient-radial pointer-events-none absolute inset-0 from-transparent to-background/70"></div>

      {/* Main content */}
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] max-w-screen-xl flex-col items-center justify-center px-4 py-12 sm:px-6 md:px-8">
        <div className="mx-auto mb-16 max-w-4xl text-center">
          <span className="mb-4 inline-block rounded-md bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            Technology with Purpose
          </span>

          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="text-primary">Digital experiences</span> that
            transform businesses
          </h1>

          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            We combine technical excellence with creative innovation to build
            solutions that drive growth and deliver exceptional user
            experiences.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90"
            >
              <span>Get started</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/our-work"
              className="group inline-flex items-center justify-center rounded-md border border-border bg-background/50 px-6 py-3 text-sm font-medium text-foreground backdrop-blur-sm transition-all hover:bg-card/50"
            >
              <span>Our work</span>
              <ExternalLink className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-y-[-2px]" />
            </Link>
          </div>
        </div>

        {/* Featured image area - source of the elements */}
        <div
          ref={imageContainerRef}
          className="relative mx-auto w-full max-w-5xl"
        >
          {/* Image container with responsive sizing */}
          <div className="relative z-10 overflow-hidden rounded-lg border border-border/50 shadow-2xl">
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-background/80 via-transparent to-transparent"></div>

            <Image
              src="/images/ui/pb_demo_screen_category.png"
              alt="Digital solutions showcase"
              width={1200}
              height={600}
              className="w-full"
              priority
            />
          </div>

          {/* Stats overlay - desktop only */}
          <div className="absolute -bottom-6 left-1/2 z-20 mx-auto hidden w-full max-w-4xl -translate-x-1/2 transform rounded-lg border border-border/40 bg-card/90 p-6 shadow-xl backdrop-blur-md md:block">
            <div className="grid grid-cols-4 gap-8">
              <div className="text-center">
                <div className="mb-1 text-3xl font-bold text-primary">6+</div>
                <div className="text-sm text-muted-foreground">
                  Years Experience
                </div>
              </div>
              <div className="text-center">
                <div className="mb-1 text-3xl font-bold text-primary">150+</div>
                <div className="text-sm text-muted-foreground">
                  Projects Delivered
                </div>
              </div>
              <div className="text-center">
                <div className="mb-1 text-3xl font-bold text-primary">100%</div>
                <div className="text-sm text-muted-foreground">
                  Client Satisfaction
                </div>
              </div>
              <div className="text-center">
                <div className="mb-1 text-3xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground">
                  Support & Service
                </div>
              </div>
            </div>
          </div>

          {/* Stats for mobile - stacked layout */}
          <div className="mt-12 rounded-lg border border-border/40 bg-card/90 p-6 shadow-xl backdrop-blur-md md:hidden">
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="mb-1 text-2xl font-bold text-primary">6+</div>
                <div className="text-xs text-muted-foreground">
                  Years Experience
                </div>
              </div>
              <div className="text-center">
                <div className="mb-1 text-2xl font-bold text-primary">150+</div>
                <div className="text-xs text-muted-foreground">
                  Projects Delivered
                </div>
              </div>
              <div className="text-center">
                <div className="mb-1 text-2xl font-bold text-primary">100%</div>
                <div className="text-xs text-muted-foreground">
                  Client Satisfaction
                </div>
              </div>
              <div className="text-center">
                <div className="mb-1 text-2xl font-bold text-primary">24/7</div>
                <div className="text-xs text-muted-foreground">
                  Support & Service
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add CSS for shapes */}
      <style jsx global>{`
        .hexagon {
          clip-path: polygon(
            25% 0%,
            75% 0%,
            100% 50%,
            75% 100%,
            25% 100%,
            0% 50%
          );
        }

        .draggable-element {
          pointer-events: auto;
          user-select: none;
          transition:
            transform 0.2s,
            box-shadow 0.2s;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
          z-index: 10;
        }
      `}</style>
    </div>
  )
}

export default HeroSection
