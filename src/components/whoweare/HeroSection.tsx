"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Code, Globe, Shield, Zap } from "lucide-react"

const HeroSection = () => {
  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] items-center overflow-hidden">
      {/* Decorative background elements */}
      <div className="bg-grid-white/5 absolute inset-0 bg-[size:100px_100px] opacity-25" />
      <div className="absolute right-0 top-0 -mr-96 -mt-96 opacity-40">
        <div className="aspect-square h-[800px] rounded-md bg-gradient-to-br from-primary/40 to-indigo-500/30 blur-[200px]" />
      </div>
      <div className="absolute bottom-0 left-0 -mb-96 -ml-96 opacity-40">
        <div className="aspect-square h-[800px] rounded-md bg-gradient-to-tr from-blue-500/30 to-purple-500/20 blur-[200px]" />
      </div>
      <div className="absolute left-1/4 top-1/2 h-64 w-64 rounded-full bg-cyan-500/10 mix-blend-multiply blur-[120px]"></div>

      {/* Subtle background image overlay */}
      <div className="absolute inset-0 opacity-10">
        <Image
          src="/images/gradient-5.jpg"
          alt="Background pattern"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="relative mx-auto w-full max-w-3xl px-4 py-8 text-center sm:px-6 md:max-w-3xl lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          <div className="mb-4 inline-flex items-center rounded-md bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            <Zap className="mr-1.5 h-3.5 w-3.5" />
            We Love Technology
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            <span className="block">Transforming ideas into</span>
            <span className="block bg-gradient-to-r from-primary to-blue-400 bg-clip-text py-1 text-transparent">
              digital solutions
            </span>
          </h1>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
            We&apos;re a dedicated team driven by innovation, technical
            excellence, and a passion for creating impactful digital
            experiences.
          </p>

          {/* Visually distinctive element - could be an illustration or abstract graphic */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative my-8 w-full max-w-lg"
          >
            <div className="relative overflow-hidden rounded-xl border border-border/40 bg-gradient-to-br from-blue-900/30 to-indigo-900/30 backdrop-blur-sm">
              <div className="bg-grid-white/[0.02] absolute left-0 top-0 h-full w-full bg-[size:20px_20px] mix-blend-overlay"></div>
              <div className="">
                {/* Abstract 3D render or illustration */}
                <Image
                  src="/images/ui/pb_demo_screen_category.png"
                  width={600}
                  height={300}
                  alt="Digital solutions visualization"
                  className="h-auto w-full rounded-lg"
                  priority
                />
              </div>
            </div>

            {/* Stats overlay */}
            <div className="absolute -bottom-3 -right-1 max-w-[180px] rounded-lg border border-border/40 bg-card/80 p-3 shadow-xl backdrop-blur-sm md:-right-3">
              <h4 className="mb-1 text-sm font-semibold">Our Excellence</h4>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xl font-bold text-primary">6+</p>
                  <p className="text-[10px] text-muted-foreground">Years</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-primary">150+</p>
                  <p className="text-[10px] text-muted-foreground">
                    Clients Served
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-3 sm:flex-nowrap">
            <Link
              href="/contact"
              className="group flex w-full items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 sm:w-auto"
              data-cursor="click"
            >
              <span>Get in Touch</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/our-charter"
              className="group flex w-full items-center justify-center rounded-md border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition-all hover:bg-muted sm:w-auto"
              data-cursor="click"
            >
              <span>Read Our Charter</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection
