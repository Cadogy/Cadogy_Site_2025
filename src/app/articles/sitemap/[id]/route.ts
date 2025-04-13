import { MetadataRoute } from "next"
import { NextRequest, NextResponse } from "next/server"

import { env } from "@/env.mjs"
import { getAllPosts, getCategories, getTags } from "@/lib/wordpress-api"

const baseUrl = env.NEXT_PUBLIC_APP_URL || "https://www.cadogy.com"
const CHUNK_SIZE = 5000 // Lower than 50,000 to be safe

// Function to get posts for a specific chunk
async function getPostsChunk(chunkId: number) {
  const posts = await getAllPosts()
  const start = chunkId * CHUNK_SIZE
  const end = Math.min(start + CHUNK_SIZE, posts.length)
  return posts.slice(start, end)
}

// Helper function to generate XML sitemap content
function generateSitemapXml(entries: MetadataRoute.Sitemap): string {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (entry) => `  <url>
    <loc>${entry.url}</loc>
    ${
      entry.lastModified
        ? `<lastmod>${
            entry.lastModified instanceof Date
              ? entry.lastModified.toISOString()
              : entry.lastModified
          }</lastmod>`
        : ""
    }
    ${entry.changeFrequency ? `<changefreq>${entry.changeFrequency}</changefreq>` : ""}
    ${entry.priority ? `<priority>${entry.priority}</priority>` : ""}
  </url>`
  )
  .join("\n")}
</urlset>`
  return sitemap
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    console.log(`🗺️ Generating articles sitemap chunk ${params.id}...`)
    const chunkId = parseInt(params.id, 10)

    // Get posts for this chunk
    const posts = await getPostsChunk(chunkId)
    console.log(`📝 Processing ${posts.length} posts for chunk ${chunkId}`)

    // Only include categories and tags in the first chunk
    let categoryEntries: MetadataRoute.Sitemap = []
    let tagEntries: MetadataRoute.Sitemap = []

    if (chunkId === 0) {
      const [categories, tags] = await Promise.all([getCategories(), getTags()])

      const currentDate = new Date().toISOString()

      // Create sitemap entries for category pages
      categoryEntries = categories
        .filter(
          (category) =>
            category.count > 0 &&
            category.name.toLowerCase() !== "uncategorized"
        )
        .map((category) => ({
          url: `${baseUrl}/articles/category/${category.slug}`,
          lastModified: currentDate,
          changeFrequency: "weekly" as const,
          priority: 0.6,
        }))

      console.log(
        `🏷️ Added ${categoryEntries.length} categories to sitemap chunk 0`
      )

      // Create sitemap entries for tag pages
      tagEntries = tags
        .filter((tag) => tag.count > 0)
        .map((tag) => ({
          url: `${baseUrl}/articles/tag/${tag.slug}`,
          lastModified: currentDate,
          changeFrequency: "weekly" as const,
          priority: 0.5,
        }))

      console.log(`🔖 Added ${tagEntries.length} tags to sitemap chunk 0`)
    }

    const currentDate = new Date().toISOString()

    // Create sitemap entries for individual posts
    const postEntries = posts.map((post) => ({
      url: `${baseUrl}/articles/${post.slug}`,
      lastModified: new Date(post.modified).toISOString() || currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }))

    // Combine all entries
    const allEntries = [...postEntries, ...categoryEntries, ...tagEntries]
    console.log(
      `✅ Articles sitemap chunk ${chunkId} generated with ${allEntries.length} total URLs`
    )

    // Generate XML
    const xml = generateSitemapXml(allEntries)

    // Return XML response
    return new NextResponse(xml, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    })
  } catch (error) {
    console.error(
      `❌ Error generating articles sitemap chunk ${params.id}:`,
      error
    )
    return NextResponse.json(
      { error: "Failed to generate sitemap" },
      { status: 500 }
    )
  }
}
