"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Mail, MessageSquare, Ticket } from "lucide-react"
import { useSession } from "next-auth/react"

const ContactForm = () => {
  const { data: session } = useSession()
  const [contactEmail, setContactEmail] = useState("contact@cadogy.com")

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch("/api/settings")
        if (response.ok) {
          const data = await response.json()
          if (data.settings?.contactEmail) {
            setContactEmail(data.settings.contactEmail)
          }
        }
      } catch (error) {
        console.error("Error fetching settings:", error)
      }
    }

    fetchSettings()
  }, [])

  return (
    <div className="mx-auto max-w-[94%] px-4 md:max-w-[90%] lg:px-8">
      <section className="w-full py-20 md:py-32">
        <div className="mx-auto px-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative mb-16 text-center"
          >
            <h1 className="mb-6 text-4xl font-medium tracking-tight text-foreground md:text-6xl lg:text-7xl">
              Let&apos;s Connect
            </h1>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              Have a project in mind? We&apos;d love to hear about it.
            </p>
          </motion.div>

          <div className="relative grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-12"
            >
              <div>
                <h2 className="mb-8 text-2xl font-medium tracking-tight text-foreground md:text-3xl">
                  Get in Touch
                </h2>
                <div className="space-y-6">
                  <div className="group">
                    <div className="mb-3 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted transition-colors group-hover:bg-primary/10">
                        <Mail className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
                      </div>
                      <span className="text-sm font-medium text-muted-foreground">
                        Email us directly
                      </span>
                    </div>
                    <a
                      href={`mailto:${contactEmail}`}
                      className="ml-[52px] text-lg text-foreground transition-colors hover:text-primary md:text-xl"
                    >
                      {contactEmail}
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <p className="text-lg leading-relaxed text-muted-foreground">
                  Whether you&apos;re looking to build a new digital product,
                  scale your existing platform, or need ongoing development
                  support, we&apos;re here to help bring your vision to life.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="flex flex-col justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {session ? (
                <div className="space-y-8">
                  <div>
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                        <Ticket className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-2xl font-medium text-foreground md:text-3xl">
                        Contact Portal
                      </h3>
                    </div>
                    <p className="text-lg leading-relaxed text-muted-foreground">
                      Access your tickets and get help from our team. Open new
                      tickets, track progress, and communicate directly with our
                      developers.
                    </p>
                  </div>

                  <div className="flex flex-col gap-4">
                    <Link
                      href="/dashboard/tickets"
                      className="group inline-flex items-center justify-between rounded-lg bg-foreground px-8 py-4 text-lg font-medium text-background transition-all hover:bg-foreground/90"
                    >
                      <span>View My Tickets</span>
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Link>

                    <Link
                      href="/dashboard/tickets/new"
                      className="group inline-flex items-center justify-between rounded-lg border-2 border-border px-8 py-4 text-lg font-medium text-foreground transition-all hover:border-foreground/40"
                    >
                      <span>Create New Ticket</span>
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  <div>
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                        <MessageSquare className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-2xl font-medium text-foreground md:text-3xl">
                        Start a Project
                      </h3>
                    </div>
                    <p className="text-lg leading-relaxed text-muted-foreground">
                      Login to your account to open support tickets and discuss
                      your projects with our team in real-time. It&apos;s the
                      fastest way to get started.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <Link
                      href="/login"
                      className="group inline-flex w-full items-center justify-between rounded-lg bg-foreground px-8 py-4 text-lg font-medium text-background transition-all hover:bg-foreground/90"
                    >
                      <span>Login to Dashboard</span>
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Link>

                    <div className="flex items-center justify-center gap-2 text-base text-muted-foreground">
                      <span>New here?</span>
                      <Link
                        href="/register"
                        className="font-medium text-foreground transition-colors hover:text-foreground/80"
                      >
                        Create an account
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ContactForm
