import { MetadataRoute } from 'next'

import { env } from "@/env.mjs"

const baseUrl = env.NEXT_PUBLIC_APP_URL || 'https://cadogy.com'

export default function sitemapIndex(): MetadataRoute.Sitemap {
  return [
    {
      url: `${baseUrl}/sitemap.xml`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/articles-sitemap.xml`,
      lastModified: new Date(),
    },
  ]
} 