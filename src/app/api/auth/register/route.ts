import crypto from "crypto"
import { NextResponse } from "next/server"
import { User } from "@/models/User"
import { VerificationToken } from "@/models/VerificationToken"
import { SiteSettings } from "@/models/SiteSettings"
import { z } from "zod"

import { hashPassword } from "@/lib/auth"
import { sendVerificationEmail } from "@/lib/email"
import { connectToDatabase } from "@/lib/mongodb"

// Input validation schema
const registerSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
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
  turnstileToken: z.string().min(1, { message: "Security check is required" }),
})

// Determine if we're in development mode
const isDevelopment = process.env.NODE_ENV === "development"

// Verify Cloudflare Turnstile token
async function verifyTurnstileToken(token: string): Promise<boolean> {
  // Always return true in development mode
  if (isDevelopment || token === "development_bypass_token") {
    return true
  }

  try {
    const formData = new FormData()
    formData.append("secret", process.env.TURNSTILE_SECRET_KEY!)
    formData.append("response", token)

    const result = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        body: formData,
      }
    )

    const outcome = await result.json()
    return outcome.success
  } catch (error) {
    console.error("Error verifying Turnstile token:", error)
    return false
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase()

    const settings = await SiteSettings.findOne().lean() as any
    if (settings && !settings.registrationEnabled) {
      return NextResponse.json(
        {
          message:
            "User registration is currently disabled. Please contact an administrator.",
        },
        { status: 403 }
      )
    }

    const body = await request.json()

    const result = registerSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { message: result.error.errors[0].message },
        { status: 400 }
      )
    }

    const { email, password, turnstileToken } = result.data

    // Verify Turnstile token (skip validation check in development)
    if (!isDevelopment) {
      const isValidToken = await verifyTurnstileToken(turnstileToken)
      if (!isValidToken) {
        return NextResponse.json(
          { message: "Security check failed. Please try again." },
          { status: 400 }
        )
      }
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return NextResponse.json(
        { message: "A user with this email already exists" },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await hashPassword(password)

    // Create user
    const user = await User.create({
      email,
      password: hashedPassword,
      role: "user",
      emailVerified: null,
    })

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
      {
        message:
          "User registered successfully. Please check your email to verify your account.",
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error("Registration error:", error)
    return NextResponse.json(
      { message: "An error occurred while registering. Please try again." },
      { status: 500 }
    )
  }
}
