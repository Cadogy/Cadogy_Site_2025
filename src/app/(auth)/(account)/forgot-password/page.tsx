import { Suspense } from "react"
import { Metadata } from "next"

import ForgotPasswordForm from "@/components/auth/forgot-password-form"

export const metadata: Metadata = {
  title: "Forgot Password | Cadogy",
  description: "Reset your password to regain access to your account",
}

// Simple loading fallback for the Suspense boundary
function ForgotPasswordLoadingFallback() {
  return (
    <div className="w-full max-w-md">
      <div className="auth-card">
        <div className="flex flex-col items-center py-8">
          <p className="text-sm text-slate-400">Loading...</p>
        </div>
      </div>
    </div>
  )
}

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={<ForgotPasswordLoadingFallback />}>
      <ForgotPasswordForm />
    </Suspense>
  )
}
