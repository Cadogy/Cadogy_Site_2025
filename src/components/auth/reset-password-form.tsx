"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { CheckCircle, Eye, EyeOff, KeyRound, Loader2 } from "lucide-react"

import { toast } from "@/components/ui/use-toast"

// Actual content component that uses useSearchParams
export default function ResetPasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  useEffect(() => {
    if (!token) {
      setError("Invalid or missing reset token")
      toast({
        title: "Reset error",
        description: "Invalid or missing reset token",
        variant: "destructive",
      })
    }
  }, [token])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validate form
    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long")
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, password, confirmPassword }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Password reset failed")
      }

      setSuccess(true)
      toast({
        title: "Password reset successful",
        description: "You'll be redirected to login shortly",
        variant: "default",
      })

      // Redirect to login after 3 seconds
      setTimeout(() => {
        router.push("/login")
      }, 3000)
    } catch (error: any) {
      setError(
        error.message || "An unexpected error occurred. Please try again."
      )
      toast({
        title: "Reset failed",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="w-full max-w-md">
        <div className="auth-card">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-white">
              Password Reset Complete
            </h1>
            <p className="mt-2 text-sm text-slate-400">
              Your password has been successfully updated
            </p>
          </div>

          <div className="mb-6 rounded-lg bg-green-500/10 p-4 text-sm text-green-400">
            <div className="flex items-start">
              <CheckCircle className="mr-3 mt-0.5 h-5 w-5 flex-shrink-0" />
              <div>
                <p className="font-medium text-green-300">Reset successful</p>
                <p className="mt-1">
                  Your password has been reset. You&apos;ll be redirected to the
                  login page in a moment.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <button
              onClick={() => router.push("/login")}
              className="auth-button"
            >
              Go to Login
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
          <h1 className="text-2xl font-bold text-white">Reset Password</h1>
          <p className="mt-2 text-sm text-slate-400">
            Create a new password for your account
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-lg bg-red-500/10 p-3 text-sm text-red-500">
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label htmlFor="password" className="auth-label">
              New password
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
                disabled={isLoading || !token}
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
            <label htmlFor="confirmPassword" className="auth-label">
              Confirm password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <KeyRound className="h-4 w-4" />
              </div>
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                autoComplete="new-password"
                required
                className="auth-input pl-10 pr-10"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isLoading || !token}
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

          <button
            type="submit"
            disabled={isLoading || !token}
            className="auth-button mt-6"
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            {isLoading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        <div className="mt-6 flex items-center justify-center gap-x-1 text-xs text-slate-400">
          <span>Remember your password?</span>
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
