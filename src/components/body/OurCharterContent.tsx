"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { ArrowRight, Brain, Code, Globe, Lock, Server, Shield, Zap } from "lucide-react"

import { Button } from "@/components/ui/button"

const OurCharterContent = () => {
  // Add a unique key to force component re-rendering and prevent stale cache issues
  const [mountKey, setMountKey] = useState<string>("")
  
  useEffect(() => {
    // Generate a unique key on component mount
    setMountKey(`our-charter-${Date.now()}`)
  }, [])

  return (
    <div className="bg-background" key={mountKey}>
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
              <span className="block">Our guiding</span>
              <span className="py-2 block bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
                principles
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Our charter defines who we are, what we stand for, and how we aim to make a difference in the digital landscape.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Purpose & Vision Section */}
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
                Our Purpose & Vision
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
                Cadogy exists to bridge the gap between technology and human potential. We envision a world where creators, businesses, and innovators are empowered with secure, ethical technology solutions that not only solve complex problems but catalyze meaningful change.
              </p>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground leading-relaxed">
                Our vision is to be at the forefront of technological innovation, particularly in cybersecurity and digital rights protection, while maintaining an unwavering commitment to ethical practices and the advancement of human creativity.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-background border-border">
        <div className="mx-auto max-w-[94%] px-4 pt-16 pb-16 sm:px-6 md:max-w-[90%] md:py-24 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
              Our Core Values
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              These principles guide our decisions, shape our culture, and define our approach to every project we undertake.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <motion.div
              className="bg-card border border-border rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="mb-4 h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 p-3 flex items-center justify-center">
                <Code className="h-6 w-6 text-white" strokeWidth={1.5} />
              </div>
              <h3 className="mb-3 text-xl font-medium text-foreground">Innovation & Excellence</h3>
              <p className="text-muted-foreground">
                We are committed to continuous learning and pushing the boundaries of what&apos;s possible. From advanced anti-piracy systems to exploring AI and machine learning, we stay at the cutting edge of technology.
              </p>
            </motion.div>

            <motion.div
              className="bg-card border border-border rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="mb-4 h-12 w-12 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 p-3 flex items-center justify-center">
                <Shield className="h-6 w-6 text-white" strokeWidth={1.5} />
              </div>
              <h3 className="mb-3 text-xl font-medium text-foreground">Ethical Approach</h3>
              <p className="text-muted-foreground">
                We believe in using technology responsibly. Our cybersecurity expertise is guided by ethical principles that prioritize privacy, data protection, and the legitimate rights of content creators and businesses.
              </p>
            </motion.div>

            <motion.div
              className="bg-card border border-border rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="mb-4 h-12 w-12 rounded-lg bg-gradient-to-br from-purple-500 to-violet-600 p-3 flex items-center justify-center">
                <Brain className="h-6 w-6 text-white" strokeWidth={1.5} />
              </div>
              <h3 className="mb-3 text-xl font-medium text-foreground">Knowledge Empowerment</h3>
              <p className="text-muted-foreground">
                We&apos;re dedicated to sharing our expertise and empowering others. Whether through education, collaborative partnerships, or transformative solutions, we aim to elevate the capabilities of those we work with.
              </p>
            </motion.div>

            <motion.div
              className="bg-card border border-border rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="mb-4 h-12 w-12 rounded-lg bg-gradient-to-br from-orange-500 to-amber-600 p-3 flex items-center justify-center">
                <Zap className="h-6 w-6 text-white" strokeWidth={1.5} />
              </div>
              <h3 className="mb-3 text-xl font-medium text-foreground">Adaptability & Growth</h3>
              <p className="text-muted-foreground">
                We embrace change as an opportunity for growth. Our journey is one of continuous transformation, and we bring this mindset to every challenge and project we undertake.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Business Philosophy */}
      <section className="bg-background">
        <div className="mx-auto max-w-[94%] px-4 pt-16 pb-16 sm:px-6 md:max-w-[90%] md:py-24 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
                Our Business Philosophy
              </h2>
              <p className="mt-6 text-lg text-muted-foreground">
                At Cadogy, we believe technology should serve humanity, not the other way around. Our approach is built on three fundamental principles:
              </p>
              
              <div className="mt-8 space-y-6">
                <motion.div 
                  className="flex"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <span className="text-lg font-semibold">1</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-foreground">Problem-First Thinking</h3>
                    <p className="mt-2 text-muted-foreground">
                      We begin by deeply understanding the challenges our clients face before proposing technological solutions. This ensures that our work addresses real needs rather than pushing unnecessary technology.
                    </p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <span className="text-lg font-semibold">2</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-foreground">Collaborative Partnership</h3>
                    <p className="mt-2 text-muted-foreground">
                      We view our client relationships as true partnerships. Your goals become our goals, and we work alongside you every step of the way to ensure success and mutual growth.
                    </p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <span className="text-lg font-semibold">3</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-foreground">Sustainable Innovation</h3>
                    <p className="mt-2 text-muted-foreground">
                      We develop solutions that not only solve immediate problems but are built to evolve with changing needs and technologies, ensuring long-term value and adaptability.
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
            
            <motion.div
              className="relative overflow-hidden rounded-xl border-border"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-blue-500/5" />
              <div className="relative p-8">
                <h3 className="mb-6 text-2xl font-medium text-foreground">Our Commitments</h3>
                
                <div className="space-y-6">
                  <div className="rounded-lg bg-card/50 p-6">
                    <h4 className="mb-2 text-lg font-medium text-foreground">To Our Clients</h4>
                    <p className="text-muted-foreground">
                      We pledge to deliver solutions of the highest quality and integrity. We will always prioritize your security, your data privacy, and your business objectives.
                    </p>
                  </div>
                  
                  <div className="rounded-lg bg-card/50 p-6">
                    <h4 className="mb-2 text-lg font-medium text-foreground">To Content Creators</h4>
                    <p className="text-muted-foreground">
                      We&apos;re committed to protecting your intellectual property through cutting-edge anti-piracy strategies and digital rights management technologies.
                    </p>
                  </div>
                  
                  <div className="rounded-lg bg-card/50 p-6">
                    <h4 className="mb-2 text-lg font-medium text-foreground">To The Digital Community</h4>
                    <p className="text-muted-foreground">
                      We commit to contributing positively to the global digital ecosystem through ethical practices, knowledge sharing, and responsible innovation.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Strategic Direction */}
      <section className="bg-background border-border">
        <div className="mx-auto max-w-[94%] px-4 pt-16 pb-16 sm:px-6 md:max-w-[90%] md:py-24 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
              Our Strategic Direction
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Looking to the future, Cadogy is focused on several key areas that align with our expertise and the evolving needs of the digital landscape.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <motion.div
              className="bg-card border border-border rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10">
                <Shield className="h-5 w-5 text-blue-500" />
              </div>
              <h3 className="mb-3 text-xl font-medium text-foreground">Advanced Security Solutions</h3>
              <p className="text-muted-foreground">
                Continuing to innovate in DNS security, encryption methodologies, and system protection to address emerging cyber threats and protect digital assets.
              </p>
            </motion.div>

            <motion.div
              className="bg-card border border-border rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-green-500/10">
                <Code className="h-5 w-5 text-green-500" />
              </div>
              <h3 className="mb-3 text-xl font-medium text-foreground">API Development</h3>
              <p className="text-muted-foreground">
                Expanding our API ecosystem to provide developers and businesses with powerful tools for media generation, content creation, and advanced analytics.
              </p>
            </motion.div>

            <motion.div
              className="bg-card border border-border rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-purple-500/10">
                <Brain className="h-5 w-5 text-purple-500" />
              </div>
              <h3 className="mb-3 text-xl font-medium text-foreground">AI & Machine Learning</h3>
              <p className="text-muted-foreground">
                Developing specialized AI capabilities that enhance creative processes, optimize business operations, and provide intelligent insights from complex data sets.
              </p>
            </motion.div>

            <motion.div
              className="bg-card border border-border rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-orange-500/10">
                <Lock className="h-5 w-5 text-orange-500" />
              </div>
              <h3 className="mb-3 text-xl font-medium text-foreground">Digital Rights Management</h3>
              <p className="text-muted-foreground">
                Creating next-generation systems that protect intellectual property while providing seamless experiences for legitimate users across various platforms and media types.
              </p>
            </motion.div>

            <motion.div
              className="bg-card border border-border rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-red-500/10">
                <Server className="h-5 w-5 text-red-500" />
              </div>
              <h3 className="mb-3 text-xl font-medium text-foreground">Enterprise Infrastructure</h3>
              <p className="text-muted-foreground">
                Designing and implementing robust, scalable infrastructure solutions that provide high performance, security, and reliability for businesses of all sizes.
              </p>
            </motion.div>

            <motion.div
              className="bg-card border border-border rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500/10">
                <Globe className="h-5 w-5 text-cyan-500" />
              </div>
              <h3 className="mb-3 text-xl font-medium text-foreground">Global Accessibility</h3>
              <p className="text-muted-foreground">
                Making advanced technology accessible to a wider global audience through intuitive interfaces, comprehensive documentation, and innovative deployment strategies.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Join Us CTA */}
      <section className="bg-background">
        <div className="mx-auto max-w-[94%] px-4 pt-16 pb-16 sm:px-6 md:max-w-[90%] md:py-24 lg:px-8">
          <motion.div
            className="rounded-xl border-border overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative p-6 sm:p-8 md:p-10">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-blue-500/5 to-purple-500/5" />
              <div className="relative z-10 flex flex-col items-center text-center">
                <h2 className="text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
                  Join Us On Our Journey
                </h2>
                <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
                  This charter represents not just who we are today, but who we aspire to be tomorrow. We invite you to be part of our continuing story—whether as a client, a collaborator, or simply someone who shares our vision for a more secure, innovative, and empowered digital world.
                </p>
                <div className="mt-10">
                  <Button asChild size="lg">
                    <Link href="/contact-us" className="group inline-flex items-center">
                      Contact Us
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default OurCharterContent
