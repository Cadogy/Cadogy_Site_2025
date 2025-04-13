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

/**
 * Send an email
 * @param options Email options including to, subject, and HTML content
 * @returns Promise that resolves when email is sent
 */
export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string
  subject: string
  html: string
}) {
  // For now, just log the email for development purposes
  // In production, implement actual email sending logic
  console.log(`[EMAIL] To: ${to}, Subject: ${subject}`)
  console.log(`[EMAIL] Content: ${html.substring(0, 100)}...`)

  // TODO: Implement actual email sending
  // Example with nodemailer:
  //
  // const transporter = nodemailer.createTransport({
  //   host: process.env.EMAIL_SERVER_HOST,
  //   port: Number(process.env.EMAIL_SERVER_PORT),
  //   auth: {
  //     user: process.env.EMAIL_SERVER_USER,
  //     pass: process.env.EMAIL_SERVER_PASSWORD,
  //   },
  //   secure: Boolean(process.env.EMAIL_SERVER_SECURE),
  // })
  //
  // return transporter.sendMail({
  //   from: process.env.EMAIL_FROM,
  //   to,
  //   subject,
  //   html,
  // })

  // Simulate successful sending
  return Promise.resolve({ success: true })
}
