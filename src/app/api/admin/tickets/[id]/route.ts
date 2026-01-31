import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth/auth-options"
import { connectToDatabase } from "@/lib/mongodb"
import { Ticket } from "@/models/Ticket"
import { User } from "@/models/User"
import { revalidatePath } from "next/cache"

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

    const ticket = await Ticket.findById(params.id).lean() as any

    if (!ticket) {
      return NextResponse.json(
        { error: "Ticket not found" },
        { status: 404 }
      )
    }

    const user = await User.findById(ticket.userId).lean() as any

    const messageAuthorIds = [
      ...new Set(ticket.messages.map((m: any) => m.authorId)),
    ]
    const messageAuthors = await User.find({
      _id: { $in: messageAuthorIds },
    }).lean()
    const authorMap = new Map(
      messageAuthors.map((a: any) => [
        a._id.toString(),
        { name: a.name, role: a.role, image: a.image },
      ])
    )

    const formattedTicket = {
      id: ticket._id.toString(),
      userId: ticket.userId,
      userName: user?.name || "Unknown User",
      userEmail: user?.email || "",
      subject: ticket.subject,
      category: ticket.category,
      priority: ticket.priority,
      status: ticket.status,
      messages: ticket.messages.map((msg: any) => {
        const author = authorMap.get(msg.authorId) || {
          name: "Unknown",
          role: "user",
          image: null,
        }
        return {
          id: msg._id.toString(),
          author: {
            userId: msg.authorId,
            name: author.name,
            role: author.role,
            image: author.image,
          },
          content: msg.content,
          createdAt: msg.createdAt,
        }
      }),
      createdAt: ticket.createdAt,
      updatedAt: ticket.updatedAt,
    }

    return NextResponse.json({ ticket: formattedTicket })
  } catch (error) {
    console.error("Admin ticket fetch error:", error)
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
        message: "You do not have permission to access this resource",
      },
      { status: 403 }
    )
  }

  try {
    await connectToDatabase()

    const body = await request.json()
    const { status, priority, category } = body

    const updateFields: any = {}
    if (status) updateFields.status = status
    if (priority) updateFields.priority = priority
    if (category) updateFields.category = category

    const ticket = await Ticket.findByIdAndUpdate(
      params.id,
      updateFields,
      { new: true }
    )

    if (!ticket) {
      return NextResponse.json(
        { error: "Ticket not found" },
        { status: 404 }
      )
    }

    // Revalidate admin tickets pages
    revalidatePath("/admin/tickets")
    revalidatePath(`/admin/tickets/${params.id}`)

    return NextResponse.json({
      message: "Ticket updated successfully",
      ticket: {
        id: ticket._id.toString(),
        status: ticket.status,
        priority: ticket.priority,
        category: ticket.category,
      },
    })
  } catch (error) {
    console.error("Admin ticket update error:", error)
    return NextResponse.json(
      {
        error: "Failed to update ticket",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}

export async function DELETE(
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

    const ticket = await Ticket.findByIdAndDelete(params.id)

    if (!ticket) {
      return NextResponse.json(
        { error: "Ticket not found" },
        { status: 404 }
      )
    }

    // Revalidate admin tickets list
    revalidatePath("/admin/tickets")

    return NextResponse.json({
      message: "Ticket deleted successfully",
    })
  } catch (error) {
    console.error("Admin ticket delete error:", error)
    return NextResponse.json(
      {
        error: "Failed to delete ticket",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}
