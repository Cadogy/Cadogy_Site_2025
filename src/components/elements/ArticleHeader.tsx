import { FC } from "react"
import Image from "next/image"
import Link from "next/link"
import { FaPause, FaPlay } from "react-icons/fa"

interface ArticleHeaderProps {
  title: string
  date: string
  description: string
  keywords: string[]
  keywordIds?: number[]
  authorName: string
  authorImage: string
  isPlaying: boolean
  onPlayPause: () => void
  audioSrc: string
  featuredImage?: string
}

const ArticleHeader: FC<ArticleHeaderProps> = ({
  title,
  date,
  description,
  keywords,
  keywordIds = [],
  authorName,
  authorImage,
  isPlaying,
  onPlayPause,
  audioSrc,
  featuredImage,
}) => {
  return (
    <header className="relative mb-12 select-none overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 h-full w-full">
        {featuredImage && (
          <Image
            src={featuredImage}
            alt={title}
            fill
            className="object-cover object-center"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-neutral-900/70 to-background"></div>
      </div>

      {/* Content */}
      <div className="container relative mx-auto px-4 py-20 md:py-32">
        <div className="mx-auto max-w-4xl">
          {/* Meta Info */}
          <div className="mb-5 flex flex-wrap items-center gap-3 text-slate-300">
            <div className="flex items-center">
              {authorImage && (
                <Image
                  src={authorImage}
                  alt={authorName}
                  width={24}
                  height={24}
                  className="mr-2 rounded-lg"
                />
              )}
              <span className="text-sm font-medium">{authorName}</span>
            </div>
            <span className="text-xs">•</span>
            <span className="text-sm">{date}</span>

            {/* Podcast Button */}
            {audioSrc && (
              <>
                <span className="text-xs">•</span>
                <button
                  onClick={onPlayPause}
                  className="flex items-center space-x-2 rounded-md bg-background/20 px-3 py-1 text-sm font-medium text-slate-200 backdrop-blur-sm transition-all duration-300 hover:bg-background/30"
                >
                  {isPlaying ? (
                    <div className="mr-1 flex items-center space-x-1">
                      <div className="audio-bar h-3 w-[2px] animate-pulse bg-slate-200" />
                      <div className="audio-bar h-4 w-[2px] animate-pulse bg-slate-200 transition delay-150" />
                      <div className="audio-bar h-3 w-[2px] animate-pulse bg-slate-200 transition delay-300" />
                    </div>
                  ) : (
                    <FaPlay className="mr-1 h-3 w-3" />
                  )}
                  <span className="transition-all duration-500 ease-in-out">
                    {isPlaying ? "Listening..." : "Listen"}
                  </span>
                </button>
              </>
            )}
          </div>

          {/* Title */}
          <h1 className="mb-5 text-center text-3xl font-bold leading-tight text-white sm:text-4xl md:text-left md:text-5xl">
            {title}
          </h1>

          {/* Description */}
          <p className="mb-8 text-center text-lg text-slate-300 md:text-left">
            {description}
          </p>

          {/* Keywords/Tags */}
          {keywords.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {keywords.map((keyword, index) => {
                const tagId = keywordIds[index]
                return (
                  <Link
                    key={index}
                    href={`/articles?tag=${tagId}&page=1`}
                    className="inline-block rounded-md bg-background/20 px-3 py-1 text-xs text-white backdrop-blur-sm transition duration-300 hover:bg-background/30"
                  >
                    #{keyword}
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default ArticleHeader
