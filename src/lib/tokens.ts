import { User } from "@/models/User"
import mongoose from "mongoose"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth/auth-options"
import { connectToDatabase } from "@/lib/mongodb"

/**
 * Get the token balance for a user
 */
export const getUserTokenBalance = async (
  userId: string | mongoose.Types.ObjectId
): Promise<number> => {
  // console.log("getUserTokenBalance - userId:", userId)
  const db = await connectToDatabase()
  // console.log("Connected to database")

  const userObjectId =
    typeof userId === "string" ? new mongoose.Types.ObjectId(userId) : userId
  // console.log("userObjectId:", userObjectId)

  try {
    // Directly use the MongoDB native driver to query the document
    const collection = db.collection("users")

    // Get the user document
    const user = await collection.findOne({ _id: userObjectId })
    // console.log("User document:", JSON.stringify(user))

    const balance = user?.tokenBalance || 0
    // console.log("Token balance:", balance)

    return balance
  } catch (error) {
    console.error("Error getting token balance:", error)
    return 0
  }
}

/**
 * Add tokens to a user's balance
 */
export const addUserTokens = async (
  userId: string | mongoose.Types.ObjectId,
  amount: number
): Promise<number> => {
  // console.log("addUserTokens - userId:", userId, "amount:", amount)
  const db = await connectToDatabase()
  // console.log("Connected to database")

  const userObjectId =
    typeof userId === "string" ? new mongoose.Types.ObjectId(userId) : userId
  // console.log("userObjectId:", userObjectId)

  try {
    // Directly use the MongoDB native driver to update the document
    // This bypasses any Mongoose schema validation that might be preventing the field from being saved
    const collection = db.collection("users")

    // First get the current token balance (if any)
    const currentUser = await collection.findOne({ _id: userObjectId })
    // console.log("Current user document:", JSON.stringify(currentUser))

    // Calculate the new balance
    const currentBalance = currentUser?.tokenBalance || 0
    const newBalance = currentBalance + amount
    // console.log("Current balance:", currentBalance, "New balance:", newBalance)

    // Update the document directly
    const result = await collection.updateOne(
      { _id: userObjectId },
      { $set: { tokenBalance: newBalance } }
    )

    // console.log("MongoDB update result:", result)

    // Get the updated document to verify
    const updatedUser = await collection.findOne({ _id: userObjectId })
    // console.log("Updated user document:", JSON.stringify(updatedUser))

    return updatedUser?.tokenBalance || 0
  } catch (error) {
    console.error("Error updating token balance:", error)
    return 0
  }
}

/**
 * Remove tokens from a user's balance
 */
export const useUserTokens = async (
  userId: string | mongoose.Types.ObjectId,
  amount: number
): Promise<{ success: boolean; newBalance: number; error?: string }> => {
  // console.log("useUserTokens - userId:", userId, "amount:", amount)
  const db = await connectToDatabase()
  // console.log("Connected to database")

  const userObjectId =
    typeof userId === "string" ? new mongoose.Types.ObjectId(userId) : userId
  // console.log("userObjectId:", userObjectId)

  try {
    // Directly use the MongoDB native driver to update the document
    const collection = db.collection("users")

    // First get the current token balance
    const currentUser = await collection.findOne({ _id: userObjectId })
    // console.log("Current user document:", JSON.stringify(currentUser))

    if (!currentUser) {
      // console.log("User not found")
      return { success: false, newBalance: 0, error: "User not found" }
    }

    // Get current balance or initialize to 0
    const currentBalance = currentUser.tokenBalance || 0
    // console.log("Current balance:", currentBalance)

    // Check if user has enough tokens
    if (currentBalance < amount) {
      // console.log("Insufficient token balance")
      return {
        success: false,
        newBalance: currentBalance,
        error: "Insufficient token balance",
      }
    }

    // Calculate and update balance
    const newBalance = currentBalance - amount
    // console.log("New balance:", newBalance)

    // Update the document directly
    const result = await collection.updateOne(
      { _id: userObjectId },
      { $set: { tokenBalance: newBalance } }
    )

    // console.log("MongoDB update result:", result)

    // Get the updated document to verify
    const updatedUser = await collection.findOne({ _id: userObjectId })
    // console.log("Updated user document:", JSON.stringify(updatedUser))

    return {
      success: true,
      newBalance: updatedUser?.tokenBalance || 0,
    }
  } catch (error) {
    console.error("Error updating token balance:", error)
    return {
      success: false,
      newBalance: 0,
      error: "Database error updating balance",
    }
  }
}

/**
 * Set a user's token balance to a specific amount
 */
export const setUserTokenBalance = async (
  userId: string | mongoose.Types.ObjectId,
  amount: number
): Promise<number> => {
  // console.log("setUserTokenBalance - userId:", userId, "amount:", amount)
  const db = await connectToDatabase()
  // console.log("Connected to database")

  const userObjectId =
    typeof userId === "string" ? new mongoose.Types.ObjectId(userId) : userId
  // console.log("userObjectId:", userObjectId)

  try {
    // Directly use the MongoDB native driver to update the document
    const collection = db.collection("users")

    // Update the document directly with the new balance
    const result = await collection.updateOne(
      { _id: userObjectId },
      { $set: { tokenBalance: amount } }
    )

    // console.log("MongoDB update result:", result)

    // Get the updated document to verify
    const updatedUser = await collection.findOne({ _id: userObjectId })
    // console.log("Updated user document:", JSON.stringify(updatedUser))

    return updatedUser?.tokenBalance || 0
  } catch (error) {
    console.error("Error setting token balance:", error)
    return 0
  }
}

/**
 * Get current user's token balance - for use in server components
 */
export const getCurrentUserTokenBalance = async (): Promise<number> => {
  // console.log("getCurrentUserTokenBalance - getting session")
  const session = await getServerSession(authOptions)
  //   console.log(
  //     "Session:",
  //     session ? "found" : "not found",
  //     "userId:",
  //     session?.user?.id
  //   )

  if (!session?.user?.id) {
    console.log("No user ID in session")
    return 0
  }

  return getUserTokenBalance(session.user.id)
}
