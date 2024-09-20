import fs from "fs"
import path from "path"
import { useMemo } from "react"
import Link from "next/link"
import matter from "gray-matter"

// Map specific keywords to broader categories
const keywordCategoryMap: { [key: string]: string } = {
  piracy: "Technology",
  software: "Technology",
  coding: "Technology",
  business: "Business",
  marketing: "Business",
  design: "Design",
  creative: "Design",
  "web development": "Technology",
  ux: "Design",
  ui: "Design",
  startup: "Business",
}

// Function to determine the category of a post based on its title
function determineCategory(title: string): string {
  const lowerCaseTitle = title.toLowerCase()
  const keywords = lowerCaseTitle.split(" ")

  for (let i = 0; i < keywords.length; i++) {
    const keyword = keywords[i]
    if (keywordCategoryMap[keyword]) {
      return keywordCategoryMap[keyword]
    }
  }

  // Fallback to "Uncategorized" if no keyword is matched
  return "Uncategorized"
}

// Function to generate categories based on the post titles
function categorizePosts(posts: Array<{ title: string }>) {
  const categories: { [category: string]: any[] } = {}

  posts.forEach((post) => {
    const category = determineCategory(post.title)

    if (!categories[category]) {
      categories[category] = []
    }

    categories[category].push(post)
  })

  return categories
}

export default function Articles() {
  const postsDirectory = path.join(process.cwd(), "content/posts")
  const files = fs.readdirSync(postsDirectory)

  const posts = files.map((fileName) => {
    const filePath = path.join(postsDirectory, fileName)
    const source = fs.readFileSync(filePath, "utf8")
    const { data } = matter(source)

    return {
      slug: fileName.replace(".mdx", ""),
      title: data.title,
      date: data.date,
      description: data.description,
      image: data.image,
    }
  })

  // Automatically categorize the posts based on their titles
  const categorizedPosts = useMemo(() => categorizePosts(posts), [posts])

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="mb-8 text-center text-5xl font-bold">
        Explore Our Articles
      </h1>

      {Object.keys(categorizedPosts).map((category) => (
        <section key={category} className="mb-16">
          <h2 className="mb-6 text-3xl font-semibold capitalize text-gray-800">
            {category === "Uncategorized" ? "Other Articles" : category}
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {categorizedPosts[category].map((post) => (
              <Link
                className="block transform overflow-hidden rounded-lg bg-white shadow-lg transition-transform hover:scale-105"
                key={post.slug}
                href={`/index/${post.slug}`}
              >
                {post.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={post.image}
                    alt={post.title}
                    className="mb-4 h-48 w-full rounded-t-lg object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="mb-2 text-xl font-semibold">{post.title}</h3>
                  <p className="mb-4 text-sm text-gray-500">{post.date}</p>
                  <p className="line-clamp-2 text-gray-700">
                    {post.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
