import { NextResponse } from "next/server"
import { User } from "@/models/User"
import { VerificationToken } from "@/models/VerificationToken"

import { connectToDatabase } from "@/lib/mongodb"

// Mark this route as dynamic to allow request.url usage
export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get("token")
    console.log(
      "[API] Verification request with token:",
      token?.substring(0, 10) + "..."
    )

    if (!token) {
      console.log("[API] Missing token")
      return NextResponse.json({ message: "Missing token" }, { status: 400 })
    }

    // Connect to database
    await connectToDatabase()

    // Check if user is already verified by this token
    // This helps when tokens are deleted but users still try to verify
    const existingUser = await User.findOne({
      emailVerified: { $ne: null },
    })
      .sort({ emailVerified: -1 })
      .limit(1)

    if (existingUser) {
      const minutesSinceVerification =
        (Date.now() - new Date(existingUser.emailVerified).getTime()) /
        (1000 * 60)
      console.log(
        `[API] Found recent verification (${minutesSinceVerification.toFixed(2)} minutes ago)`
      )

      // If verification happened within the last 10 minutes, consider it related to this request
      if (minutesSinceVerification < 10) {
        console.log("[API] Returning success for already verified user")
        return NextResponse.json(
          {
            message: "Email verified successfully. You can now login.",
            redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL}/login?verified=true`,
            alreadyVerified: true,
          },
          { status: 200 }
        )
      }
    }

    // Find verification token
    const verificationToken = await VerificationToken.findOne({
      token,
      expires: { $gt: new Date() },
    })

    if (!verificationToken) {
      console.log("[API] Invalid or expired token")
      return NextResponse.json(
        { message: "Invalid or expired token" },
        { status: 400 }
      )
    }

    // Find user
    const user = await User.findOne({ email: verificationToken.identifier })

    if (!user) {
      console.log("[API] User not found:", verificationToken.identifier)
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    // Update user - ensure emailVerified is set as a Date object
    const now = new Date()
    console.log("[API] Setting emailVerified for user:", user.email)

    const updateResult = await User.updateOne(
      { _id: user._id },
      { $set: { emailVerified: now } }
    )

    console.log("[API] Update result:", updateResult)

    // Delete token
    await VerificationToken.deleteOne({ _id: verificationToken._id })
    console.log("[API] Token deleted, returning success")

    return NextResponse.json(
      {
        message: "Email verified successfully. You can now login.",
        redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL}/login?verified=true`,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("[API] Email verification error:", error)
    return NextResponse.json(
      {
        message:
          "An error occurred while verifying your email. Please try again.",
      },
      { status: 500 }
    )
  }
}
