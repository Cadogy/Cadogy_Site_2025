import { Suspense } from "react"
import { Metadata } from "next"

import ResetPasswordForm, {
  ResetPasswordLoading,
} from "@/components/auth/reset-password-form"

export const metadata: Metadata = {
  title: "Reset Password | Cadogy",
  description: "Reset your password to regain access to your account",
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<ResetPasswordLoading />}>
      <ResetPasswordForm />
    </Suspense>
  )
}
