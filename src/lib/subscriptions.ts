import SubscriptionModel, { Subscription } from "@/models/Subscription"
import mongoose from "mongoose"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth/auth-options"
import { connectToDatabase } from "@/lib/mongodb"

/**
 * Create a new subscription for a user
 */
export const createSubscription = async (
  userId: string | mongoose.Types.ObjectId,
  plan: string,
  startDate: Date = new Date(),
  endDate?: Date,
  isActive: boolean = true,
  paymentProvider?: string,
  paymentId?: string
): Promise<Subscription> => {
  await connectToDatabase()

  const userObjectId =
    typeof userId === "string" ? new mongoose.Types.ObjectId(userId) : userId

  const subscription = new SubscriptionModel({
    userId: userObjectId,
    plan,
    startDate,
    endDate,
    isActive,
    paymentProvider,
    paymentId,
  })

  await subscription.save()
  return subscription
}

/**
 * Get a user's active subscription
 */
export const getActiveSubscription = async (
  userId: string | mongoose.Types.ObjectId
): Promise<Subscription | null> => {
  await connectToDatabase()

  const userObjectId =
    typeof userId === "string" ? new mongoose.Types.ObjectId(userId) : userId
  const now = new Date()

  const subscription = await SubscriptionModel.findOne({
    userId: userObjectId,
    isActive: true,
    startDate: { $lte: now },
    $or: [
      { endDate: { $exists: false } },
      { endDate: null },
      { endDate: { $gte: now } },
    ],
  }).sort({ startDate: -1 })

  return subscription
}

/**
 * Get all of a user's subscriptions
 */
export const getUserSubscriptions = async (
  userId: string | mongoose.Types.ObjectId
): Promise<Subscription[]> => {
  await connectToDatabase()

  const userObjectId =
    typeof userId === "string" ? new mongoose.Types.ObjectId(userId) : userId

  const subscriptions = await SubscriptionModel.find({
    userId: userObjectId,
  }).sort({ startDate: -1 })

  return subscriptions
}

/**
 * Update a subscription
 */
export const updateSubscription = async (
  subscriptionId: string | mongoose.Types.ObjectId,
  updates: Partial<
    Omit<Subscription, "_id" | "userId"> & { isActive?: boolean }
  >
): Promise<Subscription | null> => {
  await connectToDatabase()

  const subscriptionObjectId =
    typeof subscriptionId === "string"
      ? new mongoose.Types.ObjectId(subscriptionId)
      : subscriptionId

  const subscription = await SubscriptionModel.findByIdAndUpdate(
    subscriptionObjectId,
    updates,
    { new: true }
  )

  return subscription
}

/**
 * Cancel a subscription
 */
export const cancelSubscription = async (
  subscriptionId: string | mongoose.Types.ObjectId
): Promise<Subscription | null> => {
  return updateSubscription(subscriptionId, { isActive: false })
}

/**
 * Get current user's active subscription - for use in server components
 */
export const getCurrentUserSubscription =
  async (): Promise<Subscription | null> => {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return null
    }

    return getActiveSubscription(session.user.id)
  }
