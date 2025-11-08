import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowRight,
  BarChart3,
  Brain,
  Check,
  Cloud,
  Code,
  FileText,
  Gauge,
  Image,
  Lock,
  Server,
  Shield,
  TestTube2,
  Users,
  Zap,
} from "lucide-react"

const apiSection = () => {
  return (
    <>
      <div className="mt-3 md:mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col items-center py-6 text-center">
            <h2 className="mb-4 text-5xl font-medium tracking-tight text-foreground">
              Our API Platform
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Access cutting-edge AI capabilities through our unified API,
              enabling your applications with powerful tools for media
              generation, content creation, code generation, and research.
            </p>
          </div>
        </motion.div>

        {/* Redesigned API Features with Interactive Layout */}
        <div className="relative mt-16">
          {/* API Capabilities Interactive Layout */}
          <div className="relative grid grid-cols-1 gap-8 md:grid-cols-12">
            {/* API Hub Card - Spans full width on mobile, center column on desktop */}
            <motion.div
              className="z-10 order-1 col-span-full overflow-hidden rounded-xl border border-primary/20 bg-gradient-to-br from-primary/10 to-primary/5 shadow-lg shadow-primary/5 backdrop-blur-sm md:order-2 md:col-span-4 md:col-start-5 md:row-span-2 md:translate-y-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
            >
              <div className="p-6 md:p-8">
                <div className="mb-6 text-center">
                  <div className="mb-4 inline-flex items-center justify-center rounded-md bg-primary/10 p-3">
                    <Cloud className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-medium text-foreground">
                    Unified API Access
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    One endpoint, multiple AI capabilities
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="flex items-center rounded-md bg-background/80 p-2.5">
                    <div className="mr-2.5 h-2 w-2 rounded-md bg-green-400"></div>
                    <span className="text-sm text-foreground">
                      Simple integration
                    </span>
                  </div>
                  <div className="flex items-center rounded-md bg-background/80 p-2.5">
                    <div className="mr-2.5 h-2 w-2 rounded-md bg-blue-400"></div>
                    <span className="text-sm text-foreground">
                      Predictable pricing
                    </span>
                  </div>
                  <div className="flex items-center rounded-md bg-background/80 p-2.5">
                    <div className="mr-2.5 h-2 w-2 rounded-md bg-amber-400"></div>
                    <span className="text-sm text-foreground">
                      Detailed documentation
                    </span>
                  </div>
                  <div className="flex items-center rounded-md bg-background/80 p-2.5">
                    <div className="mr-2.5 h-2 w-2 rounded-md bg-purple-400"></div>
                    <span className="text-sm text-foreground">
                      Reliable uptime
                    </span>
                  </div>
                </div>

                <div className="mt-6 border-t border-border pt-4 text-center">
                  <div className="mb-2 text-sm text-muted-foreground">
                    Ready to get started?
                  </div>
                  <Link
                    href="/the-api"
                    className="inline-flex items-center space-x-1 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90"
                  >
                    <span>Read the overview</span>
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Left Column Features */}
            <div className="order-2 col-span-full space-y-8 md:order-1 md:col-span-4">
              {/* Media Generation - Top Left */}
              <motion.div
                className="relative overflow-hidden rounded-xl border border-border bg-card"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="md:flex md:items-center">
                  <div className="h-36 w-full overflow-hidden md:h-auto md:w-2/5">
                    <div className="flex h-full w-full items-center justify-center p-4">
                      <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-white/20">
                        <Image className="h-10 w-10 text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="w-full p-5 md:w-3/5 md:p-6">
                    <h3 className="text-lg font-medium text-foreground">
                      Media Generation
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Create stunning visuals, videos, and audio content with
                      AI.
                    </p>
                    <div className="mt-4">
                      <Link
                        href="/the-api/features"
                        className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                      >
                        Learn more
                        <ArrowRight className="ml-1 inline-block h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Connecting line (desktop only) */}
                <div className="absolute -right-4 top-1/2 hidden h-px w-4 bg-border/50 md:block"></div>
              </motion.div>

              {/* Content Creation - Bottom Left */}
              <motion.div
                className="relative overflow-hidden rounded-xl border border-border bg-card"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="md:flex md:items-center">
                  <div className="h-36 w-full overflow-hidden md:h-auto md:w-2/5">
                    <div className="flex h-full w-full items-center justify-center p-4">
                      <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-white/20">
                        <FileText className="h-10 w-10 text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="w-full p-5 md:w-3/5 md:p-6">
                    <h3 className="text-lg font-medium text-foreground">
                      Content Creation
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Generate engaging content for blogs, marketing, and more.
                    </p>
                    <div className="mt-4">
                      <Link
                        href="/the-api/features"
                        className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                      >
                        Learn more
                        <ArrowRight className="ml-1 inline-block h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Connecting line (desktop only) */}
                <div className="absolute -right-4 top-1/2 hidden h-px w-4 bg-border/50 md:block"></div>
              </motion.div>
            </div>

            {/* Right Column Features */}
            <div className="order-3 col-span-full space-y-8 md:col-span-4 md:col-start-9">
              {/* Code Generation - Top Right */}
              <motion.div
                className="relative overflow-hidden rounded-xl border border-border bg-card"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="md:flex md:flex-row-reverse md:items-center">
                  <div className="h-36 w-full overflow-hidden md:h-auto md:w-2/5">
                    <div className="flex h-full w-full items-center justify-center p-4">
                      <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-white/20">
                        <Code className="h-10 w-10 text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="w-full p-5 md:w-3/5 md:p-6">
                    <h3 className="text-lg font-medium text-foreground">
                      Code Generation
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Transform natural language into working code.
                    </p>
                    <div className="mt-4">
                      <Link
                        href="/the-api/features"
                        className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                      >
                        Learn more
                        <ArrowRight className="ml-1 inline-block h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Connecting line (desktop only) */}
                <div className="absolute -left-4 top-1/2 hidden h-px w-4 bg-border/50 md:block"></div>
              </motion.div>

              {/* Research Tools - Bottom Right */}
              <motion.div
                className="relative overflow-hidden rounded-xl border border-border bg-card"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="md:flex md:flex-row-reverse md:items-center">
                  <div className="h-36 w-full overflow-hidden md:h-auto md:w-2/5">
                    <div className="flex h-full w-full items-center justify-center p-4">
                      <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-white/20">
                        <TestTube2 className="h-10 w-10 text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="w-full p-5 md:w-3/5 md:p-6">
                    <h3 className="text-lg font-medium text-foreground">
                      Research Tools
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Extract insights from data and conduct research.
                    </p>
                    <div className="mt-4">
                      <Link
                        href="/the-api/features"
                        className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                      >
                        Learn more
                        <ArrowRight className="ml-1 inline-block h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Connecting line (desktop only) */}
                <div className="absolute -left-4 top-1/2 hidden h-px w-4 bg-border/50 md:block"></div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default apiSection
