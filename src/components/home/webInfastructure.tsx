import { motion } from "framer-motion"
import Link from "next/link"
import { useState } from "react"
import {
    ArrowRight,
    BarChart3,
    Brain,
    Cloud,
    Code,
    Check,
    FileText,
    Gauge,
    Image,
    Lock,
    Shield,
    TestTube2,
    Users,
    Zap,
    Server,
  } from "lucide-react"

const WebInfastructure = () => {
  // Add state for active tab
  const [activeTab, setActiveTab] = useState(0);
  
  // Benefit data to render dynamically
  const benefits = [
    {
      id: 0,
      title: "Speed Matters",
      icon: <Zap className="h-5 w-5 text-green-600 dark:text-green-400" />,
      bgColor: "bg-green-100 dark:bg-green-900/30",
      textColor: "text-green-600 dark:text-green-400",
      description: "Every millisecond counts. Faster sites engage visitors longer, rank higher in search results, and convert better than slow competitors."
    },
    {
      id: 1,
      title: "Found by the Right People",
      icon: <BarChart3 className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
      textColor: "text-blue-600 dark:text-blue-400",
      description: "Strategic SEO brings quality traffic to your site, targeting the exact people who are already searching for what you offer."
    },
    {
      id: 2,
      title: "Built to Last",
      icon: <Shield className="h-5 w-5 text-orange-600 dark:text-orange-400" />,
      bgColor: "bg-orange-100 dark:bg-orange-900/30",
      textColor: "text-orange-600 dark:text-orange-400",
      description: "Our infrastructure is secure and resilient, protecting your site from threats while handling traffic spikes with ease."
    }
  ];
  
  // Handle tab change
  const handleTabChange = (tabIndex: number): void => {
    setActiveTab(tabIndex);
  };

  return (
  <>

<div className="mt-32 mb-16">
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.6 }}
>
  <div className="flex flex-col items-center py-6 text-center">
    <h2 className="mb-4 font-medium tracking-tight text-foreground text-5xl">
      Fast Sites That Google Loves
    </h2>
    <p className="mx-auto mt-4 max-w-2xl lg:text-lg leading-relaxed text-muted-foreground sm:text-xl">
      We build speedy, secure websites that rank well in search results by using battle-tested infrastructure and smart optimization tricks
    </p>
  </div>
</motion.div>

