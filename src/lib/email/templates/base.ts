import { ReactNode } from "react"

interface BaseEmailTemplateProps {
  previewText?: string
  children: ReactNode
}

export const emailBaseStyles = {
  body: 'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; margin: 0; padding: 0; width: 100%; background-color: #1a1a1a;',
  outerContainer: "padding: 40px 20px;",
  container:
    "max-width: 600px; margin: 0 auto; background-color: #121212; border-radius: 8px; overflow: hidden;",
  // Header styles
  header:
    "padding: 32px 40px 24px; text-align: center; border-bottom: 1px solid #2a2a2a; background: url(https://wp.cadogy.com/wp-content/uploads/2025/04/grainy-gradient.jpg); background-position: center; background-size: cover;",
  logo: "display: block; width: 64px; height: 64px; margin: 0 auto;",
  // Content styles
  content: "padding: 32px 40px;",
  heading:
    "color: #ffffff; font-size: 24px; font-weight: 600; text-align: center; margin: 0 0 24px 0;",
  text: "color: #e0e0e0; font-size: 16px; line-height: 24px; margin: 0 0 24px 0;",
  button:
    "display: inline-block; background-color: #3b82f6; color: #ffffff; font-size: 16px; font-weight: 500; padding: 12px 28px; border-radius: 4px; text-decoration: none; text-align: center;",
  buttonContainer: "padding: 8px 0 16px; text-align: center;",
  // Footer styles
  footer:
    "padding: 24px 40px; color: #a0a0a0; font-size: 14px; text-align: center; border-top: 1px solid #2a2a2a;",
  footerText: "margin: 0 0 12px 0; color: #a0a0a0; font-size: 14px;",
  link: "color: #3b82f6; text-decoration: underline;",
  footerLinks: "margin: 16px 0 0 0;",
}

const BaseEmailTemplate = ({
  previewText = "",
  children,
}: BaseEmailTemplateProps) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Cadogy</title>
        ${previewText ? `<meta name="description" content="${previewText}" />` : ""}
        <meta name="color-scheme" content="dark" />
        <meta name="supported-color-schemes" content="dark" />
      </head>
      <body style="${emailBaseStyles.body}">
        <div style="${emailBaseStyles.outerContainer}">
          <div style="${emailBaseStyles.container}">
            <!-- Header Section -->
            <div style="${emailBaseStyles.header}">
              <img 
                src="${process.env.NEXT_PUBLIC_APP_URL}/images/assets/logos/cadogy-shield.png" 
                alt="Cadogy" 
                style="${emailBaseStyles.logo}" 
              />
            </div>
            
            <!-- Main Content -->
            <div style="${emailBaseStyles.content}">
              ${children}
            </div>
            
            <!-- Footer Section -->
            <div style="${emailBaseStyles.footer}">
              <p style="${emailBaseStyles.footerText}">&copy; ${new Date().getFullYear()} Cadogy. All rights reserved.</p>
              <p style="${emailBaseStyles.footerLinks}">
                <a href="${process.env.NEXT_PUBLIC_APP_URL}/policies/terms-of-use" style="${emailBaseStyles.link}">Terms of Service</a> • 
                <a href="${process.env.NEXT_PUBLIC_APP_URL}/policies/privacy-policy" style="${emailBaseStyles.link}">Privacy Policy</a>
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `
}

export default BaseEmailTemplate
