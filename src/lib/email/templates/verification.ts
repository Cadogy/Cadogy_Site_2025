import BaseEmailTemplate, { emailBaseStyles } from "./base"

interface VerificationEmailProps {
  confirmUrl: string
}

const VerificationEmailTemplate = ({ confirmUrl }: VerificationEmailProps) => {
  return BaseEmailTemplate({
    previewText:
      "Verify your email address to complete your Cadogy account setup",
    children: `
      <h1 style="${emailBaseStyles.heading}">Verify your email address</h1>
      <p style="${emailBaseStyles.text}">
        Thank you for signing up with Cadogy. To complete your account setup and access all features, 
        please verify your email address by clicking the button below.
      </p>
      <div style="${emailBaseStyles.buttonContainer}">
        <a href="${confirmUrl}" target="_blank" style="${emailBaseStyles.button}">
          Verify Email Address
        </a>
      </div>
      <p style="${emailBaseStyles.text}">
        If you did not create an account with Cadogy, you can safely ignore this email.
      </p>
      <p style="${emailBaseStyles.text}">
        If the button above doesn't work, copy and paste this link into your browser:
        <br />
        <a href="${confirmUrl}" style="${emailBaseStyles.link}">${confirmUrl}</a>
      </p>
    `,
  })
}

export default VerificationEmailTemplate
