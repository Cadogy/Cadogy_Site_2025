"use client"

import { AlertCircle } from "lucide-react"
import { useSession } from "next-auth/react"

import { useDashboardData } from "@/hooks/use-dashboard-data"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ApiKeyCard } from "@/components/dashboard/api-key-card"
import { GettingStartedCard } from "@/components/dashboard/getting-started-card"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { SystemAlerts } from "@/components/dashboard/system-alerts"
import { WelcomeCard } from "@/components/dashboard/welcome-card"

export default function DashboardPage() {
  const { data: session } = useSession()
  const { isLoading, error, userStats, systemAlerts } = useDashboardData()

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
      <StatsCards stats={userStats} isLoading={isLoading} />

      {/* API Key Quick Info */}
      <ApiKeyCard
        isLoading={isLoading}
        hasApiKey={userStats.hasApiKey}
        apiKey={userStats.apiKey}
      />

      {/* Getting Started */}
      <GettingStartedCard />
    </div>
  )
}
