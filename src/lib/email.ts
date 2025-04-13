import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)
const fromEmail = process.env.FROM_EMAIL || "noreply@cadogy.com"

/**
 * Send a verification email to the user
 */
export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/verify-email?token=${token}`

  try {
    const data = await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: "Verify your email address",
      html: `
        <div>
          <h1>Verify your email address</h1>
          <p>Click the link below to verify your email:</p>
          <a href="${confirmUrl}">Verify Email</a>
        </div>
      `,
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
  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password?token=${token}`

  try {
    const data = await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: "Reset your password",
      html: `
        <div>
          <h1>Reset your password</h1>
          <p>Click the link below to reset your password:</p>
          <a href="${resetUrl}">Reset Password</a>
        </div>
      `,
    })

    return { success: true, data }
  } catch (error) {
    console.error("Failed to send password reset email:", error)
    return { success: false, error }
  }
}
