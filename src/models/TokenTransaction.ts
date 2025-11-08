import mongoose, { model, models, Schema } from "mongoose"

export interface ITokenTransaction {
  userId: string
  adminId: string
  tokens: number
  operation: "add" | "deduct" | "set"
  reason: string
  previousBalance: number
  newBalance: number
  createdAt: Date
}

const TokenTransactionSchema = new Schema<ITokenTransaction>(
  {
    userId: {
      type: String,
      required: true,
      ref: "User",
    },
    adminId: {
      type: String,
      required: true,
      ref: "User",
    },
    tokens: {
      type: Number,
      required: true,
    },
    operation: {
      type: String,
      enum: ["add", "deduct", "set"],
      required: true,
    },
    reason: {
      type: String,
      default: "",
    },
    previousBalance: {
      type: Number,
      required: true,
    },
    newBalance: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

TokenTransactionSchema.index({ userId: 1, createdAt: -1 })
TokenTransactionSchema.index({ adminId: 1, createdAt: -1 })

export const TokenTransaction =
  models.TokenTransaction ||
  model<ITokenTransaction>("TokenTransaction", TokenTransactionSchema)

