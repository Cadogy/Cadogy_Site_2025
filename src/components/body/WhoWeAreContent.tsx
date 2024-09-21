"use client"

// Ensure this is a client component
import Link from "next/link"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"

const WhoWeAreContent = () => {
  return (
    <>
      <div className="mb-[3.5rem] mt-[5rem] flex flex-col items-center">
        <h1 className="text-[50px]">The Minds Behind Cadogy</h1>
      </div>

      {/* Body */}
      <div className="container mx-auto px-4 pb-16 sm:px-6 lg:px-8">
        {/* Our Mission */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.1 }}
        >
          <h2 className="mb-6 text-2xl font-semibold">Our Mission</h2>
          <p className="text-md mb-6 text-slate-200">
            At Cadogy, we see ourselves not just as a business, but as two
            people on a shared journey of growth, learning, and transformation.
            Our mission is to empower creators, businesses, and innovators with
            tools that not only solve problems but spark change.
          </p>
          <p className="text-md mb-6 text-slate-200">
            For us, Cadogy is as much about our own journey as it is about the
            people we help along the way. Every challenge we’ve tackled—from our
            early anti-piracy systems to exploring AI, machine learning, and
            beyond—has shaped who we are and what we aim to achieve.
          </p>
          <p className="text-md mb-6 text-slate-200">
            This isn’t just business for us; it’s personal. We’re committed to
            staying at the forefront of technology, learning every step of the
            way, and sharing that knowledge to create a better, more connected
            world.
          </p>
        </motion.section>

        {/* Charles Knapp Section with Animation */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.1 }}
        >
          <h2 className="mb-6 text-2xl font-semibold">Charles Knapp</h2>
          <div className="flex flex-col items-center md:flex-row md:items-start">
            <img
              src="/images/authors/charles_k_author.jpg"
              alt="Charles Knapp"
              className="mb-6 h-40 w-40 rounded-md md:mb-0 md:mr-6"
            />
            <div>
              {" "}
              <p className="text-md mb-4 text-slate-300">
                {" "}
                Charles Knapp has built a reputation for his deep expertise in
                security. Growing up as a forum-kid, Charles was actively
                engaged in communities like HackForums, Se7enSins,
                AndroidRepublic, and Reddit, where he honed his skills in
                breaking boundaries—ethically, of course. He thrived in
                dissecting systems, from DNS DDoS mitigation to anti-piracy
                control, always pushing the limits of what’s possible.{" "}
              </p>{" "}
              <p className="text-md mb-4 text-slate-300">
                {" "}
                Charles’ journey into cybersecurity was fueled by his passion
                for solving complex problems. From protecting content creators
                against piracy to working on encryption techniques and code
                ciphers, he’s dedicated to ensuring a secure and scalable
                digital landscape. His expertise spans a wide range of
                technologies, including MERN stack (MongoDB, ExpressJS, ReactJS,
                NodeJS), TailwindCSS, Radix UI, MariaDB, and various cloud
                services.{" "}
              </p>{" "}
              <p className="text-md text-slate-300">
                {" "}
                Today, Charles leads the charge in DNS security and advanced
                anti-piracy measures. His unique blend of technical skills and a
                hacker’s curiosity continues to shape the future of digital
                protection, as he helps businesses secure their systems and
                break free from the ordinary.{" "}
              </p>{" "}
            </div>
          </div>
        </motion.section>

        {/* Dylan Safra Section with Animation */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.1 }}
        >
          <h2 className="mb-6 text-2xl font-semibold">Dylan Safra</h2>
          <div className="flex flex-col items-center md:flex-row md:items-start">
            <img
              src="/images/authors/dylan_s_author.jpg"
              alt="Dylan Safra"
              className="mb-6 h-40 w-40 rounded-md md:mb-0 md:mr-6"
            />
            <div>
              <p className="text-md mb-4 text-slate-300">
                Dylan Safra is an accomplished developer with a deep interest in
                artificial intelligence, system security, and the future of
                cloud technology. His journey began with a curiosity about how
                systems function on a fundamental level, which led him to master
                C++, JavaScript, and cloud-based infrastructures.
              </p>
              <p className="text-md mb-4 text-slate-300">
                Dylan’s focus is on exploring AI, automation, and digital rights
                management to innovate in ways that protect and enhance user
                experience.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Technologies We've Mastered with Animated List */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ staggerChildren: 0.15, delayChildren: 0.1 }}
        >
          <h2 className="mb-6 text-2xl font-semibold">
            Our Technological Journey
          </h2>
          <p className="text-md mb-6 text-slate-300">
            Together, Charles and Dylan have developed expertise in a broad
            range of technologies that fuel their innovation at Cadogy:
          </p>
          <motion.ul
            className="text-md mb-6 ml-8 list-disc"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <li>NextJS</li>
            <li>JavaScript (JS)</li>
            <li>NodeJS</li>
            <li>ReactJS</li>
            <li>ExpressJS</li>
            <li>MongoDB</li>
            <li>MariaDB</li>
            <li>TailwindCSS</li>
          </motion.ul>
        </motion.section>

        {/* Call to Action */}
        <motion.section
          className="rounded-sm bg-stone-800 p-8 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.1 }}
        >
          <h2 className="mb-6 text-2xl font-semibold">
            Ready to collaborate on the future of digital innovation?
          </h2>
          <p className="mb-8 text-lg text-muted-foreground">
            Join us on this journey of innovation, and let’s create something
            extraordinary together.
          </p>
          <Button
            asChild
            size="sm"
            variant="default"
            className="rounded-md px-8"
          >
            <Link href="/contact-us">Get in Touch</Link>
          </Button>
        </motion.section>
      </div>
    </>
  )
}

export default WhoWeAreContent
