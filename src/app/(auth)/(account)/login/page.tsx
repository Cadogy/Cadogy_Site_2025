import { Suspense } from "react"
import { Metadata } from "next"

import { siteConfig } from "@/config/site"
import LoginForm from "@/components/auth/login-form"

export const metadata: Metadata = {
  title: `Clients Login - Cadogy`,
  description:
    "Login to your Cadogy account to access your API keys and manage your account.",
  keywords: [],
  robots: {
    index: false,
    follow: false,
  },
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

// Simple loading fallback for the Suspense boundary
function LoginLoadingFallback() {
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

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginLoadingFallback />}>
      <LoginForm />
    </Suspense>
  )
}
