import React from "react"
import Image from "next/image"
import Link from "next/link"

// Define the shape of an Article
interface Article {
  title: string
  date: string
  description: string
  coverImage: string
  slug: string
}

interface ArticlesGridProps {
  articles: Article[]
}

const ArticlesGrid: React.FC<ArticlesGridProps> = ({ articles }) => {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article, index) => (
        <Link
          key={index}
          href={article.slug}
          className="group flex flex-col overflow-hidden rounded-lg bg-neutral-900/40 transition hover:bg-neutral-900"
        >
          <div className="relative h-48 overflow-hidden">
            <Image
              src={article.coverImage}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60" />
          </div>

          <div className="flex grow flex-col p-5">
            <h2 className="mb-2 line-clamp-2 text-xl font-semibold text-slate-100 transition-colors group-hover:text-blue-400">
              {article.title}
            </h2>

            <p className="mb-4 line-clamp-3 grow text-sm text-slate-200">
              {article.description}
            </p>

            <div className="mt-auto flex items-center justify-between">
              <span className="text-sm text-slate-400">{article.date}</span>
              <span className="text-sm font-medium text-blue-400 transition group-hover:translate-x-1">
                Read more
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default ArticlesGrid
