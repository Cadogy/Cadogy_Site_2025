import { SiteConfig } from "@/types"

import { env } from "@/env.mjs"

export const siteConfig: SiteConfig = {
  name: "Cadogy",
  slogan: "Pioneering Smarter Software",
  author: "charlesknapp",
  description:
    "A web development company that cares about your goals. We solve business challenges through a smart, data-driven approach to the web development and search engine optimization process.",
  keywords: [
    "Web development fort lauderdale",
    "fullstack web development",
    "nextjs developers",
    "fort lauderdale react developers",
    "florida fullstack developers for hire",
  ],
  url: {
    base: env.NEXT_PUBLIC_APP_URL,
    author: "https://charles.cadogy.com",
  },
  // links: {
  //   github: "https://github.com/redpangilinan/next-entree",
  // },
  ogImage: `${env.NEXT_PUBLIC_APP_URL}/og.jpg`,
}
