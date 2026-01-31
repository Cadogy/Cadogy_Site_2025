import { revalidatePath, revalidateTag } from "next/cache"

/**
 * Revalidates a specific page and all sitemaps
 * Call this after saving content changes in admin API routes
 */
export function revalidatePageAndSitemap(pagePath: string) {
  console.log(`🔄 Revalidating: ${pagePath}`)

  // Clear the page route cache
  revalidatePath(pagePath)

  // Clear page-specific cache tag
  const pageTag = getPageTag(pagePath)
  if (pageTag) {
    revalidateTag(pageTag)
    console.log(`  ✓ Tag: ${pageTag}`)
  }

  // Always revalidate sitemaps
  revalidateTag("sitemap")
  revalidatePath("/sitemap-index.xml")
  revalidatePath("/sitemap.xml")

  // If this is blog content, revalidate articles sitemap too
  if (pagePath.startsWith("/articles")) {
    revalidatePath("/articles-sitemap.xml")
    revalidateTag("articles-sitemap")
  }

  console.log(`  ✓ Sitemaps revalidated`)
}

/**
 * Maps page paths to cache tags for Cadogy project
 */
function getPageTag(pagePath: string): string | null {
  const tagMap: Record<string, string> = {
    "/": "page-homepage",
    "/who-we-are": "page-who-we-are",
    "/contact": "page-contact",
    "/articles": "page-articles-hub",
    "/policies/privacy-policy": "page-privacy-policy",
    "/policies/terms-of-use": "page-terms-of-use",
  }
  return tagMap[pagePath] || null
}

/**
 * Revalidate all public pages (use when settings change)
 * This is critical because getSiteSettings() is used across all public pages
 */
export function revalidateAllPages() {
  console.log(`🔄 Revalidating ALL public pages...`)

  // Revalidate all static pages
  const allPages = [
    "/",
    "/who-we-are",
    "/contact",
    "/articles",
    "/policies/privacy-policy",
    "/policies/terms-of-use",
  ]

  allPages.forEach((page) => {
    revalidatePath(page)
    const tag = getPageTag(page)
    if (tag) revalidateTag(tag)
  })

  // Revalidate articles routes (dynamic)
  revalidatePath("/articles/[slug]", "page")
  revalidatePath("/articles/category/[slug]", "page")
  revalidatePath("/articles/tag/[slug]", "page")

  // Revalidate all sitemaps
  revalidateTag("sitemap")
  revalidateTag("articles-sitemap")
  revalidatePath("/sitemap-index.xml")
  revalidatePath("/sitemap.xml")
  revalidatePath("/articles-sitemap.xml")

  console.log(`  ✓ All pages revalidated`)
}
