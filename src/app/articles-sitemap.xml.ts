import { MetadataRoute } from 'next'

import { env } from "@/env.mjs"
import { getAllPosts, getCategories, getTags } from "@/lib/wordpress-api"

// Define the base URL
const baseUrl = env.NEXT_PUBLIC_APP_URL || 'https://www.cadogy.com'
const CHUNK_SIZE = 5000 // Lower than 50,000 to be safe

// This function tells Next.js to generate multiple sitemaps for chunking
export async function generateSitemaps() {
  console.log('🔄 Calculating article sitemap chunks...')
  try {
    // Get total number of posts
    const posts = await getAllPosts()
    const totalPosts = posts.length
    
    // Calculate number of chunks needed (at least 1)
    const chunks = Math.max(1, Math.ceil(totalPosts / CHUNK_SIZE))
    console.log(`📊 Need ${chunks} sitemap chunks for ${totalPosts} total posts`)
    
    // Return array of chunk ids
    return Array.from({ length: chunks }, (_, i) => ({ id: i }))
  } catch (error) {
    console.error('❌ Error calculating sitemap chunks:', error)
    // Return at least one chunk even on error
    return [{ id: 0 }]
  }
}

// The default export function will generate each sitemap chunk
export default async function sitemap({ id }: { id: number }): Promise<MetadataRoute.Sitemap> {
  console.log(`🗺️ Generating articles sitemap index for chunk ${id}...`)
  
  // Get the URL for the chunk (using articles/sitemap/[id] route we created)
  const sitemapUrl = `${baseUrl}/articles/sitemap/${id}`
  
  return [
    {
      url: sitemapUrl,
      lastModified: new Date(),
    }
  ]
} 