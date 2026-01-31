import "@/styles/globals.css"

import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { SessionProvider } from "@/providers/SessionProvider"
import { ToastProvider } from "@/providers/toast-provider"
import NextTopLoader from "nextjs-toploader"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Footer } from "@/components/elements/footer"
import { NavigationMenu } from "@/components/elements/navbar"
import { PageTransition } from "@/components/elements/PageTransition"
import { ThemeProvider } from "@/components/theme-provider"
import { OrganizationSchema } from "@/components/seo/organization-schema"

const inter = Inter({ subsets: ["latin"] })

interface RootLayoutProps {
  children: React.ReactNode
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

// Cache configuration - on-demand revalidation only
export const revalidate = false
export const fetchCache = "force-cache"
export const dynamicParams = true

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: { slug?: string }
  searchParams: Record<string, string | string[] | undefined>
}): Promise<Metadata> {
  const isHomePage = !params.slug

  const { getSiteSettings } = await import("@/lib/get-site-settings")
  const dynamicSettings = await getSiteSettings()

  const baseMetadata: Metadata = {
    metadataBase: new URL(siteConfig.url.base),
    title: {
      default: `${dynamicSettings.siteName} - ${dynamicSettings.siteSlogan}`,
      template: `%s`,
    },
    description: dynamicSettings.siteDescription,
    keywords: siteConfig.keywords,
    authors: [
      {
        name: siteConfig.author,
        url: siteConfig.url.author,
      },
    ],
    creator: siteConfig.author,
    publisher: siteConfig.name,
    formatDetection: {
      telephone: true,
      email: true,
      address: true,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: siteConfig.url.base,
      title: dynamicSettings.siteName,
      description: dynamicSettings.siteDescription,
      siteName: dynamicSettings.siteName,
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
      title: dynamicSettings.siteName,
      description: dynamicSettings.siteDescription,
      images: [siteConfig.ogImage],
      creator: "@_rdev7",
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
      apple: "/favicon.ico",
    },
    alternates: {
      canonical: siteConfig.url.base,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: "verification_token",
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
        {/* SEO: Organization Schema - applies to all pages */}
        <OrganizationSchema />

        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider>
            <NextTopLoader
              color="#60a5fa"
              initialPosition={0.08}
              height={3}
              showSpinner={false}
              easing="ease"
              speed={200}
            />
            <NavigationMenu />
            <ToastProvider autoDismissTimeout={4000}>
              <PageTransition>
                <main className="flex min-h-[calc(100vh-4rem)] flex-col justify-center">
                  {children}
                </main>
              </PageTransition>
              <Footer />
            </ToastProvider>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
