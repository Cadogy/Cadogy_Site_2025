import { NextRequest, NextResponse } from "next/server"
import { Ticket } from "@/models/Ticket"
import { User } from "@/models/User"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth/auth-options"
import { connectToDatabase } from "@/lib/mongodb"

export async function GET(
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

    const ticket = await Ticket.findOne({
      _id: params.id,
      userId: session.user.id,
    }).lean()

    if (!ticket) {
      return NextResponse.json({ error: "Ticket not found" }, { status: 404 })
    }

    const ticketData = ticket as any

    const authorIds = [
      ...new Set(ticketData.messages.map((msg: any) => msg.authorId)),
    ]
    const users = await User.find({ _id: { $in: authorIds } }).lean()
    const userMap = new Map(users.map((u: any) => [u._id.toString(), u]))

    const formattedTicket = {
      id: ticketData._id.toString(),
      subject: ticketData.subject,
      category: ticketData.category,
      priority: ticketData.priority,
      status: ticketData.status,
      messages: ticketData.messages.map((msg: any) => {
        const author = userMap.get(msg.authorId)
        return {
          id: msg._id?.toString(),
          author: {
            userId: msg.authorId,
            name: author?.name || "Unknown User",
            role: author?.role || "user",
            image: author?.image,
          },
          content: msg.content,
          createdAt: msg.createdAt,
        }
      }),
      createdAt: ticketData.createdAt,
      updatedAt: ticketData.updatedAt,
    }

    return NextResponse.json({ ticket: formattedTicket })
  } catch (error) {
    console.error("Ticket fetch error:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch ticket",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}

export async function PATCH(
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
        message: "Only administrators can change inquiry status",
      },
      { status: 403 }
    )
  }

  try {
    await connectToDatabase()

    const body = await request.json()
    const { status } = body

    if (!status) {
      return NextResponse.json({ error: "Status is required" }, { status: 400 })
    }

    const ticket = await Ticket.findOneAndUpdate(
      {
        _id: params.id,
        userId: session.user.id,
      },
      {
        status,
      },
      { new: true }
    )

    if (!ticket) {
      return NextResponse.json({ error: "Ticket not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "Ticket status updated successfully",
      ticket: {
        id: ticket._id.toString(),
        status: ticket.status,
      },
    })
  } catch (error) {
    console.error("Ticket update error:", error)
    return NextResponse.json(
      {
        error: "Failed to update ticket",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}
