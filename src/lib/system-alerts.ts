import SystemAlertModel, { SystemAlert } from "@/models/SystemAlert"
import mongoose from "mongoose"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth/auth-options"
import { connectToDatabase } from "@/lib/mongodb"

/**
 * Create a new system alert
 */
export const createSystemAlert = async (
  title: string,
  description: string,
  severity: "info" | "warning" | "error" = "info",
  type: "system" | "user" = "system",
  userId?: string | mongoose.Types.ObjectId,
  startDate: Date = new Date(),
  endDate?: Date,
  link?: string,
  linkText?: string
): Promise<SystemAlert> => {
  await connectToDatabase()

  // Convert userId to ObjectId if it's a string and type is "user"
  const userObjectId =
    type === "user" && userId && typeof userId === "string"
      ? new mongoose.Types.ObjectId(userId)
      : userId

  const alert = new SystemAlertModel({
    title,
    description,
    severity,
    type,
    userId: userObjectId,
    isActive: true,
    startDate,
    endDate,
    link,
    linkText,
  })

  await alert.save()
  return alert
}

/**
 * Get all active system alerts
 */
export const getActiveSystemAlerts = async (): Promise<SystemAlert[]> => {
  await connectToDatabase()

  const now = new Date()

  const alerts = await SystemAlertModel.find({
    type: "system",
    isActive: true,
    startDate: { $lte: now },
    $or: [
      { endDate: { $exists: false } },
      { endDate: null },
      { endDate: { $gte: now } },
    ],
  })

  return alerts
}

/**
 * Get active user alerts
 */
export const getActiveUserAlerts = async (
  userId: string | mongoose.Types.ObjectId
): Promise<SystemAlert[]> => {
  await connectToDatabase()

  const userObjectId =
    typeof userId === "string" ? new mongoose.Types.ObjectId(userId) : userId
  const now = new Date()

  const alerts = await SystemAlertModel.find({
    type: "user",
    userId: userObjectId,
    isActive: true,
    startDate: { $lte: now },
    $or: [
      { endDate: { $exists: false } },
      { endDate: null },
      { endDate: { $gte: now } },
    ],
  })

  return alerts
}

/**
 * Get all active alerts for a user (includes both system and user-specific alerts)
 */
export const getAllActiveAlerts = async (
  userId: string | mongoose.Types.ObjectId
): Promise<SystemAlert[]> => {
  await connectToDatabase()

  const userObjectId =
    typeof userId === "string" ? new mongoose.Types.ObjectId(userId) : userId
  const now = new Date()

  const alerts = await SystemAlertModel.find({
    isActive: true,
    startDate: { $lte: now },
    $and: [
      {
        $or: [
          { endDate: { $exists: false } },
          { endDate: null },
          { endDate: { $gte: now } },
        ],
      },
      {
        $or: [{ type: "system" }, { type: "user", userId: userObjectId }],
      },
    ],
  }).sort({ severity: 1, startDate: -1 })

  return alerts
}

/**
 * Deactivate an alert
 */
export const deactivateAlert = async (
  alertId: string | mongoose.Types.ObjectId
): Promise<boolean> => {
  await connectToDatabase()

  const alertObjectId =
    typeof alertId === "string" ? new mongoose.Types.ObjectId(alertId) : alertId

  const result = await SystemAlertModel.updateOne(
    { _id: alertObjectId },
    { isActive: false }
  )

  return result.modifiedCount > 0
}

/**
 * Get current user's active alerts - for use in server components
 */
export const getCurrentUserAlerts = async (): Promise<SystemAlert[] | null> => {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return null
  }

  return getAllActiveAlerts(session.user.id)
}
