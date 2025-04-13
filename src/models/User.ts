import mongoose, { model, models, Schema } from "mongoose"

export interface IUser {
  name?: string
  email: string
  emailVerified?: Date
  image?: string
  password?: string
  role: "user" | "admin"
  createdAt: Date
  updatedAt: Date
}

const UserSchema = new Schema<IUser>(
  {
    name: String,
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Invalid email address",
      ],
    },
    emailVerified: Date,
    image: String,
    password: String,
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        delete ret.password
        return ret
      },
    },
  }
)

// Check if model already exists to prevent overwriting during hot reloads
export const User = models.User || model<IUser>("User", UserSchema)
