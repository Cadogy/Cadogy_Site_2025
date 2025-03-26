"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Filter, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

type Category = {
  id: number
  name: string
  count: number
}

type Tag = {
  id: number
  name: string
  count: number
}

interface ArticleFilterMenuProps {
  categories: Category[]
  tags: Tag[]
  currentCategoryId: string
  currentTagId: string
  totalPosts: number
  hasActiveFilters: boolean
}

export default function ArticleFilterMenu({
  categories,
  tags,
  currentCategoryId,
  currentTagId,
  totalPosts,
  hasActiveFilters,
}: ArticleFilterMenuProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [open, setOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] =
    useState<string>(currentCategoryId)
  const [selectedTag, setSelectedTag] = useState<string>(currentTagId)

  const handleApplyFilters = () => {
    const params = new URLSearchParams(searchParams.toString())

    // Update or remove category parameter
    if (selectedCategory) {
      params.set("category", selectedCategory)
    } else {
      params.delete("category")
    }

    // Update or remove tag parameter
    if (selectedTag) {
      params.set("tag", selectedTag)
    } else {
      params.delete("tag")
    }

    // Reset to first page
    params.set("page", "1")

    // Navigate with new params
    router.push(`/articles?${params.toString()}`)

    // Close the dialog
    setOpen(false)
  }

  const handleClearFilters = () => {
    setSelectedCategory("")
    setSelectedTag("")

    // Immediately apply the clearing of filters
    const params = new URLSearchParams(searchParams.toString())
    params.delete("category")
    params.delete("tag")

    // Also clear search if present
    if (params.has("search")) {
      params.delete("search")
    }

    // Reset to first page
    params.set("page", "1")

    // Navigate with cleared params
    router.push(`/articles?${params.toString()}`)

    // Close the dialog
    setOpen(false)
  }

  // Top 10 popular tags for mobile filter
  const popularTags = tags
    .filter((tag) => tag.count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={`flex items-center gap-2 ${hasActiveFilters ? "border-blue-400/30 bg-blue-500/20 text-blue-400" : ""}`}
        >
          <Filter className="h-4 w-4" />
          <span>Filter</span>
          {hasActiveFilters && (
            <span className="flex h-2 w-2 rounded-full bg-blue-400"></span>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent
        side="bottom"
        className="h-[90vh] rounded-t-2xl border-t-0 border-neutral-700 p-0"
      >
        <div
          className="group cursor-pointer px-6 pb-0 pt-6 transition-colors active:bg-neutral-800/30"
          onClick={() => setOpen(false)}
          aria-label="Close filter menu"
        >
          <SheetHeader>
            <div className="mb-2 flex items-center justify-center">
              <div className="h-1.5 w-12 rounded-full bg-neutral-700 transition-colors group-hover:bg-neutral-500" />
            </div>
            <SheetTitle className="text-center text-xl font-bold transition-colors group-hover:text-slate-300">
              Filter Articles
            </SheetTitle>
          </SheetHeader>
        </div>

        <ScrollArea className="h-[calc(90vh-160px)] px-6 py-4">
          <div className="space-y-6">
            {/* Categories Section */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-slate-200">Categories</h4>
              <div className="grid grid-cols-1 gap-3">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={`category-${category.id}`}
                      checked={selectedCategory === category.id.toString()}
                      onCheckedChange={() => {
                        setSelectedCategory(
                          selectedCategory === category.id.toString()
                            ? ""
                            : category.id.toString()
                        )
                        setSelectedTag("")
                      }}
                    />
                    <label
                      htmlFor={`category-${category.id}`}
                      className="flex w-full items-center justify-between text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      <span>{category.name}</span>
                      <span className="rounded-full bg-neutral-800 px-2 py-0.5 text-xs text-slate-400">
                        {category.count}
                      </span>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags Section */}
            <div className="space-y-4 border-t border-neutral-800 pt-6">
              <h4 className="text-sm font-medium text-slate-200">
                Popular Tags
              </h4>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag) => (
                  <button
                    key={tag.id}
                    onClick={() => {
                      setSelectedTag(
                        selectedTag === tag.id.toString()
                          ? ""
                          : tag.id.toString()
                      )
                      setSelectedCategory("")
                    }}
                    className={`rounded-full px-3 py-1 text-xs transition hover:bg-neutral-700 ${
                      selectedTag === tag.id.toString()
                        ? "bg-blue-500/20 text-blue-400"
                        : "bg-neutral-800 text-slate-200"
                    }`}
                  >
                    #{tag.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Statistics */}
            <div className="border-t border-neutral-800 pt-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Total articles:</span>
                <span className="font-medium text-slate-200">{totalPosts}</span>
              </div>
            </div>
          </div>
        </ScrollArea>

        <div className="flex items-center justify-between gap-4 border-t border-neutral-800 bg-background px-6 py-4">
          <Button
            variant="outline"
            onClick={handleClearFilters}
            className="flex-1 text-slate-400"
          >
            Clear All
          </Button>
          <Button
            onClick={handleApplyFilters}
            className="flex-1 bg-blue-600 hover:bg-blue-700"
          >
            Apply Filters
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
