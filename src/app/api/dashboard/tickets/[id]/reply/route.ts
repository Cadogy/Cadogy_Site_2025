import { NextRequest, NextResponse } from "next/server"
import { Ticket } from "@/models/Ticket"
import { User } from "@/models/User"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth/auth-options"
import { connectToDatabase } from "@/lib/mongodb"

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

  try {
    await connectToDatabase()

    const body = await request.json()
    const { message } = body

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      )
    }

    const ticket = await Ticket.findOne({
      _id: params.id,
      userId: session.user.id,
    })

    if (!ticket) {
      return NextResponse.json({ error: "Ticket not found" }, { status: 404 })
    }

    ticket.messages.push({
      authorId: session.user.id,
      content: message,
      createdAt: new Date(),
    })

    ticket.lastReplyAt = new Date()
    ticket.lastReplyBy = "user"

    if (ticket.status === "resolved" || ticket.status === "closed") {
      ticket.status = "open"
    }

    await ticket.save()

    const user = await User.findById(session.user.id).lean() as any

    return NextResponse.json({
      success: true,
      message: "Reply added successfully",
      reply: {
        author: {
          userId: session.user.id,
          name: user?.name || session.user.name || "User",
          role: user?.role || "user",
          image: user?.image,
        },
        content: message,
        createdAt: new Date(),
      },
    })
  } catch (error) {
    console.error("Reply creation error:", error)
    return NextResponse.json(
      {
        error: "Failed to add reply",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}
