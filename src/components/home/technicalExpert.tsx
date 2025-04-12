import { motion, AnimatePresence, useScroll, useMotionValueEvent, useTransform } from "framer-motion"
import Link from "next/link"
import { useState, useRef, useEffect, useCallback } from "react"
// @ts-ignore - Importing Tippy without type checking for now
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
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
    ChevronDown,
  } from "lucide-react"

// Add the CSS to make the custom theme work
const globalStyles = `
  .tippy-box[data-theme~='custom'] {
    background-color: inherit;
    color: inherit;
    border-radius: 6px;
    opacity: 0.9;
    backdrop-filter: blur(2px);
  }
  
  .tippy-box[data-theme~='custom'][data-placement^='top'] .tippy-arrow::before {
    background-color: inherit;
    opacity: 0.9;
  }
  
  .tippy-box[data-theme~='custom'] .tippy-content {
    padding: 8px 10px;
  }
  
  /* Adjustments for dark mode */
  @media (prefers-color-scheme: dark) {
    .tippy-box[data-theme~='custom'] {
      opacity: 0.85;
    }
  }
`;

// Tech stack tooltip content
const techInfo = {
  nextjs: {
    name: "Next.js",
    description: "React framework with built-in routing, SSR, and API routes"
  },
  react: {
    name: "React",
    description: "UI library for building component-based interfaces"
  },
  typescript: {
    name: "TypeScript",
    description: "Typed JavaScript for better code quality and developer experience"
  },
  tailwind: {
    name: "Tailwind CSS",
    description: "Utility-first CSS framework for rapid UI development"
  },
  radix: {
    name: "Radix UI",
    description: "Headless UI primitives for building accessible components"
  },
  framerMotion: {
    name: "Framer Motion",
    description: "Animation library for creating fluid UI transitions"
  },
  mongodb: {
    name: "MongoDB",
    description: "NoSQL document database for flexible data storage"
  },
  mongoose: {
    name: "Mongoose",
    description: "MongoDB ODM for schema validation and data modeling"
  },
  nextAuth: {
    name: "NextAuth.js",
    description: "Authentication solution for Next.js applications"
  },
  socketio: {
    name: "Socket.io",
    description: "Real-time bidirectional event-based communication"
  },
  zustand: {
    name: "Zustand",
    description: "Lightweight state management with a simple API"
  },
  reactQuery: {
    name: "React Query",
    description: "Data fetching, caching and server state management"
  },
  reactHookForm: {
    name: "React Hook Form",
    description: "Performant forms with easy validation"
  },
  axios: {
    name: "Axios",
    description: "Promise-based HTTP client for API requests"
  },
  zod: {
    name: "Zod",
    description: "TypeScript-first schema validation with static type inference"
  },
  uploadthing: {
    name: "UploadThing",
    description: "Type-safe file uploads for Next.js applications"
  },
  resend: {
    name: "Resend",
    description: "Email API for developers with React email support"
  },
  swr: {
    name: "SWR",
    description: "React hooks for data fetching with stale-while-revalidate"
  }
} as const;

type TechKey = keyof typeof techInfo;

// Tech tag component with Tippy tooltip
const TechTag = ({ tech, color, name }: { tech: TechKey; color: string; name: string }) => (
  <Tippy 
    content={
      <div className="py-1 px-2">
        <p className="font-medium text-xs mb-1">{techInfo[tech].name}</p>
        <p className="text-xs opacity-90">{techInfo[tech].description}</p>
      </div>
    }
    theme="light"
    arrow={true}
    duration={200}
    delay={[100, 0]}
    placement="top"
    animation="shift-away"
    interactive={true}
  >
    <span className={`rounded-md bg-${color}-100 px-2 py-0.5 text-xs font-medium text-${color}-800 dark:bg-${color}-900/30 dark:text-${color}-400 cursor-help`}>
      {name}
    </span>
  </Tippy>
)

