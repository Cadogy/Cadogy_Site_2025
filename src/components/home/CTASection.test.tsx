import { render, screen } from "@/test/utils"
import { CTASection } from "./CTASection"

describe("CTASection", () => {
  describe("rendering", () => {
    it("should render headline", () => {
      render(
        <CTASection
          headline="Ready to get started?"
          primaryCTA={{ text: "Get Started", href: "/contact" }}
        />
      )

      expect(screen.getByText("Ready to get started?")).toBeInTheDocument()
    })

    it("should render subheadline when provided", () => {
      render(
        <CTASection
          headline="Headline"
          subheadline="Let's build something amazing together"
          primaryCTA={{ text: "Get Started", href: "/contact" }}
        />
      )

      expect(
        screen.getByText("Let's build something amazing together")
      ).toBeInTheDocument()
    })

    it("should render primary CTA button", () => {
      render(
        <CTASection
          headline="Headline"
          primaryCTA={{ text: "Start Your Project", href: "/contact" }}
        />
      )

      const button = screen.getByRole("link", { name: /Start Your Project/i })
      expect(button).toBeInTheDocument()
      expect(button).toHaveAttribute("href", "/contact")
    })

    it("should render secondary CTA when provided", () => {
      render(
        <CTASection
          headline="Headline"
          primaryCTA={{ text: "Get Started", href: "/contact" }}
          secondaryCTA={{ text: "Learn More", href: "/about" }}
        />
      )

      const secondaryButton = screen.getByRole("link", { name: /Learn More/i })
      expect(secondaryButton).toBeInTheDocument()
      expect(secondaryButton).toHaveAttribute("href", "/about")
    })
  })

  describe("structure", () => {
    it("should be a semantic section element", () => {
      const { container } = render(
        <CTASection
          headline="Headline"
          primaryCTA={{ text: "CTA", href: "/link" }}
        />
      )

      const section = container.querySelector("section")
      expect(section).toBeInTheDocument()
    })

    it("should have proper heading hierarchy", () => {
      render(
        <CTASection
          headline="Main CTA Headline"
          primaryCTA={{ text: "CTA", href: "/link" }}
        />
      )

      const heading = screen.getByRole("heading", { level: 2 })
      expect(heading).toHaveTextContent("Main CTA Headline")
    })

    it("should be full-width", () => {
      const { container } = render(
        <CTASection
          headline="Headline"
          primaryCTA={{ text: "CTA", href: "/link" }}
        />
      )

      const section = container.querySelector("section")
      expect(section).toHaveClass("w-full")
    })
  })

  describe("styling", () => {
    it("should have high-contrast background", () => {
      const { container } = render(
        <CTASection
          headline="Headline"
          primaryCTA={{ text: "CTA", href: "/link" }}
        />
      )

      const section = container.querySelector("section")
      expect(section).toHaveClass("bg-primary")
    })

    it("should apply primary button styling", () => {
      render(
        <CTASection
          headline="Headline"
          primaryCTA={{ text: "Primary", href: "/link" }}
        />
      )

      const button = screen.getByRole("link", { name: /Primary/i })
      expect(button).toHaveClass("bg-background")
    })
  })

  describe("animation", () => {
    it("should render with animation elements", () => {
      const { container } = render(
        <CTASection
          headline="Headline"
          primaryCTA={{ text: "CTA", href: "/link" }}
        />
      )

      const animatedElements = container.querySelectorAll("[style]")
      expect(animatedElements.length).toBeGreaterThan(0)
    })
  })

  describe("accessibility", () => {
    it("should have accessible button text", () => {
      render(
        <CTASection
          headline="Headline"
          primaryCTA={{ text: "Get Started Today", href: "/contact" }}
        />
      )

      const button = screen.getByRole("link", { name: /Get Started Today/i })
      expect(button).toBeInTheDocument()
    })

    it("should render all text visible", () => {
      render(
        <CTASection
          headline="Ready to Start?"
          subheadline="Contact us today"
          primaryCTA={{ text: "Start", href: "/link" }}
        />
      )

      expect(screen.getByText("Ready to Start?")).toBeInTheDocument()
      expect(screen.getByText("Contact us today")).toBeInTheDocument()
    })
  })

  describe("edge cases", () => {
    it("should handle long headlines", () => {
      const longHeadline =
        "This is a Very Long CTA Headline That Should Still Display Properly"
      render(
        <CTASection
          headline={longHeadline}
          primaryCTA={{ text: "CTA", href: "/link" }}
        />
      )

      expect(screen.getByText(longHeadline)).toBeInTheDocument()
    })

    it("should work without subheadline", () => {
      render(
        <CTASection
          headline="Simple CTA"
          primaryCTA={{ text: "Click Here", href: "/link" }}
        />
      )

      expect(screen.getByText("Simple CTA")).toBeInTheDocument()
      expect(screen.getByRole("link", { name: /Click Here/i })).toBeInTheDocument()
    })

    it("should work without secondary CTA", () => {
      render(
        <CTASection
          headline="Headline"
          primaryCTA={{ text: "Primary", href: "/link" }}
        />
      )

      const links = screen.getAllByRole("link")
      expect(links).toHaveLength(1)
    })
  })
})
