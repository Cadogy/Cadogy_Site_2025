"use client"

import { useEffect, useState } from "react"
import { Coins } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

interface TokenManagementProps {
  initialBalance: number
  onBalanceChange?: (newBalance: number) => void
  onRefreshRequest?: () => void
}

export function TokenManagement({
  initialBalance,
  onBalanceChange,
  onRefreshRequest,
}: TokenManagementProps) {
  const [amount, setAmount] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  // Debug output for initialBalance
  useEffect(() => {
    // console.log("TokenManagement component - initialBalance:", initialBalance)
  }, [initialBalance])

  const handleTokenAction = async (action: "add" | "use") => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid positive number",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    // console.log(`Starting token ${action} operation with amount:`, amount)

    try {
      const response = await fetch("/api/user/tokens", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action,
          amount: Number(amount),
        }),
      })

      // console.log("Response status:", response.status)
      const data = await response.json()
      // console.log("Response data:", data)

      if (!response.ok) {
        throw new Error(data.message || "Failed to update tokens")
      }

      if (data.success === false) {
        // console.log("Token operation failed:", data.error)
        toast({
          title: "Token Operation Failed",
          description: data.error || "Could not complete the operation",
          variant: "destructive",
        })
        return
      }

      // Get the new balance from the response
      const newBalance = data.balance || data.newBalance || 0
      // console.log("New token balance:", newBalance)

      // Update UI through callback
      if (onBalanceChange) {
        // console.log("Calling onBalanceChange with:", newBalance)
        onBalanceChange(newBalance)
      }

      // Request a dashboard data refresh to ensure consistency
      if (onRefreshRequest) {
        // console.log("Requesting dashboard refresh")
        onRefreshRequest()
      }

      toast({
        title: "Success",
        description: `Tokens ${action === "add" ? "added to" : "used from"} your account`,
      })

      // Clear the input
      setAmount("")
    } catch (error) {
      console.error("Token operation error:", error)
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Manage Tokens</CardTitle>
        <Coins className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Input
            type="number"
            placeholder="Enter token amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="max-w-[200px]"
            min="1"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleTokenAction("add")}
            disabled={isLoading}
          >
            Add
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleTokenAction("use")}
            disabled={isLoading}
          >
            Use
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Available: {initialBalance.toLocaleString()} tokens
        </p>
      </CardContent>
    </Card>
  )
}
