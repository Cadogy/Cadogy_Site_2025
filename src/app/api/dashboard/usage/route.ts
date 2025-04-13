import { NextRequest, NextResponse } from "next/server"
import { User } from "@/models/User"
import mongoose from "mongoose"
import { getServerSession } from "next-auth"

import { getCurrentUserApiKey } from "@/lib/api-keys"
import { getCurrentUserApiUsage } from "@/lib/api-usage"
import { authOptions } from "@/lib/auth/auth-options"
import { connectToDatabase } from "@/lib/mongodb"
import { getCurrentUserAlerts } from "@/lib/system-alerts"

export async function GET(request: NextRequest) {
  // Check if user is authenticated
  const session = await getServerSession(authOptions)

  // console.log("Dashboard API route - session user:", session?.user?.id)

  if (!session?.user) {
    // console.log("Dashboard API - Unauthorized access attempt")
    return NextResponse.json(
      {
        error: "Unauthorized",
        message: "Please sign in to access this resource",
      },
      { status: 401 }
    )
  }

  try {
    // console.log("Dashboard API - User authenticated:", session.user.email)
    const db = await connectToDatabase()

    // Get user data directly from MongoDB including token balance
    const userObjectId = new mongoose.Types.ObjectId(session.user.id)
    // console.log("Dashboard API - User ObjectId:", userObjectId)

    // Use direct MongoDB to get the user document
    const usersCollection = db.collection("users")
    const userData = await usersCollection.findOne({ _id: userObjectId })

    // console.log(
    //   "Dashboard API - User data retrieved:",
    //   userData ? "Found" : "Not found",
    //   "Token balance:",
    //   userData?.tokenBalance
    // )

    // Get all data in parallel
    const [usageStats, apiKey, alerts] = await Promise.all([
      getCurrentUserApiUsage(),
      getCurrentUserApiKey(),
      getCurrentUserAlerts(),
    ])

    // Format API key for frontend - handle null case
    const formattedApiKey = apiKey
      ? {
          id: apiKey._id ? apiKey._id.toString() : apiKey.key,
          name: apiKey.name,
          key: apiKey.key.substring(0, 16) + "●●●●●●●●●●●●●●●●",
          fullKey: apiKey.key,
          type: apiKey.type,
          isActive: apiKey.isActive,
          lastUsed: apiKey.lastUsed,
          createdAt: apiKey.createdAt,
        }
      : null

    const responseData = {
      user: {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        registeredAt: userData?.createdAt || new Date(),
        tokenBalance: userData?.tokenBalance || 0,
      },
      usageStats,
      apiKey: formattedApiKey,
      alerts,
    }

    // console.log(
    //   "Dashboard API - Response data:",
    //   JSON.stringify({
    //     ...responseData,
    //     user: {
    //       ...responseData.user,
    //       tokenBalance: responseData.user.tokenBalance,
    //     },
    //   })
    // )

    return NextResponse.json(responseData)
  } catch (error) {
    console.error("Dashboard data error:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch dashboard data",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}
