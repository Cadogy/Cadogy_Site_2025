"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { gsap } from "gsap"
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
  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const tabsRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  // Filter technologies based on selected category
  const filteredTech = technologies.filter(
    (tech) => category === "all" || tech.category === category
  )

  // Basic GSAP animation
  useEffect(() => {
    if (!sectionRef.current) return

    // Simple animation timeline
    const tl = gsap.timeline({
      defaults: { ease: "power2.out" },
    })

    // Animate section heading
    tl.fromTo(
      headerRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8 }
    )

    // Animate tabs
    tl.fromTo(
      tabsRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6 },
      "-=0.4"
    )

    // Initial grid animation
    animateGrid()
  }, [])

  // Animate grid when category changes
  useEffect(() => {
    animateGrid()
  }, [category])

  // Function to animate tech grid without ScrollTrigger
  const animateGrid = () => {
    if (!gridRef.current) return

    const techItems = document.querySelectorAll(".tech-item")

    gsap.fromTo(
      techItems,
      { opacity: 0, y: 20, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        stagger: 0.05,
        ease: "power2.out",
      }
    )
  }

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden py-20 md:py-32"
    >
      <div className="mx-auto px-0">
        <div ref={headerRef} className="mb-10 flex flex-col gap-6 text-center">
          <div className="mx-auto">
            <h2 className="text-3xl font-medium tracking-tight text-foreground md:text-4xl">
              Technology Stack
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-base text-muted-foreground">
              We leverage modern technologies to build robust, scalable
              solutions that stand the test of time.
            </p>
          </div>

          <div
            ref={tabsRef}
            className="mx-auto w-full max-w-3xl rounded-lg border border-border bg-background/80 p-1 backdrop-blur-sm"
          >
            <Tabs
              defaultValue="all"
              value={category}
              onValueChange={(v) => setCategory(v as Category)}
              className="w-full"
            >
              <TabsList className="scrollbar-none flex h-auto w-full flex-wrap overflow-x-auto bg-transparent">
                {categories.map((cat) => (
                  <TabsTrigger
                    key={cat.id}
                    value={cat.id}
                    className="flex min-w-[90px] flex-1 items-center whitespace-nowrap px-3 py-2 text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    {cat.icon}
                    {cat.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 md:gap-5 lg:grid-cols-6"
        >
          {filteredTech.map((tech) => (
            <div
              key={tech.name}
              className="tech-item group flex flex-col items-center gap-3 rounded-xl border border-border/50 bg-card/70 p-4 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-border hover:bg-card/90 hover:shadow"
            >
              <div className="relative flex h-12 w-12 items-center justify-center md:h-14 md:w-14">
                <div className="absolute inset-0 scale-0 rounded-lg bg-primary/5 transition-transform duration-300 group-hover:scale-100"></div>
                <Image
                  src={tech.logo}
                  alt={tech.name}
                  width={40}
                  height={40}
                  className="relative z-10 transform object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              <div className="mt-1 text-center">
                <h3 className="text-sm font-medium text-foreground">
                  {tech.name}
                </h3>
                {tech.description && (
                  <p className="mt-1 text-xs text-muted-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {tech.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TechStackSection
