"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { AtSign, Eye, EyeOff, Info, KeyRound, Loader2 } from "lucide-react"
import { Turnstile } from "next-turnstile"
import { v4 as uuidv4 } from "uuid"

import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/components/ui/use-toast"

// In development mode, we can bypass the Turnstile verification
const isDevelopment = process.env.NODE_ENV === "development"

const RegisterForm = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [error, setError] = useState("")
  const [verificationSent, setVerificationSent] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [turnstileToken, setTurnstileToken] = useState<string | null>(
    isDevelopment ? "development_bypass_token" : null
  )
  const [turnstileId] = useState(uuidv4())

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validate form
    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (!acceptTerms) {
      setError("You must accept the terms of service")
      return
    }

    // Validate turnstile token (skip in development mode)
    if (!isDevelopment && !turnstileToken) {
      setError("Please complete the security check")
      toast({
        title: "Verification required",
        description: "Please complete the security check to continue",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/register", {
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

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Registration failed")
      }

      // Show verification message instead of redirecting
      setVerificationSent(true)
    } catch (error: any) {
      setError(
        error.message || "An unexpected error occurred. Please try again."
      )

      toast({
        title: "Registration failed",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Render verification message if verification email was sent
  if (verificationSent) {
    return (
      <div className="w-full max-w-md">
        <div className="auth-card">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-white">
              Email Verification
            </h1>
            <p className="mt-2 text-sm text-slate-400">
              Please check your email to verify your account
            </p>
          </div>

          <div className="mb-6 rounded-lg bg-blue-500/10 p-4 text-sm text-blue-400">
            <div className="flex items-start">
              <Info className="mr-3 mt-0.5 h-5 w-5 flex-shrink-0" />
              <div>
                <p className="font-medium text-blue-300">
                  Verification email sent
                </p>
                <p className="mt-1">
                  We&apos;ve sent a verification link to{" "}
                  <span className="font-medium text-blue-300">{email}</span>.
                  Please check your inbox and click the link to activate your
                  account.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <button
              onClick={() => router.push("/login")}
              className="auth-button"
            >
              Go to Login Page
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md">
      <div className="auth-card">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-white">Create account</h1>
          <p className="mt-2 text-sm text-slate-400">
            Sign up to get started with Cadogy
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-lg bg-red-500/10 p-3 text-sm text-red-500">
            <p>{error}</p>
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
            <label htmlFor="password" className="auth-label">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <KeyRound className="h-4 w-4" />
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                autoComplete="new-password"
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

          <div className="space-y-1">
            <label htmlFor="confirm-password" className="auth-label">
              Confirm password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <KeyRound className="h-4 w-4" />
              </div>
              <input
                id="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                autoComplete="new-password"
                required
                className="auth-input pl-10 pr-10"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isLoading}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-300"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-start space-x-2 pt-2">
            <Checkbox
              id="terms"
              className="mt-0.5 h-4 w-4 border-slate-600 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
              checked={acceptTerms}
              onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
            />
            <label htmlFor="terms" className="text-xs text-slate-300">
              I agree to the{" "}
              <Link
                href="/policies/terms-of-use"
                className="text-slate-200 underline hover:text-white"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/policies/privacy-policy"
                className="text-slate-200 underline hover:text-white"
              >
                Privacy Policy
              </Link>
            </label>
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
            className="auth-button mt-6"
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            {isLoading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <div className="mt-6 flex items-center justify-center gap-x-1 text-xs text-slate-400">
          <span>Already have an account?</span>
          <Link
            href="/login"
            className="font-medium text-slate-300 hover:text-white"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  )
}

export default RegisterForm
