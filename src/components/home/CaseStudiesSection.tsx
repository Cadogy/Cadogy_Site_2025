"use client"

import { motion } from "framer-motion"
import { CaseStudyCard } from "@/components/case-studies/CaseStudyCard"
import { CASE_STUDIES } from "@/lib/case-studies/config"

export type CaseStudiesSectionProps = {
  title?: string
  subtitle?: string
}

export function CaseStudiesSection({
  title = "Our Work",
  subtitle,
}: CaseStudiesSectionProps): JSX.Element {
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

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {CASE_STUDIES.map((caseStudy, index) => (
            <motion.div
              key={caseStudy.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <CaseStudyCard {...caseStudy} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
