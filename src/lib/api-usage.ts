import ApiUsageModel, { ApiUsage } from "@/models/ApiUsage"
import SubscriptionModel from "@/models/Subscription"
import mongoose from "mongoose"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth/auth-options"
import { connectToDatabase } from "@/lib/mongodb"

/**
 * Log an API request
 */
export const logApiRequest = async (
  userId: string | mongoose.Types.ObjectId,
  apiKeyId: string | mongoose.Types.ObjectId,
  endpoint: string,
  method: string,
  statusCode: number,
  responseTime: number,
  ipAddress?: string,
  userAgent?: string
): Promise<ApiUsage> => {
  await connectToDatabase()

  const userObjectId =
    typeof userId === "string" ? new mongoose.Types.ObjectId(userId) : userId
  const keyObjectId =
    typeof apiKeyId === "string"
      ? new mongoose.Types.ObjectId(apiKeyId)
      : apiKeyId

  // Create API usage record
  const usage = new ApiUsageModel({
    userId: userObjectId,
    apiKeyId: keyObjectId,
    endpoint,
    method,
    statusCode,
    responseTime,
    timestamp: new Date(),
    ipAddress,
    userAgent,
  })

  await usage.save()

  // Update user's subscription usage counter
  await SubscriptionModel.updateOne(
    { userId: userObjectId },
    { $inc: { currentUsage: 1 } }
  )

  return usage
}

/**
 * Get total API calls for a user
 */
export const getTotalApiCalls = async (
  userId: string | mongoose.Types.ObjectId
): Promise<number> => {
  await connectToDatabase()

  const userObjectId =
    typeof userId === "string" ? new mongoose.Types.ObjectId(userId) : userId

  const count = await ApiUsageModel.countDocuments({ userId: userObjectId })
  return count
}

/**
 * Get API usage stats by endpoint for a user
 */
