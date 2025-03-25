"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Linkedin, Mail, MapPin, Send } from "lucide-react"

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
    <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="mb-16 max-w-3xl">
        <h1 className="mb-4 text-4xl font-bold text-slate-100 md:text-5xl">
          Get in Touch
        </h1>
        <p className="text-sm text-slate-200">
          Have questions about our services or want to discuss your project?
          We&apos;re here to help. Reach out using the form below or connect
          with us directly.
        </p>
      </div>

      <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
        {/* Contact Information */}
        <div className="lg:col-span-1">
          <div className="mb-8">
            <h2 className="mb-6 text-2xl font-bold text-slate-100">
              Contact Information
            </h2>

            <div className="space-y-6">
              <div className="flex items-start">
                <Mail className="mr-4 h-6 w-6 text-blue-400" />
                <div>
                  <h3 className="mb-1 font-medium text-slate-100">Email</h3>
                  <a
                    href="mailto:contact@cadogy.com"
                    className="text-sm text-slate-200 hover:text-blue-400 hover:underline"
                  >
                    contact@cadogy.com
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <Linkedin className="mr-4 h-6 w-6 text-blue-400" />
                <div>
                  <h3 className="mb-1 font-medium text-slate-100">LinkedIn</h3>
                  <a
                    href="https://www.linkedin.com/company/cadogy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-slate-200 hover:text-blue-400 hover:underline"
                  >
                    Cadogy LinkedIn
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <MapPin className="mr-4 h-6 w-6 text-blue-400" />
                <div>
                  <h3 className="mb-1 font-medium text-slate-100">Location</h3>
                  <p className="text-sm text-slate-200">United States</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-neutral-800 pt-8">
            <h2 className="mb-4 text-xl font-bold text-slate-100">
              Learn More
            </h2>
            <p className="mb-4 text-sm text-slate-200">
              Interested in learning more about our approach and expertise?
            </p>
            <Link
              href="/our-charter"
              className="group flex items-center text-sm font-semibold text-blue-400"
            >
              <span className="mr-1">Read our charter</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="rounded-lg bg-neutral-900/50 p-8">
            <h2 className="mb-6 text-2xl font-bold text-slate-100">
              Send Us a Message
            </h2>

            {isSubmitted ? (
              <div className="rounded-md bg-blue-500/10 p-6 text-center">
                <div className="mb-4 flex justify-center">
                  <div className="rounded-full bg-blue-500/20 p-3">
                    <Send className="h-6 w-6 text-blue-400" />
                  </div>
                </div>
                <h3 className="mb-2 text-xl font-medium text-slate-100">
                  Message Sent!
                </h3>
                <p className="mb-6 text-sm text-slate-200">
                  Thank you for reaching out. We&apos;ll get back to you as soon
                  as possible.
                </p>
                <Button onClick={() => setIsSubmitted(false)} variant="outline">
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm text-slate-100">
                      Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                      className="bg-neutral-800 text-sm text-slate-100"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm text-slate-100">
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
                      className="bg-neutral-800 text-sm text-slate-100"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-sm text-slate-100">
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What's this regarding?"
                    required
                    className="bg-neutral-800 text-sm text-slate-100"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm text-slate-100">
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
                    className="bg-neutral-800 text-sm text-slate-100"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full text-sm md:w-auto"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                  <Send className="ml-2 h-4 w-4" />
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactForm
