import { NextRequest, NextResponse } from "next/server"
import { User } from "@/models/User"
import mongoose from "mongoose"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth/auth-options"
import { connectToDatabase } from "@/lib/mongodb"

// Adjust tokens for a user
export async function POST(request: NextRequest) {
  try {
    // Check if user is authenticated and has admin role
    const session = await getServerSession(authOptions)

    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized", message: "Admin access required" },
        { status: 403 }
      )
    }

    await connectToDatabase()

    // Parse request body
    const { userId, amount, reason, operation = "add" } = await request.json()

    // Validate inputs
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        { error: "Bad Request", message: "Valid user ID is required" },
        { status: 400 }
      )
    }

    if (typeof amount !== "number" || isNaN(amount) || amount <= 0) {
      return NextResponse.json(
        {
          error: "Bad Request",
          message: "Valid amount greater than 0 is required",
        },
        { status: 400 }
      )
    }

    // Find user by ID
    const user = await User.findById(userId)

    if (!user) {
      return NextResponse.json(
        { error: "Not Found", message: "User not found" },
        { status: 404 }
      )
    }

    // Calculate new token balance based on operation
    let newBalance = user.tokenBalance
    let actualChange = 0

    switch (operation) {
      case "add":
        newBalance += amount
        actualChange = amount
        break
      case "deduct":
        // Prevent negative balance
        actualChange = Math.min(amount, user.tokenBalance)
        newBalance = Math.max(0, user.tokenBalance - amount)
        break
      case "set":
        actualChange = amount - user.tokenBalance
        newBalance = amount
        break
      default:
        return NextResponse.json(
          { error: "Bad Request", message: "Invalid operation type" },
          { status: 400 }
        )
    }

    // Update user's token balance
    user.tokenBalance = newBalance
    await user.save()

    // TODO: Log token transaction in a separate collection

    return NextResponse.json({
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      previousBalance: user.tokenBalance - actualChange,
      newBalance: user.tokenBalance,
      change: actualChange,
      operation,
    })
  } catch (error) {
    console.error("Error adjusting tokens:", error)
    return NextResponse.json(
      {
        error: "Failed to adjust tokens",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}

// GET token transaction history
export async function GET(request: NextRequest) {
  try {
    // Check if user is authenticated and has admin role
    const session = await getServerSession(authOptions)

    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized", message: "Admin access required" },
        { status: 403 }
      )
    }

    await connectToDatabase()

    // Extract query parameters
    const { searchParams } = request.nextUrl
    const userId = searchParams.get("userId")
    const limit = parseInt(searchParams.get("limit") || "50")

    // For now, return mock data since we don't have a token transaction model yet
    // TODO: Implement actual token transaction history from database
    const mockTransactions = [
      {
        id: "1",
        userId: "507f1f77bcf86cd799439011",
        userName: "John Doe",
        userEmail: "john@example.com",
        adminId: session.user.id,
        adminName: session.user.name,
        tokens: 500,
        operation: "add",
        reason: "Promotional bonus",
        timestamp: new Date("2023-06-15"),
      },
      {
        id: "2",
        userId: "507f1f77bcf86cd799439012",
        userName: "Jane Smith",
        userEmail: "jane@example.com",
        adminId: session.user.id,
        adminName: session.user.name,
        tokens: -100,
        operation: "deduct",
        reason: "API usage fee",
        timestamp: new Date("2023-06-10"),
      },
      {
        id: "3",
        userId: "507f1f77bcf86cd799439013",
        userName: "Robert Johnson",
        userEmail: "robert@example.com",
        adminId: session.user.id,
        adminName: session.user.name,
        tokens: 1000,
        operation: "add",
        reason: "Subscription upgrade",
        timestamp: new Date("2023-06-05"),
      },
    ]

    return NextResponse.json({
      transactions: mockTransactions,
      meta: {
        total: mockTransactions.length,
        limit,
      },
    })
  } catch (error) {
    console.error("Error fetching token transactions:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch token transactions",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}

// PUT to perform bulk token operations
export async function PUT(request: NextRequest) {
  try {
    // Check if user is authenticated and has admin role
    const session = await getServerSession(authOptions)

    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized", message: "Admin access required" },
        { status: 403 }
      )
    }

    await connectToDatabase()

    // Parse request body
    const { userFilter, operation, amount, reason } = await request.json()

    if (!operation || !amount || amount <= 0) {
      return NextResponse.json(
        {
          error: "Bad Request",
          message: "Valid operation and amount are required",
        },
        { status: 400 }
      )
    }

    // Build query filter
    const filter: any = {}

    if (userFilter?.role && userFilter.role !== "all") {
      filter.role = userFilter.role
    }

    // Find matching users
    const users = await User.find(filter)

    if (users.length === 0) {
      return NextResponse.json(
        { error: "Not Found", message: "No users match the filter criteria" },
        { status: 404 }
      )
    }

    // Apply token operation to each user
    const results = []

    for (const user of users) {
      let newBalance = user.tokenBalance
      let actualChange = 0

      switch (operation) {
        case "add":
          newBalance += amount
          actualChange = amount
          break
        case "set":
          actualChange = amount - user.tokenBalance
          newBalance = amount
          break
        case "multiply":
          const multiplier = amount
          actualChange =
            Math.floor(user.tokenBalance * multiplier) - user.tokenBalance
          newBalance = Math.floor(user.tokenBalance * multiplier)
          break
        default:
          continue
      }

      // Update user's token balance
      user.tokenBalance = newBalance
      await user.save()

      // Add to results
      results.push({
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        previousBalance: user.tokenBalance - actualChange,
        newBalance: user.tokenBalance,
        change: actualChange,
      })

      // TODO: Log token transaction in a separate collection
    }

    return NextResponse.json({
      success: true,
      usersAffected: results.length,
      summary: results,
    })
  } catch (error) {
    console.error("Error performing bulk token operation:", error)
    return NextResponse.json(
      {
        error: "Failed to perform bulk token operation",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}
