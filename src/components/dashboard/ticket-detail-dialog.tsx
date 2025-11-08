"use client"

import { useCallback, useEffect, useState } from "react"
import { format } from "date-fns"
import { Loader2, Send, User, UserCog } from "lucide-react"
import { useForm } from "react-hook-form"

import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { Textarea } from "@/components/ui/textarea"

interface TicketMessage {
  id: string
  author: {
    userId: string
    name: string
    role: "user" | "admin"
  }
  content: string
  createdAt: string
}

interface TicketDetail {
  id: string
  subject: string
  category: string
  priority: string
  status: "open" | "in-progress" | "resolved" | "closed"
  messages: TicketMessage[]
  createdAt: string
  updatedAt: string
}

interface TicketDetailDialogProps {
  ticketId: string
  open: boolean
  onOpenChange: (open: boolean) => void
  onTicketUpdated: () => void
}

interface ReplyFormData {
  message: string
}

const statusColors: Record<string, string> = {
  open: "bg-blue-500/10 text-blue-500",
  "in-progress": "bg-yellow-500/10 text-yellow-500",
  resolved: "bg-green-500/10 text-green-500",
  closed: "bg-gray-500/10 text-gray-500",
}

export function TicketDetailDialog({
  ticketId,
  open,
  onOpenChange,
  onTicketUpdated,
}: TicketDetailDialogProps) {
  const [ticket, setTicket] = useState<TicketDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false)
  const { toast } = useToast()

  const form = useForm<ReplyFormData>({
    defaultValues: {
      message: "",
    },
  })

  const fetchTicket = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/dashboard/tickets/${ticketId}`)

      if (!response.ok) {
        throw new Error("Failed to fetch ticket")
      }

      const data = await response.json()
      setTicket(data.ticket)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load ticket details",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }, [ticketId, toast])

  useEffect(() => {
    if (open && ticketId) {
      fetchTicket()
    }
  }, [open, ticketId, fetchTicket])

  const handleReply = async (data: ReplyFormData) => {
    if (!ticket) return

    setIsSubmitting(true)

    try {
      const response = await fetch(`/api/dashboard/tickets/${ticketId}/reply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Failed to send reply")
      }

      toast({
        title: "Reply sent",
        description: "Your message has been sent to our team.",
      })

      form.reset()
      fetchTicket()
      onTicketUpdated()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send reply. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleStatusChange = async (newStatus: string) => {
    if (!ticket) return

    setIsUpdatingStatus(true)

    try {
      const response = await fetch(`/api/dashboard/tickets/${ticketId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (!response.ok) {
        throw new Error("Failed to update status")
      }

      toast({
        title: "Status updated",
        description: "Inquiry status has been updated successfully.",
      })

      fetchTicket()
      onTicketUpdated()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update status. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsUpdatingStatus(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[90vh] flex-col sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 pr-6">
            {isLoading ? (
              <Skeleton className="h-6 w-64" />
            ) : (
              <>
                {ticket?.subject}
                <Badge className={statusColors[ticket?.status || "open"]}>
                  {ticket?.status}
                </Badge>
              </>
            )}
          </DialogTitle>
          <DialogDescription>
            {isLoading ? (
              <Skeleton className="h-4 w-48" />
            ) : (
              <>
                {ticket?.category} • {ticket?.priority} urgency • Created{" "}
                {ticket && format(new Date(ticket.createdAt), "PPp")}
              </>
            )}
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex-1 space-y-4 overflow-y-auto py-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-24 w-full" />
            ))}
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-4 overflow-y-auto py-4">
              {ticket?.messages.map((message, index) => (
                <div
                  key={message.id || index}
                  className={cn(
                    "flex gap-3 rounded-lg border p-4",
                    message.author.role === "admin"
                      ? "border-primary/20 bg-primary/5"
                      : "bg-muted/50"
                  )}
                >
                  <div className="flex-shrink-0">
                    {message.author.role === "admin" ? (
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                        <UserCog className="h-4 w-4 text-primary" />
                      </div>
                    ) : (
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
                        <User className="h-4 w-4 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{message.author.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {message.author.role === "admin"
                          ? "Cadogy Team"
                          : "You"}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {format(new Date(message.createdAt), "PPp")}
                      </span>
                    </div>
                    <p className="whitespace-pre-wrap text-sm">
                      {message.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4 border-t pt-4">
              {ticket &&
                (ticket.status === "open" ||
                  ticket.status === "in-progress") && (
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(handleReply)}
                      className="space-y-3"
                    >
                      <FormField
                        control={form.control}
                        name="message"
                        rules={{
                          required: "Reply message is required",
                          minLength: {
                            value: 1,
                            message: "Message must not be empty",
                          },
                        }}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Textarea
                                placeholder="Type your reply..."
                                className="min-h-[100px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="flex items-center justify-between gap-2">
                        <Select
                          value={ticket.status}
                          onValueChange={handleStatusChange}
                          disabled={isUpdatingStatus}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Change status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="open">Open</SelectItem>
                            <SelectItem value="in-progress">
                              In Progress
                            </SelectItem>
                            <SelectItem value="resolved">Resolved</SelectItem>
                            <SelectItem value="closed">Closed</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button type="submit" disabled={isSubmitting}>
                          {isSubmitting ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          ) : (
                            <Send className="mr-2 h-4 w-4" />
                          )}
                          Send Reply
                        </Button>
                      </div>
                    </form>
                  </Form>
                )}

              {ticket &&
                (ticket.status === "resolved" ||
                  ticket.status === "closed") && (
                  <div className="rounded-lg border border-border bg-muted/50 p-4 text-center">
                    <p className="text-sm text-muted-foreground">
                      This inquiry is {ticket.status}. Change the status to
                      reopen it.
                    </p>
                    <Select
                      value={ticket.status}
                      onValueChange={handleStatusChange}
                      disabled={isUpdatingStatus}
                    >
                      <SelectTrigger className="mx-auto mt-3 w-[180px]">
                        <SelectValue placeholder="Change status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="open">Open</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
