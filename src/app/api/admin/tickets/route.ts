import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth/auth-options"
import { connectToDatabase } from "@/lib/mongodb"
import { Ticket } from "@/models/Ticket"
import { User } from "@/models/User"

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

    const searchParams = request.nextUrl.searchParams
    const search = searchParams.get("search") || ""
    const status = searchParams.get("status") || ""
    const priority = searchParams.get("priority") || ""
    const category = searchParams.get("category") || ""
    const sortBy = searchParams.get("sortBy") || "updatedAt"
    const sortOrder = searchParams.get("sortOrder") || "desc"

    const query: any = {}

    if (status) {
      query.status = status
    }
    if (priority) {
      query.priority = priority
    }
    if (category) {
      query.category = category
    }
    if (search) {
      query.$or = [
        { subject: { $regex: search, $options: "i" } },
        { userId: { $regex: search, $options: "i" } },
      ]
    }

    const sortOptions: any = {}
    sortOptions[sortBy] = sortOrder === "asc" ? 1 : -1

    const tickets = await Ticket.find(query).sort(sortOptions).lean()

    const userIds = [...new Set(tickets.map((t: any) => t.userId))]
    const users = await User.find({ _id: { $in: userIds } }).lean()
    const userMap = new Map(
      users.map((u: any) => [u._id.toString(), { name: u.name, email: u.email }])
    )

    const formattedTickets = tickets.map((ticket: any) => {
      const user = userMap.get(ticket.userId) || { name: "Unknown", email: "" }
      return {
        id: ticket._id.toString(),
        userId: ticket.userId,
        userName: user.name,
        userEmail: user.email,
        subject: ticket.subject,
        category: ticket.category,
        priority: ticket.priority,
        status: ticket.status,
        messageCount: ticket.messages.length,
        lastReplyAt: ticket.lastReplyAt,
        lastReplyBy: ticket.lastReplyBy,
        createdAt: ticket.createdAt,
        updatedAt: ticket.updatedAt,
      }
    })

    return NextResponse.json({ tickets: formattedTickets })
  } catch (error) {
    console.error("Admin ticket fetch error:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch tickets",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}
