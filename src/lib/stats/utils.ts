import { z } from "zod"
import type { StatCardProps } from "@/components/stats/StatCard"
import { STATS_CONFIG } from "./config"

const StatDataSchema = z.object({
  value: z.string().min(1, "Value is required"),
  label: z.string().min(1, "Label is required"),
  variant: z.enum(["default", "large"]),
  description: z.string().optional(),
})

export type ValidationResult<T> =
  | { success: true; data: T }
  | { success: false; error: z.ZodError }

export function getStatsData(): StatCardProps[] {
  return STATS_CONFIG
}

export function validateStatData(
  data: unknown
): ValidationResult<StatCardProps> {
  const result = StatDataSchema.safeParse(data)

  if (result.success) {
    return { success: true, data: result.data as StatCardProps }
  }

  return { success: false, error: result.error }
}

export function formatStatValue(value: string): string {
  if (!value) {
    return ""
  }

  const hasPlus = value.includes("+")
  const hasPercent = value.includes("%")

  if (hasPlus || hasPercent) {
    return value
  }

  return `${value}+`
}
