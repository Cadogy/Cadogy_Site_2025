import Link from "next/link"
import { ArrowUpRight, Clock, Key } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface ApiKeyCardProps {
  isLoading: boolean
  hasApiKey: boolean
  apiKey: string
}

export function ApiKeyCard({ isLoading, hasApiKey, apiKey }: ApiKeyCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your API Key</CardTitle>
        <CardDescription>
          Use this key to authenticate your API requests
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-10 w-full" />
        ) : !hasApiKey ? (
          <div className="flex flex-col items-center gap-3 py-3">
            <p className="text-center text-sm text-muted-foreground">
              You don&apos;t have an API key yet. Create one to start using our
              API.
            </p>
            <Button asChild>
              <Link href="/dashboard/api-keys">
                <Key className="mr-2 h-4 w-4" />
                Generate API Key
              </Link>
            </Button>
          </div>
        ) : (
          <code className="relative flex flex-col items-center rounded bg-muted px-[0.5rem] py-[0.5rem] font-mono text-sm font-semibold md:flex-row">
            {apiKey}
            <Button
              variant="ghost"
              size="sm"
              className="h-8 gap-1 md:ml-auto"
              asChild
            >
              <Link href="/dashboard/api-keys">
                <span className="text-xs font-normal">View Full Key</span>
                <ArrowUpRight className="h-3 w-3" />
              </Link>
            </Button>
          </code>
        )}
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">
        <div className="flex items-center">
          <Clock className="mr-1 h-3 w-3" />
          {hasApiKey
            ? "API keys are refreshed every 30 days for security"
            : "API keys give you access to our API endpoints"}
        </div>
      </CardFooter>
    </Card>
  )
}
