"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"

const OurCharterContent = () => {
  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
        repeat: Infinity,
        repeatType: "mirror",
      },
    },
  }

  const itemVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    hover: { scale: 1.05, zIndex: 1 },
  }

  return (
    <>
      <div className="mb-[3.5rem] mt-[5rem] flex flex-col items-center">
        <h1 className="text-[50px]">Our Charter</h1>
      </div>

      <div className="container mx-auto px-4 pb-16 sm:px-6 lg:px-8">
        {/* Purpose & Vision */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.1 }}
        >
          <h2 className="mb-6 text-2xl font-semibold">Our Purpose & Vision</h2>
          <p className="text-md mb-6 text-slate-300">
            Cadogy exists to bridge the gap between technology and human
            potential. We envision a world where creators, businesses, and
            innovators are empowered with secure, ethical technology solutions
            that not only solve complex problems but catalyze meaningful change.
          </p>
          <p className="text-md mb-6 text-slate-300">
            Our vision is to be at the forefront of technological innovation,
            particularly in cybersecurity and digital rights protection, while
            maintaining an unwavering commitment to ethical practices and the
            advancement of human creativity.
          </p>
        </motion.section>

        {/* Core Values */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.1 }}
        >
          <h2 className="mb-6 text-2xl font-semibold">Our Core Values</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <motion.div
              className="rounded-lg border border-neutral-700 bg-neutral-900/50 p-6"
              whileHover={{ scale: 1.0 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="mb-3 text-xl font-medium">
                Innovation & Technical Excellence
              </h3>
              <p className="text-slate-300">
                We are committed to continuous learning and pushing the
                boundaries of what&apos;s possible. From advanced anti-piracy
                systems to exploring AI and machine learning, we stay at the
                cutting edge of technology to deliver solutions that exceed
                expectations.
              </p>
            </motion.div>

            <motion.div
              className="rounded-lg border border-neutral-700 bg-neutral-900/50 p-6"
              whileHover={{ scale: 1.0 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="mb-3 text-xl font-medium">Ethical Approach</h3>
              <p className="text-slate-300">
                We believe in using technology responsibly. Our cybersecurity
                expertise is guided by ethical principles that prioritize
                privacy, data protection, and the legitimate rights of content
                creators and businesses.
              </p>
            </motion.div>

            <motion.div
              className="rounded-lg border border-neutral-700 bg-neutral-900/50 p-6"
              whileHover={{ scale: 1.0 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="mb-3 text-xl font-medium">
                Empowerment Through Knowledge
              </h3>
              <p className="text-slate-300">
                We&apos;re dedicated to sharing our expertise and empowering
                others. Whether through education, collaborative partnerships,
                or transformative solutions, we aim to elevate the capabilities
                of those we work with.
              </p>
            </motion.div>

            <motion.div
              className="rounded-lg border border-neutral-700 bg-neutral-900/50 p-6"
              whileHover={{ scale: 1.0 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="mb-3 text-xl font-medium">
                Adaptability & Growth
              </h3>
              <p className="text-slate-300">
                We embrace change as an opportunity for growth. Our journey is
                one of continuous transformation, and we bring this mindset to
                every challenge and project we undertake.
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Business Philosophy */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.1 }}
        >
          <h2 className="mb-6 text-2xl font-semibold">
            Our Business Philosophy
          </h2>
          <p className="text-md mb-6 text-slate-300">
            At Cadogy, we believe technology should serve humanity, not the
            other way around. Our approach is built on three fundamental
            principles:
          </p>
          <ul className="mb-6 space-y-4 text-slate-300">
            <motion.li
              className="flex items-start"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.1, delay: 0.1 }}
            >
              <span className="mr-2 text-blue-400">•</span>
              <span>
                <strong>Problem-First Thinking:</strong> We begin by deeply
                understanding the challenges our clients face before proposing
                technological solutions. This ensures that our work addresses
                real needs rather than pushing unnecessary technology.
              </span>
            </motion.li>
            <motion.li
              className="flex items-start"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.1, delay: 0.2 }}
            >
              <span className="mr-2 text-blue-400">•</span>
              <span>
                <strong>Collaborative Partnership:</strong> We view our client
                relationships as true partnerships. Your goals become our goals,
                and we work alongside you every step of the way.
              </span>
            </motion.li>
            <motion.li
              className="flex items-start"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.1, delay: 0.3 }}
            >
              <span className="mr-2 text-blue-400">•</span>
              <span>
                <strong>Sustainable Innovation:</strong> We develop solutions
                that not only solve immediate problems but are built to evolve
                with changing needs and technologies.
              </span>
            </motion.li>
          </ul>
        </motion.section>

        {/* Commitments */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.1 }}
        >
          <h2 className="mb-6 text-2xl font-semibold">Our Commitments</h2>
          <motion.div
            className="mb-8 rounded-lg border border-neutral-700 bg-neutral-900/50 p-6"
            whileHover={{ scale: 1.0 }}
            transition={{ duration: 0.2 }}
          >
            <h3 className="mb-3 text-xl font-medium">To Our Clients</h3>
            <p className="text-slate-300">
              We pledge to deliver solutions of the highest quality and
              integrity. We will always prioritize your security, your data
              privacy, and your business objectives. Our expertise in the MERN
              stack, cybersecurity, and digital rights management is dedicated
              to safeguarding your interests and advancing your goals.
            </p>
          </motion.div>

          <motion.div
            className="mb-8 rounded-lg border border-neutral-700 bg-neutral-900/50 p-6"
            whileHover={{ scale: 1.0 }}
            transition={{ duration: 0.2 }}
          >
            <h3 className="mb-3 text-xl font-medium">To Content Creators</h3>
            <p className="text-slate-300">
              We&apos;re committed to protecting your intellectual property
              through cutting-edge anti-piracy strategies and digital rights
              management. We understand the value of your creative work and will
              develop innovative ways to secure it in an increasingly complex
              digital landscape.
            </p>
          </motion.div>

          <motion.div
            className="rounded-lg border border-neutral-700 bg-neutral-900/50 p-6"
            whileHover={{ scale: 1.0 }}
            transition={{ duration: 0.2 }}
          >
            <h3 className="mb-3 text-xl font-medium">
              To The Digital Community
            </h3>
            <p className="text-slate-300">
              We commit to contributing positively to the global digital
              ecosystem. Through ethical practices, knowledge sharing, and
              responsible innovation, we aim to help build a more secure,
              creative, and empowering technological future for everyone.
            </p>
          </motion.div>
        </motion.section>

        {/* Strategic Direction */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ staggerChildren: 0.15, delayChildren: 0.1 }}
        >
          <h2 className="mb-6 text-2xl font-semibold">
            Our Strategic Direction
          </h2>
          <p className="text-md mb-6 text-slate-300">
            Looking to the future, Cadogy is focused on several key areas that
            align with our expertise and the evolving needs of the digital
            landscape:
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            <motion.div
              className="rounded-lg border border-neutral-700 bg-neutral-900/50 p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.0 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="mb-3 text-xl font-medium">
                Advanced Security Solutions
              </h3>
              <p className="text-slate-300">
                Continuing to innovate in DNS security, encryption
                methodologies, and system protection to address emerging cyber
                threats.
              </p>
            </motion.div>

            <motion.div
              className="rounded-lg border border-neutral-700 bg-neutral-900/50 p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.0 }}
              transition={{ duration: 0.2, delay: 0.1 }}
            >
              <h3 className="mb-3 text-xl font-medium">
                AI & Machine Learning Integration
              </h3>
              <p className="text-slate-300">
                Exploring the ethical application of AI and machine learning to
                enhance security, optimize digital experiences, and create new
                possibilities for our clients.
              </p>
            </motion.div>

            <motion.div
              className="rounded-lg border border-neutral-700 bg-neutral-900/50 p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.0 }}
              transition={{ duration: 0.2, delay: 0.2 }}
            >
              <h3 className="mb-3 text-xl font-medium">Data-Driven Strategy</h3>
              <p className="text-slate-300">
                Developing more sophisticated tools for data analysis and
                decision-making that empower businesses to act with confidence
                and precision.
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.section
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.1 }}
        >
          <h2 className="mb-6 text-2xl font-semibold">
            Join Us On Our Journey
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-slate-300">
            This charter represents not just who we are today, but who we aspire
            to be tomorrow. We invite you to be part of our continuing
            story—whether as a client, a collaborator, or simply someone who
            shares our vision for a more secure, innovative, and empowered
            digital world.
          </p>
          <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <Link
              className="group flex w-full items-center justify-center rounded-sm bg-background/70 px-5 py-3 text-slate-200 transition duration-500 sm:w-auto md:bg-background/20 md:hover:bg-background/30 md:hover:backdrop-blur-sm"
              href="/contact-us"
            >
              <span className="text-sm font-medium transition duration-500 group-hover:-translate-x-1">
                Contact Us
              </span>
              <ArrowRight className="ml-2 h-4 w-4 text-slate-200 transition duration-500 group-hover:translate-x-1" />
            </Link>
            <Link
              className="group flex w-full items-center justify-center rounded-sm border border-neutral-800 bg-transparent px-5 py-3 text-slate-200 transition duration-500 sm:w-auto md:hover:bg-background/10 md:hover:backdrop-blur-sm"
              href="/who-we-are"
            >
              <span className="text-sm font-medium transition duration-500 group-hover:-translate-x-1">
                Learn More About Us
              </span>
              <ArrowRight className="ml-2 h-4 w-4 text-slate-200 transition duration-500 group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.section>
      </div>
    </>
  )
}

export default OurCharterContent
