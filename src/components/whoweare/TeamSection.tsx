"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { addCacheBuster } from "@/lib/utils"
import { Linkedin, Mail, ChevronDown, ChevronUp } from "lucide-react"

const TeamSection = () => {
  const [activeTab, setActiveTab] = useState(0)
  const [expandedMobile, setExpandedMobile] = useState<number | null>(null)

  const toggleMobileExpand = (id: number) => {
    setExpandedMobile(expandedMobile === id ? null : id)
  }

  const teamMembers = [
    {
      id: 0,
      name: "Charles Knapp",
      role: "Chief Technology Officer",
      badge: "Co-Founder",
      image: "/images/authors/charles_k_author.jpg",
      bio: "Charles Knapp is a distinguished expert in cybersecurity and digital infrastructure with a proven track record of delivering enterprise-grade solutions. His methodical approach to system architecture and security implementation has helped numerous organizations establish robust digital frameworks that withstand modern cybersecurity challenges.",
      bio2: "As CTO, Charles leads our technical strategy and implementation, specializing in deploying advanced DNS security protocols and developing proprietary anti-piracy technologies. His architectural expertise spans cloud infrastructure optimization, high-availability systems, and secure application development using the MERN stack ecosystem.",
      skills: [
        "Cloud Infrastructure", "Security Architecture", "Full Stack Development",
        "MERN Stack", "AWS/Cloud", "DNS Security"
      ],
      linkedin: "https://www.linkedin.com/in/charlesknapp",
      email: "mailto:charles@cadogy.com",
      color: "from-blue-500 to-indigo-600"
    },
    {
      id: 1,
      name: "Dylan Safra",
      role: "Chief Strategy Officer",
      badge: "Co-Founder",
      image: "/images/authors/dylan_s_author.jpg",
      bio: "Dylan Safra is an accomplished digital strategist with extensive experience in data-driven business transformation and growth optimization. Combining technical proficiency with strategic vision, he has successfully led numerous enterprise clients through digital transformations that deliver measurable business outcomes and competitive advantages.",
      bio2: "As CSO, Dylan directs our product strategy and client solutions, leveraging his expertise in SEO optimization, automation systems, and performance analytics. His integrated approach to technology deployment ensures our solutions not only meet technical requirements but drive tangible business value through enhanced user experiences and operational efficiencies.",
      skills: [
        "Digital Strategy", "SEO Optimization", "Process Automation", 
        "Growth Engineering", "Data Analysis", "Market Positioning"
      ],
      linkedin: "https://www.linkedin.com/in/dylansafra",
      email: "mailto:dylan@cadogy.com",
      color: "from-green-500 to-emerald-600"
    }
  ]

  return (
    <section className="bg-background py-12 md:py-24">
      <div className="container px-4 mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-2xl font-medium tracking-tight md:text-4xl text-foreground">
            Leadership Team
          </h2>
          <p className="mt-3 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Bringing together decades of combined experience in technology, security, and digital strategy
          </p>
        </div>

        {/* Team display */}
        <div className="flex flex-col gap-8">
          {/* Tabs - Desktop Only */}
          <div className="hidden md:flex border-b border-border">
            <div className="flex mx-auto space-x-4">
              {teamMembers.map((member, idx) => (
                <button
                  key={member.id}
                  onClick={() => setActiveTab(idx)}
                  className={`px-8 py-3 font-medium relative ${
                    activeTab === idx
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground/80"
                  }`}
                  aria-selected={activeTab === idx}
                >
                  {member.name}
                  {activeTab === idx && (
                    <motion.div
                      layoutId="activeTabLine"
                      className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${member.color}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Profile Cards - Mobile */}
          <div className="md:hidden space-y-4">
            {teamMembers.map((member) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-card border border-border rounded-xl overflow-hidden shadow-sm"
              >
                {/* Compact Header - Always visible */}
                <div 
                  className="p-4 flex items-center cursor-pointer"
                  onClick={() => toggleMobileExpand(member.id)}
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && toggleMobileExpand(member.id)}
                  aria-expanded={expandedMobile === member.id}
                  role="button"
                >
                  <div className="flex-shrink-0 mr-3">
                    <div className="h-14 w-14 rounded-lg overflow-hidden">
                      <img
                        src={addCacheBuster(member.image)}
                        alt={member.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-base font-medium text-foreground">
                          {member.name}
                        </h3>
                        <p className="text-xs text-muted-foreground">{member.role}</p>
                        <div className="mt-1">
                          <span className={`inline-block rounded-md px-2 py-0.5 text-xs bg-gradient-to-r ${member.color} text-white`}>
                            {member.badge}
                          </span>
                        </div>
                      </div>
                      <div>
                        {expandedMobile === member.id ? (
                          <ChevronUp className="h-5 w-5 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expandable Content */}
                <AnimatePresence>
                  {expandedMobile === member.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4">
                        <div className="border-t border-border my-2 pt-3">
                          <p className="text-sm text-muted-foreground">{member.bio}</p>
                          <p className="text-sm text-muted-foreground mt-2">{member.bio2}</p>
                        </div>
                        
                        <div className="mt-4">
                          <h4 className="text-sm font-medium mb-2 text-foreground">Expertise</h4>
                          <div className="flex flex-wrap gap-1.5">
                            {member.skills.map((skill, i) => (
                              <span
                                key={i}
                                className="inline-flex items-center rounded-md bg-accent/30 px-2.5 py-0.5 text-xs"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="mt-4 flex items-center gap-3">
                          <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-md bg-accent/30 text-foreground hover:bg-accent transition-colors"
                            aria-label="LinkedIn Profile"
                          >
                            <Linkedin className="h-4 w-4" />
                          </a>
                          <a
                            href={member.email}
                            className="p-1.5 rounded-md bg-accent/30 text-foreground hover:bg-accent transition-colors"
                            aria-label="Email Contact"
                          >
                            <Mail className="h-4 w-4" />
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Active Member Profile - Desktop */}
          <div className="hidden md:block mt-8">
            {teamMembers.map((member, idx) => (
              activeTab === idx && (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex flex-col lg:flex-row gap-12 items-start">
                    {/* Profile Card - Photo and basic info */}
                    <div className="w-full lg:w-1/3 bg-card border border-border rounded-xl overflow-hidden shadow-sm">
                      <div className="aspect-[4/3] w-full overflow-hidden">
                        <img
                          src={addCacheBuster(member.image)}
                          alt={member.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <div className={`inline-block rounded-md px-3 py-1 text-sm bg-gradient-to-r ${member.color} text-white mb-3`}>
                          {member.badge}
                        </div>
                        <h3 className="text-2xl font-medium text-foreground">
                          {member.name}
                        </h3>
                        <p className="text-muted-foreground">{member.role}</p>
                        
                        <div className="mt-6 flex gap-3">
                          <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-md bg-accent/30 text-foreground hover:bg-accent transition-colors"
                            aria-label="LinkedIn Profile"
                          >
                            <Linkedin className="h-5 w-5" />
                          </a>
                          <a
                            href={member.email}
                            className="p-2 rounded-md bg-accent/30 text-foreground hover:bg-accent transition-colors"
                            aria-label="Email Contact"
                          >
                            <Mail className="h-5 w-5" />
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Bio and skills */}
                    <div className="w-full lg:w-2/3">
                      <div className="prose prose-lg dark:prose-invert">
                        <p className="text-muted-foreground">{member.bio}</p>
                        <p className="text-muted-foreground">{member.bio2}</p>
                      </div>

                      <div className="mt-8">
                        <h4 className="text-xl font-medium mb-4 text-foreground">Areas of Expertise</h4>
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                          {member.skills.map((skill, i) => (
                            <div
                              key={i}
                              className="bg-card border border-border rounded-lg p-3 text-center"
                            >
                              <span className="text-sm">{skill}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default TeamSection 