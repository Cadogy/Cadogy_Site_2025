"use client"

import { useState } from "react"

import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  TokenOperationsDialog,
  TransactionsTable,
} from "@/components/admin/token-management"

export function TokenManagementClient() {
  const [refreshKey, setRefreshKey] = useState(0)

  const handleTransactionSuccess = () => {
    setRefreshKey((prev) => prev + 1)
  }

  return (
    <>
      <Card className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Token Operations</h2>
          <TokenOperationsDialog onSuccess={handleTransactionSuccess} />
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
        <TransactionsTable refresh={refreshKey} />
      </Card>
    </>
  )
}
