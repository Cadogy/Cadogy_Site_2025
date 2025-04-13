import { model, models, Schema, Types } from "mongoose"

export interface ISession {
  userId: Types.ObjectId
  expires: Date
  sessionToken: string
}

const SessionSchema = new Schema<ISession>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  expires: {
    type: Date,
    required: true,
  },
  sessionToken: {
    type: String,
    unique: true,
    required: true,
  },
})

export const Session =
  models.Session || model<ISession>("Session", SessionSchema)
