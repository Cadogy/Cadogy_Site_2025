"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight, Github, Linkedin, Youtube } from "lucide-react"

import { siteConfig } from "@/config/site"

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      when: "beforeChildren",
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
}

const socialIconVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  hover: {
    scale: 1.15,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
}

export function Footer() {
  const [hoveredText, setHoveredText] = useState(siteConfig.name)

  const alphabet =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890"
  const textCipherEffect = (text: string) => {
    let iterations = 0
    const interval = setInterval(() => {
      setHoveredText((prevText) =>
        prevText
          .split("")
          .map((char, index) => {
            if (index < iterations) {
              return text[index]
            }
            return alphabet[Math.floor(Math.random() * alphabet.length)]
          })
          .join("")
      )
      iterations += 1 / 2
      if (iterations >= text.length) clearInterval(interval)
    }, 50)
  }

  const handleMouseEnter = () => {
    textCipherEffect(siteConfig.name)
  }

  const handleMouseLeave = () => {
    setHoveredText(siteConfig.name)
  }

  return (
    <footer className="relative w-full bg-neutral-900/10 backdrop-blur-sm dark:bg-neutral-900/40">
      {/* Gradient blend at top */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background to-transparent"></div>

      <motion.div
        className="relative mx-auto w-full px-6 py-12 sm:px-8 md:max-w-[90%] md:px-10 md:py-16 lg:px-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        {/* Logo and Description */}
        <div className="mb-10 flex flex-col items-start justify-center space-y-4 md:mb-16 md:flex-row md:items-center md:justify-between md:space-y-0">
          <motion.div variants={itemVariants} className="flex items-center">
            <div className="relative h-8 w-8 md:h-10 md:w-10">
              <Image
                src="/images/assets/logos/cadogy-shield.svg"
                alt="Cadogy Logo"
                fill
                className="object-contain"
              />
            </div>
            <h2
              className="ml-3 text-lg font-bold text-foreground md:text-xl"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {hoveredText}
            </h2>
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="max-w-md text-left text-sm text-muted-foreground md:text-right md:text-base"
          >
            Cadogy is a web development agency in Pompano Beach, FL, crafting
            custom websites, fullstack apps, and secure infrastructure that help
            businesses grow online.
          </motion.div>
        </div>

        {/* Navigation Grid */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-4 md:gap-x-8 md:gap-y-0 lg:gap-x-16">
          {/* Column 1 - Company */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col space-y-3 md:space-y-6"
          >
            <h3 className="text-sm font-medium text-foreground md:text-lg">
              Company
            </h3>
            <ul className="flex flex-col space-y-2 md:space-y-4">
              <motion.li variants={itemVariants}>
                <Link
                  href="/who-we-are"
                  className="flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground md:text-base"
                  tabIndex={0}
                  aria-label="Who We Are"
                  onKeyDown={(e) =>
                    e.key === "Enter" && e.currentTarget.click()
                  }
                >
                  <span>Who We Are</span>
                  <motion.span
                    className="ml-1 inline-block"
                    initial={{ x: 0 }}
                    whileHover={{ x: 2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowUpRight className="h-3 w-3 md:h-4 md:w-4" />
                  </motion.span>
                </Link>
              </motion.li>
              <motion.li variants={itemVariants}>
                <Link
                  href="/our-charter"
                  className="flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground md:text-base"
                  tabIndex={0}
                  aria-label="Our Charter"
                  onKeyDown={(e) =>
                    e.key === "Enter" && e.currentTarget.click()
                  }
                >
                  <span>Our Charter</span>
                  <motion.span
                    className="ml-1 inline-block"
                    initial={{ x: 0 }}
                    whileHover={{ x: 2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowUpRight className="h-3 w-3 md:h-4 md:w-4" />
                  </motion.span>
                </Link>
              </motion.li>
            </ul>
          </motion.div>

          {/* Column 2 - Account */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col space-y-3 md:space-y-6"
          >
            <h3 className="text-sm font-medium text-foreground md:text-lg">
              Account
            </h3>
            <ul className="flex flex-col space-y-2 md:space-y-4">
              <motion.li variants={itemVariants}>
                <Link
                  href="/dashboard"
                  className="flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground md:text-base"
                  tabIndex={0}
                  aria-label="Dashboard"
                  onKeyDown={(e) =>
                    e.key === "Enter" && e.currentTarget.click()
                  }
                >
                  <span>Dashboard</span>
                  <motion.span
                    className="ml-1 inline-block"
                    initial={{ x: 0 }}
                    whileHover={{ x: 2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowUpRight className="h-3 w-3 md:h-4 md:w-4" />
                  </motion.span>
                </Link>
              </motion.li>
              <motion.li variants={itemVariants}>
                <Link
                  href="/dashboard/usage"
                  className="flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground md:text-base"
                  tabIndex={0}
                  aria-label="Usage"
                  onKeyDown={(e) =>
                    e.key === "Enter" && e.currentTarget.click()
                  }
                >
                  <span>Usage</span>
                  <motion.span
                    className="ml-1 inline-block"
                    initial={{ x: 0 }}
                    whileHover={{ x: 2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowUpRight className="h-3 w-3 md:h-4 md:w-4" />
                  </motion.span>
                </Link>
              </motion.li>
            </ul>
          </motion.div>

          {/* Column 3 - Resources */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col space-y-3 md:space-y-6"
          >
            <h3 className="text-sm font-medium text-foreground md:text-lg">
              Resources
            </h3>
            <ul className="flex flex-col space-y-2 md:space-y-4">
              <motion.li variants={itemVariants}>
                <Link
                  href="/articles"
                  className="flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground md:text-base"
                  tabIndex={0}
                  aria-label="Articles"
                  onKeyDown={(e) =>
                    e.key === "Enter" && e.currentTarget.click()
                  }
                >
                  <span>Articles</span>
                  <motion.span
                    className="ml-1 inline-block"
                    initial={{ x: 0 }}
                    whileHover={{ x: 2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowUpRight className="h-3 w-3 md:h-4 md:w-4" />
                  </motion.span>
                </Link>
              </motion.li>
              <motion.li variants={itemVariants}>
                <Link
                  href="/contact"
                  className="flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground md:text-base"
                  tabIndex={0}
                  aria-label="Contact Us"
                  onKeyDown={(e) =>
                    e.key === "Enter" && e.currentTarget.click()
                  }
                >
                  <span>Contact Us</span>
                  <motion.span
                    className="ml-1 inline-block"
                    initial={{ x: 0 }}
                    whileHover={{ x: 2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowUpRight className="h-3 w-3 md:h-4 md:w-4" />
                  </motion.span>
                </Link>
              </motion.li>
            </ul>
          </motion.div>

          {/* Column 4 - Policies */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col space-y-3 md:space-y-6"
          >
            <h3 className="text-sm font-medium text-foreground md:text-lg">
              Policies
            </h3>
            <ul className="flex flex-col space-y-2 md:space-y-4">
              <motion.li variants={itemVariants}>
                <Link
                  href="/policies/terms-of-use"
                  className="flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground md:text-base"
                  tabIndex={0}
                  aria-label="Terms of Use"
                  onKeyDown={(e) =>
                    e.key === "Enter" && e.currentTarget.click()
                  }
                >
                  <span>Terms of Use</span>
                  <motion.span
                    className="ml-1 inline-block"
                    initial={{ x: 0 }}
                    whileHover={{ x: 2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowUpRight className="h-3 w-3 md:h-4 md:w-4" />
                  </motion.span>
                </Link>
              </motion.li>
              <motion.li variants={itemVariants}>
                <Link
                  href="/policies/privacy-policy"
                  className="flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground md:text-base"
                  tabIndex={0}
                  aria-label="Privacy Policy"
                  onKeyDown={(e) =>
                    e.key === "Enter" && e.currentTarget.click()
                  }
                >
                  <span>Privacy Policy</span>
                  <motion.span
                    className="ml-1 inline-block"
                    initial={{ x: 0 }}
                    whileHover={{ x: 2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowUpRight className="h-3 w-3 md:h-4 md:w-4" />
                  </motion.span>
                </Link>
              </motion.li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <div className="mt-10 flex flex-col items-center justify-between gap-6 border-t border-border pt-6 md:mt-16 md:flex-row md:pt-10">
          <p className="text-center text-xs text-muted-foreground md:text-left md:text-sm">
            © {new Date().getFullYear()} {siteConfig.name}. All rights
            reserved.
          </p>

          {/* Social Icons */}
          <div className="flex items-center space-x-6">
            <motion.a
              href="https://x.com/Cadogy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition hover:text-foreground"
              aria-label="X (Twitter)"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && e.currentTarget.click()}
              variants={socialIconVariants}
              whileHover="hover"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                viewBox="0 0 17 17"
                fill="none"
                className="h-5 w-5 md:h-6 md:w-6"
              >
                <path
                  fill="currentColor"
                  d="M13.158 2.058h2.248l-4.913 5.435 5.78 7.395h-4.525l-3.545-4.485-4.056 4.485h-2.25l5.255-5.813-5.545-7.017h4.64l3.205 4.1 3.706-4.1Zm-.79 11.527h1.246L5.57 3.293H4.233l8.135 10.292Z"
                />
              </svg>
            </motion.a>
            {/* <motion.a
              href="https://www.youtube.com/Cadogy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition hover:text-foreground"
              aria-label="YouTube"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && e.currentTarget.click()}
              variants={socialIconVariants}
              whileHover="hover"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                viewBox="0 0 17 17"
                fill="none"
                className="h-5 w-5 md:h-6 md:w-6"
              >
                <path
                  fill="currentColor"
                  d="M16.79 5.475s-.156-1.067-.637-1.536c-.61-.617-1.29-.62-1.603-.656-2.238-.158-5.597-.158-5.597-.158h-.006s-3.36 0-5.597.158c-.313.036-.994.039-1.603.656-.481.469-.635 1.536-.635 1.536S.95 6.73.95 7.982v1.174c0 1.252.16 2.507.16 2.507s.156 1.067.634 1.536c.61.617 1.41.596 1.765.662 1.282.118 5.441.154 5.441.154s3.363-.006 5.6-.16c.313-.036.994-.04 1.603-.656.481-.469.638-1.536.638-1.536s.159-1.252.159-2.507V7.982c0-1.252-.16-2.507-.16-2.507ZM7.298 10.58V6.228l4.322 2.184-4.322 2.168Z"
                />
              </svg>
            </motion.a> */}
            <motion.a
              href="https://www.linkedin.com/company/Cadogy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition hover:text-foreground"
              aria-label="LinkedIn"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && e.currentTarget.click()}
              variants={socialIconVariants}
              whileHover="hover"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                viewBox="0 0 17 17"
                fill="none"
                className="h-5 w-5 md:h-6 md:w-6"
              >
                <path
                  fill="currentColor"
                  d="M3.894 2.833c0 .844-.677 1.524-1.515 1.524-.838 0-1.514-.68-1.514-1.524 0-.844.676-1.524 1.514-1.524.838 0 1.515.68 1.515 1.524ZM.985 5.278h2.81v8.472H.985V5.278Zm5.853 0h2.692v1.16h.038c.374-.683 1.292-1.403 2.66-1.403 2.842 0 3.363 1.872 3.363 4.303v4.412h-2.81V9.668c0-.919-.016-2.1-1.28-2.1-1.282 0-1.479 1.001-1.479 2.034v4.147H6.838V5.278Z"
                />
              </svg>
            </motion.a>
          </div>
        </div>
      </motion.div>
    </footer>
  )
}
