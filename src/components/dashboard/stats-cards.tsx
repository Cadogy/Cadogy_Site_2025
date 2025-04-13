import { BarChart3, Calendar, Key } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

import { formatDate } from "./date-utils"

export interface UserStats {
  totalApiCalls: number
  registeredDate: Date
  hasApiKey: boolean
  apiKey: string
  keyStatus: string
  lastUsed: string
}

interface StatsCardsProps {
  stats: UserStats
  isLoading: boolean
}

export function StatsCards({ stats, isLoading }: StatsCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {/* API Calls Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total API Calls</CardTitle>
          <BarChart3 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-8 w-28" />
          ) : (
            <div className="text-2xl font-bold">
              {stats.totalApiCalls.toLocaleString()}
            </div>
          )}
          <p className="text-xs text-muted-foreground">
            Lifetime API call count
          </p>
        </CardContent>
      </Card>

      {/* Registration Date Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Member Since</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-8 w-36" />
          ) : (
            <div className="text-2xl font-bold">
              {formatDate(stats.registeredDate)}
            </div>
          )}
          <p className="text-xs text-muted-foreground">
            Account registration date
          </p>
        </CardContent>
      </Card>

      {/* API Key Status Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">API Key Status</CardTitle>
          <Key className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-8 w-24" />
          ) : !stats.hasApiKey ? (
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold">No API Key</div>
              <Badge variant="secondary">Not Created</Badge>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold">{stats.keyStatus}</div>
              {stats.keyStatus === "Active" ? (
                <Badge variant="default" className="bg-green-500">
                  Active
                </Badge>
              ) : (
                <Badge variant="destructive">Inactive</Badge>
              )}
            </div>
          )}
          <p className="text-xs text-muted-foreground">
            {stats.hasApiKey
              ? `Last used ${stats.lastUsed}`
              : "Create an API key to get started"}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
