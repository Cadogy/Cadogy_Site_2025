import { NextResponse } from "next/server"
import { User } from "@/models/User"
import { getServerSession } from "next-auth/next"
import { z } from "zod"

import { authOptions } from "@/lib/auth/auth-options"
import { connectToDatabase } from "@/lib/mongodb"

// Input validation schema
const profileSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  image: z.string().optional(),
})

export async function PUT(request: Request) {
  try {
    // Get authenticated session
    const session = await getServerSession(authOptions)

    // Check if user is authenticated
    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    // Parse and validate request body
    const body = await request.json()
    const result = profileSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { message: result.error.errors[0].message },
        { status: 400 }
      )
    }

    // Connect to database
    await connectToDatabase()

    // Find user by email (which is unique and part of the session)
    const userEmail = session.user.email
    if (!userEmail) {
      return NextResponse.json(
        { message: "User email not found in session" },
        { status: 400 }
      )
    }

    // Update user
    const updatedUser = await User.findOneAndUpdate(
      { email: userEmail },
      {
        $set: {
          name: result.data.name,
          ...(result.data.image && { image: result.data.image }),
        },
      },
      { new: true }
    )

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    // Return updated user data (excluding sensitive fields)
    return NextResponse.json({
      message: "Profile updated successfully",
      user: {
        id: updatedUser._id.toString(),
        name: updatedUser.name,
        email: updatedUser.email,
        image: updatedUser.image,
      },
    })
  } catch (error: any) {
    console.error("Error updating profile:", error)
    return NextResponse.json(
      { message: "An error occurred while updating profile" },
      { status: 500 }
    )
  }
}