{/* Responsive cards layout - scrollable on mobile, 2x on md, 3x on lg */}
<div className="mt-12 relative">
  {/* Mobile scroll indicator shadows */}
  <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none md:hidden"></div>
  <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none md:hidden"></div>
  
  {/* Scrollable container on mobile, grid on larger screens */}
  <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-x-auto pb-4 md:pb-0 hide-scrollbar snap-x">
    {/* Performance Optimization */}
    <motion.div 
      className="bg-card overflow-hidden border border-border rounded-xl flex-shrink-0 w-[85%] min-w-[260px] max-w-sm snap-center md:w-auto md:max-w-none"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="h-36 overflow-hidden bg-gradient-to-r from-purple-500 via-violet-500 to-indigo-500 flex items-center justify-center">
        <div className="relative h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 rounded-md bg-white/20 flex items-center justify-center">
          <Gauge className="h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 text-white" strokeWidth={1.5} />
        </div>
      </div>
      <div className="p-4 md:p-6">
        <h3 className="mb-2 md:mb-3 text-lg md:text-xl font-medium text-foreground">Lightning-Fast Performance</h3>
        <p className="mb-3 md:mb-4 text-sm md:text-base text-muted-foreground">
          We obsess over every millisecond of load time with code optimization, efficient asset delivery, and cutting-edge techniques to create sites that feel instant.
        </p>
        <div className="grid grid-cols-2 gap-2 md:gap-4">
          <div className="flex items-center">
            <div className="mr-2 md:mr-3 mt-1 h-5 md:h-6 w-5 md:w-6 flex-shrink-0 rounded-md bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <Zap className="h-2.5 md:h-3 w-2.5 md:w-3 text-purple-500" />
            </div>
            <span className="text-xs md:text-sm text-muted-foreground">Core Web Vitals</span>
          </div>
          <div className="flex items-center">
            <div className="mr-2 md:mr-3 mt-1 h-5 md:h-6 w-5 md:w-6 flex-shrink-0 rounded-md bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <Image className="h-2.5 md:h-3 w-2.5 md:w-3 text-purple-500" />
            </div>
            <span className="text-xs md:text-sm text-muted-foreground">Asset optimization</span>
          </div>
          <div className="flex items-center">
            <div className="mr-2 md:mr-3 mt-1 h-5 md:h-6 w-5 md:w-6 flex-shrink-0 rounded-md bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <TestTube2 className="h-2.5 md:h-3 w-2.5 md:w-3 text-purple-500" />
            </div>
            <span className="text-xs md:text-sm text-muted-foreground">Lazy loading</span>
          </div>
          <div className="flex items-center">
            <div className="mr-2 md:mr-3 mt-1 h-5 md:h-6 w-5 md:w-6 flex-shrink-0 rounded-md bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <Server className="h-2.5 md:h-3 w-2.5 md:w-3 text-purple-500" />
            </div>
            <span className="text-xs md:text-sm text-muted-foreground">Server optimization</span>
          </div>
        </div>
      </div>
    </motion.div>

    {/* Cloudflare Integration */}
    <motion.div 
      className="bg-card overflow-hidden border border-border rounded-xl flex-shrink-0 w-[85%] min-w-[260px] max-w-sm snap-center md:w-auto md:max-w-none"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      <div className="h-36 overflow-hidden bg-gradient-to-r from-[#F6821F] via-[#F9A838] to-[#FEDB01] flex items-center justify-center">
        <img 
          src="/images/assets/stack-logos/cloudflare-icon.svg" 
          alt="Cloudflare" 
          className="h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24"
        />
      </div>
      <div className="p-4 md:p-6">
        <h3 className="mb-2 md:mb-3 text-lg md:text-xl font-medium text-foreground">Rock-Solid Infrastructure</h3>
        <p className="mb-3 md:mb-4 text-sm md:text-base text-muted-foreground">
          We bake Cloudflare&apos;s security and speed features into everything we build, so your site stays up and running even when the bad guys try to knock it down.
        </p>
        <div className="grid grid-cols-2 gap-2 md:gap-4">
          <div className="flex items-center">
            <div className="mr-2 md:mr-3 mt-1 h-5 md:h-6 w-5 md:w-6 flex-shrink-0 rounded-md bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
              <Shield className="h-2.5 md:h-3 w-2.5 md:w-3 text-orange-500" />
            </div>
            <span className="text-xs md:text-sm text-muted-foreground">DDoS protection</span>
          </div>
          <div className="flex items-center">
            <div className="mr-2 md:mr-3 mt-1 h-5 md:h-6 w-5 md:w-6 flex-shrink-0 rounded-md bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
              <Zap className="h-2.5 md:h-3 w-2.5 md:w-3 text-orange-500" />
            </div>
            <span className="text-xs md:text-sm text-muted-foreground">Global CDN</span>
          </div>
          <div className="flex items-center">
            <div className="mr-2 md:mr-3 mt-1 h-5 md:h-6 w-5 md:w-6 flex-shrink-0 rounded-md bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
              <Lock className="h-2.5 md:h-3 w-2.5 md:w-3 text-orange-500" />
            </div>
            <span className="text-xs md:text-sm text-muted-foreground">SSL encryption</span>
          </div>
          <div className="flex items-center">
            <div className="mr-2 md:mr-3 mt-1 h-5 md:h-6 w-5 md:w-6 flex-shrink-0 rounded-md bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
              <Gauge className="h-2.5 md:h-3 w-2.5 md:w-3 text-orange-500" />
            </div>
            <span className="text-xs md:text-sm text-muted-foreground">Edge optimized</span>
          </div>
        </div>
      </div>
    </motion.div>

    {/* SEO Optimization */}
    <motion.div 
      className="bg-card overflow-hidden border border-border rounded-xl flex-shrink-0 w-[85%] min-w-[260px] max-w-sm snap-center md:w-auto md:max-w-none"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <div className="h-36 overflow-hidden bg-gradient-to-r from-blue-500 via-blue-400 to-cyan-400 flex items-center justify-center">
        <div className="relative h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 rounded-md bg-white/20 flex items-center justify-center">
          <BarChart3 className="h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 text-white" strokeWidth={1.5} />
        </div>
      </div>
      <div className="p-4 md:p-6">
        <h3 className="mb-2 md:mb-3 text-lg md:text-xl font-medium text-foreground">SEO That Actually Works</h3>
        <p className="mb-3 md:mb-4 text-sm md:text-base text-muted-foreground">
          Our no-nonsense SEO approach mixes technical know-how with smart content tricks to help your site climb the Google rankings and bring in visitors who actually care.
        </p>
        <div className="grid grid-cols-2 gap-2 md:gap-4">
          <div className="flex items-center">
            <div className="mr-2 md:mr-3 mt-1 h-5 md:h-6 w-5 md:w-6 flex-shrink-0 rounded-md bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <Code className="h-2.5 md:h-3 w-2.5 md:w-3 text-blue-500" />
            </div>
            <span className="text-xs md:text-sm text-muted-foreground">Technical SEO</span>
          </div>
          <div className="flex items-center">
            <div className="mr-2 md:mr-3 mt-1 h-5 md:h-6 w-5 md:w-6 flex-shrink-0 rounded-md bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <FileText className="h-2.5 md:h-3 w-2.5 md:w-3 text-blue-500" />
            </div>
            <span className="text-xs md:text-sm text-muted-foreground">Content strategy</span>
          </div>
          <div className="flex items-center">
            <div className="mr-2 md:mr-3 mt-1 h-5 md:h-6 w-5 md:w-6 flex-shrink-0 rounded-md bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <ArrowRight className="h-2.5 md:h-3 w-2.5 md:w-3 text-blue-500" />
            </div>
            <span className="text-xs md:text-sm text-muted-foreground">Conversion optimization</span>
          </div>
          <div className="flex items-center">
            <div className="mr-2 md:mr-3 mt-1 h-5 md:h-6 w-5 md:w-6 flex-shrink-0 rounded-md bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <BarChart3 className="h-2.5 md:h-3 w-2.5 md:w-3 text-blue-500" />
            </div>
            <span className="text-xs md:text-sm text-muted-foreground">Analytics & reporting</span>
          </div>
        </div>
      </div>
    </motion.div>
  </div>
</div>

{/* Add a custom style to hide scrollbar but maintain functionality */}
<style jsx global>{`
  .hide-scrollbar {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
  .hide-scrollbar::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`}</style>

</div>
</>
  )
}

export default WebInfastructure;