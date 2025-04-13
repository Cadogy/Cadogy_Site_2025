import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth/auth-options"
import {
  addUserTokens,
  useUserTokens as decreaseUserTokens,
  getUserTokenBalance,
  setUserTokenBalance,
} from "@/lib/tokens"

// Get token balance
export async function GET(request: NextRequest) {
  // Check if user is authenticated
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

  try {
    const balance = await getUserTokenBalance(session.user.id)

    return NextResponse.json({
      balance,
    })
  } catch (error) {
    console.error("Token balance fetch error:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch token balance",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}

// Update token balance
export async function POST(request: NextRequest) {
  // console.log("POST /api/user/tokens - Starting token update")

  // Check if user is authenticated
  const session = await getServerSession(authOptions)
  // console.log("User session:", session?.user?.id, session?.user?.email)

  if (!session?.user) {
    // console.log("No user session found")
    return NextResponse.json(
      {
        error: "Unauthorized",
        message: "Please sign in to access this resource",
      },
      { status: 401 }
    )
  }

  // Admin check if necessary
  const isAdmin = session.user.role === "admin"
  // console.log("Is admin:", isAdmin)

  try {
    const data = await request.json()
    // console.log("Request data:", data)

    const { action, amount, userId } = data

    // Only allow admins to set token balances for other users
    const targetUserId = isAdmin && userId ? userId : session.user.id
    // console.log("Target user ID:", targetUserId)

    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      // console.log("Invalid amount:", amount)
      return NextResponse.json(
        {
          error: "Invalid amount",
          message: "Amount must be a positive number",
        },
        { status: 400 }
      )
    }

    let result

    switch (action) {
      case "add":
        // console.log("Adding tokens:", amount, "to user:", targetUserId)
        const newBalance = await addUserTokens(targetUserId, Number(amount))
        // console.log("New balance after add:", newBalance)
        result = {
          success: true,
          balance: newBalance,
        }
        break

      case "use":
        // console.log("Using tokens:", amount, "from user:", targetUserId)
        result = await decreaseUserTokens(targetUserId, Number(amount))
        // console.log("Result after use:", result)
        break

      case "set":
        // Only admins can set absolute balances
        if (!isAdmin) {
          // console.log("Non-admin tried to set balance")
          return NextResponse.json(
            {
              error: "Unauthorized",
              message: "Only administrators can set token balances",
            },
            { status: 403 }
          )
        }

        // console.log("Setting tokens to:", amount, "for user:", targetUserId)
        const setBalance = await setUserTokenBalance(
          targetUserId,
          Number(amount)
        )
        // console.log("New balance after set:", setBalance)
        result = {
          success: true,
          balance: setBalance,
        }
        break

      default:
        // console.log("Invalid action:", action)
        return NextResponse.json(
          {
            error: "Invalid action",
            message: "Action must be one of: add, use, set",
          },
          { status: 400 }
        )
    }

    // console.log("Final result:", result)
    return NextResponse.json(result)
  } catch (error) {
    console.error("Token balance update error:", error)
    return NextResponse.json(
      {
        error: "Failed to update token balance",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}
