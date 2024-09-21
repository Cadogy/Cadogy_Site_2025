import { FC } from "react"

import "@/styles/mdx-style.css"

import { CalendarIcon } from "lucide-react"

interface ArticleHeaderProps {
  title: string
  date: string
  description: string
  keywords: string[]
}

const ArticleHeader: FC<ArticleHeaderProps> = ({
  title,
  date,
  description,
  keywords,
}) => {
  return (
    <header className="proseheader relative mb-12 select-none bg-gradient-to-r from-stone-800 to-zinc-800 py-12 md:py-16">
      <div className="container mx-auto">
        {/* Title */}
        <h1 className="mb-4 text-gray-200">{title}</h1>

        {/* Date and Description */}
        <p className="flex items-center !text-xs text-zinc-300">
          <CalendarIcon className="mr-1 h-4 w-4" />
          Published on <span className="text-stone-300">{date}</span>
        </p>
        <div className="flex flex-col justify-center space-y-2">
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
