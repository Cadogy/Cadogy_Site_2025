"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import {
  ArrowLeft,
  Loader2,
  RefreshCw,
  Send,
  Trash2,
  User,
  UserCog,
} from "lucide-react"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"

import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
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
    image?: string
  }
  content: string
  createdAt: string
}

interface TicketDetail {
  id: string
  userId: string
  userName: string
  userEmail: string
  subject: string
  category: string
  priority: string
  status: "open" | "in-progress" | "resolved" | "closed"
  messages: TicketMessage[]
  createdAt: string
  updatedAt: string
}

interface AdminTicketDetailContentProps {
  ticketId: string
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

const priorityColors: Record<string, string> = {
  low: "bg-gray-500/10 text-gray-500",
  medium: "bg-yellow-500/10 text-yellow-500",
  high: "bg-red-500/10 text-red-500",
}

const POLL_INTERVAL = 10000

export function AdminTicketDetailContent({
  ticketId,
}: AdminTicketDetailContentProps) {
  const { data: session } = useSession()
  const [ticket, setTicket] = useState<TicketDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [hasNewMessages, setHasNewMessages] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const previousMessageCountRef = useRef<number>(0)

  const form = useForm<ReplyFormData>({
    defaultValues: {
      message: "",
    },
  })

  const fetchTicket = useCallback(
    async (isBackgroundRefresh = false) => {
      try {
        if (!isBackgroundRefresh) {
          setIsLoading(true)
        } else {
          setIsRefreshing(true)
        }

        const response = await fetch(`/api/admin/tickets/${ticketId}`)

        if (!response.ok) {
          throw new Error("Failed to fetch ticket")
        }

        const data = await response.json()
        const newTicket = data.ticket

        if (isBackgroundRefresh && previousMessageCountRef.current > 0) {
          const hasNewReplies =
            newTicket.messages.length > previousMessageCountRef.current
          if (hasNewReplies) {
            setHasNewMessages(true)
            setTimeout(() => {
              messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
            }, 100)
            setTimeout(() => setHasNewMessages(false), 3000)
          }
        }

        setTicket(newTicket)
        previousMessageCountRef.current = newTicket.messages.length
      } catch (error) {
        if (!isBackgroundRefresh) {
          toast({
            title: "Error",
            description: "Failed to load ticket details",
            variant: "destructive",
          })
          router.push("/admin/tickets")
        }
      } finally {
        setIsLoading(false)
        setIsRefreshing(false)
      }
    },
    [ticketId, toast, router]
  )

  useEffect(() => {
    if (ticketId) {
      fetchTicket(false)
    }
  }, [ticketId, fetchTicket])

  useEffect(() => {
    if (!ticketId || !ticket) return

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        fetchTicket(true)
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)

    const pollInterval = setInterval(() => {
      if (!document.hidden) {
        fetchTicket(true)
      }
    }, POLL_INTERVAL)

    return () => {
      clearInterval(pollInterval)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [ticketId, ticket, fetchTicket])

  const handleReply = async (data: ReplyFormData) => {
    if (!ticket) return

    setIsSubmitting(true)

    try {
      const response = await fetch(`/api/admin/tickets/${ticketId}/reply`, {
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
        description: "Your message has been sent to the user.",
      })

      form.reset()
      fetchTicket(false)
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

  const handleUpdate = async (field: string, value: string) => {
    if (!ticket) return

    setIsUpdating(true)

    try {
      const response = await fetch(`/api/admin/tickets/${ticketId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ [field]: value }),
      })

      if (!response.ok) {
        throw new Error(`Failed to update ${field}`)
      }

      toast({
        title: "Ticket updated",
        description: `Ticket ${field} has been updated successfully.`,
      })

      fetchTicket(false)
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to update ${field}. Please try again.`,
        variant: "destructive",
      })
    } finally {
      setIsUpdating(false)
    }
  }

  const handleDelete = async () => {
    if (!ticket) return

    setIsDeleting(true)

    try {
      const response = await fetch(`/api/admin/tickets/${ticketId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete ticket")
      }

      toast({
        title: "Ticket deleted",
        description: "The ticket has been permanently deleted.",
      })

      router.push("/admin/tickets")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete ticket. Please try again.",
        variant: "destructive",
      })
      setIsDeleting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/admin/tickets">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Tickets
            </Link>
          </Button>
        </div>
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-48" />
          </CardHeader>
          <CardContent className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-32 w-full" />
            ))}
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!ticket) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/admin/tickets">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Tickets
            </Link>
          </Button>
        </div>
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Ticket not found</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/tickets">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Tickets
          </Link>
        </Button>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          {isRefreshing && (
            <>
              <RefreshCw className="h-3 w-3 animate-spin" />
              <span>Checking for updates...</span>
            </>
          )}
          {hasNewMessages && !isRefreshing && (
            <span className="text-primary">New messages received!</span>
          )}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <CardTitle>{ticket.subject}</CardTitle>
                <Badge className={statusColors[ticket.status]}>
                  {ticket.status}
                </Badge>
              </div>
              <CardDescription>
                Ticket ID: {ticket.id} • Created{" "}
                {format(new Date(ticket.createdAt), "PPp")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4 overflow-y-auto">
                {ticket.messages.map((message, index) => (
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
                      {message.author.image ? (
                        <div className="relative h-10 w-10 overflow-hidden rounded-lg">
                          <Image
                            src={message.author.image}
                            alt={message.author.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : message.author.role === "admin" ? (
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                          <UserCog className="h-5 w-5 text-primary" />
                        </div>
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                          <User className="h-5 w-5 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">
                          {message.author.name}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {message.author.role === "admin"
                            ? "Admin"
                            : "Customer"}
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
                <div ref={messagesEndRef} />
              </div>

              <div className="border-t pt-6">
                {ticket.status === "open" || ticket.status === "in-progress" ? (
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(handleReply)}
                      className="space-y-4"
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
                                placeholder="Type your admin reply..."
                                className="min-h-[120px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="flex justify-end">
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
                ) : (
                  <div className="rounded-lg border border-border bg-muted/50 p-6 text-center">
                    <p className="text-sm text-muted-foreground">
                      This ticket has been {ticket.status}. Change the status to
                      reopen it.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>User Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Name
                </p>
                <p className="text-sm">{ticket.userName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Email
                </p>
                <p className="text-sm">{ticket.userEmail}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  User ID
                </p>
                <p className="text-sm font-mono">{ticket.userId}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ticket Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <Select
                  value={ticket.status}
                  onValueChange={(value) => handleUpdate("status", value)}
                  disabled={isUpdating}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Priority</label>
                <Select
                  value={ticket.priority}
                  onValueChange={(value) => handleUpdate("priority", value)}
                  disabled={isUpdating}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Select
                  value={ticket.category}
                  onValueChange={(value) => handleUpdate("category", value)}
                  disabled={isUpdating}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technical">Technical</SelectItem>
                    <SelectItem value="billing">Billing</SelectItem>
                    <SelectItem value="general">General</SelectItem>
                    <SelectItem value="feature-request">
                      Feature Request
                    </SelectItem>
                    <SelectItem value="bug-report">Bug Report</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 pt-4">
                <p className="text-sm font-medium text-muted-foreground">
                  Last Updated
                </p>
                <p className="text-sm">
                  {format(new Date(ticket.updatedAt), "PPp")}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-destructive/50">
            <CardHeader>
              <CardTitle className="text-destructive">Danger Zone</CardTitle>
            </CardHeader>
            <CardContent>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="destructive"
                    className="w-full"
                    disabled={isDeleting}
                  >
                    {isDeleting ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="mr-2 h-4 w-4" />
                    )}
                    Delete Ticket
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      the ticket and all of its messages from the database.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDelete}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Delete Ticket
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

