import { useEffect, useState } from "react"

import { toast } from "@/components/ui/use-toast"
import { ApiKey } from "@/components/dashboard/api-key-list"

export function useApiKeys() {
  const [isLoading, setIsLoading] = useState(true)
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([])
  const [newKeyGenerated, setNewKeyGenerated] = useState<ApiKey | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  // Fetch API keys
  useEffect(() => {
    const fetchApiKeys = async () => {
      try {
        setIsLoading(true)
        const response = await fetch("/api/dashboard/api-keys")

        if (!response.ok) {
          throw new Error("Failed to fetch API keys")
        }

        const data = await response.json()
        setApiKeys(data.apiKeys || [])
      } catch (error) {
        console.error("Error fetching API keys:", error)
        toast({
          title: "Error",
          description: "Failed to load API keys. Please try again later.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchApiKeys()
  }, [])

  // Generate a new API key
  const handleGenerateNewKey = async (name: string) => {
    try {
      const response = await fetch("/api/dashboard/api-keys", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          type: "primary",
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to create API key")
      }

      const data = await response.json()

      // Set the newly generated key
      setNewKeyGenerated(data.apiKey)

      // Add to the keys list (with masked key for display in the list)
      setApiKeys((prev) => [
        ...prev,
        {
          ...data.apiKey,
          key: data.apiKey.key.substring(0, 16) + "●●●●●●●●●●●●●●●●",
        },
      ])
    } catch (error) {
      console.error("Error generating API key:", error)
      toast({
        title: "Error",
        description: "Failed to generate API key. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Handle toggling API key active status
  const handleToggleKeyStatus = async (id: string, currentStatus: boolean) => {
    try {
      const action = currentStatus ? "disable" : "enable"
      const response = await fetch("/api/dashboard/api-keys", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, action }),
      })

      if (!response.ok) {
        throw new Error(`Failed to ${action} API key`)
      }

      // Update the local state
      setApiKeys((prevKeys) =>
        prevKeys.map((key) =>
          key.id === id ? { ...key, isActive: !currentStatus } : key
        )
      )

      toast({
        title: currentStatus ? "API key deactivated" : "API key activated",
        duration: 2000,
      })
    } catch (error) {
      console.error("Error toggling API key status:", error)
      toast({
        title: "Error",
        description: "Failed to update API key. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Delete an API key
  const handleDeleteKey = async (id: string) => {
    try {
      const response = await fetch(`/api/dashboard/api-keys?id=${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete API key")
      }

      // Remove the key from the state
      setApiKeys((prevKeys) => prevKeys.filter((key) => key.id !== id))

      toast({
        title: "API key deleted",
        duration: 2000,
      })
    } catch (error) {
      console.error("Error deleting API key:", error)
      toast({
        title: "Error",
        description: "Failed to delete API key. Please try again.",
        variant: "destructive",
      })
    }
  }

  return {
    isLoading,
    apiKeys,
    newKeyGenerated,
    setNewKeyGenerated,
    dialogOpen,
    setDialogOpen,
    handleGenerateNewKey,
    handleToggleKeyStatus,
    handleDeleteKey,
  }
}
