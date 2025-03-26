"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Search } from "lucide-react"

export default function ArticleSearch() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    // Build the new search params
    const params = new URLSearchParams(searchParams.toString())

    // Set search parameter and reset to page 1
    if (searchTerm) {
      params.set("search", searchTerm)
    } else {
      params.delete("search")
    }
    params.set("page", "1")

    // Navigate with the new params
    router.push(`/articles?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSearch} className="relative mb-6">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search articles..."
        className="w-full rounded-md border border-neutral-800 bg-neutral-900 px-4 py-2 pr-10 text-sm text-slate-200 placeholder-slate-500 focus:border-blue-400 focus:outline-none"
      />
      <button
        type="submit"
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 hover:bg-neutral-800 hover:text-slate-200"
      >
        <Search className="h-4 w-4" />
      </button>
    </form>
  )
}
