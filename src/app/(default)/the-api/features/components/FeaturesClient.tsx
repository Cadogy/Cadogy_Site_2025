"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import {
  ArrowRight,
  Check,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Code2,
  FileText,
  Image as ImageIcon,
  Network,
  Server,
  Shield,
  Sparkles,
  TestTube2,
  Zap,
  Building2,
  User,
  XCircle,
} from "lucide-react"

import { siteConfig } from "@/config/site"

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
}

const gradients = {
  main: "bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-blue-600 via-purple-600 to-orange-500",
  vision:
    "bg-[conic-gradient(at_bottom_left,_var(--tw-gradient-stops))] from-indigo-500 via-purple-500 to-pink-500",
  features: [
    "bg-gradient-to-r from-blue-600 via-blue-400 to-indigo-400", // Media
    "bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-yellow-500 via-purple-500 to-red-500", // Content
    "bg-gradient-to-bl from-green-400 via-emerald-400 to-teal-400", // Code
    "bg-gradient-to-tl from-orange-500 via-amber-500 to-yellow-400", // Research
  ],
}

const features = [
  {
    title: "Media Generation",
    description: "Create stunning visuals, videos, and audio content with AI",
    icon: ImageIcon,
    date: "Mar 2024",
    details: [
      "Generate high-quality images and illustrations from text",
      "Create custom videos with AI-generated scenes and transitions",
      "Transform text into natural-sounding speech with custom voices",
      "Edit and enhance existing media with intelligent AI tools",
    ],
    useCase:
      "A marketing team uses the Media Generation API to create product visualizations and promotional videos in minutes instead of days.",
  },
  {
    title: "Content Creation",
    description:
      "Write compelling stories and scripts with natural language AI",
    icon: FileText,
    date: "Mar 2024",
    details: [
      "Generate blogs, articles, and copy optimized for engagement",
      "Create scripts for videos, podcasts, and presentations",
      "Develop interactive storytelling with branching narratives",
      "Translate and localize content across multiple languages",
    ],
    useCase:
      "An e-commerce platform automatically generates product descriptions in 12 languages using the Content Creation API.",
  },
  {
    title: "Code Generation",
    description: "Generate and optimize code with AI assistance",
    icon: Code2,
    date: "Mar 2024",
    details: [
      "Transform natural language instructions into working code",
      "Generate optimized code across multiple programming languages",
      "Debug and refactor existing codebases with intelligent suggestions",
      "Create automated test suites for quality assurance",
    ],
    useCase:
      "A development team uses the Code Generation API to prototype features and refactor legacy code, reducing development time.",
  },
  {
    title: "Research Tools",
    description: "Analyze data and conduct research with AI",
    icon: TestTube2,
    date: "Mar 2024",
    details: [
      "Extract insights from large datasets with advanced analytics",
      "Perform literature reviews and summarize research papers",
      "Generate hypotheses and experimental designs",
      "Create visual representations of complex data",
    ],
    useCase:
      "Researchers analyze genomic data using the Research Tools API to identify patterns and correlations that would take months to discover manually.",
  },
]

const benefits = [
  {
    title: "Lightning Fast",
    description:
      "Our API is optimized for speed, ensuring quick response times even for complex requests.",
    icon: Zap,
  },
  {
    title: "Enterprise Security",
    description:
      "Bank-grade encryption and comprehensive access controls protect your data and intellectual property.",
    icon: Shield,
  },
  {
    title: "Seamless Integration",
    description:
      "Integrate with existing workflows through our flexible REST API and comprehensive SDKs.",
    icon: Network,
  },
  {
    title: "Cutting-Edge Innovation",
    description:
      "Access the latest AI advancements with continuous updates and new capabilities.",
    icon: Sparkles,
  },
]

