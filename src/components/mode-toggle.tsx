"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Icons } from "@/components/icons"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <div className="flex items-center space-x-2">
      <Sun className="h-[1.0rem] w-[1.0rem] rotate-0 scale-100 text-muted-foreground transition-all dark:rotate-90 dark:scale-0" />
      <Switch
        checked={theme === "dark"}
        onCheckedChange={toggleTheme}
        aria-label="Toggle dark mode"
      />
      <Moon className="h-[1.0rem] w-[1.0rem] rotate-90 scale-0 text-muted-foreground transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </div>
  )
}
