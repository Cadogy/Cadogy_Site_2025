import "@/styles/mdx-style.css"

import { Metadata } from "next"

import { siteConfig } from "@/config/site"
import NvidiaGPUArticleContentComponent from "@/components/body/NvidiaGPUArticleContentComponent"
import ArticleCore from "@/components/elements/ArticleCore"

export const metadata: Metadata = {
  title: `How GPU Technology Is Changing the Future`,
  description:
    "Nvidia's latest advancements in AI chips and GPU technology are setting the stage for a new era in artificial intelligence and machine learning.",
  keywords: ["Nvidia", "AI", "GPU", "technology", "machine learning"],
  openGraph: {
    title: `Nvidia’s AI Revolution: How GPU Technology Is Changing the Future`,
    description:
      "Nvidia's latest advancements in AI chips and GPU technology are setting the stage for a new era in artificial intelligence and machine learning.",
    url: `${siteConfig.url.base}/articles/nvidia-ai-revolution`,
    images: [
      {
        url: siteConfig.ogImage,
        alt: `${siteConfig.name} - Nvidia AI Revolution`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Nvidia’s AI Revolution: How GPU Technology Is Changing the Future`,
    description:
      "Nvidia's latest advancements in AI chips and GPU technology are setting the stage for a new era in artificial intelligence and machine learning.",
    images: [siteConfig.ogImage],
  },
}

const ArticlePage = () => {
  return (
    <>
      <ArticleCore
        audioSrc=""
        title="How GPU Technology Is Changing the Future"
        description="Nvidia's latest advancements in AI chips and GPU technology are setting the stage for a new era in artificial intelligence and machine learning."
        date="Sept 3rd, 2024"
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

      <NvidiaGPUArticleContentComponent />
    </>
  )
}

export default ArticlePage
