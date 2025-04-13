"use client"

import { useSession } from "next-auth/react"

import { useApiKeys } from "@/hooks/use-api-keys"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ApiKeyCreateDialog } from "@/components/dashboard/api-key-create-dialog"
import { ApiKeyList } from "@/components/dashboard/api-key-list"
import { ApiKeySecurityCard } from "@/components/dashboard/api-key-security-card"

export function ApiKeysContent() {
  const { data: session } = useSession()
  const {
    isLoading,
    apiKeys,
    newKeyGenerated,
    setNewKeyGenerated,
    dialogOpen,
    setDialogOpen,
    handleGenerateNewKey,
    handleToggleKeyStatus,
    handleDeleteKey,
  } = useApiKeys()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">API Keys</h1>
        <ApiKeyCreateDialog
          onGenerateKey={handleGenerateNewKey}
          newKeyGenerated={newKeyGenerated}
          open={dialogOpen}
          onOpenChange={(open) => {
            setDialogOpen(open)
            if (!open) {
              setTimeout(() => setNewKeyGenerated(null), 100)
            }
          }}
        />
      </div>

      <div className="rounded-lg border bg-card p-6 shadow-sm">
        <h2 className="mb-2 text-xl font-semibold">API Key Management</h2>
        <p className="text-muted-foreground">
          Your API keys grant access to our API services. Keep them secure and
          never share them publicly.
        </p>
      </div>

      {/* Security Best Practices */}
      <ApiKeySecurityCard />

      {/* API Keys Table */}
      <Card>
        <CardHeader>
          <CardTitle>Your API Keys</CardTitle>
          <CardDescription>
            Manage and generate API keys for your applications.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ApiKeyList
            apiKeys={apiKeys}
            isLoading={isLoading}
            onToggleKeyStatus={handleToggleKeyStatus}
            onDeleteKey={handleDeleteKey}
          />
        </CardContent>
      </Card>
    </div>
  )
}
