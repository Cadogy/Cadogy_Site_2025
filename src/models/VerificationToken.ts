import { model, models, Schema } from "mongoose"

export interface IVerificationToken {
  identifier: string
  token: string
  expires: Date
}

const VerificationTokenSchema = new Schema<IVerificationToken>({
  identifier: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
    unique: true,
  },
  expires: {
    type: Date,
    required: true,
  },
})

export const VerificationToken =
  models.VerificationToken ||
  model<IVerificationToken>("VerificationToken", VerificationTokenSchema)
