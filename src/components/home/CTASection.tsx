"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

export type CTALink = {
  text: string
  href: string
}

export type CTASectionProps = {
  headline: string
  subheadline?: string
  primaryCTA: CTALink
  secondaryCTA?: CTALink
  className?: string
}

export function CTASection({
  headline,
  subheadline,
  primaryCTA,
  secondaryCTA,
  className,
}: CTASectionProps): JSX.Element {
  return (
    <section
      className={cn(
        "relative w-full overflow-hidden bg-primary py-20 md:py-32",
        className
      )}
    >
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="mb-4 text-4xl font-bold text-primary-foreground md:text-5xl lg:text-6xl">
            {headline}
          </h2>

          {subheadline && (
            <p className="mb-8 text-lg text-primary-foreground/90 md:text-xl">
              {subheadline}
            </p>
          )}

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href={primaryCTA.href}
              className={cn(
                "group inline-flex items-center gap-2 rounded-lg",
                "bg-background px-8 py-4 text-lg font-semibold text-foreground",
                "transition-all hover:scale-105 hover:shadow-xl"
              )}
            >
              {primaryCTA.text}
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>

            {secondaryCTA && (
              <Link
                href={secondaryCTA.href}
                className={cn(
                  "inline-flex items-center gap-2 rounded-lg",
                  "border-2 border-primary-foreground/30 px-8 py-4 text-lg font-semibold text-primary-foreground",
                  "transition-all hover:border-primary-foreground/60 hover:bg-primary-foreground/10"
                )}
              >
                {secondaryCTA.text}
              </Link>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
