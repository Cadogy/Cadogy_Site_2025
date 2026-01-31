import { Metadata } from "next"
import { notFound } from "next/navigation"

import { siteConfig } from "@/config/site"
import {
  decodeHtml,
  extractExcerpt,
  formatDate,
  getAllPosts,
  getTags,
  PLACEHOLDER_IMAGE,
} from "@/lib/wordpress-api"
import ArticlesGrid from "@/components/elements/ArticlesGrid"
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema"

// Cache configuration - on-demand revalidation only
export const revalidate = false
export const fetchCache = "force-cache"
export const dynamicParams = true

// Generate metadata for the tag page
export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const tags = await getTags()
  const tag = tags.find((t) => t.slug === params.slug)

  if (!tag) {
    return {
      title: "Tag Not Found",
      description: "The tag you're looking for could not be found.",
    }
  }

  // Get posts for this tag to enhance metadata
  const allPosts = await getAllPosts()
  const posts = allPosts.filter((post) => post.tags.includes(tag.id))

  // Create enhanced description with post count
  const enhancedDescription = tag.description
    ? `${tag.description} - Browse ${tag.count} articles with this tag.`
    : `Explore our collection of ${tag.count} articles tagged with "${tag.name}".`

  // Get a featured image from the first post with this tag if available
  const featuredImage =
    posts[0]?._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
    siteConfig.ogImage

  // Get related tags by looking at tags from posts with this tag
  const relatedTagIds = posts
    .flatMap((post) => post.tags)
    .filter((id) => id !== tag.id)

  // Get unique related tags for keywords
  const relatedTags = tags
    .filter((t) => relatedTagIds.includes(t.id))
    .slice(0, 5)
    .map((t) => t.name)

  return {
    title: `Articles Tagged "${tag.name}" (${tag.count}) - ${siteConfig.name}`,
    description: enhancedDescription,
    keywords: [tag.name, ...relatedTags],
    openGraph: {
      title: `Articles Tagged "${tag.name}" - ${siteConfig.name}`,
      description: enhancedDescription,
      url: `${siteConfig.url.base}/articles/tag/${params.slug}`,
      images: [{ url: featuredImage }],
    },
    twitter: {
      card: "summary_large_image",
      title: `Articles Tagged "${tag.name}" - ${siteConfig.name}`,
      description: enhancedDescription,
      images: [featuredImage],
    },
  }
}

// Generate static paths for all tags
export async function generateStaticParams() {
  const tags = await getTags()

  return tags.map((tag) => ({
    slug: tag.slug,
  }))
}

export default async function TagPage({
  params,
}: {
  params: { slug: string }
}) {
  const tags = await getTags()
  const tag = tags.find((t) => t.slug === params.slug)

  if (!tag) {
    notFound()
  }

  // Get all posts
  const allPosts = await getAllPosts()

  // Filter posts that have this tag
  const posts = allPosts.filter((post) => post.tags.includes(tag.id))

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
      {/* SEO: Breadcrumb Schema */}
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Articles", url: "/articles" },
          { name: tag.name, url: `/articles/tag/${params.slug}` },
        ]}
      />

      <div className="mb-12 text-center">
        <span className="mb-4 inline-block rounded-md bg-blue-500/20 px-3 py-1 text-sm text-blue-400">
          #{tag.name}
        </span>
        <h1 className="mb-2 text-4xl font-bold text-slate-100">
          Articles Tagged &quot;{tag.name}&quot;
        </h1>
        {tag.description && (
          <p className="mx-auto max-w-3xl text-sm text-slate-200">
            {tag.description}
          </p>
        )}
      </div>

      {articles.length > 0 ? (
        <ArticlesGrid articles={articles} />
      ) : (
        <div className="my-20 text-center">
          <p className="text-lg text-slate-200">
            No articles found with this tag yet.
          </p>
        </div>
      )}
    </div>
  )
}
