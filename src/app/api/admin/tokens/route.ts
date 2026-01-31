import { NextRequest, NextResponse } from "next/server"
import { User } from "@/models/User"
import { TokenTransaction } from "@/models/TokenTransaction"
import mongoose from "mongoose"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth/auth-options"
import { connectToDatabase } from "@/lib/mongodb"
import { revalidatePath } from "next/cache"

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

    const previousBalance = user.tokenBalance

    let newBalance = user.tokenBalance
    let actualChange = 0

    switch (operation) {
      case "add":
        newBalance += amount
        actualChange = amount
        break
      case "deduct":
        if (amount > user.tokenBalance) {
          return NextResponse.json(
            {
              error: "Bad Request",
              message: `Cannot deduct ${amount} tokens. User only has ${user.tokenBalance} tokens available.`,
            },
            { status: 400 }
          )
        }
        actualChange = -amount
        newBalance = user.tokenBalance - amount
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

    user.tokenBalance = newBalance
    await user.save()

    await TokenTransaction.create({
      userId: user._id.toString(),
      adminId: session.user.id,
      tokens: actualChange,
      operation,
      reason: reason || `Token ${operation}`,
      previousBalance,
      newBalance,
    })

    // Revalidate admin tokens page
    revalidatePath("/admin/tokens")

    return NextResponse.json({
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      previousBalance,
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

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized", message: "Admin access required" },
        { status: 403 }
      )
    }

    await connectToDatabase()

    const { searchParams } = request.nextUrl
    const userId = searchParams.get("userId")
    const limit = parseInt(searchParams.get("limit") || "50")

    const query = userId ? { userId } : {}

    const transactions = await TokenTransaction.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean()

    const userIds = [...new Set(transactions.map((t: any) => t.userId))]
    const adminIds = [...new Set(transactions.map((t: any) => t.adminId))]
    const allIds = [...new Set([...userIds, ...adminIds])]

    const users = await User.find({ _id: { $in: allIds } }).lean()
    const userMap = new Map(
      users.map((u: any) => [
        u._id.toString(),
        { name: u.name, email: u.email, role: u.role },
      ])
    )

    const formattedTransactions = transactions.map((t: any) => {
      const user = userMap.get(t.userId)
      const admin = userMap.get(t.adminId)
      return {
        id: t._id.toString(),
        userId: t.userId,
        userName: user?.name || "Unknown User",
        userEmail: user?.email || "",
        adminId: t.adminId,
        adminName: admin?.name || "Unknown Admin",
        adminEmail: admin?.email || "",
        tokens: t.tokens,
        operation: t.operation,
        reason: t.reason,
        timestamp: t.createdAt,
      }
    })

    return NextResponse.json({
      transactions: formattedTransactions,
      meta: {
        total: formattedTransactions.length,
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

    const results = []

    for (const user of users) {
      const previousBalance = user.tokenBalance
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

      user.tokenBalance = newBalance
      await user.save()

      await TokenTransaction.create({
        userId: user._id.toString(),
        adminId: session.user.id,
        tokens: actualChange,
        operation: operation as "add" | "deduct" | "set",
        reason: reason || `Bulk ${operation} operation`,
        previousBalance,
        newBalance,
      })

      results.push({
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        previousBalance,
        newBalance: user.tokenBalance,
        change: actualChange,
      })
    }

    // Revalidate admin tokens page
    revalidatePath("/admin/tokens")

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
