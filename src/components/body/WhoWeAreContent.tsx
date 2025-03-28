"use client"

// Ensure this is a client component
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Brain, Code, Globe, Lock, Server, Shield, Zap } from "lucide-react"

import { Button } from "@/components/ui/button"

const technologies = [
  {
    name: "NextJS",
    logo: "/images/assets/stack-logos/nextjs-icon.svg",
    category: "frontend"
  },
  {
    name: "JavaScript",
    logo: "/images/assets/stack-logos/javascript-icon.svg",
    category: "language"
  },
  { 
    name: "NodeJS", 
    logo: "/images/assets/stack-logos/nodejs-icon.svg",
    category: "backend"
  },
  { 
    name: "ReactJS", 
    logo: "/images/assets/stack-logos/react-icon.svg",
    category: "frontend"
  },
  { 
    name: "ExpressJS", 
    logo: "/images/assets/stack-logos/expressjs-icon.svg",
    category: "backend"
  },
  { 
    name: "MongoDB", 
    logo: "/images/assets/stack-logos/mongodb-icon.svg",
    category: "database"
  },
  { 
    name: "MariaDB", 
    logo: "/images/assets/stack-logos/mariadb-icon.svg",
    category: "database"
  },
  {
    name: "TailwindCSS",
    logo: "/images/assets/stack-logos/tailwindcss-icon.svg",
    category: "frontend"
  },
  {
    name: "Google Cloud",
    logo: "/images/assets/stack-logos/googlecloud-icon.svg",
    category: "infrastructure"
  },
  { 
    name: "Git", 
    logo: "/images/assets/stack-logos/git-icon.svg",
    category: "tools"
  },
  {
    name: "Cloudflare",
    logo: "/images/assets/stack-logos/cloudflare-icon.svg",
    category: "infrastructure"
  },
  { 
    name: "AWS", 
    logo: "/images/assets/stack-logos/aws-icon.svg",
    category: "infrastructure"
  },
]

// Tech item component for the grid display
const TechItem = ({ tech, index }: { tech: typeof technologies[0], index: number }) => {
  // Map index to specific gradient classes
  const getGradientClass = () => {
    switch (tech.category) {
      case "frontend": return "bg-gradient-to-r from-blue-50 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-800/30";
      case "backend": return "bg-gradient-to-r from-green-50 to-emerald-100 dark:from-green-900/30 dark:to-emerald-800/30";
      case "database": return "bg-gradient-to-r from-purple-50 to-pink-100 dark:from-purple-900/30 dark:to-pink-800/30";
      case "infrastructure": return "bg-gradient-to-r from-orange-50 to-amber-100 dark:from-orange-900/30 dark:to-amber-800/30";
      case "language": return "bg-gradient-to-r from-sky-50 to-blue-100 dark:from-sky-900/30 dark:to-blue-800/30";
      case "tools": return "bg-gradient-to-r from-rose-50 to-red-100 dark:from-rose-900/30 dark:to-red-800/30";
      default: return "bg-gradient-to-r from-blue-50 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-800/30";
    }
  };
  
  return (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
      className={`group relative flex flex-col items-center justify-center overflow-hidden rounded-lg ${getGradientClass()} p-4 text-center transition-all duration-300 hover:shadow-md dark:border-neutral-800 dark:hover:border-neutral-700`}
    >
      <div className="relative z-10 flex flex-col items-center">
        <img src={tech.logo} alt={tech.name} className="mb-3 h-12 w-12 dark:invert-[0.85] transition-all" />
        <span className="text-sm text-muted-foreground">{tech.name}</span>
      </div>
    </motion.div>
  )
}

