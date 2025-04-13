import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Adds a cache-busting query parameter to a URL to prevent caching
 * @param url The URL to add the cache-busting parameter to
 * @returns The URL with a cache-busting parameter
 */
export function addCacheBuster(url: string): string {
  const separator = url.includes("?") ? "&" : "?"
  return `${url}${separator}v=${Date.now()}`
}

/**
 * Copy text to clipboard with fallback for environments where Clipboard API is not available
 * @param text Text to copy to clipboard
 * @param onSuccess Callback function to execute on successful copy
 * @param onError Callback function to execute on copy failure
 */
export function copyToClipboard(
  text: string,
  onSuccess?: () => void,
  onError?: (error: unknown) => void
): void {
  // Check if we're in a browser environment
  if (typeof window === "undefined") {
    console.warn("copyToClipboard called in a non-browser environment")
    if (onError) onError(new Error("Not in browser environment"))
    return
  }

  // Check if Clipboard API is available
  if (navigator?.clipboard) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        if (onSuccess) onSuccess()
      })
      .catch((error) => {
        console.error("Failed to copy text: ", error)
        if (onError) onError(error)
      })
  } else {
    // Fallback for environments where Clipboard API is not available
    try {
      const textArea = document.createElement("textarea")
      textArea.value = text

      // Make the textarea out of viewport
      textArea.style.position = "fixed"
      textArea.style.left = "-999999px"
      textArea.style.top = "-999999px"

      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()

      const successful = document.execCommand("copy")
      document.body.removeChild(textArea)

      if (successful) {
        if (onSuccess) onSuccess()
      } else {
        const error = new Error("execCommand returned false")
        console.error("Fallback: Could not copy text: ", error)
        if (onError) onError(error)
      }
    } catch (error) {
      console.error("Fallback: Could not copy text: ", error)
      if (onError) onError(error)
    }
  }
}
