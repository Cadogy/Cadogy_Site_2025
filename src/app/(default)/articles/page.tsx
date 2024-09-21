import { Metadata } from "next"

import { siteConfig } from "@/config/site"
import { getArticles } from "@/lib/articles" // Function to fetch articles
import ArticlesHero from "@/components/elements/ArticlesHero"

// Export metadata for the "Articles" page
export const metadata: Metadata = {
  title: `Articles`,
  description:
    "Explore our collection of articles providing insights and knowledge on various topics including technology, business, and innovation.",
  keywords: [
    "articles",
    "technology",
    "business",
    "innovation",
    "insights",
    "knowledge",
  ],
  openGraph: {
    title: `Articles - Cadogy`,
    description:
      "Browse our curated articles covering topics like technology, business innovations, and industry trends.",
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
    title: `Articles - Cadogy`,
    description:
      "Stay updated with our latest articles on technology, business, and innovations.",
    images: [siteConfig.ogImage],
  },
}

export default function Articles() {
  const articles = getArticles() // Fetch article data, including cover images

  return (
    <>
      <ArticlesHero articles={articles} /> {/* Pass only articles */}
    </>
  )
}
