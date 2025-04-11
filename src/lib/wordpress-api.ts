import { WP_Media, WP_Post, WP_Term } from "@/types/wordpress"
import { CarouselSlide } from "@/components/elements/HeroCarousel"

const API_URL = process.env.NEXT_PUBLIC_WP_API_URL || "https://wp.cadogy.com/wp-json/wp/v2"
export const PLACEHOLDER_IMAGE = process.env.NEXT_PUBLIC_PLACEHOLDER_IMAGE || "/images/placeholder/article-placeholder.svg"

// Simple in-memory request cache to prevent duplicate fetches during build
const requestCache = new Map<string, any>()

/**
 * Cached fetch function to prevent duplicate requests
 */
async function cachedFetch<T>(url: string): Promise<T> {
  // Add timestamp to prevent caching by Next.js or the browser
  const timestampedUrl = `${url}${url.includes('?') ? '&' : '?'}_=${Date.now()}`
  
  if (requestCache.has(url)) {
    console.log(`🔄 Using cached response for ${url}`)
    return requestCache.get(url)
  }
  
  const response = await fetch(timestampedUrl, {
    cache: 'no-store' // Use only one caching strategy
  })
  
  if (!response.ok) {
    throw new Error(`Failed fetch for ${url}: ${response.status}`)
  }
  
  const data = await response.json()
  requestCache.set(url, data)
  return data
}

/**
 * Add a cache-busting parameter to WordPress image URLs
 */
export function preventImageCaching(url: string): string {
  if (!url || url === PLACEHOLDER_IMAGE || !url.includes('wp.cadogy.com')) {
    return url
  }
  
  // Use a daily cache breaker instead of per-request timestamp
  // This prevents images from flashing during carousel transitions
  // while still refreshing images daily
  const today = new Date()
  const cacheKey = `${today.getFullYear()}${today.getMonth()}${today.getDate()}`
  
  return url.includes('?') ? `${url}&v=${cacheKey}` : `${url}?v=${cacheKey}`
}

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

  const url = `${API_URL}/posts?${queryParams.toString()}`
  
  // Need special handling for this method as we need headers
  const timestampedUrl = `${url}${url.includes('?') ? '&' : '?'}_=${Date.now()}`
  
  // Special case - don't use cache for this request as we need headers
  const response = await fetch(timestampedUrl, {
    cache: 'no-store' // Use only one caching strategy
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
  
  // Process featured media URLs to prevent caching
  posts.forEach((post: WP_Post) => {
    if (post._embedded?.["wp:featuredmedia"]?.[0]?.source_url) {
      post._embedded["wp:featuredmedia"][0].source_url = preventImageCaching(
        post._embedded["wp:featuredmedia"][0].source_url
      )
    }
  })

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
  const posts = await cachedFetch<WP_Post[]>(
    `${API_URL}/posts?_embed&slug=${slug}&status=publish`
  )
  
  // Process featured media URL to prevent caching
  if (posts.length > 0 && posts[0]._embedded?.["wp:featuredmedia"]?.[0]?.source_url) {
    posts[0]._embedded["wp:featuredmedia"][0].source_url = preventImageCaching(
      posts[0]._embedded["wp:featuredmedia"][0].source_url
    )
  }
  
  return posts.length > 0 ? posts[0] : null
}

/**
 * Fetch featured media (image) for a post
 */
export async function getMedia(id: number): Promise<WP_Media> {
  const media = await cachedFetch<WP_Media>(`${API_URL}/media/${id}`)
  
  // Apply cache busting to source_url
  if (media.source_url) {
    media.source_url = preventImageCaching(media.source_url)
  }
  
  return media
}

/**
 * Fetch all categories
 */
export async function getCategories(): Promise<WP_Term[]> {
  return cachedFetch<WP_Term[]>(`${API_URL}/categories?per_page=100`)
}

/**
 * Fetch all tags
 */
export async function getTags(): Promise<WP_Term[]> {
  return cachedFetch<WP_Term[]>(`${API_URL}/tags?per_page=100`)
}

/**
 * Fetch posts by category id
 */
export async function getPostsByCategory(
  categoryId: number
): Promise<WP_Post[]> {
  const posts = await cachedFetch<WP_Post[]>(
    `${API_URL}/posts?_embed&categories=${categoryId}&status=publish&per_page=100`
  )
  
  // Process featured media URLs to prevent caching
  posts.forEach((post: WP_Post) => {
    if (post._embedded?.["wp:featuredmedia"]?.[0]?.source_url) {
      post._embedded["wp:featuredmedia"][0].source_url = preventImageCaching(
        post._embedded["wp:featuredmedia"][0].source_url
      )
    }
  })
  
  return posts
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
    let image =
      post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || PLACEHOLDER_IMAGE
    
    // Apply cache busting to the image URL
    image = preventImageCaching(image)

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

// Updated to handle pagination with in-memory caching
export async function getAllPosts(): Promise<WP_Post[]> {
  // Check if we already have all posts cached
  const cacheKey = 'all-posts'
  if (requestCache.has(cacheKey)) {
    console.log(`🔄 Using cached all posts`)
    return requestCache.get(cacheKey)
  }

  console.log(`📚 Fetching all posts with pagination...`)
  let page = 1
  let allPosts: WP_Post[] = []
  let hasMorePosts = true
  const perPage = 100 // Maximum allowed by WordPress API

  try {
    while (hasMorePosts) {
      console.log(`📚 Fetching WordPress posts page ${page}...`)
      
      // Construct the URL with page number
      const url = `${API_URL}/posts?_embed&status=publish&per_page=${perPage}&page=${page}`
      const timestampedUrl = `${url}&_=${Date.now()}`
      
      const response = await fetch(timestampedUrl, { 
        cache: 'no-store' // Use only one caching strategy
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch posts: ${response.status}`)
      }

      const posts = await response.json()
      
      // Process featured media URLs to prevent caching
      posts.forEach((post: WP_Post) => {
        if (post._embedded?.["wp:featuredmedia"]?.[0]?.source_url) {
          post._embedded["wp:featuredmedia"][0].source_url = preventImageCaching(
            post._embedded["wp:featuredmedia"][0].source_url
          )
        }
      })
      
      // If we got any posts, add them to our collection
      if (posts.length > 0) {
        allPosts = [...allPosts, ...posts]
        console.log(`📚 Added ${posts.length} posts from page ${page}, total: ${allPosts.length}`)
      }
      
      // Check if we've received fewer posts than requested per page
      // This means we've reached the last page
      if (posts.length < perPage) {
        hasMorePosts = false
        console.log(`📚 Reached end of posts at page ${page}`)
      } else {
        page++
      }
      
      // Add a small delay between requests to avoid overloading the WordPress API
      if (hasMorePosts) {
        await new Promise(resolve => setTimeout(resolve, 500))
      }
    }
    
    // Cache the result
    requestCache.set(cacheKey, allPosts)
    return allPosts
  } catch (error) {
    console.error("Error fetching all posts:", error)
    // Return any posts we've already fetched rather than failing completely
    return allPosts
  }
}
