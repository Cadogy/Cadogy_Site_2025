import "@/styles/globals.css"

import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { SessionProvider } from "@/providers/SessionProvider"
import NextTopLoader from "nextjs-toploader"

import { cn } from "@/lib/utils"
import { PageTransition } from "@/components/elements/PageTransition"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

interface RootLayoutProps {
  children: React.ReactNode
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background antialiased",
          inter.className
        )}
      >
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
            <PageTransition>
              <main className="flex flex-col justify-center">{children}</main>
            </PageTransition>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
