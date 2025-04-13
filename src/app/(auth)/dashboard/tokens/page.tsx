import { Metadata } from "next"

import { TokenTopUpContent } from "@/components/dashboard/token-top-up-content"

export const metadata: Metadata = {
  title: "Top-up | Cadogy",
  description: "Purchase tokens to use with the Cadogy API",
}

export default function TokensPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">Top-up</h1>
        <p className="text-muted-foreground">
          Purchase tokens to use with the Cadogy API services
        </p>
      </div>
      <TokenTopUpContent />
    </div>
  )
}
