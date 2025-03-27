"use client"

import { motion } from "framer-motion"
import {
  ArrowRight,
  Code2,
  FileText,
  Image,
  Microscope,
  Network,
  TestTube2,
} from "lucide-react"

const features = [
  {
    title: "Media Generation",
    description:
      "Create stunning visuals, videos, and audio content with our advanced AI models. Transform your ideas into reality with state-of-the-art media generation capabilities.",
    icon: Image,
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
  },
  {
    title: "Content Creation",
    description:
      "Write stories, scripts, and engaging content with natural language processing. Our AI models understand context and tone to help you create compelling narratives.",
    icon: FileText,
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
  },
  {
    title: "Code Generation",
    description:
      "Generate application code and automate development workflows efficiently. Speed up your development process with AI-powered code suggestions and completions.",
    icon: Code2,
    color: "text-green-400",
    bgColor: "bg-green-500/10",
  },
  {
    title: "Research & Analysis",
    description:
      "Explore complex datasets and conduct advanced research across various domains. Our AI models help you uncover insights and patterns in your data.",
    icon: TestTube2,
    color: "text-orange-400",
    bgColor: "bg-orange-500/10",
  },
  {
    title: "Genome Research",
    description:
      "Analyze and understand genetic data with specialized AI models. Accelerate your genomic research with our advanced sequence analysis capabilities.",
    icon: Microscope,
    color: "text-pink-400",
    bgColor: "bg-pink-500/10",
  },
  {
    title: "API Integration",
    description:
      "Seamlessly connect with other services and platforms through our API. Build powerful applications that leverage the full potential of AI technology.",
    icon: Network,
    color: "text-indigo-400",
    bgColor: "bg-indigo-500/10",
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function FeaturesGrid() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">
          Powerful Features for Every Use Case
        </h2>
        <p className="mt-6 text-lg leading-8 text-slate-300">
          Whether you&apos;re generating media content, writing stories and
          scripts, generating application code or researching the human genome,
          The API by Cadogy connects you to everything and everyone.
        </p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
      >
        {features.map((feature) => (
          <motion.div
            key={feature.title}
            variants={item}
            className="group relative rounded-2xl bg-neutral-900/50 p-8 transition-all hover:bg-neutral-900/80"
          >
            <div
              className={`mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl ${feature.bgColor}`}
            >
              <feature.icon className={`h-6 w-6 ${feature.color}`} />
            </div>
            <h3 className="text-xl font-semibold text-slate-100">
              {feature.title}
            </h3>
            <p className="mt-4 text-slate-400">{feature.description}</p>
            <div className="mt-6">
              <a
                href="/login"
                className="inline-flex items-center text-sm font-medium text-blue-400 hover:text-blue-300"
              >
                Learn more
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-16 rounded-2xl bg-neutral-900/50 p-8 text-center">
        <h3 className="text-2xl font-semibold text-slate-100">
          Ready to Get Started?
        </h3>
        <p className="mt-4 text-slate-400">
          Clients and Cadogy Access members have access to accessing our
          innovative API, with more information coming soon.
        </p>
        <div className="mt-8">
          <a
            href="/login"
            className="inline-flex items-center gap-2 rounded-md bg-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
          >
            Get Started
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </div>
  )
}
