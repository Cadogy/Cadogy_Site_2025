"use client"

import Link from "next/link"
import { ArrowRight, Calendar, ChevronRight } from "lucide-react"

interface Article {
  title: string
  date: string
  description: string
  coverImage: string
  slug: string
}

interface ArticleListViewProps {
  articles: Article[]
}

export default function ArticleListView({ articles }: ArticleListViewProps) {
  if (articles.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center rounded-lg bg-neutral-900/50">
        <p className="text-center text-slate-400">No articles found.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col divide-y divide-neutral-800">
      {articles.map((article, index) => (
        <div
          key={index}
          className="w-full py-4 transition hover:bg-neutral-900/20 sm:py-5"
        >
          <Link
            href={article.slug}
            className="flex items-center justify-between gap-4 px-2"
          >
            <div className="flex-1">
              <h3 className="mb-2 line-clamp-1 text-base font-medium text-slate-100 md:text-xl">
                {article.title}
              </h3>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 md:text-sm">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{article.date}</span>
                </div>
                <p className="line-clamp-1 text-xs text-slate-400 md:text-sm">
                  {article.description}
                </p>
              </div>
            </div>
            <ChevronRight className="ml-2 h-5 w-5 flex-shrink-0 text-slate-400" />
          </Link>
        </div>
      ))}
    </div>
  )
}
