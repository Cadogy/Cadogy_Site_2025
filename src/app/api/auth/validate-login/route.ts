import { NextResponse } from "next/server"
import { User } from "@/models/User"
import { z } from "zod"

import { verifyPassword } from "@/lib/auth"
import { connectToDatabase } from "@/lib/mongodb"

// Input validation schema
const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
})

/**
 * API route for validating login credentials and checking email verification
 * This is used before actual login to check if the email is verified
 */
export async function POST(request: Request) {
  try {
    // Parse request body
    const body = await request.json()

    // Validate input
    const result = loginSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { message: result.error.errors[0].message },
        { status: 400 }
      )
    }

    // Connect to database
    await connectToDatabase()

    const { email, password } = result.data

    // Find user by email
    const user = await User.findOne({ email })

    if (!user || !user.password) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 400 }
      )
    }

    // Verify password
    const isValid = await verifyPassword(password, user.password)

    if (!isValid) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 400 }
      )
    }

    // Check if email is verified
    // console.log("Email verification status:", {
    //   email: user.email,
    //   emailVerified: user.emailVerified,
    //   type: typeof user.emailVerified,
    // })

    // Use the same verification check as in auth-options.ts
    if (
      typeof user.emailVerified === "undefined" ||
      user.emailVerified === null
    ) {
      return NextResponse.json(
        {
          verified: false,
          message: "Please verify your email before logging in",
          email: user.email,
        },
        { status: 403 }
      )
    }

    // All checks passed
    return NextResponse.json(
      {
        verified: true,
        message: "Login validation successful",
      },
      { status: 200 }
    )
  } catch (error: any) {
    console.error("Login validation error:", error)
    return NextResponse.json(
      { message: "An error occurred while validating login" },
      { status: 500 }
    )
  }
}
