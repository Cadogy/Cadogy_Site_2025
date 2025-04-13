import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import Stripe from "stripe"

import { authOptions } from "@/lib/auth/auth-options"

// Initialize Stripe with the secret key from environment variables
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16" as any,
})

export async function POST(request: NextRequest) {
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

    // Parse request body
    const data = await request.json()
    const { tokens, priceId, amount } = data

    if (!tokens || !amount || amount <= 0) {
      return NextResponse.json(
        {
          error: "Invalid request",
          message: "Invalid token amount or price",
        },
        { status: 400 }
      )
    }

    // Create a checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      billing_address_collection: "required",
      customer_email: session.user.email as string,
      client_reference_id: session.user.id,
      metadata: {
        userId: session.user.id,
        tokens: tokens.toString(),
        priceId: priceId,
      },
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `${tokens.toLocaleString()} Tokens`,
              description: "Tokens for Cadogy API usage",
              metadata: {
                tokens: tokens.toString(),
              },
            },
            unit_amount: Math.round(amount * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/tokens/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/tokens`,
      consent_collection: {
        terms_of_service: "required",
      },
    })

    return NextResponse.json({ sessionId: checkoutSession.id })
  } catch (error) {
    console.error("Stripe checkout error:", error)
    return NextResponse.json(
      {
        error: "Checkout failed",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}
