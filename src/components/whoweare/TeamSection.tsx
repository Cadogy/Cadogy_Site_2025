"use client"

import { motion } from "framer-motion"
import { Linkedin, Mail } from "lucide-react"

const TeamSection = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Charles Knapp",
      role: "Co-Founder & CTO",
      bio: "Architect of secure, scalable systems. Passionate about solving complex technical challenges with elegant solutions.",
      image: "/images/authors/charles_k_author.jpg",
      linkedin: "https://www.linkedin.com/in/charlesknapp",
      email: "mailto:charles@cadogy.com",
    },
    {
      id: 2,
      name: "Dylan Safra",
      role: "Co-Founder & CSO",
      bio: "Strategist and optimizer. Obsessed with turning data into actionable insights and driving measurable growth.",
      image: "/images/authors/dylan_s_author.jpg",
      linkedin: "https://www.linkedin.com/in/dylansafra",
      email: "mailto:dylan@cadogy.com",
    },
  ]

  return (
    <section className="w-full py-20 md:py-32">
      <div className="mx-auto px-0">
        <div className="mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl text-xl leading-relaxed text-muted-foreground md:text-2xl"
          >
            Same birthday. Same passions. It turns out that kind of cosmic
            synchronicity comes with a built-in knack for building cool things
            side by side.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 gap-12 md:grid-cols-2"
        >
          <div className="flex aspect-[16/9] items-center justify-center overflow-hidden rounded-lg">
            <img
              src="/images/who-we-are/cadogy_who_we_are.jpg"
              alt="Cadogy Team"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex flex-col justify-center space-y-12">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h3 className="mb-2 text-2xl font-medium text-foreground md:text-3xl">
                  {member.name}
                </h3>
                <p className="mb-4 text-base text-muted-foreground md:text-lg">
                  {member.role}
                </p>
                <p className="mb-4 leading-relaxed text-muted-foreground">
                  {member.bio}
                </p>

                <div className="flex items-center gap-3">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-md border border-border bg-card p-2.5 text-foreground transition-all hover:bg-accent"
                    aria-label={`LinkedIn profile of ${member.name}`}
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                  <a
                    href={member.email}
                    className="rounded-md border border-border bg-card p-2.5 text-foreground transition-all hover:bg-accent"
                    aria-label={`Email ${member.name}`}
                  >
                    <Mail className="h-4 w-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default TeamSection
