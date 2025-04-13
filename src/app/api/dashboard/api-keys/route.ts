import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"

import {
  createApiKey,
  deleteApiKey,
  disableApiKey,
  enableApiKey,
  getUserApiKeys,
} from "@/lib/api-keys"
import { authOptions } from "@/lib/auth/auth-options"

export async function GET(request: NextRequest) {
  // Check if user is authenticated
  const session = await getServerSession(authOptions)

  console.log(
    "API Keys - GET: Session in API route:",
    session ? "Session exists" : "No session found"
  )

  if (!session?.user?.id) {
    console.log("Unauthorized access attempt to /api/dashboard/api-keys")
    return NextResponse.json(
      {
        error: "Unauthorized",
        message: "Please sign in to access this resource",
      },
      { status: 401 }
    )
  }

  try {
    console.log("User authenticated for API keys:", session.user.email)
    const apiKeys = await getUserApiKeys(session.user.id)

    // Format API keys for frontend
    const formattedKeys = apiKeys.map((key) => ({
      id: key._id?.toString(),
      name: key.name,
      key: key.key.substring(0, 16) + "●●●●●●●●●●●●●●●●", // Mask most of the key
      type: key.type,
      isActive: key.isActive,
      lastUsed: key.lastUsed,
      createdAt: key.createdAt,
    }))

    return NextResponse.json({ apiKeys: formattedKeys })
  } catch (error) {
    console.error("API key fetch error:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch API keys",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  // Check if user is authenticated
  const session = await getServerSession(authOptions)

  console.log(
    "API Keys - POST: Session in API route:",
    session ? "Session exists" : "No session found"
  )

  if (!session?.user?.id) {
    console.log("Unauthorized POST attempt to /api/dashboard/api-keys")
    return NextResponse.json(
      {
        error: "Unauthorized",
        message: "Please sign in to access this resource",
      },
      { status: 401 }
    )
  }

  try {
    const body = await request.json()
    const { name, type, permissions } = body

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 })
    }

    console.log(
      `Creating API key for user ${session.user.email}: ${name}, type=${type || "primary"}`
    )

    const newApiKey = await createApiKey(
      session.user.id,
      name,
      type || "primary",
      permissions || ["read"]
    )

    return NextResponse.json(
      {
        apiKey: {
          id: newApiKey._id?.toString(),
          name: newApiKey.name,
          key: newApiKey.key, // Return the full key only when created
          type: newApiKey.type,
          isActive: newApiKey.isActive,
          lastUsed: newApiKey.lastUsed,
          createdAt: newApiKey.createdAt,
        },
        message: "API key created successfully",
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("API key creation error:", error)
    return NextResponse.json(
      {
        error: "Failed to create API key",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  // Check if user is authenticated
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { id, action } = body

    if (!id) {
      return NextResponse.json(
        { error: "API key ID is required" },
        { status: 400 }
      )
    }

    let success = false

    switch (action) {
      case "enable":
        success = await enableApiKey(id, session.user.id)
        break
      case "disable":
        success = await disableApiKey(id, session.user.id)
        break
      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 })
    }

    if (!success) {
      return NextResponse.json(
        { error: "API key not found or action failed" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: `API key ${action === "enable" ? "enabled" : "disabled"} successfully`,
    })
  } catch (error) {
    console.error("API key update error:", error)
    return NextResponse.json(
      { error: "Failed to update API key" },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  // Check if user is authenticated
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const url = new URL(request.url)
    const id = url.searchParams.get("id")

    if (!id) {
      return NextResponse.json(
        { error: "API key ID is required" },
        { status: 400 }
      )
    }

    const success = await deleteApiKey(id, session.user.id)

    if (!success) {
      return NextResponse.json(
        { error: "API key not found or delete failed" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: "API key deleted successfully",
    })
  } catch (error) {
    console.error("API key deletion error:", error)
    return NextResponse.json(
      { error: "Failed to delete API key" },
      { status: 500 }
    )
  }
}
