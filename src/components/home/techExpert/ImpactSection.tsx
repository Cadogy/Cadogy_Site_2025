import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

const ImpactSection = () => {
  return (
    <section className="w-full py-20 pt-0 md:py-32">
      <div className="mx-auto px-0">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-medium tracking-tight text-foreground md:text-5xl lg:text-6xl">
              The power of 200 developers. The agility of a boutique team.
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
              We leverage AI to multiply our capabilities, delivering
              enterprise-scale results with small agency efficiency. What
              traditionally requires massive teams and budgets, we accomplish
              faster, smarter, and more cost-effectively.
            </p>

            <div>
              <a
                href="/contact"
                className="group inline-flex items-center gap-2 text-lg font-medium text-foreground transition-colors hover:text-foreground/80"
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
