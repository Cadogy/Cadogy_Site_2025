import bcrypt from "bcryptjs"
import { MongoClient } from "mongodb"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

// MongoDB connection
const client = new MongoClient(process.env.MONGODB_URI!)
const db = client.db("your-database-name")
const usersCollection = db.collection("users")

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Find the user by email
        const user = await usersCollection.findOne({
          email: credentials?.email,
        })

        if (!user) {
          throw new Error("No user found with the email")
        }

        // Check password validity
        const isValid = await bcrypt.compare(
          credentials!.password,
          user.password
        )

        if (!isValid) {
          throw new Error("Invalid password")
        }

        // Return the user object if valid
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      // Ensure the session has a user object before assigning the id
      if (session.user) {
        session.user.id = token.id as string // Type assertion to ensure it's treated as string
      }
      return session
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    secret: process.env.JWT_SECRET!, // Ensure the JWT secret is set
  },
  cookies: {
    sessionToken: {
      name: "__Secure-next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  pages: {
    signIn: "/signin",
    signOut: "/signout",
  },
  secret: process.env.NEXTAUTH_SECRET,
})
