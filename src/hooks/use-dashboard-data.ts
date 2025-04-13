import { useEffect, useState } from "react"

import { formatRelativeTime } from "@/components/dashboard/date-utils"
import { UserStats } from "@/components/dashboard/stats-cards"
import { SystemAlert } from "@/components/dashboard/system-alerts"

export function useDashboardData() {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // State for dashboard data
  const [userStats, setUserStats] = useState<UserStats>({
    totalApiCalls: 0,
    registeredDate: new Date(),
    hasApiKey: false,
    apiKey: "●●●●●●●●●●●●●●●●●●●●●●●●",
    lastUsed: "Never used",
    keyStatus: "Active",
  })

  // System alerts for all users
  const [systemAlerts, setSystemAlerts] = useState<SystemAlert[]>([])

  // Fetch dashboard data from API
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setError(null)
        const response = await fetch("/api/dashboard/usage")

        if (!response.ok) {
          throw new Error("Failed to fetch dashboard data")
        }

        const data = await response.json()

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
        })

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
    }

    fetchDashboardData()
  }, [])

  return {
    isLoading,
    error,
    userStats,
    systemAlerts,
  }
}
