"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

const OurCharterContent = () => {
  return (
    <div className="bg-background">
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
              How we work
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mx-auto max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl"
            >
              The values that shape every project we take on.
            </motion.p>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      <div className="mx-auto max-w-[94%] px-4 md:max-w-[90%] lg:px-8">
        <section className="w-full py-20 md:py-32">
          <div className="mx-auto px-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-20"
            >
              <h2 className="text-4xl font-medium tracking-tight text-foreground md:text-5xl lg:text-6xl">
                What we believe
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-x-24 lg:gap-y-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h3 className="mb-6 text-2xl font-medium text-foreground md:text-3xl">
                  Technology with purpose
                </h3>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  We build solutions that empower people and solve real
                  problems. Every line of code, every design decision, every
                  feature—it all serves a purpose. No bloat, no unnecessary
                  complexity.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h3 className="mb-6 text-2xl font-medium text-foreground md:text-3xl">
                  Security and ethics first
                </h3>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  Your data is yours. Your privacy matters. We approach every
                  project with security and ethical considerations at the
                  forefront, not as an afterthought.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h3 className="mb-6 text-2xl font-medium text-foreground md:text-3xl">
                  Built to evolve
                </h3>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  Technology changes fast. We build systems that can adapt and
                  grow with your needs, not solutions that become obsolete in a
                  year.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h3 className="mb-6 text-2xl font-medium text-foreground md:text-3xl">
                  Partnership, not just projects
                </h3>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  We&apos;re not just building software for you—we&apos;re
                  working with you. Your success is our success, and we&apos;re
                  invested in the long term.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="w-full py-20 md:py-32">
          <div className="mx-auto px-0">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-4xl font-medium tracking-tight text-foreground md:text-5xl lg:text-6xl">
                  Interested in working together?
                </h2>
              </motion.div>

              <motion.div
                className="flex flex-col justify-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
                  We&apos;re always open to discussing new projects, creative
                  ideas, or opportunities to be part of your vision.
                </p>

                <div>
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-2 text-lg font-medium text-foreground transition-colors hover:text-foreground/80"
                  >
                    Get in touch
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default OurCharterContent
