import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface QuickLink {
  title: string
  description: string
  href: string
  linkText: string
}

interface GettingStartedCardProps {
  links?: QuickLink[]
}

// Default quick links
const defaultLinks: QuickLink[] = [
  {
    title: "API Documentation",
    description:
      "Read our comprehensive API docs to understand all available endpoints.",
    href: "/dashboard/docs",
    linkText: "View Documentation",
  },
  {
    title: "Sample Code",
    description: "Download example code for various programming languages.",
    href: "/dashboard/docs/examples",
    linkText: "View Examples",
  },
  {
    title: "Usage Limits",
    description: "Check your current usage and plan limitations.",
    href: "/dashboard/usage",
    linkText: "View Usage",
  },
]

export function GettingStartedCard({
  links = defaultLinks,
}: GettingStartedCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Getting Started</CardTitle>
        <CardDescription>
          Quick links to help you use our API effectively
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {links.map((link, index) => (
          <div key={index} className="flex flex-col gap-2">
            <h3 className="font-semibold">{link.title}</h3>
            <p className="text-sm text-muted-foreground">{link.description}</p>
            <Button
              variant="outline"
              size="sm"
              className="mt-auto w-full"
              asChild
            >
              <Link href={link.href}>{link.linkText}</Link>
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
