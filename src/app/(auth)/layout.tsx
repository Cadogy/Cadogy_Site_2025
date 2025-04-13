"use client"

import "@/styles/globals.css"

import { Suspense, useCallback, useEffect, useState } from "react"
import type { Viewport } from "next"
import { Inter } from "next/font/google"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { SessionProvider } from "@/providers/SessionProvider"
import { useSession } from "next-auth/react"
import NextTopLoader from "nextjs-toploader"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Toaster } from "@/components/ui/toaster"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { PageTransition } from "@/components/elements/PageTransition"
// Layout components
import { AppNavbar } from "@/components/layout/app-navbar"
import { Footer } from "@/components/layout/footer"
import { DashboardContentSkeleton } from "@/components/skeleton/dashboard-content-skeleton"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* UploadThing styles */}
        <style>{`
          .ut-button {
            background-color: hsl(var(--primary));
            color: hsl(var(--primary-foreground));
            border-radius: 0.25rem;
            padding: 0.5rem 1rem;
            cursor: pointer;
            font-size: 0.875rem;
            line-height: 1.25rem;
            font-weight: 500;
          }
          .ut-allowed-content {
            display: none;
          }
          .ut-label {
            font-size: 0.875rem;
          }
          .ut-upload-icon svg {
            height: 1.5rem;
            width: 1.5rem;
          }
        `}</style>
      </head>
      <body
        className={cn(
          "h-screen overflow-hidden bg-background antialiased",
          inter.className
        )}
      >
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
            <PageTransition>
              <RouteContentWrapper>{children}</RouteContentWrapper>
            </PageTransition>
            <Toaster />
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

/**
 * RouteContentWrapper - Determines the layout based on the current route
 * Handles auth checking and user data for dashboard routes
 */
function RouteContentWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isDashboardRoute = pathname?.startsWith("/dashboard")
  const { data: session, status } = useSession()
  const [userData, setUserData] = useState<{
    id: string
    name: string | null
    email: string | null
    image: string | null
  } | null>(null)
  const [isLoadingUser, setIsLoadingUser] = useState(true)

  // Fetch user data from API with useCallback
  const fetchUserData = useCallback(async () => {
    if (!isDashboardRoute) return // Only fetch for dashboard routes

    try {
      const response = await fetch("/api/user/profile")
      if (response.ok) {
        const data = await response.json()
        setUserData({
          id: data.id,
          name: data.name,
          email: data.email,
          image: data.image,
        })
      } else {
        // Fallback to session data
        setUserData({
          id: session?.user?.id || "",
          name: session?.user?.name || null,
          email: session?.user?.email || null,
          image: session?.user?.image || null,
        })
      }
    } catch (error) {
      console.error("Error fetching user data:", error)
      // Fallback to session data
      setUserData({
        id: session?.user?.id || "",
        name: session?.user?.name || null,
        email: session?.user?.email || null,
        image: session?.user?.image || null,
      })
    } finally {
      setIsLoadingUser(false)
    }
  }, [
    isDashboardRoute,
    session?.user?.id,
    session?.user?.name,
    session?.user?.email,
    session?.user?.image,
  ])

  // Fetch user data when session is authenticated
  useEffect(() => {
    if (isDashboardRoute && status === "authenticated" && session?.user?.id) {
      fetchUserData()
    } else if (isDashboardRoute && status !== "loading") {
      setIsLoadingUser(false)
    }
  }, [isDashboardRoute, status, session?.user?.id, fetchUserData])

  // Standard layout for regular pages
  if (!isDashboardRoute) {
    return (
      <div className="flex h-screen max-h-screen flex-col">
        <div className="sticky top-0 z-50">
          <AppNavbar />
        </div>
        <main className="flex-1 overflow-y-auto">{children}</main>
        <div className="sticky bottom-0 z-40">
          <Footer />
        </div>
      </div>
    )
  }

  // Redirect to login if not authenticated for dashboard routes
  if (isDashboardRoute && status === "unauthenticated") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold">Access Denied</h1>
          <p className="mb-6 text-muted-foreground">
            You need to be logged in to access this page
          </p>
          <Button asChild>
            <Link href="/login">Log In</Link>
          </Button>
        </div>
      </div>
    )
  }

  // Dashboard layout
  return (
    <div className="flex h-screen max-h-screen flex-col">
      <div className="sticky top-0 z-50">
        <DashboardHeader userData={userData} />
      </div>
      <main className="flex-1 overflow-y-auto p-4 sm:p-6">
        <div className="mx-auto px-0 md:max-w-[90%]">
          <div className="w-full pb-6 lg:pb-0">
            <Suspense fallback={<DashboardContentSkeleton />}>
              {status === "loading" || isLoadingUser ? (
                <DashboardContentSkeleton />
              ) : (
                children
              )}
            </Suspense>
          </div>
        </div>
      </main>
      <div className="sticky bottom-0 z-40">
        <Footer />
      </div>
    </div>
  )
}
