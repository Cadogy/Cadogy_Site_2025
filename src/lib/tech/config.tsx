import { ReactNode } from "react"
import {
  Code,
  Database,
  Globe,
  Layers,
  Smartphone,
  Zap,
} from "lucide-react"

export type TechnologyItem = {
  name: string
  icon: ReactNode
  category: "frontend" | "backend" | "database" | "tools" | "mobile"
}

export const TECHNOLOGIES_CONFIG: TechnologyItem[] = [
  // Frontend
  {
    name: "React",
    icon: <Code className="h-6 w-6 text-primary" />,
    category: "frontend",
  },
  {
    name: "Next.js",
    icon: <Globe className="h-6 w-6 text-primary" />,
    category: "frontend",
  },
  {
    name: "TypeScript",
    icon: <Code className="h-6 w-6 text-primary" />,
    category: "frontend",
  },
  {
    name: "Tailwind CSS",
    icon: <Layers className="h-6 w-6 text-primary" />,
    category: "frontend",
  },

  // Backend
  {
    name: "Node.js",
    icon: <Zap className="h-6 w-6 text-primary" />,
    category: "backend",
  },
  {
    name: "Python",
    icon: <Code className="h-6 w-6 text-primary" />,
    category: "backend",
  },

  // Database
  {
    name: "PostgreSQL",
    icon: <Database className="h-6 w-6 text-primary" />,
    category: "database",
  },
  {
    name: "MongoDB",
    icon: <Database className="h-6 w-6 text-primary" />,
    category: "database",
  },

  // Mobile
  {
    name: "React Native",
    icon: <Smartphone className="h-6 w-6 text-primary" />,
    category: "mobile",
  },

  // Tools
  {
    name: "Docker",
    icon: <Layers className="h-6 w-6 text-primary" />,
    category: "tools",
  },
  {
    name: "Git",
    icon: <Code className="h-6 w-6 text-primary" />,
    category: "tools",
  },
  {
    name: "AWS",
    icon: <Globe className="h-6 w-6 text-primary" />,
    category: "tools",
  },
]

export const TECHNOLOGY_CATEGORIES = {
  frontend: "Frontend",
  backend: "Backend",
  database: "Database",
  mobile: "Mobile",
  tools: "Tools & DevOps",
} as const

export function getTechnologiesByCategory(
  category: TechnologyItem["category"]
): TechnologyItem[] {
  return TECHNOLOGIES_CONFIG.filter((tech) => tech.category === category)
}

export function getAllCategories(): Array<TechnologyItem["category"]> {
  return Array.from(
    new Set(TECHNOLOGIES_CONFIG.map((tech) => tech.category))
  )
}
