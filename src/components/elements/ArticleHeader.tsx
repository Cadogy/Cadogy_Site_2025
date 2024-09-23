import { FC } from "react"
import { FaPause, FaPlay } from "react-icons/fa"

interface ArticleHeaderProps {
  title: string
  date: string
  description: string
  keywords: string[]
  authorName: string
  authorImage: string
  isPlaying: boolean
  onPlayPause: () => void
  audioSrc: string
}

const ArticleHeader: FC<ArticleHeaderProps> = ({
  title,
  date,
  description,
  keywords,
  authorName,
  authorImage,
  isPlaying,
  onPlayPause,
  audioSrc,
}) => {
  return (
    <header className="proseheader relative mb-12 select-none bg-gradient-to-r from-stone-800 to-zinc-800 py-12 md:py-16">
      <div className="container mx-auto text-center md:text-left">
        {/* Title */}
        <h1 className="mb-4 text-gray-200">{title}</h1>

        {/* Date and Description */}
        <div className="flex flex-col items-center space-y-2 text-center md:flex-row md:items-center md:space-x-2 md:space-y-0 md:text-left">
          <p className="flex items-center text-zinc-300">
            <span className="text-xs text-stone-300">{date}</span>
          </p>

          <div className="flex items-center">
            <span className="hidden md:flex">●</span>
            <span className="text-xs text-gray-400 md:ml-2">
              Written by <strong className="text-gray-200">{authorName}</strong>
            </span>
          </div>
        </div>

        {/* Button to Listen to Podcast */}
        {audioSrc && (
          <div className="mt-4 flex items-center justify-center md:mt-0 md:justify-start">
            <button
              onClick={onPlayPause}
              className="flex items-center space-x-2 text-sm font-medium text-muted-foreground transition-all duration-300 hover:text-gray-300"
            >
              {isPlaying ? (
                <div className="ml-2 flex items-center space-x-1">
                  <div className="audio-bar h-3 w-[2px] bg-muted-foreground" />
                  <div className="audio-bar h-3 w-[2px] bg-muted-foreground transition delay-150" />
                  <div className="audio-bar h-3 w-[2px] bg-muted-foreground transition delay-300" />
                </div>
              ) : (
                <FaPlay />
              )}
              <span className="transition-all duration-500 ease-in-out">
                {isPlaying
                  ? "Listening now..."
                  : "Listen to a podcast-style discussion"}
              </span>
            </button>
          </div>
        )}

        <div className="hidden flex-col justify-center space-y-2 md:flex">
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
