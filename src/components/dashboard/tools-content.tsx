"use client"

import { useEffect, useRef, useState } from "react"
import { useUserData } from "@/providers/UserDataProvider"
import {
  AlertTriangle,
  BookOpen,
  CheckCircle,
  Compass,
  FileText,
  ImageIcon,
  ListTodo,
  Pencil,
  SparklesIcon,
  Wand2,
  Workflow,
} from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Tool definitions
const tools = [
  {
    id: "course-outline",
    name: "Course Outline Generator",
    description: "Generate detailed course outlines from keywords or topics",
    icon: BookOpen,
    category: "education",
    tokenCost: 50,
    comingSoon: false,
  },
  {
    id: "blog-post",
    name: "Blog Post Generator",
    description:
      "Create well-structured blog posts from a title and key points",
    icon: FileText,
    category: "content",
    tokenCost: 75,
    comingSoon: false,
  },
  {
    id: "seo-optimizer",
    name: "SEO Content Optimizer",
    description:
      "Analyze and optimize your content for better search engine rankings",
    icon: Compass,
    category: "content",
    tokenCost: 40,
    comingSoon: false,
  },
  {
    id: "image-generator",
    name: "AI Image Creator",
    description: "Generate custom images from your text descriptions",
    icon: ImageIcon,
    category: "visual",
    tokenCost: 120,
    comingSoon: true,
  },
  {
    id: "learning-plan",
    name: "Learning Path Creator",
    description: "Build personalized learning roadmaps for any skill or topic",
    icon: Workflow,
    category: "education",
    tokenCost: 60,
    comingSoon: false,
  },
  {
    id: "content-rewriter",
    name: "Content Rewriter",
    description:
      "Rewrite and improve existing content while maintaining its meaning",
    icon: Pencil,
    category: "content",
    tokenCost: 35,
    comingSoon: false,
  },
  {
    id: "task-breakdown",
    name: "Project Task Breakdown",
    description:
      "Break down complex projects into manageable tasks and timelines",
    icon: ListTodo,
    category: "productivity",
    tokenCost: 45,
    comingSoon: false,
  },
  {
    id: "ai-assistant",
    name: "Custom AI Assistant",
    description:
      "Build your own specialized AI assistant for specific workflows",
    icon: Wand2,
    category: "productivity",
    tokenCost: 200,
    comingSoon: true,
  },
]

// Tool categories
const categories = [
  { id: "all", name: "All Tools" },
  { id: "content", name: "Content Creation" },
  { id: "education", name: "Education" },
  { id: "productivity", name: "Productivity" },
  { id: "visual", name: "Visual" },
]

export function DashboardToolsContent() {
  const { userData } = useUserData()
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [showLeftGradient, setShowLeftGradient] = useState(false)
  const [showRightGradient, setShowRightGradient] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // Handle scroll events to show/hide gradients
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current
      setShowLeftGradient(scrollLeft > 10)
      setShowRightGradient(scrollLeft + clientWidth < scrollWidth - 10)
    }
  }

  // Check if we need to show the right gradient on initial render and when category changes
  useEffect(() => {
    if (scrollContainerRef.current) {
      const { scrollWidth, clientWidth } = scrollContainerRef.current
      setShowRightGradient(scrollWidth > clientWidth)
    }
  }, [activeCategory])

  // Filter tools based on category and search query
  const filteredTools = tools.filter((tool) => {
    const matchesCategory =
      activeCategory === "all" || tool.category === activeCategory
    const matchesSearch =
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleToolClick = (toolId: string) => {
    // This would navigate to the specific tool page
    console.log(`Tool clicked: ${toolId}`)
    // router.push(`/dashboard/tools/${toolId}`)
  }

  return (
    <div className="space-y-6">
      {userData.tokenBalance < 50 && (
        <Alert className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/30">
          <AlertTriangle className="h-4 w-4 text-amber-500" />
          <AlertTitle className="text-amber-600 dark:text-amber-400">
            Low token balance
          </AlertTitle>
          <AlertDescription className="text-amber-700 dark:text-amber-300">
            You have {userData.tokenBalance} tokens remaining. Some tools may
            require more tokens.{" "}
            <a href="/dashboard/tokens" className="font-medium underline">
              Top up your tokens
            </a>{" "}
            to use all features.
          </AlertDescription>
        </Alert>
      )}

      <div className="flex flex-col gap-4">
        <div className="relative overflow-hidden">
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="scrollbar-none -mb-2 overflow-x-auto pb-2"
          >
            <Tabs
              defaultValue="all"
              className="w-full"
              onValueChange={setActiveCategory}
            >
              <TabsList className="flex w-max space-x-1 p-1">
                {categories.map((category) => (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    className="min-w-max text-xs sm:text-sm"
                  >
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
          {/* Right gradient - now conditional */}
          <div
            className={`absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-background to-transparent transition-opacity duration-200 ${
              showRightGradient ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* Left gradient - shows when scrolled */}
          <div
            className={`absolute left-0 top-0 h-full w-8 bg-gradient-to-r from-background to-transparent transition-opacity duration-200 ${
              showLeftGradient ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>

        <div className="w-full">
          <Input
            placeholder="Search tools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredTools.map((tool) => (
          <Card
            key={tool.id}
            className={`group cursor-pointer transition-all hover:shadow-md ${
              tool.comingSoon ? "opacity-80" : "hover:border-primary/50"
            }`}
            onClick={() => !tool.comingSoon && handleToolClick(tool.id)}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="rounded-md bg-primary/10 p-2">
                  <tool.icon className="h-5 w-5 text-primary" />
                </div>
                {tool.comingSoon && (
                  <span className="rounded-lg border border-amber-300/30 bg-amber-100/10 px-2.5 py-0.5 text-xs font-medium text-amber-500 dark:border-amber-400/30 dark:bg-amber-400/10 dark:text-amber-400">
                    Coming Soon
                  </span>
                )}
              </div>
              <CardTitle className="mt-3 text-lg">{tool.name}</CardTitle>
              <CardDescription>{tool.description}</CardDescription>
            </CardHeader>
            <CardFooter className="pt-2">
              <div className="flex w-full items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">
                    {tool.tokenCost}
                  </span>{" "}
                  tokens/use
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  disabled={
                    tool.comingSoon || userData.tokenBalance < tool.tokenCost
                  }
                  className="group-hover:bg-primary group-hover:text-primary-foreground"
                >
                  {tool.comingSoon ? (
                    <span>Coming Soon</span>
                  ) : userData.tokenBalance < tool.tokenCost ? (
                    <span>Need More Tokens</span>
                  ) : (
                    <span>Use Tool</span>
                  )}
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredTools.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-12">
          <SparklesIcon className="h-8 w-8 text-muted-foreground/70" />
          <h3 className="mt-4 text-lg font-medium">No tools found</h3>
          <p className="mt-2 text-center text-muted-foreground">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  )
}
