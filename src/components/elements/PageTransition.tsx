// src/components/PageTransition.tsx
"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"

interface PageTransitionProps {
  children: React.ReactNode
}

export const PageTransition = ({ children }: PageTransitionProps) => {
  const pathname = usePathname()
  const [displayedChildren, setDisplayedChildren] = useState(children)

  useEffect(() => {
    setDisplayedChildren(children)
  }, [children])

  const variants = {
    initial: { opacity: 0 }, // Start invisible
    animate: { opacity: 1 }, // Fade in to fully visible
  }

  return (
    <motion.div
      key={pathname}
      initial="initial"
      animate="animate"
      variants={variants}
      transition={{ duration: 0.5 }} // Adjust the duration as needed
    >
      {displayedChildren}
    </motion.div>
  )
}
