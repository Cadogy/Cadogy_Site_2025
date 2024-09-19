"use client"

import { ReactNode } from "react"
import Link from "next/link"
import { MDXProvider } from "@mdx-js/react"

// Custom components to use in MDX files
const components = {
  a: (props: any) => <Link {...props} className="text-blue-500 underline" />,
  h1: (props: any) => <h1 className="my-6 text-5xl font-bold" {...props} />,
  h2: (props: any) => <h2 className="my-4 text-4xl font-bold" {...props} />,
  h3: (props: any) => <h3 className="my-3 text-3xl font-bold" {...props} />,
  p: (props: any) => <p className="my-2 text-lg leading-7" {...props} />,
  ul: (props: any) => <ul className="my-4 list-inside list-disc" {...props} />,
  ol: (props: any) => (
    <ol className="my-4 list-inside list-decimal" {...props} />
  ),
  blockquote: (props: any) => (
    <blockquote
      className="my-6 border-l-4 border-gray-300 pl-4 italic text-gray-600"
      {...props}
    />
  ),
}

interface MDXLayoutProps {
  children: ReactNode
  title: string
  date: string
}

export default function MDXLayout({ children, title, date }: MDXLayoutProps) {
  return (
    <div className="mx-auto w-full">
      {/* Blog header */}
      <header className="mb-12 bg-gradient-to-r from-stone-600 to-white/40 py-16">
        <div className="container">
          <h1 className="mb-2 text-4xl text-gray-300 md:text-[3rem]">
            {title}
          </h1>
          <p className="text-sm text-white/40">
            Written: <span className="text-zinc-300">{date}</span>
          </p>
        </div>
      </header>

      {/* MDX content */}
      <div className="container">
        <MDXProvider components={components}>
          <article className="prose max-w-none">{children}</article>
        </MDXProvider>
      </div>
    </div>
  )
}
