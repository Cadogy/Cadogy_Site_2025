import "@/styles/globals.css"

import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { SessionProvider } from "@/providers/SessionProvider"
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin"
import NextTopLoader from "nextjs-toploader"
import { extractRouterConfig } from "uploadthing/server"

import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/toaster"
import { PageTransition } from "@/components/elements/PageTransition"
import { ThemeProvider } from "@/components/theme-provider"
import { ourFileRouter } from "@/app/api/uploadthing/core"

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
            <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
            <PageTransition>
              <main className="flex flex-col justify-center">{children}</main>
            </PageTransition>
            <Toaster />
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
