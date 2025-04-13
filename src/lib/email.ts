import { Resend } from "resend"

import {
  PasswordResetEmailTemplate,
  VerificationEmailTemplate,
} from "./email/templates"

const resend = new Resend(process.env.RESEND_API_KEY)
const fromEmailAddress = process.env.FROM_EMAIL || "noreply@cadogy.com"
const fromEmail = `Cadogy <${fromEmailAddress}>`

/**
 * Send a verification email to the user
 */
export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${token}`

  try {
    const data = await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: "Verify your email address",
      html: VerificationEmailTemplate({ confirmUrl }),
    })

    return { success: true, data }
  } catch (error) {
    console.error("Failed to send verification email:", error)
    return { success: false, error }
  }
}

/**
 * Send a password reset email to the user
 */
export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`

  try {
    const data = await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: "Reset your password",
      html: PasswordResetEmailTemplate({ resetUrl }),
    })

    return { success: true, data }
  } catch (error) {
    console.error("Failed to send password reset email:", error)
    return { success: false, error }
  }
}
