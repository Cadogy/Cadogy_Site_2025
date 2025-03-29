"use client"

// Ensure this is a client component
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Brain, Code, Globe, Lock, Server, Shield, Zap } from "lucide-react"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { addCacheBuster } from "@/lib/utils"

const technologies = [
  // Frontend Technologies
  {
    name: "NextJS",
    logo: "/images/assets/stack-logos/nextjs-icon.svg",
    category: "frontend"
  },
  {
    name: "ReactJS",
    logo: "/images/assets/stack-logos/react-icon.svg",
    category: "frontend"
  },
  {
    name: "TailwindCSS",
    logo: "/images/assets/stack-logos/tailwindcss-icon.svg",
    category: "frontend"
  },
  {
    name: "Vue.js",
    logo: "/images/assets/stack-logos/vue-icon.svg",
    category: "frontend"
  },
  {
    name: "Angular",
    logo: "/images/assets/stack-logos/angular-icon.svg",
    category: "frontend"
  },
  
  // Backend Technologies
  { 
    name: "NodeJS", 
    logo: "/images/assets/stack-logos/nodejs-icon.svg",
    category: "backend"
  },
  { 
    name: "ExpressJS", 
    logo: "/images/assets/stack-logos/expressjs-icon.svg",
    category: "backend"
  },
  { 
    name: "PHP", 
    logo: "/images/assets/stack-logos/php-icon.svg",
    category: "backend"
  },
  { 
    name: "Django", 
    logo: "/images/assets/stack-logos/django-icon.svg",
    category: "backend"
  },
  { 
    name: "Laravel", 
    logo: "/images/assets/stack-logos/laravel-icon.svg",
    category: "backend"
  },
  
  // Database Technologies
  { 
    name: "MongoDB", 
    logo: "/images/assets/stack-logos/mongodb-icon.svg",
    category: "database"
  },
  { 
    name: "MariaDB", 
    logo: "/images/assets/stack-logos/mariadb-icon.svg",
    category: "database"
  },
  { 
    name: "PostgreSQL", 
    logo: "/images/assets/stack-logos/postgresql-icon.svg",
    category: "database"
  },
  { 
    name: "Redis", 
    logo: "/images/assets/stack-logos/redis-icon.svg",
    category: "database"
  },
  
  // Infrastructure Technologies
  {
    name: "AWS",
    logo: "/images/assets/stack-logos/aws-icon.svg",
    category: "infrastructure"
  },
  {
    name: "Google Cloud",
    logo: "/images/assets/stack-logos/googlecloud-icon.svg",
    category: "infrastructure"
  },
  {
    name: "Cloudflare",
    logo: "/images/assets/stack-logos/cloudflare-icon.svg",
    category: "infrastructure"
  },
  {
    name: "Docker",
    logo: "/images/assets/stack-logos/docker-icon.svg",
    category: "infrastructure"
  },
  {
    name: "Kubernetes",
    logo: "/images/assets/stack-logos/kubernetes-icon.svg",
    category: "infrastructure"
  },
  
  // Programming Languages
  {
    name: "JavaScript",
    logo: "/images/assets/stack-logos/javascript-icon.svg",
    category: "language"
  },
  {
    name: "TypeScript",
    logo: "/images/assets/stack-logos/typescript-icon.svg",
    category: "language"
  },
  {
    name: "Python",
    logo: "/images/assets/stack-logos/python-icon.svg",
    category: "language"
  },
  {
    name: "PHP",
    logo: "/images/assets/stack-logos/php-icon.svg",
    category: "language"
  },
  
  // Tools and Platforms
  { 
    name: "Git", 
    logo: "/images/assets/stack-logos/git-icon.svg",
    category: "tools"
  },
  { 
    name: "XenForo", 
    logo: "/images/assets/stack-logos/xenforo-icon.svg",
    category: "tools"
  },
  { 
    name: "WordPress", 
    logo: "/images/assets/stack-logos/wordpress-icon.svg",
    category: "tools"
  },
  { 
    name: "Shopify", 
    logo: "/images/assets/stack-logos/shopify-icon.svg",
    category: "tools"
  }
]

