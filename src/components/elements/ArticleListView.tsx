"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Calendar } from "lucide-react"

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
    <div className="flex flex-col gap-6">
      {articles.map((article, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-lg bg-neutral-900/50 transition hover:bg-neutral-900/80"
        >
          <Link href={article.slug} className="flex flex-col md:flex-row">
            {/* Image (wider on mobile, fixed width on desktop) */}
            <div className="relative h-48 w-full md:h-auto md:w-64 md:flex-shrink-0">
              <Image
                src={article.coverImage}
                alt={article.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 256px"
              />
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col justify-between p-6">
              <div>
                <div className="mb-2 flex items-center gap-2 text-sm text-slate-400">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{article.date}</span>
                </div>
                <h3 className="mb-3 text-xl font-medium text-slate-100 md:text-2xl">
                  {article.title}
                </h3>
                <p className="text-sm text-slate-200">{article.description}</p>
              </div>

              <div className="mt-6 flex items-center text-blue-400">
                <span className="text-sm font-medium">Read article</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  )
}
