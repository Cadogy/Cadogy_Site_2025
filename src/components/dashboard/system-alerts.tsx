import Link from "next/link"
import { AlertCircle } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

export interface SystemAlert {
  _id: string
  title: string
  description: string
  severity: "info" | "warning" | "error"
  type: "system" | "user"
  isActive: boolean
  startDate: string
  endDate?: string
  link?: string
  linkText?: string
}

interface SystemAlertsProps {
  alerts: SystemAlert[]
}

export function SystemAlerts({ alerts }: SystemAlertsProps) {
  if (alerts.length === 0) {
    return null
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">System Alerts</h2>
      {alerts.map((alert) => (
        <Alert
          key={alert._id}
          variant={
            alert.severity === "warning"
              ? "default"
              : alert.severity === "error"
                ? "destructive"
                : "default"
          }
        >
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>{alert.title}</AlertTitle>
          <AlertDescription>{alert.description}</AlertDescription>
          {alert.link && (
            <div className="mt-2">
              <Button variant="link" size="sm" asChild className="h-auto p-0">
                <Link href={alert.link}>{alert.linkText || "Learn more"}</Link>
              </Button>
            </div>
          )}
        </Alert>
      ))}
    </div>
  )
}
