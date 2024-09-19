import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { MDXRemote } from "next-mdx-remote/rsc"

import MDXLayout from "../mdx-layout"

export async function generateStaticParams() {
  const files = fs.readdirSync(path.join(process.cwd(), "content/posts"))
  return files.map((fileName) => ({
    slug: fileName.replace(".mdx", ""),
  }))
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const filePath = path.join(process.cwd(), "content/posts", `${slug}.mdx`)
  const source = fs.readFileSync(filePath, "utf8")
  const { content, data } = matter(source)

  return (
    <MDXLayout
      title={data.title}
      date={data.date}
      description={data.description}
      keywords={data.keywords}
      image={data.image}
    >
      <MDXRemote source={content} />
    </MDXLayout>
  )
}
