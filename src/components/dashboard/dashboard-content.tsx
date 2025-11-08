"use client"

import { useEffect, useState } from "react"
import { useUserData } from "@/providers/UserDataProvider"
import { AlertCircle } from "lucide-react"
import { useSession } from "next-auth/react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ApiKeyCard } from "@/components/dashboard/api-key-card"
import { GettingStartedCard } from "@/components/dashboard/getting-started-card"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { SystemAlerts } from "@/components/dashboard/system-alerts"
import { TokenManagement } from "@/components/dashboard/token-management"
import { WelcomeCard } from "@/components/dashboard/welcome-card"

export function DashboardContent() {
  const { data: session } = useSession()
  const { userData, isLoading, error, refreshUserData } = useUserData()

  // Format user data for stats cards
  const statsData = {
    totalApiCalls: userData.totalApiCalls,
    registeredDate: userData.registeredDate,
    hasApiKey: userData.hasApiKey,
    apiKey: userData.apiKey,
    lastUsed: userData.lastApiKeyUsed,
    keyStatus: userData.keyStatus,
    tokenBalance: userData.tokenBalance,
  }

  // Handler for token balance updates
  const handleTokenBalanceChange = (newBalance: number) => {
    console.log("Token balance changed:", newBalance)
    refreshUserData() // Refresh all user data
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
      <SystemAlerts alerts={userData.systemAlerts} />

      {/* Stats Cards */}
      {/* <StatsCards stats={statsData} isLoading={isLoading} /> */}

      <div className="grid gap-4">
        {/* API Key Quick Info */}
        <ApiKeyCard
          isLoading={isLoading}
          hasApiKey={userData.hasApiKey}
          apiKey={userData.apiKey}
        />

        {/* Token Management Card */}
        {/* <TokenManagement
          initialBalance={userData.tokenBalance}
          onBalanceChange={handleTokenBalanceChange}
          onRefreshRequest={refreshUserData}
        /> */}
      </div>

      {/* Getting Started */}
      {/* <GettingStartedCard /> */}
    </div>
  )
}
