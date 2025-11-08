import { Skeleton } from "@/components/ui/skeleton"

export function UserProfileSkeleton() {
  return (
    <div className="flex items-center space-x-2">
      <Skeleton className="h-8 w-8 rounded-lg" />
      <div className="hidden space-y-1 md:block">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-3 w-32" />
      </div>
    </div>
  )
}
