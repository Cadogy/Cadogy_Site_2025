import { NextRequest, NextResponse } from "next/server"
import { User } from "@/models/User"
import { getServerSession } from "next-auth"
import { UTApi } from "uploadthing/server"

import { authOptions } from "@/lib/auth/auth-options"
import { connectToDatabase } from "@/lib/mongodb"

// Initialize the UploadThing API
const utapi = new UTApi()

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
    const { name, email, image } = body

    // Validate input - consider image as null is valid
    if (!name && !email && image !== null && !image) {
      return NextResponse.json(
        { error: "At least one field must be provided" },
        { status: 400 }
      )
    }

    // Check if email is already taken (if email is being changed)
    if (email && email !== session.user.email) {
      const existingUser = await User.findOne({
        email,
        _id: { $ne: session.user.id },
      })
      if (existingUser) {
        return NextResponse.json(
          { error: "Email is already in use" },
          { status: 400 }
        )
      }
    }

    // Get current user to check for previous image
    const currentUser = await User.findById(session.user.id)
    const previousImageUrl = currentUser?.image

    // Update user
    const updateData: any = {}
    if (name) updateData.name = name
    if (email) updateData.email = email

    // Handle image field specifically
    if (image === null) {
      // If image is explicitly set to null, remove the image
      updateData.image = null

      // If there was a previous image, delete it from UploadThing
      if (previousImageUrl && previousImageUrl.includes("utfs.io")) {
        try {
          // Extract the file key from the URL
          const fileKey = previousImageUrl.split("/").pop()
          if (fileKey) {
            await utapi.deleteFiles(fileKey)
            console.log("Deleted file from UploadThing:", fileKey)
          }
        } catch (deleteError) {
          console.error("Error deleting file from UploadThing:", deleteError)
          // Continue with user update even if file deletion fails
        }
      }
    } else if (image) {
      // If a new image is provided, update it
      updateData.image = image
    }

    await User.findByIdAndUpdate(session.user.id, updateData)

    return NextResponse.json({
      message: "Profile updated successfully",
    })
  } catch (error) {
    console.error("Profile update error:", error)
    return NextResponse.json(
      {
        error: "Failed to update profile",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}
