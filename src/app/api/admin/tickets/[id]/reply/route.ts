import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth/auth-options"
import { connectToDatabase } from "@/lib/mongodb"
import { Ticket } from "@/models/Ticket"

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return NextResponse.json(
      {
        error: "Unauthorized",
        message: "Please sign in to access this resource",
      },
      { status: 401 }
    )
  }

  if (session.user.role !== "admin") {
    return NextResponse.json(
      {
        error: "Forbidden",
        message: "You do not have permission to access this resource",
      },
      { status: 403 }
    )
  }

  try {
    await connectToDatabase()

    const body = await request.json()
    const { message } = body

    if (!message || !message.trim()) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      )
    }

    const ticket = await Ticket.findById(params.id)

    if (!ticket) {
      return NextResponse.json(
        { error: "Ticket not found" },
        { status: 404 }
      )
    }

    const newMessage = {
      authorId: session.user.id,
      content: message.trim(),
      createdAt: new Date(),
    }

    ticket.messages.push(newMessage)
    ticket.lastReplyAt = new Date()
    ticket.lastReplyBy = "admin"

    await ticket.save()

    return NextResponse.json({
      message: "Reply sent successfully",
      ticket: {
        id: ticket._id.toString(),
        messageCount: ticket.messages.length,
      },
    })
  } catch (error) {
    console.error("Admin reply error:", error)
    return NextResponse.json(
      {
        error: "Failed to send reply",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}
