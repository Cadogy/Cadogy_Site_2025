import { NextResponse } from "next/server"
import { User } from "@/models/User"
import { VerificationToken } from "@/models/VerificationToken"

import { connectToDatabase } from "@/lib/mongodb"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get("token")

    if (!token) {
      return NextResponse.json({ message: "Missing token" }, { status: 400 })
    }

    // Connect to database
    await connectToDatabase()

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

    // Update user - ensure emailVerified is set as a Date object
    const now = new Date()
    console.log("Setting emailVerified to:", now)

    const updateResult = await User.updateOne(
      { _id: user._id },
      { $set: { emailVerified: now } }
    )

    console.log("Update result:", updateResult)

    // Delete token
    await VerificationToken.deleteOne({ _id: verificationToken._id })

    return NextResponse.json(
      {
        message: "Email verified successfully. You can now login.",
        redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL}/login?verified=true`,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Email verification error:", error)
    return NextResponse.json(
      {
        message:
          "An error occurred while verifying your email. Please try again.",
      },
      { status: 500 }
    )
  }
}
