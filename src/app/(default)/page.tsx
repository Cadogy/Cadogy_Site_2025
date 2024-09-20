import Link from "next/link"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { HeroCarousel } from "@/components/elements/HeroCarousel"
import { Icons } from "@/components/icons"

export default function Home() {
  const slides = [
    {
      link: "/index/can-piracy-be-stopped",
      image: "/images/slide_1_bg.jpg",
      altImage: "/images/slide_1_bg_alt.jpg",
      title:
        "Can Piracy Be Stopped? Lessons from Real-World Anti-Piracy Efforts",
      description:
        "When a majority of the world's population cannot afford food, what makes you think they can afford your WordPress theme?",
    },
    {
      link: "/index/nvidia-ai-gpu-revolution-2024-2025",
      image: "/images/slide_2_bg.jpg",
      altImage: "/images/slide_2_bg_alt.jpg",
      title: "Nvidia’s Revolution. GPU Technology Is Changing the Future",
      description:
        "Nvidia's latest advancements is setting the stage for a new era in artificial intelligence and machine learning.",
    },
    {
      link: "/index/how-to-train-your-own-large-language-model-for-business-ai",
      image: "/images/slide_3_bg.jpg",
      altImage: "/images/slide_3_bg_alt_2.jpg",
      title: "Training Your Own Large Language Model. AI for Your Business",
      description:
        "Here's how you can start training your own artificial intelligence locally and why it's essential.",
    },
  ]

  return (
    <>
      <HeroCarousel slides={slides} />
    </>
  )
}
