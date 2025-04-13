"use client"

import { useCallback, useEffect, useState } from "react"
import {
  ArrowRight,
  BarChart3,
  Clock,
  Download,
  FileText,
  RefreshCw,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"

// Add interfaces for type safety
interface EndpointUsage {
  endpoint: string
  count: number
  percentage: number
}

interface DailyUsage {
  date: string
  requests: number
}

interface MonthlyUsage {
  month: string
  requests: number
}

interface UsageData {
  total: number
  remaining: number
  limit: number
  usagePercentage: number
  daysRemaining: number
  endpoints: EndpointUsage[]
  daily: DailyUsage[]
  monthly: MonthlyUsage[]
}

export default function UsagePage() {
  const [isLoading, setIsLoading] = useState(true)
  const [timeRange, setTimeRange] = useState("7d")
  const [usageData, setUsageData] = useState<UsageData>({
    total: 0,
    remaining: 0,
    limit: 0,
    usagePercentage: 0,
    daysRemaining: 0,
    endpoints: [],
    daily: [],
    monthly: [],
  })

  // Define fetchUsageData with useCallback to avoid dependency issues
  const fetchUsageData = useCallback(async () => {
    setIsLoading(true)

    try {
      const response = await fetch(
        `/api/dashboard/usage?timeRange=${timeRange}`
      )

      if (!response.ok) {
        throw new Error("Failed to fetch usage data")
      }

      const data = await response.json()

      // Format the data for our UI
      setUsageData({
        total: data.usageStats?.totalCalls || 0,
        remaining: data.usageStats?.billing?.remainingQuota || 0,
        limit: data.usageStats?.billing?.quota || 0,
        usagePercentage: data.usageStats?.billing?.usagePercentage || 0,
        daysRemaining: data.usageStats?.billing?.daysRemaining || 0,
        endpoints: data.usageStats?.usage || [],
        daily: data.usageStats?.daily || [],
        monthly: data.usageStats?.monthly || [],
      })
    } catch (error) {
      console.error("Error fetching usage data:", error)
      toast({
        title: "Error",
        description: "Failed to load usage statistics. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }, [timeRange])

  // Fetch usage data on mount and when timeRange changes
  useEffect(() => {
    fetchUsageData()
  }, [fetchUsageData])

  const handleRefreshData = () => {
    fetchUsageData()
    toast({
      title: "Usage data refreshed",
      description: "Your API usage statistics have been updated.",
    })
  }

  const handleDownloadReport = () => {
    toast({
      title: "Report generation started",
      description: "Your usage report will be emailed to you when ready.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            API Usage Statistics
          </h1>
          <p className="text-muted-foreground">
            Monitor your API usage and remaining quota for this billing cycle.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Select range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24 Hours</SelectItem>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
              <SelectItem value="90d">Last Quarter</SelectItem>
              <SelectItem value="1y">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="icon"
            onClick={handleRefreshData}
            disabled={isLoading}
          >
            <RefreshCw className={cn("h-4 w-4", isLoading && "animate-spin")} />
            <span className="sr-only">Refresh data</span>
          </Button>
        </div>
      </div>

      {/* Usage Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total API Calls
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-28" />
            ) : (
              <>
                <div className="text-2xl font-bold">
                  {usageData.total.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  Current billing period
                </p>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Remaining Quota
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-28" />
            ) : (
              <>
                <div className="text-2xl font-bold">
                  {usageData.remaining.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  Of {usageData.limit.toLocaleString()} monthly limit
                </p>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Usage Percentage
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-28" />
            ) : (
              <>
                <div className="text-2xl font-bold">
                  {usageData.usagePercentage.toFixed(1)}%
                </div>
                <div className="mt-2 h-2 w-full rounded-full bg-secondary">
                  <div
                    className={cn(
                      "h-full rounded-full",
                      usageData.usagePercentage > 80
                        ? "bg-destructive"
                        : "bg-primary"
                    )}
                    style={{ width: `${usageData.usagePercentage}%` }}
                  />
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Billing Cycle</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-28" />
            ) : (
              <>
                <div className="text-2xl font-bold">
                  {usageData.daysRemaining} days
                </div>
                <p className="text-xs text-muted-foreground">
                  Until next quota reset
                </p>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Detailed Usage Statistics */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Usage Breakdown</CardTitle>
          <CardDescription>
            View detailed breakdown of your API usage by endpoint.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="endpoints">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="endpoints">By Endpoint</TabsTrigger>
              <TabsTrigger value="timeline">By Timeline</TabsTrigger>
            </TabsList>
            <TabsContent value="endpoints" className="space-y-4">
              {isLoading ? (
                <div className="space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ) : (
                <div className="mt-4 space-y-4">
                  {usageData.endpoints.length === 0 ? (
                    <p className="text-center text-muted-foreground">
                      No endpoint data available yet.
                    </p>
                  ) : (
                    usageData.endpoints.map((endpoint) => (
                      <div key={endpoint.endpoint} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium">
                              {endpoint.endpoint}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {endpoint.count.toLocaleString()} requests (
                              {endpoint.percentage}%)
                            </p>
                          </div>
                          <p className="text-sm">
                            {endpoint.count.toLocaleString()}
                          </p>
                        </div>
                        <div className="h-2 w-full rounded-full bg-secondary">
                          <div
                            className="h-full rounded-full bg-primary"
                            style={{ width: `${endpoint.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </TabsContent>
            <TabsContent value="timeline">
              <div className="mt-4 space-y-4">
                <p className="text-sm font-medium">Daily Usage (Last 7 Days)</p>
                {isLoading ? (
                  <div className="space-y-3">
                    <Skeleton className="h-28 w-full" />
                  </div>
                ) : usageData.daily.length === 0 ? (
                  <p className="text-center text-muted-foreground">
                    No daily usage data available yet.
                  </p>
                ) : (
                  <div className="flex h-40 items-end gap-2">
                    {usageData.daily.map((day) => {
                      const maxRequests = Math.max(
                        ...usageData.daily.map((d) => d.requests)
                      )
                      const heightPercentage =
                        maxRequests === 0
                          ? 0
                          : (day.requests / maxRequests) * 100

                      return (
                        <div
                          key={day.date}
                          className="flex flex-1 flex-col items-center gap-2"
                        >
                          <div
                            className="w-full rounded-t bg-primary"
                            style={{ height: `${heightPercentage}%` }}
                          />
                          <span className="text-xs text-muted-foreground">
                            {new Date(day.date).toLocaleDateString(undefined, {
                              weekday: "short",
                            })}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="justify-between">
          <p className="text-sm text-muted-foreground">
            Data refreshed {new Date().toLocaleString()}
          </p>
          <Button
            variant="outline"
            onClick={handleDownloadReport}
            className="gap-2"
          >
            <Download className="h-4 w-4" />
            Download Report
          </Button>
        </CardFooter>
      </Card>

      {/* Upgrade Card */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle>Need more API calls?</CardTitle>
          <CardDescription>
            Upgrade your plan to increase your API quota and access additional
            features.
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-2">
          <p className="text-sm">
            Your current plan includes {usageData.limit.toLocaleString()} API
            calls per month. Upgrade to Pro for 250,000 calls or Enterprise for
            unlimited access.
          </p>
        </CardContent>
        <CardFooter>
          <Button className="gap-2">
            View Pricing Plans
            <ArrowRight className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
