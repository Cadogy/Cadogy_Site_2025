import { useState } from "react"
import { Clock, Copy, Key, RefreshCw, XCircle } from "lucide-react"

import { cn, copyToClipboard } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"

import { formatDate, formatRelativeTime } from "./api-key-utils"

export interface ApiKey {
  id: string
  name: string
  key: string
  type: "primary" | "secondary"
  createdAt: string
  lastUsed: string | null
  isActive: boolean
}

interface ApiKeyListProps {
  apiKeys: ApiKey[]
  isLoading: boolean
  onToggleKeyStatus: (id: string, currentStatus: boolean) => Promise<void>
  onDeleteKey: (id: string) => Promise<void>
}

export function ApiKeyList({
  apiKeys,
  isLoading,
  onToggleKeyStatus,
  onDeleteKey,
}: ApiKeyListProps) {
  const [showFullKey, setShowFullKey] = useState<string | null>(null)
  const [fullKeys, setFullKeys] = useState<Record<string, string>>({})

  // Handle copying API key to clipboard
  const handleCopyKey = (key: string) => {
    copyToClipboard(
      key,
      () => {
        toast({
          title: "API key copied to clipboard",
          duration: 2000,
        })
      },
      (error) => {
        console.error("Error copying to clipboard:", error)
        toast({
          title: "Failed to copy to clipboard",
          description: "Please copy the key manually",
          variant: "destructive",
          duration: 3000,
        })
      }
    )
  }

  // Fetch the full API key
  const fetchFullKey = async (keyId: string) => {
    try {
      const response = await fetch(`/api/dashboard/api-keys/reveal?id=${keyId}`)
      if (!response.ok) {
        throw new Error("Failed to fetch full key")
      }
      const data = await response.json()

      if (data.key) {
        setFullKeys((prev) => ({ ...prev, [keyId]: data.key }))
        setShowFullKey(keyId)
        setTimeout(() => setShowFullKey(null), 30000) // Hide after 30 seconds
      }
    } catch (error) {
      console.error("Error fetching full key:", error)
      toast({
        title: "Error",
        description: "Could not reveal the full API key",
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    )
  }

  if (apiKeys.length === 0) {
    return (
      <div className="flex h-32 flex-col items-center justify-center rounded-md border border-dashed p-8 text-center">
        <Key className="mb-2 h-8 w-8 text-muted-foreground" />
        <h3 className="text-md font-medium">No API Keys Yet</h3>
        <p className="text-sm text-muted-foreground">
          Generate your first API key to get started.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {apiKeys.map((apiKey) => (
        <Card
          key={apiKey.id}
          className={cn(
            "relative overflow-hidden transition-all",
            !apiKey.isActive && "opacity-60"
          )}
        >
          <div className="flex flex-col items-start gap-3 rounded-lg border p-4 md:flex-row md:items-center">
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="font-medium">{apiKey.name}</h3>
                <Badge
                  variant={apiKey.isActive ? "default" : "secondary"}
                  className={apiKey.isActive ? "bg-green-500" : ""}
                >
                  {apiKey.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>

              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <code>
                  {showFullKey === apiKey.id && fullKeys[apiKey.id]
                    ? fullKeys[apiKey.id]
                    : apiKey.key}
                </code>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => {
                    if (showFullKey === apiKey.id && fullKeys[apiKey.id]) {
                      handleCopyKey(fullKeys[apiKey.id])
                    } else {
                      fetchFullKey(apiKey.id)
                    }
                  }}
                >
                  {showFullKey === apiKey.id ? (
                    <Copy className="h-3 w-3" />
                  ) : (
                    <Key className="h-3 w-3" />
                  )}
                </Button>
              </div>

              <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                <div className="flex items-center">
                  <Clock className="mr-1 h-3 w-3" />
                  Created: {formatDate(apiKey.createdAt)}
                </div>
                {apiKey.lastUsed && (
                  <div className="flex items-center">
                    <RefreshCw className="mr-1 h-3 w-3" />
                    Last used: {formatRelativeTime(apiKey.lastUsed)}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 self-end md:self-auto">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={apiKey.isActive}
                  onCheckedChange={() =>
                    onToggleKeyStatus(apiKey.id, apiKey.isActive)
                  }
                  id={`toggle-${apiKey.id}`}
                />
                <Label
                  htmlFor={`toggle-${apiKey.id}`}
                  className="cursor-pointer text-sm"
                >
                  {apiKey.isActive ? "Enabled" : "Disabled"}
                </Label>
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-destructive hover:text-destructive/90"
                onClick={() => onDeleteKey(apiKey.id)}
              >
                <XCircle className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
