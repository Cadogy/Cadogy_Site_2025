import { User } from "@/models/User"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import { NextAuthOptions } from "next-auth"
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
  // Cookie configuration for both production and development environments
  cookies: {
    sessionToken: {
      name:
        process.env.NODE_ENV === "production"
          ? `__Secure-next-auth.session-token`
          : `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
        domain:
          process.env.NODE_ENV === "production" ? ".cadogy.com" : undefined,
      },
    },
    callbackUrl: {
      name:
        process.env.NODE_ENV === "production"
          ? `__Secure-next-auth.callback-url`
          : `next-auth.callback-url`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
        domain:
          process.env.NODE_ENV === "production" ? ".cadogy.com" : undefined,
      },
    },
    csrfToken: {
      name:
        process.env.NODE_ENV === "production"
          ? `__Secure-next-auth.csrf-token`
          : `next-auth.csrf-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
        domain:
          process.env.NODE_ENV === "production" ? ".cadogy.com" : undefined,
      },
    },
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        turnstileToken: { label: "Turnstile Token", type: "text" },
      },
      async authorize(credentials) {
        // Connect to database
        await connectToDatabase()

        if (!credentials?.email || !credentials.password) {
          throw new Error("Invalid credentials")
        }

        // We don't need to verify the turnstile token here because it's already
        // verified in the validate-login API route before this is called

        // Find user by email
        const user = await User.findOne({ email: credentials.email })

        if (!user || !user.password) {
          throw new Error("No user found with this email")
        }

        // Check if email is verified - using strict check
        if (
          typeof user.emailVerified === "undefined" ||
          user.emailVerified === null
        ) {
          // Format the error message to include information that can be parsed by the client
          throw new Error(
            `Please verify your email before logging in&email=${encodeURIComponent(credentials.email)}`
          )
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
        token.name = user.name
        token.email = user.email
        token.image = user.image
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.role = token.role as string
        session.user.name = (token.name as string) ?? ""
        session.user.email = (token.email as string) ?? ""
        session.user.image = token.image as string | undefined
      }
      return session
    },
    async redirect({ url, baseUrl }) {
      // Allow relative callback URLs
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`
      }

      // Allow callbacks to permitted domains
      const allowedDomains = [
        "cadogy.com",
        "www.cadogy.com",
        "app.cadogy.com",
        "localhost:3000",
        "192.168.1.66:3000",
        "192.168.1.66",
      ]

      const isAllowedDomain = allowedDomains.some(
        (domain) =>
          url.startsWith(`http://${domain}`) ||
          url.startsWith(`https://${domain}`)
      )

      if (isAllowedDomain) {
        return url
      }

      // Default to dashboard
      return `${baseUrl}/dashboard`
    },
  },
  debug: process.env.NODE_ENV === "development",
}
