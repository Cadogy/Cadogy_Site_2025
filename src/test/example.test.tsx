import { render, screen } from "./utils"

function ExampleComponent(): JSX.Element {
  return <div>Testing Infrastructure</div>
}

describe("Testing Infrastructure", () => {
  it("should render example component", () => {
    render(<ExampleComponent />)
    expect(screen.getByText("Testing Infrastructure")).toBeInTheDocument()
  })

  it("should pass basic assertion", () => {
    expect(true).toBe(true)
  })
})
