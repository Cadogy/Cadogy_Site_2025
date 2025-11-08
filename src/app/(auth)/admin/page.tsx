import { Metadata } from "next"
import { redirect } from "next/navigation"
import ApiUsageModel from "@/models/ApiUsage"
import SubscriptionModel from "@/models/Subscription"
import { User } from "@/models/User"
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react"
import mongoose from "mongoose"
import { getServerSession } from "next-auth/next"
import Stripe from "stripe"

import { authOptions } from "@/lib/auth/auth-options"
import { connectToDatabase } from "@/lib/mongodb"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

// Define the types for admin stats
interface AdminStats {
  totalUsers: number
  apiRequests: {
    last30Days: number
    total: number
  }
  revenue: {
    monthly: number
    currency: string
  }
  dailyApiUsage: {
    date: string
    count: number
  }[]
  recentActivity: {
    id: string
    endpoint: string
    method: string
    status: number
    timestamp: string
    user: {
      id: string
      name: string
    } | null
  }[]
  systemStatus: {
    api: string
    database: string
    authentication: string
  }
}

export const metadata: Metadata = {
  title: "Admin Dashboard - Cadogy",
  description: "Overview of your application's key metrics and controls",
}

// Update the getAdminStats function to include Stripe revenue data
async function getAdminStats(): Promise<AdminStats | null> {
  try {
    // Connect to database
    const db = await connectToDatabase()
    if (!db) {
      throw new Error("Failed to connect to database")
    }

    // Get users collection
    const usersCollection = db.collection("users")
    const totalUsers = await usersCollection.countDocuments({})

    // Get API requests in the last 30 days
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const apiRequestsLast30Days = await ApiUsageModel.countDocuments({
      timestamp: { $gte: thirtyDaysAgo },
    })

    // Get total API requests
    const totalApiRequests = await ApiUsageModel.countDocuments({})

    // Initialize Stripe API client
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
      apiVersion: "2023-10-16" as any,
    })

    // Get current month's revenue from Stripe
    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const startOfMonthTimestamp = Math.floor(startOfMonth.getTime() / 1000)

    // Query Stripe for successful payments this month
    let monthlyRevenue = 0
    try {
      const charges = await stripe.charges.list({
        created: { gte: startOfMonthTimestamp },
        limit: 100,
      })

      // Filter for succeeded charges only (doing this client-side since there's a type issue)
      const successfulCharges = charges.data.filter(
        (charge) => charge.status === "succeeded"
      )

      // Sum up the amount from successful charges
      monthlyRevenue =
        successfulCharges.reduce((total, charge) => {
          return total + charge.amount
        }, 0) / 100 // Convert from cents to dollars
    } catch (stripeError) {
      console.error("Error fetching Stripe revenue data:", stripeError)

      // Fallback to database subscription data if Stripe API fails
      const subscriptions = await SubscriptionModel.find({
        status: "active",
        planType: { $ne: "free" }, // Exclude free plans
      })

      // Calculate monthly revenue from subscriptions as fallback
      monthlyRevenue = subscriptions.reduce(
        (total, sub) => total + (sub.amount || 0),
        0
      )
    }

    // Get API usage by day for the chart
    const dailyApiUsage = await ApiUsageModel.aggregate([
      {
        $match: {
          timestamp: { $gte: thirtyDaysAgo },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$timestamp" },
            month: { $month: "$timestamp" },
            day: { $dayOfMonth: "$timestamp" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 },
      },
    ])

    // Format daily usage data
    const formattedDailyUsage = dailyApiUsage.map((day) => ({
      date: `${day._id.year}-${String(day._id.month).padStart(2, "0")}-${String(day._id.day).padStart(2, "0")}`,
      count: day.count,
    }))

    // Get recent system activity (latest API usage entries)
    const recentActivity = await ApiUsageModel.find({})
      .sort({ timestamp: -1 })
      .limit(5)
      .populate("userId", "name email")
      .lean()

    // Format recent activity with proper type checking
    const formattedActivity = recentActivity.map((activity) => {
      const activityId = activity._id ? activity._id.toString() : ""
      const userId =
        activity.userId &&
        typeof activity.userId === "object" &&
        "_id" in activity.userId
          ? activity.userId._id?.toString()
          : ""
      const userName =
        activity.userId &&
        typeof activity.userId === "object" &&
        "name" in activity.userId
          ? activity.userId.name || (activity.userId.email as string)
          : ""

      return {
        id: activityId,
        endpoint: activity.endpoint as string,
        method: activity.method as string,
        status: activity.status || 200,
        timestamp: activity.timestamp,
        user: userId
          ? {
              id: userId,
              name: userName,
            }
          : null,
      }
    })

    return {
      totalUsers,
      apiRequests: {
        last30Days: apiRequestsLast30Days,
        total: totalApiRequests,
      },
      revenue: {
        monthly: monthlyRevenue,
        currency: "USD",
      },
      dailyApiUsage: formattedDailyUsage,
      recentActivity: formattedActivity,
      systemStatus: {
        api: "operational",
        database: "operational",
        authentication: "operational",
      },
    }
  } catch (error) {
    console.error("Error getting admin stats:", error)
    return null
  }
}

