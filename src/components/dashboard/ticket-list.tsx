"use client"

import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { MessageSquare } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface Ticket {
  id: string
  subject: string
  category:
    | "technical"
    | "billing"
    | "general"
    | "feature-request"
    | "bug-report"
  priority: "low" | "medium" | "high"
  status: "open" | "in-progress" | "resolved" | "closed"
  messageCount: number
  lastReplyAt?: string
  lastReplyBy?: "user" | "admin"
  createdAt: string
  updatedAt: string
}

interface TicketListProps {
  tickets: Ticket[]
  isLoading: boolean
}

const categoryLabels: Record<Ticket["category"], string> = {
  technical: "Technical Question",
  billing: "Pricing & Billing",
  general: "General Inquiry",
  "feature-request": "Project Discussion",
  "bug-report": "Partnership",
}

const statusColors: Record<Ticket["status"], string> = {
  open: "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20",
  "in-progress": "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20",
  resolved: "bg-green-500/10 text-green-500 hover:bg-green-500/20",
  closed: "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20",
}

const priorityColors: Record<Ticket["priority"], string> = {
  low: "bg-gray-500/10 text-gray-500",
  medium: "bg-yellow-500/10 text-yellow-500",
  high: "bg-red-500/10 text-red-500",
}

export function TicketList({ tickets, isLoading }: TicketListProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-32" />
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </CardContent>
      </Card>
    )
  }

  if (tickets.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <MessageSquare className="mb-4 h-12 w-12 text-muted-foreground/50" />
          <h3 className="mb-2 text-lg font-semibold">No inquiries yet</h3>
          <p className="text-center text-sm text-muted-foreground">
            Reach out to us about potential projects, partnerships, or questions
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <h2 className="text-lg font-semibold">Your Inquiries</h2>
      </CardHeader>
      <CardContent className="space-y-3">
        {tickets.map((ticket: Ticket) => (
          <Link
            key={ticket.id}
            href={`/dashboard/tickets/${ticket.id}`}
            className="block w-full rounded-lg border border-border p-4 text-left transition-colors hover:bg-muted/50"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-medium">{ticket.subject}</h3>
                  {ticket.lastReplyBy === "admin" &&
                    (ticket.status === "open" ||
                      ticket.status === "in-progress") && (
                      <Badge
                        variant="secondary"
                        className="bg-primary/10 text-primary"
                      >
                        New Reply
                      </Badge>
                    )}
                </div>

                <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  <Badge
                    variant="outline"
                    className={statusColors[ticket.status]}
                  >
                    {ticket.status}
                  </Badge>
                  <Badge
                    variant="outline"
                    className={priorityColors[ticket.priority]}
                  >
                    {ticket.priority}
                  </Badge>
                  <Badge variant="outline">
                    {categoryLabels[ticket.category]}
                  </Badge>
                  <span className="flex items-center gap-1">
                    <MessageSquare className="h-3 w-3" />
                    {ticket.messageCount}
                  </span>
                </div>

                <p className="text-xs text-muted-foreground">
                  Last updated{" "}
                  {formatDistanceToNow(new Date(ticket.updatedAt), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </CardContent>
    </Card>
  )
}
