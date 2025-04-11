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

const webInfastructure = () => {
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

{/* Case Highlight */}
<motion.div 
  className="mt-12 rounded-xl bg-card border border-border overflow-hidden"
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-50px" }}
  transition={{ duration: 0.6, delay: 0.3 }}
>
  <div className="grid grid-cols-1 lg:grid-cols-2">
    {/* Process side */}
    <div className="p-4 sm:p-6 md:p-8">
      <div className="inline-flex items-center rounded-md bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-4">
        How We Do It
      </div>
      <h3 className="text-lg sm:text-xl font-medium text-foreground mb-3 sm:mb-4">Making Online Stores Shine</h3>
      
      <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
        <div className="flex">
          <div className="mr-3 h-6 w-6 flex-shrink-0 rounded-md bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mt-0.5">
            <span className="text-xs font-bold text-indigo-500">1</span>
          </div>
          <div>
            <h4 className="text-sm font-medium text-foreground">Finding the Speed Bumps</h4>
            <p className="text-xs text-muted-foreground mt-1">We hunt down what&apos;s slowing your site down - whether it&apos;s page load times, mobile issues, content organization, or technical stuff behind the scenes.</p>
          </div>
        </div>
        
        <div className="flex">
          <div className="mr-3 h-6 w-6 flex-shrink-0 rounded-md bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mt-0.5">
            <span className="text-xs font-bold text-indigo-500">2</span>
          </div>
          <div>
            <h4 className="text-sm font-medium text-foreground">Tuning the Engine</h4>
            <p className="text-xs text-muted-foreground mt-1">We set up speedy content delivery, shrink your images and code, use smart loading tricks, and make your databases run like greased lightning.</p>
          </div>
        </div>
        
        <div className="flex">
          <div className="mr-3 h-6 w-6 flex-shrink-0 rounded-md bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mt-0.5">
            <span className="text-xs font-bold text-indigo-500">3</span>
          </div>
          <div>
            <h4 className="text-sm font-medium text-foreground">Making Content Count</h4>
            <p className="text-xs text-muted-foreground mt-1">We reorganize your pages, add smart code that Google understands, create content that hits the right keywords, and connect everything together neatly.</p>
          </div>
        </div>

        <div className="flex">
          <div className="mr-3 h-6 w-6 flex-shrink-0 rounded-md bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mt-0.5">
            <span className="text-xs font-bold text-indigo-500">4</span>
          </div>
          <div>
            <h4 className="text-sm font-medium text-foreground">Getting Real Results</h4>
            <p className="text-xs text-muted-foreground mt-1">Our clients regularly land on Google&apos;s first page for words that matter, see way more visitors coming to their site, and turn more of those visitors into customers.</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="flex items-center">
          <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-primary mr-2" />
          <span className="text-xs sm:text-sm font-medium text-foreground">Serious Tech, Real Results</span>
        </div>
        {/* <div>
          <Link href="/" className="text-xs font-medium text-primary hover:underline flex items-center">
            See How We Can Help
            <ArrowRight className="ml-1 h-3 w-3" />
          </Link>
        </div> */}
      </div>
    </div>

    {/* Results side */}
    <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 p-4 sm:p-6 md:p-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-56 h-56 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-56 h-56 bg-purple-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
      
      <div className="relative z-10 space-y-4 sm:space-y-6">
        <div className="flex items-end justify-between mb-1 sm:mb-2">
          <h4 className="text-sm font-medium text-white/90">Real Customer Results</h4>
        </div>
        
        {/* Redesigned metrics - more visual and mobile-friendly */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {/* Page Speed Metric */}
          <div className="bg-white/5 rounded-md p-3 sm:p-4">
            <div className="flex justify-between items-start mb-2">
              <p className="text-xs text-white/70">Page Speed</p>
              <div className="bg-green-500/20 rounded-md px-2 py-0.5">
                <p className="text-xs font-bold text-green-400">81% faster</p>
              </div>
            </div>
            
            {/* Visual speed meter */}
            <div className="mb-3 relative h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 bg-white/30 w-full"></div>
              <div className="absolute left-0 top-0 bottom-0 bg-green-500 w-[19%]"></div>
            </div>
            
            <div className="flex justify-between text-xs text-white/70">
              <div>
                <p className="font-medium">Before</p>
                <p className="text-xl font-bold text-white mt-1">4.2s</p>
              </div>
              <div className="text-right">
                <p className="font-medium">After</p>
                <p className="text-xl font-bold text-green-400 mt-1">0.8s</p>
              </div>
            </div>
          </div>
          
          {/* Traffic Growth Metric */}
          <div className="bg-white/5 rounded-md p-3 sm:p-4">
            <div className="flex justify-between items-start mb-2">
              <p className="text-xs text-white/70">Monthly Visitors</p>
              <div className="bg-green-500/20 rounded-md px-2 py-0.5">
                <p className="text-xs font-bold text-green-400">214% growth</p>
              </div>
            </div>
            
            {/* Visual bar chart */}
            <div className="h-12 flex items-end space-x-1 mb-3">
              <div className="flex-grow h-4 bg-white/30 rounded-t"></div>
              <div className="flex-grow h-12 bg-green-500 rounded-t"></div>
            </div>
            
            <div className="flex justify-between text-xs text-white/70">
              <div>
                <p className="font-medium">Before</p>
                <p className="text-xl font-bold text-white mt-1">14K</p>
              </div>
              <div className="text-right">
                <p className="font-medium">After</p>
                <p className="text-xl font-bold text-green-400 mt-1">44K</p>
              </div>
            </div>
          </div>
          
          {/* Conversion Rate */}
          <div className="bg-white/5 rounded-md p-3 sm:p-4">
            <div className="flex justify-between items-start mb-2">
              <p className="text-xs text-white/70">Conversion Rate</p>
              <div className="bg-green-500/20 rounded-md px-2 py-0.5">
                <p className="text-xs font-bold text-green-400">132% increase</p>
              </div>
            </div>
            
            {/* Circle progress indicator */}
            <div className="flex justify-center mb-3">
              <div className="relative w-16 h-16">
                <svg viewBox="0 0 36 36" className="w-full h-full">
                  <path
                    d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.2)"
                    strokeWidth="4"
                    strokeDasharray="100, 100"
                  />
                  <path
                    d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="4"
                    strokeDasharray="65, 100"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold text-white">6.5%</span>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between text-xs text-white/70">
              <div>
                <p className="font-medium">Before</p>
                <p className="font-bold text-white mt-1">2.8%</p>
              </div>
              <div className="text-right">
                <p className="font-medium">After</p>
                <p className="font-bold text-green-400 mt-1">6.5%</p>
              </div>
            </div>
          </div>
          
          {/* Google Rankings */}
          <div className="bg-white/5 rounded-md p-3 sm:p-4">
            <div className="flex justify-between items-start mb-2">
              <p className="text-xs text-white/70">Keywords in Top 10</p>
              <div className="bg-green-500/20 rounded-md px-2 py-0.5">
                <p className="text-xs font-bold text-green-400">17 new keywords</p>
              </div>
            </div>
            
            {/* Simple ranking visualization */}
            <div className="grid grid-cols-5 gap-1 mb-3">
              {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20].map((pos) => (
                <div 
                  key={pos} 
                  className={`h-2 rounded-full ${pos <= 3 ? 'bg-green-500' : pos <= 20 ? 'bg-white/30' : 'bg-white/10'}`}
                ></div>
              ))}
            </div>
            
            <div className="flex justify-between text-xs text-white/70">
              <div>
                <p className="font-medium">Before</p>
                <p className="font-bold text-white mt-1">3 keywords</p>
              </div>
              <div className="text-right">
                <p className="font-medium">After</p>
                <p className="font-bold text-green-400 mt-1">20 keywords</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</motion.div>

{/* <div className="mt-12 flex justify-center">
  <Link
    href="/"
    className="group inline-flex items-center rounded-md bg-card border border-border px-6 py-3 text-sm font-medium text-foreground transition-all hover:bg-muted"
  >
    <span>Explore our web services</span>
    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
  </Link>
</div> */}
</div>
</>
)
}

export default webInfastructure;