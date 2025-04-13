"use client"

import { useEffect, useRef, useState } from "react"
import { AlertCircle } from "lucide-react"
import { useSession } from "next-auth/react"

import { useDashboardData } from "@/hooks/use-dashboard-data"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ApiKeyCard } from "@/components/dashboard/api-key-card"
import { GettingStartedCard } from "@/components/dashboard/getting-started-card"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { SystemAlerts } from "@/components/dashboard/system-alerts"
import { TokenManagement } from "@/components/dashboard/token-management"
import { WelcomeCard } from "@/components/dashboard/welcome-card"

export function DashboardContent() {
  const { data: session } = useSession()
  const { isLoading, error, userStats, systemAlerts, refreshData } =
    useDashboardData()
  const [currentStats, setCurrentStats] = useState({
    totalApiCalls: 0,
    registeredDate: new Date(),
    hasApiKey: false,
    apiKey: "",
    lastUsed: "",
    keyStatus: "",
    tokenBalance: 0,
  })

  // Keep a reference to the current token balance for logging
  const tokenBalanceRef = useRef(0)
  const isInitialMount = useRef(true)

  // console.log(
  //   "DashboardContent rendered - userStats:",
  //   userStats,
  //   "tokenBalance:",
  //   userStats?.tokenBalance
  // )

  // Force a refresh on initial mount
  useEffect(() => {
    if (isInitialMount.current) {
      // console.log("Initial dashboard mount - forcing refresh")
      refreshData()
      isInitialMount.current = false
    }
  }, [refreshData])

  // Update currentStats when userStats changes
  useEffect(() => {
    if (userStats) {
      // console.log("Setting currentStats from userStats:", userStats)
      setCurrentStats({
        ...userStats,
        tokenBalance: userStats.tokenBalance || 0,
      })
      tokenBalanceRef.current = userStats.tokenBalance || 0
      // console.log("Token balance after update:", tokenBalanceRef.current)
    }
  }, [userStats])

  // Handler for manual refresh request
  const handleRefreshRequest = () => {
    // console.log("Manual refresh requested from UI")
    refreshData()
  }

  // Update token balance when changed
  const handleTokenBalanceChange = (newBalance: number) => {
    // console.log("handleTokenBalanceChange called with:", newBalance)

    // Update the ref immediately for logging
    tokenBalanceRef.current = newBalance

    setCurrentStats((prev) => {
      const updated = {
        ...prev,
        tokenBalance: newBalance,
      }
      // console.log("Updated currentStats:", updated)
      return updated
    })

    // console.log("Current token balance ref:", tokenBalanceRef.current)

    // Also request a refresh to ensure we have the latest data
    refreshData()
  }

  return (
    <div className="space-y-6">
      {/* Error message if data fetching failed */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Welcome message */}
      <WelcomeCard session={session} />

      {/* System Alerts */}
      <SystemAlerts alerts={systemAlerts} />

      {/* Stats Cards */}
      <StatsCards stats={currentStats} isLoading={isLoading} />

      <div className="grid gap-4">
        {/* API Key Quick Info */}
        <ApiKeyCard
          isLoading={isLoading}
          hasApiKey={currentStats.hasApiKey}
          apiKey={currentStats.apiKey}
        />

        {/* Token Management Card */}
        {/* <TokenManagement
          initialBalance={currentStats.tokenBalance}
          onBalanceChange={handleTokenBalanceChange}
          onRefreshRequest={handleRefreshRequest}
        /> */}
      </div>

      {/* Getting Started */}
      <GettingStartedCard />
    </div>
  )
}
