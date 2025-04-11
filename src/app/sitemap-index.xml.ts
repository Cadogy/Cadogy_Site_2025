import { MetadataRoute } from 'next'
import { env } from "@/env.mjs"
import { generateSitemaps as generateArticleSitemaps } from './articles-sitemap.xml'

const baseUrl = env.NEXT_PUBLIC_APP_URL || 'https://www.cadogy.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  console.log('📚 Generating sitemap index...')
  
  // Get article sitemap chunks info
  const articleSitemapChunks = await generateArticleSitemaps()
  console.log(`📊 Found ${articleSitemapChunks.length} article sitemap chunks`)
  
  // Add the main sitemap
  const sitemaps = [
    {
      url: `${baseUrl}/sitemap.xml`,
      lastModified: new Date(),
    },
  ]
  
  // Add all article sitemap chunks
  const articleSitemapsEntries = articleSitemapChunks.map(chunk => ({
    url: `${baseUrl}/articles-sitemap${chunk.id}.xml`, // References Next.js dynamic route
    lastModified: new Date(),
  }))
  
  // Combine all sitemaps
  const allSitemaps = [...sitemaps, ...articleSitemapsEntries]
  
  console.log(`✅ Sitemap index generated with ${allSitemaps.length} sitemaps: ${allSitemaps.map(s => s.url).join(', ')}`)
  return allSitemaps
} 