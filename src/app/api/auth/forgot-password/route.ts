import crypto from "crypto"
import { NextResponse } from "next/server"
import { User } from "@/models/User"
import { VerificationToken } from "@/models/VerificationToken"
import { z } from "zod"

import { sendPasswordResetEmail } from "@/lib/email"
import { connectToDatabase } from "@/lib/mongodb"

// Input validation schema
const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
})

export async function POST(request: Request) {
  try {
    // Parse request body
    const body = await request.json()

    // Validate input
    const result = forgotPasswordSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { message: result.error.errors[0].message },
        { status: 400 }
      )
    }

    // Connect to database
    await connectToDatabase()

    const { email } = result.data

    // Check if user exists
    const user = await User.findOne({ email })
    if (!user) {
      // Return success even if the user doesn't exist to prevent email enumeration
      return NextResponse.json(
        {
          message:
            "If an account with that email exists, we sent a password reset link.",
        },
        { status: 200 }
      )
    }

    // Create password reset token
    const token = crypto.randomBytes(32).toString("hex")

    // Delete any existing tokens for this user
    await VerificationToken.deleteMany({ identifier: email })

    // Create new token
    await VerificationToken.create({
      identifier: email,
      token,
      expires: new Date(Date.now() + 1 * 60 * 60 * 1000), // 1 hour
    })

    // Send password reset email
    await sendPasswordResetEmail(email, token)

    return NextResponse.json(
      {
        message:
          "If an account with that email exists, we sent a password reset link.",
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Forgot password error:", error)
    return NextResponse.json(
      { message: "An error occurred. Please try again." },
      { status: 500 }
    )
  }
}
