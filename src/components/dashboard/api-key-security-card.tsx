import { Shield } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ApiKeySecurityCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Shield className="mr-2 h-5 w-5 text-amber-500" />
          API Key Security
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="ml-6 list-disc space-y-2 text-sm">
          <li>
            Store API keys securely in environment variables or configuration
            files with restricted access.
          </li>
          <li>
            Never expose API keys in client-side code or public repositories.
          </li>
          <li>
            Use different API keys for different applications and environments.
          </li>
          <li>
            Rotate your API keys periodically to minimize risk from potential
            exposures.
          </li>
        </ul>
      </CardContent>
    </Card>
  )
}
