import { render, RenderOptions } from "@testing-library/react"
import { ReactElement, ReactNode } from "react"

interface AllTheProvidersProps {
  children: ReactNode
}

function AllTheProviders({ children }: AllTheProvidersProps): ReactElement {
  return <>{children}</>
}

type CustomRenderOptions = Omit<RenderOptions, "wrapper">

function customRender(
  ui: ReactElement,
  options?: CustomRenderOptions
): ReturnType<typeof render> {
  return render(ui, { wrapper: AllTheProviders, ...options })
}

export * from "@testing-library/react"
export { customRender as render }
