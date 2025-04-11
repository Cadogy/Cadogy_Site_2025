"use client"

import { useEffect, useState } from "react"
import {
  ArrowRight,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Clock,
  Code,
  Code2,
  FileText,
  Image as ImageIcon,
  Link,
  Server,
  ShieldCheck,
  TestTube2,
  XCircle,
  Zap,
} from "lucide-react"

import { siteConfig } from "@/config/site"

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
    description:
      "Create stunning images, videos, animations, and audio with state-of-the-art AI models through a single endpoint.",
    icon: ImageIcon,
    date: "Mar 2024",
  },
  {
    title: "Content Creation",
    description:
      "Generate blog posts, marketing copy, scripts, and creative writing with customizable tone and style controls.",
    icon: FileText,
    date: "Mar 2024",
  },
  {
    title: "Code Generation",
    description:
      "Build applications faster with AI-powered code generation, optimization, and debugging across all major languages.",
    icon: Code2,
    date: "Mar 2024",
  },
  {
    title: "Research Tools",
    description:
      "Access advanced data analysis, information retrieval, and knowledge synthesis capabilities for any research domain.",
    icon: TestTube2,
    date: "Mar 2024",
  },
]

function RotatingTitle() {
  const titles = [
    "OpenAI",
    "Anthropic",
    "Nvidia",
    "Sora",
    "Gemini",
    "RapidAPI",
    "IP.IO",
  ]
  const [currentTitle, setCurrentTitle] = useState(titles[0])
  const [fadeState, setFadeState] = useState("visible") // "visible", "fading", "hidden"

  useEffect(() => {
    let currentIndex = 0

    const interval = setInterval(() => {
      // Start fade out
      setFadeState("fading")

      // After fading out, change the word
      setTimeout(() => {
        currentIndex = (currentIndex + 1) % titles.length
        setCurrentTitle(titles[currentIndex])
        setFadeState("visible")
      }, 400)
    }, 3000)

    return () => clearInterval(interval)
  }, [titles.length])

  return (
    <div className="flex flex-col items-center">
      <h1 className="bg-gradient-to-b from-white to-white/70 bg-clip-text text-5xl font-medium tracking-tight text-transparent sm:text-6xl lg:text-7xl">
        Access 
      </h1>
      <div className="mt-2 h-[1.2em] text-5xl font-medium tracking-tight sm:text-6xl lg:text-7xl">
        <span
          className={`bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent transition-opacity duration-500 ease-in-out ${
            fadeState === "fading" ? "opacity-0" : "opacity-100"
          }`}
        >
          {currentTitle}
        </span>
      </div>
    </div>
  )
}

