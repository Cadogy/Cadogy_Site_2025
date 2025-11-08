import { Suspense } from "react"
import { Metadata } from "next"

import { Skeleton } from "@/components/ui/skeleton"
import { AdminTicketsClient } from "@/components/admin/admin-tickets-client"

export const metadata: Metadata = {
  title: "Ticket Management - Admin",
  description: "Manage all user tickets and inquiries",
}

export default async function AdminTicketsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Ticket Management</h1>
        <p className="text-muted-foreground">
          View and manage all user tickets and inquiries.
        </p>
      </div>

      <div className="space-y-4">
        <Suspense fallback={<Skeleton className="h-[700px] w-full" />}>
          <AdminTicketsClient />
        </Suspense>
      </div>
    </div>
  )
}

