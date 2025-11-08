"use client"

import { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import { AlertCircle, Plus, RefreshCw } from "lucide-react"
import { useSession } from "next-auth/react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { TicketList } from "@/components/dashboard/ticket-list"
import { TicketStatsCards } from "@/components/dashboard/ticket-stats-cards"

export interface Ticket {
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

const POLL_INTERVAL = 15000

export function TicketsContent() {
  const { data: session } = useSession()
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchTickets = useCallback(async (isBackgroundRefresh = false) => {
    try {
      if (!isBackgroundRefresh) {
        setIsLoading(true)
      } else {
        setIsRefreshing(true)
      }

      const response = await fetch("/api/dashboard/tickets")

      if (!response.ok) {
        throw new Error("Failed to fetch tickets")
      }

      const data = await response.json()
      setTickets(data.tickets || [])
      setError(null)
    } catch (err) {
      if (!isBackgroundRefresh) {
        setError(err instanceof Error ? err.message : "Failed to load tickets")
      }
    } finally {
      setIsLoading(false)
      setIsRefreshing(false)
    }
  }, [])

  useEffect(() => {
    if (session?.user) {
      fetchTickets(false)
    }
  }, [session, fetchTickets])

  useEffect(() => {
    if (!session?.user) return

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        fetchTickets(true)
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)

    const pollInterval = setInterval(() => {
      if (!document.hidden) {
        fetchTickets(true)
      }
    }, POLL_INTERVAL)

    return () => {
      clearInterval(pollInterval)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [session, fetchTickets])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight">
              Your Inquiries
            </h1>
            {isRefreshing && (
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                <span>Updating...</span>
              </div>
            )}
          </div>
          <p className="text-muted-foreground">
            Reach out to discuss projects, partnerships, or ask questions
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/tickets/new">
            <Plus className="mr-2 h-4 w-4" />
            New Inquiry
          </Link>
        </Button>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <TicketStatsCards tickets={tickets} isLoading={isLoading} />

      <TicketList tickets={tickets} isLoading={isLoading} />
    </div>
  )
}
