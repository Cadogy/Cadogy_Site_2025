import fs from "fs"
import path from "path"
import matter from "gray-matter"

const postsDirectory = path.join(process.cwd(), "content/posts") // Path to your MDX files

export function getArticles() {
  const fileNames = fs.readdirSync(postsDirectory)
  const allArticlesData = fileNames.map((fileName) => {
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, "utf8")

    const { data } = matter(fileContents) // Parse frontmatter from MDX

    // Get the slug (either from the frontmatter or file name)
    const slug = data.slug || fileName.replace(/\.mdx?$/, "") // Use 'slug' frontmatter if available, else file name

    return {
      title: data.title,
      date: data.date,
      description: data.description,
      coverImage: `/images/slide_${fileNames.indexOf(fileName) + 1}_bg.jpg`, // Dynamically assign a cover image
      slug: `/articles/${slug}`, // Generate slug link
    }
  })

  return allArticlesData
}
