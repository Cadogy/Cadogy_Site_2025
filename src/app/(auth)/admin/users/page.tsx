import { Suspense } from "react"
import { Metadata } from "next"

import { Skeleton } from "@/components/ui/skeleton"

import { UserManagementClient } from "../../../../components/admin/user-management-client"

export const metadata: Metadata = {
  title: "User Management - Admin",
  description: "Manage users of your application",
}

export default async function UsersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
        <p className="text-muted-foreground">
          View and manage user accounts, roles, and permissions.
        </p>
      </div>

      <div className="space-y-4">
        <Suspense fallback={<Skeleton className="h-[500px] w-full" />}>
          <UserManagementClient />
        </Suspense>
      </div>
    </div>
  )
}
