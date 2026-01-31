import { render, screen } from "@/test/utils"
import userEvent from "@testing-library/user-event"
import { CaseStudyCard } from "./CaseStudyCard"

describe("CaseStudyCard", () => {
  const mockMetrics = [
    { label: "Increase", value: "150%" },
    { label: "Users", value: "10K+" },
  ]

  describe("rendering", () => {
    it("should render title and description", () => {
      render(
        <CaseStudyCard
          title="E-Commerce Platform"
          description="Modern online shopping experience"
          image="/test.jpg"
          metrics={mockMetrics}
          link="/case-studies/ecommerce"
        />
      )

      expect(screen.getByText("E-Commerce Platform")).toBeInTheDocument()
      expect(
        screen.getByText("Modern online shopping experience")
      ).toBeInTheDocument()
    })

    it("should render all metrics", () => {
      render(
        <CaseStudyCard
          title="Project"
          description="Description"
          image="/test.jpg"
          metrics={mockMetrics}
          link="/link"
        />
      )

      expect(screen.getByText("150%")).toBeInTheDocument()
      expect(screen.getByText("Increase")).toBeInTheDocument()
      expect(screen.getByText("10K+")).toBeInTheDocument()
      expect(screen.getByText("Users")).toBeInTheDocument()
    })

    it("should render link with correct href", () => {
      render(
        <CaseStudyCard
          title="Project"
          description="Description"
          image="/test.jpg"
          metrics={mockMetrics}
          link="/case-studies/test"
        />
      )

      const link = screen.getByRole("link")
      expect(link).toHaveAttribute("href", "/case-studies/test")
    })
  })

  describe("structure", () => {
    it("should have proper heading hierarchy", () => {
      render(
        <CaseStudyCard
          title="Case Study Title"
          description="Description"
          image="/test.jpg"
          metrics={mockMetrics}
          link="/link"
        />
      )

      const heading = screen.getByRole("heading", { level: 3 })
      expect(heading).toHaveTextContent("Case Study Title")
    })

    it("should render with card styling", () => {
      const { container } = render(
        <CaseStudyCard
          title="Project"
          description="Description"
          image="/test.jpg"
          metrics={mockMetrics}
          link="/link"
        />
      )

      const card = container.querySelector("a")
      expect(card).toHaveClass("rounded-lg")
    })
  })

  describe("image handling", () => {
    it("should render with background image style", () => {
      const { container } = render(
        <CaseStudyCard
          title="Project"
          description="Description"
          image="/background.jpg"
          metrics={mockMetrics}
          link="/link"
        />
      )

      const link = container.querySelector("a")
      expect(link).toBeInTheDocument()
    })

    it("should apply gradient overlay", () => {
      const { container } = render(
        <CaseStudyCard
          title="Project"
          description="Description"
          image="/test.jpg"
          metrics={mockMetrics}
          link="/link"
        />
      )

      const gradient = container.querySelector(".bg-gradient-to-t")
      expect(gradient).toBeInTheDocument()
    })
  })

  describe("interactions", () => {
    it("should be clickable", () => {
      render(
        <CaseStudyCard
          title="Clickable Project"
          description="Description"
          image="/test.jpg"
          metrics={mockMetrics}
          link="/case-studies/clickable"
        />
      )

      const link = screen.getByRole("link")
      expect(link).toBeInTheDocument()
    })

    it("should have hover state classes", () => {
      const { container } = render(
        <CaseStudyCard
          title="Project"
          description="Description"
          image="/test.jpg"
          metrics={mockMetrics}
          link="/link"
        />
      )

      const link = container.querySelector("a")
      expect(link).toHaveClass("group")
    })
  })

  describe("accessibility", () => {
    it("should have all text visible", () => {
      render(
        <CaseStudyCard
          title="Accessible Project"
          description="Accessible description"
          image="/test.jpg"
          metrics={mockMetrics}
          link="/link"
        />
      )

      expect(screen.getByText("Accessible Project")).toBeInTheDocument()
      expect(screen.getByText("Accessible description")).toBeInTheDocument()
    })

    it("should render as a link for keyboard navigation", () => {
      render(
        <CaseStudyCard
          title="Project"
          description="Description"
          image="/test.jpg"
          metrics={mockMetrics}
          link="/link"
        />
      )

      const link = screen.getByRole("link")
      expect(link).toBeInTheDocument()
    })
  })

  describe("edge cases", () => {
    it("should handle empty metrics array", () => {
      render(
        <CaseStudyCard
          title="Project"
          description="Description"
          image="/test.jpg"
          metrics={[]}
          link="/link"
        />
      )

      expect(screen.getByText("Project")).toBeInTheDocument()
    })

    it("should handle long titles", () => {
      const longTitle = "A Very Long Case Study Title That Might Wrap"
      render(
        <CaseStudyCard
          title={longTitle}
          description="Description"
          image="/test.jpg"
          metrics={mockMetrics}
          link="/link"
        />
      )

      expect(screen.getByText(longTitle)).toBeInTheDocument()
    })

    it("should handle many metrics", () => {
      const manyMetrics = [
        { label: "Metric 1", value: "100%" },
        { label: "Metric 2", value: "200%" },
        { label: "Metric 3", value: "300%" },
        { label: "Metric 4", value: "400%" },
      ]

      render(
        <CaseStudyCard
          title="Project"
          description="Description"
          image="/test.jpg"
          metrics={manyMetrics}
          link="/link"
        />
      )

      expect(screen.getByText("100%")).toBeInTheDocument()
      expect(screen.getByText("400%")).toBeInTheDocument()
    })
  })
})
