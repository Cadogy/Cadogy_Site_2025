import mongoose, { Schema, Types } from "mongoose"

export interface Subscription {
  _id?: mongoose.Types.ObjectId | string
  userId: Types.ObjectId
  planId: string
  planName: string
  status: "active" | "canceled" | "past_due" | "trialing" | "unpaid"
  monthlyQuota: number
  currentUsage: number
  startDate: Date
  endDate: Date
  trialEndDate?: Date
  cancelAtPeriodEnd: boolean
  paymentMethod?: string
  lastPaymentDate?: Date
  nextBillingDate?: Date
}

const SubscriptionSchema = new Schema<Subscription>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },
    planId: {
      type: String,
      required: true,
    },
    planName: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "canceled", "past_due", "trialing", "unpaid"],
      default: "active",
    },
    monthlyQuota: {
      type: Number,
      required: true,
    },
    currentUsage: {
      type: Number,
      default: 0,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    trialEndDate: {
      type: Date,
    },
    cancelAtPeriodEnd: {
      type: Boolean,
      default: false,
    },
    paymentMethod: {
      type: String,
    },
    lastPaymentDate: {
      type: Date,
    },
    nextBillingDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
)

// Create indexes for better performance
SubscriptionSchema.index({ userId: 1 })
SubscriptionSchema.index({ status: 1 })
SubscriptionSchema.index({ endDate: 1 })

export default mongoose.models.Subscription ||
  mongoose.model<Subscription>("Subscription", SubscriptionSchema)
