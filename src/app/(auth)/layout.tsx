"use client"

import "@/styles/globals.css"

import type { Viewport } from "next"
import { Inter } from "next/font/google"
import { SessionProvider } from "@/providers/SessionProvider"
import { ToastProvider } from "@/providers/toast-provider"
import { UserDataProvider } from "@/providers/UserDataProvider"
import NextTopLoader from "nextjs-toploader"

import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* UploadThing styles */}
        <style>{`
          .ut-button {
            background-color: hsl(var(--primary));
            color: hsl(var(--primary-foreground));
            border-radius: 0.25rem;
            padding: 0.5rem 1rem;
            cursor: pointer;
            font-size: 0.875rem;
            line-height: 1.25rem;
            font-weight: 500;
          }
          .ut-allowed-content {
            display: none;
          }
          .ut-label {
            font-size: 0.875rem;
          }
          .ut-upload-icon svg {
            height: 1.5rem;
            width: 1.5rem;
          }
        `}</style>
      </head>
      <body className={cn("bg-background antialiased", inter.className)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider>
            <NextTopLoader
              color="#60a5fa"
              initialPosition={0.08}
              height={3}
              showSpinner={false}
              easing="ease"
              speed={200}
            />

            <ToastProvider autoDismissTimeout={5000}>
              <UserDataProvider>{children}</UserDataProvider>
            </ToastProvider>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
