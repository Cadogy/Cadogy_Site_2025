import { Metadata } from "next"

import { DashboardToolsContent } from "@/components/dashboard/tools-content"

export const metadata: Metadata = {
  title: "AI Tools - Cadogy",
  description:
    "Advanced AI tools to help you create content and leverage our API",
}

export default function ToolsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">AI Tools</h1>
        <p className="text-muted-foreground">
          Create content and transform your ideas with our advanced AI tools
        </p>
      </div>
      <DashboardToolsContent />
    </div>
  )
}
