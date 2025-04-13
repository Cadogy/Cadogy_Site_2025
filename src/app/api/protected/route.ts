import { NextResponse } from "next/server"

import { hasValidApiKey } from "@/lib/api-auth"

/**
 * Example of a protected API route that requires an API key
 *
 * This can be accessed with a valid API key in the header (x-api-key)
 * or as a query parameter (?api_key=xyz)
 */
export async function GET(request: Request) {
  // Validate API key (this is redundant if middleware already checks, but shown as an example)
  if (!hasValidApiKey(request)) {
    return NextResponse.json(
      { error: "Unauthorized - Valid API key required" },
      { status: 401 }
    )
  }

  // API key is valid, return protected data
  return NextResponse.json({
    success: true,
    message: "This is protected data accessible only with a valid API key",
    timestamp: new Date().toISOString(),
    data: {
      items: [
        { id: 1, name: "Protected Item 1" },
        { id: 2, name: "Protected Item 2" },
        { id: 3, name: "Protected Item 3" },
      ],
    },
  })
}

/**
 * Example of handling POST requests with API key authentication
 */
export async function POST(request: Request) {
  // Validate API key (this is redundant if middleware already checks, but shown as an example)
  if (!hasValidApiKey(request)) {
    return NextResponse.json(
      { error: "Unauthorized - Valid API key required" },
      { status: 401 }
    )
  }

  try {
    // Parse request body
    const body = await request.json()

    // Process the data
    return NextResponse.json({
      success: true,
      message: "Data received successfully",
      receivedData: body,
      processedAt: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }
}
