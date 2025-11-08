"use client"

import { useEffect, useState } from "react"
import { MinusCircle, PlusCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"

interface User {
  id: string
  name: string | null
  email: string
  tokenBalance: number
}

interface TokenTransaction {
  id: string
  userId: string
  userName: string
  userEmail: string
  adminId: string
  adminName: string
  adminEmail: string
  tokens: number
  operation: string
  reason: string
  timestamp: string
}

export function TokenOperationsDialog({
  onSuccess,
}: {
  onSuccess?: () => void
}) {
  const [open, setOpen] = useState(false)
  const [operationType, setOperationType] = useState<"add" | "deduct">("add")
  const [isLoading, setIsLoading] = useState(false)
  const [selectedUser, setSelectedUser] = useState("")
  const [amount, setAmount] = useState(100)
  const [reason, setReason] = useState("")
  const [users, setUsers] = useState<User[]>([])
  const [selectedUserBalance, setSelectedUserBalance] = useState<number | null>(
    null
  )
  const { toast } = useToast()

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/admin/users")
        if (!response.ok) throw new Error("Failed to fetch users")
        const data = await response.json()
        setUsers(data.users || [])
      } catch (err) {
        console.error("Error fetching users:", err)
        toast({
          variant: "destructive",
          title: "Error",
          description: "Could not load user list",
        })
      }
    }

    fetchUsers()
  }, [toast])

  useEffect(() => {
    if (selectedUser) {
      const user = users.find((u) => u.id === selectedUser)
      setSelectedUserBalance(user?.tokenBalance ?? null)
    } else {
      setSelectedUserBalance(null)
    }
  }, [selectedUser, users])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedUser || amount <= 0) return

    if (
      operationType === "deduct" &&
      selectedUserBalance !== null &&
      amount > selectedUserBalance
    ) {
      toast({
        variant: "destructive",
        title: "Insufficient Tokens",
        description: `Cannot deduct ${amount} tokens. User only has ${selectedUserBalance} tokens available.`,
      })
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/admin/tokens", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: selectedUser,
          amount: Number(amount),
          reason,
          operation: operationType,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || "Failed to adjust tokens")
      }

      toast({
        title: "Success",
        description: `${operationType === "add" ? "Added" : "Deducted"} ${amount} tokens ${operationType === "add" ? "to" : "from"} user`,
      })

      setOpen(false)
      setSelectedUser("")
      setAmount(100)
      setReason("")
      
      if (onSuccess) {
        onSuccess()
      }
    } catch (err) {
      console.error("Error adjusting tokens:", err)
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to adjust tokens: ${err instanceof Error ? err.message : "Unknown error"}`,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Button onClick={() => setOpen(true)} variant="default">
        <PlusCircle className="mr-2 h-4 w-4" />
        Manage Tokens
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Manage User Tokens</DialogTitle>
              <DialogDescription>
                Add or deduct tokens from a user's balance
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="operation" className="text-right">
                  Operation
                </Label>
                <Select
                  value={operationType}
                  onValueChange={(value) =>
                    setOperationType(value as "add" | "deduct")
                  }
                >
                  <SelectTrigger id="operation" className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="add">
                      <div className="flex items-center">
                        <PlusCircle className="mr-2 h-4 w-4 text-green-600" />
                        Add Tokens
                      </div>
                    </SelectItem>
                    <SelectItem value="deduct">
                      <div className="flex items-center">
                        <MinusCircle className="mr-2 h-4 w-4 text-red-600" />
                        Deduct Tokens
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="user" className="text-right">
                  User
                </Label>
                <Select value={selectedUser} onValueChange={setSelectedUser}>
                  <SelectTrigger id="user" className="col-span-3">
                    <SelectValue placeholder="Select user" />
                  </SelectTrigger>
                  <SelectContent>
                    {users.map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.name || user.email} - {user.tokenBalance} tokens
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {selectedUserBalance !== null && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <div className="text-right text-sm text-muted-foreground">
                    Balance
                  </div>
                  <div className="col-span-3 flex items-center gap-2">
                    <span className="font-semibold">{selectedUserBalance}</span>
                    <span className="text-sm text-muted-foreground">tokens</span>
                    {operationType === "deduct" && amount > selectedUserBalance && (
                      <span className="text-xs text-red-600">
                        ⚠ Insufficient balance
                      </span>
                    )}
                  </div>
                </div>
              )}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="amount" className="text-right">
                  Amount
                </Label>
                <Input
                  id="amount"
                  type="number"
                  min="1"
                  max={
                    operationType === "deduct" && selectedUserBalance !== null
                      ? selectedUserBalance
                      : undefined
                  }
                  value={amount}
                  onChange={(e) => setAmount(parseInt(e.target.value))}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="reason" className="text-right">
                  Reason
                </Label>
                <Input
                  id="reason"
                  className="col-span-3"
                  placeholder="Reason for adjustment"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                disabled={
                  isLoading ||
                  !selectedUser ||
                  amount <= 0 ||
                  (operationType === "deduct" &&
                    selectedUserBalance !== null &&
                    amount > selectedUserBalance)
                }
              >
                {isLoading
                  ? "Processing..."
                  : `${operationType === "add" ? "Add" : "Deduct"} Tokens`}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}

export function TransactionsTable({ refresh }: { refresh?: number }) {
  const [transactions, setTransactions] = useState<TokenTransaction[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setIsLoading(true)
        const response = await fetch("/api/admin/tokens")

        if (!response.ok) {
          throw new Error("Failed to fetch token transactions")
        }

        const data = await response.json()
        setTransactions(data.transactions || [])
      } catch (err) {
        console.error("Error fetching transactions:", err)
        setError(err instanceof Error ? err.message : "Unknown error")
        toast({
          variant: "destructive",
          title: "Error",
          description: `Failed to load transactions: ${err instanceof Error ? err.message : "Unknown error"}`,
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchTransactions()
  }, [toast, refresh])

  if (isLoading) {
    return <TransactionsTableSkeleton />
  }

  if (error) {
    return (
      <div className="rounded border bg-red-50 p-4 text-red-800 dark:bg-red-900/20 dark:text-red-300">
        <p>Error loading transactions: {error}</p>
        <Button
          variant="outline"
          size="sm"
          className="mt-2"
          onClick={() => window.location.reload()}
        >
          Retry
        </Button>
      </div>
    )
  }

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Admin</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="py-8 text-center text-muted-foreground"
                >
                  No transactions found
                </TableCell>
              </TableRow>
            ) : (
              transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    <div className="font-medium">{transaction.userName}</div>
                    <div className="text-xs text-muted-foreground">
                      {transaction.userEmail}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>{new Date(transaction.timestamp).toLocaleDateString()}</div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(transaction.timestamp).toLocaleTimeString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span
                      className={
                        transaction.tokens >= 0
                          ? "font-semibold text-green-600"
                          : "font-semibold text-red-600"
                      }
                    >
                      {transaction.tokens >= 0 ? "+" : ""}
                      {transaction.tokens}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-xs truncate" title={transaction.reason}>
                      {transaction.reason || "—"}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{transaction.adminName}</div>
                    <div className="text-xs text-muted-foreground">
                      {transaction.adminEmail}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export function TransactionsTableSkeleton() {
  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <div className="grid grid-cols-5 gap-4 bg-accent/50 p-4">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-5 w-20" />
        </div>

        {Array(5)
          .fill(null)
          .map((_, i) => (
            <div key={i} className="grid grid-cols-5 gap-4 border-t p-4">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-6 w-28" />
            </div>
          ))}
      </div>
    </div>
  )
}
