import { NextRequest, NextResponse } from "next/server"
import mongoose from "mongoose"
import Stripe from "stripe"

import { sendEmail } from "@/lib/email"
import { PurchaseConfirmationEmailTemplate } from "@/lib/email/templates/purchase-confirmation"
import { connectToDatabase } from "@/lib/mongodb"
import { addUserTokens } from "@/lib/tokens"

// Initialize Stripe with the secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16" as any,
})

// Verify Stripe signature to ensure the webhook is valid
const verifyStripeSignature = async (
  req: NextRequest,
  rawBody: string
): Promise<Stripe.Event | null> => {
  const signature = req.headers.get("stripe-signature")

  if (!signature) {
    return null
  }

  try {
    return stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string
    )
  } catch (err) {
    console.error("Stripe webhook verification failed:", err)
    return null
  }
}

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text()

    // Verify the webhook signature
    const event = await verifyStripeSignature(request, rawBody)
    if (!event) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
    }

    console.log(`Processing Stripe webhook event: ${event.type}`)

    // Handle the event based on its type
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session

        // Ensure the payment was successful
        if (session.payment_status === "paid") {
          await handleSuccessfulPayment(session)
        }
        break
      }

      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        console.log(`PaymentIntent succeeded: ${paymentIntent.id}`)
        // Could add additional handling here if needed
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Stripe webhook error:", error)
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    )
  }
}

/**
 * Handle successful payment by:
 * 1. Adding tokens to the user's account
 * 2. Sending a confirmation email
 */
async function handleSuccessfulPayment(session: Stripe.Checkout.Session) {
  try {
    // Extract metadata from the session
    const { userId, tokens } = session.metadata || {}

    if (!userId || !tokens) {
      console.error("Missing metadata in Stripe session", session.id)
      return
    }

    const tokenAmount = parseInt(tokens, 10)
    if (isNaN(tokenAmount) || tokenAmount <= 0) {
      console.error("Invalid token amount in metadata", tokens)
      return
    }

    console.log(`Adding ${tokenAmount} tokens to user ${userId}`)

    // Add tokens to the user's account
    const newBalance = await addUserTokens(userId, tokenAmount)

    // Get customer information from the session
    let customerEmail = session.customer_details?.email
    const customerName = session.customer_details?.name || "Customer"

    // Use client reference ID as fallback for the email
    if (!customerEmail && session.client_reference_id) {
      const user = await getUserById(session.client_reference_id)
      if (user && user.email) {
        customerEmail = user.email
      }
    }

    // If we have an email, send a receipt
    if (customerEmail) {
      await sendPurchaseConfirmationEmail({
        email: customerEmail,
        name: customerName,
        tokens: tokenAmount,
        newBalance,
        orderId: session.id,
        amount: (session.amount_total || 0) / 100, // Convert from cents to dollars
        date: new Date(),
      })
    }

    console.log(`Successfully processed payment for ${tokenAmount} tokens`)
  } catch (error) {
    console.error("Error handling successful payment:", error)
    throw error
  }
}

/**
 * Send a purchase confirmation email using our template system
 */
async function sendPurchaseConfirmationEmail({
  email,
  name,
  tokens,
  newBalance,
  orderId,
  amount,
  date,
}: {
  email: string
  name: string
  tokens: number
  newBalance: number
  orderId: string
  amount: number
  date: Date
}) {
  try {
    const emailHtml = PurchaseConfirmationEmailTemplate({
      name,
      tokens,
      newBalance,
      orderId,
      amount,
      date,
    })

    await sendEmail({
      to: email,
      subject: "Cadogy - Token Purchase Confirmation",
      html: emailHtml,
    })

    console.log(`Sent purchase confirmation email to ${email}`)
  } catch (error) {
    console.error("Failed to send purchase confirmation email:", error)
    // Don't throw here, we don't want to fail the whole transaction if just the email fails
  }
}

/**
 * Get a user by ID from the database
 */
async function getUserById(userId: string) {
  try {
    const db = await connectToDatabase()
    const userObjectId = new mongoose.Types.ObjectId(userId)

    const user = await db.collection("users").findOne({ _id: userObjectId })
    return user
  } catch (error) {
    console.error("Error getting user by ID:", error)
    return null
  }
}
