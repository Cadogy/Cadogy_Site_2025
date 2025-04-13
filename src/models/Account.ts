import { model, models, Schema, Types } from "mongoose"

export interface IAccount {
  userId: Types.ObjectId
  type: string
  provider: string
  providerAccountId: string
  refresh_token?: string
  access_token?: string
  expires_at?: number
  token_type?: string
  scope?: string
  id_token?: string
  session_state?: string
}

const AccountSchema = new Schema<IAccount>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  type: {
    type: String,
    required: true,
  },
  provider: {
    type: String,
    required: true,
  },
  providerAccountId: {
    type: String,
    required: true,
  },
  refresh_token: String,
  access_token: String,
  expires_at: Number,
  token_type: String,
  scope: String,
  id_token: String,
  session_state: String,
})

// Create a compound index on provider and providerAccountId
AccountSchema.index({ provider: 1, providerAccountId: 1 }, { unique: true })

export const Account =
  models.Account || model<IAccount>("Account", AccountSchema)
