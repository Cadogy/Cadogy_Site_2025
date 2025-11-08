"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Github, Instagram, Linkedin, Mail, MapPin, Shield } from "lucide-react"

import { siteConfig } from "@/config/site"

export function Footer() {
  const currentYear = new Date().getFullYear()
  const [siteName, setSiteName] = useState(siteConfig.name)
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
              setSiteName(data.settings.siteName)
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

  return (
    <footer className="relative w-full border-t bg-background">
      <div className="mx-auto max-w-[90%] px-4 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href="/" className="mb-4 flex items-center">
              <svg
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-foreground"
              >
                <path
                  d="M19.4491 6.94063V9.45062C19.4491 10.1606 18.7291 10.6206 18.0591 10.3706C17.2191 10.0606 16.2891 9.94062 15.3091 10.0406C12.9291 10.3006 10.4891 12.5906 10.0891 14.9606C9.75906 16.9306 10.3891 18.7706 11.5991 20.0706C12.1491 20.6706 11.7791 21.6406 10.9691 21.7306C10.2791 21.8106 9.59906 21.7906 9.21906 21.5106L3.71906 17.4006C3.06906 16.9106 2.53906 15.8506 2.53906 15.0306V6.94063C2.53906 5.81063 3.39906 4.57063 4.44906 4.17063L9.94906 2.11062C10.5191 1.90063 11.4591 1.90063 12.0291 2.11062L17.5291 4.17063C18.5891 4.57063 19.4491 5.81063 19.4491 6.94063Z"
                  fill="currentColor"
                  fillOpacity="0.5"
                />
                <path
                  d="M16 11.5117C13.52 11.5117 11.5 13.5317 11.5 16.0117C11.5 18.4917 13.52 20.5117 16 20.5117C18.48 20.5117 20.5 18.4917 20.5 16.0117C20.5 13.5217 18.48 11.5117 16 11.5117Z"
                  fill="currentColor"
                  fillOpacity="0.5"
                />
              </svg>
              <span className="ml-2 text-lg font-semibold">
                {siteConfig.name}
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {footerDescription}
            </p>
          </div>

          <div className="lg:col-span-3">
            <h3 className="mb-4 text-sm font-semibold">Company</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/who-we-are"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/articles"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Blog & Articles
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="mb-4 text-sm font-semibold">Resources</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/policies/privacy-policy"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/policies/terms-of-use"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="mb-4 text-sm font-semibold">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-muted-foreground" />
                <span className="text-muted-foreground">{contactAddress}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                <a
                  href={`mailto:${contactEmail}`}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {contactEmail}
                </a>
              </li>
            </ul>
            <div className="mt-4 flex space-x-3">
              <a
                href={socialInstagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
                aria-label="Instagram"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/40 bg-background transition-all hover:border-foreground/20 hover:bg-accent">
                  <Instagram className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-foreground" />
                </div>
              </a>
              <a
                href={socialGithub}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
                aria-label="GitHub"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/40 bg-background transition-all hover:border-foreground/20 hover:bg-accent">
                  <Github className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-foreground" />
                </div>
              </a>
              <a
                href={socialLinkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
                aria-label="LinkedIn"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/40 bg-background transition-all hover:border-foreground/20 hover:bg-accent">
                  <Linkedin className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-foreground" />
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-border/40 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-xs text-muted-foreground">
              © {currentYear} {siteName}. All rights reserved.
            </p>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Shield className="h-3 w-3" />
              <span>Secure & Trusted Development Partner</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
