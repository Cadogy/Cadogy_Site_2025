import { NextRequest, NextResponse } from "next/server"
import { IUser, User } from "@/models/User"
import mongoose from "mongoose"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth/auth-options"
import { connectToDatabase } from "@/lib/mongodb"

// GET all users with pagination and filtering
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

    // Extract query parameters for pagination and filtering
    const { searchParams } = request.nextUrl
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "10")
    const search = searchParams.get("search") || ""
    const role = searchParams.get("role") || ""
    const sortBy = searchParams.get("sortBy") || "createdAt"
    const sortOrder = searchParams.get("sortOrder") || "desc"

    // Build query filters
    const filter: any = {}

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ]
    }

    if (role) {
      filter.role = role
    }

    // Calculate pagination
    const skip = (page - 1) * limit

    // Build sort options
    const sort: any = {}
    sort[sortBy] = sortOrder === "asc" ? 1 : -1

    // Execute query with pagination - removed lean() to preserve document properties
    const users = await User.find(filter).sort(sort).skip(skip).limit(limit)

    // Get total count for pagination
    const totalUsers = await User.countDocuments(filter)

    // Transform to safe response (remove passwords)
    const safeUsers = users.map((user) => ({
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      emailVerified: user.emailVerified,
      tokenBalance: user.tokenBalance,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }))

    return NextResponse.json({
      users: safeUsers,
      pagination: {
        page,
        limit,
        totalUsers,
        totalPages: Math.ceil(totalUsers / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching users:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch users",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}

// POST to create a new user
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
    const body = await request.json()
    const { name, email, role, tokenBalance, password } = body

    // Validate required fields
    if (!email) {
      return NextResponse.json(
        { error: "Bad Request", message: "Email is required" },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return NextResponse.json(
        { error: "Conflict", message: "User with this email already exists" },
        { status: 409 }
      )
    }

    // Create new user
    const newUser = new User({
      name,
      email,
      role: role || "user",
      tokenBalance: tokenBalance || 0,
      // If password is provided, it would need to be hashed
      // password: hashedPassword,
      emailVerified: new Date(), // Auto-verify users created by admin
    })

    await newUser.save()

    return NextResponse.json(
      {
        id: newUser._id.toString(),
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        tokenBalance: newUser.tokenBalance,
        createdAt: newUser.createdAt,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Error creating user:", error)
    return NextResponse.json(
      {
        error: "Failed to create user",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}
