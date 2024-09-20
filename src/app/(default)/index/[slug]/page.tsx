import fs from "fs"
import path from "path"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import matter from "gray-matter"
import { MDXRemote } from "next-mdx-remote/rsc"

import MDXLayout from "../mdx-layout"

const postsDirectory = path.join(process.cwd(), "content/posts")

// Use generateStaticParams to define the dynamic routes for MDX pages
export async function generateStaticParams() {
  const files = fs.readdirSync(postsDirectory)
  return files.map((fileName) => ({
    slug: fileName.replace(".mdx", ""),
  }))
}

// Use generateMetadata to define metadata for each MDX page
export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const { slug } = params
  const filePath = path.join(postsDirectory, `${slug}.mdx`)

  if (!fs.existsSync(filePath)) {
    return {
      title: "Not Found",
      description: "The page you're looking for does not exist.",
    }
  }

  const source = fs.readFileSync(filePath, "utf8")
  const { data } = matter(source) // Extract frontmatter

  return {
    title: data.title,
    description: data.description,
    openGraph: {
      title: data.title,
      description: data.description,
      images: [
        {
          url: data.image,
          alt: data.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: data.title,
      description: data.description,
      images: [data.image],
    },
  }
}

// Dynamic MDX page
export default async function BlogPostPage({
  params,
}: {
  params: { slug: string }
}) {
  const { slug } = params
  const filePath = path.join(postsDirectory, `${slug}.mdx`)

  if (!fs.existsSync(filePath)) {
    notFound() // Return a 404 page if the file doesn't exist
  }

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
