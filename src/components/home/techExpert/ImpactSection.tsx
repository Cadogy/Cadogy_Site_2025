import { motion } from "framer-motion"
import { ArrowRight, Sparkles, Users, Zap } from "lucide-react"

const ImpactSection = () => {
  return (
    <section className="relative w-full overflow-hidden py-20 pt-0 md:py-32">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-muted/5 to-transparent" />

      <div className="mx-auto px-0">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Decorative icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6 inline-flex rounded-full bg-primary/10 p-3"
            >
              <Sparkles className="h-6 w-6 text-primary" />
            </motion.div>

            <h2 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              The power of 200 developers. The agility of a boutique team.
            </h2>
          </motion.div>

          <motion.div
            className="flex flex-col justify-center space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
              We leverage AI to multiply our capabilities, delivering
              enterprise-scale results with small agency efficiency. What
              traditionally requires massive teams and budgets, we accomplish
              faster, smarter, and more cost-effectively.
            </p>

            {/* Value highlights */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex items-start gap-3"
              >
                <div className="mt-1 rounded-lg bg-primary/10 p-2">
                  <Zap className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">
                    Lightning Fast
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Rapid development cycles
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex items-start gap-3"
              >
                <div className="mt-1 rounded-lg bg-primary/10 p-2">
                  <Users className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">
                    Expert Team
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Specialized knowledge
                  </p>
                </div>
              </motion.div>
            </div>

            <div>
              <a
                href="/contact"
                className="group inline-flex items-center gap-2 text-lg font-semibold text-foreground transition-all hover:gap-3 hover:text-foreground/80"
              >
                See How We Work
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ImpactSection
