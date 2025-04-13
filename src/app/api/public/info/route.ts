import { NextResponse } from "next/server"

/**
 * Example of a public API route that doesn't require authentication
 *
 * This can be accessed by anyone without an API key
 */
export async function GET(request: Request) {
  // This is a public endpoint, no authentication required
  return NextResponse.json({
    success: true,
    message: "This is public data accessible without authentication",
    timestamp: new Date().toISOString(),
    data: {
      name: "Cadogy API",
      version: "1.0.0",
      description: "Public API information for Cadogy services",
      endpoints: [
        {
          path: "/api/public/info",
          description: "Public API information",
          auth: "None",
        },
        {
          path: "/api/protected",
          description: "Protected API example",
          auth: "API Key",
        },
      ],
    },
  })
}