// Tech item component for the grid display
const TechItem = ({ tech, index }: { tech: typeof technologies[0], index: number }) => {
  // Map category to specific color and style
  const getCategoryInfo = () => {
    switch (tech.category) {
      case "frontend": 
        return {
          gradientClass: "bg-gradient-to-r from-blue-50 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-800/30",
          borderClass: "border-blue-200/50 dark:border-blue-800/30",
          textClass: "text-blue-700 dark:text-blue-400",
          categoryClass: "text-blue-600/70 dark:text-blue-500/70",
          hoverClass: "hover:border-blue-300 dark:hover:border-blue-700/50"
        };
      case "backend": 
        return {
          gradientClass: "bg-gradient-to-r from-green-50 to-emerald-100 dark:from-green-900/30 dark:to-emerald-800/30",
          borderClass: "border-green-200/50 dark:border-green-800/30",
          textClass: "text-green-700 dark:text-green-400",
          categoryClass: "text-green-600/70 dark:text-green-500/70",
          hoverClass: "hover:border-green-300 dark:hover:border-green-700/50"
        };
      case "database": 
        return {
          gradientClass: "bg-gradient-to-r from-purple-50 to-pink-100 dark:from-purple-900/30 dark:to-pink-800/30",
          borderClass: "border-purple-200/50 dark:border-purple-800/30",
          textClass: "text-purple-700 dark:text-purple-400",
          categoryClass: "text-purple-600/70 dark:text-purple-500/70",
          hoverClass: "hover:border-purple-300 dark:hover:border-purple-700/50"
        };
      case "infrastructure": 
        return {
          gradientClass: "bg-gradient-to-r from-amber-50 to-yellow-100 dark:from-amber-900/30 dark:to-yellow-800/30",
          borderClass: "border-amber-200/50 dark:border-amber-800/30",
          textClass: "text-amber-700 dark:text-amber-400",
          categoryClass: "text-amber-600/70 dark:text-amber-500/70",
          hoverClass: "hover:border-amber-300 dark:hover:border-amber-700/50"
        };
      case "language": 
        return {
          gradientClass: "bg-gradient-to-r from-sky-50 to-blue-100 dark:from-sky-900/30 dark:to-blue-800/30",
          borderClass: "border-sky-200/50 dark:border-sky-800/30",
          textClass: "text-sky-700 dark:text-sky-400",
          categoryClass: "text-sky-600/70 dark:text-sky-500/70",
          hoverClass: "hover:border-sky-300 dark:hover:border-sky-700/50"
        };
      case "tools": 
        return {
          gradientClass: "bg-gradient-to-r from-rose-50 to-red-100 dark:from-rose-900/30 dark:to-red-800/30",
          borderClass: "border-rose-200/50 dark:border-rose-800/30",
          textClass: "text-rose-700 dark:text-rose-400",
          categoryClass: "text-rose-600/70 dark:text-rose-500/70",
          hoverClass: "hover:border-rose-300 dark:hover:border-rose-700/50"
        };
      default: 
        return {
          gradientClass: "bg-gradient-to-r from-blue-50 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-800/30",
          borderClass: "border-blue-200/50 dark:border-blue-800/30",
          textClass: "text-blue-700 dark:text-blue-400",
          categoryClass: "text-blue-600/70 dark:text-blue-500/70",
          hoverClass: "hover:border-blue-300 dark:hover:border-blue-700/50"
        };
    }
  };
  
  const { gradientClass, borderClass, textClass, categoryClass, hoverClass } = getCategoryInfo();
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ scale: 1.03, y: -2 }}
      className={`group relative flex flex-col items-center justify-center overflow-hidden rounded-xl border ${borderClass} ${gradientClass} p-5 text-center transition-all duration-300 hover:shadow-md ${hoverClass}`}
    >
      <div className="flex flex-col items-center">
        <span className={`font-medium text-base ${textClass}`}>{tech.name}</span>
        <span className={`mt-1 text-xs ${categoryClass}`}>{tech.category}</span>
      </div>
    </motion.div>
  )
}

