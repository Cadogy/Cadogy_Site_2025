"use client"

import { Suspense } from "react"
import Link from "next/link"
import { BellIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { UserProfile } from "@/components/dashboard/user-profile"
import { UserProfileSkeleton } from "@/components/skeleton/user-profile-skeleton"

import DashboardNav from "./dashboard-nav"

interface DashboardHeaderProps {
  userData: {
    id: string
    name: string | null
    email: string | null
    image: string | null
  } | null
}

export function DashboardHeader({ userData }: DashboardHeaderProps) {
  return (
    <>
      <header className="sticky top-0 z-30 border-b bg-background">
        <div className="mx-auto flex max-w-[86%] items-center justify-between py-4 sm:px-6 md:max-w-[90%] lg:px-8">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center">
              <svg
                width="32px"
                height="32px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.4491 6.94063V9.45062C19.4491 10.1606 18.7291 10.6206 18.0591 10.3706C17.2191 10.0606 16.2891 9.94062 15.3091 10.0406C12.9291 10.3006 10.4891 12.5906 10.0891 14.9606C9.75906 16.9306 10.3891 18.7706 11.5991 20.0706C12.1491 20.6706 11.7791 21.6406 10.9691 21.7306C10.2791 21.8106 9.59906 21.7906 9.21906 21.5106L3.71906 17.4006C3.06906 16.9106 2.53906 15.8506 2.53906 15.0306V6.94063C2.53906 5.81063 3.39906 4.57063 4.44906 4.17063L9.94906 2.11062C10.5191 1.90063 11.4591 1.90063 12.0291 2.11062L17.5291 4.17063C18.5891 4.57063 19.4491 5.81063 19.4491 6.94063Z"
                  fill="#ededed"
                />
                <path
                  d="M16 11.5117C13.52 11.5117 11.5 13.5317 11.5 16.0117C11.5 18.4917 13.52 20.5117 16 20.5117C18.48 20.5117 20.5 18.4917 20.5 16.0117C20.5 13.5217 18.48 11.5117 16 11.5117Z"
                  fill="#f0f0f0"
                />
              </svg>
              <span className="ml-2 text-xl font-bold">Cadogy</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="relative text-muted-foreground hover:text-foreground"
            >
              <Link href="/dashboard/notifications">
                <BellIcon className="h-5 w-5" />
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-white">
                  3
                </span>
              </Link>
            </Button>

            {/* User profile */}
            <Suspense fallback={<UserProfileSkeleton />}>
              {userData ? (
                <UserProfile user={userData} />
              ) : (
                <UserProfileSkeleton />
              )}
            </Suspense>
          </div>
        </div>
      </header>

      {/* Secondary navigation bar */}
      <DashboardNav />
    </>
  )
}
