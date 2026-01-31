"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

const HeroSection = () => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-100"
      >
        <source
          src="/videos/cadogy_who_we_are_background.mp4"
          type="video/mp4"
        />
      </video>

      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5"></div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center px-6 py-20 pt-32 md:px-12 md:pt-56">
        <div className="w-full text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 text-5xl font-medium tracking-tight text-foreground md:text-7xl lg:text-8xl"
          >
            We work at high speed with high standards.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mx-auto mb-16 max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl"
          >
            We ship fast, adapt instantly, and outperform slower competitors.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center justify-center gap-8 text-sm text-muted-foreground"
          >
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 transition-colors hover:text-foreground"
            >
              Start a project
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>

            {/* <span className="text-border">|</span> */}
          </motion.div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  )
}

export default HeroSection
