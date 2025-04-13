import { Suspense } from "react"
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

// Simple loading fallback for the Suspense boundary
function RegisterLoadingFallback() {
  return (
    <div className="w-full max-w-md">
      <div className="auth-card">
        <div className="flex flex-col items-center py-8">
          <p className="text-sm text-slate-400">Loading...</p>
        </div>
      </div>
    </div>
  )
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<RegisterLoadingFallback />}>
      <RegisterForm />
    </Suspense>
  )
}
