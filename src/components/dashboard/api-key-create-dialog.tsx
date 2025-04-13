import { useState } from "react"
import { CheckCircle, Copy, Key } from "lucide-react"

import { copyToClipboard } from "@/lib/utils"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"

import { ApiKey } from "./api-key-list"

interface ApiKeyCreateDialogProps {
  onGenerateKey: (name: string) => Promise<void>
  newKeyGenerated: ApiKey | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ApiKeyCreateDialog({
  onGenerateKey,
  newKeyGenerated,
  open,
  onOpenChange,
}: ApiKeyCreateDialogProps) {
  const [newKeyName, setNewKeyName] = useState("")

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

  const handleGenerate = async () => {
    if (!newKeyName.trim()) {
      toast({
        title: "Please enter a name for your API key",
        variant: "destructive",
        duration: 2000,
      })
      return
    }

    await onGenerateKey(newKeyName)
    setNewKeyName("")
  }

  const handleClose = () => {
    onOpenChange(false)
    setTimeout(() => {
      if (newKeyGenerated) {
        onOpenChange(false)
      }
    }, 100)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <Key className="mr-2 h-4 w-4" />
          Generate New API Key
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate New API Key</DialogTitle>
          <DialogDescription>
            Create a new API key for your application. You will only be able to
            view the key once after generation.
          </DialogDescription>
        </DialogHeader>

        {!newKeyGenerated ? (
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">API Key Name</Label>
              <input
                id="name"
                placeholder="e.g., Production API Key"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
              />
            </div>
          </div>
        ) : (
          <div className="space-y-4 py-4">
            <Alert
              variant="default"
              className="border-green-500 bg-green-500/10"
            >
              <CheckCircle className="h-4 w-4 text-green-500" />
              <AlertTitle className="text-green-500">
                API Key Generated
              </AlertTitle>
              <AlertDescription className="text-green-500/80">
                Make sure to copy your API key now. For security reasons, you
                won&apos;t be able to see it again.
              </AlertDescription>
            </Alert>

            <div className="space-y-2">
              <Label>Your New API Key</Label>
              <div className="flex items-center space-x-2">
                <code className="relative flex-1 rounded bg-muted px-[0.5rem] py-[0.5rem] font-mono text-sm">
                  {newKeyGenerated.key}
                </code>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleCopyKey(newKeyGenerated.key)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}

        <DialogFooter>
          {!newKeyGenerated ? (
            <>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button onClick={handleGenerate}>Generate Key</Button>
            </>
          ) : (
            <Button onClick={handleClose}>Done</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
