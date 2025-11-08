import { NextRequest, NextResponse } from "next/server"
import { Ticket } from "@/models/Ticket"
import { User } from "@/models/User"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth/auth-options"
import { connectToDatabase } from "@/lib/mongodb"

export async function GET(request: NextRequest) {
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

    const tickets = await Ticket.find({ userId: session.user.id })
      .sort({ updatedAt: -1 })
      .lean()

    const formattedTickets = tickets.map((ticket: any) => ({
      id: ticket._id.toString(),
      subject: ticket.subject,
      category: ticket.category,
      priority: ticket.priority,
      status: ticket.status,
      messageCount: ticket.messages.length,
      lastReplyAt: ticket.lastReplyAt,
      lastReplyBy: ticket.lastReplyBy,
      createdAt: ticket.createdAt,
      updatedAt: ticket.updatedAt,
    }))

    return NextResponse.json({ tickets: formattedTickets })
  } catch (error) {
    console.error("Ticket fetch error:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch tickets",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
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
    const { subject, category, priority, message } = body

    if (!subject || !message) {
      return NextResponse.json(
        { error: "Subject and message are required" },
        { status: 400 }
      )
    }

    const newTicket = await Ticket.create({
      userId: session.user.id,
      subject,
      category: category || "general",
      priority: priority || "medium",
      status: "open",
      messages: [
        {
          authorId: session.user.id,
          content: message,
          createdAt: new Date(),
        },
      ],
      lastReplyAt: new Date(),
      lastReplyBy: "user",
    })

    return NextResponse.json(
      {
        ticket: {
          id: newTicket._id.toString(),
          subject: newTicket.subject,
          category: newTicket.category,
          priority: newTicket.priority,
          status: newTicket.status,
          messageCount: newTicket.messages.length,
          createdAt: newTicket.createdAt,
        },
        message: "Ticket created successfully",
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Ticket creation error:", error)
    return NextResponse.json(
      {
        error: "Failed to create ticket",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}
