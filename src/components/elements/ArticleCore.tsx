"use client"

import { FC, useState } from "react"

import ArticleHeader from "@/components/elements/ArticleHeader"
import PodcastFloater from "@/components/elements/postcastFloater"

interface ArticleCoreProps {
  audioSrc: string
  title: string
  description: string
  date: string
  authorName: string
  authorImage: string
  keywords: string[]
}

const ArticleCore: FC<ArticleCoreProps> = ({
  audioSrc,
  title,
  description,
  date,
  authorName,
  authorImage,
  keywords,
}) => {
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlayPause = () => {
    setIsPlaying((prev) => !prev)
  }

  return (
    <>
      <PodcastFloater
        audioSrc={audioSrc}
        scrubberColor="hsl(0deg 100%,79.31%,50%)"
        isPlaying={isPlaying}
        onPlayPause={handlePlayPause}
      />
      <ArticleHeader
        authorName={authorName}
        authorImage={authorImage}
        title={title}
        date={date}
        description={description}
        keywords={keywords}
        isPlaying={isPlaying}
        onPlayPause={handlePlayPause}
        audioSrc={audioSrc}
      />
    </>
  )
}

export default ArticleCore
