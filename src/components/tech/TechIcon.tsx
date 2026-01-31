import { ReactNode } from "react"
import { cn } from "@/lib/utils"

export type TechIconSize = "small" | "medium" | "large"

export type TechIconProps = {
  name: string
  icon: ReactNode
  size?: TechIconSize
  className?: string
}

const sizeClasses: Record<TechIconSize, string> = {
  small: "h-12 w-12 p-2",
  medium: "h-16 w-16 p-3",
  large: "h-20 w-20 p-4",
}

export function TechIcon({
  name,
  icon,
  size = "medium",
  className,
}: TechIconProps): JSX.Element {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3",
        className
      )}
    >
      <div
        className={cn(
          "flex items-center justify-center",
          "rounded-lg bg-card",
          "transition-transform duration-300",
          "hover:scale-110",
          sizeClasses[size]
        )}
      >
        {icon}
      </div>
      <span className="text-center text-sm font-medium text-muted-foreground">
        {name}
      </span>
    </div>
  )
}
