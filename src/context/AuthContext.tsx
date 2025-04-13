import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react"
import { Session } from "next-auth"
import { signIn, signOut, useSession } from "next-auth/react"

type AuthContextType = {
  session: Session | null
  status: "loading" | "authenticated" | "unauthenticated"
  signIn: (credentials?: Record<string, string>) => Promise<any>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data: session, status } = useSession()

  const value = {
    session,
    status,
    signIn: async (credentials?: Record<string, string>) => {
      if (credentials) {
        return signIn("credentials", {
          ...credentials,
          callbackUrl: "/",
        })
      }
      return signIn()
    },
    signOut: async () => signOut({ callbackUrl: "/" }),
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
