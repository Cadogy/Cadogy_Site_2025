import { MetadataRoute } from 'next'

import { env } from "@/env.mjs"
import { getAllPosts, getCategories, getTags } from "@/lib/wordpress-api"

// Define the base URL
const baseUrl = env.NEXT_PUBLIC_APP_URL || 'https://cadogy.com'

// Articles sitemap for WordPress content
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  console.log('🗺️ Generating articles sitemap...')
  
  try {
    // Get all posts, categories, and tags - our improved caching system will prevent duplicates
    const [posts, categories, tags] = await Promise.all([
      getAllPosts(),
      getCategories(),
      getTags()
    ])

    console.log(`📝 Found ${posts.length} posts to include in sitemap`)
    console.log(`🏷️ Found ${categories.filter(c => c.count > 0 && c.name.toLowerCase() !== 'uncategorized').length} categories to include in sitemap`)
    console.log(`🔖 Found ${tags.filter(t => t.count > 0).length} tags to include in sitemap`)

    const currentDate = new Date().toISOString()

    // Create sitemap entries for individual posts
    const articlesEntries = posts.map(post => ({
      url: `${baseUrl}/articles/${post.slug}`,
      lastModified: new Date(post.modified).toISOString() || currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))

    // Create sitemap entries for category pages
    const categoryEntries = categories
      .filter(category => category.count > 0 && category.name.toLowerCase() !== 'uncategorized')
      .map(category => ({
        url: `${baseUrl}/articles/category/${category.slug}`,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      }))

    // Create sitemap entries for tag pages
    const tagEntries = tags
      .filter(tag => tag.count > 0)
      .map(tag => ({
        url: `${baseUrl}/articles/tag/${tag.slug}`,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.5,
      }))

    // Combine all entries
    const allEntries = [...articlesEntries, ...categoryEntries, ...tagEntries]
    console.log(`✅ Articles sitemap generated with ${allEntries.length} total URLs`)
    
    return allEntries
  } catch (error) {
    console.error('❌ Error generating articles sitemap:', error)
    // Return an empty array rather than failing the build completely
    console.log('⚠️ Returning empty sitemap due to error')
    return []
  }
} 