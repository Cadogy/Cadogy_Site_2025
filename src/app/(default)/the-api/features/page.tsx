import { Metadata } from "next"
import { Code2, FileText, Image as ImageIcon, TestTube2 } from "lucide-react"

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
}

const features = [
  {
    title: "Media Generation",
    description: "Create stunning visuals, videos, and audio content with AI",
    icon: ImageIcon,
    date: "Mar 2024",
  },
  {
    title: "Content Creation",
    description:
      "Write compelling stories and scripts with natural language AI",
    icon: FileText,
    date: "Mar 2024",
  },
  {
    title: "Code Generation",
    description: "Generate and optimize code with AI assistance",
    icon: Code2,
    date: "Mar 2024",
  },
  {
    title: "Research Tools",
    description: "Analyze data and conduct research with AI",
    icon: TestTube2,
    date: "Mar 2024",
  },
]

export default function FeaturesPage() {
  return (
    <div className="bg-background">
      {/* Full-width Hero Section with Video */}
      <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden">
        {/* Video Background with fade-out gradient */}
        <div className="absolute inset-0 z-0">
          {/* Video element - moved up in the DOM order */}
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

          {/* Overlays on top of video */}
          {/* Lighter grainy texture overlay */}
          <div className="absolute inset-0 z-10 bg-background/20 mix-blend-multiply" />
          <div className="noise absolute inset-0 z-10 opacity-20" />

          {/* Improved multi-layer fade-out gradient - reduced opacity */}
          <div className="absolute inset-x-0 bottom-0 z-10">
            {/* Very soft gradient starting higher up - reduced opacity */}
            <div className="absolute inset-x-0 bottom-0 h-[70vh] bg-gradient-to-t from-background via-background/70 to-transparent" />
            {/* Medium gradient for middle transition - reduced opacity */}
            <div className="absolute inset-x-0 bottom-0 h-[45vh] bg-gradient-to-t from-background via-background/85 to-transparent" />
            {/* Final solid black for perfect blend - maintained opacity */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-background/90" />
          </div>
        </div>

        {/* Content - positioned higher on mobile, slightly adjusting for larger screens */}
        <div className="absolute left-1/2 top-[40%] z-20 w-full -translate-x-1/2 -translate-y-1/2 transform px-4 text-center sm:top-[42%] md:top-[45%] lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h1 className="bg-gradient-to-b from-white to-white/70 bg-clip-text text-5xl font-medium tracking-tight text-transparent sm:text-6xl lg:text-7xl">
              The API
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/80 sm:mt-8 sm:text-xl">
              The API by Cadogy makes creating, researching, and exploring the
              everchanging world of AI quicker and easier.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content - No background color so it blends with the hero */}
      <div className="relative mx-auto max-w-7xl px-4 pb-32 sm:px-6 lg:px-8">
        {/* Negative margin with no padding to ensure seamless blend */}
        <div className="relative -mt-64 space-y-24">
          {/* Spacer before Vision Section */}
          <div className="h-24"></div>

          {/* Vision Section - Sticky with Animated Gradients */}
          <div className="relative">
            <div className="sticky top-24 grid grid-cols-1 gap-12 lg:grid-cols-2">
              <div className="relative z-10">
                <h2 className="text-2xl font-medium text-slate-100">
                  Our vision for the future of AI
                </h2>
                <p className="mt-4 text-slate-400">
                  Whether you&apos;re generating media content, writing stories
                  and scripts, generating application code or researching the
                  human genome, The API by Cadogy connects you to everything and
                  everyone.
                </p>
                <p className="mt-4 text-slate-400">
                  We believe that artificial intelligence should be accessible,
                  ethical, and empowering. Our approach focuses on creating
                  tools that augment human capabilities rather than replace
                  them, fostering collaboration between human creativity and
                  machine efficiency.
                </p>
                <p className="mt-4 text-slate-400">
                  As AI continues to evolve, we&apos;re committed to maintaining
                  the highest standards of data privacy and security while
                  pushing the boundaries of what&apos;s possible. We envision a
                  future where AI helps solve humanity&apos;s most pressing
                  challenges, from climate change to healthcare advancements.
                </p>
                <p className="mt-4 text-slate-400">
                  The API is designed to adapt and grow alongside emerging
                  technologies, ensuring that our users always have access to
                  cutting-edge capabilities without unnecessary complexity. By
                  unifying various AI functionalities into a coherent ecosystem,
                  we&apos;re creating a foundation for innovation that will
                  scale with your needs.
                </p>
              </div>
              <div className="relative hidden aspect-square overflow-hidden rounded-lg transition-all duration-500 hover:scale-[1.02] md:block">
                {/* Image instead of gradient */}
                <img
                  src="/images/cadogy-ai-vision-future.webp"
                  alt="Our vision for AI"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-background/20 to-background/40" />
              </div>
            </div>
          </div>

          {/* Rest of the sections with space-y-24 handling the spacing */}
          <div className="space-y-24">
            {/* Feature Cards */}
            <div>
              <h3 className="mb-8 text-sm font-medium uppercase tracking-wider text-slate-400">
                Our Features
              </h3>
              <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
                {features.map((feature, index) => (
                  <div
                    key={feature.title}
                    className={`group relative aspect-square overflow-hidden rounded-lg ${gradients.features[index]} p-6 transition-all duration-300 hover:scale-[1.02]`}
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

            {/* Research Section - Moved below Features */}
            <div>
              <p className="mx-auto max-w-3xl text-center text-lg text-slate-400">
                Clients and Cadogy Access members have access to accessing our
                innovative API, with more information coming soon.
              </p>
            </div>

            {/* Join Section */}
            <div className="mb-32 rounded-xl bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/10 via-purple-500/10 to-pink-500/10 px-8 py-16 text-center sm:px-12 md:px-16 lg:px-24">
              <div className="mx-auto max-w-3xl">
                <h2 className="text-2xl font-medium text-white sm:text-3xl">
                  Join us in shaping the future of technology
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-slate-400">
                  Get access to our innovative API and start building the next
                  generation of AI-powered applications.
                </p>
                <div className="mt-8">
                  <a
                    href="/login"
                    className="inline-block rounded-md bg-white px-8 py-3.5 text-sm font-semibold text-background transition-colors hover:bg-slate-200"
                  >
                    Get Started
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
