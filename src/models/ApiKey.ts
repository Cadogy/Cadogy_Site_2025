import mongoose, { Schema, Types } from "mongoose"

export interface ApiKey {
  _id?: mongoose.Types.ObjectId | string
  userId: Types.ObjectId
  key: string
  name: string
  type: "primary" | "secondary"
  isActive: boolean
  createdAt: Date
  lastUsed?: Date
  permissions?: string[]
  expiresAt?: Date
}

const ApiKeySchema = new Schema<ApiKey>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    key: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["primary", "secondary"],
      default: "primary",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastUsed: {
      type: Date,
      default: null,
    },
    permissions: {
      type: [String],
      default: ["read"],
    },
    expiresAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
)

// Create indexes for better performance
ApiKeySchema.index({ userId: 1, isActive: 1 })
ApiKeySchema.index({ key: 1 })

export default mongoose.models.ApiKey ||
  mongoose.model<ApiKey>("ApiKey", ApiKeySchema)
