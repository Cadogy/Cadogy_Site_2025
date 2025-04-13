"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"
import { useSession } from "next-auth/react"

// Define types for our user data
export interface UserData {
  // Basic user info
  id: string
  name: string | null
  email: string | null
  image: string | null
  role: string | null

  // Token and subscription data
  tokenBalance: number

  // Stats
  totalApiCalls: number
  registeredDate: Date
  hasApiKey: boolean
  apiKey: string
  lastApiKeyUsed: string
  keyStatus: string

  // System info
  systemAlerts: any[]
}

// Default values for the context
const defaultUserData: UserData = {
  id: "",
  name: null,
  email: null,
  image: null,
  role: null,
  tokenBalance: 0,
  totalApiCalls: 0,
  registeredDate: new Date(),
  hasApiKey: false,
  apiKey: "",
  lastApiKeyUsed: "Never used",
  keyStatus: "Inactive",
  systemAlerts: [],
}

interface UserDataContextValue {
  userData: UserData
  isLoading: boolean
  error: string | null
  refreshUserData: () => void
}

// Create the context
const UserDataContext = createContext<UserDataContextValue>({
  userData: defaultUserData,
  isLoading: true,
  error: null,
  refreshUserData: () => {},
})

// Provider component
export function UserDataProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const [userData, setUserData] = useState<UserData>(defaultUserData)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [lastRefresh, setLastRefresh] = useState<number>(Date.now())

  // Function to refresh data
  const refreshUserData = useCallback(() => {
    console.log("Manual user data refresh requested")
    setLastRefresh(Date.now())
  }, [])

  // Fetch user data (combines profile and dashboard data)
  const fetchUserData = useCallback(async () => {
    if (status !== "authenticated" || !session?.user?.id) {
      setIsLoading(false)
      return
    }

    console.log("Fetching user data...")
    setIsLoading(true)
    setError(null)

    try {
      // Parallel API calls for efficiency
      const [profileResponse, dashboardResponse] = await Promise.all([
        fetch("/api/user/profile", {
          cache: "no-store",
          headers: { "x-timestamp": Date.now().toString() },
        }),
        fetch("/api/dashboard/usage", {
          cache: "no-store",
          headers: { "x-timestamp": Date.now().toString() },
        }),
      ])

      // Handle profile data
      let profile: any = {}
      if (profileResponse.ok) {
        profile = await profileResponse.json()
      } else {
        // Fallback to session
        profile = {
          id: session.user.id,
          name: session.user.name,
          email: session.user.email,
          image: session.user.image,
          role: session.user.role,
        }
      }

      // Handle dashboard data
      let dashboard: any = {
        user: {},
        usageStats: {},
        apiKey: null,
        alerts: [],
      }
      if (dashboardResponse.ok) {
        dashboard = await dashboardResponse.json()
      }

      // Combine the data
      setUserData({
        // User profile data
        id: profile.id || session.user.id,
        name: profile.name || session.user.name,
        email: profile.email || session.user.email,
        image: profile.image || session.user.image,
        role: profile.role || session.user.role,

        // Dashboard data
        tokenBalance: dashboard.user?.tokenBalance || 0,
        totalApiCalls: dashboard.usageStats?.totalCalls || 0,
        registeredDate: new Date(dashboard.user?.registeredAt || Date.now()),
        hasApiKey: !!dashboard.apiKey,
        apiKey: dashboard.apiKey?.key || "",
        lastApiKeyUsed: dashboard.apiKey?.lastUsed
          ? new Date(dashboard.apiKey.lastUsed).toLocaleDateString()
          : "Never used",
        keyStatus: dashboard.apiKey?.isActive ? "Active" : "Inactive",
        systemAlerts: dashboard.alerts || [],
      })

      console.log("User data updated successfully")
    } catch (err) {
      console.error("Error fetching user data:", err)
      setError("Failed to load user data. Please refresh or try again later.")
    } finally {
      setIsLoading(false)
    }
  }, [session, status])

  // Fetch data on mount and when session or refresh changes
  useEffect(() => {
    fetchUserData()
  }, [fetchUserData, lastRefresh])

  return (
    <UserDataContext.Provider
      value={{
        userData,
        isLoading,
        error,
        refreshUserData,
      }}
    >
      {children}
    </UserDataContext.Provider>
  )
}

// Custom hook for consuming the context
export function useUserData() {
  const context = useContext(UserDataContext)

  if (context === undefined) {
    throw new Error("useUserData must be used within a UserDataProvider")
  }

  return context
}
