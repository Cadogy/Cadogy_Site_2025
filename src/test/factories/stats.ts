export type StatCardData = {
  value: string
  label: string
  description?: string
  variant?: "default" | "large"
}

export function createStatCardData(
  overrides: Partial<StatCardData> = {}
): StatCardData {
  return {
    value: "100+",
    label: "Default Label",
    variant: "default",
    ...overrides,
  }
}

export function createStatsData(
  items: Array<Partial<StatCardData>>
): StatCardData[] {
  return items.map((item) => createStatCardData(item))
}

export function createDefaultStats(): StatCardData[] {
  return [
    { value: "15+", label: "Years in Business" },
    { value: "500+", label: "Projects Delivered" },
    { value: "50+", label: "Technologies" },
  ]
}
