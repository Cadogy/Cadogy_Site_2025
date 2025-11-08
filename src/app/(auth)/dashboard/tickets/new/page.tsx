import type { Metadata } from "next"

import { siteConfig } from "@/config/site"
import { NewTicketForm } from "@/components/dashboard/new-ticket-form"

export const metadata: Metadata = {
  title: `New Inquiry - ${siteConfig.name}`,
  description:
    "Reach out to our team about potential projects or questions.",
  robots: {
    index: false,
    follow: true,
    nocache: true,
  },
}

export default function NewTicketPage() {
  return <NewTicketForm />
}

