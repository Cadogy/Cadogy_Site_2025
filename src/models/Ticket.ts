import mongoose, { model, models, Schema } from "mongoose"

export interface ITicketMessage {
  authorId: string
  content: string
  createdAt: Date
}

export interface ITicket {
  userId: string
  subject: string
  category:
    | "technical"
    | "billing"
    | "general"
    | "feature-request"
    | "bug-report"
  priority: "low" | "medium" | "high"
  status: "open" | "in-progress" | "resolved" | "closed"
  messages: ITicketMessage[]
  createdAt: Date
  updatedAt: Date
  lastReplyAt?: Date
  lastReplyBy?: "user" | "admin"
}

const TicketMessageSchema = new Schema<ITicketMessage>(
  {
    authorId: {
      type: String,
      required: true,
      ref: "User",
    },
    content: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: true }
)

const TicketSchema = new Schema<ITicket>(
  {
    userId: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: [
        "technical",
        "billing",
        "general",
        "feature-request",
        "bug-report",
      ],
      default: "general",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    status: {
      type: String,
      enum: ["open", "in-progress", "resolved", "closed"],
      default: "open",
    },
    messages: [TicketMessageSchema],
    lastReplyAt: Date,
    lastReplyBy: {
      type: String,
      enum: ["user", "admin"],
    },
  },
  {
    timestamps: true,
  }
)

export const Ticket = models.Ticket || model<ITicket>("Ticket", TicketSchema)
