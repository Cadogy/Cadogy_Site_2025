import { NextRequest, NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"

import { isValidApiKey } from "@/lib/api-auth"

// Define paths that are protected (require authentication)
const protectedPaths = [
  "/dashboard",
  "/profile",
  "/settings",
  // Add other protected paths here
]

// Define public paths that don't require auth
const publicPaths = [
  "/",
  "/login",
  "/register",
  "/verify-email",
  "/reset-password",
  "/forgot-password",
]

// API routes that should bypass authentication
const publicApiRoutes = [
  "/api/auth/",
  "/api/public/",
  "/api/uploadthing",
  // Add other public API routes here
]

// API routes that should use session auth instead of API key auth
const sessionAuthApiRoutes = [
  "/api/dashboard/",
  "/api/user/",
  "/api/settings/",
  // Add other session-based API routes here
]

// List of trusted hosts to allow auth
const trustedHosts = [
  "cadogy.com",
  "www.cadogy.com",
  "localhost:3000",
  "192.168.1.66:3000",
  "192.168.1.66", // Added without port for IP address flexibility
]

export async function middleware(request: NextRequest) {
  const { pathname, searchParams, host } = request.nextUrl

  console.log("[Middleware] Processing request:", {
    pathname,
    host,
    url: request.url,
    hasCallbackParam: searchParams.has("callbackUrl"),
  })

  // Log all cookies for debugging
  console.log(
    "[Middleware] Request cookies:",
    Array.from(request.cookies.getAll()).map((c) => ({
      name: c.name,
      value: c.value ? "present" : "empty",
    }))
  )

  // For multi-domain auth - Check if request is from a trusted host
  const isTrustedHost = trustedHosts.some(
    (trustedHost) => host.includes(trustedHost) || host === trustedHost
  )
  console.log("[Middleware] Host check:", { host, isTrustedHost })

  if (!isTrustedHost && pathname.startsWith("/api/auth")) {
    console.log("[Middleware] Rejecting untrusted host for auth API")
    return new NextResponse(
      JSON.stringify({ error: "Unauthorized - Invalid host" }),
      {
        status: 401,
        headers: { "Content-Type": "application/json" },
      }
    )
  }

  // Handle redirects for old email links
  if (pathname === "/auth/verify-email") {
    const token = searchParams.get("token")
    const redirectUrl = new URL(
      `/verify-email${token ? `?token=${token}` : ""}`,
      request.url
    )
    return NextResponse.redirect(redirectUrl)
  }

  if (pathname === "/auth/reset-password") {
    const token = searchParams.get("token")
    const redirectUrl = new URL(
      `/reset-password${token ? `?token=${token}` : ""}`,
      request.url
    )
    return NextResponse.redirect(redirectUrl)
  }

  // Check if this is an API route that requires API key
  if (
    pathname.startsWith("/api/") &&
    !publicApiRoutes.some((route) => pathname.startsWith(route)) &&
    !sessionAuthApiRoutes.some((route) => pathname.startsWith(route))
  ) {
    // Get API key from request header or query parameter
    const apiKey =
      request.headers.get("x-api-key") ||
      request.nextUrl.searchParams.get("api_key")

    // If no API key provided or invalid, return 401 Unauthorized
    if (!apiKey || !isValidApiKey(apiKey)) {
      return new NextResponse(
        JSON.stringify({ error: "Unauthorized - Valid API key required" }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      )
    }

    // API key is valid, proceed
    return NextResponse.next()
  }

  // Check for session auth for dashboard API routes
  if (
    pathname.startsWith("/api/dashboard/") ||
    pathname.startsWith("/api/user/")
  ) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
      secureCookie: process.env.NODE_ENV === "production",
    })

    if (!token) {
      console.log("[Middleware] No session for protected API route:", pathname)
      return new NextResponse(
        JSON.stringify({
          error: "Unauthorized",
          message: "You must be signed in to access this API endpoint",
        }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      )
    }

    // Session token is valid, proceed
    return NextResponse.next()
  }

  // Check if the path is protected
  const isProtectedPath = protectedPaths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  )
  console.log("[Middleware] Path protection check:", {
    pathname,
    isProtectedPath,
  })

  // Skip middleware for public paths or specific API routes
  if (
    publicPaths.some(
      (path) => pathname === path || pathname.startsWith(`${path}/`)
    ) ||
    publicApiRoutes.some((route) => pathname.startsWith(route)) ||
    pathname.startsWith("/_next/") ||
    pathname.includes(".")
  ) {
    console.log("[Middleware] Skipping middleware for public path")
    return NextResponse.next()
  }

  // Check for session token cookie directly
  const sessionTokenCookie = request.cookies.get("next-auth.session-token")
  console.log(
    "[Middleware] Session token cookie:",
    sessionTokenCookie ? "present" : "not found"
  )

  // Get the token with detailed options for debugging
  console.log("[Middleware] Getting token with params:", {
    secret: process.env.NEXTAUTH_SECRET ? "present" : "missing",
    secureCookie: process.env.NODE_ENV === "production",
  })

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV === "production", // explicitly set secure cookie based on environment
  })

  console.log("[Middleware] Auth token check:", {
    pathname,
    hasToken: !!token,
    isProtectedPath,
    tokenId: token?.id ? "present" : "missing",
  })

  // Redirect to login if no token and trying to access protected route
  if (!token && isProtectedPath) {
    console.log(
      "[Middleware] No token for protected path, redirecting to login"
    )
    const url = new URL("/login", request.url)
    url.searchParams.set("callbackUrl", encodeURI(pathname))
    return NextResponse.redirect(url)
  }

  console.log("[Middleware] Proceeding with request")
  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
