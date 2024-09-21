import "@/styles/globals.css"

import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Footer } from "@/components/elements/footer"
import { NavigationMenu } from "@/components/elements/navbar"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

interface AuthLayoutProps {
  children: React.ReactNode
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="relative min-h-screen">
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        {/* Ensure only one root-level video element */}
        <div className="absolute inset-0 z-0">
          {/* Background Video */}
          <video
            autoPlay
            loop
            muted
            className="h-full w-full object-cover"
            role="presentation" // Better for accessibility
          >
            <source src="/videos/auth_bg.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Backdrop Blur Overlay */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-lg" />
        </div>

        {/* Main Content Wrapper */}
        <div className="relative z-10 flex min-h-screen flex-col">
          {/* Centered Content */}
          <main className="flex flex-grow items-center justify-center">
            {children}
          </main>
        </div>
      </ThemeProvider>
    </div>
  )
}
