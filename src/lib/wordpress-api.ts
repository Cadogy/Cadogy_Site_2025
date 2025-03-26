import { WP_Media, WP_Post, WP_Term } from "@/types/wordpress"
import { CarouselSlide } from "@/components/elements/HeroCarousel"

const API_URL = "https://wp.cadogy.com/wp-json/wp/v2"
export const PLACEHOLDER_IMAGE = "/images/placeholder/article-placeholder.svg"

/**
 * Decode HTML entities in a string
 */
export function decodeHtmlEntities(text: string): string {
  const textarea = document.createElement("textarea")
  textarea.innerHTML = text
  return textarea.value
}

/**
 * Server-safe HTML entity decoder (works in both client and server components)
 */
export function decodeHtml(html: string): string {
  return html
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .replace(/&hellip;/g, "…")
    .replace(/&#8230;/g, "…")
}

/**
 * Fetch posts from WordPress with pagination and search support
 */
export async function getPosts({
  page = 1,
  perPage = 9,
  search = "",
  categoryId = "",
  tagId = "",
}: {
  page?: number
  perPage?: number
  search?: string
  categoryId?: string | number
  tagId?: string | number
} = {}): Promise<{ posts: WP_Post[]; totalPages: number; totalPosts: number }> {
  // Build query parameters
  const queryParams = new URLSearchParams({
    _embed: "true",
    status: "publish",
    per_page: perPage.toString(),
    page: page.toString(),
  })

  // Add optional filters
  if (search) queryParams.append("search", search)
  if (categoryId) queryParams.append("categories", categoryId.toString())
  if (tagId) queryParams.append("tags", tagId.toString())

  const response = await fetch(`${API_URL}/posts?${queryParams.toString()}`, {
    next: { revalidate: 3600 }, // Cache for 1 hour
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch posts: ${response.status}`)
  }

  // Get total pages and posts from headers
  const totalPages = parseInt(
    response.headers.get("X-WP-TotalPages") || "1",
    10
  )
  const totalPosts = parseInt(response.headers.get("X-WP-Total") || "0", 10)

  const posts = await response.json()

  return {
    posts,
    totalPages,
    totalPosts,
  }
}

/**
 * Fetch a single post by slug
 */
export async function getPostBySlug(slug: string): Promise<WP_Post | null> {
  const response = await fetch(
    `${API_URL}/posts?_embed&slug=${slug}&status=publish`,
    { next: { revalidate: 3600 } } // Cache for 1 hour
  )

  if (!response.ok) {
    throw new Error(`Failed to fetch post: ${response.status}`)
  }

  const posts = await response.json()
  return posts.length > 0 ? posts[0] : null
}

/**
 * Fetch featured media (image) for a post
 */
export async function getMedia(id: number): Promise<WP_Media> {
  const response = await fetch(`${API_URL}/media/${id}`, {
    next: { revalidate: 3600 }, // Cache for 1 hour
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch media: ${response.status}`)
  }

  return response.json()
}

/**
 * Fetch all categories
 */
export async function getCategories(): Promise<WP_Term[]> {
  const response = await fetch(`${API_URL}/categories?per_page=100`, {
    next: { revalidate: 3600 }, // Cache for 1 hour
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch categories: ${response.status}`)
  }

  return response.json()
}

/**
 * Fetch all tags
 */
export async function getTags(): Promise<WP_Term[]> {
  const response = await fetch(`${API_URL}/tags?per_page=100`, {
    next: { revalidate: 3600 }, // Cache for 1 hour
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch tags: ${response.status}`)
  }

  return response.json()
}

/**
 * Fetch posts by category id
 */
export async function getPostsByCategory(
  categoryId: number
): Promise<WP_Post[]> {
  const response = await fetch(
    `${API_URL}/posts?_embed&categories=${categoryId}&status=publish&per_page=100`,
    { next: { revalidate: 3600 } } // Cache for 1 hour
  )

  if (!response.ok) {
    throw new Error(`Failed to fetch posts by category: ${response.status}`)
  }

  return response.json()
}

/**
 * Get formatted date string from WordPress date
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

/**
 * Extract excerpt from WordPress content
 */
export function extractExcerpt(
  content: string,
  maxLength: number = 160
): string {
  // Remove HTML tags and decode HTML entities
  const plainText = decodeHtml(content.replace(/<[^>]+>/g, ""))

  // Truncate to the maxLength
  if (plainText.length <= maxLength) return plainText

  // Find the last space before maxLength to avoid cutting words
  const lastSpace = plainText.substring(0, maxLength).lastIndexOf(" ")
  return `${plainText.substring(0, lastSpace > 0 ? lastSpace : maxLength)}...`
}

/**
 * Convert WordPress posts to carousel slides format with decoded HTML entities
 */
export function postsToCarouselSlides(
  posts: WP_Post[],
  limit: number = 5
): CarouselSlide[] {
  return posts.slice(0, limit).map((post) => {
    // Get the featured image URL or use a placeholder
    const image =
      post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || PLACEHOLDER_IMAGE

    // Get the author information
    const author = post._embedded?.author?.[0] || null
    const authorName = author?.name || "Cadogy Team"
    const authorImage =
      author?.avatar_urls?.["96"] || "/images/avatar-placeholder.jpg"

    return {
      image,
      altImage: decodeHtml(post.title.rendered),
      title: decodeHtml(post.title.rendered),
      description: extractExcerpt(post.excerpt.rendered, 200),
      link: `/articles/${post.slug}`,
      authorName,
      authorImage,
    }
  })
}

// Keep getAllPosts for backward compatibility
export async function getAllPosts(): Promise<WP_Post[]> {
  const response = await fetch(
    `${API_URL}/posts?_embed&status=publish&per_page=100`,
    { next: { revalidate: 3600 } } // Cache for 1 hour
  )

  if (!response.ok) {
    throw new Error(`Failed to fetch posts: ${response.status}`)
  }

  const posts = await response.json()
  return posts
}
