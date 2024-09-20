import { getArticles } from "@/lib/articles" // Function to fetch articles
import ArticlesHero from "@/components/elements/ArticlesHero"

export default function Articles() {
  const articles = getArticles() // Fetch article data, including cover images

  return (
    <>
      <ArticlesHero articles={articles} /> {/* Pass only articles */}
    </>
  )
}
