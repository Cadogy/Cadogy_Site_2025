import React from 'react'
import { motion } from "framer-motion"
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

// Define gradients for cards
const gradients = {
    cybersecurity: "bg-gradient-to-r from-blue-600 via-blue-400 to-indigo-400",
    webDev:
      "bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-yellow-500 via-purple-500 to-red-500",
    performance: "bg-gradient-to-bl from-green-400 via-emerald-400 to-teal-400",
    piracy: "bg-gradient-to-tl from-orange-500 via-amber-500 to-yellow-400",
    dataAnalytics:
      "bg-[conic-gradient(at_bottom_left,_var(--tw-gradient-stops))] from-indigo-500 via-purple-500 to-pink-500",
    digitalRights:
      "bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-blue-600 via-purple-600 to-orange-500",
    cloudSolutions: "bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600",
    aiMl: "bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-fuchsia-500 via-purple-600 to-blue-700",
  }

// Animation variants for staggered animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
}

const serviceSection = () => {
  return (
    <>
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col items-center py-6 text-center">
            <h2 className="mb-4 text-3xl font-medium tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Our Services
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              We provide cutting-edge solutions in cybersecurity, web
              development, and digital rights management, helping businesses
              achieve their technological goals securely and efficiently.
            </p>
          </div>
        </motion.div>

        {/* Service Cards Grid - Using Gradient Cards */}
        <motion.div
            className="grid grid-cols-2 gap-4 gap-y-6 sm:gap-6 md:grid-cols-3 lg:grid-cols-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
        >
            {/* Card 1 - Cybersecurity */}
            <motion.div variants={itemVariants}>
            <div
                className={`group relative aspect-square overflow-hidden rounded-lg ${gradients.cybersecurity} p-4 transition-all duration-300 sm:p-6`}
            >
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-background/5 to-background/20" />
                <div className="relative z-10 flex h-full flex-col">
                <Lock
                    className="mb-2 h-5 w-5 text-white/90 sm:mb-0 sm:h-8 sm:w-8"
                    strokeWidth={1.5}
                />
                <div className="mt-auto">
                    <h4 className="text-sm font-medium text-white sm:text-lg">
                    Advanced Cybersecurity
                    </h4>
                    <p className="mt-1 line-clamp-3 text-xs text-white/80 sm:mt-2 sm:line-clamp-none sm:text-sm">
                    Comprehensive security solutions including DNS security,
                    encryption and system protection.
                    </p>
                </div>
                </div>
            </div>
            </motion.div>

            {/* Card 2 - Web Development */}
            <motion.div variants={itemVariants}>
            <div
                className={`group relative aspect-square overflow-hidden rounded-lg ${gradients.webDev} p-4 transition-all duration-300 sm:p-6`}
            >
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-background/5 to-background/20" />
                <div className="relative z-10 flex h-full flex-col">
                <Code
                    className="mb-2 h-5 w-5 text-white/90 sm:mb-0 sm:h-8 sm:w-8"
                    strokeWidth={1.5}
                />
                <div className="mt-auto">
                    <h4 className="text-sm font-medium text-white sm:text-lg">
                    Modern Web Development
                    </h4>
                    <p className="mt-1 line-clamp-3 text-xs text-white/80 sm:mt-2 sm:line-clamp-none sm:text-sm">
                    Full-stack development with modern frameworks like Next.js
                    and TailwindCSS.
                    </p>
                </div>
                </div>
            </div>
            </motion.div>

            {/* Card 3 - Performance */}
            <motion.div variants={itemVariants}>
            <div
                className={`group relative aspect-square overflow-hidden rounded-lg ${gradients.performance} p-4 transition-all duration-300 sm:p-6`}
            >
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-background/5 to-background/20" />
                <div className="relative z-10 flex h-full flex-col">
                <Gauge
                    className="mb-2 h-5 w-5 text-white/90 sm:mb-0 sm:h-8 sm:w-8"
                    strokeWidth={1.5}
                />
                <div className="mt-auto">
                    <h4 className="text-sm font-medium text-white sm:text-lg">
                    Performance Optimization
                    </h4>
                    <p className="mt-1 line-clamp-3 text-xs text-white/80 sm:mt-2 sm:line-clamp-none sm:text-sm">
                    Streamlining digital information and solutions for maximum
                    efficiency and performance.
                    </p>
                </div>
                </div>
            </div>
            </motion.div>

            {/* Card 4 - Anti-Piracy */}
            <motion.div variants={itemVariants}>
            <div
                className={`group relative aspect-square overflow-hidden rounded-lg ${gradients.piracy} p-4 transition-all duration-300 sm:p-6`}
            >
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-background/5 to-background/20" />
                <div className="relative z-10 flex h-full flex-col">
                <Zap
                    className="mb-2 h-5 w-5 text-white/90 sm:mb-0 sm:h-8 sm:w-8"
                    strokeWidth={1.5}
                />
                <div className="mt-auto">
                    <h4 className="text-sm font-medium text-white sm:text-lg">
                    Security Solutions
                    </h4>
                    <p className="mt-1 line-clamp-3 text-xs text-white/80 sm:mt-2 sm:line-clamp-none sm:text-sm">
                    Cutting-edge content and information protection for digital
                    assets and your website.
                    </p>
                </div>
                </div>
            </div>
            </motion.div>

            {/* Card 5 - Data Analytics */}
            <motion.div variants={itemVariants}>
            <div
                className={`group relative aspect-square overflow-hidden rounded-lg ${gradients.dataAnalytics} p-4 transition-all duration-300 sm:p-6`}
            >
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-background/5 to-background/20" />
                <div className="relative z-10 flex h-full flex-col">
                <BarChart3
                    className="mb-2 h-5 w-5 text-white/90 sm:mb-0 sm:h-8 sm:w-8"
                    strokeWidth={1.5}
                />
                <div className="mt-auto">
                    <h4 className="text-sm font-medium text-white sm:text-lg">
                    Data-Driven Analytics
                    </h4>
                    <p className="mt-1 line-clamp-3 text-xs text-white/80 sm:mt-2 sm:line-clamp-none sm:text-sm">
                    Strategic insights through advanced data analysis and
                    artificial intelligence.
                    </p>
                </div>
                </div>
            </div>
            </motion.div>

            {/* Card 6 - Digital Rights */}
            <motion.div variants={itemVariants}>
            <div
                className={`group relative aspect-square overflow-hidden rounded-lg ${gradients.digitalRights} p-4 transition-all duration-300 sm:p-6`}
            >
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-background/5 to-background/20" />
                <div className="relative z-10 flex h-full flex-col">
                <Users
                    className="mb-2 h-5 w-5 text-white/90 sm:mb-0 sm:h-8 sm:w-8"
                    strokeWidth={1.5}
                />
                <div className="mt-auto">
                    <h4 className="text-sm font-medium text-white sm:text-lg">
                    Digital Rights Management
                    </h4>
                    <p className="mt-1 line-clamp-3 text-xs text-white/80 sm:mt-2 sm:line-clamp-none sm:text-sm">
                    Systems for managing digital rights and permissions for
                    end-users and administration.
                    </p>
                </div>
                </div>
            </div>
            </motion.div>

            {/* Card 7 - Cloud Solutions */}
            <motion.div variants={itemVariants}>
            <div
                className={`group relative aspect-square overflow-hidden rounded-lg ${gradients.cloudSolutions} p-4 transition-all duration-300 sm:p-6`}
            >
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-background/5 to-background/20" />
                <div className="relative z-10 flex h-full flex-col">
                <Cloud
                    className="mb-2 h-5 w-5 text-white/90 sm:mb-0 sm:h-8 sm:w-8"
                    strokeWidth={1.5}
                />
                <div className="mt-auto">
                    <h4 className="text-sm font-medium text-white sm:text-lg">
                    Cloud Infrastructure
                    </h4>
                    <p className="mt-1 line-clamp-3 text-xs text-white/80 sm:mt-2 sm:line-clamp-none sm:text-sm">
                    Scalable and secure cloud server solutions for businesses of
                    all sizes and industries.
                    </p>
                </div>
                </div>
            </div>
            </motion.div>

            {/* Card 8 - AI & Machine Learning */}
            <motion.div variants={itemVariants}>
            <div
                className={`group relative aspect-square overflow-hidden rounded-lg ${gradients.aiMl} p-4 transition-all duration-300 sm:p-6`}
            >
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-background/5 to-background/20" />
                <div className="relative z-10 flex h-full flex-col">
                <Brain
                    className="mb-2 h-5 w-5 text-white/90 sm:mb-0 sm:h-8 sm:w-8"
                    strokeWidth={1.5}
                />
                <div className="mt-auto">
                    <h4 className="text-sm font-medium text-white sm:text-lg">
                    AI & Machine Learning
                    </h4>
                    <p className="mt-1 line-clamp-3 text-xs text-white/80 sm:mt-2 sm:line-clamp-none sm:text-sm">
                    Custom AI solutions and machine learning models for advanced
                    data processing.
                    </p>
                </div>
                </div>
            </div>
            </motion.div>
        </motion.div>
    </>
  )
}

export default serviceSection