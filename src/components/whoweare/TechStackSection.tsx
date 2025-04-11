"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Technology categories
type Category = "frontend" | "backend" | "database" | "infrastructure" | "language" | "platform" | "all"

// Define tech stack items with proper typing
interface TechItem {
  name: string
  logo: string
  category: Category
}

// Technology items
const technologies: TechItem[] = [
  // Frontend
  { name: "NextJS", logo: "/images/assets/stack-logos/nextjs-icon.svg", category: "frontend" },
  { name: "ReactJS", logo: "/images/assets/stack-logos/react-icon.svg", category: "frontend" },
  { name: "TailwindCSS", logo: "/images/assets/stack-logos/tailwindcss-icon.svg", category: "frontend" },
  
  // Backend
  { name: "NodeJS", logo: "/images/assets/stack-logos/nodejs-icon.svg", category: "backend" },
  { name: "ExpressJS", logo: "/images/assets/stack-logos/expressjs-icon.svg", category: "backend" },
  
  // Database
  { name: "MongoDB", logo: "/images/assets/stack-logos/mongodb-icon.svg", category: "database" },
  { name: "MariaDB", logo: "/images/assets/stack-logos/mariadb-icon.svg", category: "database" },
  
  // Infrastructure
  { name: "AWS", logo: "/images/assets/stack-logos/aws-icon.svg", category: "infrastructure" },
  { name: "Google Cloud", logo: "/images/assets/stack-logos/googlecloud-icon.svg", category: "infrastructure" },
  { name: "Cloudflare", logo: "/images/assets/stack-logos/cloudflare-icon.svg", category: "infrastructure" },
  
  // Programming Languages
  { name: "TypeScript", logo: "/images/assets/stack-logos/typescript-icon.svg", category: "language" },
  { name: "Python", logo: "/images/assets/stack-logos/python-icon.svg", category: "language" },
  
  // Platforms and Tools
  { name: "Git", logo: "/images/assets/stack-logos/git-icon.svg", category: "platform" },
  { name: "XenForo", logo: "/images/assets/stack-logos/xenforo-icon.svg", category: "platform" },
  { name: "WordPress", logo: "/images/assets/stack-logos/wordpress-icon.svg", category: "platform" },
  { name: "Shopify", logo: "/images/assets/stack-logos/shopify-icon.svg", category: "platform" }
]

// Category configuration
const categories = [
  { id: "all", name: "All" },
  { id: "frontend", name: "Frontend" },
  { id: "backend", name: "Backend" },
  { id: "database", name: "Database" },
  { id: "infrastructure", name: "Infrastructure" },
  { id: "language", name: "Languages" },
  { id: "platform", name: "Platforms" }
]

// Tech item component
const TechItem = ({ tech }: { tech: TechItem }) => (
  <div className="flex flex-col items-center justify-center p-3 bg-card/50 hover:bg-card border border-border/50 hover:border-border rounded-lg transition-colors">
    <div className="w-8 h-8 md:w-10 md:h-10 relative flex items-center justify-center mb-2">
      <Image 
        src={tech.logo}
        alt={tech.name}
        width={30}
        height={30}
        className="object-contain"
      />
    </div>
    <span className="text-xs font-medium text-foreground">{tech.name}</span>
  </div>
)

const TechStackSection = () => {
  const [category, setCategory] = useState<Category>("all")
  
  const filteredTech = technologies.filter(tech => 
    category === "all" || tech.category === category
  )

  return (
    <section className="py-12 md:py-16 bg-background/50 border-border">
      <div className="container px-4">
        <div className="flex flex-col gap-6 mb-8">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-foreground">
              Our Tech Stack
            </h2>
            <p className="mt-2 text-sm md:text-base text-muted-foreground mx-auto max-w-xl">
              We leverage modern technologies to build robust, scalable solutions.
            </p>
          </div>
          
          <div className="bg-background border border-border rounded-lg p-1 mx-auto w-full max-w-2xl">
            <Tabs defaultValue="all" value={category} onValueChange={(v) => setCategory(v as Category)}>
              <TabsList className="flex flex-wrap w-full bg-transparent h-auto overflow-x-auto scrollbar-none">
                {categories.map(cat => (
                  <TabsTrigger 
                    key={cat.id} 
                    value={cat.id}
                    className="text-xs py-2 px-3 flex-1 min-w-[80px] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground whitespace-nowrap"
                  >
                    {cat.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>

        <motion.div
          key={category} 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3"
        >
          {filteredTech.map(tech => (
            <TechItem key={tech.name} tech={tech} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default TechStackSection 