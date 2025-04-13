import { NextResponse } from "next/server"
import { User } from "@/models/User"
import { VerificationToken } from "@/models/VerificationToken"
import { z } from "zod"

import { hashPassword } from "@/lib/auth"
import { connectToDatabase } from "@/lib/mongodb"

// Input validation schema
const resetPasswordSchema = z
  .object({
    token: z.string(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export async function POST(request: Request) {
  try {
    // Parse request body
    const body = await request.json()

    // Validate input
    const result = resetPasswordSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { message: result.error.errors[0].message },
        { status: 400 }
      )
    }

    // Connect to database
    await connectToDatabase()

    const { token, password } = result.data

    // Find verification token
    const verificationToken = await VerificationToken.findOne({
      token,
      expires: { $gt: new Date() },
    })

    if (!verificationToken) {
      return NextResponse.json(
        { message: "Invalid or expired token" },
        { status: 400 }
      )
    }

    // Find user
    const user = await User.findOne({ email: verificationToken.identifier })

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    // Hash new password
    const hashedPassword = await hashPassword(password)

    // Update user password
    user.password = hashedPassword
    await user.save()

    // Delete token
    await VerificationToken.deleteOne({ _id: verificationToken._id })

    return NextResponse.json(
      {
        message:
          "Password reset successfully. You can now login with your new password.",
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Password reset error:", error)
    return NextResponse.json(
      {
        message:
          "An error occurred while resetting your password. Please try again.",
      },
      { status: 500 }
    )
  }
}
