"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { motion, useMotionValueEvent, useScroll } from "framer-motion"
import {
  AlertCircle,
  BookText,
  Coins,
  FileCode,
  Key,
  LayoutDashboard,
  Settings,
} from "lucide-react"

import { cn } from "@/lib/utils"

// Navigation items for the dashboard
const navItems = [
  {
    name: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "API Keys",
    href: "/dashboard/api-keys",
    icon: Key,
  },
  {
    name: "Top-up",
    href: "/dashboard/tokens",
    icon: Coins,
  },
  {
    name: "Docs",
    href: "/dashboard/docs",
    icon: BookText,
  },
  {
    name: "Usage",
    href: "/dashboard/usage",
    icon: FileCode,
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

const gradientClasses = {
  icon: "text-primary",
  bar: "bg-gradient-to-r from-primary/80 via-primary to-primary/80",
  glow: "bg-gradient-to-b from-primary/80 via-primary to-primary/80",
}

export default function DashboardNav() {
  const pathname = usePathname()
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(true)
  const [isNavigating, setIsNavigating] = useState(false)
  const lastScrollY = useRef(0)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    const isMobile = window.innerWidth < 1024
    if (!isMobile && latest > 93) {
      if (latest > lastScrollY.current) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
    } else {
      setIsVisible(true)
    }
    lastScrollY.current = latest
  })

  const isLinkActive = (href: string) => {
    return href === "/dashboard"
      ? pathname === "/dashboard"
      : pathname?.startsWith(href)
  }

  // Handle navigation with transition state
  const handleNavigation = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault()

    if (pathname === href) return // Don't navigate if already on the page

    setIsNavigating(true)

    // Small delay to show transition effect
    setTimeout(() => {
      router.push(href)

      // Reset state after navigation completes
      setTimeout(() => {
        setIsNavigating(false)
      }, 300)
    }, 50)
  }

  // Desktop Navigation
  const DesktopNav = () => (
    <motion.div
      className="hidden h-12 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:block"
      initial={{ top: 0 }}
      animate={{
        y: isVisible ? 0 : -100,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ duration: 0.2 }}
    >
      <div className="mx-auto flex h-full max-w-[86%] items-center justify-between overflow-hidden px-4 md:max-w-[90%] lg:px-8">
        <div className="flex h-full items-center space-x-1">
          {navItems.map((item) => {
            const isActive = isLinkActive(item.href)

            return (
              <Link
                key={item.href}
                href={item.href}
                prefetch={true}
                onClick={handleNavigation(item.href)}
                className={cn(
                  "group relative flex h-full items-center gap-x-2 px-3 py-2 text-sm font-medium leading-6 backdrop-blur-sm transition-colors",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:bg-primary/5 hover:text-foreground"
                )}
              >
                <span
                  className={cn(
                    "text-base transition-colors duration-200",
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground/50 group-hover:text-primary"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                </span>
                <span className="truncate">{item.name}</span>
                {isActive && (
                  <>
                    <div className="absolute bottom-0 left-1/2 h-[2px] w-8 -translate-x-1/2 rounded-t-full bg-gradient-to-r from-primary/80 via-primary to-primary/80 transition-opacity duration-200" />
                    <div className="absolute -bottom-4 left-1/2 h-6 w-16 -translate-x-1/2 bg-gradient-to-b from-primary/80 via-primary to-primary/80 opacity-30 blur transition-opacity duration-200" />
                  </>
                )}
                {!isActive && (
                  <>
                    <div className="absolute bottom-0 left-1/2 h-[2px] w-8 -translate-x-1/2 rounded-t-full bg-gradient-to-r from-primary/60 via-primary to-primary/60 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                    <div className="absolute -bottom-4 left-1/2 h-6 w-16 -translate-x-1/2 bg-gradient-to-b from-primary/60 via-primary to-primary/60 opacity-0 blur transition-opacity duration-200 group-hover:opacity-20" />
                  </>
                )}
              </Link>
            )
          })}
        </div>

        <div className="ml-auto flex h-8 justify-end gap-x-2">
          <Link
            href="/contact"
            className="relative inline-flex items-center justify-center overflow-hidden whitespace-nowrap rounded-md bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground transition-colors hover:bg-secondary/80 focus:outline-none focus-visible:ring-1 focus-visible:ring-ring active:translate-y-px"
          >
            Get Support
          </Link>
        </div>
      </div>
    </motion.div>
  )

  // Mobile Navigation (Bottom Bar)
  const MobileNav = () => (
    <div className="fixed bottom-0 z-40 w-full border-t border-border bg-background/90 before:absolute before:inset-0 before:p-px before:backdrop-blur-xl before:transition-all before:duration-200 dark:bg-background/90 lg:hidden">
      <div className="relative z-10 mx-auto flex w-full items-center justify-evenly gap-x-1 sm:w-3/4">
        {navItems.map((item) => {
          const isActive = isLinkActive(item.href)

          return (
            <Link
              key={item.href}
              href={item.href}
              prefetch={true}
              onClick={handleNavigation(item.href)}
              className={cn(
                "group relative h-[70px] flex-1 overflow-hidden px-2 py-3 pt-2.5 text-center text-xs leading-6 sm:!max-w-none",
                isActive
                  ? "bg-gradient-to-t from-primary/10 text-foreground"
                  : "text-muted-foreground hover:bg-gradient-to-t hover:from-primary/10 hover:text-foreground"
              )}
            >
              <span
                className={cn(
                  "mx-auto block h-5 w-5 text-base transition-colors duration-200",
                  {
                    [gradientClasses.icon]: isActive,
                    "text-muted-foreground/50 group-hover:text-primary":
                      !isActive,
                  }
                )}
              >
                <item.icon className="mx-auto h-5 w-5" />
              </span>
              <div className="mt-auto truncate pt-2 text-xs font-semibold leading-3 sm:text-sm">
                {item.name}
              </div>
              <div
                className={cn(
                  "absolute left-1/2 top-0 h-[2px] w-16 -translate-x-1/2 rounded-b-full transition-opacity duration-200",
                  isActive
                    ? "opacity-100"
                    : "opacity-0 group-hover:opacity-100",
                  gradientClasses.bar
                )}
              />
              <div
                className={cn(
                  "absolute -top-4 left-1/2 h-6 w-20 -translate-x-1/2 blur transition-opacity duration-200",
                  isActive ? "opacity-30" : "opacity-0 group-hover:opacity-30",
                  gradientClasses.glow
                )}
              />
            </Link>
          )
        })}
      </div>
    </div>
  )

  // Add a loading overlay for transitions
  const PageTransitionOverlay = () => {
    if (!isNavigating) return null

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
      >
        <div className="flex h-full w-full items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
      </motion.div>
    )
  }

  return (
    <>
      <DesktopNav />
      <MobileNav />
      <PageTransitionOverlay />
    </>
  )
}
