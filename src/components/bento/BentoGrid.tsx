import { ReactNode } from "react"
import { cn } from "@/lib/utils"

export type BentoGridPattern = "default" | "feature" | "asymmetric"

export type BentoGridProps = {
  children?: ReactNode
  pattern?: BentoGridPattern
  gap?: number
  className?: string
}

const patternClasses: Record<BentoGridPattern, string> = {
  default: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  feature: "grid-cols-1 md:grid-cols-2 lg:grid-cols-2",
  asymmetric: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
}

export function BentoGrid({
  children,
  pattern = "default",
  gap = 6,
  className,
}: BentoGridProps): JSX.Element {
  return (
    <div
      className={cn(
        "grid",
        `gap-${gap}`,
        patternClasses[pattern],
        className
      )}
    >
      {children}
    </div>
  )
}
