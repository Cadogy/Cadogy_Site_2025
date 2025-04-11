import { NextResponse } from 'next/server'
import { env } from "@/env.mjs"
import { getAllPosts, getCategories, getTags } from "@/lib/wordpress-api"

const baseUrl = env.NEXT_PUBLIC_APP_URL || 'https://www.cadogy.com'

export async function GET() {
  console.log('🗺️ Generating articles sitemap.xml...')
  
  try {
    // Get all posts, categories, and tags
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
      lastmod: new Date(post.modified).toISOString() || currentDate,
      changefreq: 'weekly',
      priority: '0.7',
    }))

    // Create sitemap entries for category pages
    const categoryEntries = categories
      .filter(category => category.count > 0 && category.name.toLowerCase() !== 'uncategorized')
      .map(category => ({
        url: `${baseUrl}/articles/category/${category.slug}`,
        lastmod: currentDate,
        changefreq: 'weekly',
        priority: '0.6',
      }))

    // Create sitemap entries for tag pages
    const tagEntries = tags
      .filter(tag => tag.count > 0)
      .map(tag => ({
        url: `${baseUrl}/articles/tag/${tag.slug}`,
        lastmod: currentDate,
        changefreq: 'weekly',
        priority: '0.5',
      }))

    // Combine all entries
    const allEntries = [...articlesEntries, ...categoryEntries, ...tagEntries]
    console.log(`✅ Articles sitemap generated with ${allEntries.length} total URLs`)
    
    // Generate XML
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allEntries.map(entry => `  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`).join('\n')}
</urlset>`
    
    // Return XML response
    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600'
      }
    })
  } catch (error) {
    console.error('❌ Error generating articles sitemap:', error)
    // Return empty sitemap on error
    return new NextResponse(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
</urlset>`, {
      headers: {
        'Content-Type': 'application/xml',
      },
      status: 500
    })
  }
} 