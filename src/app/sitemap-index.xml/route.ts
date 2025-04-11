import { NextResponse } from 'next/server'
import { env } from "@/env.mjs"

const baseUrl = env.NEXT_PUBLIC_APP_URL || 'https://www.cadogy.com'

export async function GET() {
  console.log('📚 Generating sitemap index...')
  
  const currentDate = new Date().toISOString()
  
  // Define all sitemaps
  const sitemaps = [
    {
      url: `${baseUrl}/sitemap.xml`,
      lastmod: currentDate,
    },
    {
      url: `${baseUrl}/articles-sitemap.xml`,
      lastmod: currentDate,
    },
  ]
  
  // Generate XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps.map(sitemap => `  <sitemap>
    <loc>${sitemap.url}</loc>
    <lastmod>${sitemap.lastmod}</lastmod>
  </sitemap>`).join('\n')}
</sitemapindex>`
  
  console.log(`✅ Sitemap index generated with ${sitemaps.length} sitemaps: ${sitemaps.map(s => s.url).join(', ')}`)
  
  // Return XML response
  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600'
    }
  })
} 