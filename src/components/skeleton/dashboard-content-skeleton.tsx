import { Skeleton } from "@/components/ui/skeleton"

export function DashboardContentSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-40" />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-[180px] rounded-lg" />
        ))}
      </div>

      <div className="mt-8">
        <Skeleton className="mb-4 h-8 w-32" />
        <Skeleton className="h-[300px] rounded-lg" />
      </div>
    </div>
  )
}
