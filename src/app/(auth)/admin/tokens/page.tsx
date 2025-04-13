import { Suspense } from "react"
import { Metadata } from "next"

import { Skeleton } from "@/components/ui/skeleton"

import { TokenManagementClient } from "../../../../components/admin/token-management-client"

export const metadata: Metadata = {
  title: "Token Management - Admin",
  description: "Manage token balances and view transaction history",
}

export default async function TokensPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Token Management</h1>
        <p className="text-muted-foreground">
          Manage user token balances and view transaction history.
        </p>
      </div>

      <div className="space-y-6">
        <Suspense fallback={<Skeleton className="h-[600px] w-full" />}>
          <TokenManagementClient />
        </Suspense>
      </div>
    </div>
  )
}
