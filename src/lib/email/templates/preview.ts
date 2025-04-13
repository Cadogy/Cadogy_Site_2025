import fs from "fs"
import path from "path"

import { PasswordResetEmailTemplate, VerificationEmailTemplate } from "./"

/**
 * Generate preview HTML files for email templates
 * This is a utility function only to be used during development
 */
export const generateEmailPreviews = () => {
  const previewsDir = path.join(process.cwd(), "email-previews")

  // Create the directory if it doesn't exist
  if (!fs.existsSync(previewsDir)) {
    fs.mkdirSync(previewsDir, { recursive: true })
  }

  // Generate verification email preview
  const verificationHtml = VerificationEmailTemplate({
    confirmUrl: "https://app.cadogy.com/verify-email?token=example-token",
  })
  fs.writeFileSync(
    path.join(previewsDir, "verification.html"),
    verificationHtml
  )

  // Generate password reset email preview
  const passwordResetHtml = PasswordResetEmailTemplate({
    resetUrl: "https://app.cadogy.com/reset-password?token=example-token",
  })
  fs.writeFileSync(
    path.join(previewsDir, "password-reset.html"),
    passwordResetHtml
  )

  console.log(`Email previews generated in ${previewsDir}`)
}

// Uncomment to generate previews
// if (process.env.NODE_ENV === 'development') {
//   generateEmailPreviews();
// }
