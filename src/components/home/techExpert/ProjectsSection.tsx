import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion"
import { ArrowRight, Check, ChevronDown, Zap } from "lucide-react"

// Custom scrollable image component
const ScrollableImage = ({ src, alt }: { src: string; alt: string }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [imageHeight, setImageHeight] = useState(0)
  const [containerHeight, setContainerHeight] = useState(0)
  const imageRef = useRef<HTMLImageElement>(null)

  // Set up scroll detection using Motion's useScroll hook
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  // Map scroll position to image position
  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -1 * Math.max(0, imageHeight - containerHeight)]
  )

  // Track scroll state for UI feedback
  const [reachedBottom, setReachedBottom] = useState(false)
  const [reachedTop, setReachedTop] = useState(true)

  // Update state based on scroll position
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setReachedTop(latest <= 0.05)
    setReachedBottom(latest >= 0.95)
  })

  // Update measurements when image loads
  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget
    setImageHeight(img.offsetHeight)

    if (containerRef.current) {
      setContainerHeight(containerRef.current.offsetHeight)
    }
  }

  // Update dimensions on resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current && imageRef.current) {
        setContainerHeight(containerRef.current.offsetHeight)
        setImageHeight(imageRef.current.offsetHeight)
      }
    }

    window.addEventListener("resize", updateDimensions)
    updateDimensions()

    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <motion.div
        className="w-full"
        style={{
          y: imageY,
        }}
      >
        <img
          ref={imageRef}
          src={src}
          alt={alt}
          className="w-full"
          style={{ minHeight: "150%" }}
          onLoad={handleImageLoad}
          draggable={false}
        />
      </motion.div>

      {/* Scroll indicators */}
      <motion.div
        className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/40 to-transparent"
        animate={{ opacity: reachedTop ? 0 : 0.7 }}
      />
      <motion.div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent"
        animate={{ opacity: reachedBottom ? 0 : 0.7 }}
      />

      {/* Scroll hint - shows more prominently when hovering */}
      <motion.div
        className="pointer-events-none absolute right-3 top-3 flex items-center gap-1 rounded-full bg-black/20 px-2 py-1 text-xs text-white/60 backdrop-blur-sm"
        animate={{
          opacity: isHovering && !reachedBottom ? 0.9 : 0.4,
        }}
        transition={{ duration: 0.2 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 5v14M5 12h14"></path>
        </svg>
        <span>Scroll to explore</span>
      </motion.div>

      {/* Continue scrolling hint at bottom */}
      <motion.div
        className="pointer-events-none absolute inset-x-0 bottom-2 flex justify-center"
        animate={{
          opacity: reachedBottom && isHovering ? 0.9 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center gap-1.5 rounded-full bg-black/30 px-3 py-1.5 text-xs text-white/80 backdrop-blur-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14M12 19l7-7M12 19l-7-7"></path>
          </svg>
          <span>Continue scrolling page</span>
        </div>
      </motion.div>
    </div>
  )
}

const ProjectsSection = () => {
  // State for mobile accordions
  const [openCard, setOpenCard] = useState<number | null>(null)

  // Toggle accordion function
  const toggleCard = (index: number) => {
    setOpenCard(openCard === index ? null : index)
  }

  return (
    <motion.div
      className="mt-16 pt-8 sm:pt-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
    >
      <div className="mb-8 py-6 text-center">
        <h3 className="mb-4 text-5xl font-medium tracking-tight text-foreground">
          Projects We&apos;re Excited About
        </h3>
        <p className="mx-auto max-w-2xl px-4 text-sm text-muted-foreground sm:text-base">
          Innovative solutions built with modern tech stacks
        </p>
      </div>

      {/* Project Card - PlayerBay */}
      <div className="mx-auto">
        <div className="overflow-hidden rounded-xl border border-border bg-card">
          {/* Mobile View: Stacked with Image on Top */}
          <div className="block md:hidden">
            {/* Mobile Image Container */}
            <div className="relative h-52 w-full overflow-hidden bg-gradient-to-br from-slate-900/30 to-slate-800/30 sm:h-64">
              {/* Custom scrollable image */}
              <ScrollableImage
                src="/images/playerbay_demo.png"
                alt="PlayerBay gaming marketplace"
              />

              {/* Status Badge - Mobile */}
              <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-1 backdrop-blur-md">
                <div className="h-2 w-2 animate-pulse rounded-full bg-amber-400"></div>
                <span className="text-xs font-medium text-white">
                  Coming Soon
                </span>
              </div>
            </div>

            {/* Mobile Content */}
            <div className="p-4 sm:p-6">
              <h4 className="mb-3 text-xl font-medium text-foreground">
                PlayerBay
              </h4>
              <p className="mb-4 text-sm text-muted-foreground">
                A marketplace where gamers can buy and sell accounts and in-game
                items. Our SDK lets game studios integrate with our platform for
                seamless in-game transactions.
              </p>

              {/* Mobile Tech Stack Accordion */}
              <div className="mb-3">
                <button
                  onClick={() => toggleCard(4)}
                  className="flex w-full items-center justify-between rounded-md bg-muted/50 p-3 text-left"
                >
                  <h4 className="text-sm font-medium text-foreground">
                    Tech Stack
                  </h4>
                  <motion.div
                    animate={{ rotate: openCard === 4 ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {openCard === 4 && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-4 px-1 pt-4">
                        {/* Frontend */}
                        <div>
                          <div className="mb-2 flex items-center">
                            <div className="mr-2 h-2 w-2 rounded-full bg-blue-400"></div>
                            <span className="text-xs font-medium text-foreground">
                              Frontend
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            <span className="cursor-help rounded-md bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                              Next.js
                            </span>
                            <span className="cursor-help rounded-md bg-cyan-100 px-2 py-0.5 text-xs font-medium text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-400">
                              React
                            </span>
                            <span className="cursor-help rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-800 dark:bg-slate-900/30 dark:text-slate-400">
                              TypeScript
                            </span>
                            <span className="cursor-help rounded-md bg-pink-100 px-2 py-0.5 text-xs font-medium text-pink-800 dark:bg-pink-900/30 dark:text-pink-400">
                              Tailwind
                            </span>
                          </div>
                        </div>

                        {/* Backend */}
                        <div>
                          <div className="mb-2 flex items-center">
                            <div className="mr-2 h-2 w-2 rounded-full bg-green-400"></div>
                            <span className="text-xs font-medium text-foreground">
                              Backend
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            <span className="cursor-help rounded-md bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">
                              MongoDB
                            </span>
                            <span className="cursor-help rounded-md bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400">
                              NextAuth
                            </span>
                            <span className="cursor-help rounded-md bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">
                              Socket.io
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Key Features - Mobile */}
              <div className="mb-3 space-y-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Check className="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
                  <span>Cross-game inventory system</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Check className="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
                  <span>Game studio SDK integration</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Check className="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
                  <span>Secure payment processing</span>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop View: Side-by-Side */}
          <div className="hidden md:grid md:grid-cols-5 lg:grid-cols-2">
            {/* Content Side */}
            <div className="p-6 md:col-span-2 lg:col-span-1 lg:p-8">
              <h4 className="mb-3 text-2xl font-medium text-foreground">
                PlayerBay
              </h4>
              <p className="mb-6 text-base text-muted-foreground">
                We&apos;re building PlayerBay — a marketplace where everyone
                from Fortnite pros to Diablo loot fiends can buy and sell
                accounts and in-game items. Our easy-to-use SDK lets any game
                studio integrate with our platform for seamless transactions.
              </p>

              {/* Status Badge - Desktop */}
              <div className="mb-4 inline-flex items-center rounded-md bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                <Zap className="mr-1 h-3 w-3" />
                <span>Under Development</span>
              </div>

              {/* Key Features - Desktop */}
              <div className="mb-6 space-y-2">
                <h5 className="mb-2 text-sm font-medium text-foreground">
                  Key Features
                </h5>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Check className="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
                  <span>Cross-game inventory system with unified wallet</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Check className="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
                  <span>Simple SDK for game studio integration</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Check className="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
                  <span>Secure payment processing and escrow system</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Check className="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
                  <span>Anti-fraud protection with transaction history</span>
                </div>
              </div>

              {/* Tech Stack Desktop */}
              <div>
                <h5 className="mb-3 text-sm font-medium text-foreground">
                  Built With
                </h5>
                <div className="space-y-3">
                  {/* Frontend */}
                  <div>
                    <div className="mb-2 flex items-center">
                      <div className="mr-2 h-2 w-2 rounded-full bg-blue-400"></div>
                      <span className="text-xs font-medium text-muted-foreground">
                        Frontend
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      <span className="cursor-help rounded-md bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                        Next.js
                      </span>
                      <span className="cursor-help rounded-md bg-cyan-100 px-2 py-0.5 text-xs font-medium text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-400">
                        React
                      </span>
                      <span className="cursor-help rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-800 dark:bg-slate-900/30 dark:text-slate-400">
                        TypeScript
                      </span>
                      <span className="cursor-help rounded-md bg-pink-100 px-2 py-0.5 text-xs font-medium text-pink-800 dark:bg-pink-900/30 dark:text-pink-400">
                        Tailwind
                      </span>
                    </div>
                  </div>

                  {/* Backend */}
                  <div>
                    <div className="mb-2 flex items-center">
                      <div className="mr-2 h-2 w-2 rounded-full bg-green-400"></div>
                      <span className="text-xs font-medium text-muted-foreground">
                        Backend
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      <span className="cursor-help rounded-md bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">
                        MongoDB
                      </span>
                      <span className="cursor-help rounded-md bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400">
                        NextAuth
                      </span>
                      <span className="cursor-help rounded-md bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">
                        Socket.io
                      </span>
                    </div>
                  </div>

                  {/* Utilities */}
                  <div>
                    <div className="mb-2 flex items-center">
                      <div className="mr-2 h-2 w-2 rounded-full bg-amber-400"></div>
                      <span className="text-xs font-medium text-muted-foreground">
                        Utilities
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      <span className="cursor-help rounded-md bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-800 dark:bg-orange-900/30 dark:text-orange-400">
                        React Query
                      </span>
                      <span className="cursor-help rounded-md bg-teal-100 px-2 py-0.5 text-xs font-medium text-teal-800 dark:bg-teal-900/30 dark:text-teal-400">
                        React Hook Form
                      </span>
                      <span className="cursor-help rounded-md bg-lime-100 px-2 py-0.5 text-xs font-medium text-lime-800 dark:bg-lime-900/30 dark:text-lime-400">
                        SWR
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Image Side */}
            <div className="relative md:col-span-3 lg:col-span-1">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 to-slate-800/50">
                {/* Custom scrollable image implementation */}
                <ScrollableImage
                  src="/images/playerbay_demo.png"
                  alt="PlayerBay gaming marketplace"
                />

                {/* Enhanced gradient overlay */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/95 via-background/30 to-transparent opacity-70"></div>

                {/* Status Badge - Desktop Image */}
                <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-1 backdrop-blur-md">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-amber-400"></div>
                  <span className="text-xs font-medium text-white">
                    Coming Soon
                  </span>
                </div>

                {/* Bottom Caption */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 p-6">
                  <p className="max-w-sm text-xs text-white/90">
                    A marketplace for gamers powered by next-gen tech - the
                    secure way to trade digital assets across games.
                  </p>
                </div>

                {/* Decorative elements */}
                <div className="pointer-events-none absolute right-1/4 top-1/4 h-24 w-24 rounded-full bg-amber-500/10 blur-2xl filter"></div>
                <div className="pointer-events-none absolute bottom-1/3 left-1/4 h-20 w-20 rounded-full bg-blue-500/10 blur-xl filter"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Future Project Teaser Card */}
        <div className="mt-6 rounded-xl border border-dashed border-border bg-card/50 p-6 text-center">
          <div className="mx-auto max-w-md">
            <h4 className="mb-2 text-lg font-medium text-foreground">
              More Projects Coming Soon
            </h4>
            <p className="mb-4 text-sm text-muted-foreground">
              Like this site? It&apos;s open-sourced! Check out our GitHub for
              this project and other cool stuff we&apos;re building.
            </p>
            <div className="flex justify-center gap-3">
              <Link
                data-cursor="secondary"
                data-cursor-label="SRC"
                href="https://github.com/Cadogy/Cadogy_Site_2025"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2 h-4 w-4"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
                <span>Site Code</span>
              </Link>
              <Link
                data-cursor-label="GITHUB"
                href="https://github.com/Cadogy"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2 h-4 w-4"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
                <span>Cadogy GitHub</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ProjectsSection
