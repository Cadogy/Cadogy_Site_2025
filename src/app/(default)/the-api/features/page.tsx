import { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRight,
  Check,
  Code2,
  FileText,
  Image as ImageIcon,
  Shield,
  Sparkles,
  TestTube2,
  Zap,
} from "lucide-react"

import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
  title: "API Features - Cadogy",
  description:
    "Explore the powerful features of The API by Cadogy - your gateway to AI-powered content generation, research, and development.",
  openGraph: {
    title: "API Features - Cadogy",
    description:
      "Explore the powerful features of The API by Cadogy - your gateway to AI-powered content generation, research, and development.",
    url: `${siteConfig.url.base}/the-api/features`,
    images: [{ url: siteConfig.ogImage, alt: "Cadogy API Features" }],
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
  benefits: [
    "bg-gradient-to-r from-indigo-500 to-blue-500", // Speed
    "bg-gradient-to-r from-purple-500 to-indigo-500", // Security
    "bg-gradient-to-r from-blue-500 to-teal-500", // Integration
    "bg-gradient-to-r from-pink-500 to-rose-500", // Innovation
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
    icon: Check,
  },
  {
    title: "Cutting-Edge Innovation",
    description:
      "Access the latest AI advancements with continuous updates and new capabilities.",
    icon: Sparkles,
  },
]

