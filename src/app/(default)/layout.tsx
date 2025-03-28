import "@/styles/globals.css"

import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Footer } from "@/components/elements/footer"
import { NavigationMenu } from "@/components/elements/navbar"
import { PageTransition } from "@/components/elements/PageTransition"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

interface RootLayoutProps {
  children: React.ReactNode
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: { slug?: string }
  searchParams: Record<string, string | string[] | undefined>
}): Promise<Metadata> {
  // Determine the current path based on segmented pathname
  const isHomePage = !params.slug

  // Base metadata that will be used for all routes
  const baseMetadata: Metadata = {
    metadataBase: new URL(siteConfig.url.base),
    title: {
      default: `${siteConfig.name} - ${siteConfig.slogan}`,
      template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    keywords: siteConfig.keywords,
    authors: [
      {
        name: siteConfig.author,
        url: siteConfig.url.author,
      },
    ],
    creator: siteConfig.author,
    openGraph: {
      type: "website",
      locale: "en_US",
      url: siteConfig.url.base,
      title: siteConfig.name,
      description: siteConfig.description,
      siteName: siteConfig.name,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: siteConfig.name,
      description: siteConfig.description,
      images: [siteConfig.ogImage],
      creator: "@_rdev7",
    },
    icons: {
      icon: "/favicon.ico",
    },
  }

  // For non-homepage routes, return the base metadata
  if (!isHomePage) {
    return baseMetadata
  }

  // For homepage, enhance with WordPress data
  try {
    // Import API functions only in server context
    const { getPosts, getTags, decodeHtml } = await import(
      "@/lib/wordpress-api"
    )

    // Fetch latest posts for metadata enhancement
    const { posts } = await getPosts({ page: 1, perPage: 3 })
    const tags = await getTags()

    // Get trending topics from tags
    const trendingTopics = tags
      .filter((tag) => tag.count > 0)
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)
      .map((tag) => tag.name)

    // Enhanced description with latest content
    const enhancedDescription =
      posts.length > 0
        ? `${siteConfig.description} Read our latest insights on ${trendingTopics.slice(0, 3).join(", ")}, and more.`
        : siteConfig.description

    // Enhanced keywords with trending topics
    const enhancedKeywords = [
      "Cadogy",
      "cybersecurity",
      "web development",
      "digital rights management",
      ...trendingTopics,
      "technology",
    ]

    // Featured image from latest post if available
    const featuredImage =
      posts[0]?._embedded?.["wp:featuredmedia"]?.[0]?.source_url

    // Return enhanced metadata for homepage
    return {
      ...baseMetadata,
      description: enhancedDescription,
      keywords: enhancedKeywords,
      openGraph: {
        ...baseMetadata.openGraph,
        description: enhancedDescription,
        images: featuredImage
          ? [{ url: featuredImage, alt: siteConfig.name }]
          : baseMetadata.openGraph?.images,
      },
      twitter: {
        ...baseMetadata.twitter,
        description: enhancedDescription,
        images: featuredImage ? [featuredImage] : baseMetadata.twitter?.images,
      },
    }
  } catch (error) {
    // If WordPress data fetching fails, fallback to base metadata
    console.error("Error fetching WordPress data for metadata:", error)
    return baseMetadata
  }
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background antialiased",
          inter.className
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <NavigationMenu />
          <PageTransition>
            <main className="flex min-h-[calc(100vh-4rem)] flex-col justify-center">
              {children}
            </main>
          </PageTransition>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
