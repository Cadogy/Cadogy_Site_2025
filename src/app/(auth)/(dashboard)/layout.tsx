"use client"

import React, { Suspense, useCallback, useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession } from "next-auth/react"

import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardContentSkeleton } from "@/components/skeleton/dashboard-content-skeleton"

// Static shell wrapper that doesn't re-render on navigation
const DashboardShell = ({
  userData,
  children,
}: {
  userData: {
    id: string
    name: string | null
    email: string | null
    image: string | null
  } | null
  children: React.ReactNode
}) => {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Dashboard top header with user info */}
      <DashboardHeader userData={userData} />

      {/* Main content area that will change on navigation */}
      {children}
    </div>
  )
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session, status } = useSession()
  const pathname = usePathname()
  const [userData, setUserData] = useState<{
    id: string
    name: string | null
    email: string | null
    image: string | null
  } | null>(null)
  const [isLoadingUser, setIsLoadingUser] = useState(true)

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
        console.log("Layout fetched user data:", data)
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
    session?.user?.id,
    session?.user?.name,
    session?.user?.email,
    session?.user?.image,
  ])

  // Fetch user data when session is authenticated
  useEffect(() => {
    if (status === "authenticated" && session?.user?.id) {
      fetchUserData()
    } else if (status !== "loading") {
      setIsLoadingUser(false)
    }
  }, [status, session?.user?.id, fetchUserData])

  // Redirect to login if not authenticated
  if (status === "unauthenticated") {
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

  // Render the dashboard with a static shell and animated content
  return (
    <DashboardShell userData={userData}>
      <main className="flex-1 overflow-x-hidden p-4 pb-[90px] sm:p-6 sm:pb-[90px] lg:pb-6">
        <div className="mx-auto max-w-7xl">
          <div key={pathname} className="w-full">
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
    </DashboardShell>
  )
}
