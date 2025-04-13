import { Metadata } from "next"

import { siteConfig } from "@/config/site"
import RegisterForm from "@/components/auth/register-form"

export const metadata: Metadata = {
  title: "Register | Cadogy",
  description: "Create a new account with Cadogy",
  keywords: ["register", "sign up", "account"],
  openGraph: {
    title: `Register - Cadogy`,
    description: "Create a new account",
    url: `${siteConfig.url.base}/register`,
    images: [
      {
        url: siteConfig.ogImage,
        alt: `${siteConfig.name} - Register`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Register - Cadogy`,
    description: "Create a new account",
    images: [siteConfig.ogImage],
  },
}

export default function RegisterPage() {
  return <RegisterForm />
}
