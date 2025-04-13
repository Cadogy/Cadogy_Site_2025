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
  // We'll conditionally render the appropriate navigation & layout structure here
  // This ensures headers/footers don't transition, only content does
  const pathname = usePathname()
  const isDashboardRoute = pathname?.startsWith("/dashboard")

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
      <body className={cn("bg-background antialiased", inter.className)}>
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

            {/* Simple flex layout with natural flow */}
            <div className="flex min-h-screen flex-col">
              {/* Header */}
              <div className="sticky top-0 z-50">
                {isDashboardRoute ? <DashboardNavigation /> : <AppNavbar />}
              </div>

              {/* Main content with PageTransition */}
              <PageTransition>
                <main className="flex-1">
                  {isDashboardRoute ? (
                    <DashboardContent>{children}</DashboardContent>
                  ) : (
                    <div className="min-h-[calc(100vh-64px)] lg:min-h-[calc(100vh-124px)]">
                      {children}
                    </div>
                  )}
                </main>
              </PageTransition>

              {/* Footer only on desktop for dashboard routes */}
              <div
                className={cn(isDashboardRoute ? "hidden lg:block" : "block")}
              >
                <Footer />
              </div>
            </div>

            <Toaster />
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

/**
 * Dashboard-specific navigation component with auth checking
 */
function DashboardNavigation() {
  const { data: session, status } = useSession()
  const [userData, setUserData] = useState<{
    id: string
    name: string | null
    email: string | null
    image: string | null
  } | null>(null)

  // Fetch user data from API with useCallback
  const fetchUserData = useCallback(async () => {
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
    }
  }, [
    session?.user?.id,
    session?.user?.name,
    session?.user?.email,
    session?.user?.image,
  ])

  // Fetch user data when session is authenticated
  useEffect(() => {
    if (status === "authenticated" && session?.user?.id) {
      fetchUserData()
    }
  }, [status, session?.user?.id, fetchUserData])

  // Redirect to login if not authenticated
  if (status === "unauthenticated") {
    return (
      <div className="sticky top-0 z-50 flex h-16 items-center justify-center bg-red-500/10 px-4">
        <p className="text-sm text-red-600 dark:text-red-400">
          Not authenticated -
          <Link href="/login" className="ml-1 font-medium underline">
            Login now
          </Link>
        </p>
      </div>
    )
  }

  return (
    <div className="sticky top-0 z-50">
      <DashboardHeader userData={userData} />
    </div>
  )
}

/**
 * Dashboard content component with loading states
 */
function DashboardContent({ children }: { children: React.ReactNode }) {
  const { status } = useSession()
  const [isLoadingUser, setIsLoadingUser] = useState(true)

  useEffect(() => {
    if (status !== "loading") {
      // Give a small delay for better UX
      const timer = setTimeout(() => setIsLoadingUser(false), 500)
      return () => clearTimeout(timer)
    }
  }, [status])

  if (status === "unauthenticated") {
    return (
      <div className="flex min-h-[50vh] items-center justify-center p-4">
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

  return (
    <div className="flex min-h-[calc(100vh-64px)] flex-col p-4 pb-[94px] sm:p-6 lg:min-h-[calc(100vh-140px)] lg:pb-6">
      <div className="mx-auto h-full w-full px-0 md:max-w-[90%]">
        <div className="h-full w-full">
          <Suspense fallback={<DashboardContentSkeleton />}>
            {status === "loading" || isLoadingUser ? (
              <DashboardContentSkeleton />
            ) : (
              children
            )}
          </Suspense>
        </div>
      </div>
    </div>
  )
}
