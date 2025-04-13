"use client"

import { NavigationMenu } from "@/components/elements/navbar"

export function AppNavbar() {
  return (
    <div className="w-full bg-background/90 backdrop-blur-md supports-[backdrop-filter]:bg-background/70">
      <NavigationMenu />
    </div>
  )
}
