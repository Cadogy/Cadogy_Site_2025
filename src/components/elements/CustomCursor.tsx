"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

export function CustomCursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const cursorFollowerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const cursorInitializedRef = useRef<boolean>(false)

  useEffect(() => {
    // Get references
    const dot = cursorDotRef.current
    const follower = cursorFollowerRef.current
    const textElement = textRef.current

    if (!dot || !follower || !textElement) return

    // Hide default cursor and initialize positions
    document.body.classList.add("cursor-none")

    // Initialize cursor positions offscreen with opacity 0
    gsap.set(dot, {
      xPercent: -50,
      yPercent: -50,
      x: -9999,
      y: -9999,
      opacity: 0,
      visibility: "hidden",
    })

    gsap.set(follower, {
      xPercent: -50,
      yPercent: -50,
      x: -9999,
      y: -9999,
      opacity: 0,
      visibility: "hidden",
    })

    // Define cursor states/styles
    const cursorStates = {
      default: {
        followerSize: 40,
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderColor: "rgba(255, 255, 255, 0.3)",
        textColor: "rgba(255, 255, 255, 0.8)",
      },
      next: {
        followerSize: 80,
        backgroundColor: "rgba(59, 130, 246, 0.75)",
        borderColor: "rgba(59, 130, 246, 0.6)",
        textColor: "rgba(255, 255, 255, 1)",
      },
      prev: {
        followerSize: 80,
        backgroundColor: "rgba(59, 130, 246, 0.75)",
        borderColor: "rgba(59, 130, 246, 0.6)",
        textColor: "rgba(255, 255, 255, 1)",
      },
      link: {
        followerSize: 60,
        backgroundColor: "rgba(124, 58, 237, 0.75)",
        borderColor: "rgba(124, 58, 237, 0.6)",
        textColor: "rgba(255, 255, 255, 1)",
      },
      click: {
        followerSize: 40,
        backgroundColor: "rgba(16, 185, 129, 0.75)",
        borderColor: "rgba(16, 185, 129, 0.6)",
        textColor: "rgba(255, 255, 255, 1)",
      },
      // New cursor states with different color schemes
      success: {
        followerSize: 60,
        backgroundColor: "rgba(16, 185, 129, 0.75)",
        borderColor: "rgba(16, 185, 129, 0.6)",
        textColor: "rgba(255, 255, 255, 1)",
      },
      danger: {
        followerSize: 60,
        backgroundColor: "rgba(239, 68, 68, 0.75)",
        borderColor: "rgba(239, 68, 68, 0.6)",
        textColor: "rgba(255, 255, 255, 1)",
      },
      warning: {
        followerSize: 60,
        backgroundColor: "rgba(245, 158, 11, 0.75)",
        borderColor: "rgba(245, 158, 11, 0.6)",
        textColor: "rgba(255, 255, 255, 1)",
      },
      info: {
        followerSize: 60,
        backgroundColor: "rgba(14, 165, 233, 0.75)",
        borderColor: "rgba(14, 165, 233, 0.6)",
        textColor: "rgba(255, 255, 255, 1)",
      },
      primary: {
        followerSize: 60,
        backgroundColor: "rgba(99, 102, 241, 0.75)",
        borderColor: "rgba(99, 102, 241, 0.6)",
        textColor: "rgba(255, 255, 255, 1)",
      },
      secondary: {
        followerSize: 60,
        backgroundColor: "rgba(161, 161, 170, 0.75)",
        borderColor: "rgba(161, 161, 170, 0.6)",
        textColor: "rgba(255, 255, 255, 1)",
      },
    }

    // Set up event listeners for links
    const setupLinkListeners = () => {
      document
        .querySelectorAll('a, button, [role="button"]')
        .forEach((element) => {
          // Skip elements that explicitly want default cursor
          if (element.getAttribute("data-cursor-default") === "true") {
            return
          }

          // Set link cursor if not already set
          if (!element.hasAttribute("data-cursor")) {
            element.setAttribute("data-cursor", "link")
          }
        })
    }

    // Initial setup for links
    setupLinkListeners()

    // Variables to track current cursor position
    const mouse = { x: 0, y: 0 }
    let currentState = "default"
    let currentLabel = ""

    // Find closest element with data-cursor attribute
    const findCursorElement = (
      target: HTMLElement | null
    ): HTMLElement | null => {
      if (!target) return null

      let element: HTMLElement | null = target

      while (element && !element.hasAttribute("data-cursor")) {
        // Go up to parent element
        element = element.parentElement
      }

      return element
    }

    // Mouse move handler
    const onMouseMove = (e: MouseEvent) => {
      // Initialize cursor on first mouse move
      if (!cursorInitializedRef.current) {
        gsap.set([dot, follower], {
          visibility: "visible",
        })
        cursorInitializedRef.current = true
      }

      // Update mouse coordinates
      mouse.x = e.clientX
      mouse.y = e.clientY

      // Update dot position immediately (no delay)
      gsap.to(dot, {
        duration: 0.1,
        x: mouse.x,
        y: mouse.y,
        opacity: 1,
        overwrite: "auto",
      })

      // Follower follows with a slight delay
      gsap.to(follower, {
        duration: 0.5,
        x: mouse.x,
        y: mouse.y,
        opacity: 1,
        ease: "power2.out",
        overwrite: "auto",
      })

      // Get element under cursor to determine state
      const target = e.target as HTMLElement

      // Check if target or any of its parents has data-cursor
      const cursorElement = findCursorElement(target)

      // Get cursor state from target element or its parent with data-cursor
      const state = cursorElement?.getAttribute("data-cursor") || "default"
      const label = cursorElement?.getAttribute("data-cursor-label") || ""

      // Get custom colors if provided
      const customBg = cursorElement?.getAttribute("data-cursor-bg") || ""
      const customBorder =
        cursorElement?.getAttribute("data-cursor-border") || ""
      const customText =
        cursorElement?.getAttribute("data-cursor-text-color") || ""

      // Only update if state or label or custom colors changed
      if (
        state !== currentState ||
        label !== currentLabel ||
        customBg ||
        customBorder ||
        customText
      ) {
        updateCursorState(state, label, {
          bg: customBg,
          border: customBorder,
          textColor: customText,
        })
        currentState = state
        currentLabel = label
      }
    }

    // Update cursor appearance based on state
    const updateCursorState = (
      state: string,
      label: string,
      customColors: { bg?: string; border?: string; textColor?: string } = {}
    ) => {
      const stateConfig =
        cursorStates[state as keyof typeof cursorStates] || cursorStates.default

      // Use custom colors if provided, otherwise use the state's default colors
      const backgroundColor = customColors.bg || stateConfig.backgroundColor
      const borderColor = customColors.border || stateConfig.borderColor
      const textColor = customColors.textColor || stateConfig.textColor

      // Update follower size and style
      gsap.to(follower, {
        duration: 0.3,
        width: stateConfig.followerSize,
        height: stateConfig.followerSize,
        backgroundColor,
        borderColor,
        ease: "power2.out",
      })

      // Hide the small dot when in special cursor states (next, prev, link)
      const shouldHideDot = state !== "default"

      // Use direct DOM manipulation to toggle visibility of the dot
      if (shouldHideDot) {
        dot.classList.add("cursor-dot-hidden")
        gsap.to(dot, {
          duration: 0.2,
          opacity: 0,
          scale: 0.5,
          ease: "power2.out",
        })
      } else {
        dot.classList.remove("cursor-dot-hidden")
        gsap.to(dot, {
          duration: 0.2,
          opacity: 1,
          scale: 1,
          ease: "power2.out",
        })
      }

      // Get the appropriate label text
      const displayText = getDisplayText(state, label)

      // Only update the text content if it's different to avoid unnecessary DOM updates
      if (textElement.textContent !== displayText) {
        textElement.textContent = displayText
      }

      gsap.to(textElement, {
        duration: 0.3,
        color: textColor,
        opacity: displayText ? 1 : 0,
        ease: "power2.out",
      })

      // Update classes
      follower.className = `cursor-follower cursor-${state}`
    }

    // Get appropriate text to display
    const getDisplayText = (state: string, label: string): string => {
      // If there's an explicit label provided, use it
      if (label && label.trim() !== "") return label

      // Otherwise use state-based labels
      switch (state) {
        case "next":
          return "NEXT"
        case "prev":
          return "BACK"
        case "link":
          return "VIEW"
        case "success":
          return "SUCCESS"
        case "danger":
          return "CAUTION"
        case "warning":
          return "WARNING"
        case "info":
          return "INFO"
        default:
          return ""
      }
    }

    // Mouse enter/leave handlers
    const onMouseEnter = () => {
      gsap.to([dot, follower], {
        duration: 0.3,
        opacity: 1,
        ease: "power2.out",
      })
    }

    const onMouseLeave = () => {
      gsap.to([dot, follower], {
        duration: 0.3,
        opacity: 0,
        ease: "power2.out",
      })
    }

    // Add click effect
    const onMouseDown = () => {
      gsap.to(dot, {
        duration: 0.15,
        scale: 0.8,
        ease: "power2.out",
      })

      gsap.to(follower, {
        duration: 0.15,
        scale: 0.9,
        ease: "power2.out",
      })
    }

    const onMouseUp = () => {
      gsap.to([dot, follower], {
        duration: 0.15,
        scale: 1,
        ease: "power2.out",
      })
    }

    // Add all event listeners
    document.addEventListener("mousemove", onMouseMove)
    document.addEventListener("mouseenter", onMouseEnter)
    document.addEventListener("mouseleave", onMouseLeave)
    document.addEventListener("mousedown", onMouseDown)
    document.addEventListener("mouseup", onMouseUp)

    // Re-run link setup whenever DOM changes to catch new elements
    const observer = new MutationObserver((mutations) => {
      setupLinkListeners()
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })

    // Cleanup on unmount
    return () => {
      document.body.classList.remove("cursor-none")
      document.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mouseenter", onMouseEnter)
      document.removeEventListener("mouseleave", onMouseLeave)
      document.removeEventListener("mousedown", onMouseDown)
      document.removeEventListener("mouseup", onMouseUp)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      {/* Small dot cursor that follows mouse exactly - initially hidden */}
      <div
        ref={cursorDotRef}
        className="cursor-dot cursor-hidden"
        aria-hidden="true"
      />

      {/* Larger follower with content - initially hidden */}
      <div
        ref={cursorFollowerRef}
        className="cursor-follower cursor-hidden"
        aria-hidden="true"
      >
        <div ref={textRef} className="cursor-text"></div>
      </div>

      {/* Add a style element with CSS for better control */}
      <style jsx global>{`
        .cursor-dot-hidden {
          visibility: hidden !important;
          opacity: 0 !important;
          transform: scale(0) !important;
        }

        .cursor-hidden {
          visibility: hidden;
          opacity: 0;
        }
      `}</style>
    </>
  )
}
