import ApiKeyModel, { ApiKey } from "@/models/ApiKey"
import mongoose from "mongoose"
import { customAlphabet } from "nanoid"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth/auth-options"
import { connectToDatabase } from "@/lib/mongodb"

// Create a custom alphabet for API keys (exclude ambiguous characters)
const apiKeyAlphabet =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
const nanoid = customAlphabet(apiKeyAlphabet, 32)

// Prefix for API keys to distinguish between primary and secondary
const PRIMARY_KEY_PREFIX = "sk_primary_cadogy_"
const SECONDARY_KEY_PREFIX = "sk_secondary_cadogy_"

/**
 * Generate a new API key
 */
export const generateApiKey = (type: "primary" | "secondary"): string => {
  const prefix = type === "primary" ? PRIMARY_KEY_PREFIX : SECONDARY_KEY_PREFIX
  return `${prefix}${nanoid()}`
}

/**
 * Create a new API key for a user
 */
export const createApiKey = async (
  userId: string | mongoose.Types.ObjectId,
  name: string,
  type: "primary" | "secondary" = "primary",
  permissions: string[] = ["read"]
): Promise<ApiKey> => {
  await connectToDatabase()

  const key = generateApiKey(type)

  const userObjectId =
    typeof userId === "string" ? new mongoose.Types.ObjectId(userId) : userId

  const apiKey = new ApiKeyModel({
    userId: userObjectId,
    key,
    name,
    type,
    permissions,
    isActive: true,
    lastUsed: null,
    expiresAt: null, // No expiration by default
  })

  await apiKey.save()
  return apiKey
}

/**
 * Get all API keys for a user
 */
export const getUserApiKeys = async (
  userId: string | mongoose.Types.ObjectId
): Promise<ApiKey[]> => {
  await connectToDatabase()

  const userObjectId =
    typeof userId === "string" ? new mongoose.Types.ObjectId(userId) : userId

  const apiKeys = await ApiKeyModel.find({ userId: userObjectId })
  return apiKeys
}

/**
 * Get active API keys for a user
 */
export const getActiveApiKeys = async (
  userId: string | mongoose.Types.ObjectId
): Promise<ApiKey[]> => {
  await connectToDatabase()

  const userObjectId =
    typeof userId === "string" ? new mongoose.Types.ObjectId(userId) : userId

  const apiKeys = await ApiKeyModel.find({
    userId: userObjectId,
    isActive: true,
    $or: [{ expiresAt: null }, { expiresAt: { $gt: new Date() } }],
  })

  return apiKeys
}

/**
 * Verify if an API key is valid
 */
export const verifyApiKey = async (key: string): Promise<ApiKey | null> => {
  await connectToDatabase()

  const apiKey = await ApiKeyModel.findOne({
    key,
    isActive: true,
    $or: [{ expiresAt: null }, { expiresAt: { $gt: new Date() } }],
  })

  if (apiKey) {
    // Update the last used timestamp
    apiKey.lastUsed = new Date()
    await apiKey.save()
  }

  return apiKey
}

/**
 * Disable an API key
 */
export const disableApiKey = async (
  keyId: string | mongoose.Types.ObjectId,
  userId: string | mongoose.Types.ObjectId
): Promise<boolean> => {
  await connectToDatabase()

  const keyObjectId =
    typeof keyId === "string" ? new mongoose.Types.ObjectId(keyId) : keyId
  const userObjectId =
    typeof userId === "string" ? new mongoose.Types.ObjectId(userId) : userId

  const result = await ApiKeyModel.updateOne(
    { _id: keyObjectId, userId: userObjectId },
    { isActive: false }
  )

  return result.modifiedCount > 0
}

/**
 * Enable an API key
 */
export const enableApiKey = async (
  keyId: string | mongoose.Types.ObjectId,
  userId: string | mongoose.Types.ObjectId
): Promise<boolean> => {
  await connectToDatabase()

  const keyObjectId =
    typeof keyId === "string" ? new mongoose.Types.ObjectId(keyId) : keyId
  const userObjectId =
    typeof userId === "string" ? new mongoose.Types.ObjectId(userId) : userId

  const result = await ApiKeyModel.updateOne(
    { _id: keyObjectId, userId: userObjectId },
    { isActive: true }
  )

  return result.modifiedCount > 0
}

/**
 * Delete an API key
 */
export const deleteApiKey = async (
  keyId: string | mongoose.Types.ObjectId,
  userId: string | mongoose.Types.ObjectId
): Promise<boolean> => {
  await connectToDatabase()

  const keyObjectId =
    typeof keyId === "string" ? new mongoose.Types.ObjectId(keyId) : keyId
  const userObjectId =
    typeof userId === "string" ? new mongoose.Types.ObjectId(userId) : userId

  const result = await ApiKeyModel.deleteOne({
    _id: keyObjectId,
    userId: userObjectId,
  })

  return result.deletedCount > 0
}

/**
 * Get user's default API key if one exists
 */
export const getUserDefaultApiKey = async (
  userId: string | mongoose.Types.ObjectId
): Promise<ApiKey | null> => {
  await connectToDatabase()

  const userObjectId =
    typeof userId === "string" ? new mongoose.Types.ObjectId(userId) : userId

  // Check if user already has any API keys
  const existingKeys = await ApiKeyModel.find({ userId: userObjectId })

  if (existingKeys.length > 0) {
    // Return the first active key, or the first key if no active keys
    const activeKey = existingKeys.find((key) => key.isActive)
    return activeKey || existingKeys[0]
  }

  // No API keys exist for this user
  return null
}

/**
 * Get current user's API key - for use in server components
 */
export const getCurrentUserApiKey = async (): Promise<ApiKey | null> => {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return null
  }

  return getUserDefaultApiKey(session.user.id)
}
