import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"

import { getCurrentUserApiKey } from "@/lib/api-keys"
import { getCurrentUserApiUsage } from "@/lib/api-usage"
import { authOptions } from "@/lib/auth/auth-options"
import { getCurrentUserAlerts } from "@/lib/system-alerts"

export async function GET(request: NextRequest) {
  // Check if user is authenticated
  const session = await getServerSession(authOptions)

  // console.log(
  //   "Session in API route:",
  //   session ? "Session exists" : "No session found"
  // )

  if (!session?.user) {
    // console.log("Unauthorized access attempt to /api/dashboard/usage")
    return NextResponse.json(
      {
        error: "Unauthorized",
        message: "Please sign in to access this resource",
      },
      { status: 401 }
    )
  }

  try {
    // console.log("User authenticated:", session.user.email)

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

    return NextResponse.json({
      user: {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        registeredAt: new Date(),
      },
      usageStats,
      apiKey: formattedApiKey,
      alerts,
    })
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
