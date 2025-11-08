"use client"

import { Suspense, useCallback, useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useUserData } from "@/providers/UserDataProvider"
import { useSession } from "next-auth/react"

import { useSiteSettings } from "@/hooks/use-site-settings"
import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { PageTransition } from "@/components/elements/PageTransition"
import { Footer } from "@/components/layout/footer"
import { DashboardContentSkeleton } from "@/components/skeleton/dashboard-content-skeleton"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { settings } = useSiteSettings()

  return (
    <div className="relative flex min-h-screen flex-col">
      {settings?.dashboardBackgroundImage && (
        <>
          <div
            className="pointer-events-none fixed inset-0 z-0"
            style={{
              opacity: settings.dashboardBackgroundOpacity || 0.1,
            }}
          >
            <Image
              src={settings.dashboardBackgroundImage}
              alt="Dashboard background"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="pointer-events-none fixed inset-0 z-0 bg-gradient-to-b from-background via-background/95 to-transparent" />
          <div className="pointer-events-none fixed inset-0 z-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        </>
      )}

      <div className="relative z-10 flex min-h-screen flex-col">
        <div className="sticky top-0 z-50">
          <DashboardNavigation />
        </div>

        <PageTransition>
          <main className="flex-1">
            <DashboardContent>{children}</DashboardContent>
          </main>
        </PageTransition>

        <div className="hidden lg:block">
          <Footer />
        </div>
      </div>
    </div>
  )
}

/**
 * Dashboard-specific navigation component with auth checking
 */
function DashboardNavigation() {
  const { userData, isLoading } = useUserData()
  const { data: session } = useSession()

  // Redirect if not authenticated
  if (!isLoading && !userData && !session) {
    window.location.href = "/login"
    return null
  }

  return <DashboardHeader />
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
