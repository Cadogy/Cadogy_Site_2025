import { NextResponse } from 'next/server'
import { env } from "@/env.mjs"

const baseUrl = env.NEXT_PUBLIC_APP_URL || 'https://www.cadogy.com'

export async function GET() {
  console.log('🗺️ Generating main sitemap.xml...')
  
  const currentDate = new Date().toISOString()
  
  // Define all the static routes
  const staticRoutes = [
    {
      url: `${baseUrl}`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '1.0',
    },
    {
      url: `${baseUrl}/who-we-are`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.8',
    },
    {
      url: `${baseUrl}/the-api`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.8',
    },
    {
      url: `${baseUrl}/the-api/features`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.7',
    },
    {
      url: `${baseUrl}/contact`,
      lastmod: currentDate,
      changefreq: 'yearly',
      priority: '0.8',
    },
    {
      url: `${baseUrl}/our-charter`,
      lastmod: currentDate,
      changefreq: 'yearly',
      priority: '0.6',
    },
    {
      url: `${baseUrl}/policies/terms-of-use`,
      lastmod: currentDate,
      changefreq: 'yearly',
      priority: '0.5',
    },
    {
      url: `${baseUrl}/policies/privacy-policy`,
      lastmod: currentDate,
      changefreq: 'yearly',
      priority: '0.5',
    },
    {
      url: `${baseUrl}/articles`,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: '0.9',
    },
  ]

  // Generate XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticRoutes.map(route => `  <url>
    <loc>${route.url}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('\n')}
</urlset>`

  console.log(`✅ Main sitemap generated with ${staticRoutes.length} static URLs`)
  
  // Return XML response
  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600'
    }
  })
} 