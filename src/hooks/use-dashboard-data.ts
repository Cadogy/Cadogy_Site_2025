import { useCallback, useEffect, useState } from "react"

import { formatRelativeTime } from "@/components/dashboard/date-utils"
import { UserStats } from "@/components/dashboard/stats-cards"
import { SystemAlert } from "@/components/dashboard/system-alerts"

// Refresh interval in milliseconds (10 seconds)
const REFRESH_INTERVAL = 10000

export function useDashboardData() {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastRefresh, setLastRefresh] = useState<number>(Date.now())

  // State for dashboard data
  const [userStats, setUserStats] = useState<UserStats>({
    totalApiCalls: 0,
    registeredDate: new Date(),
    hasApiKey: false,
    apiKey: "●●●●●●●●●●●●●●●●●●●●●●●●",
    lastUsed: "Never used",
    keyStatus: "Active",
    tokenBalance: 0,
  })

  // System alerts for all users
  const [systemAlerts, setSystemAlerts] = useState<SystemAlert[]>([])

  // Fetch dashboard data function
  const fetchDashboardData = useCallback(async () => {
    try {
      // console.log("Fetching dashboard data...")
      setIsLoading(true)
      setError(null)
      const response = await fetch("/api/dashboard/usage", {
        // Add cache: 'no-store' to prevent caching of this API response
        cache: "no-store",
        headers: {
          // Add a cache-busting timestamp to the request
          "x-timestamp": Date.now().toString(),
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch dashboard data")
      }

      const data = await response.json()
      // console.log("Dashboard data received:", data)

      // Format and set user stats
      setUserStats({
        totalApiCalls: data.usageStats?.totalCalls || 0,
        registeredDate: new Date(data.user?.registeredAt || Date.now()),
        hasApiKey: !!data.apiKey,
        apiKey: data.apiKey?.key || "●●●●●●●●●●●●●●●●●●●●●●●●",
        lastUsed: data.apiKey?.lastUsed
          ? formatRelativeTime(new Date(data.apiKey.lastUsed))
          : "Never used",
        keyStatus: data.apiKey?.isActive ? "Active" : "Inactive",
        tokenBalance: data.user?.tokenBalance || 0,
      })
      // console.log("User stats updated, token balance:", data.user?.tokenBalance)

      // Set system alerts
      setSystemAlerts(data.alerts || [])
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
      setError(
        error instanceof Error ? error.message : "An unknown error occurred"
      )
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Refresh data function for external callers
  const refreshData = useCallback(() => {
    // console.log("Manual refresh requested")
    setLastRefresh(Date.now())
  }, [])

  // Set up auto refresh interval
  // useEffect(() => {
  //   console.log("Setting up dashboard auto-refresh interval")
  //   const intervalId = setInterval(() => {
  //     console.log("Auto refresh triggered")
  //     setLastRefresh(Date.now())
  //   }, REFRESH_INTERVAL)

  //   // Clean up interval on unmount
  //   return () => {
  //     console.log("Clearing dashboard auto-refresh interval")
  //     clearInterval(intervalId)
  //   }
  // }, [])

  // Fetch dashboard data on mount and when refresh is called
  useEffect(() => {
    // console.log(
    //   "Dashboard data effect running, lastRefresh:",
    //   new Date(lastRefresh).toISOString()
    // )
    fetchDashboardData()
  }, [fetchDashboardData, lastRefresh])

  return {
    isLoading,
    error,
    userStats,
    systemAlerts,
    refreshData,
  }
}
