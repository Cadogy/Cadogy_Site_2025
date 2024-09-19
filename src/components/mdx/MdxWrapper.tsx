"use client"

import { ReactNode } from "react"
import { MDXProvider } from "@mdx-js/react"

interface MdxWrapperProps {
  children: ReactNode
  title: string
  date: string
}

export default function MdxWrapper({ children, title, date }: MdxWrapperProps) {
  return (
    <div className="mx-auto w-full">
      {/* Blog header */}
      <header className="mb-12 bg-gradient-to-r from-stone-600 to-white/40 py-16">
        <div className="container">
          <h1 className="mb-2 text-4xl text-gray-300">{title}</h1>
          <p className="text-sm text-white/40">{date}</p>
        </div>
      </header>

      {/* MDX content */}
      <div className="container">
        <MDXProvider>
          <article className="prose max-w-none">{children}</article>
        </MDXProvider>
      </div>
    </div>
  )
}
