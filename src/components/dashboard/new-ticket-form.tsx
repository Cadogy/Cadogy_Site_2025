"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Loader2, Save } from "lucide-react"
import { useForm } from "react-hook-form"

import { useToast } from "@/hooks/use-toast"
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface FormData {
  subject: string
  category: string
  priority: string
  message: string
}

const AUTOSAVE_KEY = "new_inquiry_draft"
const AUTOSAVE_INTERVAL = 3000

export function NewTicketForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const saveTimerRef = useRef<NodeJS.Timeout | null>(null)
  const savingTimerRef = useRef<NodeJS.Timeout | null>(null)

  const form = useForm<FormData>({
    defaultValues: {
      subject: "",
      category: "general",
      priority: "medium",
      message: "",
    },
  })

  useEffect(() => {
    const saved = localStorage.getItem(AUTOSAVE_KEY)
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        form.reset(parsed.data)
        setLastSaved(new Date(parsed.timestamp))
        toast({
          title: "Draft restored",
          description: "Your previous draft has been loaded.",
        })
      } catch (error) {
        console.error("Failed to restore draft:", error)
      }
    }
  }, [form, toast])

  useEffect(() => {
    const subscription = form.watch((values) => {
      const hasContent =
        values.subject ||
        values.message ||
        values.category !== "general" ||
        values.priority !== "medium"

      if (!hasContent) return

      if (saveTimerRef.current) {
        clearTimeout(saveTimerRef.current)
      }

      if (savingTimerRef.current) {
        clearTimeout(savingTimerRef.current)
      }

      setIsSaving(true)

      saveTimerRef.current = setTimeout(() => {
        const draftData = {
          data: values,
          timestamp: new Date().toISOString(),
        }
        localStorage.setItem(AUTOSAVE_KEY, JSON.stringify(draftData))
        setLastSaved(new Date())

        savingTimerRef.current = setTimeout(() => {
          setIsSaving(false)
        }, 500)
      }, AUTOSAVE_INTERVAL)
    })

    return () => {
      subscription.unsubscribe()
      if (saveTimerRef.current) {
        clearTimeout(saveTimerRef.current)
      }
      if (savingTimerRef.current) {
        clearTimeout(savingTimerRef.current)
      }
    }
  }, [form])

  const handleSubmit = async (data: FormData) => {
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/dashboard/tickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Failed to submit inquiry")
      }

      localStorage.removeItem(AUTOSAVE_KEY)

      toast({
        title: "Inquiry submitted",
        description: "Thank you for reaching out! We'll get back to you soon.",
      })

      form.reset()
      router.push("/dashboard/tickets")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit inquiry. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClearDraft = () => {
    localStorage.removeItem(AUTOSAVE_KEY)
    form.reset({
      subject: "",
      category: "general",
      priority: "medium",
      message: "",
    })
    setLastSaved(null)
    toast({
      title: "Draft cleared",
      description: "Your draft has been removed.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard/tickets">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Inquiries
          </Link>
        </Button>
        {lastSaved && (
          <div className="ml-auto flex items-center gap-2 text-sm text-muted-foreground">
            {isSaving ? (
              <>
                <Save className="h-3 w-3 animate-pulse" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="h-3 w-3" />
                <span>Last saved at {lastSaved.toLocaleTimeString()}</span>
              </>
            )}
          </div>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>New Inquiry</CardTitle>
          <CardDescription>
            Reach out to us about potential projects, partnerships, or ask
            questions about our web agency services. We&apos;ll get back to you
            as soon as possible.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="subject"
                rules={{ required: "Subject is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="What would you like to discuss?"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-6 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="general">
                            General Inquiry
                          </SelectItem>
                          <SelectItem value="technical">
                            Technical Question
                          </SelectItem>
                          <SelectItem value="billing">
                            Pricing & Billing
                          </SelectItem>
                          <SelectItem value="feature-request">
                            Project Discussion
                          </SelectItem>
                          <SelectItem value="bug-report">
                            Partnership Opportunity
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Urgency</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select urgency" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="low">Low - No rush</SelectItem>
                          <SelectItem value="medium">
                            Medium - Within a week
                          </SelectItem>
                          <SelectItem value="high">
                            High - Time sensitive
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="message"
                rules={{
                  required: "Message is required",
                  minLength: {
                    value: 10,
                    message: "Message must be at least 10 characters",
                  },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us about your project, question, or how we can help..."
                        className="min-h-[200px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Please provide as much detail as possible about your
                      inquiry. Your draft is automatically saved as you type.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-between gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClearDraft}
                  disabled={isSubmitting}
                >
                  Clear Draft
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Submit Inquiry
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
