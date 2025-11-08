import type { Metadata } from "next"

import { siteConfig } from "@/config/site"
import { TicketsContent } from "@/components/dashboard/tickets-content"

export const metadata: Metadata = {
  title: `Inquiries - ${siteConfig.name}`,
  description: "View and manage your inquiries. Reach out about projects, partnerships, or questions.",
  robots: {
    index: false,
    follow: true,
    nocache: true,
  },
}

export default function TicketsPage() {
  return <TicketsContent />
}
