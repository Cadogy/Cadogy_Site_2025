import { Metadata } from "next"

import { siteConfig } from "@/config/site"
import LoginForm from "@/components/auth/login-form"

export const metadata: Metadata = {
  title: `Clients Login - Cadogy`,
  description: "",
  keywords: [],
  openGraph: {
    title: `Clients Login - Cadogy`,
    description: "",
    url: `${siteConfig.url.base}/login`,
    images: [
      {
        url: siteConfig.ogImage,
        alt: `${siteConfig.name} - Clients Login`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Clients Login - Cadogy`,
    description: "",
    images: [siteConfig.ogImage],
  },
}

export default function LoginPage() {
  return <LoginForm />
}
