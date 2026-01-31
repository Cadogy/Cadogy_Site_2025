import { ReactNode } from "react"
import { cn } from "@/lib/utils"

export type ProcessStepProps = {
  number: number
  title: string
  description: string
  icon?: ReactNode
  isActive?: boolean
  className?: string
}

export function ProcessStep({
  number,
  title,
  description,
  icon,
  isActive = false,
  className,
}: ProcessStepProps): JSX.Element {
  const formattedNumber = number.toString().padStart(2, "0")

  return (
    <div
      className={cn(
        "flex flex-col rounded-lg border border-border bg-card p-6 transition-all duration-300",
        isActive && "border-primary bg-primary/5",
        "hover:border-primary/50",
        className
      )}
    >
      {/* Icon and Number */}
      <div className="mb-4 flex items-center gap-4">
        {icon && (
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            {icon}
          </div>
        )}
        <div
          className={cn(
            "text-4xl font-bold",
            isActive ? "text-primary" : "text-muted-foreground"
          )}
        >
          {formattedNumber}
        </div>
      </div>

      {/* Title */}
      <h3 className="mb-2 text-xl font-semibold text-foreground md:text-2xl">
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
        {description}
      </p>
    </div>
  )
}
