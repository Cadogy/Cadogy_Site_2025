import { render, screen } from "@/test/utils"
import { Compass } from "lucide-react"
import { ProcessStep } from "./ProcessStep"

describe("ProcessStep", () => {
  describe("rendering", () => {
    it("should render step number, title, and description", () => {
      render(
        <ProcessStep
          number={1}
          title="Discovery & Planning"
          description="We analyze your needs and create a roadmap"
        />
      )

      expect(screen.getByText("01")).toBeInTheDocument()
      expect(screen.getByText("Discovery & Planning")).toBeInTheDocument()
      expect(
        screen.getByText("We analyze your needs and create a roadmap")
      ).toBeInTheDocument()
    })

    it("should render with provided icon", () => {
      const { container } = render(
        <ProcessStep
          number={1}
          title="Step One"
          description="Description"
          icon={<Compass data-testid="test-icon" />}
        />
      )

      const icon = container.querySelector("[data-testid='test-icon']")
      expect(icon).toBeInTheDocument()
    })

    it("should format number with leading zero", () => {
      render(
        <ProcessStep number={5} title="Step Five" description="Description" />
      )

      expect(screen.getByText("05")).toBeInTheDocument()
    })
  })

  describe("active state", () => {
    it("should apply active state classes when isActive is true", () => {
      const { container } = render(
        <ProcessStep
          number={1}
          title="Active Step"
          description="Description"
          isActive={true}
        />
      )

      const step = container.firstChild as HTMLElement
      expect(step).toHaveClass("border-primary")
    })

    it("should not apply active state classes when isActive is false", () => {
      const { container } = render(
        <ProcessStep
          number={1}
          title="Inactive Step"
          description="Description"
          isActive={false}
        />
      )

      const step = container.firstChild as HTMLElement
      expect(step).not.toHaveClass("border-primary")
    })

    it("should default to inactive state", () => {
      const { container } = render(
        <ProcessStep number={1} title="Default Step" description="Description" />
      )

      const step = container.firstChild as HTMLElement
      expect(step).not.toHaveClass("border-primary")
    })
  })

  describe("structure", () => {
    it("should have proper heading hierarchy", () => {
      render(
        <ProcessStep
          number={1}
          title="Process Step"
          description="Description"
        />
      )

      const heading = screen.getByRole("heading", { level: 3 })
      expect(heading).toHaveTextContent("Process Step")
    })

    it("should render with card styling", () => {
      const { container } = render(
        <ProcessStep number={1} title="Step" description="Description" />
      )

      const step = container.firstChild as HTMLElement
      expect(step).toHaveClass("rounded-lg")
      expect(step).toHaveClass("border")
    })
  })

  describe("accessibility", () => {
    it("should have all text visible in the document", () => {
      render(
        <ProcessStep
          number={2}
          title="Development"
          description="Building your solution"
        />
      )

      expect(screen.getByText("02")).toBeInTheDocument()
      expect(screen.getByText("Development")).toBeInTheDocument()
      expect(screen.getByText("Building your solution")).toBeInTheDocument()
    })

    it("should use semantic heading for title", () => {
      render(
        <ProcessStep
          number={1}
          title="Accessible Step"
          description="Description"
        />
      )

      const heading = screen.getByRole("heading", { level: 3 })
      expect(heading).toBeInTheDocument()
    })
  })

  describe("edge cases", () => {
    it("should handle long titles", () => {
      const longTitle = "This is a Very Long Process Step Title That Might Wrap"
      render(
        <ProcessStep number={1} title={longTitle} description="Description" />
      )

      expect(screen.getByText(longTitle)).toBeInTheDocument()
    })

    it("should handle long descriptions", () => {
      const longDesc =
        "This is a very long description that explains the process step in great detail and provides comprehensive information about what happens during this phase"
      render(<ProcessStep number={1} title="Step" description={longDesc} />)

      expect(screen.getByText(longDesc)).toBeInTheDocument()
    })

    it("should handle double-digit numbers", () => {
      render(
        <ProcessStep number={10} title="Step Ten" description="Description" />
      )

      expect(screen.getByText("10")).toBeInTheDocument()
    })
  })

  describe("animations", () => {
    it("should render with transition classes", () => {
      const { container} = render(
        <ProcessStep number={1} title="Step" description="Description" />
      )

      const step = container.firstChild as HTMLElement
      expect(step).toHaveClass("transition-all")
    })
  })
})
