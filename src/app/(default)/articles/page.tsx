import { Metadata, ResolvingMetadata } from "next"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import {
  decodeHtml,
  extractExcerpt,
  formatDate,
  getCategories,
  getPosts,
  getTags,
  PLACEHOLDER_IMAGE,
} from "@/lib/wordpress-api"
import ArticleFilterMenu from "@/components/elements/ArticleFilterMenu"
import ArticleListView from "@/components/elements/ArticleListView"
import ArticlePagination from "@/components/elements/ArticlePagination"
import ArticleSearch from "@/components/elements/ArticleSearch"
import ArticleGrid from "@/components/elements/ArticlesGrid"
import ArticlesHero from "@/components/elements/ArticlesHero"
import ArticleViewToggle from "@/components/elements/ArticleViewToggle"

// Generate metadata for the Articles page
export async function generateMetadata(
  {},
  parent: ResolvingMetadata
): Promise<Metadata> {
  // Get the parent metadata
  const parentMetadata = await parent

  // Fetch basic data to enhance metadata
  const { totalPosts } = await getPosts({ page: 1, perPage: 1 })
  const tags = await getTags()

  // Get top tags for keywords
  const topTags = tags
    .filter((tag) => tag.count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, 6)
    .map((tag) => tag.name)

  // Create dynamic description
  const description = `Explore our collection of ${totalPosts} articles providing insights and knowledge on topics including ${topTags.slice(0, 3).join(", ")}, and more.`

  // Merge with parent metadata where appropriate
  return {
    title: `Articles - ${siteConfig.name}`,
    description,
    keywords: ["articles", ...topTags, "insights", "knowledge"],
    openGraph: {
      ...(parentMetadata.openGraph || {}),
      title: `Articles - ${siteConfig.name}`,
      description,
      url: `${siteConfig.url.base}/articles`,
      images: [
        {
          url: siteConfig.ogImage,
          alt: `${siteConfig.name} - Articles`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Articles - ${siteConfig.name}`,
      description,
      images: [siteConfig.ogImage],
    },
  }
}

export default async function Articles({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  // Extract search parameters
  const page = parseInt((searchParams.page as string) || "1", 10)
  const perPage = 9
  const search = (searchParams.search as string) || ""
  const categoryId = (searchParams.category as string) || ""
  const tagId = (searchParams.tag as string) || ""
  const view = (searchParams.view as string) || "grid"

  // Fetch posts, categories, and tags from WordPress
  const [{ posts, totalPages, totalPosts }, categories, tags] =
    await Promise.all([
      getPosts({ page, perPage, search, categoryId, tagId }),
      getCategories(),
      getTags(),
    ])

  // Filter out the "Uncategorized" category
  const filteredCategories = categories.filter(
    (category) => category.name.toLowerCase() !== "uncategorized"
  )

  // Get featured articles for the hero section (always get latest 3 regardless of filters)
  const featuredArticlesData = await getPosts({ page: 1, perPage: 3 })
  const featuredArticles = featuredArticlesData.posts.map((post) => {
    const featuredImage =
      post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || PLACEHOLDER_IMAGE

    return {
      title: decodeHtml(post.title.rendered),
      date: formatDate(post.date),
      description: extractExcerpt(post.excerpt.rendered),
      coverImage: featuredImage,
      slug: `/articles/${post.slug}`,
    }
  })

  // Map WordPress posts to the format expected by the article components
  const articles = posts.map((post) => {
    const featuredImage =
      post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || PLACEHOLDER_IMAGE

    return {
      title: decodeHtml(post.title.rendered),
      date: formatDate(post.date),
      description: extractExcerpt(post.excerpt.rendered),
      coverImage: featuredImage,
      slug: `/articles/${post.slug}`,
    }
  })

  // Create informative title based on search/filter
  let resultsTitle = "All Articles"
  if (search) {
    resultsTitle = `Search Results: "${search}"`
  } else if (categoryId) {
    const category = categories.find((cat) => cat.id.toString() === categoryId)
    if (category) {
      resultsTitle = `Category: ${category.name}`
    }
  } else if (tagId) {
    const tag = tags.find((t) => t.id.toString() === tagId)
    if (tag) {
      resultsTitle = `Tagged: #${tag.name}`
    }
  }

  return (
    <div className="mx-auto max-w-[94%] px-4 py-16 sm:px-6 md:max-w-[90%] lg:px-8">
      {/* Main Content Area with Sidebar */}
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Sidebar - Hidden on mobile, visible on lg screens and up */}
        <div className="hidden w-full lg:block lg:w-1/4">
          <div className="lg:sticky lg:top-24">
            <div className="rounded-lg bg-neutral-900/50 p-6">
              {/* Search - now functional */}
              <ArticleSearch />

              {/* Categories */}
              <div className="mb-6 border-t border-neutral-800 pt-6">
                <h4 className="mb-3 text-lg font-medium text-slate-100">
                  Categories
                </h4>
                <ul className="space-y-2">
                  {filteredCategories.map((category) => (
                    <li key={category.id}>
                      <Link
                        href={`/articles?category=${category.id}&page=1`}
                        className={`flex items-center justify-between text-sm transition hover:text-blue-400 ${
                          categoryId === category.id.toString()
                            ? "text-blue-400"
                            : "text-slate-200"
                        }`}
                      >
                        <span>{category.name}</span>
                        <span className="rounded-md bg-neutral-800 px-2 py-0.5 text-xs text-slate-400">
                          {category.count}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Popular Tags */}
              <div className="border-t border-neutral-800 pt-6">
                <h4 className="mb-3 text-lg font-medium text-slate-100">
                  Popular Tags
                </h4>
                <div className="flex flex-wrap gap-2">
                  {tags
                    .filter((tag) => tag.count > 0)
                    .slice(0, 10)
                    .map((tag) => (
                      <Link
                        key={tag.id}
                        href={`/articles?tag=${tag.id}&page=1`}
                        className={`rounded-full px-3 py-1 text-xs transition hover:bg-neutral-700 ${
                          tagId === tag.id.toString()
                            ? "bg-blue-500/20 text-blue-400"
                            : "bg-neutral-800 text-slate-200"
                        }`}
                      >
                        #{tag.name}
                      </Link>
                    ))}
                </div>
              </div>

              {/* Statistics */}
              <div className="mt-6 border-t border-neutral-800 pt-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Total articles:</span>
                  <span className="font-medium text-slate-200">
                    {totalPosts}
                  </span>
                </div>
              </div>

              {/* Clear Filters - only show if filters are applied */}
              {(search || categoryId || tagId) && (
                <div className="mt-6 border-t border-neutral-800 pt-6">
                  <Link
                    href="/articles"
                    className="inline-block w-full rounded-md bg-neutral-800 px-4 py-2 text-center text-sm font-medium text-slate-200 transition hover:bg-neutral-700"
                  >
                    Clear All Filters
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* All Articles */}
        <div className="w-full lg:w-3/4">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col">
              <h2 className="text-2xl font-bold text-slate-100">
                {resultsTitle}
              </h2>
              {totalPosts > 0 && (
                <p className="mt-1 text-sm text-slate-400">
                  Showing {articles.length} of {totalPosts} articles
                </p>
              )}
            </div>

            <div className="flex w-full items-center justify-between sm:w-auto sm:gap-2">
              {/* Filter Button - Only show on mobile/tablet */}
              <div className="lg:hidden">
                <ArticleFilterMenu
                  categories={filteredCategories}
                  tags={tags}
                  currentCategoryId={categoryId}
                  currentTagId={tagId}
                  totalPosts={totalPosts}
                  hasActiveFilters={!!(search || categoryId || tagId)}
                />
              </div>

              {/* View Toggle - now functional */}
              <ArticleViewToggle />
            </div>
          </div>

          {/* Articles in either Grid or List view */}
          {articles.length > 0 ? (
            view === "grid" ? (
              <ArticleGrid articles={articles} />
            ) : (
              <ArticleListView articles={articles} />
            )
          ) : (
            <div className="flex h-64 items-center justify-center rounded-lg bg-neutral-900/50">
              <p className="text-center text-slate-400">
                No articles found. Try adjusting your search criteria.
              </p>
            </div>
          )}

          {/* Pagination - now functional */}
          <ArticlePagination currentPage={page} totalPages={totalPages} />
        </div>
      </div>
    </div>
  )
}
