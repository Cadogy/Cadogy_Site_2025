import { Suspense } from "react"
import { Metadata } from "next"

import VerifyEmailForm, {
  VerifyEmailLoading,
} from "@/components/auth/verify-email-form"

export const metadata: Metadata = {
  title: "Verify Email | Cadogy",
  description: "Verify your email address to complete registration",
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<VerifyEmailLoading />}>
      <VerifyEmailForm />
    </Suspense>
  )
}
