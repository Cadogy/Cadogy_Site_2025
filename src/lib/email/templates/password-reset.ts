import BaseEmailTemplate, { emailBaseStyles } from "./base"

interface PasswordResetEmailProps {
  resetUrl: string
}

const PasswordResetEmailTemplate = ({ resetUrl }: PasswordResetEmailProps) => {
  return BaseEmailTemplate({
    previewText: "Reset your Cadogy account password",
    children: `
      <h1 style="${emailBaseStyles.heading}">Reset your password</h1>
      <p style="${emailBaseStyles.text}">
        We received a request to reset your Cadogy account password. Click the button below 
        to set a new password. This link will expire in 1 hour.
      </p>
      <div style="${emailBaseStyles.buttonContainer}">
        <a href="${resetUrl}" target="_blank" style="${emailBaseStyles.button}">
          Reset Password
        </a>
      </div>
      <p style="${emailBaseStyles.text}">
        If you did not request a password reset, you can safely ignore this email. Your 
        account is secure.
      </p>
      <p style="${emailBaseStyles.text}">
        If the button above doesn't work, copy and paste this link into your browser:
        <br />
        <a href="${resetUrl}" style="${emailBaseStyles.link}">${resetUrl}</a>
      </p>
    `,
  })
}

export default PasswordResetEmailTemplate
