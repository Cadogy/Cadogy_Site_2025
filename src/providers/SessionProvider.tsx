"use client"

import { ReactNode } from "react"
import { SessionProvider as NextAuthSessionProvider } from "next-auth/react"

interface SessionProviderProps {
  children: ReactNode
}

export function SessionProvider({ children }: SessionProviderProps) {
  return (
    <NextAuthSessionProvider
      // Refetch session on window focus to ensure synced state across tabs
      refetchOnWindowFocus={true}
      // Don't refetch on mount since that's handled elsewhere
      refetchWhenOffline={false}
    >
      {children}
    </NextAuthSessionProvider>
  )
}
