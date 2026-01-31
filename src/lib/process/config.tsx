import { ReactNode } from "react"
import { Compass, Code, Rocket } from "lucide-react"
import { ProcessStepProps } from "@/components/process/ProcessStep"

export type ProcessConfigItem = Omit<ProcessStepProps, "className">

export const PROCESS_STEPS: ProcessConfigItem[] = [
  {
    number: 1,
    title: "Discovery & Planning",
    description:
      "We begin by understanding your goals, analyzing requirements, and creating a comprehensive roadmap that aligns with your vision and business objectives.",
    icon: <Compass className="h-6 w-6 text-primary" />,
  },
  {
    number: 2,
    title: "Development & Testing",
    description:
      "Our team builds your solution using cutting-edge technologies, following best practices and conducting rigorous testing to ensure quality and performance.",
    icon: <Code className="h-6 w-6 text-primary" />,
  },
  {
    number: 3,
    title: "Launch & Support",
    description:
      "We deploy your project seamlessly and provide ongoing support to ensure everything runs smoothly, with continuous monitoring and optimization.",
    icon: <Rocket className="h-6 w-6 text-primary" />,
  },
]
