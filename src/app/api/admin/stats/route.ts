import { NextRequest, NextResponse } from "next/server"
import ApiUsageModel from "@/models/ApiUsage"
import SubscriptionModel from "@/models/Subscription"
import { User } from "@/models/User"
import mongoose from "mongoose"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth/auth-options"
import { connectToDatabase } from "@/lib/mongodb"

export async function GET(request: NextRequest) {
  // Check if user is authenticated and is admin
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return NextResponse.json(
      {
        error: "Unauthorized",
        message: "Please sign in to access this resource",
      },
      { status: 401 }
    )
  }

  if (session.user.role !== "admin") {
    return NextResponse.json(
      {
        error: "Forbidden",
        message: "You don't have permission to access this resource",
      },
      { status: 403 }
    )
  }

  try {
    // Connect to database
    const db = await connectToDatabase()

    // Get collection reference for User model
    const userCollection = db.collection("users")

    // Get total users count
    const totalUsers = await userCollection.countDocuments({})

    // Get API requests in the last 30 days
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const apiRequestsLast30Days = await ApiUsageModel.countDocuments({
      timestamp: { $gte: thirtyDaysAgo },
    })

    // Get total API requests
    const totalApiRequests = await ApiUsageModel.countDocuments({})

    // Get revenue data (for demo, calculate from subscriptions)
    const subscriptions = await SubscriptionModel.find({
      status: "active",
      planType: { $ne: "free" }, // Exclude free plans
    })

    // Calculate monthly revenue from subscriptions
    const monthlyRevenue = subscriptions.reduce(
      (total, sub) => total + (sub.amount || 0),
      0
    )

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
      date: `${day._id.year}-${day._id.month.toString().padStart(2, "0")}-${day._id.day.toString().padStart(2, "0")}`,
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
        status: activity.status || activity.statusCode,
        timestamp: activity.timestamp,
        user: userId
          ? {
              id: userId,
              name: userName,
            }
          : null,
      }
    })

    // Return all stats
    return NextResponse.json({
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
    })
  } catch (error) {
    console.error("Admin stats error:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch admin statistics",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}
