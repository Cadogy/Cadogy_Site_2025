"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Blocks, Bot, Code2, Database, Languages, Server } from "lucide-react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Technology categories
type Category =
  | "frontend"
  | "backend"
  | "database"
  | "infrastructure"
  | "language"
  | "platform"
  | "all"

// Define tech stack items with proper typing
interface TechItem {
  name: string
  logo: string
  category: Category
  description?: string
}

// Technology items
const technologies: TechItem[] = [
  // Frontend
  {
    name: "NextJS",
    logo: "/images/assets/stack-logos/nextjs-icon.svg",
    category: "frontend",
    description: "React framework for production",
  },
  {
    name: "ReactJS",
    logo: "/images/assets/stack-logos/react-icon.svg",
    category: "frontend",
    description: "UI component library",
  },
  {
    name: "TailwindCSS",
    logo: "/images/assets/stack-logos/tailwindcss-icon.svg",
    category: "frontend",
    description: "Utility-first CSS framework",
  },

  // Backend
  {
    name: "NodeJS",
    logo: "/images/assets/stack-logos/nodejs-icon.svg",
    category: "backend",
    description: "JavaScript runtime environment",
  },
  {
    name: "ExpressJS",
    logo: "/images/assets/stack-logos/expressjs-icon.svg",
    category: "backend",
    description: "Web application framework",
  },

  // Database
  {
    name: "MongoDB",
    logo: "/images/assets/stack-logos/mongodb-icon.svg",
    category: "database",
    description: "NoSQL document database",
  },
  {
    name: "MariaDB",
    logo: "/images/assets/stack-logos/mariadb-icon.svg",
    category: "database",
    description: "Open source SQL database",
  },

  // Infrastructure
  {
    name: "AWS",
    logo: "/images/assets/stack-logos/aws-icon.svg",
    category: "infrastructure",
    description: "Cloud computing services",
  },
  {
    name: "Google Cloud",
    logo: "/images/assets/stack-logos/googlecloud-icon.svg",
    category: "infrastructure",
    description: "Cloud computing platform",
  },
  {
    name: "Cloudflare",
    logo: "/images/assets/stack-logos/cloudflare-icon.svg",
    category: "infrastructure",
    description: "Web security & performance",
  },

  // Programming Languages
  {
    name: "TypeScript",
    logo: "/images/assets/stack-logos/typescript-icon.svg",
    category: "language",
    description: "JavaScript with types",
  },
  {
    name: "Python",
    logo: "/images/assets/stack-logos/python-icon.svg",
    category: "language",
    description: "General-purpose language",
  },

  // Platforms and Tools
  {
    name: "Git",
    logo: "/images/assets/stack-logos/git-icon.svg",
    category: "platform",
    description: "Version control system",
  },
  {
    name: "XenForo",
    logo: "/images/assets/stack-logos/xenforo-icon.svg",
    category: "platform",
    description: "Community forum software",
  },
  {
    name: "WordPress",
    logo: "/images/assets/stack-logos/wordpress-icon.svg",
    category: "platform",
    description: "Content management system",
  },
  {
    name: "Shopify",
    logo: "/images/assets/stack-logos/shopify-icon.svg",
    category: "platform",
    description: "E-commerce platform",
  },
]

// Category configuration
const categories = [
  { id: "all", name: "All", icon: <Blocks className="mr-1.5 h-4 w-4" /> },
  {
    id: "frontend",
    name: "Frontend",
    icon: <Code2 className="mr-1.5 h-4 w-4" />,
  },
  { id: "backend", name: "Backend", icon: <Bot className="mr-1.5 h-4 w-4" /> },
  {
    id: "database",
    name: "Database",
    icon: <Database className="mr-1.5 h-4 w-4" />,
  },
  {
    id: "infrastructure",
    name: "Infrastructure",
    icon: <Server className="mr-1.5 h-4 w-4" />,
  },
  {
    id: "language",
    name: "Languages",
    icon: <Languages className="mr-1.5 h-4 w-4" />,
  },
  {
    id: "platform",
    name: "Platforms",
    icon: <Code2 className="mr-1.5 h-4 w-4" />,
  },
]

const TechStackSection = () => {
  const [category, setCategory] = useState<Category>("all")

  const filteredTech = technologies.filter(
    (tech) => category === "all" || tech.category === category
  )

  return (
    <section className="w-full py-20 md:py-32">
      <div className="mx-auto px-4 md:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-4 text-3xl font-medium tracking-tight text-foreground md:text-4xl"
          >
            Technology Stack
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto max-w-2xl text-lg text-muted-foreground"
          >
            We leverage modern technologies to build robust, scalable solutions
            that stand the test of time.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          <Tabs
            defaultValue="all"
            value={category}
            onValueChange={(v) => setCategory(v as Category)}
            className="w-full"
          >
            <TabsList className="mx-auto flex h-auto w-full max-w-4xl flex-wrap justify-center gap-2 bg-transparent p-0">
              {categories.map((cat) => (
                <TabsTrigger
                  key={cat.id}
                  value={cat.id}
                  className="flex items-center gap-1 rounded-md border border-border bg-card px-4 py-2.5 text-sm transition-all hover:bg-accent data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  {cat.icon}
                  {cat.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 md:gap-6 lg:grid-cols-6">
          {filteredTech.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group flex flex-col items-center gap-3 rounded-lg border border-border bg-card p-6 shadow-sm transition-all hover:border-primary/50 hover:shadow-md"
            >
              <div className="relative flex h-14 w-14 items-center justify-center md:h-16 md:w-16">
                <Image
                  src={tech.logo}
                  alt={tech.name}
                  width={48}
                  height={48}
                  className="object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              <div className="text-center">
                <h3 className="text-sm font-medium text-foreground">
                  {tech.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TechStackSection