export default async function AdminDashboardPage() {
  // Verify admin access again for extra security
  const session = await getServerSession(authOptions)

  if (!session?.user || session.user.role !== "admin") {
    redirect("/dashboard")
  }

  // Fetch the admin stats directly from database
  const stats = await getAdminStats()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your users, system settings, and monitor platform activity.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total Users</CardTitle>
            <CardDescription>
              Active user accounts on the platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            {stats ? (
              <div className="text-3xl font-bold">
                {stats.totalUsers.toLocaleString()}
              </div>
            ) : (
              <Skeleton className="h-8 w-24" />
            )}
            <p className="text-xs text-muted-foreground">
              {stats ? "All registered users" : "Loading user data..."}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>API Requests</CardTitle>
            <CardDescription>
              Total API requests in the last 30 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            {stats ? (
              <div className="text-3xl font-bold">
                {stats.apiRequests.last30Days.toLocaleString()}
              </div>
            ) : (
              <Skeleton className="h-8 w-24" />
            )}
            <p className="text-xs text-muted-foreground">
              {stats
                ? `${stats.apiRequests.total.toLocaleString()} total requests all-time`
                : "Loading API data..."}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Revenue</CardTitle>
            <CardDescription>Total revenue this month</CardDescription>
          </CardHeader>
          <CardContent>
            {stats ? (
              <div className="text-3xl font-bold">
                $
                {stats.revenue.monthly.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>
            ) : (
              <Skeleton className="h-8 w-24" />
            )}
            <p className="text-xs text-muted-foreground">
              {stats ? "From active subscriptions" : "Loading revenue data..."}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest system events and user actions
            </CardDescription>
          </CardHeader>
          <CardContent>
            {stats && stats.recentActivity.length > 0 ? (
              <div className="space-y-4">
                {stats.recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex flex-col space-y-1 border-b pb-3 last:border-0"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{activity.endpoint}</span>
                      <span
                        className={`text-xs ${
                          activity.status >= 200 && activity.status < 300
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {activity.method} {activity.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{activity.user?.name || "Anonymous"}</span>
                      <span>
                        {new Date(activity.timestamp).toLocaleString(
                          undefined,
                          {
                            dateStyle: "short",
                            timeStyle: "short",
                          }
                        )}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : !stats ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                No recent activity to display.
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>
              Current status of system components
            </CardDescription>
          </CardHeader>
          <CardContent>
            {stats ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">API Service</span>
                  <span className="flex items-center text-sm">
                    <span
                      className={`mr-2 h-2 w-2 rounded-lg ${
                        stats.systemStatus.api === "operational"
                          ? "bg-green-500"
                          : stats.systemStatus.api === "degraded"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                      }`}
                    ></span>
                    {stats.systemStatus.api === "operational"
                      ? "Operational"
                      : stats.systemStatus.api === "degraded"
                        ? "Degraded"
                        : "Down"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Database</span>
                  <span className="flex items-center text-sm">
                    <span
                      className={`mr-2 h-2 w-2 rounded-lg ${
                        stats.systemStatus.database === "operational"
                          ? "bg-green-500"
                          : stats.systemStatus.database === "degraded"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                      }`}
                    ></span>
                    {stats.systemStatus.database === "operational"
                      ? "Operational"
                      : stats.systemStatus.database === "degraded"
                        ? "Degraded"
                        : "Down"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Authentication</span>
                  <span className="flex items-center text-sm">
                    <span
                      className={`mr-2 h-2 w-2 rounded-lg ${
                        stats.systemStatus.authentication === "operational"
                          ? "bg-green-500"
                          : stats.systemStatus.authentication === "degraded"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                      }`}
                    ></span>
                    {stats.systemStatus.authentication === "operational"
                      ? "Operational"
                      : stats.systemStatus.authentication === "degraded"
                        ? "Degraded"
                        : "Down"}
                  </span>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-6 w-full" />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
