import NextAuth from "next-auth"

// Extend the NextAuth session and JWT types
declare module "next-auth" {
  interface Session {
    user: {
      id: string // Add id to user object
      name: string
      email: string
      image?: string
      role: string
    }
  }

  interface User {
    id: string
    role?: string
  }

  interface JWT {
    id: string
    role?: string
  }
}
