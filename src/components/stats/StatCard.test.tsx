import { render, screen } from "@/test/utils"
import { createStatCardData } from "@/test/factories/stats"
import { StatCard } from "./StatCard"

describe("StatCard", () => {
  describe("rendering", () => {
    it("should render stat value and label", () => {
      const stat = createStatCardData({
        value: "15+",
        label: "Years in Business",
      })

      render(<StatCard {...stat} />)

      expect(screen.getByText("15+")).toBeInTheDocument()
      expect(screen.getByText("Years in Business")).toBeInTheDocument()
    })

    it("should render optional description", () => {
      const stat = createStatCardData({
        value: "500+",
        label: "Projects",
        description: "Successfully delivered",
      })

      render(<StatCard {...stat} />)

      expect(screen.getByText("Successfully delivered")).toBeInTheDocument()
    })

    it("should apply default variant styling", () => {
      const stat = createStatCardData({ value: "50+", label: "Technologies" })

      const { container } = render(<StatCard {...stat} />)

      const card = container.firstChild as HTMLElement
      expect(card).toHaveClass("stat-card")
    })

    it("should apply large variant styling", () => {
      const stat = createStatCardData({
        value: "98%",
        label: "Client Satisfaction",
        variant: "large",
      })

      const { container } = render(<StatCard {...stat} />)

      const valueElement = screen.getByText("98%")
      expect(valueElement).toHaveClass("stat-value-large")
    })
  })

  describe("accessibility", () => {
    it("should be visible to screen readers", () => {
      const stat = createStatCardData({
        value: "15+",
        label: "Years in Business",
      })

      render(<StatCard {...stat} />)

      const value = screen.getByText("15+")
      const label = screen.getByText("Years in Business")

      expect(value).toBeVisible()
      expect(label).toBeVisible()
    })

    it("should have semantic HTML structure", () => {
      const stat = createStatCardData({
        value: "500+",
        label: "Projects Delivered",
      })

      render(<StatCard {...stat} />)

      const card = screen.getByText("500+").closest(".stat-card")
      expect(card).toBeInTheDocument()
    })
  })

  describe("edge cases", () => {
    it("should handle numeric values", () => {
      const stat = createStatCardData({ value: "1000", label: "Clients" })

      render(<StatCard {...stat} />)

      expect(screen.getByText("1000")).toBeInTheDocument()
    })

    it("should handle empty description", () => {
      const stat = createStatCardData({
        value: "50+",
        label: "Technologies",
        description: undefined,
      })

      render(<StatCard {...stat} />)

      expect(screen.getByText("50+")).toBeInTheDocument()
      expect(screen.getByText("Technologies")).toBeInTheDocument()
    })
  })
})
