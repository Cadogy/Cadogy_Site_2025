import { Metadata } from "next"
import { notFound } from "next/navigation"

import { siteConfig } from "@/config/site"
import {
  decodeHtml,
  extractExcerpt,
  formatDate,
  getAllPosts,
  getCategories,
  PLACEHOLDER_IMAGE,
} from "@/lib/wordpress-api"
import ArticlesGrid from "@/components/elements/ArticlesGrid"

// Generate metadata for the category page
export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const categories = await getCategories()
  const category = categories.find((cat) => cat.slug === params.slug)

  if (!category) {
    return {
      title: "Category Not Found",
      description: "The category you're looking for could not be found.",
    }
  }

  // Get posts for this category to enhance metadata
  const allPosts = await getAllPosts()
  const posts = allPosts.filter((post) => post.categories.includes(category.id))

  // Create enhanced description with post count
  const enhancedDescription = category.description
    ? `${category.description} - Browse ${category.count} articles in this category.`
    : `Browse our collection of ${category.count} articles about ${category.name}.`

  // Get a featured image from the first post in this category if available
  const featuredImage =
    posts[0]?._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
    siteConfig.ogImage

  // Get post titles for keywords
  const postTitles = posts
    .slice(0, 5)
    .map((post) =>
      decodeHtml(post.title.rendered)
        .split(" ")
        .filter((word) => word.length > 3)
    )
    .flat()

  // Get unique keywords
  const uniqueKeywords = [...new Set([category.name, ...postTitles])].slice(
    0,
    10
  )

  return {
    title: `${category.name} Articles (${category.count})`,
    description: enhancedDescription,
    keywords: uniqueKeywords,
    openGraph: {
      title: `${category.name} Articles - ${siteConfig.name}`,
      description: enhancedDescription,
      url: `${siteConfig.url.base}/articles/category/${params.slug}`,
      images: [{ url: featuredImage }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${category.name} Articles - ${siteConfig.name}`,
      description: enhancedDescription,
      images: [featuredImage],
    },
  }
}

// Generate static paths for all categories
export async function generateStaticParams() {
  const categories = await getCategories()

  return categories.map((category) => ({
    slug: category.slug,
  }))
}

export default async function CategoryPage({
  params,
}: {
  params: { slug: string }
}) {
  const categories = await getCategories()
  const category = categories.find((cat) => cat.slug === params.slug)

  if (!category) {
    notFound()
  }

  // Get all posts
  const allPosts = await getAllPosts()

  // Filter posts that belong to this category
  const posts = allPosts.filter((post) => post.categories.includes(category.id))

  // Format the posts for the ArticlesGrid component
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

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h1 className="mb-2 text-4xl font-bold text-slate-100">
          {category.name}
        </h1>
        {category.description && (
          <p className="mx-auto max-w-3xl text-sm text-slate-200">
            {category.description}
          </p>
        )}
      </div>

      {articles.length > 0 ? (
        <ArticlesGrid articles={articles} />
      ) : (
        <div className="my-20 text-center">
          <p className="text-lg text-slate-200">
            No articles found in this category yet.
          </p>
        </div>
      )}
    </div>
  )
}
