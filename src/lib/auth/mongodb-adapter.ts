import { MongoDBAdapter } from "@auth/mongodb-adapter"
import { MongoClient } from "mongodb"

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env.local")
}

// Create cached connection variable
let client: MongoClient
let clientPromise: Promise<MongoClient>

// In development mode, use a global variable to preserve the MongoDB connection across hot-reloads
if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable to preserve the value across module reloads
  if (!global._mongoClientPromise) {
    client = new MongoClient(process.env.MONGODB_URI)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  // In production mode, it's best to not use a global variable
  client = new MongoClient(process.env.MONGODB_URI)
  clientPromise = client.connect()
}

// Export the MongoDB adapter
export const adapter = MongoDBAdapter(clientPromise)

// Export a type for the global variable
declare global {
  var _mongoClientPromise: Promise<MongoClient>
}
