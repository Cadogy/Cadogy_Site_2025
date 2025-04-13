import mongoose from "mongoose"

// Disable duplicate index warnings in development
if (process.env.NODE_ENV === "development") {
  mongoose.set("strictQuery", false)
  // Suppress specific warnings
  const originalWarn = mongoose.set("debug", false)
  const originalConsoleWarn = console.warn

  console.warn = function (message: any) {
    if (
      message &&
      typeof message === "string" &&
      (message.includes("Duplicate schema index") ||
        message.includes("[MONGOOSE] Warning: Duplicate schema index"))
    ) {
      return // Suppress duplicate index warnings
    }
    originalConsoleWarn.apply(console, arguments as any)
  }
}

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  )
}

/**
 * Global variable to maintain connection across hot reloads in development
 */
declare global {
  var mongoose: {
    conn: mongoose.Connection | null
    promise: Promise<mongoose.Connection> | null
  }
}

// Initialize global mongoose connection object
global.mongoose = global.mongoose || { conn: null, promise: null }

/**
 * Connect to MongoDB
 */
export const connectToDatabase = async (): Promise<mongoose.Connection> => {
  if (global.mongoose.conn) {
    // Use existing connection
    return global.mongoose.conn
  }

  if (!global.mongoose.promise) {
    // Create new connection
    const mongooseInstance = await mongoose.connect(MONGODB_URI!)
    global.mongoose.promise = Promise.resolve(mongooseInstance.connection)
  }

  try {
    global.mongoose.conn = await global.mongoose.promise
    return global.mongoose.conn
  } catch (e) {
    global.mongoose.promise = null
    throw e
  }
}
