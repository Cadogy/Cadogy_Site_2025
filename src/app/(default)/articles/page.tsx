import fs from "fs"
import path from "path"
import Link from "next/link"
import matter from "gray-matter"

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

  return (
    <div className="container mx-auto py-16">
      <h1 className="mb-8 text-center text-4xl">Our Articles</h1>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-1 lg:grid-cols-1">
        {posts.map((post) => (
          <Link
            className="block transform rounded-sm bg-white/10 p-6 shadow-md transition-transform"
            key={post.slug}
            href={`/articles/${post.slug}`}
          >
            {post.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={post.image}
                alt={post.title}
                className="mb-4 h-40 w-full rounded-lg object-cover"
              />
            )}
            <h2 className="mb-2 text-2xl font-semibold">{post.title}</h2>
            <p className="mb-4 text-gray-500">{post.date}</p>
            <p className="text-gray-700">{post.description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
