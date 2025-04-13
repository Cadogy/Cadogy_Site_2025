import mongoose, { Schema, Types } from "mongoose"

export interface ApiUsage {
  _id?: mongoose.Types.ObjectId | string
  userId: Types.ObjectId
  apiKeyId: Types.ObjectId
  endpoint: string
  method: string
  status: number
  responseTime: number
  timestamp: Date
  ip?: string
  userAgent?: string
  referrer?: string
  requestPayload?: object
  responsePayload?: object
  error?: string
}

const ApiUsageSchema = new Schema<ApiUsage>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    apiKeyId: {
      type: Schema.Types.ObjectId,
      ref: "ApiKey",
      required: true,
    },
    endpoint: {
      type: String,
      required: true,
    },
    method: {
      type: String,
      required: true,
    },
    status: {
      type: Number,
      required: true,
    },
    responseTime: {
      type: Number,
      default: 0,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    ip: {
      type: String,
    },
    userAgent: {
      type: String,
    },
    referrer: {
      type: String,
    },
    requestPayload: {
      type: Schema.Types.Mixed,
    },
    responsePayload: {
      type: Schema.Types.Mixed,
    },
    error: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

// Create indexes for better performance and aggregation
ApiUsageSchema.index({ userId: 1, timestamp: 1 })
ApiUsageSchema.index({ apiKeyId: 1, timestamp: 1 })
ApiUsageSchema.index({ endpoint: 1, timestamp: 1 })

export default mongoose.models.ApiUsage ||
  mongoose.model<ApiUsage>("ApiUsage", ApiUsageSchema)
