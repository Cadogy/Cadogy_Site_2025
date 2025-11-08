"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight, Github, Instagram, Linkedin } from "lucide-react"

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
  const [siteName, setSiteName] = useState(siteConfig.name)
  const [hoveredText, setHoveredText] = useState(siteConfig.name)
  const [footerDescription, setFooterDescription] = useState(
    "Crafting exceptional digital experiences through innovative web development, secure infrastructure, and custom solutions for businesses in South Florida and beyond."
  )
  const [contactEmail, setContactEmail] = useState("hello@cadogy.com")
  const [contactAddress, setContactAddress] = useState("Pompano Beach, FL")
  const [socialInstagram, setSocialInstagram] = useState(
    "https://www.instagram.com/cadogyweb"
  )
  const [socialGithub, setSocialGithub] = useState(
    "https://www.github.com/cadogy"
  )
  const [socialLinkedin, setSocialLinkedin] = useState(
    "https://www.linkedin.com/company/cadogy"
  )

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch("/api/settings")
        if (response.ok) {
          const data = await response.json()
          if (data.settings) {
            if (data.settings.siteName) {
              const name = data.settings.siteName.split(" - ")[0]
              setSiteName(name)
              setHoveredText(name)
            }
            if (data.settings.footerDescription) {
              setFooterDescription(data.settings.footerDescription)
            }
            if (data.settings.contactEmail) {
              setContactEmail(data.settings.contactEmail)
            }
            if (data.settings.contactAddress) {
              setContactAddress(data.settings.contactAddress)
            }
            if (data.settings.socialInstagram) {
              setSocialInstagram(data.settings.socialInstagram)
            }
            if (data.settings.socialGithub) {
              setSocialGithub(data.settings.socialGithub)
            }
            if (data.settings.socialLinkedin) {
              setSocialLinkedin(data.settings.socialLinkedin)
            }
          }
        }
      } catch (error) {
        console.error("Error fetching settings:", error)
      }
    }

    fetchSettings()
  }, [])

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
    textCipherEffect(siteName)
  }

  const handleMouseLeave = () => {
    setHoveredText(siteName)
  }

  return (
    <footer className="relative w-full bg-neutral-900/10 backdrop-blur-sm dark:bg-neutral-900/40">
      {/* Full width background  image blend*/}
      <div
        className="absolute inset-0 z-[-1] h-full w-full bg-cover bg-[8%_100%] bg-no-repeat opacity-20 mix-blend-luminosity lg:bg-[100%_80%]"
        style={{
          backgroundImage:
            "url('/images/assets/backgrounds/Hillsboro-Lighthouse_alt.jpg')",
        }}
      ></div>
      {/* Gradient blend at top */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background to-transparent"></div>

      <motion.div
        className="relative mx-auto w-full px-6 py-12 sm:px-8 md:max-w-[90%] md:px-10 md:py-16 lg:px-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="mb-10 grid grid-cols-1 gap-8 md:mb-16 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <div className="mb-4 flex items-center">
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
            </div>
            <p className="max-w-md text-sm text-muted-foreground md:text-base">
              {footerDescription}
            </p>
          </motion.div>

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
                  aria-label="About Us"
                  onKeyDown={(e) =>
                    e.key === "Enter" && e.currentTarget.click()
                  }
                >
                  <span>About Us</span>
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
                  href="/articles"
                  className="flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground md:text-base"
                  tabIndex={0}
                  aria-label="Blog & Articles"
                  onKeyDown={(e) =>
                    e.key === "Enter" && e.currentTarget.click()
                  }
                >
                  <span>Blog & Articles</span>
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
                  aria-label="Contact"
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
              <motion.li variants={itemVariants}>
                <Link
                  href="/policies/terms-of-use"
                  className="flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground md:text-base"
                  tabIndex={0}
                  aria-label="Terms of Service"
                  onKeyDown={(e) =>
                    e.key === "Enter" && e.currentTarget.click()
                  }
                >
                  <span>Terms of Service</span>
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
        <div className="mt-10 flex flex-col justify-between gap-6 border-border pt-6 md:mt-16 md:flex-row md:pt-10 lg:items-center">
          <p className="text-left text-xs text-muted-foreground md:text-sm">
            © {new Date().getFullYear()} {siteName}. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex items-center space-x-6">
            <motion.a
              href={socialInstagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition hover:text-foreground"
              aria-label="Instagram"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && e.currentTarget.click()}
              variants={socialIconVariants}
              whileHover="hover"
            >
              <Instagram className="h-5 w-5 md:h-6 md:w-6" />
            </motion.a>
            <motion.a
              href={socialGithub}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition hover:text-foreground"
              aria-label="GitHub"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && e.currentTarget.click()}
              variants={socialIconVariants}
              whileHover="hover"
            >
              <Github className="h-5 w-5 md:h-6 md:w-6" />
            </motion.a>
            <motion.a
              href={socialLinkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition hover:text-foreground"
              aria-label="LinkedIn"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && e.currentTarget.click()}
              variants={socialIconVariants}
              whileHover="hover"
            >
              <Linkedin className="h-5 w-5 md:h-6 md:w-6" />
            </motion.a>
          </div>
        </div>
      </motion.div>
    </footer>
  )
}
