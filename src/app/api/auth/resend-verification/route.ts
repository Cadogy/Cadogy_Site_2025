import crypto from "crypto"
import { NextResponse } from "next/server"
import { User } from "@/models/User"
import { VerificationToken } from "@/models/VerificationToken"
import { z } from "zod"

import { sendVerificationEmail } from "@/lib/email"
import { connectToDatabase } from "@/lib/mongodb"

// Input validation schema
const resendSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
})

export async function POST(request: Request) {
  try {
    // Parse request body
    const body = await request.json()

    // Validate input
    const result = resendSchema.safeParse(body)
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
      // Return success even if user doesn't exist for security reasons
      return NextResponse.json(
        { message: "Verification email sent if account exists" },
        { status: 200 }
      )
    }

    // Check if email is already verified
    if (user.emailVerified) {
      return NextResponse.json(
        { message: "Email is already verified" },
        { status: 400 }
      )
    }

    // Delete any existing verification tokens for this user
    await VerificationToken.deleteMany({ identifier: email })

    // Create verification token
    const token = crypto.randomBytes(32).toString("hex")
    await VerificationToken.create({
      identifier: email,
      token,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
    })

    // Send verification email
    await sendVerificationEmail(email, token)

    return NextResponse.json(
      { message: "Verification email sent" },
      { status: 200 }
    )
  } catch (error: any) {
    console.error("Resend verification error:", error)
    return NextResponse.json(
      { message: "An error occurred. Please try again." },
      { status: 500 }
    )
  }
}
