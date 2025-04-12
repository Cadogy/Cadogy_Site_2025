import { SiteConfig } from "@/types"

import { env } from "@/env.mjs"

export const siteConfig: SiteConfig = {
  name: "Cadogy",
  slogan: "Web Development Experts in Pompano Beach, FL",
  author: "charlesknapp",
  description:
    "Cadogy is a web development agency in Pompano Beach, FL, crafting custom websites, fullstack apps, and secure infrastructure that help businesses grow online.",
  keywords: [
    "Web development Pompano Beach",
    "Florida web design",
    "Custom website development",
    "Fullstack app development",
    "Secure web infrastructure",
    "Business website solutions",
    "Web development agency",
    "React developers Florida",
    "NextJS agency",
    "SEO optimization South Florida",
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
