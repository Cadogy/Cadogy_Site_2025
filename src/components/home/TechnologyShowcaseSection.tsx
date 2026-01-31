"use client"

import { motion } from "framer-motion"
import { TechIcon } from "@/components/tech/TechIcon"
import { TECHNOLOGIES_CONFIG } from "@/lib/tech/config"

export type TechnologyShowcaseSectionProps = {
  title?: string
  subtitle?: string
}

export function TechnologyShowcaseSection({
  title = "Technologies We Master",
  subtitle,
}: TechnologyShowcaseSectionProps): JSX.Element {
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

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {TECHNOLOGIES_CONFIG.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <TechIcon name={tech.name} icon={tech.icon} size="medium" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
