import { Metadata } from "next"

import ForgotPasswordForm from "@/components/auth/forgot-password-form"

export const metadata: Metadata = {
  title: "Forgot Password | Cadogy",
  description: "Reset your password to regain access to your account",
}

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />
}
