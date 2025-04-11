import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { siteConfig } from "@/config/site"
import {
  decodeHtml,
  formatDate,
  getAllPosts,
  getPostBySlug,
  PLACEHOLDER_IMAGE,
  preventImageCaching,
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

  const title = decodeHtml(post.title.rendered) + " - " + siteConfig.name
  const description = decodeHtml(
    post.excerpt.rendered.replace(/<[^>]+>/g, "").slice(0, 160)
  )

  // Get featured image with cache busting
  const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url
    ? preventImageCaching(post._embedded?.["wp:featuredmedia"]?.[0]?.source_url)
    : siteConfig.ogImage

  return {
    title,
    description,
    keywords: post._embedded?.["wp:term"]?.[1]?.map((tag) => tag.name) || [],
    openGraph: {
      title,
      description,
      url: `${siteConfig.url.base}/articles/${params.slug}`,
      images: [{ url: featuredImage }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [featuredImage],
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

  // Featured image with cache busting
  let featuredImage =
    post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || PLACEHOLDER_IMAGE
  
  // Apply cache busting to the featured image
  featuredImage = preventImageCaching(featuredImage)

  // Decode title and content
  const title = decodeHtml(post.title.rendered)
  const description = decodeHtml(post.excerpt.rendered.replace(/<[^>]+>/g, ""))
  const content = post.content.rendered.replace(
    /(<[^>]+>|&#8217;|&#8216;|&#8211;|&#8212;|&hellip;|&#8230;)/g,
    (match) => {
      return match.startsWith("<") ? match : decodeHtml(match)
    }
  )

  // Process content to add cache busting to image src attributes
  const processedContent = content.replace(
    /<img[^>]+src="([^"]+)"/g,
    (match, src) => {
      const processedSrc = preventImageCaching(src)
      return match.replace(src, processedSrc)
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
        keywordIds={tags.map((tag) => tag.id)}
        featuredImage={featuredImage}
      />

      <div className="container mx-auto max-w-4xl px-4 pb-20">
        {/* Categories */}
        {categories.length > 0 && (
          <div className="mb-8 flex flex-wrap gap-2">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/articles?category=${category.id}&page=1`}
                className="rounded-md bg-blue-500/20 px-3 py-1 text-sm text-blue-300 transition hover:bg-blue-500/30"
              >
                {category.name}
              </Link>
            ))}
          </div>
        )}

        {/* Content */}
        <article
          className="wordpress-content prose prose-invert /*
            Typography - more WordPress-like size scale and spacing */ prose-headings:font-medium
            prose-headings:tracking-tight prose-h1:text-4xl 
            prose-h1:mb-8 prose-h1:mt-10 prose-h1:font-bold prose-h1:text-slate-50 prose-h2:text-3xl
            prose-h2:mb-6 prose-h2:mt-10 prose-h2:font-bold prose-h2:text-slate-100 prose-h3:text-2xl
            prose-h3:mb-5 prose-h3:mt-8 prose-h3:font-medium prose-h3:text-slate-200 prose-h4:text-xl
            prose-h4:mb-4 prose-h4:mt-6 prose-h4:font-medium prose-h5:text-lg
            prose-h5:mb-4 prose-h5:mt-6 prose-h5:font-medium prose-h6:text-base
            prose-h6:mb-4 prose-h6:mt-6 prose-h6:font-medium prose-h6:uppercase /*
            
            Paragraph and body text */ prose-p:text-slate-300
            prose-p:text-[17px] prose-p:leading-relaxed prose-p:my-5 /*
            
            Links and formatting */ prose-a:text-blue-400
            prose-a:no-underline hover:prose-a:text-blue-300 prose-a:transition-colors prose-strong:text-slate-200
            prose-strong:font-bold prose-em:text-slate-300
            prose-em:italic /*
            
            Code blocks */ prose-code:bg-neutral-800
            prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-pre:bg-neutral-900
            prose-pre:border prose-pre:border-neutral-800 prose-pre:p-4 prose-pre:rounded-md prose-pre:overflow-auto /*
            
            Lists */ prose-ol:pl-8
            prose-ol:my-6 prose-ol:text-slate-300 prose-ul:pl-8
            prose-ul:my-6 prose-ul:text-slate-300 prose-li:my-3
            prose-li:marker:text-slate-400 /*
            
            Quotes and callouts */ prose-blockquote:border-l-4
            prose-blockquote:border-blue-800 prose-blockquote:pl-6
            prose-blockquote:py-2 prose-blockquote:italic prose-blockquote:text-slate-300
            prose-blockquote:bg-neutral-900/50 prose-blockquote:my-8
            prose-blockquote:rounded-md /*
            
            Images and media */ prose-img:rounded-md
            prose-img:my-10 prose-img:mx-auto prose-img:shadow-lg
            prose-img:max-w-full prose-img:h-auto /*
            
            Horizontal rule */ prose-hr:border-neutral-700
            prose-hr:my-12 /*
            
            Tables */ prose-table:border-collapse
            prose-table:w-full prose-table:my-10 prose-th:bg-neutral-800
            prose-th:p-3 prose-th:text-slate-200 prose-th:text-left prose-td:border
            prose-td:border-neutral-700 prose-td:p-3 /*
            
            Figures and captions */ prose-figure:my-12
            prose-figure:mx-auto prose-figcaption:text-center
            prose-figcaption:text-sm prose-figcaption:italic 
            prose-figcaption:text-slate-400 prose-figcaption:mt-3 max-w-none"
          dangerouslySetInnerHTML={{ __html: processedContent }}
        />
      </div>
    </>
  )
}
