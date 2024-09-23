import "@/styles/mdx-style.css"

import { Metadata } from "next"

import { siteConfig } from "@/config/site"
import TrainingAIArticleContentComponent from "@/components/body/TrainingAIArticleContentComponent"
import ArticleCore from "@/components/elements/ArticleCore"

// Define the article metadata (frontmatter)
export const metadata: Metadata = {
  title: `Can You Train Your Own Large Language Model? It's Easier Than You Think`,
  description:
    "Training your own LLM locally is not only feasible but essential for the future of small businesses.",
  keywords: [
    "LLM",
    "AI",
    "large language model",
    "small business",
    "multi-step reasoning",
    "data privacy",
    "local AI",
    "2024",
  ],
  openGraph: {
    title: `Can You Train Your Own Large Language Model? It's Easier Than You Think`,
    description:
      "Training your own LLM locally is not only feasible but essential for the future of small businesses.",
    url: `${siteConfig.url.base}/index/how-to-train-your-own-large-language-model-for-business-ai`,
    images: [
      {
        url: siteConfig.ogImage,
        alt: `${siteConfig.name} - Contact Us`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Can You Train Your Own Large Language Model? It's Easier Than You Think`,
    description:
      "Training your own LLM locally is not only feasible but essential for the future of small businesses.",
    images: [siteConfig.ogImage],
  },
}

const ArticlePage = () => {
  return (
    <>
      <ArticleCore
        audioSrc=""
        title="Can You Train Your Own Large Language Model? It's Easier Than You Think"
        description="Training your own LLM locally is not only feasible but essential for the future of small businesses."
        date="August 2nd, 2024"
        authorName="Dylan Safra"
        authorImage="/images/authors/dylan_s_author.jpg"
        keywords={[
          "LLM",
          "artificial intelligence",
          "large language model",
          "multi-step reasoning",
          "local AI",
        ]}
      />

      <TrainingAIArticleContentComponent />
    </>
  )
}

export default ArticlePage
