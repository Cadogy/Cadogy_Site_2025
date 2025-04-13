"use client"

import { Suspense, useCallback, useEffect, useState } from "react"
import Link from "next/link"
import { useSession } from "next-auth/react"

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
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <div className="sticky top-0 z-50">
        <DashboardNavigation />
      </div>

      {/* Main content with PageTransition */}
      <PageTransition>
        <main className="flex-1">
          <DashboardContent>{children}</DashboardContent>
        </main>
      </PageTransition>

      {/* Footer only on desktop for dashboard routes */}
      <div className="hidden lg:block">
        <Footer />
      </div>
    </div>
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
    tokenBalance?: number
  } | null>(null)

  // Define type for userData within the fetchUserData function
  type UserDataType = {
    id: string
    name: string | null
    email: string | null
    image: string | null
    tokenBalance?: number
  }

  // Fetch user data from API with useCallback
  const fetchUserData = useCallback(async () => {
    try {
      // First, fetch basic user profile
      const profileResponse = await fetch("/api/user/profile")
      let userData: UserDataType

      if (profileResponse.ok) {
        const profileData = await profileResponse.json()
        userData = {
          id: profileData.id,
          name: profileData.name,
          email: profileData.email,
          image: profileData.image,
        }
      } else {
        // Fallback to session data for basic info
        userData = {
          id: session?.user?.id || "",
          name: session?.user?.name || null,
          email: session?.user?.email || null,
          image: session?.user?.image || null,
        }
      }

      // Now fetch token balance from dashboard API
      try {
        const tokenResponse = await fetch("/api/dashboard/usage", {
          cache: "no-store",
          headers: {
            "x-timestamp": Date.now().toString(),
          },
        })

        if (tokenResponse.ok) {
          const dashboardData = await tokenResponse.json()
          userData.tokenBalance = dashboardData.user?.tokenBalance || 0
          // console.log("Token balance fetched:", userData.tokenBalance)
        }
      } catch (tokenError) {
        console.error("Error fetching token balance:", tokenError)
      }

      // Set the combined user data
      setUserData(userData)
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
