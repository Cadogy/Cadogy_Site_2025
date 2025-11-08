import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

const tabs = [
  {
    id: 1,
    title: "Build",
    description:
      "Build a new site from the ground up — including its entire design system — modify its structure and design with ease, and generate code to power dynamic web experiences.",
    image: "/images/homepage/tabs/cadogy_building_your_website.webp",
  },
  {
    id: 2,
    title: "Manage",
    description:
      "Manage the content of your site with the ability to generate copy and CMS collection items individually or in bulk to drive traffic and engagement.",
    image: "/images/homepage/tabs/cadogy_managing_your_website_content.jpg",
  },
  {
    id: 3,
    title: "Optimize",
    description:
      "Optimize your site for all audiences by auditing and improving SEO and AEO — and continually testing and improving your site based on CRO best practices.",
    image: "/images/homepage/tabs/cadogy_keyword_optimization_of_website.webp",
  },
]

const TabsSection = () => {
  const [activeTab, setActiveTab] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveTab((current) => (current + 1) % tabs.length)
          return 0
        }
        return prev + 100 / 60
      })
    }, 100)

    return () => clearInterval(interval)
  }, [])

  const handleTabClick = (index: number) => {
    setActiveTab(index)
    setProgress(0)
  }

  return (
    <section className="w-full py-20 md:py-32">
      <div className="mx-auto px-0">
        <div className="space-y-8 md:space-y-12">
          <div className="relative aspect-[21/9] overflow-hidden rounded-lg bg-card">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeTab}
                src={tabs[activeTab].image}
                alt={tabs[activeTab].title}
                className="h-full w-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              />
            </AnimatePresence>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
            {tabs.map((tab, index) => (
              <div key={tab.id}>
                <button
                  onClick={() => handleTabClick(index)}
                  className="w-full text-left"
                >
                  <div className="mb-3 h-0.5 w-full overflow-hidden bg-border">
                    <motion.div
                      className="h-full bg-foreground"
                      initial={{ width: "0%" }}
                      animate={{
                        width: activeTab === index ? `${progress}%` : "0%",
                      }}
                      transition={{ duration: 0.1 }}
                    />
                  </div>

                  <div
                    className={`transition-opacity duration-300 ${
                      activeTab === index
                        ? "opacity-100"
                        : "opacity-50 hover:opacity-75"
                    }`}
                  >
                    <h3 className="mb-3 text-xl font-medium text-foreground md:text-2xl">
                      {tab.title}
                    </h3>

                    <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                      {tab.description}
                    </p>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default TabsSection
