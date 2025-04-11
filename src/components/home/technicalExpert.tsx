import { motion, AnimatePresence } from "framer-motion"
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
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [imageHeight, setImageHeight] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const [reachedBottom, setReachedBottom] = useState(false);
  const [reachedTop, setReachedTop] = useState(true);
  const imageRef = useRef<HTMLImageElement>(null);

  // Calculate max scroll based on image and container heights
  const maxScroll = Math.max(0, imageHeight - containerHeight);

  // Handle scroll position change - memoized with useCallback
  const handleScroll = useCallback((deltaY: number) => {
    if (!imageRef.current || !containerRef.current) return false;
    
    // Recalculate actual dimensions to ensure we have the most up-to-date values
    const actualImageHeight = imageRef.current.offsetHeight;
    const actualContainerHeight = containerRef.current.offsetHeight;
    const actualMaxScroll = Math.max(0, actualImageHeight - actualContainerHeight);
    
    // Top threshold (5px from top)
    const topThreshold = 5;
    
    // If at top and trying to scroll up more, allow page to scroll
    if (scrollPosition <= topThreshold && deltaY < 0) {
      setReachedTop(true);
      return false; // Don't prevent default
    }
    
    // If at bottom and trying to scroll down more, allow page to scroll
    // Use a smaller threshold to prevent scrolling too far
    const bottomThreshold = 10;
    if (scrollPosition >= actualMaxScroll - bottomThreshold && deltaY > 0) {
      setReachedBottom(true);
      // Set position to exactly max scroll to prevent overscrolling
      setScrollPosition(actualMaxScroll);
      return false; // Don't prevent default
    }
    
    // Otherwise handle scrolling within the image
    setReachedBottom(false);
    setReachedTop(scrollPosition <= topThreshold);
    
    // Calculate new position with easing
    const delta = deltaY * 0.5; // Adjust scrolling speed
    const newPosition = Math.min(Math.max(0, scrollPosition + delta), actualMaxScroll);
    setScrollPosition(newPosition);
    
    return true; // Prevent default page scroll
  }, [scrollPosition]);

  // Manual scroll function - can be used with buttons if needed
  const scroll = useCallback((amount: number) => {
    if (!imageRef.current || !containerRef.current) return;
    
    // Recalculate actual dimensions
    const actualImageHeight = imageRef.current.offsetHeight;
    const actualContainerHeight = containerRef.current.offsetHeight;
    const actualMaxScroll = Math.max(0, actualImageHeight - actualContainerHeight);
    
    setScrollPosition(prevPos => {
      const newPosition = Math.min(Math.max(0, prevPos + amount), actualMaxScroll);
      return newPosition;
    });
  }, []);

  // Update measurements when image loads
  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    setImageHeight(img.offsetHeight);
    
    if (containerRef.current) {
      setContainerHeight(containerRef.current.offsetHeight);
    }
    
    // Reset scroll position when image loads
    setScrollPosition(0);
    setReachedTop(true);
    setReachedBottom(false);
  };

  // Direct wheel event handler for the container
  const handleWheel = (e: React.WheelEvent) => {
    if (!isHovering) return;
    
    // Only prevent default if we're not at boundaries
    const shouldPreventDefault = handleScroll(e.deltaY);
    
    if (shouldPreventDefault) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  // Set up non-passive wheel event listener to prevent page scrolling
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const wheelHandler = (e: WheelEvent) => {
      if (!isHovering) return;
      
      // Only prevent default if we're not at boundaries
      const shouldPreventDefault = handleScroll(e.deltaY);
      
      if (shouldPreventDefault) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    // Add wheel event with passive: false to allow preventDefault
    container.addEventListener('wheel', wheelHandler, { passive: false });
    
    return () => {
      container.removeEventListener('wheel', wheelHandler);
    };
  }, [isHovering, handleScroll]);

  // Update container height on resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current && imageRef.current) {
        setContainerHeight(containerRef.current.offsetHeight);
        setImageHeight(imageRef.current.offsetHeight);
        
        // After resizing, make sure scroll position is still valid
        const actualImageHeight = imageRef.current.offsetHeight;
        const actualContainerHeight = containerRef.current.offsetHeight;
        const actualMaxScroll = Math.max(0, actualImageHeight - actualContainerHeight);
        
        setScrollPosition(prev => Math.min(prev, actualMaxScroll));
      }
    };

    window.addEventListener('resize', updateDimensions);
    updateDimensions();

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 cursor-ns-resize overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onWheel={handleWheel}
    >
      <motion.div 
        className="w-full"
        animate={{ 
          y: -scrollPosition,
        }}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 30,
          mass: 0.5
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
        className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-black/40 to-transparent pointer-events-none"
        animate={{ opacity: scrollPosition > 10 ? 0.7 : 0 }}
      />
      <motion.div 
        className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"
        animate={{ opacity: !reachedBottom ? 0.7 : 0 }}
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
      
      {/* Optional scroll controls for testing */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute bottom-2 left-2 flex space-x-2 bg-black/50 backdrop-blur-sm rounded-full p-1">
          <button 
            className="text-white p-1" 
            onClick={() => scroll(-50)}
            aria-label="Scroll up"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 19V5M5 12l7-7 7 7"/>
            </svg>
          </button>
          <button 
            className="text-white p-1" 
            onClick={() => scroll(50)}
            aria-label="Scroll down"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12l7 7 7-7"/>
            </svg>
          </button>
        </div>
      )}
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
    
