"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, Code, Zap, Globe, Shield } from "lucide-react"

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden min-h-[calc(100vh-4rem)] flex items-center">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-grid-white/5 bg-[size:100px_100px] opacity-25" />
      <div className="absolute top-0 right-0 -mt-96 -mr-96 opacity-40">
        <div className="aspect-square h-[800px] rounded-md bg-gradient-to-br from-primary/40 to-indigo-500/30 blur-[200px]" />
      </div>
      <div className="absolute bottom-0 left-0 -mb-96 -ml-96 opacity-40">
        <div className="aspect-square h-[800px] rounded-md bg-gradient-to-tr from-blue-500/30 to-purple-500/20 blur-[200px]" />
      </div>
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-[120px] mix-blend-multiply"></div>
      
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

      <div className="relative w-full mx-auto max-w-3xl px-4 py-8 sm:px-6 md:max-w-3xl lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          <div className="inline-flex items-center rounded-md bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
            <Zap className="w-3.5 h-3.5 mr-1.5" />
            We Love Technology
          </div>

          <h1 className="font-bold tracking-tight text-foreground text-3xl sm:text-4xl lg:text-5xl">
            <span className="block">Transforming ideas into</span>
            <span className="py-1 block bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
              digital solutions
            </span>
          </h1>
          
          <p className="mt-4 text-base leading-relaxed text-muted-foreground max-w-xl">
            We&apos;re a dedicated team driven by innovation, technical excellence, and a passion for creating impactful digital experiences.
          </p>
          
          {/* Visually distinctive element - could be an illustration or abstract graphic */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative my-8 w-full max-w-lg"
          >
            <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-blue-900/30 to-indigo-900/30 border border-border/40 backdrop-blur-sm">
              <div className="absolute top-0 left-0 w-full h-full bg-grid-white/[0.02] bg-[size:20px_20px] mix-blend-overlay"></div>
              <div className="">
                {/* Abstract 3D render or illustration */}
                <Image
                  src="/images/ui/pb_demo_screen_category.png"
                  width={600}
                  height={300}
                  alt="Digital solutions visualization"
                  className="w-full h-auto rounded-lg"
                  priority
                />
              </div>
            </div>
            
            {/* Stats overlay */}
            <div className="absolute -bottom-3 -right-1 md:-right-3 bg-card/80 backdrop-blur-sm border border-border/40 rounded-lg shadow-xl p-3 max-w-[180px]">
              <h4 className="text-sm font-semibold mb-1">Our Excellence</h4>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xl font-bold text-primary">6+</p>
                  <p className="text-[10px] text-muted-foreground">Years</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-primary">150+</p>
                  <p className="text-[10px] text-muted-foreground">Clients Served</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <div className="flex gap-3 flex-wrap sm:flex-nowrap justify-center">
            <Link
              href="/contact"
              className="group flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 w-full sm:w-auto"
            >
              <span>Get in Touch</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/our-charter"
              className="group flex items-center justify-center rounded-md bg-card border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-all hover:bg-muted w-full sm:w-auto"
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