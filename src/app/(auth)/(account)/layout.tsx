"use client"

import Image from "next/image"
import Link from "next/link"

import { PageTransition } from "@/components/elements/PageTransition"

export default function AuthAccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-center opacity-10"></div>

      {/* Animated gradient orbs */}
      <div className="animate-blob absolute -left-40 -top-40 h-80 w-80 rounded-full bg-purple-700/20 blur-3xl filter"></div>
      <div className="animate-blob animation-delay-2000 absolute -right-20 top-0 h-72 w-72 rounded-full bg-blue-700/20 blur-3xl filter"></div>
      <div className="animate-blob animation-delay-4000 absolute -bottom-40 left-20 h-72 w-72 rounded-full bg-teal-700/20 blur-3xl filter"></div>

      {/* Main content */}
      <PageTransition>
        <main className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
          {/* Cadogy Shield Logo */}
          <div className="mb-8 flex justify-center">
            <Link href="/">
              <Image
                src="/images/assets/logos/cadogy-shield.svg"
                alt="Cadogy"
                width={60}
                height={60}
                className="h-16 w-auto"
                priority
              />
            </Link>
          </div>

          {children}

          {/* Minimal footer text */}
          <div className="mt-10 text-center text-xs text-white/40">
            © {new Date().getFullYear()} Cadogy. All rights reserved.
          </div>
        </main>
      </PageTransition>
    </div>
  )
}
