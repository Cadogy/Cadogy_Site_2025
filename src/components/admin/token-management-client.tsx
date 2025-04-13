"use client"

import { Suspense } from "react"

import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import {
  TokenOperationsDialog,
  TransactionsTable,
} from "@/components/admin/token-management"

export function TokenManagementClient() {
  return (
    <>
      <Card className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Token Operations</h2>
          <Suspense fallback={<Skeleton className="h-10 w-24" />}>
            <TokenOperationsDialog />
          </Suspense>
        </div>
        <p className="text-sm text-muted-foreground">
          Add or deduct tokens from user accounts. All operations are logged.
        </p>
      </Card>

      <Card className="p-6">
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Recent Transactions</h2>
          <p className="text-sm text-muted-foreground">
            View history of token transactions.
          </p>
        </div>
        <Separator className="my-4" />
        <Suspense
          fallback={
            <div className="space-y-4">
              {Array(5)
                .fill(null)
                .map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
            </div>
          }
        >
          <TransactionsTable />
        </Suspense>
      </Card>
    </>
  )
}
