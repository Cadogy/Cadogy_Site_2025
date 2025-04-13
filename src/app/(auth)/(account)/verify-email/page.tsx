import { Metadata } from "next"

import VerifyEmailForm from "@/components/auth/verify-email-form"

export const metadata: Metadata = {
  title: "Verify Email | Cadogy",
  description: "Verify your email address to complete registration",
}

export default function VerifyEmailPage() {
  return <VerifyEmailForm />
}
