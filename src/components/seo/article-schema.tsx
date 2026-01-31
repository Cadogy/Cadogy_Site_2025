interface ArticleSchemaProps {
  post: {
    title: string
    slug: string
    excerpt?: string
    content?: string
    date: string
    modified?: string
    featuredImage?: string
    author?: {
      name: string
    }
    categories?: Array<{ name: string }>
    tags?: Array<{ name: string }>
  }
}

export function ArticleSchema({ post }: ArticleSchemaProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.cadogy.com"

  // Clean excerpt/content for description
  const getDescription = () => {
    const text = post.excerpt || post.content || ""
    return text.replace(/<[^>]+>/g, "").substring(0, 160)
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": getDescription(),
    "image": post.featuredImage || `${baseUrl}/images/placeholder/article-placeholder.svg`,
    "datePublished": post.date,
    "dateModified": post.modified || post.date,
    "author": {
      "@type": "Person",
      "name": post.author?.name || "Cadogy Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Cadogy",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/images/assets/logos/cadogy-shield.svg`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${baseUrl}/articles/${post.slug}`
    },
    ...(post.categories && post.categories.length > 0 && {
      "articleSection": post.categories.map(cat => cat.name)
    }),
    ...(post.tags && post.tags.length > 0 && {
      "keywords": post.tags.map(tag => tag.name).join(", ")
    })
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
