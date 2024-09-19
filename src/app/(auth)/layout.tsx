import "@/styles/globals.css"

import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider"

import { NavigationMenu } from "@/components/elements/navbar"
import { Footer } from "@/components/elements/footer"

const inter = Inter({ subsets: ["latin"] })

interface AuthLayoutProps {
  children: React.ReactNode;
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
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/auth_bg.mp4" type="video/mp4" />
      </video>

      {/* Backdrop Blur Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-lg" />

      {/* Centered Content */}
      <div className="relative z-10 flex">
        {children}
      </div>
      </ThemeProvider>
    </div>
  );
}
