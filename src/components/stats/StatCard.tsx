import { cn } from "@/lib/utils"

export type StatCardProps = {
  value: string
  label: string
  description?: string
  variant?: "default" | "large"
}

export function StatCard({
  value,
  label,
  description,
  variant = "default",
}: StatCardProps): JSX.Element {
  return (
    <div className="stat-card flex flex-col items-center justify-center rounded-lg bg-card p-6 text-center">
      <div
        className={cn(
          "stat-value mb-2 font-bold text-foreground",
          variant === "large" ? "stat-value-large text-5xl" : "text-4xl"
        )}
      >
        {value}
      </div>
      <div className="stat-label text-sm font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </div>
      {description && (
        <div className="mt-2 text-xs text-muted-foreground">{description}</div>
      )}
    </div>
  )
}
