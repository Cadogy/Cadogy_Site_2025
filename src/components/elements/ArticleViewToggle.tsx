"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Grid2X2, List } from "lucide-react"

export default function ArticleViewToggle() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const view = searchParams.get("view") || "grid"

  const handleViewChange = (newView: string) => {
    if (newView === view) return

    const params = new URLSearchParams(searchParams.toString())
    params.set("view", newView)

    router.push(`/articles?${params.toString()}`)
  }

  return (
    <div className="flex rounded-md bg-neutral-900 p-1">
      <button
        onClick={() => handleViewChange("grid")}
        className={`flex items-center gap-1.5 rounded px-3 py-1 text-sm font-medium transition ${
          view === "grid"
            ? "bg-neutral-800 text-slate-200"
            : "text-slate-400 hover:bg-neutral-800/50 hover:text-slate-300"
        }`}
      >
        <Grid2X2 className="h-3.5 w-3.5" />
        <span>Grid</span>
      </button>
      <button
        onClick={() => handleViewChange("list")}
        className={`flex items-center gap-1.5 rounded px-3 py-1 text-sm font-medium transition ${
          view === "list"
            ? "bg-neutral-800 text-slate-200"
            : "text-slate-400 hover:bg-neutral-800/50 hover:text-slate-300"
        }`}
      >
        <List className="h-3.5 w-3.5" />
        <span>List</span>
      </button>
    </div>
  )
}
