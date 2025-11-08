import type { Metadata } from "next"

import { siteConfig } from "@/config/site"
import { TicketDetailContent } from "@/components/dashboard/ticket-detail-content"

export const metadata: Metadata = {
  title: `Inquiry Details - ${siteConfig.name}`,
  description: "View and manage your inquiry conversation.",
  robots: {
    index: false,
    follow: true,
    nocache: true,
  },
}

export default function TicketDetailPage({
  params,
}: {
  params: { id: string }
}) {
  return <TicketDetailContent ticketId={params.id} />
}

