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
  // Add other public API routes here
]

export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl

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
    !publicApiRoutes.some((route) => pathname.startsWith(route))
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

  // Check if the path is protected
  const isProtectedPath = protectedPaths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  )

  // Skip middleware for public paths or specific API routes
  if (
    publicPaths.some(
      (path) => pathname === path || pathname.startsWith(`${path}/`)
    ) ||
    publicApiRoutes.some((route) => pathname.startsWith(route)) ||
    pathname.startsWith("/_next/") ||
    pathname.includes(".")
  ) {
    return NextResponse.next()
  }

  // Get the token
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  })

  // Redirect to login if no token and trying to access protected route
  if (!token && isProtectedPath) {
    const url = new URL("/login", request.url)
    url.searchParams.set("callbackUrl", encodeURI(pathname))
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
