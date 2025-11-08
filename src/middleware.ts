import { NextRequest, NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"

import { isValidApiKey } from "@/lib/api-auth"

// Define paths that are protected (require authentication)
const protectedPaths = [
  "/dashboard",
  "/profile",
  "/settings",
  "/admin",
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

// API routes that should bypass authentication entirely
const publicApiRoutes = [
  "/api/auth/",
  "/api/uploadthing",
  "/api/webhooks/stripe",
  // Add other public API routes here
]

// API routes that require API key authentication
const apiKeyAuthRoutes = [
  "/api/public/",
  // Add other API key authenticated routes here
]

// API routes that should use session auth instead of API key auth
const sessionAuthApiRoutes = [
  "/api/dashboard/",
  "/api/user/",
  "/api/settings/",
  "/api/payments/",
  "/api/admin/",
  "/api/protected/",
  // Add other session-based API routes here
]

// List of trusted hosts to allow auth
const trustedHosts = [
  "cadogy.com",
  "www.cadogy.com",
  "app.cadogy.com",
  "localhost:3000",
  "192.168.1.144:3000",
  "192.168.1.144",
]

export async function middleware(request: NextRequest) {
  const { pathname, searchParams, host } = request.nextUrl

  // console.log("[Middleware] Processing request:", {
  //   pathname,
  //   host,
  //   url: request.url,
  //   hasCallbackParam: searchParams.has("callbackUrl"),
  // })

  // Log all cookies for debugging
  // console.log(
  //   "[Middleware] Request cookies:",
  //   Array.from(request.cookies.getAll()).map((c) => ({
  //     name: c.name,
  //     value: c.value ? "present" : "empty",
  //   }))
  // )

  // For multi-domain auth - Check if request is from a trusted host
  const isTrustedHost = trustedHosts.some(
    (trustedHost) => host.includes(trustedHost) || host === trustedHost
  )
  // console.log("[Middleware] Host check:", { host, isTrustedHost })

  if (!isTrustedHost && pathname.startsWith("/api/auth")) {
    // console.log("[Middleware] Rejecting untrusted host for auth API")
    return new NextResponse(
      JSON.stringify({ error: "Unauthorized - Invalid host" }),
      {
        status: 401,
        headers: { "Content-Type": "application/json" },
      }
    )
  }

  // Add no-index headers for admin routes
  let response = NextResponse.next()
  if (pathname.startsWith("/admin")) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive")
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

  // Handle sign-in redirect - get proper callbackUrl from query params
  if (
    pathname === "/api/auth/callback/credentials" ||
    pathname === "/api/auth/callback/google"
  ) {
    // console.log("[Middleware] Auth callback detected, checking for callbackUrl")
    // This will be handled by NextAuth's default behavior
    return NextResponse.next()
  }

  // Skip middleware for public paths and truly public API routes
  if (
    publicPaths.some(
      (path) => pathname === path || pathname.startsWith(`${path}/`)
    ) ||
    publicApiRoutes.some((route) => pathname.startsWith(route)) ||
    pathname.startsWith("/_next/") ||
    pathname.includes(".")
  ) {
    // console.log("[Middleware] Skipping middleware for public path")
    return NextResponse.next()
  }

  // Check for session auth for protected API routes (handle these first)
  if (sessionAuthApiRoutes.some((route) => pathname.startsWith(route))) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
      secureCookie: process.env.NODE_ENV === "production",
    })

    if (!token) {
      // console.log("[Middleware] No session for protected API route:", pathname)
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

    // Check for admin role for admin API routes
    if (
      pathname.startsWith("/api/admin/") &&
      (!token || token.role !== "admin")
    ) {
      return new NextResponse(
        JSON.stringify({
          error: "Forbidden",
          message: "You do not have permission to access this resource",
        }),
        {
          status: 403,
          headers: { "Content-Type": "application/json" },
        }
      )
    }

    // Session token is valid, proceed
    return NextResponse.next()
  }

  // Check if this is an API route that requires API key
  if (
    pathname.startsWith("/api/") &&
    apiKeyAuthRoutes.some((route) => pathname.startsWith(route))
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

  // Check if the path is protected for normal web routes
  const isProtectedPath = protectedPaths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  )

  // Get token for protected web paths
  if (isProtectedPath) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
      secureCookie: process.env.NODE_ENV === "production",
    })

    // Redirect to login if no token and trying to access protected route
    if (!token) {
      // console.log(
      //   "[Middleware] No token for protected path, redirecting to login"
      // )
      const url = new URL("/login", request.url)
      url.searchParams.set("callbackUrl", encodeURI(request.nextUrl.pathname))
      return NextResponse.redirect(url)
    }

    // Check for admin role for admin routes
    if (pathname.startsWith("/admin")) {
      if (!token || token.role !== "admin") {
        const url = new URL("/login", request.url)
        url.searchParams.set("callbackUrl", encodeURI(request.nextUrl.pathname))
        return NextResponse.redirect(url)
      }
    }

    // Redirect to dashboard after successful login if we're on login page with valid session
    if (token && (pathname === "/login" || pathname === "/register")) {
      // console.log("[Middleware] User already logged in, redirecting to dashboard")
      const callbackUrl = searchParams.get("callbackUrl") || "/dashboard"
      const decodedCallbackUrl = decodeURIComponent(callbackUrl)
      return NextResponse.redirect(new URL(decodedCallbackUrl, request.url))
    }
  }

  // console.log("[Middleware] Proceeding with request")
  return response
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
