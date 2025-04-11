"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { 
  ArrowRight, 
  Linkedin, 
  Mail, 
  MapPin, 
  Send, 
  MessageSquare, 
  Clock,
  Globe,
  PhoneCall,
  Calendar,
  Check,
  Brain,
  Shield
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if the device is mobile by setting a breakpoint for screen width
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768) // Mobile breakpoint at 768px
    }

    handleResize() // Set initial value
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    // In a real implementation, you'd send this data to your backend or a form service
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormData({ name: "", email: "", subject: "", message: "" })
  }

  return (
    <div className="bg-background">
      <div className="mx-auto max-w-[94%] px-4 py-16 sm:px-6 md:max-w-[90%] lg:px-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex flex-col items-center text-center">
            <h1 className="mb-4 text-3xl font-medium tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Get in Touch
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Have questions about our services or want to discuss your project?
              We&apos;re here to help. Reach out using the form below or connect
              with us directly.
            </p>
          </div>
        </motion.div>

        <div className="grid gap-12 md:grid-cols-12 lg:gap-16">
          {/* Contact Information */}
          <motion.div 
            className="md:col-span-5"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="space-y-10">
              {/* Contact Card */}
              <div className="rounded-xl border border-border bg-gradient-to-br from-card to-card/80 p-6 md:p-8">
                <h2 className="mb-6 text-2xl font-medium text-foreground">
                  Contact Information
                </h2>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-md bg-blue-100 dark:bg-blue-900/30">
                      <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-medium text-foreground">Email</h3>
                      <a
                        href="mailto:contact@cadogy.com"
                        className="text-sm text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 hover:underline"
                        aria-label="Send email to contact@cadogy.com"
                        tabIndex={0}
                      >
                        contact@cadogy.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-md bg-indigo-100 dark:bg-indigo-900/30">
                      <Linkedin className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-medium text-foreground">LinkedIn</h3>
                      <a
                        href="https://www.linkedin.com/company/cadogy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted-foreground hover:text-indigo-600 dark:hover:text-indigo-400 hover:underline"
                        aria-label="Visit Cadogy LinkedIn profile"
                        tabIndex={0}
                      >
                        Cadogy LinkedIn
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-md bg-amber-100 dark:bg-amber-900/30">
                      <MapPin className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-medium text-foreground">Location</h3>
                      <p className="text-sm text-muted-foreground">Pompano Beach, FL, United States</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-md bg-green-100 dark:bg-green-900/30">
                      <Clock className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-medium text-foreground">Business Hours</h3>
                      <p className="text-sm text-muted-foreground">Monday - Friday: 9:00 AM - 5:00 PM EST</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Why Choose Us */}
              <div className="rounded-xl border border-border overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
                <div className="p-6 md:p-8">
                  <h2 className="mb-5 text-xl font-medium text-foreground flex items-center">
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-md bg-primary/10 mr-2">
                      <Check className="h-3.5 w-3.5 text-primary" />
                    </span>
                    Why Choose Cadogy
                  </h2>
                  
                  <div className="space-y-5">
                    <div className="flex items-start">
                    </div>
                    
                    <div className="flex items-start">
                      <div className="mr-3 mt-0.5 h-7 w-7 flex-shrink-0 rounded-md bg-gradient-to-br from-purple-400/80 to-purple-600/80 dark:from-purple-500/20 dark:to-purple-700/20 flex items-center justify-center shadow-sm">
                        <Clock className="h-3.5 w-3.5 text-white dark:text-purple-400" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-foreground">Rapid Response Team</h4>
                        <p className="mt-1 text-xs text-muted-foreground">24-48 hour response time with dedicated account managers</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="mr-3 mt-0.5 h-7 w-7 flex-shrink-0 rounded-md bg-gradient-to-br from-green-400/80 to-green-600/80 dark:from-green-500/20 dark:to-green-700/20 flex items-center justify-center shadow-sm">
                        <Brain className="h-3.5 w-3.5 text-white dark:text-green-400" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-foreground">Technical Expertise</h4>
                        <p className="mt-1 text-xs text-muted-foreground">Senior developers with 10+ years of industry experience</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="mr-3 mt-0.5 h-7 w-7 flex-shrink-0 rounded-md bg-gradient-to-br from-amber-400/80 to-amber-600/80 dark:from-amber-500/20 dark:to-amber-700/20 flex items-center justify-center shadow-sm">
                        <Shield className="h-3.5 w-3.5 text-white dark:text-amber-400" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-foreground">Security Focus</h4>
                        <p className="mt-1 text-xs text-muted-foreground">Enterprise-grade security protocols and compliance</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-5 border-t border-border flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="flex h-2 w-2 rounded-md bg-green-500 animate-pulse mr-2"></span>
                      <span className="text-xs text-muted-foreground">Currently available for new projects</span>
                    </div>
                    <Link
                      href="/our-charter"
                      className="group inline-flex items-center text-sm font-medium text-primary"
                    >
                      <span>Read our charter</span>
                      <ArrowRight className="ml-1.5 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            className="md:col-span-7"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative overflow-hidden rounded-xl border border-border bg-card">
              {/* Decorative gradient elements */}
              <div className="absolute top-0 right-0 w-56 h-56 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-56 h-56 bg-blue-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

              <div className="relative z-10 p-6 md:p-8">
                <div className="flex items-center mb-6">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 mr-4">
                    <MessageSquare className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-2xl font-medium text-foreground">
                    Send Us a Message
                  </h2>
                </div>

                {isSubmitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="rounded-lg bg-gradient-to-br from-blue-500/10 to-indigo-500/10 p-8 text-center"
                  >
                    <div className="mb-6 flex justify-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-md bg-blue-500/20">
                        <Send className="h-7 w-7 text-blue-500" />
                      </div>
                    </div>
                    <h3 className="mb-2 text-xl font-medium text-foreground">
                      Message Sent!
                    </h3>
                    <p className="mb-6 text-muted-foreground">
                      Thank you for reaching out. We&apos;ll get back to you as soon
                      as possible.
                    </p>
                    <Button 
                      onClick={() => setIsSubmitted(false)} 
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      Send Another Message
                    </Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-medium text-foreground">
                          Name
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your name"
                          required
                          className="border-border/50 bg-background/50 text-sm text-foreground focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-border/50"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium text-foreground">
                          Email
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Your email address"
                          required
                          className="border-border/50 bg-background/50 text-sm text-foreground focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-border/50"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-sm font-medium text-foreground">
                        Subject
                      </Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="What's this regarding?"
                        required
                        className="border-border/50 bg-background/50 text-sm text-foreground focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-border/50"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-sm font-medium text-foreground">
                        Message
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={6}
                        placeholder="Tell us about your project or inquiry..."
                        required
                        className="border-border/50 bg-background/50 text-sm text-foreground focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-border/50"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                      <p className="text-xs text-muted-foreground">
                        We typically respond within 24-48 hours
                      </p>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="min-w-32 bg-primary text-primary-foreground hover:bg-primary/90"
                      >
                        {isSubmitting ? "Sending..." : "Send Message"}
                        <Send className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* FAQ Preview */}
            <motion.div 
              className="mt-8 rounded-xl border border-border p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-foreground">
                  Frequently Asked Questions
                </h3>
                <Link
                  href="/faq"
                  className="text-sm font-medium text-primary hover:underline inline-flex items-center"
                >
                  View all FAQs
                  <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </Link>
              </div>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div className="rounded-lg bg-muted/50 p-4">
                  <h4 className="text-sm font-medium text-foreground">
                    What services do you offer?
                  </h4>
                  <p className="mt-1 text-xs text-muted-foreground">
                    We provide web development, API solutions, SEO optimization, and AI integration services.
                  </p>
                </div>
                <div className="rounded-lg bg-muted/50 p-4">
                  <h4 className="text-sm font-medium text-foreground">
                    How quickly can you start on a new project?
                  </h4>
                  <p className="mt-1 text-xs text-muted-foreground">
                    We can typically begin preliminary work within 1-2 weeks of finalizing project details.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default ContactForm
