import {
  ArrowRight,
  BarChart3,
  Code,
  FileText,
  Gauge,
  Image,
  Lock,
  Server,
  Shield,
  TestTube2,
  Zap,
} from "lucide-react"

const Content = () => {
  return (
    <div className="my-24 lg:my-48">
      <div className="flex flex-col items-center py-24 text-center">
        <h2 className="mb-4 text-5xl font-medium tracking-tight text-foreground">
          Fast Sites That Google Loves
        </h2>
        <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-muted-foreground sm:text-xl lg:text-lg">
          We build speedy, secure websites that rank well in search results by
          using battle-tested infrastructure and smart optimization tricks
        </p>
      </div>

      {/* Responsive cards layout - scrollable on mobile, 2x on md, 3x on lg */}
      <div className="relative mt-16">
        {/* Mobile scroll indicator shadows */}
        <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-8 bg-gradient-to-r from-background to-transparent md:hidden"></div>
        <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-8 bg-gradient-to-l from-background to-transparent md:hidden"></div>

        {/* Scrollable container on mobile, grid on larger screens */}
        <div className="hide-scrollbar flex snap-x gap-6 overflow-x-auto pb-4 md:grid md:grid-cols-2 md:pb-0 lg:grid-cols-3">
          {/* Performance Optimization */}
          <div className="w-[85%] min-w-[260px] max-w-sm flex-shrink-0 snap-center overflow-hidden rounded-xl border border-border bg-card md:w-auto md:max-w-none">
            <div className="flex h-36 items-center justify-center overflow-hidden bg-gradient-to-r from-purple-500 via-violet-500 to-indigo-500">
              <div className="relative flex h-16 w-16 items-center justify-center rounded-md bg-white/20 md:h-20 md:w-20 lg:h-24 lg:w-24">
                <Gauge
                  className="h-8 w-8 text-white md:h-10 md:w-10 lg:h-12 lg:w-12"
                  strokeWidth={1.5}
                />
              </div>
            </div>
            <div className="p-4 md:p-6">
              <h3 className="mb-2 text-lg font-medium text-foreground md:mb-3 md:text-xl">
                Lightning-Fast Performance
              </h3>
              <p className="mb-3 text-sm text-muted-foreground md:mb-4 md:text-base">
                We obsess over every millisecond of load time with code
                optimization, efficient asset delivery, and cutting-edge
                techniques to create sites that feel instant.
              </p>
              <div className="grid grid-cols-2 gap-2 md:gap-4">
                <div className="flex items-center">
                  <div className="mr-2 mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md bg-purple-100 dark:bg-purple-900/30 md:mr-3 md:h-6 md:w-6">
                    <Zap className="h-2.5 w-2.5 text-purple-500 md:h-3 md:w-3" />
                  </div>
                  <span className="text-xs text-muted-foreground md:text-sm">
                    Core Web Vitals
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="mr-2 mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md bg-purple-100 dark:bg-purple-900/30 md:mr-3 md:h-6 md:w-6">
                    <Image className="h-2.5 w-2.5 text-purple-500 md:h-3 md:w-3" />
                  </div>
                  <span className="text-xs text-muted-foreground md:text-sm">
                    Asset optimization
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="mr-2 mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md bg-purple-100 dark:bg-purple-900/30 md:mr-3 md:h-6 md:w-6">
                    <TestTube2 className="h-2.5 w-2.5 text-purple-500 md:h-3 md:w-3" />
                  </div>
                  <span className="text-xs text-muted-foreground md:text-sm">
                    Lazy loading
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="mr-2 mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md bg-purple-100 dark:bg-purple-900/30 md:mr-3 md:h-6 md:w-6">
                    <Server className="h-2.5 w-2.5 text-purple-500 md:h-3 md:w-3" />
                  </div>
                  <span className="text-xs text-muted-foreground md:text-sm">
                    Server optimization
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Cloudflare Integration */}
          <div className="w-[85%] min-w-[260px] max-w-sm flex-shrink-0 snap-center overflow-hidden rounded-xl border border-border bg-card md:w-auto md:max-w-none">
            <div className="flex h-36 items-center justify-center overflow-hidden bg-gradient-to-r from-[#F6821F] via-[#F9A838] to-[#FEDB01]">
              <img
                src="/images/assets/stack-logos/cloudflare-icon.svg"
                alt="Cloudflare"
                className="h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24"
              />
            </div>
            <div className="p-4 md:p-6">
              <h3 className="mb-2 text-lg font-medium text-foreground md:mb-3 md:text-xl">
                Rock-Solid Infrastructure
              </h3>
              <p className="mb-3 text-sm text-muted-foreground md:mb-4 md:text-base">
                We bake Cloudflare&apos;s security and speed features into
                everything we build, so your site stays up and running even when
                the bad guys try to knock it down.
              </p>
              <div className="grid grid-cols-2 gap-2 md:gap-4">
                <div className="flex items-center">
                  <div className="mr-2 mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md bg-orange-100 dark:bg-orange-900/30 md:mr-3 md:h-6 md:w-6">
                    <Shield className="h-2.5 w-2.5 text-orange-500 md:h-3 md:w-3" />
                  </div>
                  <span className="text-xs text-muted-foreground md:text-sm">
                    DDoS protection
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="mr-2 mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md bg-orange-100 dark:bg-orange-900/30 md:mr-3 md:h-6 md:w-6">
                    <Zap className="h-2.5 w-2.5 text-orange-500 md:h-3 md:w-3" />
                  </div>
                  <span className="text-xs text-muted-foreground md:text-sm">
                    Global CDN
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="mr-2 mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md bg-orange-100 dark:bg-orange-900/30 md:mr-3 md:h-6 md:w-6">
                    <Lock className="h-2.5 w-2.5 text-orange-500 md:h-3 md:w-3" />
                  </div>
                  <span className="text-xs text-muted-foreground md:text-sm">
                    SSL encryption
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="mr-2 mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md bg-orange-100 dark:bg-orange-900/30 md:mr-3 md:h-6 md:w-6">
                    <Gauge className="h-2.5 w-2.5 text-orange-500 md:h-3 md:w-3" />
                  </div>
                  <span className="text-xs text-muted-foreground md:text-sm">
                    Edge optimized
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* SEO Optimization */}
          <div className="w-[85%] min-w-[260px] max-w-sm flex-shrink-0 snap-center overflow-hidden rounded-xl border border-border bg-card md:w-auto md:max-w-none">
            <div className="flex h-36 items-center justify-center overflow-hidden bg-gradient-to-r from-blue-500 via-blue-400 to-cyan-400">
              <div className="relative flex h-16 w-16 items-center justify-center rounded-md bg-white/20 md:h-20 md:w-20 lg:h-24 lg:w-24">
                <BarChart3
                  className="h-8 w-8 text-white md:h-10 md:w-10 lg:h-12 lg:w-12"
                  strokeWidth={1.5}
                />
              </div>
            </div>
            <div className="p-4 md:p-6">
              <h3 className="mb-2 text-lg font-medium text-foreground md:mb-3 md:text-xl">
                SEO That Actually Works
              </h3>
              <p className="mb-3 text-sm text-muted-foreground md:mb-4 md:text-base">
                Our no-nonsense SEO approach mixes technical know-how with smart
                content tricks to help your site climb the Google rankings and
                bring in visitors who actually care.
              </p>
              <div className="grid grid-cols-2 gap-2 md:gap-4">
                <div className="flex items-center">
                  <div className="mr-2 mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md bg-blue-100 dark:bg-blue-900/30 md:mr-3 md:h-6 md:w-6">
                    <Code className="h-2.5 w-2.5 text-blue-500 md:h-3 md:w-3" />
                  </div>
                  <span className="text-xs text-muted-foreground md:text-sm">
                    Technical SEO
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="mr-2 mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md bg-blue-100 dark:bg-blue-900/30 md:mr-3 md:h-6 md:w-6">
                    <FileText className="h-2.5 w-2.5 text-blue-500 md:h-3 md:w-3" />
                  </div>
                  <span className="text-xs text-muted-foreground md:text-sm">
                    Content strategy
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="mr-2 mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md bg-blue-100 dark:bg-blue-900/30 md:mr-3 md:h-6 md:w-6">
                    <ArrowRight className="h-2.5 w-2.5 text-blue-500 md:h-3 md:w-3" />
                  </div>
                  <span className="text-xs text-muted-foreground md:text-sm">
                    Conversion optimization
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="mr-2 mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md bg-blue-100 dark:bg-blue-900/30 md:mr-3 md:h-6 md:w-6">
                    <BarChart3 className="h-2.5 w-2.5 text-blue-500 md:h-3 md:w-3" />
                  </div>
                  <span className="text-xs text-muted-foreground md:text-sm">
                    Analytics & reporting
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add a custom style to hide scrollbar but maintain functionality */}
      <style jsx global>{`
        .hide-scrollbar {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Opera */
        }
      `}</style>
    </div>
  )
}

export default Content
