import NextAuth from "next-auth/next"

import { authOptions } from "@/lib/auth/auth-options"

// Export a request handler that uses the auth options
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
