import mongoose from "mongoose"

// Disable duplicate index warnings in development
if (process.env.NODE_ENV === "development") {
  mongoose.set("strictQuery", false)
  mongoose.set("debug", false)

  // Suppress console.warn warnings
  const originalConsoleWarn = console.warn
  console.warn = function (message: any) {
    if (
      message &&
      typeof message === "string" &&
      (message.includes("Duplicate schema index") ||
        message.includes("[MONGOOSE] Warning: Duplicate schema index"))
    ) {
      return
    }
    originalConsoleWarn.apply(console, arguments as any)
  }

  // Suppress Node.js process warnings
  const originalEmit = process.emit as any
  process.emit = function (event: string, warning: any) {
    if (event === "warning") {
      const message = warning?.message || warning?.toString() || ""
      if (
        message.includes("Duplicate schema index") ||
        message.includes("[MONGOOSE]")
      ) {
        return false
      }
    }
    return originalEmit.apply(process, arguments as any)
  } as any
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
    db: any | null
  }
}

// Initialize global mongoose connection object
global.mongoose = global.mongoose || { conn: null, promise: null, db: null }

/**
 * Connect to MongoDB and return the database instance
 */
export const connectToDatabase = async () => {
  if (global.mongoose.conn && global.mongoose.db) {
    // Use existing connection and database
    return global.mongoose.db
  }

  if (!global.mongoose.promise) {
    // Create new connection
    const mongooseInstance = await mongoose.connect(MONGODB_URI!)
    global.mongoose.promise = Promise.resolve(mongooseInstance.connection)
  }

  try {
    global.mongoose.conn = await global.mongoose.promise

    // Get the MongoDB native driver's db instance
    if (!global.mongoose.db) {
      global.mongoose.db = global.mongoose.conn.db
    }

    return global.mongoose.db
  } catch (e) {
    global.mongoose.promise = null
    global.mongoose.db = null
    throw e
  }
}
