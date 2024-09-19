import Link from "next/link"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { HeroCarousel } from "@/components/elements/HeroCarousel"
import { Icons } from "@/components/icons"

export default function Home() {
  const slides = [
    {
      link: "/index/the-accessible-licensing-crisis",
      image: "/images/slide_1_bg.jpg",
      title: "The Accessible Licensing Crisis: Piracy in the Digital Age",
      description:
        "When a majority of the world's population cannot afford food, what makes you think they can afford your WordPress theme?",
    },
    {
      link: "/index/the-accessible-licensing-crisis",
      image: "/images/slide_2_bg.jpg",
      title: "Innovate with Us",
      description: "Join us on a journey of innovation",
    },
    {
      link: "/index/the-accessible-licensing-crisis",
      image: "/images/slide_3_bg.jpg",
      title: "Grow Your Business",
      description: "Unlock your business potential with us",
    },
  ]

  return (
    <>
      <HeroCarousel slides={slides} />
    </>
  )
}
