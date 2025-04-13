import { Metadata } from "next"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth/next"

import { authOptions } from "@/lib/auth/auth-options"
import AdminHeader from "@/components/admin/admin-header"
import AdminNav from "@/components/admin/admin-nav"

export const metadata: Metadata = {
  title: "Admin Control Panel - Cadogy",
  description: "Manage your platform with advanced administrator controls",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Check if user is authenticated and has admin role
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return redirect("/login?callbackUrl=/admin")
  }

  if (session.user.role !== "admin") {
    return redirect("/dashboard")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <AdminHeader user={session.user} />
      <div className="flex flex-1">
        <AdminNav />
        <main className="flex-1 overflow-y-auto bg-background p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
