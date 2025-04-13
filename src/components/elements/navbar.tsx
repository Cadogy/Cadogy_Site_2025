"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ChevronDownIcon,
  KeyIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react"
import { signOut, useSession } from "next-auth/react"

import { siteConfig } from "@/config/site"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ModeToggle } from "@/components/mode-toggle"

export function NavigationMenu() {
  const { data: session, status } = useSession()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [hoveredText, setHoveredText] = useState(siteConfig.name)
  const [isScrolled, setIsScrolled] = useState(false)
  const lastRefreshTime = useRef<number>(0)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const refreshCarousel = () => {
    const now = Date.now()
    const timeSinceLastRefresh = now - lastRefreshTime.current

    if (timeSinceLastRefresh > 3000) {
      console.log("Triggering carousel refresh...")
      lastRefreshTime.current = now
      window.dispatchEvent(new CustomEvent("refreshHeroCarousel"))

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
      return true
    } else {
      console.log("Refresh blocked - too frequent")
      return false
    }
  }

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

  const closeMenu = () => setIsMenuOpen(false)

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" })
  }

  // Get user's initials for avatar fallback
  const getInitials = () => {
    if (!session?.user?.name) return "U"
    return session.user.name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  return (
    <nav
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "border-slate-800/50 bg-background/90 shadow-md backdrop-blur-md supports-[backdrop-filter]:bg-background/70"
          : "bg-background"
      }`}
    >
      <div className="mx-auto flex max-w-[86%] items-center justify-between py-4 sm:px-6 md:max-w-[90%] lg:px-8">
        {/* Logo Section with Cipher Effect */}
        <Link
          href="/"
          className="flex min-w-[120px] items-center"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={(e) => {
            // Check if we're already on the homepage
            if (
              typeof window !== "undefined" &&
              window.location.pathname === "/"
            ) {
              e.preventDefault()
              refreshCarousel()
            }
          }}
        >
          <svg
            width="20px"
            height="20px"
            viewBox="0 0 24 24"
            fill="var(--logo-fill)"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Logo SVG paths */}
            <path d="M19.4491 6.94063V9.45062C19.4491 10.1606 18.7291 10.6206 18.0591 10.3706C17.2191 10.0606 16.2891 9.94062 15.3091 10.0406C12.9291 10.3006 10.4891 12.5906 10.0891 14.9606C9.75906 16.9306 10.3891 18.7706 11.5991 20.0706C12.1491 20.6706 11.7791 21.6406 10.9691 21.7306C10.2791 21.8106 9.59906 21.7906 9.21906 21.5106L3.71906 17.4006C3.06906 16.9106 2.53906 15.8506 2.53906 15.0306V6.94063C2.53906 5.81063 3.39906 4.57063 4.44906 4.17063L9.94906 2.11062C10.5191 1.90063 11.4591 1.90063 12.0291 2.11062L17.5291 4.17063C18.5891 4.57063 19.4491 5.81063 19.4491 6.94063Z" />
            <path d="M16 11.5117C13.52 11.5117 11.5 13.5317 11.5 16.0117C11.5 18.4917 13.52 20.5117 16 20.5117C18.48 20.5117 20.5 18.4917 20.5 16.0117C20.5 13.5217 18.48 11.5117 16 11.5117Z" />
            <path d="M21 22.0009C20.73 22.0009 20.48 21.8909 20.29 21.7109C20.25 21.6609 20.2 21.6109 20.17 21.5509C20.13 21.5009 20.1 21.4409 20.08 21.3809C20.05 21.3209 20.03 21.2609 20.02 21.2009C20.01 21.1309 20 21.0709 20 21.0009C20 20.8709 20.03 20.7409 20.08 20.6209C20.13 20.4909 20.2 20.3909 20.29 20.2909C20.52 20.0609 20.87 19.9509 21.19 20.0209C21.26 20.0309 21.32 20.0509 21.38 20.0809C21.44 20.1009 21.5 20.1309 21.55 20.1709C21.61 20.2009 21.66 20.2509 21.71 20.2909C21.8 20.3909 21.87 20.4909 21.92 20.6209C21.97 20.7409 22 20.8709 22 21.0009C22 21.2609 21.89 21.5209 21.71 21.7109C21.66 21.7509 21.61 21.7909 21.55 21.8309C21.5 21.8709 21.44 21.9009 21.38 21.9209C21.32 21.9509 21.26 21.9709 21.19 21.9809C21.13 21.9909 21.06 22.0009 21 22.0009Z" />
          </svg>
          <span className="ml-1 inline-block w-[80px] text-sm">
            {hoveredText}
          </span>
        </Link>

        {/* Desktop Navigation Layout - Logo | Nav Menu | Login Button */}
        <div className="hidden md:flex md:flex-1 md:items-center md:justify-between">
          {/* Centered Navigation Menu */}
          <div className="flex flex-1 justify-center">
            <nav className="flex items-center gap-6 text-sm">
              <Link
                href="/who-we-are"
                className="text-sm transition duration-150"
              >
                Who We Are
              </Link>
              <Link href="/the-api" className="text-sm transition duration-150">
                The API
              </Link>
              <Link
                href="/articles"
                className="text-sm transition duration-150"
              >
                Articles
              </Link>
              <Link href="/contact" className="text-sm transition duration-150">
                Contact
              </Link>
            </nav>
          </div>

          {/* Right-aligned Authentication UI */}
          <div className="flex items-center space-x-4">
            {/* <ModeToggle /> */}

            {status === "loading" ? (
              // Loading state
              <div className="flex h-9 w-28 animate-pulse items-center justify-center rounded-md bg-muted/30">
                <div className="mr-2 h-8 w-8 rounded-full bg-muted/50"></div>
                <div className="h-4 w-12 rounded bg-muted/50"></div>
              </div>
            ) : session ? (
              // Authenticated state with user dropdown
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-2 px-2 py-1.5"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={session.user?.image || ""}
                        alt={session.user?.name || "User"}
                      />
                      <AvatarFallback>{getInitials()}</AvatarFallback>
                    </Avatar>
                    <span className="max-w-[100px] truncate text-sm">
                      {session.user?.name ||
                        session.user?.email?.split("@")[0] ||
                        "User"}
                    </span>
                    <ChevronDownIcon className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-0.5 leading-none">
                      {session.user?.name && (
                        <p className="text-sm font-medium">
                          {session.user.name}
                        </p>
                      )}
                      {session.user?.email && (
                        <p className="text-xs text-muted-foreground">
                          {session.user.email}
                        </p>
                      )}
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link
                      href="/dashboard"
                      className="flex cursor-pointer items-center"
                    >
                      <LayoutDashboardIcon className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/profile"
                      className="flex cursor-pointer items-center"
                    >
                      <UserIcon className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/settings"
                      className="flex cursor-pointer items-center"
                    >
                      <SettingsIcon className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="flex cursor-pointer items-center text-destructive focus:text-destructive"
                    onSelect={() => handleSignOut()}
                  >
                    <LogOutIcon className="mr-2 h-4 w-4" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              // Unauthenticated state
              <Button variant="hero" size="sm" asChild>
                <Link href="/login" className="group inline-flex items-center">
                  For Clients
                  <KeyIcon className="ml-1 h-[14px] w-[14px]" />
                </Link>
              </Button>
            )}
          </div>
        </div>

        {/* Mobile: Show user avatar if logged in, otherwise menu toggle */}
        <div className="flex items-center md:hidden">
          {status === "loading" ? (
            <div className="h-6 w-6 animate-pulse rounded-full bg-muted"></div>
          ) : session ? (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 p-0"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={session.user?.image || ""}
                  alt={session.user?.name || "User"}
                />
                <AvatarFallback>{getInitials()}</AvatarFallback>
              </Avatar>
            </Button>
          ) : (
            <button
              className="block text-muted-foreground hover:text-foreground focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          )}
        </div>

        {/* Full-Screen Mobile Menu */}
        <div
          className={`fixed inset-0 z-[100] flex flex-col items-start bg-black/50 p-5 backdrop-blur-xl transition-all duration-700 ease-in-out ${
            isMenuOpen ? "visible opacity-100" : "invisible opacity-0"
          }`}
          onClick={closeMenu} // Close the menu on backdrop click
        >
          {/* Close Icon in the Top Right */}
          <div className="mb-6 ml-2 flex w-full items-center justify-between">
            <div className="flex items-center space-x-1">
              <Link
                href="/"
                onClick={(e) => {
                  // Check if we're already on the homepage
                  if (
                    typeof window !== "undefined" &&
                    window.location.pathname === "/"
                  ) {
                    e.preventDefault()
                    // Close the mobile menu
                    closeMenu()
                    refreshCarousel()
                  }
                }}
                className="flex items-center"
              >
                <svg
                  width="20px"
                  height="20px"
                  viewBox="0 0 24 24"
                  fill="var(--logo-fill)"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Logo SVG paths */}
                  <path d="M19.4491 6.94063V9.45062C19.4491 10.1606 18.7291 10.6206 18.0591 10.3706C17.2191 10.0606 16.2891 9.94062 15.3091 10.0406C12.9291 10.3006 10.4891 12.5906 10.0891 14.9606C9.75906 16.9306 10.3891 18.7706 11.5991 20.0706C12.1491 20.6706 11.7791 21.6406 10.9691 21.7306C10.2791 21.8106 9.59906 21.7906 9.21906 21.5106L3.71906 17.4006C3.06906 16.9106 2.53906 15.8506 2.53906 15.0306V6.94063C2.53906 5.81063 3.39906 4.57063 4.44906 4.17063L9.94906 2.11062C10.5191 1.90063 11.4591 1.90063 12.0291 2.11062L17.5291 4.17063C18.5891 4.57063 19.4491 5.81063 19.4491 6.94063Z" />
                  <path d="M16 11.5117C13.52 11.5117 11.5 13.5317 11.5 16.0117C11.5 18.4917 13.52 20.5117 16 20.5117C18.48 20.5117 20.5 18.4917 20.5 16.0117C20.5 13.5217 18.48 11.5117 16 11.5117Z" />
                  <path d="M21 22.0009C20.73 22.0009 20.48 21.8909 20.29 21.7109C20.25 21.6609 20.2 21.6109 20.17 21.5509C20.13 21.5009 20.1 21.4409 20.08 21.3809C20.05 21.3209 20.03 21.2609 20.02 21.2009C20.01 21.1309 20 21.0709 20 21.0009C20 20.8709 20.03 20.7409 20.08 20.6209C20.13 20.4909 20.2 20.3909 20.29 20.2909C20.52 20.0609 20.87 19.9509 21.19 20.0209C21.26 20.0309 21.32 20.0509 21.38 20.0809C21.44 20.1009 21.5 20.1309 21.55 20.1709C21.61 20.2009 21.66 20.2509 21.71 20.2909C21.8 20.3909 21.87 20.4909 21.92 20.6209C21.97 20.7409 22 20.8709 22 21.0009C22 21.2609 21.89 21.5209 21.71 21.7109C21.66 21.7509 21.61 21.7909 21.55 21.8309C21.5 21.8709 21.44 21.9009 21.38 21.9209C21.32 21.9509 21.26 21.9709 21.19 21.9809C21.13 21.9909 21.06 22.0009 21 22.0009Z" />
                </svg>
                <span className="ml-1 text-sm text-foreground">
                  {hoveredText}
                </span>
              </Link>
            </div>
            {/* <ModeToggle /> */}
          </div>

          <div
            className="ml-2 mt-10 flex w-full flex-col space-y-4"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on menu items
          >
            {/* Display user info if logged in */}
            {session && (
              <div className="mb-4 flex flex-col items-start">
                <div className="mb-2 flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={session.user?.image || ""}
                      alt={session.user?.name || "User"}
                    />
                    <AvatarFallback>{getInitials()}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-medium">
                      {session.user?.name || "User"}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {session.user?.email}
                    </span>
                  </div>
                </div>
                <div className="my-2 w-full border-b border-border/40"></div>
              </div>
            )}

            <Button
              variant="ghost"
              size="lg"
              className="justify-start text-xl text-foreground"
              asChild
            >
              <Link href="/who-we-are" onClick={closeMenu}>
                Who We Are
              </Link>
            </Button>

            <Button
              variant="ghost"
              size="lg"
              className="justify-start text-xl text-foreground"
              asChild
            >
              <Link href="/the-api" onClick={closeMenu}>
                The API
              </Link>
            </Button>

            <Button
              variant="ghost"
              size="lg"
              className="justify-start text-xl text-foreground"
              asChild
            >
              <Link href="/articles" onClick={closeMenu}>
                Articles
              </Link>
            </Button>

            <Button
              variant="ghost"
              size="lg"
              className="justify-start text-xl text-foreground"
              asChild
            >
              <Link href="/contact" onClick={closeMenu}>
                Contact Us
              </Link>
            </Button>

            {/* Authenticated User Links (Mobile) */}
            {session && (
              <>
                <div className="my-2 w-full border-b border-border/40"></div>

                <Button
                  variant="ghost"
                  size="lg"
                  className="justify-start text-xl text-foreground"
                  asChild
                >
                  <Link href="/dashboard" onClick={closeMenu}>
                    <LayoutDashboardIcon className="mr-2 h-5 w-5" />
                    Dashboard
                  </Link>
                </Button>

                <Button
                  variant="ghost"
                  size="lg"
                  className="justify-start text-xl text-foreground"
                  asChild
                >
                  <Link href="/profile" onClick={closeMenu}>
                    <UserIcon className="mr-2 h-5 w-5" />
                    Profile
                  </Link>
                </Button>

                <Button
                  variant="ghost"
                  size="lg"
                  className="justify-start text-xl text-foreground"
                  asChild
                >
                  <Link href="/settings" onClick={closeMenu}>
                    <SettingsIcon className="mr-2 h-5 w-5" />
                    Settings
                  </Link>
                </Button>

                <Button
                  variant="ghost"
                  size="lg"
                  className="justify-start text-xl text-destructive"
                  onClick={() => {
                    closeMenu()
                    handleSignOut()
                  }}
                >
                  <LogOutIcon className="mr-2 h-5 w-5" />
                  Sign Out
                </Button>
              </>
            )}

            {/* Login Button for Unauthenticated Users (Mobile) */}
            {!session && (
              <Button
                variant="ghost"
                size="lg"
                className="mt-4 justify-start text-xl"
                asChild
              >
                <Link
                  href="/login"
                  onClick={closeMenu}
                  className="inline-flex items-center"
                >
                  For Clients
                  <KeyIcon className="ml-1 h-5 w-5" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