// Code example component similar to ApiOverviewClient.tsx
function ApiCodeExample() {
  const [activeTab, setActiveTab] = useState("js")

  return (
    <div className="overflow-hidden rounded-lg bg-neutral-900/70">
      <div className="flex border-b border-neutral-800">
        <button
          className={`px-4 py-2 text-sm font-medium ${activeTab === "js" ? "bg-neutral-500/10 text-neutral-400" : "text-neutral-400"}`}
          onClick={() => setActiveTab("js")}
        >
          JavaScript
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${activeTab === "python" ? "bg-neutral-500/10 text-neutral-400" : "text-neutral-400"}`}
          onClick={() => setActiveTab("python")}
        >
          Python
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${activeTab === "curl" ? "bg-neutral-500/10 text-neutral-400" : "text-neutral-400"}`}
          onClick={() => setActiveTab("curl")}
        >
          cURL
        </button>
      </div>
      <div className="h-80 overflow-y-auto p-4">
        {activeTab === "js" && (
          <pre className="text-sm text-slate-300">
            <code>{`// Generate an image with media API
const response = await fetch('https://api.cadogy.com/v1/media/generate', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    prompt: 'A futuristic cityscape with flying cars',
    style: 'photorealistic',
    width: 1024,
    height: 1024
  })
});

const data = await response.json();
console.log(data.url); // URL to the generated image`}</code>
          </pre>
        )}
        {activeTab === "python" && (
          <pre className="text-sm text-slate-300">
            <code>{`# Generate an image with media API
import requests

response = requests.post(
    'https://api.cadogy.com/v1/media/generate',
    headers={
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json'
    },
    json={
        'prompt': 'A futuristic cityscape with flying cars',
        'style': 'photorealistic',
        'width': 1024,
        'height': 1024
    }
)

data = response.json()
print(data['url'])  # URL to the generated image`}</code>
          </pre>
        )}
        {activeTab === "curl" && (
          <pre className="text-sm text-slate-300">
            <code>{`curl -X POST https://api.cadogy.com/v1/media/generate \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "prompt": "A futuristic cityscape with flying cars",
    "style": "photorealistic",
    "width": 1024,
    "height": 1024
  }'`}</code>
          </pre>
        )}
      </div>
    </div>
  )
}

