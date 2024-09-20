import ArticlesCategoryList from "@/components/elements/ArticlesCategoryList"
import ArticlesHero from "@/components/elements/ArticlesHero";
import { getArticles } from "@/lib/articles"; // Function to fetch articles

export default function Articles() {
  const articles = getArticles(); // Fetch article data, including cover images

  return (
    <>
      <ArticlesHero articles={articles} /> {/* Pass only articles */}
      <ArticlesCategoryList />
    </>
  )
}