// Timeline event component for the journey section
const TimelineEvent = ({ 
  year, 
  title, 
  description,
  icon,
  index
}: {
  year: string, 
  title: string, 
  description: string,
  icon: React.ReactNode,
  index: number
}) => {
  return (
    <motion.div 
      className="relative flex gap-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Timeline line */}
      <div className="flex flex-col items-center">
        <div className={`flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 z-10`}>
          {icon}
        </div>
        {index !== 3 && <div className="h-full w-0.5 bg-border" />}
      </div>
      
      {/* Content */}
      <div className="pb-8">
        <span className="text-sm font-semibold text-primary">{year}</span>
        <h3 className="mt-1 text-lg font-medium text-foreground">{title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      </div>
    </motion.div>
  );
};

const WhoWeAreContent = () => {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/5 bg-[size:100px_100px] opacity-25" />
        <div className="absolute top-0 right-0 -mt-96 -mr-96 opacity-50">
          <div className="aspect-square h-[800px] rounded-full bg-primary/30 blur-[200px]" />
        </div>
        <div className="absolute bottom-0 left-0 -mb-96 -ml-96 opacity-50">
          <div className="aspect-square h-[800px] rounded-full bg-blue-500/30 blur-[200px]" />
        </div>

        <div className="relative mx-auto max-w-[94%] px-4 pt-16 pb-16 sm:px-6 md:max-w-[90%] lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="font-bold tracking-tight text-foreground text-5xl lg:text-6xl">
              <span className="block">Transforming ideas into</span>
              <span className="py-2 block bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
                digital solutions
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              We&apos;re a dedicated team driven by innovation, technical excellence, and a passion for creating impactful digital experiences.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="bg-background">
        <div className="mx-auto max-w-[94%] px-4 pt-16 pb-16 sm:px-6 md:max-w-[90%] md:py-24 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
            Our Mission
          </h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
                We see ourselves not just as a business, but as passionate individuals on a shared journey of growth, learning, and transformation. Our mission is to empower creators, businesses, and innovators with tools that not only solve problems but spark change.
              </p>
            </div>
            
            <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
              <motion.div
                className="rounded-xl bg-card border border-border p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="mb-4 h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 p-3 flex items-center justify-center">
                  <Code className="h-6 w-6 text-white" strokeWidth={1.5} />
                </div>
                <h3 className="mb-3 text-xl font-medium text-foreground">Technical Innovation</h3>
                <p className="text-muted-foreground">
                  We&apos;re committed to staying at the forefront of technology, continuously learning and pushing boundaries to create solutions that matter.
                </p>
              </motion.div>
              
              <motion.div
                className="rounded-xl bg-card border border-border p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="mb-4 h-12 w-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 p-3 flex items-center justify-center">
                  <Globe className="h-6 w-6 text-white" strokeWidth={1.5} />
                </div>
                <h3 className="mb-3 text-xl font-medium text-foreground">Global Impact</h3>
                <p className="text-muted-foreground">
                  Every solution we develop is designed to make a meaningful difference in how businesses operate and people connect in our digital world.
                </p>
              </motion.div>
              
              <motion.div
                className="rounded-xl bg-card border border-border p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="mb-4 h-12 w-12 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 p-3 flex items-center justify-center">
                  <Shield className="h-6 w-6 text-white" strokeWidth={1.5} />
                </div>
                <h3 className="mb-3 text-xl font-medium text-foreground">Ethical Standards</h3>
                <p className="text-muted-foreground">
                  We uphold the highest ethical standards in cybersecurity and digital rights management, ensuring our solutions protect and empower.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Journey Section */}
      <section className="bg-neutral-900/30 border-border">
        <div className="mx-auto max-w-[94%] px-4 pt-16 pb-16 sm:px-6 md:max-w-[90%] md:py-24 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl text-center"
          >
            <h2 className="text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
              Our Journey
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Every challenge we&apos;ve tackled together has shaped who we are and what we aim to achieve.
            </p>
          </motion.div>

          <div className="mt-16 max-w-3xl mx-auto">
            <TimelineEvent 
              year="2019"
              title="Getting Started"
              description="Founded with a focus on innovative web development and security solutions, addressing real-world problems with technical expertise."
              icon={<Zap className="h-5 w-5 text-primary" />}
              index={0}
            />
            
            <TimelineEvent 
              year="2020"
              title="Security Evolution"
              description="Developed advanced anti-piracy systems and DNS security solutions, protecting digital content creators and businesses."
              icon={<Lock className="h-5 w-5 text-primary" />}
              index={1}
            />
            
            <TimelineEvent 
              year="2022"
              title="Platform Expansion"
              description="Expanded our service offerings to include full-stack development, cloud infrastructure, and enterprise-grade solutions."
              icon={<Server className="h-5 w-5 text-primary" />}
              index={2}
            />
            
            <TimelineEvent 
              year="2023 - Now"
              title="AI Integration & Future"
              description="Pioneering the integration of AI technologies and developing our API platform to empower the next generation of digital solutions."
              icon={<Brain className="h-5 w-5 text-primary" />}
              index={3}
            />
          </div>
        </div>
      </section>

        {/* Team Members Section */}
      <section className="bg-background">
        <div className="mx-auto max-w-[94%] px-4 pt-16 pb-16 sm:px-6 md:max-w-[90%] md:py-24 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
              Leadership Team
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Bringing together decades of combined experience in technology, security, and digital strategy
            </p>
          </motion.div>

          <div className="mt-16 space-y-16">
            {/* Charles Knapp Card */}
            <motion.div 
              className="overflow-hidden rounded-xl bg-card border border-border"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3">
                <div className="md:col-span-1 bg-gradient-to-br from-blue-900/30 to-indigo-900/30 p-6 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-56 h-56 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                  <div className="absolute bottom-0 left-0 w-56 h-56 bg-indigo-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
                  
                  <div className="relative z-10">
                    <div className="h-56 w-56 overflow-hidden rounded-lg shadow-lg">
                  <img
                    src="/images/authors/charles_k_author.jpg"
                    alt="Charles Knapp"
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                    </div>
                    <div className="mt-4 text-center">
                      <h3 className="text-xl font-medium text-white">Charles Knapp</h3>
                      <p className="text-sm text-white/70">Chief Technology Officer</p>
                    </div>
                  </div>
                </div>
                
                <div className="md:col-span-2 p-6 md:p-8">
                  <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-4">
                    Co-Founder
              </div>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      Charles Knapp is a distinguished expert in cybersecurity and digital infrastructure with a proven track record of delivering enterprise-grade solutions. His methodical approach to system architecture and security implementation has helped numerous organizations establish robust digital frameworks that withstand modern cybersecurity challenges.
                    </p>
                    <p className="text-muted-foreground">
                      As CTO, Charles leads our technical strategy and implementation, specializing in deploying advanced DNS security protocols and developing proprietary anti-piracy technologies. His architectural expertise spans cloud infrastructure optimization, high-availability systems, and secure application development using the MERN stack ecosystem.
                    </p>
                    
                    <div className="pt-4 grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-foreground mb-2">Core Expertise</h4>
                        <div className="flex flex-wrap gap-2">
                          <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">Enterprise Security</span>
                          <span className="rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400">Infrastructure Design</span>
                          <span className="rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">DDoS Protection</span>
                          <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">System Architecture</span>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-foreground mb-2">Technical Leadership</h4>
                        <div className="flex flex-wrap gap-2">
                          <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">Application Security</span>
                          <span className="rounded-full bg-teal-100 px-2.5 py-0.5 text-xs font-medium text-teal-800 dark:bg-teal-900/30 dark:text-teal-400">Cloud Infrastructure</span>
                          <span className="rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">IP Protection</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Dylan Safra Card */}
            <motion.div 
              className="overflow-hidden rounded-xl bg-card border border-border"
              initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
              <div className="grid grid-cols-1 md:grid-cols-3">
                <div className="md:col-span-1 bg-gradient-to-br from-green-900/30 to-emerald-900/30 p-6 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-56 h-56 bg-green-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                  <div className="absolute bottom-0 left-0 w-56 h-56 bg-emerald-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
                  
                  <div className="relative z-10">
                    <div className="h-56 w-56 overflow-hidden rounded-lg shadow-lg">
                  <img
                    src="/images/authors/dylan_s_author.jpg"
                    alt="Dylan Safra"
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                    </div>
                    <div className="mt-4 text-center">
                      <h3 className="text-xl font-medium text-white">Dylan Safra</h3>
                      <p className="text-sm text-white/70">Chief Strategy Officer</p>
                    </div>
                  </div>
                </div>
                
                <div className="md:col-span-2 p-6 md:p-8">
                  <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-4">
                    Co-Founder
              </div>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      Dylan Safra is an accomplished digital strategist with extensive experience in data-driven business transformation and growth optimization. Combining technical proficiency with strategic vision, he has successfully led numerous enterprise clients through digital transformations that deliver measurable business outcomes and competitive advantages.
                    </p>
                    <p className="text-muted-foreground">
                      As CSO, Dylan directs our product strategy and client solutions, leveraging his expertise in SEO optimization, automation systems, and performance analytics. His integrated approach to technology deployment ensures our solutions not only meet technical requirements but drive tangible business value through enhanced user experiences and operational efficiencies.
                    </p>
                    
                    <div className="pt-4 grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-foreground mb-2">Core Expertise</h4>
                        <div className="flex flex-wrap gap-2">
                          <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">Digital Strategy</span>
                          <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">Search Optimization</span>
                          <span className="rounded-full bg-rose-100 px-2.5 py-0.5 text-xs font-medium text-rose-800 dark:bg-rose-900/30 dark:text-rose-400">Process Automation</span>
                          <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">Growth Engineering</span>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-foreground mb-2">Strategic Leadership</h4>
                        <div className="flex flex-wrap gap-2">
                          <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">Data Analysis</span>
                          <span className="rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">Market Positioning</span>
                          <span className="rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">Client Solutions</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            </div>
        </div>
      </section>

        {/* Tech Stack Section */}
      <section className="bg-neutral-900/30 border-border">
        <div className="mx-auto max-w-[94%] px-4 pt-16 pb-16 sm:px-6 md:max-w-[90%] md:py-24 lg:px-8">
          <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="text-center"
        >
            <h2 className="text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
              Our Tech Stack
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              We&apos;re proficient in a broad range of technologies, especially the MERN stack and modern frontend frameworks, ensuring flexibility and depth in the solutions we deliver.
            </p>
          </motion.div>

          <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {technologies.map((tech, index) => (
              <TechItem key={index} tech={tech} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-background">
        <div className="mx-auto max-w-[94%] px-4 pt-16 pb-16 sm:px-6 md:max-w-[90%] md:py-24 lg:px-8">
            <motion.div
            className="rounded-xl border-border overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="p-8 md:p-12 lg:p-16 text-center">
              <h2 className="text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
                Ready to work with us?
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
                Let&apos;s transform your ideas into powerful digital solutions. Get in touch with our team today.
              </p>
              <div className="mt-10 flex-col md:flex-row flex justify-center gap-4">
                <Link
                  href="/contact"
                  className="group inline-flex items-center space-x-2 rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90"
                >
                  <span>Contact Us</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/services"
                  className="group inline-flex items-center rounded-md bg-card border border-border px-6 py-3 text-sm font-medium text-foreground transition-all hover:bg-muted"
                >
                  <span>Explore Our Services</span>
                </Link>
              </div>
                  </div>
            </motion.div>
          </div>
      </section>
      </div>
  )
}

export default WhoWeAreContent
