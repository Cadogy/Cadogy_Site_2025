"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

const CTASection = () => {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-[94%] px-4 pt-16 pb-16 lg:pb-0 sm:px-6 md:max-w-[90%] md:py-24 lg:px-8">
        <motion.div
          className="rounded-xl border border-border overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          {/* Decorative gradient top border */}
          <div className="h-2 bg-gradient-to-r from-blue-500 via-primary to-indigo-500"></div>
          
          <div className="relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-primary/10 via-blue-500/5 to-transparent rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-blue-500/10 via-indigo-500/5 to-transparent rounded-full blur-[150px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-[60px] opacity-50"></div>
            
            <div className="relative z-10 p-8 md:p-12 lg:p-16 text-center">
              <div className="inline-flex items-center rounded-md bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
                Let&apos;s Collaborate
              </div>
              <h2 className="text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
                Ready to work with us?
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
                Let&apos;s transform your ideas into powerful digital solutions. Get in touch with our team today.
              </p>
              <div className="mt-10 flex flex-col md:flex-row justify-center gap-4">
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center space-x-2 rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90"
                >
                  <span>Contact Us</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/our-charter"
                  className="group inline-flex items-center justify-center rounded-md bg-card border border-border px-6 py-3 text-sm font-medium text-foreground transition-all hover:bg-muted"
                >
                  <span>Read Our Charter</span>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CTASection 