import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import { siteConfig } from "@/config/site"
import {
  decodeHtml,
  formatDate,
  getAllPosts,
  getPostBySlug,
  PLACEHOLDER_IMAGE,
} from "@/lib/wordpress-api"
import ArticleCore from "@/components/elements/ArticleCore"

// Generate metadata for each post
export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    return {
      title: "Article Not Found",
      description: "The article you're looking for could not be found.",
    }
  }

  const title = decodeHtml(post.title.rendered)
  const description = decodeHtml(
    post.excerpt.rendered.replace(/<[^>]+>/g, "").slice(0, 160)
  )

  return {
    title,
    description,
    keywords: post._embedded?.["wp:term"]?.[1]?.map((tag) => tag.name) || [],
    openGraph: {
      title,
      description,
      url: `${siteConfig.url.base}/articles/${params.slug}`,
      images: post._embedded?.["wp:featuredmedia"]?.[0]?.source_url
        ? [{ url: post._embedded?.["wp:featuredmedia"]?.[0]?.source_url }]
        : [{ url: siteConfig.ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: post._embedded?.["wp:featuredmedia"]?.[0]?.source_url
        ? [post._embedded?.["wp:featuredmedia"]?.[0]?.source_url]
        : [siteConfig.ogImage],
    },
  }
}

// Generate static routes for all posts
export async function generateStaticParams() {
  const posts = await getAllPosts()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function ArticlePage({
  params,
}: {
  params: { slug: string }
}) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  // Extract author information
  const author = post._embedded?.author?.[0] || null
  const authorName = author?.name || "Cadogy Team"
  const authorImage =
    author?.avatar_urls?.["96"] || "/images/avatar-placeholder.jpg"

  // Extract categories and tags
  const categories = post._embedded?.["wp:term"]?.[0] || []
  const tags = post._embedded?.["wp:term"]?.[1] || []

  // Featured image
  const featuredImage =
    post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || PLACEHOLDER_IMAGE

  // Decode title and content
  const title = decodeHtml(post.title.rendered)
  const description = decodeHtml(post.excerpt.rendered.replace(/<[^>]+>/g, ""))
  const content = post.content.rendered.replace(
    /(<[^>]+>|&#8217;|&#8216;|&#8211;|&#8212;|&hellip;|&#8230;)/g,
    (match) => {
      return match.startsWith("<") ? match : decodeHtml(match)
    }
  )

  return (
    <>
      <ArticleCore
        audioSrc=""
        title={title}
        description={description}
        date={formatDate(post.date)}
        authorName={authorName}
        authorImage={authorImage}
        keywords={tags.map((tag) => tag.name)}
      />

      <div className="mx-auto max-w-4xl px-4 pb-20 pt-8">
        {/* Featured Image */}
        {featuredImage && (
          <div className="mb-10 overflow-hidden rounded-lg">
            <Image
              src={featuredImage}
              alt={title}
              width={1200}
              height={630}
              className="w-full"
              priority
            />
          </div>
        )}

        {/* Categories */}
        {categories.length > 0 && (
          <div className="mb-6 flex flex-wrap gap-2">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/articles/category/${category.slug}`}
                className="rounded-full bg-blue-500/20 px-3 py-1 text-sm text-blue-400 transition hover:bg-blue-500/30"
              >
                {category.name}
              </Link>
            ))}
          </div>
        )}

        {/* Content */}
        <div
          className="wp-content text-sm text-slate-200"
          dangerouslySetInnerHTML={{ __html: content }}
        />

        {/* Tags */}
        {tags.length > 0 && (
          <div className="mt-10 border-t border-neutral-800 pt-6">
            <h3 className="mb-3 text-lg font-medium text-slate-100">
              Related Topics
            </h3>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Link
                  key={tag.id}
                  href={`/articles/tag/${tag.slug}`}
                  className="rounded-full bg-neutral-800 px-3 py-1 text-sm text-slate-200 transition hover:bg-neutral-700"
                >
                  #{tag.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
