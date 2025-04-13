import { Suspense } from "react"
import { Metadata } from "next"

import ResetPasswordForm from "@/components/auth/reset-password-form"

export const metadata: Metadata = {
  title: "Reset Password - Cadogy",
  description: "Reset your password to regain access to your account",
}

// Simple loading fallback for the Suspense boundary
function ResetPasswordLoadingFallback() {
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

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<ResetPasswordLoadingFallback />}>
      <ResetPasswordForm />
    </Suspense>
  )
}
