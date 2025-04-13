"use client"

import { Suspense, useState } from "react"
import { PlusCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import {
  CreateUserForm,
  UserManagementTable,
} from "@/components/admin/user-management"

export function UserManagementClient() {
  return (
    <Card className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Users</h2>
        <Suspense fallback={<Skeleton className="h-10 w-20" />}>
          <AddUserButton />
        </Suspense>
      </div>

      <Separator className="my-4" />

      <Suspense fallback={<UserTableLoadingSkeleton />}>
        <UserManagementTable />
      </Suspense>
    </Card>
  )
}

function UserTableLoadingSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-10 w-[250px]" />
        <Skeleton className="h-10 w-[200px]" />
      </div>

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
              <Skeleton className="h-6 w-20" />
            </div>
          ))}
      </div>
    </div>
  )
}

function AddUserButton() {
  const [open, setOpen] = useState(false)

  const handleSuccess = () => {
    setOpen(false)
    // Refresh the page to show the new user
    window.location.reload()
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>
              Create a new user account. The user will receive an email
              invitation.
            </DialogDescription>
          </DialogHeader>
          <CreateUserForm onSuccess={handleSuccess} />
        </DialogContent>
      </Dialog>
    </>
  )
}
