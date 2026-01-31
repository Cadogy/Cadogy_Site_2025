"use client"

import { motion } from "framer-motion"
import { StatCard, StatCardProps } from "./StatCard"

export type StatsSectionProps = {
  stats: StatCardProps[]
  title?: string
  subtitle?: string
}

export function StatsSection({
  stats,
  title = "Our Impact",
  subtitle,
}: StatsSectionProps): JSX.Element {
  return (
    <section className="w-full py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-4 text-4xl font-medium tracking-tight text-foreground md:text-5xl lg:text-6xl"
          >
            {title}
          </motion.h2>
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mx-auto max-w-2xl text-lg text-muted-foreground"
            >
              {subtitle}
            </motion.p>
          )}
        </div>

        {stats.length > 0 && (
          <div className="stats-grid grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {stats.map((stat, index) => (
              <motion.div
                key={`${stat.label}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <StatCard {...stat} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
