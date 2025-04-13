"use client"

import React, { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { AtSign, Eye, EyeOff, KeyRound, Loader2 } from "lucide-react"
import { signIn, useSession } from "next-auth/react"
import { Turnstile } from "next-turnstile"
import { v4 as uuidv4 } from "uuid"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"

// In development mode, we can bypass the Turnstile verification
const isDevelopment = process.env.NODE_ENV === "development"

export default function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { data: session, status } = useSession()
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [unverifiedEmail, setUnverifiedEmail] = useState<string | null>(null)
  const [resendingEmail, setResendingEmail] = useState(false)
  const [verificationStatus, setVerificationStatus] = useState<string | null>(
    null
  )
  const [showPassword, setShowPassword] = useState(false)
  const [turnstileToken, setTurnstileToken] = useState<string | null>(
    isDevelopment ? "development_bypass_token" : null
  )
  const [turnstileId] = useState(uuidv4())

  // Handle session changes
  useEffect(() => {
    if (status === "authenticated" && session) {
      const callbackUrl = searchParams.get("callbackUrl")
      if (callbackUrl) {
        router.push(callbackUrl)
      } else if (window.location.pathname === "/login") {
        router.push("/dashboard")
      }
    }
  }, [status, session, router, searchParams])

  // Check URL params for verification status
  useEffect(() => {
    const verified = searchParams.get("verified") === "true"
    const registered = searchParams.get("registered") === "true"
    const errorParam = searchParams.get("error")

    if (verified) {
      setVerificationStatus("verified")
    } else if (registered) {
      setVerificationStatus("registered")
    }

    // Handle NextAuth error parameter in URL
    if (errorParam) {
      if (errorParam === "CredentialsSignin") {
        setError("Invalid email or password.")
      } else if (
        errorParam.includes("verify") ||
        errorParam.includes("Verify")
      ) {
        const email = searchParams.get("email")
        if (email) {
          setUnverifiedEmail(email)
          setError(
            "Your email is not verified. Please verify your email before logging in."
          )
        } else {
          setError("Please verify your email before logging in.")
        }
      } else {
        setError(decodeURIComponent(errorParam))
      }
    }
  }, [searchParams])

  const handleResendVerification = async () => {
    if (!unverifiedEmail) return

    setResendingEmail(true)
    try {
      const response = await fetch("/api/auth/resend-verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: unverifiedEmail }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to resend verification email")
      }

      toast({
        title: "Verification email sent",
        description: "Please check your email to verify your account.",
        variant: "default",
      })
    } catch (error: any) {
      console.error("Resend verification error:", error)
    } finally {
      setResendingEmail(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setUnverifiedEmail(null)

    // Validate turnstile token (skip in development mode)
    if (!isDevelopment && !turnstileToken) {
      setError("Please complete the security check")
      return
    }

    setIsLoading(true)

    try {
      // First, validate login credentials and check email verification
      const validationResponse = await fetch("/api/auth/validate-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          turnstileToken,
        }),
      })

      const validationData = await validationResponse.json()

      // If email is not verified, show verification needed message
      if (validationResponse.status === 403 && !validationData.verified) {
        setUnverifiedEmail(email)
        setError(
          "Your email is not verified. Please verify your email before logging in."
        )
        return
      }

      // If other validation error
      if (!validationResponse.ok) {
        setError(validationData.message || "Invalid credentials")
        return
      }

      // If validation passed, proceed with actual login
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
        turnstileToken,
        callbackUrl: "/dashboard",
      })

      if (result?.error) {
        setError(result.error)
        toast({
          title: "Login failed",
          description: result.error,
          variant: "destructive",
        })
      } else if (result?.ok) {
        toast({
          title: "Login successful",
          description: "You are now logged in",
        })

        // Add a delay to ensure session is established
        setTimeout(() => {
          router.push("/dashboard")
          router.refresh()
        }, 500)
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.")
      toast({
        title: "Login failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="auth-card">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-white">Welcome back</h1>
          <p className="mt-2 text-sm text-slate-400">
            Sign in to your account to continue
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-lg bg-red-500/10 p-3 text-sm text-red-500">
            <p>{error}</p>
            {unverifiedEmail && (
              <button
                onClick={handleResendVerification}
                disabled={resendingEmail}
                className="mt-2 inline-flex items-center text-xs font-medium text-red-400 hover:text-red-300"
              >
                {resendingEmail ? (
                  <>
                    <Loader2 className="mr-1.5 h-3 w-3 animate-spin" />
                    Sending verification email...
                  </>
                ) : (
                  <>Resend verification email</>
                )}
              </button>
            )}
          </div>
        )}

        {verificationStatus === "verified" && (
          <div className="mb-6 rounded-lg bg-green-500/10 p-3 text-sm text-green-500">
            <p>
              Your email has been verified successfully. You can now log in.
            </p>
          </div>
        )}

        {verificationStatus === "registered" && (
          <div className="mb-6 rounded-lg bg-blue-500/10 p-3 text-sm text-blue-400">
            <p>
              Your account has been created. Please check your email to verify
              your account.
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label htmlFor="email" className="auth-label">
              Email address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <AtSign className="h-4 w-4" />
              </div>
              <input
                id="email"
                type="email"
                placeholder="name@example.com"
                autoComplete="email"
                required
                className="auth-input pl-10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="auth-label">
                Password
              </label>
              <button
                type="button"
                onClick={() => router.push("/forgot-password")}
                className="text-xs font-medium text-slate-400 hover:text-slate-300"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <KeyRound className="h-4 w-4" />
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                autoComplete="current-password"
                required
                className="auth-input pl-10 pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-300"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* Add turnstile component before the submit button (only in production) */}
          {!isDevelopment && (
            <div className="mt-4 flex justify-center">
              <Turnstile
                siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                onVerify={(token: string) => setTurnstileToken(token)}
                refreshExpired="auto"
                responseField={false}
                id={turnstileId}
              />
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || (!isDevelopment && !turnstileToken)}
            className="auth-button mt-2"
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="mt-6 flex items-center justify-center gap-x-1 text-xs text-slate-400">
          <span>Don&apos;t have an account?</span>
          <Link
            href="/register"
            className="font-medium text-slate-300 hover:text-white"
          >
            Create one now
          </Link>
        </div>
      </div>
    </div>
  )
}
