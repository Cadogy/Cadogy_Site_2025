import mongoose, { Schema, Types } from "mongoose"

export interface SystemAlert {
  _id?: mongoose.Types.ObjectId | string
  title: string
  description: string
  severity: "info" | "warning" | "error"
  type: "system" | "user"
  userId?: Types.ObjectId // Optional - only for user-specific alerts
  isActive: boolean
  startDate: Date
  endDate?: Date
  link?: string
  linkText?: string
}

const SystemAlertSchema = new Schema<SystemAlert>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    severity: {
      type: String,
      enum: ["info", "warning", "error"],
      default: "info",
    },
    type: {
      type: String,
      enum: ["system", "user"],
      default: "system",
      index: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      index: true,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
    startDate: {
      type: Date,
      default: Date.now,
      index: true,
    },
    endDate: {
      type: Date,
    },
    link: {
      type: String,
    },
    linkText: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

// Create indexes for better performance
SystemAlertSchema.index({ type: 1, isActive: 1 })
SystemAlertSchema.index({ userId: 1, isActive: 1 })
SystemAlertSchema.index({ startDate: 1, endDate: 1 })

export default mongoose.models.SystemAlert ||
  mongoose.model<SystemAlert>("SystemAlert", SystemAlertSchema)
