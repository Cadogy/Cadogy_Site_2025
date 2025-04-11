"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Code, Globe, Shield, ChevronDown } from "lucide-react"

const MissionSection = () => {
  // State to track which accordion item is open on mobile
  const [activeTab, setActiveTab] = useState<number>(0)

  const toggleTab = (index: number) => {
    setActiveTab(activeTab === index ? -1 : index)
  }

  const missionItems = [
    {
      id: 0,
      icon: <Code className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" strokeWidth={1.5} />,
      title: "Technical Innovation",
      description: "We're committed to staying at the forefront of technology, continuously learning and pushing boundaries to create solutions that matter. Our developers and engineers constantly explore new approaches to solve complex problems.",
      color: "from-blue-500 to-indigo-600",
      glow: "bg-blue-500/20",
      tags: [
        { text: "Modern Tech", bgColor: "bg-blue-50", textColor: "text-blue-700", darkBgColor: "dark:bg-blue-900/20", darkTextColor: "dark:text-blue-300" },
        { text: "Innovation", bgColor: "bg-indigo-50", textColor: "text-indigo-700", darkBgColor: "dark:bg-indigo-900/20", darkTextColor: "dark:text-indigo-300" }
      ]
    },
    {
      id: 1,
      icon: <Globe className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" strokeWidth={1.5} />,
      title: "Global Impact",
      description: "Every solution we develop is designed to make a meaningful difference in how businesses operate and people connect in our digital world. We build with global accessibility and real-world impact in mind.",
      color: "from-purple-500 to-pink-600",
      glow: "bg-purple-500/20",
      tags: [
        { text: "Connectivity", bgColor: "bg-purple-50", textColor: "text-purple-700", darkBgColor: "dark:bg-purple-900/20", darkTextColor: "dark:text-purple-300" },
        { text: "Global Reach", bgColor: "bg-pink-50", textColor: "text-pink-700", darkBgColor: "dark:bg-pink-900/20", darkTextColor: "dark:text-pink-300" }
      ]
    },
    {
      id: 2,
      icon: <Shield className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" strokeWidth={1.5} />,
      title: "Ethical Standards",
      description: "We uphold the highest ethical standards in cybersecurity and digital rights management, ensuring our solutions protect and empower. Trust and security remain at the core of everything we create.",
      color: "from-green-500 to-emerald-600",
      glow: "bg-green-500/20",
      tags: [
        { text: "Security", bgColor: "bg-green-50", textColor: "text-green-700", darkBgColor: "dark:bg-green-900/20", darkTextColor: "dark:text-green-300" },
        { text: "Integrity", bgColor: "bg-emerald-50", textColor: "text-emerald-700", darkBgColor: "dark:bg-emerald-900/20", darkTextColor: "dark:text-emerald-300" }
      ]
    }
  ]

  return (
    <section className="relative bg-background py-12 md:py-24 overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-500/5 rounded-full blur-[120px] -mr-10 -mt-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-purple-500/5 rounded-full blur-[120px] -ml-10 -mb-10 pointer-events-none"></div>
      
      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto mb-10 md:mb-20 text-center"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-foreground">
            Our Mission
          </h2>
          <p className="mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed">
            We see ourselves not just as a business, but as passionate individuals on a shared journey of growth, learning, and transformation.
          </p>
        </motion.div>
        
        {/* Mobile accordion view */}
        <div className="md:hidden mb-8">
          {missionItems.map((item, index) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10px" }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              className="mb-3"
            >
              <div 
                className={`rounded-xl border border-border/50 overflow-hidden transition-all ${activeTab === index ? 'shadow-md' : ''}`}
              >
                <button 
                  onClick={() => toggleTab(index)}
                  className="flex items-center justify-between w-full p-4 text-left bg-card"
                  aria-expanded={activeTab === index}
                >
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-lg mr-3 bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0`}>
                      {item.icon}
                    </div>
                    <h3 className="text-lg font-medium text-foreground">{item.title}</h3>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${activeTab === index ? 'transform rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {activeTab === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 pt-0 border-t border-border/30">
                        <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {item.tags.map((tag, tagIndex) => (
                            <span 
                              key={tagIndex}
                              className={`inline-flex items-center rounded-md ${tag.bgColor} ${tag.darkBgColor} px-2.5 py-0.5 text-xs font-medium ${tag.textColor} ${tag.darkTextColor}`}
                            >
                              {tag.text}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Desktop view */}
        <div className="hidden md:block space-y-12 md:space-y-16">
          {/* Technical Innovation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative"
          >
            <div className="md:flex items-stretch p-1">
              <div className="flex-shrink-0 mb-6 md:mb-0 md:w-1/4 md:flex md:justify-end md:pr-8">
                <div className="relative group mx-auto">
                  <div className="absolute inset-0 bg-blue-500/10 rounded-xl blur-lg transform group-hover:scale-110 transition-transform duration-500 ease-out"></div>
                  <div className="relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg transform transition-transform">
                    <Code className="w-8 h-8 md:w-10 md:h-10 text-white" strokeWidth={1.5} />
                  </div>
                </div>
              </div>
              
              <div className="md:w-3/4 bg-card border border-border/30 rounded-2xl p-6 md:p-8 shadow-sm">
                <h3 className="text-2xl font-medium text-foreground mb-3">Technical Innovation</h3>
                <p className="text-muted-foreground mb-5">
                  We&apos;re committed to staying at the forefront of technology, continuously learning and pushing boundaries to create solutions that matter. Our developers and engineers constantly explore new approaches to solve complex problems.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center rounded-md bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/20 dark:text-blue-300">
                    Modern Tech
                  </span>
                  <span className="inline-flex items-center rounded-md bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300">
                    Innovation
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Global Impact */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="md:flex items-stretch flex-row-reverse p-1">
              <div className="flex-shrink-0 mb-6 md:mb-0 md:w-1/4 md:flex md:justify-start md:pl-8">
                <div className="relative group mx-auto">
                  <div className="absolute inset-0 bg-purple-500/10 rounded-xl blur-lg transform group-hover:scale-110 transition-transform duration-500 ease-out"></div>
                  <div className="relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 shadow-lg transform transition-transform">
                    <Globe className="w-8 h-8 md:w-10 md:h-10 text-white" strokeWidth={1.5} />
                  </div>
                </div>
              </div>
              
              <div className="md:w-3/4 bg-card border border-border/30 rounded-2xl p-6 md:p-8 shadow-sm">
                <h3 className="text-2xl font-medium text-foreground mb-3">Global Impact</h3>
                <p className="text-muted-foreground mb-5">
                  Every solution we develop is designed to make a meaningful difference in how businesses operate and people connect in our digital world. We build with global accessibility and real-world impact in mind.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center rounded-md bg-purple-50 px-3 py-1 text-xs font-medium text-purple-700 dark:bg-purple-900/20 dark:text-purple-300">
                    Connectivity
                  </span>
                  <span className="inline-flex items-center rounded-md bg-pink-50 px-3 py-1 text-xs font-medium text-pink-700 dark:bg-pink-900/20 dark:text-pink-300">
                    Global Reach
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Ethical Standards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10px" }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative"
          >
            <div className="md:flex items-stretch p-1">
              <div className="flex-shrink-0 mb-6 md:mb-0 md:w-1/4 md:flex md:justify-end md:pr-8">
                <div className="relative group mx-auto">
                  <div className="absolute inset-0 bg-green-500/10 rounded-xl blur-lg transform group-hover:scale-110 transition-transform duration-500 ease-out"></div>
                  <div className="relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg transform transition-transform">
                    <Shield className="w-8 h-8 md:w-10 md:h-10 text-white" strokeWidth={1.5} />
                  </div>
                </div>
              </div>
              
              <div className="md:w-3/4 bg-card border border-border/30 rounded-2xl p-6 md:p-8 shadow-sm">
                <h3 className="text-2xl font-medium text-foreground mb-3">Ethical Standards</h3>
                <p className="text-muted-foreground mb-5">
                  We uphold the highest ethical standards in cybersecurity and digital rights management, ensuring our solutions protect and empower. Trust and security remain at the core of everything we create.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center rounded-md bg-green-50 px-3 py-1 text-xs font-medium text-green-700 dark:bg-green-900/20 dark:text-green-300">
                    Security
                  </span>
                  <span className="inline-flex items-center rounded-md bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300">
                    Integrity
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10px" }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="max-w-3xl mx-auto text-center mt-10 md:mt-24"
        >
          <blockquote className="relative px-6 md:px-8">
            <div className="absolute top-0 left-0 transform -translate-y-3 text-4xl md:text-5xl text-blue-500/20">&ldquo;</div>
            <p className="relative z-10 text-base sm:text-lg md:text-xl text-foreground/90 italic font-light">
              Our mission is to empower creators, businesses, and innovators with tools that not only solve problems but spark change.
            </p>
            <div className="absolute bottom-0 right-0 transform translate-y-3 text-4xl md:text-5xl text-blue-500/20">&rdquo;</div>
          </blockquote>
        </motion.div>
      </div>
    </section>
  )
}

export default MissionSection 