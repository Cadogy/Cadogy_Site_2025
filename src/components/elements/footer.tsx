"use client"

import { useState } from "react"
import Link from "next/link"

import { siteConfig } from "@/config/site"

export function Footer() {
  const [hoveredText, setHoveredText] = useState(siteConfig.name)

  const alphabet =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890"
  const textCipherEffect = (text: string) => {
    let iterations = 0
    const interval = setInterval(() => {
      setHoveredText((prevText) =>
        prevText
          .split("")
          .map((char, index) => {
            if (index < iterations) {
              return text[index]
            }
            return alphabet[Math.floor(Math.random() * alphabet.length)]
          })
          .join("")
      )
      iterations += 1 / 2
      if (iterations >= text.length) clearInterval(interval)
    }, 50)
  }

  const handleMouseEnter = () => {
    textCipherEffect(siteConfig.name)
  }

  const handleMouseLeave = () => {
    setHoveredText(siteConfig.name)
  }

  return (
    <footer className="ease-out-cubic mt-36 bg-neutral-900/20 transition-[opacity,transform,filter] md:mx-4 md:mt-40 md:bg-transparent md:p-0">
      <div className="mb-20 md:mb-32">
        <div className="container grid grid-cols-1 gap-6 pl-0 pr-0 pt-16 md:grid-cols-2 md:pt-0 lg:grid-cols-4">
          {/* Column 1 */}
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-col items-center gap-2">
              <h3 className="items-center text-sm font-medium text-gray-100">
                The Company
              </h3>
              <ul className="flex flex-col items-center gap-2" role="list">
                <li>
                  <Link
                    href="/who-we-are"
                    target="_blank"
                    className="text-sm text-gray-400 transition hover:text-gray-300"
                  >
                    Who We Are
                  </Link>
                </li>
                <li>
                  <Link
                    href="/our-charter"
                    className="text-sm text-gray-400 transition hover:text-gray-300"
                  >
                    Our Charter
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-col items-center gap-2">
              <h3 className="items-center text-sm font-medium text-gray-100">
                The API
              </h3>
              <ul className="flex flex-col items-center gap-2" role="list">
                <li>
                  <Link
                    href="/login"
                    className="text-sm text-gray-400 transition hover:text-gray-300"
                  >
                    Overview
                  </Link>
                </li>
                <li>
                  <Link
                    href="/the-api/features"
                    className="text-sm text-gray-400 transition hover:text-gray-300"
                  >
                    Features
                  </Link>
                </li>
                {/* <li>
                  <Link href="https://platform.openai.com/docs/introduction" target="_blank" className="flex items-center gap-1 text-sm text-gray-400 hover:text-gray-300 transition">
                    Documentation
                    <svg width="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 9L9 1M9 1H2.5M9 1V7.22222" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="sr-only">(opens in a new window)</span>
                  </Link>
                </li> */}
              </ul>
            </div>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-col items-center gap-2">
              <h3 className="items-center text-sm font-medium text-gray-100">
                The Policies
              </h3>
              <ul className="flex flex-col gap-2" role="list">
                <li>
                  <Link
                    href="/policies/terms-of-use"
                    className="text-sm text-gray-400 transition hover:text-gray-300"
                  >
                    Terms of Use
                  </Link>
                </li>
                <li>
                  <Link
                    href="/policies/privacy-policy"
                    className="text-sm text-gray-400 transition hover:text-gray-300"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 4 */}
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-col items-center gap-2">
              <h3 className="items-center text-sm font-medium text-gray-100">
                The Misc.
              </h3>
              <ul className="flex flex-col items-center gap-2" role="list">
                <li>
                  <Link
                    href="/articles"
                    className="text-sm text-gray-400 transition hover:text-gray-300"
                  >
                    Articles
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact-us"
                    className="text-sm text-gray-400 transition hover:text-gray-300"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto flex w-full flex-col-reverse items-center justify-between gap-4 px-4 py-3 md:flex-row md:items-start">
        <div className="flex items-center">
          <span
            className="select-none text-sm text-gray-400"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {hoveredText} © 2019–2024
          </span>
        </div>
        <div className="flex gap-4">
          {/* Social Icons */}
          {/* X (Twitter) icon */}
          <a
            href="https://x.com/Cadogy"
            target="_blank"
            className="text-gray-300 transition hover:text-gray-100"
            aria-label="X"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              viewBox="0 0 17 17"
              fill="none"
            >
              <path
                fill="currentColor"
                d="M13.158 2.058h2.248l-4.913 5.435 5.78 7.395h-4.525l-3.545-4.485-4.056 4.485h-2.25l5.255-5.813-5.545-7.017h4.64l3.205 4.1 3.706-4.1Zm-.79 11.527h1.246L5.57 3.293H4.233l8.135 10.292Z"
              />
            </svg>
          </a>
          {/* YouTube icon */}
          <a
            href="https://www.youtube.com/Cadogy"
            target="_blank"
            className="text-gray-300 transition hover:text-gray-100"
            aria-label="YouTube"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              viewBox="0 0 17 17"
              fill="none"
            >
              <path
                fill="currentColor"
                d="M16.79 5.475s-.156-1.067-.637-1.536c-.61-.617-1.29-.62-1.603-.656-2.238-.158-5.597-.158-5.597-.158h-.006s-3.36 0-5.597.158c-.313.036-.994.039-1.603.656-.481.469-.635 1.536-.635 1.536S.95 6.73.95 7.982v1.174c0 1.252.16 2.507.16 2.507s.156 1.067.634 1.536c.61.617 1.41.596 1.765.662 1.282.118 5.441.154 5.441.154s3.363-.006 5.6-.16c.313-.036.994-.04 1.603-.656.481-.469.638-1.536.638-1.536s.159-1.252.159-2.507V7.982c0-1.252-.16-2.507-.16-2.507ZM7.298 10.58V6.228l4.322 2.184-4.322 2.168Z"
              />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/company/Cadogy"
            target="_blank"
            className="text-gray-300 transition hover:text-gray-100"
            aria-label="LinkedIn"
          >
            {/* LinkedIn icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              viewBox="0 0 17 17"
              fill="none"
            >
              <path
                fill="currentColor"
                d="M3.894 2.833c0 .844-.677 1.524-1.515 1.524-.838 0-1.514-.68-1.514-1.524 0-.844.676-1.524 1.514-1.524.838 0 1.515.68 1.515 1.524ZM.985 5.278h2.81v8.472H.985V5.278Zm5.853 0h2.692v1.16h.038c.374-.683 1.292-1.403 2.66-1.403 2.842 0 3.363 1.872 3.363 4.303v4.412h-2.81V9.668c0-.919-.016-2.1-1.28-2.1-1.282 0-1.479 1.001-1.479 2.034v4.147H6.838V5.278Z"
              />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  )
}
