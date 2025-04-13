"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import {
  ArrowRight,
  Award,
  Briefcase,
  ChevronDown,
  ChevronUp,
  Linkedin,
  Mail,
  Sparkles,
} from "lucide-react"

import { addCacheBuster } from "@/lib/utils"

const TeamSection = () => {
  const [activeTab, setActiveTab] = useState(0)
  const [expandedMobile, setExpandedMobile] = useState<number | null>(null)

  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const tabsRef = useRef<HTMLDivElement>(null)
  const profileRef = useRef<HTMLDivElement>(null)

  const toggleMobileExpand = (id: number) => {
    setExpandedMobile(expandedMobile === id ? null : id)
  }

  // Basic GSAP animations
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

    // Animate mobile cards
    const mobileCards = document.querySelectorAll(".team-card-mobile")
    tl.fromTo(
      mobileCards,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
      },
      "-=0.4"
    )

    // Animate initial profile
    if (profileRef.current) {
      tl.fromTo(
        profileRef.current,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.6 },
        "-=0.2"
      )
    }
  }, [])

  // Animate profile on tab change
  useEffect(() => {
    if (!profileRef.current) return

    gsap.fromTo(
      profileRef.current,
      { opacity: 0, x: 20 },
      { opacity: 1, x: 0, duration: 0.6 }
    )
  }, [activeTab])

  const teamMembers = [
    {
      id: 0,
      name: "Charles Knapp",
      role: "Chief Technology Officer",
      badge: "Co-Founder",
      image: "/images/authors/charles_k_author.jpg",
      bio: "Charles Knapp is a distinguished expert in cybersecurity and digital infrastructure with a proven track record of delivering enterprise-grade solutions. His methodical approach to system architecture and security implementation has helped numerous organizations establish robust digital frameworks that withstand modern cybersecurity challenges.",
      bio2: "As CTO, Charles leads our technical strategy and implementation, specializing in deploying advanced DNS security protocols and developing proprietary anti-piracy technologies. His architectural expertise spans cloud infrastructure optimization, high-availability systems, and secure application development using the MERN stack ecosystem.",
      skills: ["Cloud", "Security", "SEO", "Email", "AWS/Cloud", "Networking"],
      accomplishments: [
        "Designed enterprise-level security protocols",
        "Developed proprietary anti-piracy systems",
        "Led cloud infrastructure optimization",
      ],
      linkedin: "https://www.linkedin.com/in/charlesknapp",
      email: "mailto:charles@cadogy.com",
      color: "from-blue-500 to-indigo-600",
      lightColor: "bg-blue-50 dark:bg-blue-900/20",
      textColor: "text-blue-700 dark:text-blue-300",
      iconColor: "text-blue-600",
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
        "Digital Strategy",
        "SEO Optimization",
        "Process Automation",
        "Growth Engineering",
        "Data Analysis",
        "Market Positioning",
      ],
      accomplishments: [
        "Transformed enterprise growth strategies",
        "Designed performance automation systems",
        "Led comprehensive SEO optimization programs",
      ],
      linkedin: "https://www.linkedin.com/in/dylansafra",
      email: "mailto:dylan@cadogy.com",
      color: "from-green-500 to-emerald-600",
      lightColor: "bg-green-50 dark:bg-green-900/20",
      textColor: "text-green-700 dark:text-green-300",
      iconColor: "text-green-600",
    },
  ]

  return (
    <div
      ref={sectionRef}
      className="relative overflow-hidden bg-background py-16 md:py-24"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div ref={headerRef} className="mb-12 text-center md:mb-16">
          <div className="mb-4 inline-flex items-center justify-center rounded-md bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            Our Team
          </div>
          <h2 className="text-3xl font-medium tracking-tight text-foreground md:text-4xl">
            Leadership Team
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-muted-foreground md:text-lg">
            Bringing together decades of combined experience in technology,
            security, and digital strategy
          </p>
        </div>

        {/* Team display */}
        <div className="flex flex-col gap-8">
          {/* Tabs - Desktop Only */}
          <div
            ref={tabsRef}
            className="mb-8 hidden justify-center border-b border-border md:flex"
          >
            <div className="relative flex space-x-6">
              {teamMembers.map((member, idx) => (
                <button
                  key={member.id}
                  onClick={() => setActiveTab(idx)}
                  className={`relative px-8 py-3 font-medium ${
                    activeTab === idx
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground/80"
                  }`}
                  aria-selected={activeTab === idx}
                >
                  {member.name}
                  {activeTab === idx && (
                    <div
                      className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${member.color}`}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Profile Cards - Mobile */}
          <div className="space-y-5 md:hidden">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="team-card-mobile overflow-hidden rounded-xl border border-border bg-card/90 shadow-sm backdrop-blur-sm"
              >
                {/* Header with gradient */}
                <div className={`h-2 bg-gradient-to-r ${member.color}`}></div>

                {/* Compact Header - Always visible */}
                <div
                  className="flex cursor-pointer items-center p-4"
                  onClick={() => toggleMobileExpand(member.id)}
                  tabIndex={0}
                  onKeyDown={(e) =>
                    e.key === "Enter" && toggleMobileExpand(member.id)
                  }
                  aria-expanded={expandedMobile === member.id}
                  role="button"
                >
                  <div className="mr-4 flex-shrink-0">
                    <div className="h-16 w-16 overflow-hidden rounded-lg ring-2 ring-border">
                      <img
                        src={addCacheBuster(member.image)}
                        alt={member.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-foreground">
                          {member.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {member.role}
                        </p>
                        <div className="mt-1">
                          <span
                            className={`inline-block rounded-md bg-gradient-to-r px-2 py-0.5 text-xs ${member.color} text-white`}
                          >
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
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    expandedMobile === member.id
                      ? "max-h-[800px] opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-4 pb-5">
                    <div className="my-2 border-t border-border pt-3">
                      <p className="mb-3 text-sm text-muted-foreground">
                        {member.bio}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {member.bio2}
                      </p>
                    </div>

                    {/* Accomplishments */}
                    <div className="mt-5">
                      <h4 className="mb-2 text-sm font-medium text-foreground">
                        Key Accomplishments
                      </h4>
                      <div className="space-y-2">
                        {member.accomplishments.map((item, i) => (
                          <div key={i} className="flex items-start">
                            <Sparkles
                              className={`h-4 w-4 ${member.iconColor} mr-2 mt-0.5 flex-shrink-0`}
                            />
                            <span className="text-xs">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Expertise tags */}
                    <div className="mt-4">
                      <h4 className="mb-2 text-sm font-medium text-foreground">
                        Expertise
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {member.skills.map((skill, i) => (
                          <span
                            key={i}
                            className={`inline-flex items-center rounded-md ${member.lightColor} px-2.5 py-0.5 text-xs ${member.textColor}`}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Contact links */}
                    <div className="mt-4 flex items-center gap-3">
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-md bg-accent/30 p-1.5 text-foreground transition-colors hover:bg-accent"
                        aria-label="LinkedIn Profile"
                      >
                        <Linkedin className="h-4 w-4" />
                      </a>
                      <a
                        href={member.email}
                        className="rounded-md bg-accent/30 p-1.5 text-foreground transition-colors hover:bg-accent"
                        aria-label="Email Contact"
                      >
                        <Mail className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Active Member Profile - Desktop */}
          <div ref={profileRef} key={activeTab} className="hidden md:block">
            {teamMembers.map(
              (member, idx) =>
                activeTab === idx && (
                  <div
                    key={member.id}
                    className="grid grid-cols-1 gap-12 lg:grid-cols-5"
                  >
                    {/* Left column: Profile Card */}
                    <div className="lg:col-span-2">
                      <div className="overflow-hidden rounded-2xl border border-border bg-card/90 shadow-sm backdrop-blur-sm">
                        {/* Header with gradient */}
                        <div
                          className={`h-2 bg-gradient-to-r ${member.color}`}
                        ></div>

                        {/* Profile image */}
                        <div className="relative aspect-[3/2] w-full overflow-hidden">
                          <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent to-background/60"></div>
                          <img
                            src={addCacheBuster(member.image)}
                            alt={member.name}
                            className="absolute inset-0 h-full w-full object-cover"
                          />
                          <div className="absolute bottom-4 left-6 z-20">
                            <span
                              className={`inline-block rounded-md bg-gradient-to-r px-3 py-1 text-sm ${member.color} text-white shadow-lg`}
                            >
                              {member.badge}
                            </span>
                          </div>
                        </div>

                        {/* Name and role */}
                        <div className="p-6 pb-4">
                          <h3 className="text-2xl font-medium text-foreground">
                            {member.name}
                          </h3>
                          <p className="text-lg text-muted-foreground">
                            {member.role}
                          </p>
                        </div>

                        {/* Contact links */}
                        <div className="flex items-center gap-3 px-6 pb-6">
                          <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-md bg-accent/30 p-2.5 text-foreground transition-colors hover:bg-accent"
                            aria-label="LinkedIn Profile"
                          >
                            <Linkedin className="h-5 w-5" />
                          </a>
                          <a
                            href={member.email}
                            className="rounded-md bg-accent/30 p-2.5 text-foreground transition-colors hover:bg-accent"
                            aria-label="Email Contact"
                          >
                            <Mail className="h-5 w-5" />
                          </a>
                        </div>

                        {/* Accomplishments */}
                        <div className="border-t border-border p-6">
                          <h4 className="mb-4 flex items-center text-lg font-medium text-foreground">
                            <Award className="mr-2 h-5 w-5 text-primary" />
                            Key Accomplishments
                          </h4>
                          <div className="space-y-3">
                            {member.accomplishments.map((item, i) => (
                              <div key={i} className="flex items-start">
                                <Sparkles
                                  className={`h-5 w-5 ${member.iconColor} mr-2 mt-0.5 flex-shrink-0`}
                                />
                                <span className="text-sm">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right column: Bio and skills */}
                    <div className="lg:col-span-3">
                      <div className="rounded-2xl border border-border/50 bg-card/60 p-8 shadow-sm backdrop-blur-sm">
                        <h4 className="mb-4 flex items-center text-2xl font-medium text-foreground">
                          <Briefcase className="mr-2 h-6 w-6 text-primary" />
                          Experience & Expertise
                        </h4>

                        <div className="prose prose-lg dark:prose-invert mb-8">
                          <p className="mb-4 text-muted-foreground">
                            {member.bio}
                          </p>
                          <p className="text-muted-foreground">{member.bio2}</p>
                        </div>

                        <div className="mt-8">
                          <h4 className="mb-4 text-xl font-medium text-foreground">
                            Areas of Expertise
                          </h4>
                          <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
                            {member.skills.map((skill, i) => (
                              <div
                                key={i}
                                className={`rounded-lg border border-border bg-card/80 p-3 text-center transition-colors hover:bg-accent/10`}
                              >
                                <span className="text-sm">{skill}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="mt-8 flex justify-end">
                          <a
                            href="/contact"
                            className="inline-flex items-center rounded-md bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
                          >
                            Work with {member.name.split(" ")[0]}
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                )
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeamSection
