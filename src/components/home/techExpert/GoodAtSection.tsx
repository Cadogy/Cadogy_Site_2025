import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Brain, Check, ChevronDown, Code, Server, Shield } from "lucide-react"

const GoodAtSection = () => {
  // State for mobile accordions
  const [openCard, setOpenCard] = useState<number | null>(null)

  // Toggle accordion function
  const toggleCard = (index: number) => {
    setOpenCard(openCard === index ? null : index)
  }

  return (
    <div className="my-24 lg:my-48">
      <div className="py-24 text-center">
        <h2 className="mb-4 text-5xl font-medium tracking-tight text-foreground">
          What We&apos;re Good At
        </h2>
        <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground md:mx-auto lg:text-lg">
          We geek out on cutting-edge tech – from modern frameworks to
          infrastructure tweaks and AI tinkering – all to build stuff that works
        </p>
      </div>

      {/* Mobile-Only Accordion Cards */}
      <div className="block space-y-3 md:hidden">
        {/* Frontend Card - Mobile */}
        <div className="rounded-lg border-border bg-card p-4 px-0">
          <button
            onClick={() => toggleCard(0)}
            className="flex w-full items-center justify-between"
          >
            <div className="flex items-center">
              <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 p-2.5">
                <Code className="h-5 w-5 text-white" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-medium text-foreground">
                Modern Frontend
              </h3>
            </div>
            <motion.div
              animate={{ rotate: openCard === 0 ? 180 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <ChevronDown className="h-5 w-5 text-muted-foreground" />
            </motion.div>
          </button>

          <AnimatePresence initial={false}>
            {openCard === 0 && (
              <motion.div
                initial={{ height: 0, opacity: 0, marginTop: 0 }}
                animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="border-t border-border pt-3">
                  <p className="mb-4 text-muted-foreground">
                    We craft interfaces people actually enjoy using, with React,
                    Next.js, and TypeScript under the hood, plus TailwindCSS and
                    Radix UI for that extra polish.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="mr-2 mt-1 h-4 w-4 text-green-500" />
                      <span className="text-sm text-muted-foreground">
                        Server and client components
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Check className="mr-2 mt-1 h-4 w-4 text-green-500" />
                      <span className="text-sm text-muted-foreground">
                        Type-safe development
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Check className="mr-2 mt-1 h-4 w-4 text-green-500" />
                      <span className="text-sm text-muted-foreground">
                        Responsive design systems
                      </span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Backend Card - Mobile */}
        <div className="rounded-lg border-border bg-card p-4 px-0">
          <button
            onClick={() => toggleCard(1)}
            className="flex w-full items-center justify-between"
          >
            <div className="flex items-center">
              <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 p-2.5">
                <Server className="h-5 w-5 text-white" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-medium text-foreground">
                Robust Backend
              </h3>
            </div>
            <motion.div
              animate={{ rotate: openCard === 1 ? 180 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <ChevronDown className="h-5 w-5 text-muted-foreground" />
            </motion.div>
          </button>

          <AnimatePresence initial={false}>
            {openCard === 1 && (
              <motion.div
                initial={{ height: 0, opacity: 0, marginTop: 0 }}
                animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="border-t border-border pt-3">
                  <p className="mb-4 text-muted-foreground">
                    We build the behind-the-scenes magic with Node.js, Express,
                    and database wizardry via MongoDB and MariaDB that keeps
                    everything running smoothly.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="mr-2 mt-1 h-4 w-4 text-green-500" />
                      <span className="text-sm text-muted-foreground">
                        RESTful API design
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Check className="mr-2 mt-1 h-4 w-4 text-green-500" />
                      <span className="text-sm text-muted-foreground">
                        Advanced data modeling
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Check className="mr-2 mt-1 h-4 w-4 text-green-500" />
                      <span className="text-sm text-muted-foreground">
                        Real-time data processing
                      </span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Security Card - Mobile */}
        <div className="rounded-lg border-border bg-card p-4 px-0">
          <button
            onClick={() => toggleCard(2)}
            className="flex w-full items-center justify-between"
          >
            <div className="flex items-center">
              <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-violet-600 p-2.5">
                <Shield className="h-5 w-5 text-white" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-medium text-foreground">
                Security Expertise
              </h3>
            </div>
            <motion.div
              animate={{ rotate: openCard === 2 ? 180 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <ChevronDown className="h-5 w-5 text-muted-foreground" />
            </motion.div>
          </button>

          <AnimatePresence initial={false}>
            {openCard === 2 && (
              <motion.div
                initial={{ height: 0, opacity: 0, marginTop: 0 }}
                animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="border-t border-border pt-3">
                  <p className="mb-4 text-muted-foreground">
                    We take security seriously (but not ourselves). From
                    encryption to DNS protection and access control, we keep the
                    bad guys out and your data safe.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="mr-2 mt-1 h-4 w-4 text-green-500" />
                      <span className="text-sm text-muted-foreground">
                        DDoS mitigation
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Check className="mr-2 mt-1 h-4 w-4 text-green-500" />
                      <span className="text-sm text-muted-foreground">
                        Anti-piracy solutions
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Check className="mr-2 mt-1 h-4 w-4 text-green-500" />
                      <span className="text-sm text-muted-foreground">
                        Zero-trust architecture
                      </span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* AI/ML Card - Mobile */}
        <div className="rounded-lg border-border bg-card p-4 px-0">
          <button
            onClick={() => toggleCard(3)}
            className="flex w-full items-center justify-between"
          >
            <div className="flex items-center">
              <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-amber-600 p-2.5">
                <Brain className="h-5 w-5 text-white" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-medium text-foreground">
                AI & Machine Learning
              </h3>
            </div>
            <motion.div
              animate={{ rotate: openCard === 3 ? 180 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <ChevronDown className="h-5 w-5 text-muted-foreground" />
            </motion.div>
          </button>

          <AnimatePresence initial={false}>
            {openCard === 3 && (
              <motion.div
                initial={{ height: 0, opacity: 0, marginTop: 0 }}
                animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="border-t border-border pt-3">
                  <p className="mb-4 text-muted-foreground">
                    We teach computers to see, talk, and predict cool stuff
                    using Python, JavaScript, and a bunch of fancy AI tools (but
                    we promise not to create Skynet).
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="mr-2 mt-1 h-4 w-4 text-green-500" />
                      <span className="text-sm text-muted-foreground">
                        Custom model training
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Check className="mr-2 mt-1 h-4 w-4 text-green-500" />
                      <span className="text-sm text-muted-foreground">
                        Computer vision systems
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Check className="mr-2 mt-1 h-4 w-4 text-green-500" />
                      <span className="text-sm text-muted-foreground">
                        Multi-modal AI development
                      </span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Desktop Cards - Hide on Mobile */}
      <div className="hidden grid-cols-2 gap-8 md:grid lg:grid-cols-4">
        {/* Original Expertise Cards for Desktop */}
        {/* Expertise Card 1 - Frontend */}
        <motion.div
          className="rounded-lg border-border bg-card p-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 p-3">
            <Code className="h-6 w-6 text-white" strokeWidth={1.5} />
          </div>
          <h3 className="mb-3 text-xl font-medium text-foreground">
            Modern Frontend
          </h3>
          <p className="mb-4 text-muted-foreground">
            We craft interfaces people actually enjoy using, with React,
            Next.js, and TypeScript under the hood, plus TailwindCSS and Radix
            UI for that extra polish.
          </p>
          <ul className="space-y-2">
            <li className="flex items-start">
              <Check className="mr-2 mt-1 h-4 w-4 text-green-500" />
              <span className="text-sm text-muted-foreground">
                Server and client components
              </span>
            </li>
            <li className="flex items-start">
              <Check className="mr-2 mt-1 h-4 w-4 text-green-500" />
              <span className="text-sm text-muted-foreground">
                Type-safe development
              </span>
            </li>
            <li className="flex items-start">
              <Check className="mr-2 mt-1 h-4 w-4 text-green-500" />
              <span className="text-sm text-muted-foreground">
                Responsive design systems
              </span>
            </li>
          </ul>
        </motion.div>

        {/* Expertise Card 2 - Backend */}
        <motion.div
          className="rounded-lg border-border bg-card p-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 p-3">
            <Server className="h-6 w-6 text-white" strokeWidth={1.5} />
          </div>
          <h3 className="mb-3 text-xl font-medium text-foreground">
            Robust Backend
          </h3>
          <p className="mb-4 text-muted-foreground">
            We build the behind-the-scenes magic with Node.js, Express, and
            database wizardry via MongoDB and MariaDB that keeps everything
            running smoothly.
          </p>
          <ul className="space-y-2">
            <li className="flex items-start">
              <Check className="mr-2 mt-1 h-4 w-4 text-green-500" />
              <span className="text-sm text-muted-foreground">
                RESTful API design
              </span>
            </li>
            <li className="flex items-start">
              <Check className="mr-2 mt-1 h-4 w-4 text-green-500" />
              <span className="text-sm text-muted-foreground">
                Advanced data modeling
              </span>
            </li>
            <li className="flex items-start">
              <Check className="mr-2 mt-1 h-4 w-4 text-green-500" />
              <span className="text-sm text-muted-foreground">
                Real-time data processing
              </span>
            </li>
          </ul>
        </motion.div>

        {/* Expertise Card 3 - Security */}
        <motion.div
          className="rounded-lg border-border bg-card p-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-violet-600 p-3">
            <Shield className="h-6 w-6 text-white" strokeWidth={1.5} />
          </div>
          <h3 className="mb-3 text-xl font-medium text-foreground">
            Security Expertise
          </h3>
          <p className="mb-4 text-muted-foreground">
            We take security seriously (but not ourselves). From encryption to
            DNS protection and access control, we keep the bad guys out and your
            data safe.
          </p>
          <ul className="space-y-2">
            <li className="flex items-start">
              <Check className="mr-2 mt-1 h-4 w-4 text-green-500" />
              <span className="text-sm text-muted-foreground">
                DDoS mitigation
              </span>
            </li>
            <li className="flex items-start">
              <Check className="mr-2 mt-1 h-4 w-4 text-green-500" />
              <span className="text-sm text-muted-foreground">
                Anti-piracy solutions
              </span>
            </li>
            <li className="flex items-start">
              <Check className="mr-2 mt-1 h-4 w-4 text-green-500" />
              <span className="text-sm text-muted-foreground">
                Zero-trust architecture
              </span>
            </li>
          </ul>
        </motion.div>

        {/* Expertise Card 4 - AI/ML */}
        <motion.div
          className="rounded-lg border-border bg-card p-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-amber-600 p-3">
            <Brain className="h-6 w-6 text-white" strokeWidth={1.5} />
          </div>
          <h3 className="mb-3 text-xl font-medium text-foreground">
            AI & Machine Learning
          </h3>
          <p className="mb-4 text-muted-foreground">
            We teach computers to see, talk, and predict cool stuff using
            Python, JavaScript, and a bunch of fancy AI tools (but we promise
            not to create Skynet).
          </p>
          <ul className="space-y-2">
            <li className="flex items-start">
              <Check className="mr-2 mt-1 h-4 w-4 text-green-500" />
              <span className="text-sm text-muted-foreground">
                Custom model training
              </span>
            </li>
            <li className="flex items-start">
              <Check className="mr-2 mt-1 h-4 w-4 text-green-500" />
              <span className="text-sm text-muted-foreground">
                Computer vision systems
              </span>
            </li>
            <li className="flex items-start">
              <Check className="mr-2 mt-1 h-4 w-4 text-green-500" />
              <span className="text-sm text-muted-foreground">
                Multi-modal AI development
              </span>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  )
}

export default GoodAtSection
