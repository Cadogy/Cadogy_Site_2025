import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import Stripe from "stripe"

import { authOptions } from "@/lib/auth/auth-options"

// Initialize Stripe with the secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16" as any,
})

export async function GET(request: NextRequest) {
  try {
    // Check if user is authenticated
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json(
        {
          error: "Unauthorized",
          message: "Please sign in to access this resource",
        },
        { status: 401 }
      )
    }

    // Get the session ID from the URL
    const url = new URL(request.url)
    const sessionId = url.searchParams.get("session_id")

    if (!sessionId) {
      return NextResponse.json(
        {
          error: "Missing session ID",
          message: "A Stripe session ID is required",
        },
        { status: 400 }
      )
    }

    // Retrieve the checkout session from Stripe
    const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["payment_intent", "line_items"],
    })

    // Verify the session belongs to the current user
    if (
      checkoutSession.client_reference_id !== session.user.id &&
      checkoutSession.metadata?.userId !== session.user.id
    ) {
      return NextResponse.json(
        {
          error: "Unauthorized",
          message: "This payment session does not belong to you",
        },
        { status: 403 }
      )
    }

    // Check if payment was successful
    if (checkoutSession.payment_status !== "paid") {
      return NextResponse.json(
        {
          error: "Payment not completed",
          message:
            "The payment has not been completed yet. Please try again later.",
          status: checkoutSession.payment_status,
        },
        { status: 400 }
      )
    }

    // Extract metadata and calculate tokens purchased
    const tokens = checkoutSession.metadata?.tokens
      ? parseInt(checkoutSession.metadata.tokens, 10)
      : 0

    // Return success with session details
    return NextResponse.json({
      success: true,
      sessionId,
      paymentId: checkoutSession.payment_intent,
      tokens,
      amount: checkoutSession.amount_total
        ? checkoutSession.amount_total / 100
        : 0,
    })
  } catch (error) {
    console.error("Payment verification error:", error)

    // Handle Stripe API errors
    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        {
          error: "Stripe error",
          message: error.message,
          code: error.code,
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      {
        error: "Verification failed",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}
