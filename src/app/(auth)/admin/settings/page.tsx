import { Metadata } from "next"

import { SettingsManagement } from "@/components/admin/settings-management"

export const metadata: Metadata = {
  title: "Settings | Admin",
  description: "Manage site settings and configuration",
}

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Site Settings</h1>
        <p className="text-muted-foreground">
          Configure global settings for your application
        </p>
      </div>
      <SettingsManagement />
    </div>
  )
}

