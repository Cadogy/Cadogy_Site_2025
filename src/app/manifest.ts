import { MetadataRoute } from 'next'

import { env } from "@/env.mjs"
import { siteConfig } from "@/config/site"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: 'Cadogy',
    description: siteConfig.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#0A0A0A',
    theme_color: '#0A0A0A',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
    related_applications: [
      {
        platform: 'web',
        url: env.NEXT_PUBLIC_APP_URL || 'https://wwwcadogy.com',
      },
    ],
  }
} 