// Timeline event component for the journey section
const TimelineEvent = ({ 
  year, 
  title, 
  description,
  icon,
  index
}: {
  year: string, 
  title: string, 
  description: string,
  icon: React.ReactNode,
  index: number
}) => {
  // Map index to specific color classes for variety
  const getColorClasses = () => {
    switch (index % 4) {
      case 0: return {
        bgClass: "bg-blue-100 dark:bg-blue-900/30",
        textClass: "text-blue-600 dark:text-blue-400",
        gradientClass: "from-blue-500/20 to-indigo-500/20 dark:from-blue-500/10 dark:to-indigo-500/10"
      };
      case 1: return {
        bgClass: "bg-purple-100 dark:bg-purple-900/30",
        textClass: "text-purple-600 dark:text-purple-400",
        gradientClass: "from-purple-500/20 to-pink-500/20 dark:from-purple-500/10 dark:to-pink-500/10"
      };
      case 2: return {
        bgClass: "bg-green-100 dark:bg-green-900/30",
        textClass: "text-green-600 dark:text-green-400",
        gradientClass: "from-green-500/20 to-emerald-500/20 dark:from-green-500/10 dark:to-emerald-500/10"
      };
      case 3: return {
        bgClass: "bg-amber-100 dark:bg-amber-900/30",
        textClass: "text-amber-600 dark:text-amber-400", 
        gradientClass: "from-amber-500/20 to-orange-500/20 dark:from-amber-500/10 dark:to-orange-500/10"
      };
      default: return {
        bgClass: "bg-blue-100 dark:bg-blue-900/30",
        textClass: "text-blue-600 dark:text-blue-400",
        gradientClass: "from-blue-500/20 to-indigo-500/20 dark:from-blue-500/10 dark:to-indigo-500/10"
      };
    }
  };
  
  const { bgClass, textClass, gradientClass } = getColorClasses();
  
  return (
    <motion.div 
      className="relative flex gap-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Timeline line and icon */}
      <div className="flex flex-col items-center">
        <div className={`flex h-12 w-12 items-center justify-center rounded-full ${bgClass} shadow-sm z-10`}>
          <div className={textClass}>{icon}</div>
        </div>
        {index !== 3 && <div className="h-full w-0.5 bg-border" />}
      </div>
      
      {/* Content */}
      <div className="pb-10">
        <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-2">
          {year}
        </div>
        <h3 className="mt-1 text-xl font-medium text-foreground">{title}</h3>
        <div className={`mt-4 p-4 rounded-lg bg-gradient-to-br ${gradientClass} border border-border/40`}>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

const WhoWeAreContent = () => {
  // Add a unique key to force component re-rendering and prevent stale cache issues
  const [mountKey, setMountKey] = useState<string>("")
  
  useEffect(() => {
    // Generate a unique key on component mount
    setMountKey(`who-we-are-${Date.now()}`)
  }, [])

  return (
    <div className="bg-background" key={mountKey}>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 bg-grid-white/5 bg-[size:100px_100px] opacity-25" />
        <div className="absolute top-0 right-0 -mt-96 -mr-96 opacity-40">
          <div className="aspect-square h-[800px] rounded-full bg-gradient-to-br from-primary/40 to-indigo-500/30 blur-[200px]" />
        </div>
        <div className="absolute bottom-0 left-0 -mb-96 -ml-96 opacity-40">
          <div className="aspect-square h-[800px] rounded-full bg-gradient-to-tr from-blue-500/30 to-purple-500/20 blur-[200px]" />
        </div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-[120px] mix-blend-multiply"></div>

        <div className="relative mx-auto max-w-[94%] px-4 pt-20 pb-20 sm:px-6 md:max-w-[90%] lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
              About Cadogy
            </div>
            <h1 className="font-bold tracking-tight text-foreground text-4xl sm:text-5xl lg:text-6xl">
              <span className="block">Transforming ideas into</span>
              <span className="py-2 block bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
                digital solutions
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              We&apos;re a dedicated team driven by innovation, technical excellence, and a passion for creating impactful digital experiences.
            </p>
            
            <div className="mt-10 flex justify-center gap-4 flex-col sm:flex-row">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center space-x-2 rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90"
              >
                <span>Get in Touch</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/services"
                className="group inline-flex items-center justify-center rounded-md bg-card border border-border px-6 py-3 text-sm font-medium text-foreground transition-all hover:bg-muted"
              >
                <span>Explore Our Services</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="relative bg-background overflow-hidden">
        <div className="relative z-10 mx-auto max-w-[94%] px-4 pt-16 pb-16 sm:px-6 md:max-w-[90%] md:py-24 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
          >
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
                Our Mission
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
                We see ourselves not just as a business, but as passionate individuals on a shared journey of growth, learning, and transformation. Our mission is to empower creators, businesses, and innovators with tools that not only solve problems but spark change.
              </p>
            </div>
            
            <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
              <motion.div
                className="relative overflow-hidden rounded-xl bg-card border border-border shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{ y: -4 }}
              >
                <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
                <div className="p-6">
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 p-3">
                    <Code className="h-6 w-6 text-white" strokeWidth={1.5} />
                  </div>
                  <h3 className="mb-3 text-xl font-medium text-foreground">Technical Innovation</h3>
                  <p className="text-muted-foreground">
                    We&apos;re committed to staying at the forefront of technology, continuously learning and pushing boundaries to create solutions that matter.
                  </p>
                </div>
              </motion.div>
              
              <motion.div
                className="relative overflow-hidden rounded-xl bg-card border border-border shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ y: -4 }}
              >
                <div className="h-2 bg-gradient-to-r from-purple-500 to-pink-500"></div>
                <div className="p-6">
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 p-3">
                    <Globe className="h-6 w-6 text-white" strokeWidth={1.5} />
                  </div>
                  <h3 className="mb-3 text-xl font-medium text-foreground">Global Impact</h3>
                  <p className="text-muted-foreground">
                    Every solution we develop is designed to make a meaningful difference in how businesses operate and people connect in our digital world.
                  </p>
                </div>
              </motion.div>
              
              <motion.div
                className="relative overflow-hidden rounded-xl bg-card border border-border shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ y: -4 }}
              >
                <div className="h-2 bg-gradient-to-r from-green-500 to-emerald-500"></div>
                <div className="p-6">
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 p-3">
                    <Shield className="h-6 w-6 text-white" strokeWidth={1.5} />
                  </div>
                  <h3 className="mb-3 text-xl font-medium text-foreground">Ethical Standards</h3>
                  <p className="text-muted-foreground">
                    We uphold the highest ethical standards in cybersecurity and digital rights management, ensuring our solutions protect and empower.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Members Section */}
      <section className="relative bg-background overflow-hidden">
        <div className="relative z-10 mx-auto max-w-[94%] px-4 pt-16 pb-16 sm:px-6 md:max-w-[90%] md:py-24 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
              Leadership Team
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Bringing together decades of combined experience in technology, security, and digital strategy
            </p>
          </motion.div>

          <div className="mt-16 space-y-16">
            {/* Charles Knapp Card */}
            <motion.div 
              className="overflow-hidden rounded-xl bg-card border border-border shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3">
                <div className="md:col-span-1 bg-gradient-to-br from-blue-900/30 to-indigo-900/30 p-6 flex items-center justify-center relative overflow-hidden">
                  <div className="relative z-10">
                    <div className="h-56 w-56 overflow-hidden rounded-lg shadow-lg">
                      <img
                        src={addCacheBuster("/images/authors/charles_k_author.jpg")}
                        alt="Charles Knapp"
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    <div className="mt-4 text-center">
                      <h3 className="text-xl font-medium text-white">Charles Knapp</h3>
                      <p className="text-sm text-white/70">Chief Technology Officer</p>
                    </div>
                  </div>
                </div>
                
                <div className="md:col-span-2 p-6 md:p-8">
                  <div className="inline-flex items-center rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-500 dark:text-blue-400 mb-4">
                    Co-Founder
                  </div>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      Charles Knapp is a distinguished expert in cybersecurity and digital infrastructure with a proven track record of delivering enterprise-grade solutions. His methodical approach to system architecture and security implementation has helped numerous organizations establish robust digital frameworks that withstand modern cybersecurity challenges.
                    </p>
                    <p className="text-muted-foreground">
                      As CTO, Charles leads our technical strategy and implementation, specializing in deploying advanced DNS security protocols and developing proprietary anti-piracy technologies. His architectural expertise spans cloud infrastructure optimization, high-availability systems, and secure application development using the MERN stack ecosystem.
                    </p>
                    
                    <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="rounded-lg bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100/50 dark:border-blue-800/20 p-4">
                        <h4 className="text-sm font-medium text-foreground mb-2">Core Expertise</h4>
                        <div className="flex flex-wrap gap-2">
                          <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">Enterprise Security</span>
                          <span className="rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400">Infrastructure Design</span>
                          <span className="rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">DDoS Protection</span>
                          <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">System Architecture</span>
                        </div>
                      </div>
                      <div className="rounded-lg bg-indigo-50/50 dark:bg-indigo-900/10 border border-indigo-100/50 dark:border-indigo-800/20 p-4">
                        <h4 className="text-sm font-medium text-foreground mb-2">Technical Leadership</h4>
                        <div className="flex flex-wrap gap-2">
                          <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">Application Security</span>
                          <span className="rounded-full bg-teal-100 px-2.5 py-0.5 text-xs font-medium text-teal-800 dark:bg-teal-900/30 dark:text-teal-400">Cloud Infrastructure</span>
                          <span className="rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">IP Protection</span>
                        </div>
                      </div>
                    </div>

                    {/* Social links */}
                    <div className="pt-4 flex items-center gap-2">
                      <a href="https://www.linkedin.com/in/knappcharles/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile" className="bg-card/80 hover:bg-card border border-border rounded-full p-2 transition-colors">
                        <svg className="h-4 w-4 text-foreground" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                      </a>
                      <a href="mailto:charles@cadogy.com" aria-label="Email Contact" className="bg-card/80 hover:bg-card border border-border rounded-full p-2 transition-colors">
                        <svg className="h-4 w-4 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Dylan Safra Card */}
            <motion.div 
              className="overflow-hidden rounded-xl bg-card border border-border shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3">
                <div className="md:col-span-1 bg-gradient-to-br from-green-900/30 to-emerald-900/30 p-6 flex items-center justify-center relative overflow-hidden">
                  <div className="relative z-10">
                    <div className="h-56 w-56 overflow-hidden rounded-lg shadow-lg">
                      <img
                        src={addCacheBuster("/images/authors/dylan_s_author.jpg")}
                        alt="Dylan Safra"
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    <div className="mt-4 text-center">
                      <h3 className="text-xl font-medium text-white">Dylan Safra</h3>
                      <p className="text-sm text-white/70">Chief Strategy Officer</p>
                    </div>
                  </div>
                </div>
                
                <div className="md:col-span-2 p-6 md:p-8">
                  <div className="inline-flex items-center rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-500 dark:text-green-400 mb-4">
                    Co-Founder
                  </div>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      Dylan Safra is an accomplished digital strategist with extensive experience in data-driven business transformation and growth optimization. Combining technical proficiency with strategic vision, he has successfully led numerous enterprise clients through digital transformations that deliver measurable business outcomes and competitive advantages.
                    </p>
                    <p className="text-muted-foreground">
                      As CSO, Dylan directs our product strategy and client solutions, leveraging his expertise in SEO optimization, automation systems, and performance analytics. His integrated approach to technology deployment ensures our solutions not only meet technical requirements but drive tangible business value through enhanced user experiences and operational efficiencies.
                    </p>
                    
                    <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="rounded-lg bg-green-50/50 dark:bg-green-900/10 border border-green-100/50 dark:border-green-800/20 p-4">
                        <h4 className="text-sm font-medium text-foreground mb-2">Core Expertise</h4>
                        <div className="flex flex-wrap gap-2">
                          <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">Digital Strategy</span>
                          <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">Search Optimization</span>
                          <span className="rounded-full bg-rose-100 px-2.5 py-0.5 text-xs font-medium text-rose-800 dark:bg-rose-900/30 dark:text-rose-400">Process Automation</span>
                          <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">Growth Engineering</span>
                        </div>
                      </div>
                      <div className="rounded-lg bg-emerald-50/50 dark:bg-emerald-900/10 border border-emerald-100/50 dark:border-emerald-800/20 p-4">
                        <h4 className="text-sm font-medium text-foreground mb-2">Strategic Leadership</h4>
                        <div className="flex flex-wrap gap-2">
                          <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">Data Analysis</span>
                          <span className="rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">Market Positioning</span>
                          <span className="rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">Client Solutions</span>
                        </div>
                      </div>
                    </div>

                    {/* Social links */}
                    <div className="pt-4 flex items-center gap-2">
                      <a href="https://www.linkedin.com/in/dylansafra" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile" className="bg-card/80 hover:bg-card border border-border rounded-full p-2 transition-colors">
                        <svg className="h-4 w-4 text-foreground" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                      </a>
                      <a href="mailto:dylan@cadogy.com" aria-label="Email Contact" className="bg-card/80 hover:bg-card border border-border rounded-full p-2 transition-colors">
                        <svg className="h-4 w-4 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="relative bg-neutral-900/30 border-y border-border overflow-hidden">
        {/* Decorative blur elements */}
        <div className="absolute top-1/4 right-0 w-[700px] h-[700px] bg-gradient-to-bl from-primary/10 via-blue-500/5 to-transparent rounded-full blur-[250px] -translate-y-1/2 translate-x-1/3 pointer-events-none opacity-40"></div>
        <div className="absolute bottom-1/4 left-0 w-[700px] h-[700px] bg-gradient-to-tr from-indigo-500/10 via-purple-500/5 to-transparent rounded-full blur-[250px] translate-y-1/2 -translate-x-1/3 pointer-events-none opacity-40"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-sky-500/5 rounded-full blur-[120px] mix-blend-overlay"></div>
        <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-rose-500/5 rounded-full blur-[80px] mix-blend-multiply"></div>
        
        <div className="relative z-10 mx-auto max-w-[94%] px-4 pt-16 pb-16 sm:px-6 md:max-w-[90%] md:py-24 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl text-center"
          >
            <h2 className="text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
              Our Tech Stack
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              We&apos;re proficient in a broad range of technologies across multiple domains, allowing us to build comprehensive solutions tailored to each project&apos;s unique requirements.
            </p>
          </motion.div>

          <div className="relative mt-12 mb-16">
            <div className="grid gap-5 grid-cols-1 md:grid-cols-3 lg:grid-cols-6">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="col-span-1 md:col-span-3 lg:col-span-2 rounded-xl bg-blue-50/40 dark:bg-blue-900/20 border border-blue-200/50 dark:border-blue-800/30 p-4"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-4 w-4 rounded-full bg-blue-500/70"></div>
                  <h3 className="text-sm font-medium text-blue-700 dark:text-blue-400">Frontend</h3>
                </div>
                <p className="text-xs text-muted-foreground">Modern UI frameworks and libraries for building responsive, interactive user interfaces and web applications.</p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="col-span-1 md:col-span-3 lg:col-span-2 rounded-xl bg-green-50/40 dark:bg-green-900/20 border border-green-200/50 dark:border-green-800/30 p-4"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-4 w-4 rounded-full bg-green-500/70"></div>
                  <h3 className="text-sm font-medium text-green-700 dark:text-green-400">Backend</h3>
                </div>
                <p className="text-xs text-muted-foreground">Server-side frameworks and technologies that power our applications, APIs, and business logic implementations.</p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="col-span-1 md:col-span-3 lg:col-span-2 rounded-xl bg-purple-50/40 dark:bg-purple-900/20 border border-purple-200/50 dark:border-purple-800/30 p-4"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-4 w-4 rounded-full bg-purple-500/70"></div>
                  <h3 className="text-sm font-medium text-purple-700 dark:text-purple-400">Database</h3>
                </div>
                <p className="text-xs text-muted-foreground">Data storage solutions, both SQL and NoSQL, to efficiently manage, query, and scale your application data.</p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="col-span-1 md:col-span-3 lg:col-span-2 rounded-xl bg-amber-50/40 dark:bg-amber-900/20 border border-amber-200/50 dark:border-amber-800/30 p-4"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-4 w-4 rounded-full bg-amber-500/70"></div>
                  <h3 className="text-sm font-medium text-amber-700 dark:text-amber-400">Infrastructure</h3>
                </div>
                <p className="text-xs text-muted-foreground">Cloud platforms, containerization, and DevOps tools to ensure reliable, scalable, and secure deployment environments.</p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="col-span-1 md:col-span-3 lg:col-span-2 rounded-xl bg-sky-50/40 dark:bg-sky-900/20 border border-sky-200/50 dark:border-sky-800/30 p-4"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-4 w-4 rounded-full bg-sky-500/70"></div>
                  <h3 className="text-sm font-medium text-sky-700 dark:text-sky-400">Languages</h3>
                </div>
                <p className="text-xs text-muted-foreground">Programming languages we leverage to develop everything from interactive frontends to high-performance backends.</p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="col-span-1 md:col-span-3 lg:col-span-2 rounded-xl bg-rose-50/40 dark:bg-rose-900/20 border border-rose-200/50 dark:border-rose-800/30 p-4"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-4 w-4 rounded-full bg-rose-500/70"></div>
                  <h3 className="text-sm font-medium text-rose-700 dark:text-rose-400">Tools & Platforms</h3>
                </div>
                <p className="text-xs text-muted-foreground">Development tools, CMS platforms, and e-commerce solutions that extend our capabilities for specialized use cases.</p>
              </motion.div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {technologies.map((tech, index) => (
              <TechItem key={tech.name} tech={tech} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-background">
        <div className="mx-auto max-w-[94%] px-4 pt-16 pb-16 lg:pb-0 sm:px-6 md:max-w-[90%] md:py-24 lg:px-8">
            <motion.div
            className="rounded-xl border border-border overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            {/* Decorative gradient top border */}
            <div className="h-2 bg-gradient-to-r from-blue-500 via-primary to-indigo-500"></div>
            
            <div className="relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-primary/10 via-blue-500/5 to-transparent rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-blue-500/10 via-indigo-500/5 to-transparent rounded-full blur-[150px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-[60px] opacity-50"></div>
              
              <div className="relative z-10 p-8 md:p-12 lg:p-16 text-center">
                <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
                  Let&apos;s Collaborate
                </div>
                <h2 className="text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
                  Ready to work with us?
                </h2>
                <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
                  Let&apos;s transform your ideas into powerful digital solutions. Get in touch with our team today.
                </p>
                <div className="mt-10 flex flex-col md:flex-row justify-center gap-4">
                  <Link
                    href="/contact"
                    className="group inline-flex items-center justify-center space-x-2 rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90"
                  >
                    <span>Contact Us</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="/our-charter"
                    className="group inline-flex items-center justify-center rounded-md bg-card border border-border px-6 py-3 text-sm font-medium text-foreground transition-all hover:bg-muted"
                  >
                    <span>Read Our Charter</span>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      </div>
  )
}

export default WhoWeAreContent