// FAQ section like ApiOverviewClient.tsx
function FAQ() {
  const [openItem, setOpenItem] = useState<number | null>(0)

  const faqItems = [
    {
      question: "Which feature is best for my use case?",
      answer:
        "The best feature depends on your specific needs. Media Generation is ideal for visual content, Content Creation for text-based material, Code Generation for development workflows, and Research Tools for data analysis and knowledge synthesis. Our team can help you determine the best fit - contact us for a consultation.",
    },
    {
      question: "How do the API features work together?",
      answer:
        "Our API features are designed to work seamlessly together through a unified interface. For example, you can generate a storyline with Content Creation, visualize it with Media Generation, code an application around it with Code Generation, and analyze performance with Research Tools - all through the same API with consistent patterns.",
    },
    {
      question: "Do you offer feature-specific pricing?",
      answer:
        "Yes! While our unified API provides access to all features, we offer flexible pricing options that allow you to pay primarily for the features you use most. This ensures cost-effectiveness for specialized use cases while maintaining the flexibility to access all capabilities when needed.",
    },
    {
      question: "Can I customize the features for my specific industry?",
      answer:
        "Absolutely. All features support industry-specific customization through specialized parameters and fine-tuning options. Enterprise customers also have access to custom model training for their unique use cases. Our documentation provides detailed guides for industry-specific configurations.",
    },
  ]

  const toggleItem = (index: number) => {
    setOpenItem(openItem === index ? null : index)
  }

  return (
    <div className="relative overflow-hidden rounded-xl p-6 px-0 md:px-6 lg:p-8">
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl" />

      <h2 className="relative mb-8 mt-8 text-center text-3xl font-medium text-white md:mt-0 md:text-4xl">
        Frequently Asked Questions
      </h2>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          {faqItems
            .slice(0, Math.ceil(faqItems.length / 2))
            .map((item, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-lg border border-neutral-800 bg-neutral-800/20 backdrop-blur-sm transition-all duration-200 hover:bg-neutral-800/30"
              >
                <button
                  className="flex w-full items-center justify-between p-4 text-left focus:outline-none"
                  onClick={() => toggleItem(index)}
                >
                  <span className="text-lg font-medium text-white">
                    {item.question}
                  </span>
                  {openItem === index ? (
                    <ChevronUp className="h-5 w-5 text-blue-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-neutral-400" />
                  )}
                </button>
                {openItem === index && (
                  <div className="border-t border-neutral-800 p-6 text-base leading-relaxed text-neutral-300">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
        </div>

        <div className="space-y-4">
          {faqItems.slice(Math.ceil(faqItems.length / 2)).map((item, index) => {
            const actualIndex = index + Math.ceil(faqItems.length / 2)
            return (
              <div
                key={actualIndex}
                className="overflow-hidden rounded-lg border border-neutral-800 bg-neutral-800/20 backdrop-blur-sm transition-all duration-200 hover:bg-neutral-800/30"
              >
                <button
                  className="flex w-full items-center justify-between p-4 text-left focus:outline-none"
                  onClick={() => toggleItem(actualIndex)}
                >
                  <span className="text-lg font-medium text-white">
                    {item.question}
                  </span>
                  {openItem === actualIndex ? (
                    <ChevronUp className="h-5 w-5 text-blue-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-neutral-400" />
                  )}
                </button>
                {openItem === actualIndex && (
                  <div className="border-t border-neutral-800 p-6 text-base leading-relaxed text-neutral-300">
                    {item.answer}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// Main component
export default function FeaturesClient() {
  const [activeFeature, setActiveFeature] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1])

  return (
    <div className="bg-background" ref={containerRef}>
      {/* Hero Section with Video */}
      <div className="relative h-[85vh] max-h-[1000px] min-h-[650px] w-full">
        <div className="absolute inset-0 z-0 overflow-hidden rounded-b-lg">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="h-full w-full object-cover"
          >
            <source src="/videos/auth_bg.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-background" />
          <div className="noise absolute inset-0 opacity-20" />
        </div>

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center sm:px-6 md:px-8">
          <div className="mx-auto -mt-8 max-w-3xl sm:mt-0">
            <h1 className="bg-gradient-to-b from-white to-white/70 bg-clip-text text-5xl font-medium tracking-tight text-transparent sm:text-6xl lg:text-7xl">
              API Features
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/90 sm:mt-8 sm:text-xl">
              Elevate your applications with powerful AI capabilities
            </p>
          </div>
        </div>

        <div className="absolute bottom-12 left-0 right-0 z-10 flex justify-center sm:bottom-16">
          <div className="flex flex-col items-center">
            <span className="text-sm text-white/70">Scroll to explore</span>
            <svg
              className="mt-2 h-6 w-6 animate-bounce text-white/70"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-[94%] px-4 pt-16 sm:px-6 md:max-w-[90%] lg:px-8">
        <div className="space-y-20 py-16 md:space-y-24">
          {/* Features Overview Section - Similar to ApiOverviewClient */}
          <div className="relative overflow-hidden rounded-xl md:p-6 lg:p-8">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl" />

            <h2 className="relative mb-8 mt-8 text-center text-3xl font-medium text-white md:mt-0 md:text-4xl">
              Comprehensive Feature Suite
            </h2>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className={`group relative overflow-hidden rounded-lg p-6 transition-all duration-300 ${gradients.features[index]}`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-background/5 to-background/20" />
                  <div className="relative z-10 flex h-full flex-col">
                    <feature.icon className="h-8 w-8 text-white/90" strokeWidth={1.5} />
                    <div className="mt-auto">
                      <h4 className="text-lg font-medium text-white">
                        {feature.title}
                      </h4>
                      <p className="mt-2 text-sm text-white/80">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Overview - Similar to "How It Works" section in ApiOverviewClient */}
          <div>
            <h2 className="mb-8 text-2xl font-medium text-neutral-100 md:text-3xl">
              How Our Features Work
            </h2>
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
              <div className="space-y-6">
                <h3 className="text-xl font-medium text-white">
                  Technical Overview
                </h3>
                <p className="text-neutral-400">
                  Our API features are powered by a unified architecture that ensures consistent performance, reliability, and security across all capabilities. Each feature accesses specialized AI models through a standardized interface.
                </p>
                <p className="text-neutral-400">
                  The modular design allows you to use each feature independently or combine them for powerful workflows. All features follow the same authentication, request, and response patterns for simplified integration.
                </p>
                <div className="mt-6 space-y-4">
                  <div className="flex items-start">
                    <CheckCircle className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0 text-green-400" />
                    <span className="text-neutral-300">
                      Single authentication system for all features
                    </span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0 text-green-400" />
                    <span className="text-neutral-300">
                      Consistent request/response format
                    </span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0 text-green-400" />
                    <span className="text-neutral-300">
                      Specialized AI models for each capability
                    </span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0 text-green-400" />
                    <span className="text-neutral-300">
                      Load-balanced infrastructure for reliability
                    </span>
                  </div>
                </div>
              </div>

              <ApiCodeExample />
            </div>
          </div>

          {/* Feature Details Section */}
          {features.map((feature, index) => (
            <div key={feature.title} className="relative overflow-hidden rounded-xl md:p-6 lg:p-8">
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
              <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl" />

              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                <div className={index % 2 === 1 ? "order-1 lg:order-2" : ""}>
                  <div className="mt-6 md:mt-0 mb-6 flex items-center">
                    <div className={`mr-4 rounded-lg p-3 ${gradients.features[index]}`}>
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-medium text-white md:text-3xl">
                      {feature.title}
                    </h2>
                  </div>
                  <p className="mb-6 text-lg text-neutral-300">
                    {feature.description}
                  </p>
                  <div className="space-y-4">
                    {feature.details.map((detail, i) => (
                      <div key={i} className="flex items-start">
                        <Check className="mr-3 mt-1 h-5 w-5 text-green-400" />
                        <p className="text-neutral-400">{detail}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8">
                    <h3 className="mb-3 text-lg font-medium text-white">Use Case</h3>
                    <div className="rounded-lg bg-neutral-800/30 p-5">
                      <p className="text-neutral-400">{feature.useCase}</p>
                    </div>
                  </div>
                </div>

                <div className={index % 2 === 1 ? "order-2 lg:order-1" : ""}>
                  <div className="relative h-full min-h-[300px] overflow-hidden rounded-lg border border-neutral-700 bg-neutral-800/20">
                    <div className={`absolute inset-0 ${gradients.features[index]} opacity-20`} />
                    <div className="absolute inset-0 flex items-center justify-center p-6">
                      <feature.icon className="h-20 w-20 text-white/30" strokeWidth={1} />
                    </div>
                    <div className="relative z-10 p-6">
                      <h3 className="text-xl font-medium text-white">How it works</h3>
                      <div className="mt-4 space-y-4">
                        <div className="rounded-lg bg-neutral-900/50 p-4">
                          <p className="text-sm text-neutral-300">
                            The {feature.title} API accepts parameters like content type, style preferences, and constraints through a standard JSON request. Our specialized models process your request and return the results in a consistent format.
                          </p>
                        </div>
                        <div className="flex justify-end">
                          <a 
                            href={`/docs/features/${feature.title.toLowerCase().replace(/\s+/g, "-")}`}
                            className="inline-flex items-center text-sm font-medium text-blue-400 hover:text-blue-300"
                          >
                            View documentation <ArrowRight className="ml-1 h-4 w-4" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Benefits Comparison Table */}
          <div>
            <h2 className="mb-8 text-2xl font-medium text-neutral-100 md:text-3xl">
              The Cadogy Advantage
            </h2>
            <div className="space-y-8">
              <div className="overflow-hidden rounded-lg">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  <div className="rounded-lg bg-neutral-800/30 p-6">
                    <h3 className="mb-4 text-xl font-medium text-white">
                      Traditional Approach
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <XCircle className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0 text-red-400" />
                        <span className="text-neutral-400">
                          Multiple API providers to integrate
                        </span>
                      </li>
                      <li className="flex items-start">
                        <XCircle className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0 text-red-400" />
                        <span className="text-neutral-400">
                          Inconsistent interfaces across features
                        </span>
                      </li>
                      <li className="flex items-start">
                        <XCircle className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0 text-red-400" />
                        <span className="text-neutral-400">
                          Multiple authentication systems
                        </span>
                      </li>
                      <li className="flex items-start">
                        <XCircle className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0 text-red-400" />
                        <span className="text-neutral-400">
                          Disjointed billing and usage tracking
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="rounded-lg bg-gradient-to-br from-blue-900/30 to-purple-900/30 p-6 md:col-span-2">
                    <h3 className="mb-4 text-xl font-medium text-white">
                      Cadogy Features Approach
                    </h3>
                    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {benefits.map((benefit) => (
                        <li key={benefit.title} className="flex items-start">
                          <CheckCircle className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0 text-green-400" />
                          <div>
                            <span className="font-medium text-white">{benefit.title}:</span>{" "}
                            <span className="text-neutral-300">{benefit.description}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <FAQ />

          {/* Join Section */}
          <div className="mb-20 rounded-lg bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/10 via-purple-500/10 to-pink-500/10 px-8 py-16 text-center sm:px-12 md:px-16 lg:mb-32 lg:px-24">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-2xl font-medium text-white sm:text-3xl">
                Ready to harness the power of our features?
              </h2>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                <a
                  href="/login"
                  className="inline-block rounded-md bg-white px-8 py-3.5 text-sm font-semibold text-background transition-colors hover:bg-neutral-200"
                >
                  Get Started
                </a>
                <a
                  href="/docs"
                  className="inline-block rounded-md border border-white/30 bg-transparent px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  View Documentation
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
