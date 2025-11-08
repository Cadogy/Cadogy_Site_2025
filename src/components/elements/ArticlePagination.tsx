"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface ArticlePaginationProps {
  currentPage: number
  totalPages: number
}

export default function ArticlePagination({
  currentPage,
  totalPages,
}: ArticlePaginationProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return

    const params = new URLSearchParams(searchParams.toString())
    params.set("page", page.toString())

    router.push(`/articles?${params.toString()}`)
  }

  // Generate page numbers array with ellipsis for large page counts
  const getPageNumbers = () => {
    // Always show first page, last page, current page,
    // and one page before and after current page
    const pageNumbers: (number | string)[] = []

    if (totalPages <= 5) {
      // Show all pages if 5 or fewer
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
      }
    } else {
      // Always add first page
      pageNumbers.push(1)

      // Add ellipsis if needed before current page area
      if (currentPage > 3) {
        pageNumbers.push("...")
      }

      // Add page before current if not first page
      if (currentPage > 2) {
        pageNumbers.push(currentPage - 1)
      }

      // Add current page if not first or last
      if (currentPage !== 1 && currentPage !== totalPages) {
        pageNumbers.push(currentPage)
      }

      // Add page after current if not last page
      if (currentPage < totalPages - 1) {
        pageNumbers.push(currentPage + 1)
      }

      // Add ellipsis if needed after current page area
      if (currentPage < totalPages - 2) {
        pageNumbers.push("...")
      }

      // Always add last page if more than 1 page
      if (totalPages > 1) {
        pageNumbers.push(totalPages)
      }
    }

    return pageNumbers
  }

  const pageNumbers = getPageNumbers()

  if (totalPages <= 1) return null

  return (
    <div className="mt-12 flex items-center justify-center gap-2">
      {/* Previous button */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-800 transition ${
          currentPage === 1
            ? "cursor-not-allowed opacity-50"
            : "text-slate-400 hover:bg-neutral-800 hover:text-slate-100"
        }`}
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {/* Page numbers */}
      {pageNumbers.map((page, index) =>
        typeof page === "number" ? (
          <button
            key={index}
            onClick={() => handlePageChange(page)}
            className={`flex h-10 w-10 items-center justify-center rounded-lg transition ${
              page === currentPage
                ? "bg-blue-500 text-white"
                : "border border-neutral-800 text-slate-400 hover:bg-neutral-800 hover:text-slate-100"
            }`}
          >
            {page}
          </button>
        ) : (
          <span
            key={index}
            className="flex h-10 items-center justify-center px-1 text-slate-500"
          >
            {page}
          </span>
        )
      )}

      {/* Next button */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-800 transition ${
          currentPage === totalPages
            ? "cursor-not-allowed opacity-50"
            : "text-slate-400 hover:bg-neutral-800 hover:text-slate-100"
        }`}
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  )
}
