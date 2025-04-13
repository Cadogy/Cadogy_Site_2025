import BaseEmailTemplate, { emailBaseStyles } from "./base"

interface PurchaseConfirmationProps {
  name: string
  tokens: number
  newBalance: number
  orderId: string
  amount: number
  date: Date
}

export const PurchaseConfirmationEmailTemplate = ({
  name,
  tokens,
  newBalance,
  orderId,
  amount,
  date,
}: PurchaseConfirmationProps) => {
  const formattedDate = date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const content = `
    <div>
      <h1 style="${emailBaseStyles.heading}">Thank You for Your Purchase!</h1>
      
      <p style="${emailBaseStyles.text}">Hello ${name},</p>
      
      <p style="${emailBaseStyles.text}">
        Thank you for your token purchase. Your payment has been processed successfully
        and your tokens are ready to use immediately.
      </p>
      
      <div style="background-color: #1e1e1e; border-radius: 6px; padding: 24px; margin: 24px 0;">
        <h2 style="color: #ffffff; font-size: 18px; margin: 0 0 16px 0;">Order Summary</h2>
        
        <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
          <span style="color: #a0a0a0;">Order ID:</span>
          <span style="color: #ffffff; font-family: monospace;">${orderId}</span>
        </div>
        
        <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
          <span style="color: #a0a0a0;">Date:</span>
          <span style="color: #ffffff;">${formattedDate}</span>
        </div>
        
        <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
          <span style="color: #a0a0a0;">Amount:</span>
          <span style="color: #ffffff;">$${amount.toFixed(2)}</span>
        </div>
        
        <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
          <span style="color: #a0a0a0;">Tokens Purchased:</span>
          <span style="color: #ffffff;">${tokens.toLocaleString()}</span>
        </div>
        
        <div style="display: flex; justify-content: space-between; padding-top: 12px; border-top: 1px solid #2a2a2a;">
          <span style="color: #a0a0a0;">New Token Balance:</span>
          <span style="color: #3b82f6; font-weight: 600;">${newBalance.toLocaleString()}</span>
        </div>
      </div>
      
      <p style="${emailBaseStyles.text}">
        These tokens have been added to your account and are ready to use with our API services.
      </p>
      
      <div style="${emailBaseStyles.buttonContainer}">
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" style="${emailBaseStyles.button}">
          Go to Dashboard
        </a>
      </div>
      
      <p style="${emailBaseStyles.text}">
        If you have any questions about your purchase, please don't hesitate to contact our support team.
      </p>
      
      <p style="${emailBaseStyles.text}">
        Thank you for choosing Cadogy!
      </p>
    </div>
  `

  return BaseEmailTemplate({
    previewText: `Your purchase of ${tokens.toLocaleString()} tokens was successful`,
    children: content,
  })
}
