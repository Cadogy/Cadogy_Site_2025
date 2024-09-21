import Link from "next/link"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { HeroCarousel } from "@/components/elements/HeroCarousel"
import TextSlideEffect from "@/components/elements/TextSlideEffect"
import { Icons } from "@/components/icons"

export default function Home() {
  const slides = [
    {
      link: "/articles/can-piracy-be-stopped",
      image: "/images/slide_1_bg.jpg",
      altImage: "/images/slide_1_bg_alt.jpg",
      title:
        "Can Piracy Be Stopped? Lessons from Real-World Anti-Piracy Efforts",
      description:
        "Throughout my years working on anti-piracy systems, I've come to realize that stopping piracy completely is a complex, multi-layered issue.",
      authorName: "Charles",
      authorImage: "/images/authors/charles_k_author.jpg",
    },
    {
      link: "/articles/how-to-train-your-own-large-language-model-for-business-ai",
      image: "/images/slide_3_bg.jpg",
      altImage: "/images/slide_3_bg_alt_2.jpg",
      title: "Can You Train Your Own Large Language Model?",
      description:
        "Training your own LLM locally is not only feasible but essential for the future of small businesses.",
      authorName: "Dylan",
      authorImage: "/images/authors/dylan_s_author.jpg",
    },
  ]

  return (
    <>
      <HeroCarousel slides={slides} />
      <TextSlideEffect />
    </>
  )
}
