import { NextRequest, NextResponse } from "next/server"
import mongoose from "mongoose"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth/auth-options"
import { connectToDatabase } from "@/lib/mongodb"

// Define a model for notifications preferences if it doesn't exist
let NotificationPreference: mongoose.Model<any>

try {
  NotificationPreference = mongoose.model("NotificationPreference")
} catch (error) {
  const NotificationSchema = new mongoose.Schema(
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      apiUsage: {
        type: Boolean,
        default: true,
      },
      security: {
        type: Boolean,
        default: true,
      },
      marketing: {
        type: Boolean,
        default: false,
      },
      newsletter: {
        type: Boolean,
        default: false,
      },
    },
    { timestamps: true }
  )

  NotificationPreference = mongoose.model(
    "NotificationPreference",
    NotificationSchema
  )
}

export async function GET(request: NextRequest) {
  try {
    // Check if user is authenticated
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          error: "Unauthorized",
          message: "Please sign in to access this resource",
        },
        { status: 401 }
      )
    }

    // Connect to database
    await connectToDatabase()

    // Get user's notification preferences or create default
    let preferences = await NotificationPreference.findOne({
      userId: session.user.id,
    })

    if (!preferences) {
      preferences = await NotificationPreference.create({
        userId: session.user.id,
        apiUsage: true,
        security: true,
        marketing: false,
        newsletter: false,
      })
    }

    return NextResponse.json({
      preferences: {
        apiUsage: preferences.apiUsage,
        security: preferences.security,
        marketing: preferences.marketing,
        newsletter: preferences.newsletter,
      },
    })
  } catch (error) {
    console.error("Error fetching notification preferences:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch notification preferences",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Check if user is authenticated
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          error: "Unauthorized",
          message: "Please sign in to access this resource",
        },
        { status: 401 }
      )
    }

    // Connect to database
    await connectToDatabase()

    // Get request body
    const body = await request.json()
    const { apiUsage, security, marketing, newsletter } = body

    // Validate input
    if (
      typeof apiUsage !== "boolean" ||
      typeof security !== "boolean" ||
      typeof marketing !== "boolean" ||
      typeof newsletter !== "boolean"
    ) {
      return NextResponse.json(
        { error: "All preferences must be boolean values" },
        { status: 400 }
      )
    }

    // Update or create notification preferences
    await NotificationPreference.findOneAndUpdate(
      { userId: session.user.id },
      {
        apiUsage,
        security,
        marketing,
        newsletter,
      },
      { upsert: true }
    )

    return NextResponse.json({
      message: "Notification preferences updated successfully",
    })
  } catch (error) {
    console.error("Error updating notification preferences:", error)
    return NextResponse.json(
      {
        error: "Failed to update notification preferences",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}
