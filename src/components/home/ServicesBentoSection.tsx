"use client"

import { motion } from "framer-motion"
import { BentoGrid } from "@/components/bento/BentoGrid"
import { BentoCard } from "@/components/bento/BentoCard"
import { SERVICES_CONFIG } from "@/lib/services/config"

export type ServicesBentoSectionProps = {
  title?: string
  subtitle?: string
}

export function ServicesBentoSection({
  title = "What We Do",
  subtitle,
}: ServicesBentoSectionProps): JSX.Element {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg text-muted-foreground md:text-xl">
              {subtitle}
            </p>
          )}
        </motion.div>

        <BentoGrid pattern="feature" gap={6}>
          {SERVICES_CONFIG.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <BentoCard {...service} />
            </motion.div>
          ))}
        </BentoGrid>
      </div>
    </section>
  )
}