export const getApiUsageByEndpoint = async (
  userId: string | mongoose.Types.ObjectId,
  startDate?: Date,
  endDate?: Date
): Promise<{ endpoint: string; count: number; percentage: number }[]> => {
  await connectToDatabase()

  const userObjectId =
    typeof userId === "string" ? new mongoose.Types.ObjectId(userId) : userId

  const match: any = { userId: userObjectId }

  if (startDate || endDate) {
    match.timestamp = {}
    if (startDate) match.timestamp.$gte = startDate
    if (endDate) match.timestamp.$lte = endDate
  }

  const result = await ApiUsageModel.aggregate([
    { $match: match },
    { $group: { _id: "$endpoint", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
  ])

  const total = result.reduce((sum, item) => sum + item.count, 0)

  return result.map((item) => ({
    endpoint: item._id,
    count: item.count,
    percentage:
      total > 0 ? parseFloat(((item.count / total) * 100).toFixed(1)) : 0,
  }))
}

/**
 * Get daily API usage for a user
 */
export const getDailyApiUsage = async (
  userId: string | mongoose.Types.ObjectId,
  days: number = 7
): Promise<{ date: string; requests: number }[]> => {
  await connectToDatabase()

  const userObjectId =
    typeof userId === "string" ? new mongoose.Types.ObjectId(userId) : userId

  const startDate = new Date()
  startDate.setDate(startDate.getDate() - days)
  startDate.setHours(0, 0, 0, 0)

  const result = await ApiUsageModel.aggregate([
    {
      $match: {
        userId: userObjectId,
        timestamp: { $gte: startDate },
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
    { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } },
  ])

  // Convert to required format and fill in missing days
  const usageMap = new Map()

  // Create all dates in the range
  for (let i = 0; i < days; i++) {
    const date = new Date(startDate)
    date.setDate(date.getDate() + i)
    const dateStr = date.toISOString().split("T")[0]
    usageMap.set(dateStr, 0)
  }

  // Fill with actual data
  result.forEach((item) => {
    const date = new Date(item._id.year, item._id.month - 1, item._id.day)
    const dateStr = date.toISOString().split("T")[0]
    usageMap.set(dateStr, item.count)
  })

  // Convert map to array
  return Array.from(usageMap).map(([date, requests]) => ({
    date,
    requests,
  }))
}

/**
 * Get monthly API usage for a user
 */
export const getMonthlyApiUsage = async (
  userId: string | mongoose.Types.ObjectId,
  months: number = 6
): Promise<{ month: string; requests: number }[]> => {
  await connectToDatabase()

  const userObjectId =
    typeof userId === "string" ? new mongoose.Types.ObjectId(userId) : userId

  const startDate = new Date()
  startDate.setMonth(startDate.getMonth() - months)
  startDate.setDate(1)
  startDate.setHours(0, 0, 0, 0)

  const result = await ApiUsageModel.aggregate([
    {
      $match: {
        userId: userObjectId,
        timestamp: { $gte: startDate },
      },
    },
    {
      $group: {
        _id: {
          year: { $year: "$timestamp" },
          month: { $month: "$timestamp" },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": 1, "_id.month": 1 } },
  ])

  // Convert to required format and fill in missing months
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]
  const usageMap = new Map()

  // Create all months in the range
  for (let i = 0; i < months; i++) {
    const date = new Date(startDate)
    date.setMonth(date.getMonth() + i)
    const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`
    usageMap.set(monthKey, {
      month: monthNames[date.getMonth()],
      requests: 0,
    })
  }

  // Fill with actual data
  result.forEach((item) => {
    const monthKey = `${item._id.year}-${item._id.month}`
    if (usageMap.has(monthKey)) {
      const data = usageMap.get(monthKey)
      data.requests = item.count
    }
  })

  // Convert map to array
  return Array.from(usageMap.values())
}

/**
 * Get user's current billing cycle info
 */
export const getCurrentBillingCycle = async (
  userId: string | mongoose.Types.ObjectId
): Promise<{
  totalCalls: number
  remainingQuota: number
  usagePercentage: number
  daysRemaining: number
  quota: number
  resetDate: Date
}> => {
  await connectToDatabase()

  const userObjectId =
    typeof userId === "string" ? new mongoose.Types.ObjectId(userId) : userId

  // Get user's subscription
  const subscription = await SubscriptionModel.findOne({ userId: userObjectId })

  if (!subscription) {
    // Return default values for free tier
    return {
      totalCalls: 0,
      remainingQuota: 5000, // Default free quota
      usagePercentage: 0,
      daysRemaining: 30,
      quota: 5000,
      resetDate: new Date(new Date().setDate(new Date().getDate() + 30)),
    }
  }

  // Calculate days remaining in billing cycle
  const now = new Date()
  const endDate = new Date(subscription.endDate)
  const daysRemaining = Math.max(
    0,
    Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  )

  // Calculate usage percentage
  const usagePercentage =
    (subscription.currentUsage / subscription.monthlyQuota) * 100

  return {
    totalCalls: subscription.currentUsage,
    remainingQuota: Math.max(
      0,
      subscription.monthlyQuota - subscription.currentUsage
    ),
    usagePercentage: parseFloat(usagePercentage.toFixed(1)),
    daysRemaining,
    quota: subscription.monthlyQuota,
    resetDate: subscription.endDate,
  }
}

/**
 * Get current user's API usage statistics - for use in server components
 */
export const getCurrentUserApiUsage = async (): Promise<{
  totalCalls: number
  usage: { endpoint: string; count: number; percentage: number }[]
  daily: { date: string; requests: number }[]
  monthly: { month: string; requests: number }[]
  billing: {
    totalCalls: number
    remainingQuota: number
    usagePercentage: number
    daysRemaining: number
    quota: number
    resetDate: Date
  }
} | null> => {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return null
    }

    // Ensure database is connected before proceeding
    await connectToDatabase()

    // Use Promise.all to get all stats in parallel
    const [totalCalls, usageByEndpoint, dailyUsage, monthlyUsage, billingInfo] =
      await Promise.all([
        getTotalApiCalls(session.user.id),
        getApiUsageByEndpoint(session.user.id),
        getDailyApiUsage(session.user.id),
        getMonthlyApiUsage(session.user.id),
        getCurrentBillingCycle(session.user.id),
      ])

    return {
      totalCalls,
      usage: usageByEndpoint,
      daily: dailyUsage,
      monthly: monthlyUsage,
      billing: billingInfo,
    }
  } catch (error) {
    console.error("Error getting user API usage:", error)
    // Return default empty data structure instead of null
    return {
      totalCalls: 0,
      usage: [],
      daily: [],
      monthly: [],
      billing: {
        totalCalls: 0,
        remainingQuota: 0,
        usagePercentage: 0,
        daysRemaining: 0,
        quota: 0,
        resetDate: new Date(),
      },
    }
  }
}
