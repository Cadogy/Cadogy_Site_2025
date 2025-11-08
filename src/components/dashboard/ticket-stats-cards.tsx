"use client"

import {
  CheckCircle2,
  Clock,
  MessageSquare,
  Ticket as TicketIcon,
} from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface Ticket {
  id: string
  status: "open" | "in-progress" | "resolved" | "closed"
  lastReplyBy?: "user" | "admin"
}

interface TicketStatsCardsProps {
  tickets: Ticket[]
  isLoading: boolean
}

export function TicketStatsCards({
  tickets,
  isLoading,
}: TicketStatsCardsProps) {
  const stats = {
    total: tickets.length,
    open: tickets.filter(
      (t) => t.status === "open" || t.status === "in-progress"
    ).length,
    resolved: tickets.filter((t) => t.status === "resolved").length,
    awaitingResponse: tickets.filter(
      (t) =>
        t.lastReplyBy === "admin" &&
        (t.status === "open" || t.status === "in-progress")
    ).length,
  }

  const statCards = [
    {
      title: "Total Inquiries",
      value: stats.total,
      icon: TicketIcon,
      description: "All time",
    },
    {
      title: "Active",
      value: stats.open,
      icon: Clock,
      description: "In discussion",
    },
    {
      title: "Resolved",
      value: stats.resolved,
      icon: CheckCircle2,
      description: "Completed",
    },
    {
      title: "Awaiting Reply",
      value: stats.awaitingResponse,
      icon: MessageSquare,
      description: "From you",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statCards.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                </>
              )}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