function ApiCodeExample() {
  const [activeTab, setActiveTab] = useState("curl")

  return (
    <div className="overflow-hidden rounded-lg bg-neutral-900/70">
      <div className="flex border-b border-neutral-800">
        <button
          className={`px-4 py-2 text-sm font-medium ${activeTab === "curl" ? "bg-neutral-500/10 text-neutral-400" : "text-neutral-400"}`}
          onClick={() => setActiveTab("curl")}
        >
          cURL
        </button>
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
      </div>
      <div className="h-80 overflow-y-auto p-4">
        {activeTab === "curl" && (
          <pre className="text-sm text-slate-300">
            <code>{`curl -X POST https://api.cadogy.com/v1/generate/image \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "prompt": "A futuristic city with flying cars and neon lights",
    "style": "photorealistic",
    "width": 1024,
    "height": 1024
  }'`}</code>
          </pre>
        )}
        {activeTab === "js" && (
          <pre className="text-sm text-slate-300">
            <code>{`const response = await fetch('https://api.cadogy.com/v1/generate/image', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    prompt: 'A futuristic city with flying cars and neon lights',
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
            <code>{`import requests

response = requests.post(
    'https://api.cadogy.com/v1/generate/image',
    headers={
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json'
    },
    json={
        'prompt': 'A futuristic city with flying cars and neon lights',
        'style': 'photorealistic',
        'width': 1024,
        'height': 1024
    }
)

data = response.json()
print(data['url'])  # URL to the generated image`}</code>
          </pre>
        )}
      </div>
    </div>
  )
}

function ComparisonSection() {
  return (
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
                  Multiple API integrations to manage
                </span>
              </li>
              <li className="flex items-start">
                <XCircle className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0 text-red-400" />
                <span className="text-neutral-400">
                  Several authentication systems
                </span>
              </li>
              <li className="flex items-start">
                <XCircle className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0 text-red-400" />
                <span className="text-neutral-400">
                  Inconsistent documentation
                </span>
              </li>
              <li className="flex items-start">
                <XCircle className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0 text-red-400" />
                <span className="text-neutral-400">
                  Multiple billing systems
                </span>
              </li>
              <li className="flex items-start">
                <XCircle className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0 text-red-400" />
                <span className="text-neutral-400">
                  Varying response formats
                </span>
              </li>
            </ul>
          </div>

          <div className="rounded-lg bg-gradient-to-br from-blue-900/30 to-purple-900/30 p-6 md:col-span-2">
            <h3 className="mb-4 text-xl font-medium text-white">
              The Cadogy API Approach
            </h3>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <li className="flex items-start">
                <CheckCircle className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0 text-green-400" />
                <span className="text-neutral-300">
                  Single unified API for all AI needs
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0 text-green-400" />
                <span className="text-neutral-300">
                  One authentication system
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0 text-green-400" />
                <span className="text-neutral-300">
                  Comprehensive documentation
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0 text-green-400" />
                <span className="text-neutral-300">
                  Single billing dashboard
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0 text-green-400" />
                <span className="text-neutral-300">
                  Consistent response formats
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0 text-green-400" />
                <span className="text-neutral-300">
                  Pay only for what you use
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0 text-green-400" />
                <span className="text-neutral-300">
                  Regular updates to all endpoints
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0 text-green-400" />
                <span className="text-neutral-300">
                  Enterprise-grade security
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="h-full rounded-lg bg-neutral-800/30 p-6">
          <h3 className="mb-3 text-lg font-medium text-white">
            For Individuals
          </h3>
          <p className="text-neutral-400">
            Affordable access to professional-grade AI tools that would
            typically require multiple subscriptions. Perfect for creators,
            freelancers, researchers, and hobbyists looking to leverage AI
            capabilities without enterprise budgets.
          </p>
        </div>
        <div className="h-full rounded-lg bg-neutral-800/30 p-6">
          <h3 className="mb-3 text-lg font-medium text-white">
            For Businesses
          </h3>
          <p className="text-neutral-400">
            Streamline your AI infrastructure with a single integration point.
            Reduce development time, simplify maintenance, and access a wider
            range of capabilities while maintaining enterprise-grade security,
            reliability, and support.
          </p>
        </div>
        <div className="h-full rounded-lg bg-neutral-800/30 p-6">
          <h3 className="mb-3 text-lg font-medium text-white">
            For Developers
          </h3>
          <p className="text-neutral-400">
            Stop juggling multiple AI service integrations. Our unified API
            provides consistent documentation, authentication, and response
            formats across all capabilities, making implementation and scaling
            significantly easier.
          </p>
        </div>
      </div>
    </div>
  )
}

function FAQ() {
  const [openItem, setOpenItem] = useState<number | null>(0)

  const faqItems = [
    {
      question: "How does pricing work for The API?",
      answer:
        "Our pricing is usage-based, meaning you only pay for what you use. We offer tiered plans for individuals, startups, and enterprises, with volume discounts as your usage increases. Each API call is priced based on the complexity and computational resources required.",
    },
    {
      question: "Can I try The API before committing?",
      answer:
        "Yes! We offer a free tier that includes a generous allowance of API calls each month. This lets you explore the capabilities and integrate with your projects before scaling up to a paid plan.",
    },
    {
      question: "What kind of support do you provide?",
      answer:
        "All customers receive access to our comprehensive documentation and community forum. Paid plans include email support, while enterprise customers benefit from dedicated support with guaranteed response times and implementation assistance.",
    },
    {
      question: "How does The API handle security and data privacy?",
      answer:
        "Security is our top priority. We use industry-standard encryption for all data in transit and at rest. We're compliant with major privacy regulations including GDPR and CCPA, and we offer data residency options for enterprise customers.",
    },
    {
      question: "Can I integrate The API with my existing tools?",
      answer:
        "Absolutely! The API is designed to be easily integrated with most development frameworks and platforms. We provide SDKs for popular languages and frameworks, and our REST API can be used with any system capable of making HTTP requests.",
    },
  ]

  const toggleItem = (index: number) => {
    setOpenItem(openItem === index ? null : index)
  }

  return (
    <div className="relative overflow-hidden rounded-xl p-6 px-0 md:px-6 lg:p-8">
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-md bg-blue-500/10 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-md bg-purple-500/10 blur-3xl" />

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

      <div className="mt-10 flex justify-center">
        <a
          href="/contact"
          className="inline-flex items-center rounded-md bg-blue-600/20 px-6 py-3 text-sm font-semibold text-blue-400 transition-colors hover:bg-blue-600/30"
        >
          <Server className="mr-2 h-4 w-4" />
          Have more questions? Contact us
        </a>
      </div>
    </div>
  )
}

export default function ApiOverviewClient() {
  return (
    <div className="bg-background">
      {/* Hero Section with Video - Height adjusted */}
      <div className="relative h-[85vh] max-h-[1000px] min-h-[650px] w-full">
        {/* Video Background with gradient fade at bottom */}
        <div className="absolute inset-0 z-0 overflow-hidden rounded-b-lg">
          {/* Video element */}
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

          {/* Overlay with stronger gradient fade to background at bottom */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-background" />

          {/* Subtle grain texture */}
          <div className="noise absolute inset-0 opacity-20" />
        </div>

        {/* Hero Content - Centered */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center sm:px-6 md:px-8">
          <div className="mx-auto -mt-8 max-w-3xl sm:mt-0">
            <RotatingTitle />
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/90 sm:mt-8 sm:text-xl">
              Access the best AI capabilities through a single, intuitive API.
            </p>
          </div>
        </div>

        {/* Scroll indicator at bottom - repositioned */}
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

      {/* Main Content - Added top padding */}
      <div className="mx-auto max-w-[94%] px-4 pt-16 sm:px-6 md:max-w-[90%] lg:px-8">
        <div className="space-y-20 py-16 md:space-y-24">
          {/* Vision Section */}
          <div className="relative overflow-hidden rounded-xl md:p-6 lg:p-8">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-md bg-blue-500/10 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-md bg-purple-500/10 blur-3xl" />

            <h2 className="relative mb-8 mt-8 text-center text-3xl font-medium text-white md:mt-0 md:text-4xl">
              One API to replace hundreds
            </h2>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div className="order-2 flex flex-col space-y-6 lg:order-1">
                <div className="rounded-lg bg-neutral-800/30 p-5">
                  <div className="mb-3 flex items-center">
                    <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-md bg-blue-600/20">
                      <Link className="h-5 w-5 text-blue-400" />
                    </div>
                    <h3 className="text-lg font-medium text-white">
                      Unified Access
                    </h3>
                  </div>
                  <p className="text-neutral-300">
                    The world of AI is fragmented across countless specialized
                    services. We&apos;re changing that by providing unified
                    access to the best AI capabilities through a single,
                    intuitive API.
                  </p>
                </div>

                <div className="rounded-lg bg-neutral-800/30 p-5">
                  <div className="mb-3 flex items-center">
                    <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-md bg-purple-600/20">
                      <Server className="h-5 w-5 text-purple-400" />
                    </div>
                    <h3 className="text-lg font-medium text-white">
                      Comprehensive Ecosystem
                    </h3>
                  </div>
                  <p className="text-neutral-300">
                    Whether you&apos;re generating visual content, writing
                    compelling stories, building software, or conducting
                    research, The API connects you to a comprehensive ecosystem
                    without managing multiple integrations.
                  </p>
                </div>

                <div className="rounded-lg bg-neutral-800/30 p-5">
                  <div className="mb-3 flex items-center">
                    <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-md bg-green-600/20">
                      <ShieldCheck className="h-5 w-5 text-green-400" />
                    </div>
                    <h3 className="text-lg font-medium text-white">
                      Enterprise-Ready
                    </h3>
                  </div>
                  <p className="text-neutral-300">
                    Our approach is designed to be accessible for individual
                    creators, while providing the robustness, scalability, and
                    security that businesses demand. Pay only for what you use.
                  </p>
                </div>

                <div className="rounded-lg bg-neutral-800/30 p-5">
                  <div className="mb-3 flex items-center">
                    <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-md bg-orange-600/20">
                      <Clock className="h-5 w-5 text-orange-400" />
                    </div>
                    <h3 className="text-lg font-medium text-white">
                      Future-Proof
                    </h3>
                  </div>
                  <p className="text-neutral-300">
                    As AI technologies evolve, we continuously integrate new
                    capabilities, ensuring you always have access to
                    cutting-edge tools without changing your implementation.
                  </p>
                </div>
              </div>

              <div className="relative order-1 flex items-center justify-center lg:order-2">
                <div className="absolute -left-20 bottom-10 h-64 w-64 rounded-md bg-blue-500/5 blur-3xl" />
                <div className="overflow-hidden rounded-xl shadow-2xl shadow-blue-900/20">
                  <img
                    src="/images/cadogy-ai-vision-future.webp"
                    alt="Our vision for AI"
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0" />
                </div>
              </div>
            </div>
          </div>

          {/* Feature Cards */}
          <div>
            <h3 className="mb-8 text-sm font-medium uppercase tracking-wider text-neutral-400">
              Our Features
            </h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className={`group relative overflow-hidden rounded-lg p-6 transition-all duration-300 ${gradients.features[index]}`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-background/5 to-background/20" />
                  <div className="relative z-10 flex h-full flex-col">
                    <feature.icon
                      className="h-8 w-8 text-white/90"
                      strokeWidth={1.5}
                    />
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

          {/* How It Works Section */}
          <div>
            <h2 className="mb-8 text-2xl font-medium text-neutral-100 md:text-3xl">
              How It Works
            </h2>
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
              <div className="space-y-6">
                <h3 className="text-xl font-medium text-white">
                  Simple Integration, Powerful Results
                </h3>
                <p className="text-neutral-400">
                  Getting started with The API is straightforward. After signing
                  up, you&apos;ll receive an API key that grants access to all
                  endpoints. Our comprehensive documentation guides you through
                  the integration process.
                </p>
                <p className="text-neutral-400">
                  Make API calls using standard HTTP requests and receive
                  responses in consistent JSON format. Whether you&apos;re
                  generating images, analyzing data, or creating content, the
                  integration pattern remains the same.
                </p>
                <div className="pt-4">
                  <a
                    href="/docs"
                    className="inline-flex items-center rounded-md bg-blue-600/20 px-4 py-2 text-sm font-semibold text-blue-400 transition-colors hover:bg-blue-600/30"
                  >
                    <Code className="mr-2 h-4 w-4" />
                    View Documentation
                  </a>
                </div>
              </div>

              <ApiCodeExample />
            </div>
          </div>

          {/* Comparison Section */}
          <div>
            <h2 className="mb-8 text-2xl font-medium text-neutral-100 md:text-3xl">
              The Cadogy Difference
            </h2>
            <ComparisonSection />
          </div>

          {/* FAQ Section */}
          <FAQ />

          {/* Join Section */}
          <div className="mb-20 rounded-lg bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/10 via-purple-500/10 to-pink-500/10 px-8 py-16 text-center sm:px-12 md:px-16 lg:mb-32 lg:px-24">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-2xl font-medium text-white sm:text-3xl">
                Reimagine what&apos;s possible with AI
              </h2>
              <div className="mt-8 flex flex-col md:flex-row items-center gap-4 sm:justify-center">
                <a
                  href="/login"
                  className="inline-block rounded-md bg-white px-8 py-3.5 w-full text-sm font-semibold text-background transition-colors hover:bg-neutral-200"
                >
                  Get Started
                </a>
                <a
                  href="/"
                  className="inline-block rounded-md border border-white/30 bg-transparent px-8 py-3.5 w-full text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  View Pricing
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
