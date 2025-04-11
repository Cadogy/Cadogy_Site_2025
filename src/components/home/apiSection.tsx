import { motion } from "framer-motion"
import Link from "next/link"
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
        <h2 className="mb-4 font-medium tracking-tight text-foreground text-5xl">
          Our API Platform
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
          Access cutting-edge AI capabilities through our unified API, enabling your applications with powerful tools for media generation, content creation, code generation, and research.
        </p>
      </div>
    </motion.div>

    {/* Redesigned API Features with Interactive Layout */}
    <div className="mt-16 relative">
      {/* API Capabilities Interactive Layout */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-12 relative">
        {/* API Hub Card - Spans full width on mobile, center column on desktop */}
        <motion.div 
          className="col-span-full md:col-span-4 md:col-start-5 md:row-span-2 overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5 backdrop-blur-sm border border-primary/20 shadow-lg shadow-primary/5 rounded-xl z-10 order-1 md:order-2 md:translate-y-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="p-6 md:p-8">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center rounded-md bg-primary/10 p-3 mb-4">
                <Cloud className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-medium text-foreground">Unified API Access</h3>
              <p className="mt-2 text-sm text-muted-foreground">One endpoint, multiple AI capabilities</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center p-2.5 rounded-md bg-background/80">
                <div className="w-2 h-2 rounded-md bg-green-400 mr-2.5"></div>
                <span className="text-sm text-foreground">Simple integration</span>
              </div>
              <div className="flex items-center p-2.5 rounded-md bg-background/80">
                <div className="w-2 h-2 rounded-md bg-blue-400 mr-2.5"></div>
                <span className="text-sm text-foreground">Predictable pricing</span>
              </div>
              <div className="flex items-center p-2.5 rounded-md bg-background/80">
                <div className="w-2 h-2 rounded-md bg-amber-400 mr-2.5"></div>
                <span className="text-sm text-foreground">Detailed documentation</span>
              </div>
              <div className="flex items-center p-2.5 rounded-md bg-background/80">
                <div className="w-2 h-2 rounded-md bg-purple-400 mr-2.5"></div>
                <span className="text-sm text-foreground">Reliable uptime</span>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-border text-center">
              <div className="text-sm text-muted-foreground mb-2">Ready to get started?</div>
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
        <div className="space-y-8 col-span-full md:col-span-4 order-2 md:order-1">
          {/* Media Generation - Top Left */}
          <motion.div 
            className="overflow-hidden bg-card border border-border rounded-xl relative"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="md:flex md:items-center">
              <div className="w-full md:w-2/5 h-36 md:h-auto overflow-hidden">
                <div className="h-full w-full p-4 flex items-center justify-center">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                    <Image className="h-10 w-10 text-white" />
                  </div>
                </div>
              </div>
              <div className="p-5 md:p-6 w-full md:w-3/5">
                <h3 className="text-lg font-medium text-foreground">Media Generation</h3>
                <p className="mt-2 text-sm text-muted-foreground">Create stunning visuals, videos, and audio content with AI.</p>
                <div className="mt-4">
                  <Link href="/the-api/features" className="text-sm font-medium text-primary hover:underline inline-flex items-center">
                    Learn more
                    <ArrowRight className="ml-1 inline-block h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Connecting line (desktop only) */}
            <div className="hidden md:block absolute top-1/2 -right-4 w-4 h-px bg-border/50"></div>
          </motion.div>
          
          {/* Content Creation - Bottom Left */}
          <motion.div 
            className="overflow-hidden bg-card border border-border rounded-xl relative"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="md:flex md:items-center">
              <div className="w-full md:w-2/5 h-36 md:h-auto overflow-hidden">
                <div className="h-full w-full p-4 flex items-center justify-center">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                    <FileText className="h-10 w-10 text-white" />
                  </div>
                </div>
              </div>
              <div className="p-5 md:p-6 w-full md:w-3/5">
                <h3 className="text-lg font-medium text-foreground">Content Creation</h3>
                <p className="mt-2 text-sm text-muted-foreground">Generate engaging content for blogs, marketing, and more.</p>
                <div className="mt-4">
                  <Link href="/the-api/features" className="text-sm font-medium text-primary hover:underline inline-flex items-center">
                    Learn more
                    <ArrowRight className="ml-1 inline-block h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Connecting line (desktop only) */}
            <div className="hidden md:block absolute top-1/2 -right-4 w-4 h-px bg-border/50"></div>
          </motion.div>
        </div>
        
        {/* Right Column Features */}
        <div className="space-y-8 col-span-full md:col-span-4 md:col-start-9 order-3">
          {/* Code Generation - Top Right */}
          <motion.div 
            className="overflow-hidden bg-card border border-border rounded-xl relative"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="md:flex md:items-center md:flex-row-reverse">
              <div className="w-full md:w-2/5 h-36 md:h-auto overflow-hidden">
                <div className="h-full w-full p-4 flex items-center justify-center">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                    <Code className="h-10 w-10 text-white" />
                  </div>
                </div>
              </div>
              <div className="p-5 md:p-6 w-full md:w-3/5">
                <h3 className="text-lg font-medium text-foreground">Code Generation</h3>
                <p className="mt-2 text-sm text-muted-foreground">Transform natural language into working code.</p>
                <div className="mt-4">
                  <Link href="/the-api/features" className="text-sm font-medium text-primary hover:underline inline-flex items-center">
                    Learn more
                    <ArrowRight className="ml-1 inline-block h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Connecting line (desktop only) */}
            <div className="hidden md:block absolute top-1/2 -left-4 w-4 h-px bg-border/50"></div>
          </motion.div>
          
          {/* Research Tools - Bottom Right */}
          <motion.div 
            className="overflow-hidden bg-card border border-border rounded-xl relative"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="md:flex md:items-center md:flex-row-reverse">
              <div className="w-full md:w-2/5 h-36 md:h-auto overflow-hidden">
                <div className="h-full w-full p-4 flex items-center justify-center">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                    <TestTube2 className="h-10 w-10 text-white" />
                  </div>
                </div>
              </div>
              <div className="p-5 md:p-6 w-full md:w-3/5">
                <h3 className="text-lg font-medium text-foreground">Research Tools</h3>
                <p className="mt-2 text-sm text-muted-foreground">Extract insights from data and conduct research.</p>
                <div className="mt-4">
                  <Link href="/the-api/features" className="text-sm font-medium text-primary hover:underline inline-flex items-center">
                    Learn more
                    <ArrowRight className="ml-1 inline-block h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Connecting line (desktop only) */}
            <div className="hidden md:block absolute top-1/2 -left-4 w-4 h-px bg-border/50"></div>
          </motion.div>
        </div>
      </div>
    </div>
  </div>
</>
  )
}

export default apiSection