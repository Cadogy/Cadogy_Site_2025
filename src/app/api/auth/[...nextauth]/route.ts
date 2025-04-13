import { User } from "@/models/User"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import { NextAuthOptions } from "next-auth"
import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials"

import { verifyPassword } from "@/lib/auth"
import { adapter } from "@/lib/auth/mongodb-adapter"
import { connectToDatabase } from "@/lib/mongodb"

export const authOptions: NextAuthOptions = {
  adapter: adapter as any,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Connect to database
        await connectToDatabase()

        if (!credentials?.email || !credentials.password) {
          throw new Error("Invalid credentials")
        }

        // Find user by email
        const user = await User.findOne({ email: credentials.email })

        if (!user || !user.password) {
          throw new Error("No user found with this email")
        }

        // Log verification status for debugging
        console.log("User verification status:", {
          email: user.email,
          emailVerified: user.emailVerified,
          hasVerification:
            user.emailVerified !== undefined && user.emailVerified !== null,
          verifiedType: typeof user.emailVerified,
          isDate: user.emailVerified instanceof Date,
        })

        // Check if email is verified - using strict check
        if (
          typeof user.emailVerified === "undefined" ||
          user.emailVerified === null
        ) {
          throw new Error("Please verify your email before logging in")
        }

        // Verify password
        const isValid = await verifyPassword(
          credentials.password,
          user.password
        )

        if (!isValid) {
          throw new Error("Invalid password")
        }

        // Return user object
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/login",
    newUser: "/register",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.role = token.role as string
      }
      return session
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
