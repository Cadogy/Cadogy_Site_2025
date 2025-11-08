"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart,
  Info,
  MessageSquare,
  Settings,
  Users,
  Wallet,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface NavItem {
  title: string
  href: string
  icon: React.ReactNode
}

export default function AdminNav() {
  const pathname = usePathname()

  const navItems: NavItem[] = [
    {
      title: "Overview",
      href: "/admin",
      icon: <BarChart className="h-5 w-5" />,
    },
    {
      title: "Users",
      href: "/admin/users",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "Tickets",
      href: "/admin/tickets",
      icon: <MessageSquare className="h-5 w-5" />,
    },
    {
      title: "Tokens",
      href: "/admin/tokens",
      icon: <Wallet className="h-5 w-5" />,
    },
    {
      title: "Settings",
      href: "/admin/settings",
      icon: <Settings className="h-5 w-5" />,
    },
    {
      title: "System Info",
      href: "/admin/system",
      icon: <Info className="h-5 w-5" />,
    },
  ]

  return (
    <nav className="hidden w-64 border-r bg-background p-6 md:block">
      <div className="flex flex-col space-y-1">
        {navItems.map((item) => (
          <Button
            key={item.href}
            variant="ghost"
            className={cn(
              "flex h-10 w-full items-center justify-start space-x-3 px-3",
              pathname === item.href
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
            asChild
          >
            <Link href={item.href}>
              {item.icon}
              <span>{item.title}</span>
            </Link>
          </Button>
        ))}
      </div>
    </nav>
  )
}
