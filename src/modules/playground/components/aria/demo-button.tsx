import { Button } from 'react-aria-components'

export function DemoButton() {
  return (
    <section className="flex flex-wrap items-center gap-3">
      <Button type="button" className="btn glass">
        Glass button
      </Button>

      <Button type="button" className="btn btn-outline btn-primary">
        <span className="loading loading-spinner" />
        Loading
      </Button>

      <Button type="button" className="btn no-animation">
        I do not have click animation
      </Button>
    </section>
  )
}
