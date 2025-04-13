"use client"

import React, { useCallback, useEffect, useRef, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { CheckCircle, Loader2, XCircle } from "lucide-react"
import { z } from "zod"

import { toast } from "@/components/ui/use-toast"

// Actual content component that uses useSearchParams
export default function VerifyEmailForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const verificationAttempted = useRef(false)
  const redirectDelay = 5 // seconds before redirect

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [countdown, setCountdown] = useState(redirectDelay)

  // Define handleGoToLogin with useCallback to avoid unnecessary re-renders
  const handleGoToLogin = useCallback(() => {
    if (success) {
      router.push("/login?verified=true")
    } else {
      router.push("/login")
    }
  }, [router, success])

  useEffect(() => {
    // Prevent duplicate API calls (especially in StrictMode)
    if (verificationAttempted.current) {
      return
    }

    const verifyEmail = async () => {
      if (!token) {
        setError("Invalid or missing verification token")
        setIsLoading(false)
        toast({
          title: "Verification failed",
          description: "Invalid or missing verification token",
          variant: "destructive",
        })
        return
      }

      try {
        verificationAttempted.current = true
        // console.log("Verifying email with token:", token)
        const response = await fetch(`/api/auth/verify-email?token=${token}`, {
          method: "GET",
        })

        const data = await response.json()
        // console.log("API response:", response.status, data)

        // Check user record regardless of response status
        // This is a workaround for cases where the API updates the database
        // but returns an error due to token deletion or other issues
        if (
          data.message?.includes("verified successfully") ||
          data.redirectUrl ||
          response.ok
        ) {
          setSuccess(true)
          return
        }

        throw new Error(data.message || "Email verification failed")
      } catch (error: any) {
        console.error("Verification error:", error)
        setError(
          error.message || "An unexpected error occurred. Please try again."
        )
      } finally {
        setIsLoading(false)
      }
    }

    verifyEmail()
  }, [token])

  // Handle automatic redirect after success
  useEffect(() => {
    if (success && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown((prev) => prev - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (success && countdown === 0) {
      handleGoToLogin()
    }
  }, [success, countdown, handleGoToLogin])

  return (
    <div className="w-full max-w-md">
      <div className="auth-card">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-white">Email Verification</h1>
          <p className="mt-2 text-sm text-slate-400">
            {isLoading
              ? "Verifying your account..."
              : success
                ? "Your account is verified"
                : "Verification failed"}
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
          </div>
        ) : error ? (
          <div className="mb-6 rounded-lg bg-red-500/10 p-4 text-sm text-red-400">
            <div className="flex items-start">
              <XCircle className="mr-3 mt-0.5 h-5 w-5 flex-shrink-0" />
              <div>
                <p className="font-medium text-red-300">Verification failed</p>
                <p className="mt-1">{error}</p>
                <p className="mt-3">
                  Please try again or contact support if the problem persists.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="mb-6 rounded-lg bg-green-500/10 p-4 text-sm text-green-400">
            <div className="flex items-start">
              <CheckCircle className="mr-3 mt-0.5 h-5 w-5 flex-shrink-0" />
              <div>
                <p className="font-medium text-green-300">Email verified</p>
                <p className="mt-1">
                  Your email has been verified successfully! You can now log in
                  to your account.
                </p>
                <p className="mt-3 text-green-200">
                  Redirecting to login in {countdown} second
                  {countdown !== 1 ? "s" : ""}...
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8">
          <button onClick={handleGoToLogin} className="auth-button">
            {success ? "Login Now" : "Go to Login"}
          </button>
        </div>
      </div>
    </div>
  )
}
