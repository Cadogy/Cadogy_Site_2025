/**
 * Format API key date for display
 */
export function formatDate(date: string | null) {
  if (!date) return "Never used"

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date))
}

/**
 * Format API key date as relative time
 */
export function formatRelativeTime(date: string | null) {
  if (!date) return "Never"

  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" })
  const now = new Date()
  const diffInSeconds = Math.floor(
    (now.getTime() - new Date(date).getTime()) / 1000
  )

  if (diffInSeconds < 60) return "Just now"
  if (diffInSeconds < 3600)
    return rtf.format(-Math.floor(diffInSeconds / 60), "minute")
  if (diffInSeconds < 86400)
    return rtf.format(-Math.floor(diffInSeconds / 3600), "hour")
  return rtf.format(-Math.floor(diffInSeconds / 86400), "day")
}