<div className="mt-32 space-y-16">
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.6 }}
>
  <div className="py-6 text-center">
          <h2 className="mb-4 font-medium tracking-tight text-foreground sm:text-4xl text-4xl lg:text-5xl">
            What We&apos;re Good At
    </h2>
          <p className="mt-4 max-w-2xl lg:text-lg leading-relaxed text-muted-foreground md:mx-auto">
            We geek out on cutting-edge tech – from modern frameworks to infrastructure tweaks and AI tinkering – all to build stuff that actually works
    </p>
  </div>
</motion.div>

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
        className="mt-16 rounded-xl bg-card/40 p-0 lg:p-8 lg:border border-border"
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-50px" }}
  transition={{ duration: 0.6 }}
>
        <div className="grid grid-cols-1 gap-6 lg:gap-8 lg:grid-cols-2">
    <div>
            <div className="inline-flex items-center rounded-md bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-4">
              Professional Projects
      </div>
            <h3 className="mb-2 sm:mb-4 text-xl sm:text-2xl font-medium text-foreground">PlayerBay</h3>
            <p className="mb-4 sm:mb-6 text-sm sm:text-base text-muted-foreground">
              We&apos;re cooking up PlayerBay — a marketplace where everyone from Fortnite pros to Diablo loot fiends can buy and sell accounts and in-game goodies. The best part? Our easy-to-use SDK lets any game studio start selling their items, right in-game or on our platform. A marketplace for every game.
            </p>
            <div className="mb-4 sm:mb-6">
        <div className="inline-flex items-center rounded-md bg-amber-100 dark:bg-amber-900/30 px-2.5 py-0.5 text-xs font-medium text-amber-800 dark:text-amber-400">
          <Zap className="mr-1 h-3 w-3" />
          <span>Under Development</span>
        </div>
              <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-muted-foreground">
                This game-changer will have all the good stuff: rock-solid security, items that work across games, and infrastructure that won&apos;t fall over when things get busy.
        </p>
      </div>
            
            {/* Mobile-optimized collapsible tech stack */}
            <div className="space-y-3">
              <button 
                onClick={() => toggleCard(4)} 
                className="flex items-center justify-between w-full text-left mb-2 sm:hidden"
              >
                <h4 className="text-xs font-medium text-muted-foreground">View tech stack</h4>
                <motion.div
                  animate={{ rotate: openCard === 4 ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </motion.div>
              </button>

              {/* Always visible on sm+ screens, collapsible on xs screens */}
              <AnimatePresence initial={false}>
                {(openCard === 4 || (isMounted && typeof window !== 'undefined' && window.innerWidth >= 640)) && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden sm:!h-auto sm:!opacity-100"
                  >
                    {/* Frontend */}
                    <div className="mb-3">
                      <div className="flex items-center mb-1.5">
                        <span className="inline-block w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                        <span className="text-xs font-medium text-muted-foreground">Frontend:</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        <Tippy 
                          content={
                            <div className="py-1 px-2">
                              <p className="font-medium text-xs mb-1">{techInfo.nextjs.name}</p>
                              <p className="text-xs opacity-90">{techInfo.nextjs.description}</p>
                            </div>
                          } 
                          arrow={true} 
                          placement="top"
                          theme="custom"
                          className="!bg-blue-100/90 !text-blue-800 dark:!bg-blue-900/50 dark:!text-blue-400"
                        >
                          <span className="rounded-md bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 cursor-help">Next.js</span>
                        </Tippy>
                        
                        <Tippy 
                          content={
                            <div className="py-1 px-2">
                              <p className="font-medium text-xs mb-1">{techInfo.react.name}</p>
                              <p className="text-xs opacity-90">{techInfo.react.description}</p>
                            </div>
                          } 
                          arrow={true} 
                          placement="top"
                          theme="custom"
                          className="!bg-cyan-100/90 !text-cyan-800 dark:!bg-cyan-900/50 dark:!text-cyan-400"
                        >
                          <span className="rounded-md bg-cyan-100 px-2 py-0.5 text-xs font-medium text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-400 cursor-help">React</span>
                        </Tippy>
                        
                        <Tippy 
                          content={
                            <div className="py-1 px-2">
                              <p className="font-medium text-xs mb-1">{techInfo.typescript.name}</p>
                              <p className="text-xs opacity-90">{techInfo.typescript.description}</p>
                            </div>
                          } 
                          arrow={true} 
                          placement="top"
                          theme="custom"
                          className="!bg-slate-100/90 !text-slate-800 dark:!bg-slate-900/50 dark:!text-slate-400"
                        >
                          <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-800 dark:bg-slate-900/30 dark:text-slate-400 cursor-help">TypeScript</span>
                        </Tippy>
                        
                        <Tippy 
                          content={
                            <div className="py-1 px-2">
                              <p className="font-medium text-xs mb-1">{techInfo.tailwind.name}</p>
                              <p className="text-xs opacity-90">{techInfo.tailwind.description}</p>
                            </div>
                          } 
                          arrow={true} 
                          placement="top"
                          theme="custom"
                          className="!bg-pink-100/90 !text-pink-800 dark:!bg-pink-900/50 dark:!text-pink-400"
                        >
                          <span className="rounded-md bg-pink-100 px-2 py-0.5 text-xs font-medium text-pink-800 dark:bg-pink-900/30 dark:text-pink-400 cursor-help">Tailwind</span>
                        </Tippy>
                        
                        <Tippy 
                          content={
                            <div className="py-1 px-2">
                              <p className="font-medium text-xs mb-1">{techInfo.radix.name}</p>
                              <p className="text-xs opacity-90">{techInfo.radix.description}</p>
                            </div>
                          } 
                          arrow={true} 
                          placement="top"
                          theme="custom"
                          className="!bg-rose-100/90 !text-rose-800 dark:!bg-rose-900/50 dark:!text-rose-400"
                        >
                          <span className="rounded-md bg-rose-100 px-2 py-0.5 text-xs font-medium text-rose-800 dark:bg-rose-900/30 dark:text-rose-400 cursor-help">Radix UI</span>
                        </Tippy>
                        
                        <Tippy 
                          content={
                            <div className="py-1 px-2">
                              <p className="font-medium text-xs mb-1">{techInfo.framerMotion.name}</p>
                              <p className="text-xs opacity-90">{techInfo.framerMotion.description}</p>
                            </div>
                          } 
                          arrow={true} 
                          placement="top"
                          theme="custom"
                          className="!bg-emerald-100/90 !text-emerald-800 dark:!bg-emerald-900/50 dark:!text-emerald-400"
                        >
                          <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 cursor-help">Framer Motion</span>
                        </Tippy>
                      </div>
                    </div>
                    
                    {/* Backend & Data */}
                    <div className="mb-3">
                      <div className="flex items-center mb-1.5">
                        <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                        <span className="text-xs font-medium text-muted-foreground">Backend & Data:</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        <Tippy 
                          content={
                            <div className="py-1 px-2">
                              <p className="font-medium text-xs mb-1">{techInfo.mongodb.name}</p>
                              <p className="text-xs opacity-90">{techInfo.mongodb.description}</p>
                            </div>
                          } 
                          arrow={true} 
                          placement="top"
                          theme="custom"
                          className="!bg-purple-100/90 !text-purple-800 dark:!bg-purple-900/50 dark:!text-purple-400"
                        >
                          <span className="rounded-md bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 cursor-help">MongoDB</span>
                        </Tippy>
                        
                        <Tippy 
                          content={
                            <div className="py-1 px-2">
                              <p className="font-medium text-xs mb-1">{techInfo.mongoose.name}</p>
                              <p className="text-xs opacity-90">{techInfo.mongoose.description}</p>
                            </div>
                          } 
                          arrow={true} 
                          placement="top"
                          theme="custom"
                          className="!bg-amber-100/90 !text-amber-800 dark:!bg-amber-900/50 dark:!text-amber-400"
                        >
                          <span className="rounded-md bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 cursor-help">Mongoose</span>
                        </Tippy>
                        
                        <Tippy 
                          content={
                            <div className="py-1 px-2">
                              <p className="font-medium text-xs mb-1">{techInfo.nextAuth.name}</p>
                              <p className="text-xs opacity-90">{techInfo.nextAuth.description}</p>
                            </div>
                          } 
                          arrow={true} 
                          placement="top"
                          theme="custom"
                          className="!bg-indigo-100 !text-indigo-800 dark:!bg-indigo-900/30 dark:!text-indigo-400"
                        >
                          <span className="rounded-md bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400 cursor-help">NextAuth</span>
                        </Tippy>
                        
                        <Tippy 
                          content={
                            <div className="py-1 px-2">
                              <p className="font-medium text-xs mb-1">{techInfo.socketio.name}</p>
                              <p className="text-xs opacity-90">{techInfo.socketio.description}</p>
                            </div>
                          } 
                          arrow={true} 
                          placement="top"
                          theme="custom"
                          className="!bg-green-100 !text-green-800 dark:!bg-green-900/30 dark:!text-green-400"
                        >
                          <span className="rounded-md bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400 cursor-help">Socket.io</span>
                        </Tippy>
                      </div>
                    </div>
                    
                    {/* Utilities */}
                    <div>
                      <div className="flex items-center mb-1.5">
                        <span className="inline-block w-2 h-2 bg-orange-400 rounded-full mr-2"></span>
                        <span className="text-xs font-medium text-muted-foreground">Utilities:</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        <Tippy 
                          content={
                            <div className="py-1 px-2">
                              <p className="font-medium text-xs mb-1">{techInfo.zustand.name}</p>
                              <p className="text-xs opacity-90">{techInfo.zustand.description}</p>
                            </div>
                          } 
                          arrow={true} 
                          placement="top"
                          theme="custom"
                          className="!bg-blue-100 !text-blue-800 dark:!bg-blue-900/30 dark:!text-blue-400"
                        >
                          <span className="rounded-md bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 cursor-help">Zustand</span>
                        </Tippy>
                        
                        <Tippy 
                          content={
                            <div className="py-1 px-2">
                              <p className="font-medium text-xs mb-1">{techInfo.reactQuery.name}</p>
                              <p className="text-xs opacity-90">{techInfo.reactQuery.description}</p>
                            </div>
                          } 
                          arrow={true} 
                          placement="top"
                          theme="custom"
                          className="!bg-orange-100 !text-orange-800 dark:!bg-orange-900/30 dark:!text-orange-400"
                        >
                          <span className="rounded-md bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-800 dark:bg-orange-900/30 dark:text-orange-400 cursor-help">React Query</span>
                        </Tippy>
                        
                        <Tippy 
                          content={
                            <div className="py-1 px-2">
                              <p className="font-medium text-xs mb-1">{techInfo.reactHookForm.name}</p>
                              <p className="text-xs opacity-90">{techInfo.reactHookForm.description}</p>
                            </div>
                          } 
                          arrow={true} 
                          placement="top"
                          theme="custom"
                          className="!bg-teal-100 !text-teal-800 dark:!bg-teal-900/30 dark:!text-teal-400"
                        >
                          <span className="rounded-md bg-teal-100 px-2 py-0.5 text-xs font-medium text-teal-800 dark:bg-teal-900/30 dark:text-teal-400 cursor-help">React Hook Form</span>
                        </Tippy>
                        
                        <Tippy 
                          content={
                            <div className="py-1 px-2">
                              <p className="font-medium text-xs mb-1">{techInfo.axios.name}</p>
                              <p className="text-xs opacity-90">{techInfo.axios.description}</p>
                            </div>
                          } 
                          arrow={true} 
                          placement="top"
                          theme="custom"
                          className="!bg-red-100 !text-red-800 dark:!bg-red-900/30 dark:!text-red-400"
                        >
                          <span className="rounded-md bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900/30 dark:text-red-400 cursor-help">Axios</span>
                        </Tippy>
                        
                        <Tippy 
                          content={
                            <div className="py-1 px-2">
                              <p className="font-medium text-xs mb-1">{techInfo.zod.name}</p>
                              <p className="text-xs opacity-90">{techInfo.zod.description}</p>
                            </div>
                          } 
                          arrow={true} 
                          placement="top"
                          theme="custom"
                          className="!bg-violet-100 !text-violet-800 dark:!bg-violet-900/30 dark:!text-violet-400"
                        >
                          <span className="rounded-md bg-violet-100 px-2 py-0.5 text-xs font-medium text-violet-800 dark:bg-violet-900/30 dark:text-violet-400 cursor-help">Zod</span>
                        </Tippy>
                        
                        <Tippy 
                          content={
                            <div className="py-1 px-2">
                              <p className="font-medium text-xs mb-1">{techInfo.uploadthing.name}</p>
                              <p className="text-xs opacity-90">{techInfo.uploadthing.description}</p>
                            </div>
                          } 
                          arrow={true} 
                          placement="top"
                          theme="custom"
                          className="!bg-fuchsia-100 !text-fuchsia-800 dark:!bg-fuchsia-900/30 dark:!text-fuchsia-400"
                        >
                          <span className="rounded-md bg-fuchsia-100 px-2 py-0.5 text-xs font-medium text-fuchsia-800 dark:bg-fuchsia-900/30 dark:text-fuchsia-400 cursor-help">UploadThing</span>
                        </Tippy>
                        
                        <Tippy 
                          content={
                            <div className="py-1 px-2">
                              <p className="font-medium text-xs mb-1">{techInfo.resend.name}</p>
                              <p className="text-xs opacity-90">{techInfo.resend.description}</p>
                            </div>
                          } 
                          arrow={true} 
                          placement="top"
                          theme="custom"
                          className="!bg-sky-100 !text-sky-800 dark:!bg-sky-900/30 dark:!text-sky-400"
                        >
                          <span className="rounded-md bg-sky-100 px-2 py-0.5 text-xs font-medium text-sky-800 dark:bg-sky-900/30 dark:text-sky-400 cursor-help">Resend</span>
                        </Tippy>
                        
                        <Tippy 
                          content={
                            <div className="py-1 px-2">
                              <p className="font-medium text-xs mb-1">{techInfo.swr.name}</p>
                              <p className="text-xs opacity-90">{techInfo.swr.description}</p>
                            </div>
                          } 
                          arrow={true} 
                          placement="top"
                          theme="custom"
                          className="!bg-lime-100 !text-lime-800 dark:!bg-lime-900/30 dark:!text-lime-400"
                        >
                          <span className="rounded-md bg-lime-100 px-2 py-0.5 text-xs font-medium text-lime-800 dark:bg-lime-900/30 dark:text-lime-400 cursor-help">SWR</span>
                        </Tippy>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
      </div>
    </div>
          {/* Redesigned project image - better on large screens */}
          <div className="px-4 sm:px-6 pt-6 pb-8 lg:p-0 lg:flex lg:items-center lg:justify-center">
            <div className="relative h-56 sm:h-64 md:h-72 lg:h-full lg:aspect-[4/3] w-full overflow-hidden rounded-lg lg:rounded-xl shadow-md lg:shadow-xl bg-gradient-to-br from-slate-900/30 to-slate-800/30">
              {/* Custom scrollable image implementation */}
              <ScrollableImage 
          src="/images/playerbay_demo.png" 
          alt="PlayerBay gaming marketplace"
              />
              
              {/* Enhanced gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/30 to-transparent opacity-80 pointer-events-none"></div>
              
              {/* Content overlay */}
              <div className="absolute inset-x-0 bottom-0 p-4 lg:p-6 pointer-events-none">
                <div className="space-y-2">
          <div className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-md bg-amber-500 animate-pulse"></div>
                    <span className="text-xs font-medium text-white/95">Coming Soon</span>
                  </div>
                  
                  <div className="hidden sm:block">
                    <p className="text-xs text-white/75 max-w-sm">
                      A secure, scalable marketplace for gamers to trade digital assets with our powerful SDK for game studios.
                    </p>
          </div>
        </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-4 right-4 h-24 w-24 rounded-md bg-amber-500/10 filter blur-2xl pointer-events-none"></div>
              <div className="absolute bottom-12 left-4 h-16 w-16 rounded-md bg-blue-500/10 filter blur-xl pointer-events-none"></div>
      </div>
    </div>
  </div>
</motion.div>
</div>
</>
  )
}

export default TechnicalExpert;