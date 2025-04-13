"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { AtSign, Loader2, MailCheck } from "lucide-react"

import { toast } from "@/components/ui/use-toast"

export default function ForgotPasswordForm() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Password reset request failed")
      }

      setSuccess(true)
      toast({
        title: "Reset email sent",
        description: "Please check your inbox for further instructions.",
        variant: "default",
      })
    } catch (error: any) {
      setError(
        error.message || "An unexpected error occurred. Please try again."
      )
      toast({
        title: "Reset request failed",
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
            <h1 className="text-2xl font-bold text-white">Check your email</h1>
            <p className="mt-2 text-sm text-slate-400">
              Password reset instructions have been sent
            </p>
          </div>

          <div className="mb-6 rounded-lg bg-green-500/10 p-4 text-sm text-green-400">
            <div className="flex items-start">
              <MailCheck className="mr-3 mt-0.5 h-5 w-5 flex-shrink-0" />
              <div>
                <p className="font-medium text-green-300">Reset email sent</p>
                <p className="mt-1">
                  We&apos;ve sent recovery instructions to{" "}
                  <span className="font-medium text-green-300">{email}</span>.
                  Please check your inbox and follow the link to reset your
                  password.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <button
              onClick={() => router.push("/login")}
              className="auth-button"
            >
              Back to Login
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
          <h1 className="text-2xl font-bold text-white">Forgot password?</h1>
          <p className="mt-2 text-sm text-slate-400">
            Enter your email to receive reset instructions
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

          <button
            type="submit"
            disabled={isLoading}
            className="auth-button mt-6"
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            {isLoading ? "Sending..." : "Send reset instructions"}
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
