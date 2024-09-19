import "@/styles/mdx-style.css"

import { ReactNode, useEffect, useState } from "react"
import { MDXProvider } from "@mdx-js/react"

interface MDXLayoutProps {
  children: ReactNode
  title: string
  date: string
  description: string
  keywords: string
  image: string
}

export default function MDXLayout({
  children,
  title,
  date,
  description,
  keywords,
  image,
}: MDXLayoutProps) {
  const keywordArray = keywords.split(",")

  return (
    <>
      {/* Blog header */}
      <div className="mx-auto w-full">
        <header className="proseheader mb-12 select-none bg-gradient-to-r from-stone-600 to-neutral-600 py-12 md:py-16">
          <div className="container mx-auto max-w-4xl text-center">
            {/* Title */}
            <h1 className="mb-4 text-4xl text-gray-200 md:text-5xl">{title}</h1>
            {/* Description */}
            <p className="mb-6 text-lg text-neutral-300 md:text-xl">
              {description}
            </p>

            {/* Date and Keywords */}
            <div className="flex flex-col items-center justify-center space-y-2">
              {/* Date */}
              <p className="text-sm text-zinc-300">
                Written on <span className="text-stone-300">{date}</span>
              </p>
              {/* Render keyword pill designs */}
              <div className="mt-2 flex flex-wrap justify-center gap-2">
                {keywordArray.map((keyword, index) => (
                  <span
                    key={index}
                    className="inline-block rounded-full bg-stone-500/30 px-3 py-1 text-sm text-white"
                  >
                    {keyword.trim()}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </header>

        {/* MDX content */}
        <div className="container">
          <article className="prose max-w-none selection:bg-stone-200/10 selection:text-stone-300">
            {children}
          </article>
        </div>
      </div>
    </>
  )
}
