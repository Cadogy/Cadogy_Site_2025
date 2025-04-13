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
}

interface TokenTransaction {
  id: string
  userId: string
  userName: string
  userEmail: string
  tokens: number
  operation: string
  reason: string
  timestamp: string
}

export function TokenOperationsDialog() {
  const [open, setOpen] = useState(false)
  const [operationType, setOperationType] = useState<"add" | "deduct">("add")
  const [isLoading, setIsLoading] = useState(false)
  const [selectedUser, setSelectedUser] = useState("")
  const [amount, setAmount] = useState(100)
  const [reason, setReason] = useState("")
  const [users, setUsers] = useState<User[]>([])
  const { toast } = useToast()

  // Fetch users when component mounts
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedUser || amount <= 0) return

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

      if (!response.ok) {
        throw new Error("Failed to adjust tokens")
      }

      const result = await response.json()

      toast({
        title: "Success",
        description: `${operationType === "add" ? "Added" : "Deducted"} ${amount} tokens ${operationType === "add" ? "to" : "from"} user`,
      })

      // Close dialog and reset form
      setOpen(false)
      setSelectedUser("")
      setAmount(100)
      setReason("")
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
    <div className="flex space-x-2">
      <Button
        onClick={() => {
          setOperationType("add")
          setOpen(true)
        }}
        variant="default"
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        Add Tokens
      </Button>
      <Button
        onClick={() => {
          setOperationType("deduct")
          setOpen(true)
        }}
        variant="outline"
      >
        <MinusCircle className="mr-2 h-4 w-4" />
        Deduct Tokens
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>
                {operationType === "add"
                  ? "Add Tokens to User"
                  : "Deduct Tokens from User"}
              </DialogTitle>
              <DialogDescription>
                {operationType === "add"
                  ? "Increase a user's token balance"
                  : "Decrease a user's token balance"}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
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
                        {user.name || user.email} ({user.email})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="amount" className="text-right">
                  Amount
                </Label>
                <Input
                  id="amount"
                  type="number"
                  min="1"
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
                disabled={isLoading || !selectedUser || amount <= 0}
              >
                {isLoading
                  ? "Processing..."
                  : `${operationType === "add" ? "Add" : "Deduct"} Tokens`}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export function TransactionsTable() {
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
  }, [toast])

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
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
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
                    {new Date(transaction.timestamp).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <span
                      className={
                        transaction.tokens >= 0
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {transaction.tokens >= 0 ? "+" : ""}
                      {transaction.tokens}
                    </span>
                  </TableCell>
                  <TableCell>{transaction.reason}</TableCell>
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
        <div className="grid grid-cols-4 gap-4 bg-accent/50 p-4">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-5 w-28" />
        </div>

        {Array(5)
          .fill(null)
          .map((_, i) => (
            <div key={i} className="grid grid-cols-4 gap-4 border-t p-4">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-32" />
            </div>
          ))}
      </div>
    </div>
  )
}
