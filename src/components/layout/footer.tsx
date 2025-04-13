import { useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
  XIcon,
} from "lucide-react"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

export function Footer() {
  const currentYear = new Date().getFullYear()
  const pathname = usePathname()

  return (
    <footer className="w-full border-t border-border/40 bg-background py-6">
      <div className="mx-auto max-w-[90%] px-4 lg:px-8">
        {/* Main footer content */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Logo and company info */}
          <div className="space-y-3">
            <div className="flex items-center">
              <svg
                width="20px"
                height="20px"
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
              <span className="ml-2 font-medium">
                {siteConfig?.name || "Cadogy"}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Web Development Experts in Pompano Beach, FL crafting custom
              websites, fullstack apps, and secure infrastructure.
            </p>
            <div className="flex space-x-4 pt-2">
              <a
                href="https://www.instagram.com/cadogyweb"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a
                href="https://www.github.com/cadogy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground"
              >
                <GithubIcon className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/cadogy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground"
              >
                <LinkedinIcon className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Company links */}
          <div>
            <h3 className="mb-3 text-sm font-medium">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/who-we-are"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Who We Are
                </Link>
              </li>
              <li>
                <Link
                  href="/the-api"
                  className="text-muted-foreground hover:text-foreground"
                >
                  The API
                </Link>
              </li>
              <li>
                <Link
                  href="/articles"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Articles
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources links */}
          <div>
            <h3 className="mb-3 text-sm font-medium">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/dashboard/docs"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/api-keys"
                  className="text-muted-foreground hover:text-foreground"
                >
                  API Keys
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/usage"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Usage
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/settings"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Settings
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <h3 className="mb-3 text-sm font-medium">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/policies/privacy-policy"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/policies/terms-of-use"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/cookies"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright bar */}
        <div className="mt-8 border-t border-border/40 pt-6">
          <div className="flex flex-col justify-between space-y-4 sm:flex-row sm:space-y-0">
            <p className="text-xs text-muted-foreground">
              © {currentYear} {siteConfig?.name || "Cadogy"}. All rights
              reserved.
            </p>
            <p className="text-xs text-muted-foreground">
              Made with ❤️ in Pompano Beach, Florida
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
