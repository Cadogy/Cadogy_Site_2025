"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { WP_Post } from "@/types/wordpress"
import {
  decodeHtml,
  extractExcerpt,
  formatDate,
  getAllPosts,
  PLACEHOLDER_IMAGE,
} from "@/lib/wordpress-api"

export default function FeaturedArticlesSection() {
  const [articles, setArticles] = useState<
    {
      title: string
      date: string
      description: string
      coverImage: string
      slug: string
    }[]
  >([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchArticles() {
      try {
        const posts = await getAllPosts()

        // Format WordPress posts to the format needed by our UI
        const formattedArticles = posts.map((post) => {
          const featuredImage =
            post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
            PLACEHOLDER_IMAGE

          return {
            title: decodeHtml(post.title.rendered),
            date: formatDate(post.date),
            description: extractExcerpt(post.excerpt.rendered),
            coverImage: featuredImage,
            slug: `/articles/${post.slug}`,
          }
        })

        setArticles(formattedArticles)
        setError(null)
      } catch (err) {
        console.error("Error fetching articles:", err)
        setError("Failed to load articles")
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [])

  if (loading) {
    return (
      <section className="mx-auto my-24 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-400">
            Knowledge Center
          </h2>
          <h3 className="text-3xl font-bold text-slate-100">
            Featured Articles
          </h3>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-slate-200">
            Explore our latest insights on cybersecurity, web development, and
            technological innovation.
          </p>
        </div>

        <div className="relative flex flex-col gap-10 lg:flex-row">
          {/* Left side loading skeleton */}
          <div className="w-full lg:w-7/12">
            {[1, 2].map((_, index) => (
              <div
                key={index}
                className="mb-16 overflow-hidden rounded-lg bg-neutral-900/50"
              >
                <div className="aspect-video w-full animate-pulse bg-neutral-800/70"></div>
                <div className="p-6">
                  <div className="mb-2 h-4 w-24 animate-pulse rounded bg-neutral-800/80"></div>
                  <div className="mb-3 h-8 w-full animate-pulse rounded bg-neutral-800/80"></div>
                  <div className="mb-2 h-4 w-full animate-pulse rounded bg-neutral-800/80"></div>
                  <div className="h-4 w-3/4 animate-pulse rounded bg-neutral-800/80"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Right side loading skeleton */}
          <div className="relative lg:w-5/12">
            <div className="lg:sticky lg:top-24 lg:pb-24">
              <div className="mb-6 h-6 w-32 animate-pulse rounded bg-neutral-800/80"></div>
              <div className="space-y-6">
                {[1, 2, 3].map((_, index) => (
                  <div
                    key={index}
                    className="flex overflow-hidden rounded-lg bg-neutral-900/50"
                  >
                    <div className="h-24 w-24 animate-pulse bg-neutral-800/70"></div>
                    <div className="flex-1 p-4">
                      <div className="mb-1 h-3 w-16 animate-pulse rounded bg-neutral-800/80"></div>
                      <div className="mb-2 h-5 w-full animate-pulse rounded bg-neutral-800/80"></div>
                      <div className="h-3 w-5/6 animate-pulse rounded bg-neutral-800/80"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="mx-auto my-24 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="p-8 text-center text-red-400">
          {error}. Please try refreshing the page.
        </div>
      </section>
    )
  }

  if (articles.length === 0) {
    return (
      <section className="mx-auto my-24 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="p-8 text-center text-slate-200">
          No articles found. Check back soon!
        </div>
      </section>
    )
  }

  return (
    <section className="mx-auto my-12 max-w-7xl px-4 sm:my-16 sm:px-6 md:my-20 lg:my-24 lg:px-8">
      <div className="mb-8 text-center sm:mb-12 md:mb-16">
        <h2 className="mb-1 text-xs font-semibold uppercase tracking-wide text-blue-400 sm:mb-2 sm:text-sm">
          Knowledge Center
        </h2>
        <h3 className="text-2xl font-bold text-slate-100 sm:text-3xl">
          Featured Articles
        </h3>
        <p className="mx-auto mt-2 max-w-2xl text-xs text-slate-200 sm:mt-4 sm:text-sm">
          Explore our latest insights on cybersecurity, web development, and
          technological innovation.
        </p>
      </div>

      <div className="relative flex flex-col gap-6 sm:gap-8 lg:flex-row lg:gap-10">
        {/* Main feature content - Left side */}
        <div className="w-full lg:w-7/12">
          {articles.length > 0 ? (
            articles.slice(0, 2).map((article, index) => (
              <div
                key={index}
                className="mb-6 overflow-hidden rounded-lg bg-neutral-900/50 sm:mb-10 md:mb-16"
              >
                <Link href={article.slug} className="group block">
                  <div className="aspect-video w-full overflow-hidden">
                    <div
                      className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                      style={{
                        backgroundImage: `url(${article.coverImage})`,
                      }}
                    />
                  </div>
                  <div className="p-4 sm:p-6">
                    <p className="mb-1 text-xs text-slate-400 sm:mb-2 sm:text-sm">
                      {article.date}
                    </p>
                    <h4 className="mb-2 text-lg font-medium text-slate-100 sm:mb-3 sm:text-xl md:text-2xl">
                      {article.title}
                    </h4>
                    <p className="text-xs text-slate-200 sm:text-sm">
                      {article.description}
                    </p>
                    <div className="mt-3 flex items-center text-blue-400 sm:mt-4">
                      <span className="text-xs font-medium sm:text-sm">
                        Read more
                      </span>
                      <ArrowRight className="ml-1 h-3 w-3 sm:ml-2 sm:h-4 sm:w-4" />
                    </div>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <div className="flex h-48 items-center justify-center rounded-lg bg-neutral-900/50 sm:h-64">
              <p className="text-center text-xs text-slate-400 sm:text-sm">
                New articles coming soon. Stay tuned!
              </p>
            </div>
          )}
        </div>

        {/* Sticky sidebar - Right side - Improve for mobile */}
        <div className="relative lg:w-5/12">
          <div className="lg:sticky lg:top-24 lg:pb-24">
            <h4 className="mb-4 text-base font-medium text-slate-100 sm:mb-6 sm:text-lg">
              More Articles
            </h4>
            <div className="space-y-4 sm:space-y-6">
              {articles.length > 0 ? (
                articles.map((article, index) => (
                  <div
                    key={index}
                    className="group relative overflow-hidden rounded-lg bg-neutral-900/50"
                  >
                    <Link href={article.slug} className="block">
                      <div className="flex flex-row">
                        {/* Image container with fixed aspect ratio */}
                        <div className="w-20 flex-shrink-0 sm:w-24 md:w-28">
                          <div
                            className="relative h-full w-full"
                            style={{ aspectRatio: "1/1" }}
                          >
                            <img
                              src={article.coverImage}
                              alt={article.title}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        </div>
                        <div className="flex flex-1 flex-col justify-center p-3 sm:p-4">
                          <p className="mb-1 text-xs text-slate-400">
                            {article.date}
                          </p>
                          <h5 className="line-clamp-2 text-sm font-medium text-slate-100 sm:text-base">
                            {article.title}
                          </h5>
                          <div className="mt-1 hidden text-xs text-slate-200 sm:line-clamp-1 md:line-clamp-2">
                            {article.description}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))
              ) : (
                <div className="rounded-lg bg-neutral-900/50 p-4 sm:p-6">
                  <p className="text-center text-xs text-slate-400 sm:text-sm">
                    More articles coming soon
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
