import { FC } from "react"

import "@/styles/mdx-style.css"

import { CalendarIcon } from "lucide-react"

interface ArticleHeaderProps {
  title: string
  date: string
  description: string
  keywords: string[]
  authorName: string
  authorImage: string
}

const ArticleHeader: FC<ArticleHeaderProps> = ({
  title,
  date,
  description,
  keywords,
  authorName,
  authorImage,
}) => {
  return (
    <header className="proseheader relative mb-12 select-none bg-gradient-to-r from-stone-800 to-zinc-800 py-12 md:py-16">
      <div className="container mx-auto text-center md:text-left">
        {/* Title */}
        <h1 className="mb-4 text-gray-200">{title}</h1>

        {/* Date and Description */}
        <div className="flex flex-col items-center space-y-2 text-center md:flex-row md:items-center md:space-x-2 md:space-y-0 md:text-left">
          {/* Date */}
          <p className="flex items-center text-zinc-300">
            <span className="text-xs text-stone-300">{date}</span>
          </p>

          {/* Author Information */}
          <div className="flex items-center">
            <span className="hidden md:flex">●</span>
            <span className="text-xs text-gray-400 md:ml-2">
              Written by <strong className="text-gray-200">{authorName}</strong>
            </span>
          </div>
        </div>

        <div className="hidden flex-col justify-center space-y-2 md:flex">
          {/* Keywords */}
          <div className="mt-2 flex flex-wrap gap-3 pt-2 md:absolute md:bottom-0 md:justify-center md:rounded-t-lg md:bg-background md:px-3">
            {keywords.map((keyword, index) => (
              <span
                key={index}
                className="inline-block rounded-sm bg-stone-600/30 px-3 py-1 text-xs text-white backdrop-blur-sm transition duration-500 hover:bg-stone-500/30"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}

export default ArticleHeader
