import "@/styles/mdx-style.css"

import { Metadata } from "next"

import { siteConfig } from "@/config/site"
import PiracyArticleContentComponent from "@/components/body/PiracyArticleContentComponent"
import ArticleCore from "@/components/elements/ArticleCore"

// Define the article metadata (frontmatter)
export const metadata: Metadata = {
  title: `Can Piracy Be Stopped? Lessons from Real-World Anti-Piracy Efforts`,
  description:
    "Based on practical experiences in anti-piracy, we explore the realistic steps and technology required to combat digital piracy.",
  keywords: [
    "Piracy prevention",
    "Digital rights",
    "Content protection",
    "Fingerprinting",
    "Intellectual property",
  ],
  openGraph: {
    title: `Can Piracy Be Stopped? Lessons from Real-World Anti-Piracy Efforts`,
    description:
      "Based on practical experiences in anti-piracy, we explore the realistic steps and technology required to combat digital piracy.",
    url: `${siteConfig.url.base}/articles/can-piracy-be-stopped`,
    images: [
      {
        url: siteConfig.ogImage,
        alt: `${siteConfig.name} - Can Piracy Be Stopped`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Can Piracy Be Stopped? Lessons from Real-World Anti-Piracy Efforts`,
    description:
      "Based on practical experiences in anti-piracy, we explore the realistic steps and technology required to combat digital piracy.",
    images: [siteConfig.ogImage],
  },
}

const ArticlePage = () => {
  return (
    <>
      <ArticleCore
        audioSrc="/article-audio/can-piracy-be-stopped/can-piracy-be-stopped_enhanced.mp3"
        title="Can Piracy Be Stopped? Lessons from Real-World Anti-Piracy Efforts"
        description="Based on practical experiences in anti-piracy, we explore the realistic steps and technology required to combat digital piracy."
        date="September 19th, 2024"
        authorName="Charles Knapp"
        authorImage="/images/authors/charles_k_author.jpg"
        keywords={[
          "Piracy prevention",
          "Digital rights",
          "Content protection",
          "Fingerprinting",
          "Intellectual property",
        ]}
      />

      <PiracyArticleContentComponent />
    </>
  )
}

export default ArticlePage
