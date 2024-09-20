"use client"

import "@/styles/mdx-style.css"

import { ReactNode, useEffect, useState } from "react"

interface MDXLayoutProps {
  title: string
  date: string
  description: string
  keywords: string
  image?: string
  children: React.ReactNode
}

export default function MDXLayout({
  children,
  title,
  date,
  description,
  keywords,
}: MDXLayoutProps) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const [showDropdown, setShowDropdown] = useState(false)
  const [showTOC, setShowTOC] = useState(false) // For desktop TOC visibility
  const [showMobileTOC, setShowMobileTOC] = useState(false) // For mobile TOC visibility
  const [headings, setHeadings] = useState<{ id: string; text: string }[]>([]) // Store current headings

  const keywordArray = keywords.split(",")

  useEffect(() => {
    // Clear previous headings and re-capture the current page's h2 headings
    const captureHeadings = () => {
      const currentHeadings = Array.from(document.querySelectorAll("h2")).map(
        (heading) => ({
          id: heading.id,
          text: heading.innerText,
        })
      )
      setHeadings(currentHeadings)
    }

    // Call captureHeadings initially and when the content changes
    captureHeadings()

    // Function to observe sections using IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        root: null, // Use the viewport as the root
        rootMargin: "0px 0px -50% 0px", // Trigger when section is halfway out of view
        threshold: 0.5, // Trigger when 50% of the section is visible
      }
    )

    const sections = document.querySelectorAll("h2")
    sections.forEach((section) => observer.observe(section))

    // Cleanup observer on component unmount or content change
    return () => {
      sections.forEach((section) => observer.unobserve(section))
    }
  }, [children]) // Re-run whenever the content (children) changes

  useEffect(() => {
    // Handle scroll position to show/hide TOC and mobile TOC
    const handleScroll = () => {
      const headerHeight =
        document.querySelector("header")?.getBoundingClientRect().bottom || 0
      const firstSection =
        document.querySelector("h2")?.getBoundingClientRect().top || 0
      const articleBottom =
        document.querySelector("article")?.getBoundingClientRect().bottom || 0
      const viewportHeight = window.innerHeight
      const scrollPosition = window.scrollY

      // Show TOC when reaching the first section (smooth transition)
      if (scrollPosition > headerHeight && firstSection < viewportHeight) {
        setShowTOC(true)
        setShowMobileTOC(true)
      } else {
        setShowTOC(false)
        setShowMobileTOC(false)
      }

      // Adjust fade-out threshold for mobile TOC
      // Instead of hiding as soon as the bottom is in view, add a buffer to keep it longer
      if (articleBottom <= scrollPosition + viewportHeight * 0.3) {
        setShowMobileTOC(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* Blog header */}
      <div className="mx-auto w-full">
        <header className="proseheader relative mb-12 select-none bg-gradient-to-r from-stone-800 to-zinc-800 py-12 md:py-16">
          <div className="container mx-auto max-w-4xl text-center">
            {/* Title */}
            <h1 className="mb-4 text-4xl text-gray-200 md:text-5xl">{title}</h1>

            {/* Date and Keywords */}
            <div className="flex flex-col items-center justify-center space-y-2">
              {/* Date */}
              <p className="!text-xs text-zinc-300">
                Published on <span className="text-stone-300">{date}</span>
              </p>
              {/* Render keyword pill designs */}
              <div className="mt-2 flex flex-wrap justify-center gap-1 px-3 pt-2 md:absolute md:bottom-0 md:rounded-t-lg md:bg-background">
                {keywordArray.map((keyword, index) => (
                  <span
                    key={index}
                    className="inline-block rounded-sm bg-stone-600/30 px-3 py-1 text-xs text-white backdrop-blur-sm transition duration-500 hover:bg-stone-500/30"
                  >
                    {keyword.trim()}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </header>

        {/* Floating TOC on larger screens with fade-in/out */}
        <nav
          className={`ml-navHeight duration-normal sticky top-16 z-50 hidden h-0 w-[15rem] overflow-visible bg-transparent transition-opacity md:block ${
            showTOC ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          aria-label="Table of contents"
        >
          <ul className="flex flex-col space-y-2 px-4 py-2 text-sm">
            {headings.map((heading) => (
              <li key={heading.id}>
                <a
                  href={`#${heading.id}`}
                  className={`block py-[0.25em] transition-[color] hover:text-white/70 ${
                    activeId === heading.id ? "text-white" : "text-gray-500"
                  }`}
                >
                  {heading.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile TOC */}
        <div
          className={`fixed bottom-0 z-50 w-full bg-background text-white transition-opacity md:hidden ${
            showMobileTOC ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="w-full bg-neutral-800/50 p-4 text-center backdrop-blur-sm"
          >
            {showDropdown
              ? "Close Table of Contents"
              : "Open Table of Contents"}
          </button>
          {showDropdown && (
            <nav className="bg-neutral-800/50 backdrop-blur-sm">
              <ul className="space-y-2 p-4 text-sm">
                {headings.map((heading) => (
                  <li key={heading.id}>
                    <a
                      href={`#${heading.id}`}
                      className={`block py-2 ${
                        activeId === heading.id ? "text-white" : "text-gray-500"
                      }`}
                      onClick={() => setShowDropdown(false)}
                    >
                      {heading.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>

        {/* MDX content */}
        <div className="container mx-auto max-w-4xl">
          <article className="prose max-w-none selection:bg-stone-200/10 selection:text-stone-300">
            {children}
          </article>
        </div>
      </div>
    </>
  )
}