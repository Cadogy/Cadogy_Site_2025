"use client"

import { ReactNode, useEffect } from "react"

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastTitle,
  ToastViewport,
  ToastProvider as UIToastProvider,
} from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

interface ToastProviderProps {
  children: ReactNode
  autoDismissTimeout?: number // Time in milliseconds
}

export function ToastProvider({
  children,
  autoDismissTimeout = 5000, // Default to 5 seconds
}: ToastProviderProps) {
  const { toasts, dismiss } = useToast()

  return (
    <UIToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props} className="group relative overflow-hidden">
            {/* Auto-dismiss progress bar */}
            <ProgressBar
              toastId={id}
              dismiss={dismiss}
              duration={autoDismissTimeout}
            />

            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
      {children}
    </UIToastProvider>
  )
}

interface ProgressBarProps {
  toastId: string
  dismiss: (id?: string) => void
  duration: number
}

function ProgressBar({ toastId, dismiss, duration }: ProgressBarProps) {
  useEffect(() => {
    // Set up auto-dismiss after the specified duration
    const timer = setTimeout(() => {
      dismiss(toastId)
    }, duration)

    // Clean up on unmount
    return () => clearTimeout(timer)
  }, [toastId, dismiss, duration])

  return (
    <div
      className="absolute bottom-0 left-0 h-1 bg-primary"
      style={{
        width: "100%",
        animation: `shrink ${duration}ms linear forwards`,
      }}
    />
  )
}

// Add the animation to global CSS
if (typeof document !== "undefined") {
  // Only run in browser environment
  const style = document.createElement("style")
  style.textContent = `
    @keyframes shrink {
      from { width: 100%; }
      to { width: 0%; }
    }
  `
  document.head.appendChild(style)
}
