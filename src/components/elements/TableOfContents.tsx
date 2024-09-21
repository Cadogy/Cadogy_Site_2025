"use client"

import { FC, useEffect, useState } from "react"

interface TOCProps {
  headings: { id: string; text: string }[]
  activeId: string | null
  setActiveId: (id: string | null) => void
}

const TableOfContents: FC<TOCProps> = ({ headings, activeId, setActiveId }) => {
  const [showDropdown, setShowDropdown] = useState(false)
  const [showTOC, setShowTOC] = useState(false)
  const [showMobileTOC, setShowMobileTOC] = useState(false)

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
      if (articleBottom <= scrollPosition + viewportHeight * 0.3) {
        setShowMobileTOC(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
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
          {showDropdown ? "Close Table of Contents" : "Open Table of Contents"}
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
    </>
  )
}

export default TableOfContents
