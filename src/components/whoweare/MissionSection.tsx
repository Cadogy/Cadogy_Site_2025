"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { CheckCircle2, ChevronDown, Code, Globe, Shield } from "lucide-react"

const MissionSection = () => {
  // State to track which accordion item is open on mobile
  const [activeTab, setActiveTab] = useState<number>(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const valuesRefs = useRef<Array<HTMLDivElement | null>>([])
  const quoteRef = useRef<HTMLDivElement>(null)

  const toggleTab = (index: number) => {
    setActiveTab(activeTab === index ? -1 : index)
  }

  // GSAP animations - simplified
  useEffect(() => {
    if (!sectionRef.current) return

    // Simple animation timeline
    const tl = gsap.timeline({
      defaults: { ease: "power2.out" },
    })

    // Animate section heading
    tl.fromTo(
      ".section-title",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8 }
    )

    tl.fromTo(
      ".section-description",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8 },
      "-=0.6"
    )

    // Animate mission values (desktop)
    valuesRefs.current.forEach((el, index) => {
      if (!el) return

      gsap.fromTo(
        el,
        { opacity: 0, x: index % 2 === 0 ? -30 : 30, y: 20 },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.8,
          delay: 0.3 + 0.1 * index,
        }
      )
    })

    // Animate quote
    if (quoteRef.current) {
      const spans = quoteRef.current.querySelectorAll("span")

      gsap.fromTo(
        spans,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.02,
          delay: 0.6,
        }
      )
    }

    // Animate mobile accordion items
    gsap.fromTo(
      ".accordion-item",
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        delay: 0.2,
      }
    )
  }, [])

  const missionItems = [
    {
      id: 0,
      icon: (
        <Code
          className="h-6 w-6 text-white sm:h-8 sm:w-8 md:h-10 md:w-10"
          strokeWidth={1.5}
        />
      ),
      title: "Technical Innovation",
      description:
        "We're committed to staying at the forefront of technology, continuously learning and pushing boundaries to create solutions that matter. Our developers and engineers constantly explore new approaches to solve complex problems.",
      color: "from-blue-500 to-indigo-600",
      glow: "bg-blue-500/20",
      points: [
        "Modern tech stack implementation",
        "Continuous learning approach",
        "Problem-solving innovation",
      ],
      tags: [
        {
          text: "Modern Tech",
          bgColor: "bg-blue-50",
          textColor: "text-blue-700",
          darkBgColor: "dark:bg-blue-900/20",
          darkTextColor: "dark:text-blue-300",
        },
        {
          text: "Innovation",
          bgColor: "bg-indigo-50",
          textColor: "text-indigo-700",
          darkBgColor: "dark:bg-indigo-900/20",
          darkTextColor: "dark:text-indigo-300",
        },
      ],
    },
    {
      id: 1,
      icon: (
        <Globe
          className="h-6 w-6 text-white sm:h-8 sm:w-8 md:h-10 md:w-10"
          strokeWidth={1.5}
        />
      ),
      title: "Global Impact",
      description:
        "Every solution we develop is designed to make a meaningful difference in how businesses operate and people connect in our digital world. We build with global accessibility and real-world impact in mind.",
      color: "from-purple-500 to-pink-600",
      glow: "bg-purple-500/20",
      points: [
        "Digital solutions with real-world impact",
        "Global accessibility standards",
        "Meaningful business transformation",
      ],
      tags: [
        {
          text: "Connectivity",
          bgColor: "bg-purple-50",
          textColor: "text-purple-700",
          darkBgColor: "dark:bg-purple-900/20",
          darkTextColor: "dark:text-purple-300",
        },
        {
          text: "Global Reach",
          bgColor: "bg-pink-50",
          textColor: "text-pink-700",
          darkBgColor: "dark:bg-pink-900/20",
          darkTextColor: "dark:text-pink-300",
        },
      ],
    },
    {
      id: 2,
      icon: (
        <Shield
          className="h-6 w-6 text-white sm:h-8 sm:w-8 md:h-10 md:w-10"
          strokeWidth={1.5}
        />
      ),
      title: "Ethical Standards",
      description:
        "We uphold the highest ethical standards in cybersecurity and digital rights management, ensuring our solutions protect and empower. Trust and security remain at the core of everything we create.",
      color: "from-green-500 to-emerald-600",
      glow: "bg-green-500/20",
      points: [
        "Industry-leading security protocols",
        "Digital rights management",
        "Client trust and data protection",
      ],
      tags: [
        {
          text: "Security",
          bgColor: "bg-green-50",
          textColor: "text-green-700",
          darkBgColor: "dark:bg-green-900/20",
          darkTextColor: "dark:text-green-300",
        },
        {
          text: "Integrity",
          bgColor: "bg-emerald-50",
          textColor: "text-emerald-700",
          darkBgColor: "dark:bg-emerald-900/20",
          darkTextColor: "dark:text-emerald-300",
        },
      ],
    },
  ]

  // Function to split text for GSAP animation
  const splitTextIntoSpans = (text: string) => {
    return text.split(" ").map((word, index) => (
      <span key={index} className="inline-block">
        {word}&nbsp;
      </span>
    ))
  }

  return (
    <div
      ref={sectionRef}
      className="relative overflow-hidden bg-background py-16 md:py-24"
    >
      {/* Background elements */}
      <div className="bg-grid-white/[0.02] absolute right-0 top-0 h-1/2 w-1/2 -translate-y-1/4 rounded-full bg-[size:20px_20px] opacity-70 blur-[1px]"></div>
      <div className="pointer-events-none absolute right-0 top-1/3 -mr-20 h-1/3 w-1/3 rounded-full bg-blue-500/5 blur-[100px]"></div>
      <div className="pointer-events-none absolute bottom-0 left-0 -mb-20 -ml-20 h-1/3 w-1/3 rounded-full bg-purple-500/5 blur-[100px]"></div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto mb-16 max-w-2xl text-center md:mb-20">
          <div className="mb-4 inline-flex items-center justify-center rounded-md bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            Our Purpose
          </div>
          <h2 className="section-title text-3xl font-medium tracking-tight text-foreground md:text-4xl lg:text-5xl">
            Our Mission & Values
          </h2>
          <p className="section-description mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            We see ourselves not just as a business, but as passionate
            individuals on a shared journey of growth, learning, and digital
            transformation.
          </p>
        </div>

        {/* Mobile accordion view */}
        <div className="mb-12 md:hidden">
          {missionItems.map((item, index) => (
            <div
              key={item.id}
              className="accordion-item mb-4 overflow-hidden rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm"
            >
              <button
                onClick={() => toggleTab(index)}
                className="flex w-full items-center justify-between p-5 text-left"
                aria-expanded={activeTab === index}
              >
                <div className="flex items-center">
                  <div
                    className={`mr-4 h-12 w-12 rounded-xl bg-gradient-to-br ${item.color} flex flex-shrink-0 items-center justify-center shadow-lg`}
                  >
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-medium text-foreground">
                    {item.title}
                  </h3>
                </div>
                <ChevronDown
                  className={`h-5 w-5 text-muted-foreground transition-transform duration-300 ${activeTab === index ? "rotate-180 transform" : ""}`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${activeTab === index ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"}`}
              >
                <div className="border-t border-border/30 p-5">
                  <p className="mb-4 text-muted-foreground">
                    {item.description}
                  </p>

                  <div className="mb-4 space-y-2">
                    {item.points.map((point, i) => (
                      <div key={i} className="flex items-start">
                        <CheckCircle2 className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                        <span className="text-sm">{point}</span>
                      </div>
                    ))}
                  </div>

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
              </div>
            </div>
          ))}
        </div>

        {/* Desktop view */}
        <div className="hidden space-y-16 md:block">
          {/* Technical Innovation */}
          <div
            ref={(el) => {
              valuesRefs.current[0] = el
            }}
            className="relative"
          >
            <div className="flex items-stretch">
              <div className="flex flex-shrink-0 justify-end pr-8 md:w-1/3">
                <div className="group relative">
                  <div className="absolute -inset-2 transform rounded-xl bg-blue-500/10 opacity-70 blur-lg transition-all duration-500 group-hover:opacity-100 group-hover:blur-xl"></div>
                  <div className="relative flex h-24 w-24 transform items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg transition-transform duration-300 group-hover:scale-105">
                    <Code className="h-10 w-10 text-white" strokeWidth={1.5} />
                  </div>
                </div>
              </div>

              <div className="w-2/3">
                <div className="rounded-2xl border border-border/40 bg-card/80 p-8 shadow-sm backdrop-blur-sm">
                  <h3 className="mb-4 text-2xl font-medium text-foreground">
                    Technical Innovation
                  </h3>
                  <p className="mb-5 text-muted-foreground">
                    We&apos;re committed to staying at the forefront of
                    technology, continuously learning and pushing boundaries to
                    create solutions that matter. Our developers and engineers
                    constantly explore new approaches to solve complex problems.
                  </p>

                  <div className="mb-5 space-y-2">
                    {missionItems[0].points.map((point, i) => (
                      <div key={i} className="flex items-start">
                        <CheckCircle2 className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0 text-blue-500" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>

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
            </div>
          </div>

          {/* Global Impact */}
          <div
            ref={(el) => {
              valuesRefs.current[1] = el
            }}
            className="relative"
          >
            <div className="flex flex-row-reverse items-stretch">
              <div className="flex flex-shrink-0 justify-start pl-8 md:w-1/3">
                <div className="group relative">
                  <div className="absolute -inset-2 transform rounded-xl bg-purple-500/10 opacity-70 blur-lg transition-all duration-500 group-hover:opacity-100 group-hover:blur-xl"></div>
                  <div className="relative flex h-24 w-24 transform items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 shadow-lg transition-transform duration-300 group-hover:scale-105">
                    <Globe className="h-10 w-10 text-white" strokeWidth={1.5} />
                  </div>
                </div>
              </div>

              <div className="w-2/3">
                <div className="rounded-2xl border border-border/40 bg-card/80 p-8 shadow-sm backdrop-blur-sm">
                  <h3 className="mb-4 text-2xl font-medium text-foreground">
                    Global Impact
                  </h3>
                  <p className="mb-5 text-muted-foreground">
                    Every solution we develop is designed to make a meaningful
                    difference in how businesses operate and people connect in
                    our digital world. We build with global accessibility and
                    real-world impact in mind.
                  </p>

                  <div className="mb-5 space-y-2">
                    {missionItems[1].points.map((point, i) => (
                      <div key={i} className="flex items-start">
                        <CheckCircle2 className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0 text-purple-500" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>

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
            </div>
          </div>

          {/* Ethical Standards */}
          <div
            ref={(el) => {
              valuesRefs.current[2] = el
            }}
            className="relative"
          >
            <div className="flex items-stretch">
              <div className="flex flex-shrink-0 justify-end pr-8 md:w-1/3">
                <div className="group relative">
                  <div className="absolute -inset-2 transform rounded-xl bg-green-500/10 opacity-70 blur-lg transition-all duration-500 group-hover:opacity-100 group-hover:blur-xl"></div>
                  <div className="relative flex h-24 w-24 transform items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg transition-transform duration-300 group-hover:scale-105">
                    <Shield
                      className="h-10 w-10 text-white"
                      strokeWidth={1.5}
                    />
                  </div>
                </div>
              </div>

              <div className="w-2/3">
                <div className="rounded-2xl border border-border/40 bg-card/80 p-8 shadow-sm backdrop-blur-sm">
                  <h3 className="mb-4 text-2xl font-medium text-foreground">
                    Ethical Standards
                  </h3>
                  <p className="mb-5 text-muted-foreground">
                    We uphold the highest ethical standards in cybersecurity and
                    digital rights management, ensuring our solutions protect
                    and empower. Trust and security remain at the core of
                    everything we create.
                  </p>

                  <div className="mb-5 space-y-2">
                    {missionItems[2].points.map((point, i) => (
                      <div key={i} className="flex items-start">
                        <CheckCircle2 className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>

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
            </div>
          </div>
        </div>

        <div className="mx-auto mt-20 max-w-3xl">
          <div className="relative rounded-2xl border border-border/40 bg-card/30 px-6 py-8 backdrop-blur-sm md:px-10">
            <div className="absolute left-3 top-3 -translate-y-1/2 transform text-6xl text-primary/10">
              &ldquo;
            </div>
            <div
              ref={quoteRef}
              className="relative z-10 text-center text-base font-light italic leading-relaxed text-foreground/90 sm:text-lg md:text-xl"
            >
              {splitTextIntoSpans(
                "Our mission is to empower creators, businesses, and innovators with tools that not only solve problems but spark meaningful change in the digital landscape."
              )}
            </div>
            <div className="absolute bottom-3 right-3 translate-y-1/2 transform text-6xl text-primary/10">
              &rdquo;
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MissionSection