export default function FeaturesPage() {
  return (
    <div className="bg-background">
      {/* Hero Section styled like HeroCarousel slides */}
      <div className="mx-auto max-w-[94%] px-4 sm:px-6 md:max-w-[90%] lg:px-8">
        <div className="relative mx-auto h-[620px] w-full overflow-hidden rounded-lg md:h-[735px]">
          {/* Video Background with overlay */}
          <div className="absolute inset-0 z-0">
            {/* Video element */}
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="h-full w-full scale-[1.02] object-cover"
            >
              <source src="/videos/auth_bg.mp4" type="video/mp4" />
            </video>

            {/* Overlay for better text visibility */}
            <div className="absolute inset-0 bg-black/50" />

            {/* Subtle grain texture */}
            <div className="noise absolute inset-0 opacity-20" />
          </div>

          {/* Hero Content - Centered */}
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-center sm:px-8">
            <div className="mx-auto max-w-3xl">
              <h1 className="bg-gradient-to-b from-white to-white/70 bg-clip-text text-5xl font-medium tracking-tight text-transparent sm:text-6xl lg:text-7xl">
                API Features
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/90 sm:mt-8 sm:text-xl">
                Unlock the full potential of AI with our comprehensive suite of
                tools.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
                <Link
                  href="/the-api"
                  className="text-sm font-semibold leading-6 text-slate-300 hover:text-slate-100"
                >
                  Overview <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative mx-auto max-w-7xl px-4 pb-32 sm:px-6">
        <div className="relative space-y-24 pt-4 md:pt-16">
          {/* Introduction */}
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="px-2 text-3xl font-medium text-slate-100 sm:text-4xl md:px-0">
              Powerful AI capabilities at your fingertips
            </h2>
            <p className="text-md mt-6 leading-8 text-slate-400">
              Our API provides access to state-of-the-art artificial
              intelligence tools that can transform your workflow, boost
              productivity, and unlock new possibilities for your projects and
              business.
            </p>
          </div>

          {/* Feature Cards - Detailed */}
          <div>
            <h3 className="mb-12 text-center text-sm font-medium uppercase tracking-wider text-slate-400">
              Core API Features
            </h3>

            <div className="space-y-16">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="relative overflow-hidden rounded-2xl"
                >
                  {/* Background gradient */}
                  <div
                    className={`absolute inset-0 ${gradients.features[index]} opacity-10`}
                  ></div>

                  {/* Content */}
                  <div className="relative grid grid-cols-1 gap-12 p-8 lg:grid-cols-2 lg:p-12">
                    {/* Left column - Feature info */}
                    <div>
                      <div className="flex items-center">
                        <div
                          className={`flex h-12 w-12 items-center justify-center rounded-lg ${gradients.features[index]}`}
                        >
                          <feature.icon
                            className="h-6 w-6 text-white"
                            strokeWidth={1.5}
                          />
                        </div>
                        <h3 className="ml-4 text-2xl font-medium text-white">
                          {feature.title}
                        </h3>
                      </div>

                      <p className="mt-6 text-lg text-slate-300">
                        {feature.description}
                      </p>

                      {/* Feature list */}
                      <ul className="mt-8 space-y-4">
                        {feature.details.map((detail, i) => (
                          <li key={i} className="flex items-start">
                            <div
                              className={`${gradients.features[index]} mr-2 mt-1 rounded-full p-0.5`}
                            >
                              <Check
                                className="h-4 w-4 text-white"
                                strokeWidth={3}
                              />
                            </div>
                            <span className="text-slate-300">{detail}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Use Case */}
                      <div className="mt-8 rounded-lg bg-slate-800/30 p-4 backdrop-blur-sm">
                        <h4 className="text-sm font-medium uppercase tracking-wide text-slate-300">
                          Example Use Case
                        </h4>
                        <p className="mt-2 text-slate-400">{feature.useCase}</p>
                      </div>
                    </div>

                    {/* Right column - Visual representation */}
                    <div className="flex items-center justify-center">
                      <div
                        className={`aspect-square w-full max-w-sm overflow-hidden rounded-lg ${gradients.features[index]} p-1`}
                      >
                        <div className="h-full w-full rounded-lg bg-slate-900/90 p-6">
                          <feature.icon
                            className="h-16 w-16 text-white/80"
                            strokeWidth={1.5}
                          />
                          <div className="mt-6 space-y-2">
                            <div className="h-2 w-3/4 rounded bg-slate-700"></div>
                            <div className="h-2 w-1/2 rounded bg-slate-700"></div>
                            <div className="h-2 w-5/6 rounded bg-slate-700"></div>
                            <div className="h-2 w-2/3 rounded bg-slate-700"></div>
                          </div>
                          {/* <div className="mt-8 flex justify-end">
                            <div className="rounded bg-slate-800 px-3 py-1 text-xs text-slate-300">
                              {feature.date}
                            </div>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits Section */}
          <div>
            <h3 className="mb-12 text-center text-sm font-medium uppercase tracking-wider text-slate-400">
              Key Benefits
            </h3>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {benefits.map((benefit, index) => (
                <div
                  key={benefit.title}
                  className="group relative overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900/60 p-6 transition-all duration-300 hover:border-slate-700"
                >
                  <div
                    className={`absolute -right-10 -top-10 h-24 w-24 rounded-full ${gradients.benefits[index]} opacity-20 blur-xl transition-all duration-300 group-hover:opacity-30`}
                  ></div>
                  <div className="relative z-10">
                    <benefit.icon
                      className={`h-10 w-10 text-white/80`}
                      strokeWidth={1.5}
                    />
                    <h4 className="mt-4 text-xl font-medium text-white">
                      {benefit.title}
                    </h4>
                    <p className="mt-2 text-sm text-slate-400">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Integration Section */}
          <div className="rounded-xl bg-gradient-to-r from-neutral-900 to-neutral-800 p-8 sm:p-12">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-2xl font-medium text-white sm:text-3xl">
                Seamless Integration
              </h2>
              <p className="mt-4 text-slate-300">
                Our API is designed to work with your existing tech stack. We
                provide comprehensive documentation, client libraries, and
                sample code to help you get started quickly.
              </p>

              {/* Code Sample */}
              <div className="mt-8 overflow-hidden rounded-lg bg-neutral-950 text-left">
                <div className="flex items-center bg-neutral-900 px-4 py-2">
                  <div className="flex space-x-2">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  </div>
                  <p className="ml-4 text-sm text-slate-400">
                    API Request Example
                  </p>
                </div>
                <pre className="overflow-auto p-4 text-sm text-slate-300">
                  <code>{`const response = await fetch('https://api.cadogy.com/v1/generate/image', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    prompt: "A futuristic city with flying cars and holographic billboards",
    resolution: "1024x1024",
    style: "photorealistic"
  })
});

const data = await response.json();
console.log(data.image_url);`}</code>
                </pre>
              </div>

              {/* <div className="mt-8">
                <Link
                  href="/docs"
                  className="inline-flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300"
                >
                  View Documentation
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div> */}
            </div>
          </div>

          {/* Pricing CTA */}
          <div className="rounded-xl bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/10 via-purple-500/10 to-pink-500/10 px-8 py-16 text-center sm:px-12 md:px-16 lg:px-24">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-2xl font-medium text-white sm:text-3xl">
                Ready to transform your workflow?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-slate-400">
                Get access to our innovative API and start building the next
                generation of AI-powered applications.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/login"
                  className="inline-block rounded-md bg-white px-8 py-3.5 text-sm font-semibold text-background transition-colors hover:bg-neutral-200"
                >
                  Get Started
                </Link>
                <Link
                  href="/pricing"
                  className="inline-block rounded-md border border-neutral-700 bg-transparent px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:border-neutral-600 hover:bg-neutral-900/30"
                >
                  View Pricing
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
