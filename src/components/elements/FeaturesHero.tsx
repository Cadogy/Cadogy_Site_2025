"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

export function FeaturesHero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-neutral-900 to-background">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold tracking-tight text-slate-100 sm:text-6xl"
          >
            The API by Cadogy
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 text-lg leading-8 text-slate-300"
          >
            Making creating, researching, and exploring the everchanging world
            of AI quicker and easier.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-10 flex items-center justify-center gap-x-6"
          >
            <a
              href="/login"
              className="group inline-flex items-center gap-2 rounded-md bg-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
            >
              Get Started
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="/the-api/overview"
              className="text-sm font-semibold leading-6 text-slate-300 hover:text-slate-100"
            >
              Learn more <span aria-hidden="true">→</span>
            </a>
          </motion.div>
        </div>

        {/* Feature highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {[
            {
              title: "Media Generation",
              description:
                "Create stunning visuals, videos, and audio content with our advanced AI models.",
              icon: "🎨",
            },
            {
              title: "Content Creation",
              description:
                "Write stories, scripts, and engaging content with natural language processing.",
              icon: "✍️",
            },
            {
              title: "Code Generation",
              description:
                "Generate application code and automate development workflows efficiently.",
              icon: "💻",
            },
            {
              title: "Research & Analysis",
              description:
                "Explore complex datasets and conduct advanced research across various domains.",
              icon: "🔬",
            },
            {
              title: "Genome Research",
              description:
                "Analyze and understand genetic data with specialized AI models.",
              icon: "🧬",
            },
            {
              title: "API Integration",
              description:
                "Seamlessly connect with other services and platforms through our API.",
              icon: "🔌",
            },
          ].map((feature, index) => (
            <div
              key={feature.title}
              className="group relative rounded-2xl bg-neutral-900/50 p-6 transition-all hover:bg-neutral-900/80"
            >
              <div className="mb-4 text-3xl">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-slate-100">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-slate-400">
                {feature.description}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
