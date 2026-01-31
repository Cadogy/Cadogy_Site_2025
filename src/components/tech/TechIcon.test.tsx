import { render, screen } from "@/test/utils"
import userEvent from "@testing-library/user-event"
import { Code } from "lucide-react"
import { TechIcon } from "./TechIcon"

describe("TechIcon", () => {
  describe("rendering", () => {
    it("should render icon with label", () => {
      render(<TechIcon name="React" icon={<Code />} />)

      expect(screen.getByText("React")).toBeInTheDocument()
    })

    it("should render the provided icon", () => {
      const { container } = render(
        <TechIcon name="TypeScript" icon={<Code data-testid="test-icon" />} />
      )

      const icon = container.querySelector("[data-testid='test-icon']")
      expect(icon).toBeInTheDocument()
    })

    it("should render with default medium size", () => {
      const { container } = render(<TechIcon name="Next.js" icon={<Code />} />)

      const iconContainer = container.querySelector(".bg-card") as HTMLElement
      expect(iconContainer).toHaveClass("h-16")
      expect(iconContainer).toHaveClass("w-16")
    })
  })

  describe("sizes", () => {
    it("should apply small size classes", () => {
      const { container } = render(
        <TechIcon name="React" icon={<Code />} size="small" />
      )

      const iconContainer = container.querySelector(".bg-card") as HTMLElement
      expect(iconContainer).toHaveClass("h-12")
      expect(iconContainer).toHaveClass("w-12")
    })

    it("should apply medium size classes", () => {
      const { container } = render(
        <TechIcon name="React" icon={<Code />} size="medium" />
      )

      const iconContainer = container.querySelector(".bg-card") as HTMLElement
      expect(iconContainer).toHaveClass("h-16")
      expect(iconContainer).toHaveClass("w-16")
    })

    it("should apply large size classes", () => {
      const { container } = render(
        <TechIcon name="React" icon={<Code />} size="large" />
      )

      const iconContainer = container.querySelector(".bg-card") as HTMLElement
      expect(iconContainer).toHaveClass("h-20")
      expect(iconContainer).toHaveClass("w-20")
    })
  })

  describe("interactions", () => {
    it("should have hover state classes", () => {
      const { container } = render(<TechIcon name="React" icon={<Code />} />)

      const iconContainer = container.querySelector(".bg-card") as HTMLElement
      expect(iconContainer).toHaveClass("hover:scale-110")
    })

    it("should render with transition classes", () => {
      const { container } = render(<TechIcon name="React" icon={<Code />} />)

      const iconContainer = container.querySelector(".bg-card") as HTMLElement
      expect(iconContainer).toHaveClass("transition-transform")
    })
  })

  describe("accessibility", () => {
    it("should render label as visible text", () => {
      render(<TechIcon name="Accessible Tech" icon={<Code />} />)

      expect(screen.getByText("Accessible Tech")).toBeVisible()
    })

    it("should have semantic structure", () => {
      const { container } = render(
        <TechIcon name="TypeScript" icon={<Code />} />
      )

      const label = screen.getByText("TypeScript")
      expect(label).toBeInTheDocument()
    })
  })

  describe("styling", () => {
    it("should apply card styling", () => {
      const { container } = render(<TechIcon name="React" icon={<Code />} />)

      const iconContainer = container.querySelector(".bg-card") as HTMLElement
      expect(iconContainer).toHaveClass("rounded-lg")
      expect(iconContainer).toHaveClass("bg-card")
    })

    it("should center content", () => {
      const { container } = render(<TechIcon name="React" icon={<Code />} />)

      const iconContainer = container.querySelector(".bg-card") as HTMLElement
      expect(iconContainer).toHaveClass("flex")
      expect(iconContainer).toHaveClass("items-center")
      expect(iconContainer).toHaveClass("justify-center")
    })
  })

  describe("edge cases", () => {
    it("should handle long technology names", () => {
      const longName = "Very Long Technology Name That Might Wrap"
      render(<TechIcon name={longName} icon={<Code />} />)

      expect(screen.getByText(longName)).toBeInTheDocument()
    })

    it("should handle special characters in name", () => {
      render(<TechIcon name="Next.js 14+" icon={<Code />} />)

      expect(screen.getByText("Next.js 14+")).toBeInTheDocument()
    })
  })
})