// Custom scrollable image component
const ScrollableImage = ({ src, alt }: { src: string; alt: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [imageHeight, setImageHeight] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const imageRef = useRef<HTMLImageElement>(null);
  
  // Set up scroll detection using Motion's useScroll hook
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // Map scroll position to image position
  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -1 * Math.max(0, imageHeight - containerHeight)]
  );
  
  // Track scroll state for UI feedback
  const [reachedBottom, setReachedBottom] = useState(false);
  const [reachedTop, setReachedTop] = useState(true);
  
  // Update state based on scroll position
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setReachedTop(latest <= 0.05);
    setReachedBottom(latest >= 0.95);
  });
  
  // Update measurements when image loads
  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    setImageHeight(img.offsetHeight);
    
    if (containerRef.current) {
      setContainerHeight(containerRef.current.offsetHeight);
    }
  };

  // Update dimensions on resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current && imageRef.current) {
        setContainerHeight(containerRef.current.offsetHeight);
        setImageHeight(imageRef.current.offsetHeight);
      }
    };

    window.addEventListener('resize', updateDimensions);
    updateDimensions();

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <motion.div 
        className="w-full"
        style={{ 
          y: imageY 
        }}
      >
        <img
          ref={imageRef}
          src={src}
          alt={alt}
          className="w-full"
          style={{ minHeight: '150%' }}
          onLoad={handleImageLoad}
          draggable={false}
        />
      </motion.div>
      
      {/* Scroll indicators */}
      <motion.div 
        className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/40 to-transparent pointer-events-none"
        animate={{ opacity: reachedTop ? 0 : 0.7 }}
      />
      <motion.div 
        className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"
        animate={{ opacity: reachedBottom ? 0 : 0.7 }}
      />
      
      {/* Scroll hint - shows more prominently when hovering */}
      <motion.div 
        className="absolute top-3 right-3 text-white/60 text-xs flex items-center gap-1 bg-black/20 px-2 py-1 rounded-full backdrop-blur-sm pointer-events-none"
        animate={{ 
          opacity: isHovering && !reachedBottom ? 0.9 : 0.4
        }}
        transition={{ duration: 0.2 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14M5 12h14"></path>
        </svg>
        <span>Scroll to explore</span>
      </motion.div>
      
      {/* Continue scrolling hint at bottom */}
      <motion.div 
        className="absolute inset-x-0 bottom-2 flex justify-center pointer-events-none"
        animate={{ 
          opacity: reachedBottom && isHovering ? 0.9 : 0
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="bg-black/30 backdrop-blur-sm text-white/80 text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M12 19l7-7M12 19l-7-7"></path>
          </svg>
          <span>Continue scrolling page</span>
        </div>
      </motion.div>
    </div>
  );
};

const TechnicalExpert = () => {
  // State for mobile accordions
  const [openCard, setOpenCard] = useState<number | null>(null);
  // Fix for window is not defined error
  const [isMounted, setIsMounted] = useState(false);
  
  // Toggle accordion function
  const toggleCard = (index: number) => {
    setOpenCard(openCard === index ? null : index);
  };

  // Handle client-side mounting
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
  <>
    {/* Add the global styles */}
    <style jsx global>{globalStyles}</style>
    {/* We good at Section */}
<div className="space-y-16">
  <div>
    <div className="py-6 text-center">
      <h2 className="mb-4 font-medium tracking-tight text-foreground text-5xl">
        What We&apos;re Good At
      </h2>
      <p className="mt-4 max-w-2xl lg:text-lg leading-relaxed text-muted-foreground md:mx-auto">
        We geek out on cutting-edge tech – from modern frameworks to infrastructure tweaks and AI tinkering – all to build stuff that works
      </p>
    </div>
  </div>

      {/* Mobile-Only Accordion Cards */}
      <div className="block md:hidden space-y-3">
        {/* Frontend Card - Mobile */}
        <div className="rounded-lg bg-card p-4 px-0 border-border">
          <button 
            onClick={() => toggleCard(0)} 
            className="flex items-center justify-between w-full"
          >
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 p-2.5 flex items-center justify-center mr-3">
                <Code className="h-5 w-5 text-white" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-medium text-foreground">Modern Frontend</h3>
            </div>
            <motion.div
              animate={{ rotate: openCard === 0 ? 180 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <ChevronDown className="h-5 w-5 text-muted-foreground" />
            </motion.div>
          </button>
          
          <AnimatePresence initial={false}>
            {openCard === 0 && (
              <motion.div 
                initial={{ height: 0, opacity: 0, marginTop: 0 }}
                animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="pt-3 border-t border-border">
                  <p className="mb-4 text-muted-foreground">
                    We craft interfaces people actually enjoy using, with React, Next.js, and TypeScript under the hood, plus TailwindCSS and Radix UI for that extra polish.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="mr-2 mt-1 h-4 w-4 text-green-500" />
                      <span className="text-sm text-muted-foreground">Server and client components</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="mr-2 mt-1 h-4 w-4 text-green-500" />
                      <span className="text-sm text-muted-foreground">Type-safe development</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="mr-2 mt-1 h-4 w-4 text-green-500" />
                      <span className="text-sm text-muted-foreground">Responsive design systems</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Backend Card - Mobile */}
        <div className="rounded-lg bg-card p-4 px-0 border-border">
          <button 
            onClick={() => toggleCard(1)} 
            className="flex items-center justify-between w-full"
          >
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 p-2.5 flex items-center justify-center mr-3">
                <Server className="h-5 w-5 text-white" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-medium text-foreground">Robust Backend</h3>
            </div>
            <motion.div
              animate={{ rotate: openCard === 1 ? 180 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <ChevronDown className="h-5 w-5 text-muted-foreground" />
            </motion.div>
          </button>
          
          <AnimatePresence initial={false}>
            {openCard === 1 && (
              <motion.div 
                initial={{ height: 0, opacity: 0, marginTop: 0 }}
                animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="pt-3 border-t border-border">
                  <p className="mb-4 text-muted-foreground">
                    We build the behind-the-scenes magic with Node.js, Express, and database wizardry via MongoDB and MariaDB that keeps everything running smoothly.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="mr-2 mt-1 h-4 w-4 text-green-500" />
                      <span className="text-sm text-muted-foreground">RESTful API design</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="mr-2 mt-1 h-4 w-4 text-green-500" />
                      <span className="text-sm text-muted-foreground">Advanced data modeling</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="mr-2 mt-1 h-4 w-4 text-green-500" />
                      <span className="text-sm text-muted-foreground">Real-time data processing</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Security Card - Mobile */}
        <div className="rounded-lg bg-card p-4 px-0 border-border">
          <button 
            onClick={() => toggleCard(2)} 
            className="flex items-center justify-between w-full"
          >
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-500 to-violet-600 p-2.5 flex items-center justify-center mr-3">
                <Shield className="h-5 w-5 text-white" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-medium text-foreground">Security Expertise</h3>
            </div>
            <motion.div
              animate={{ rotate: openCard === 2 ? 180 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <ChevronDown className="h-5 w-5 text-muted-foreground" />
            </motion.div>
          </button>
          
          <AnimatePresence initial={false}>
            {openCard === 2 && (
              <motion.div 
                initial={{ height: 0, opacity: 0, marginTop: 0 }}
                animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="pt-3 border-t border-border">
                  <p className="mb-4 text-muted-foreground">
                    We take security seriously (but not ourselves). From encryption to DNS protection and access control, we keep the bad guys out and your data safe.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="mr-2 mt-1 h-4 w-4 text-green-500" />
                      <span className="text-sm text-muted-foreground">DDoS mitigation</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="mr-2 mt-1 h-4 w-4 text-green-500" />
                      <span className="text-sm text-muted-foreground">Anti-piracy solutions</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="mr-2 mt-1 h-4 w-4 text-green-500" />
                      <span className="text-sm text-muted-foreground">Zero-trust architecture</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* AI/ML Card - Mobile */}
        <div className="rounded-lg bg-card p-4 px-0 border-border">
          <button 
            onClick={() => toggleCard(3)} 
            className="flex items-center justify-between w-full"
          >
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-orange-500 to-amber-600 p-2.5 flex items-center justify-center mr-3">
                <Brain className="h-5 w-5 text-white" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-medium text-foreground">AI & Machine Learning</h3>
            </div>
            <motion.div
              animate={{ rotate: openCard === 3 ? 180 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <ChevronDown className="h-5 w-5 text-muted-foreground" />
            </motion.div>
          </button>
          
          <AnimatePresence initial={false}>
            {openCard === 3 && (
              <motion.div 
                initial={{ height: 0, opacity: 0, marginTop: 0 }}
                animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="pt-3 border-t border-border">
                  <p className="mb-4 text-muted-foreground">
                    We teach computers to see, talk, and predict cool stuff using Python, JavaScript, and a bunch of fancy AI tools (but we promise not to create Skynet).
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="mr-2 mt-1 h-4 w-4 text-green-500" />
                      <span className="text-sm text-muted-foreground">Custom model training</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="mr-2 mt-1 h-4 w-4 text-green-500" />
                      <span className="text-sm text-muted-foreground">Computer vision systems</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="mr-2 mt-1 h-4 w-4 text-green-500" />
                      <span className="text-sm text-muted-foreground">Multi-modal AI development</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Desktop Cards - Hide on Mobile */}
      <div className="hidden md:grid grid-cols-2 gap-8 lg:grid-cols-4">
        {/* Original Expertise Cards for Desktop */}
  {/* Expertise Card 1 - Frontend */}
  <motion.div
    className="rounded-lg bg-card p-6 border-border"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay: 0.1 }}
  >
    <div className="mb-4 h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 p-3 flex items-center justify-center">
      <Code className="h-6 w-6 text-white" strokeWidth={1.5} />
    </div>
    <h3 className="mb-3 text-xl font-medium text-foreground">Modern Frontend</h3>
    <p className="mb-4 text-muted-foreground">
            We craft interfaces people actually enjoy using, with React, Next.js, and TypeScript under the hood, plus TailwindCSS and Radix UI for that extra polish.
    </p>
    <ul className="space-y-2">
      <li className="flex items-start">
        <Check className="mr-2 mt-1 h-4 w-4 text-green-500" />
        <span className="text-sm text-muted-foreground">Server and client components</span>
      </li>
      <li className="flex items-start">
        <Check className="mr-2 mt-1 h-4 w-4 text-green-500" />
        <span className="text-sm text-muted-foreground">Type-safe development</span>
      </li>
      <li className="flex items-start">
        <Check className="mr-2 mt-1 h-4 w-4 text-green-500" />
        <span className="text-sm text-muted-foreground">Responsive design systems</span>
      </li>
    </ul>
  </motion.div>

  {/* Expertise Card 2 - Backend */}
  <motion.div
    className="rounded-lg bg-card p-6 border-border"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay: 0.2 }}
  >
    <div className="mb-4 h-12 w-12 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 p-3 flex items-center justify-center">
      <Server className="h-6 w-6 text-white" strokeWidth={1.5} />
    </div>
    <h3 className="mb-3 text-xl font-medium text-foreground">Robust Backend</h3>
    <p className="mb-4 text-muted-foreground">
            We build the behind-the-scenes magic with Node.js, Express, and database wizardry via MongoDB and MariaDB that keeps everything running smoothly.
    </p>
    <ul className="space-y-2">
      <li className="flex items-start">
        <Check className="mr-2 mt-1 h-4 w-4 text-green-500" />
        <span className="text-sm text-muted-foreground">RESTful API design</span>
      </li>
      <li className="flex items-start">
        <Check className="mr-2 mt-1 h-4 w-4 text-green-500" />
        <span className="text-sm text-muted-foreground">Advanced data modeling</span>
      </li>
      <li className="flex items-start">
        <Check className="mr-2 mt-1 h-4 w-4 text-green-500" />
        <span className="text-sm text-muted-foreground">Real-time data processing</span>
      </li>
    </ul>
  </motion.div>

  {/* Expertise Card 3 - Security */}
  <motion.div
    className="rounded-lg bg-card p-6 border-border"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay: 0.3 }}
  >
    <div className="mb-4 h-12 w-12 rounded-lg bg-gradient-to-br from-purple-500 to-violet-600 p-3 flex items-center justify-center">
      <Shield className="h-6 w-6 text-white" strokeWidth={1.5} />
    </div>
    <h3 className="mb-3 text-xl font-medium text-foreground">Security Expertise</h3>
    <p className="mb-4 text-muted-foreground">
            We take security seriously (but not ourselves). From encryption to DNS protection and access control, we keep the bad guys out and your data safe.
    </p>
    <ul className="space-y-2">
      <li className="flex items-start">
        <Check className="mr-2 mt-1 h-4 w-4 text-green-500" />
        <span className="text-sm text-muted-foreground">DDoS mitigation</span>
      </li>
      <li className="flex items-start">
        <Check className="mr-2 mt-1 h-4 w-4 text-green-500" />
        <span className="text-sm text-muted-foreground">Anti-piracy solutions</span>
      </li>
      <li className="flex items-start">
        <Check className="mr-2 mt-1 h-4 w-4 text-green-500" />
        <span className="text-sm text-muted-foreground">Zero-trust architecture</span>
      </li>
    </ul>
  </motion.div>

  {/* Expertise Card 4 - AI/ML */}
  <motion.div
    className="rounded-lg bg-card p-6 border-border"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay: 0.4 }}
  >
    <div className="mb-4 h-12 w-12 rounded-lg bg-gradient-to-br from-orange-500 to-amber-600 p-3 flex items-center justify-center">
      <Brain className="h-6 w-6 text-white" strokeWidth={1.5} />
    </div>
    <h3 className="mb-3 text-xl font-medium text-foreground">AI & Machine Learning</h3>
    <p className="mb-4 text-muted-foreground">
            We teach computers to see, talk, and predict cool stuff using Python, JavaScript, and a bunch of fancy AI tools (but we promise not to create Skynet).
    </p>
    <ul className="space-y-2">
      <li className="flex items-start">
        <Check className="mr-2 mt-1 h-4 w-4 text-green-500" />
        <span className="text-sm text-muted-foreground">Custom model training</span>
      </li>
      <li className="flex items-start">
        <Check className="mr-2 mt-1 h-4 w-4 text-green-500" />
        <span className="text-sm text-muted-foreground">Computer vision systems</span>
      </li>
      <li className="flex items-start">
        <Check className="mr-2 mt-1 h-4 w-4 text-green-500" />
        <span className="text-sm text-muted-foreground">Multi-modal AI development</span>
      </li>
    </ul>
  </motion.div>
</div>

{/* Dedicated Projects Section */}
<motion.div
  className="mt-16 pt-8 sm:pt-12"
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-50px" }}
  transition={{ duration: 0.6 }}
>
  <div className="text-center mb-8 py-6">
    <h3 className="mb-4 font-medium tracking-tight text-foreground text-5xl">
      Projects We&apos;re Excited About
    </h3>
    <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-4">
      Innovative solutions built with modern tech stacks
    </p>
  </div>

  {/* Project Card - PlayerBay */}
  <div className="mx-auto">
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      {/* Mobile View: Stacked with Image on Top */}
      <div className="block md:hidden">
        {/* Mobile Image Container */}
        <div className="relative h-52 sm:h-64 w-full overflow-hidden bg-gradient-to-br from-slate-900/30 to-slate-800/30">
          {/* Custom scrollable image */}
          <ScrollableImage 
            src="/images/playerbay_demo.png" 
            alt="PlayerBay gaming marketplace"
          />
          
          {/* Status Badge - Mobile */}
          <div className="absolute top-3 left-3 bg-black/40 backdrop-blur-md rounded-full px-3 py-1 flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-amber-400 animate-pulse"></div>
            <span className="text-xs font-medium text-white">Coming Soon</span>
          </div>
        </div>

        {/* Mobile Content */}
        <div className="p-4 sm:p-6">
          <h4 className="text-xl font-medium text-foreground mb-3">PlayerBay</h4>
          <p className="text-sm text-muted-foreground mb-4">
            A marketplace where gamers can buy and sell accounts and in-game items. Our SDK lets game studios integrate with our platform for seamless in-game transactions.
          </p>

          {/* Mobile Tech Stack Accordion */}
          <div className="mb-3">
            <button 
              onClick={() => toggleCard(4)} 
              className="flex items-center justify-between w-full rounded-md bg-muted/50 p-3 text-left"
            >
              <h4 className="text-sm font-medium text-foreground">Tech Stack</h4>
              <motion.div
                animate={{ rotate: openCard === 4 ? 180 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {openCard === 4 && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 px-1 space-y-4">
                    {/* Frontend */}
                    <div>
                      <div className="flex items-center mb-2">
                        <div className="h-2 w-2 bg-blue-400 rounded-full mr-2"></div>
                        <span className="text-xs font-medium text-foreground">Frontend</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        <span className="rounded-md bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 cursor-help">Next.js</span>
                        <span className="rounded-md bg-cyan-100 px-2 py-0.5 text-xs font-medium text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-400 cursor-help">React</span>
                        <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-800 dark:bg-slate-900/30 dark:text-slate-400 cursor-help">TypeScript</span>
                        <span className="rounded-md bg-pink-100 px-2 py-0.5 text-xs font-medium text-pink-800 dark:bg-pink-900/30 dark:text-pink-400 cursor-help">Tailwind</span>
                      </div>
                    </div>
                    
                    {/* Backend */}
    <div>
                      <div className="flex items-center mb-2">
                        <div className="h-2 w-2 bg-green-400 rounded-full mr-2"></div>
                        <span className="text-xs font-medium text-foreground">Backend</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        <span className="rounded-md bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 cursor-help">MongoDB</span>
                        <span className="rounded-md bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400 cursor-help">NextAuth</span>
                        <span className="rounded-md bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400 cursor-help">Socket.io</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Key Features - Mobile */}
          <div className="space-y-2 mb-3">
            <div className="flex items-center text-sm text-muted-foreground">
              <Check className="mr-2 h-4 w-4 text-green-500 flex-shrink-0" />
              <span>Cross-game inventory system</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Check className="mr-2 h-4 w-4 text-green-500 flex-shrink-0" />
              <span>Game studio SDK integration</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Check className="mr-2 h-4 w-4 text-green-500 flex-shrink-0" />
              <span>Secure payment processing</span>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop View: Side-by-Side */}
      <div className="hidden md:grid md:grid-cols-5 lg:grid-cols-2">
        {/* Content Side */}
        <div className="md:col-span-2 lg:col-span-1 p-6 lg:p-8">
          <h4 className="text-2xl font-medium text-foreground mb-3">PlayerBay</h4>
          <p className="text-base text-muted-foreground mb-6">
            We&apos;re building PlayerBay — a marketplace where everyone from Fortnite pros to Diablo loot fiends can buy and sell accounts and in-game items. Our easy-to-use SDK lets any game studio integrate with our platform for seamless transactions.
          </p>

          {/* Status Badge - Desktop */}
          <div className="inline-flex items-center rounded-md bg-amber-100 dark:bg-amber-900/30 px-2.5 py-0.5 text-xs font-medium text-amber-800 dark:text-amber-400 mb-4">
          <Zap className="mr-1 h-3 w-3" />
          <span>Under Development</span>
        </div>

          {/* Key Features - Desktop */}
          <div className="space-y-2 mb-6">
            <h5 className="text-sm font-medium text-foreground mb-2">Key Features</h5>
            <div className="flex items-center text-sm text-muted-foreground">
              <Check className="mr-2 h-4 w-4 text-green-500 flex-shrink-0" />
              <span>Cross-game inventory system with unified wallet</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Check className="mr-2 h-4 w-4 text-green-500 flex-shrink-0" />
              <span>Simple SDK for game studio integration</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Check className="mr-2 h-4 w-4 text-green-500 flex-shrink-0" />
              <span>Secure payment processing and escrow system</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Check className="mr-2 h-4 w-4 text-green-500 flex-shrink-0" />
              <span>Anti-fraud protection with transaction history</span>
            </div>
          </div>

          {/* Tech Stack Desktop */}
          <div>
            <h5 className="text-sm font-medium text-foreground mb-3">Built With</h5>
            <div className="space-y-3">
              {/* Frontend */}
              <div>
                <div className="flex items-center mb-2">
                  <div className="h-2 w-2 bg-blue-400 rounded-full mr-2"></div>
                  <span className="text-xs font-medium text-muted-foreground">Frontend</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <span className="rounded-md bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 cursor-help">Next.js</span>
                  <span className="rounded-md bg-cyan-100 px-2 py-0.5 text-xs font-medium text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-400 cursor-help">React</span>
                  <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-800 dark:bg-slate-900/30 dark:text-slate-400 cursor-help">TypeScript</span>
                  <span className="rounded-md bg-pink-100 px-2 py-0.5 text-xs font-medium text-pink-800 dark:bg-pink-900/30 dark:text-pink-400 cursor-help">Tailwind</span>
                </div>
              </div>
              
              {/* Backend */}
              <div>
                <div className="flex items-center mb-2">
                  <div className="h-2 w-2 bg-green-400 rounded-full mr-2"></div>
                  <span className="text-xs font-medium text-muted-foreground">Backend</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <span className="rounded-md bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 cursor-help">MongoDB</span>
                  <span className="rounded-md bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400 cursor-help">NextAuth</span>
                  <span className="rounded-md bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400 cursor-help">Socket.io</span>
                </div>
              </div>
              
              {/* Utilities */}
              <div>
                <div className="flex items-center mb-2">
                  <div className="h-2 w-2 bg-amber-400 rounded-full mr-2"></div>
                  <span className="text-xs font-medium text-muted-foreground">Utilities</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <span className="rounded-md bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-800 dark:bg-orange-900/30 dark:text-orange-400 cursor-help">React Query</span>
                  <span className="rounded-md bg-teal-100 px-2 py-0.5 text-xs font-medium text-teal-800 dark:bg-teal-900/30 dark:text-teal-400 cursor-help">React Hook Form</span>
                  <span className="rounded-md bg-lime-100 px-2 py-0.5 text-xs font-medium text-lime-800 dark:bg-lime-900/30 dark:text-lime-400 cursor-help">SWR</span>
                </div>
              </div>
      </div>
      </div>
    </div>
        
        {/* Image Side */}
        <div className="md:col-span-3 lg:col-span-1 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 to-slate-800/50">
            {/* Custom scrollable image implementation */}
            <ScrollableImage 
          src="/images/playerbay_demo.png" 
          alt="PlayerBay gaming marketplace"
            />
            
            {/* Enhanced gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/30 to-transparent opacity-70 pointer-events-none"></div>
            
            {/* Status Badge - Desktop Image */}
            <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md rounded-full px-3 py-1 flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-amber-400 animate-pulse"></div>
              <span className="text-xs font-medium text-white">Coming Soon</span>
            </div>
            
            {/* Bottom Caption */}
            <div className="absolute inset-x-0 bottom-0 p-6 pointer-events-none">
              <p className="text-xs text-white/90 max-w-sm">
                A marketplace for gamers powered by next-gen tech - the secure way to trade digital assets across games.
              </p>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-1/4 right-1/4 h-24 w-24 rounded-full bg-amber-500/10 filter blur-2xl pointer-events-none"></div>
            <div className="absolute bottom-1/3 left-1/4 h-20 w-20 rounded-full bg-blue-500/10 filter blur-xl pointer-events-none"></div>
          </div>
        </div>
      </div>
    </div>

    {/* Future Project Teaser Card */}
    <div className="mt-6 p-6 rounded-xl border border-dashed border-border bg-card/50 text-center">
      <div className="max-w-md mx-auto">
        <h4 className="text-lg font-medium text-foreground mb-2">More Projects Coming Soon</h4>
        <p className="text-sm text-muted-foreground mb-4">
          Like this site? It&apos;s open-sourced! Check out our GitHub for this project and other cool stuff we&apos;re building.
        </p>
        <div className="flex justify-center gap-3">
          <Link
            href="https://github.com/Cadogy/Cadogy_Site_2025"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
            <span>Site Code</span>
          </Link>
          <Link
            href="https://github.com/Cadogy"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
            <span>Cadogy GitHub</span>
          </Link>
        </div>
      </div>
    </div>
  </div>
</motion.div>
</div>
</>
  )
}

export default TechnicalExpert;