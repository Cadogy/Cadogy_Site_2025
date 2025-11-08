import type { Metadata } from "next"

import { AdminTicketDetailContent } from "@/components/admin/admin-ticket-detail-content"

export const metadata: Metadata = {
  title: "Ticket Details - Admin",
  description: "View and manage ticket conversation.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
}

export default function AdminTicketDetailPage({
  params,
}: {
  params: { id: string }
}) {
  return <AdminTicketDetailContent ticketId={params.id} />
}

