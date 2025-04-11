import { MetadataRoute } from 'next'

import { env } from "@/env.mjs"

const baseUrl = env.NEXT_PUBLIC_APP_URL || 'https://cadogy.com'

export default function sitemapIndex(): MetadataRoute.Sitemap {
  console.log('📚 Generating sitemap index...')
  
  const sitemaps = [
    {
      url: `${baseUrl}/sitemap.xml`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/articles-sitemap.xml`,
      lastModified: new Date(),
    },
  ]
  
  console.log(`✅ Sitemap index generated with ${sitemaps.length} sitemaps: ${sitemaps.map(s => s.url).join(', ')}`)
  return sitemaps
} 