import { Suspense } from "react"
import { Metadata } from "next"

import VerifyEmailForm from "@/components/auth/verify-email-form"

export const metadata: Metadata = {
  title: "Verify Email | Cadogy",
  description: "Verify your email address to complete registration",
}

// Simple loading fallback for the Suspense boundary
function VerifyEmailLoadingFallback() {
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

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<VerifyEmailLoadingFallback />}>
      <VerifyEmailForm />
    </Suspense>
  )
}
