import { NextRequest, NextResponse } from "next/server"
import ApiKeyModel from "@/models/ApiKey"
import mongoose from "mongoose"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth/auth-options"
import { connectToDatabase } from "@/lib/mongodb"

export async function GET(request: NextRequest) {
  // Check if the user is authenticated
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

  try {
    // Get the API key ID from query parameters
    const url = new URL(request.url)
    const id = url.searchParams.get("id")

    if (!id) {
      return NextResponse.json(
        { error: "API key ID is required" },
        { status: 400 }
      )
    }

    await connectToDatabase()

    // Convert string IDs to ObjectIds
    const keyId = new mongoose.Types.ObjectId(id)
    const userId = new mongoose.Types.ObjectId(session.user.id)

    // Find the API key that belongs to the user
    const apiKey = await ApiKeyModel.findOne({
      _id: keyId,
      userId: userId,
    })

    if (!apiKey) {
      return NextResponse.json(
        { error: "API key not found or you don't have permission to view it" },
        { status: 404 }
      )
    }

    // Return the full API key
    return NextResponse.json({
      key: apiKey.key,
    })
  } catch (error) {
    console.error("Error revealing API key:", error)
    return NextResponse.json(
      {
        error: "Failed to reveal API key",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}
