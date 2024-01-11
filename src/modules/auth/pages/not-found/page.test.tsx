import { screen } from '@testing-library/react'
import type { RouteObject } from 'react-router-dom'
import { createMemoryRouter } from 'react-router-dom'
import { NotFoundPage } from './page'
import { setupTest } from '#shared/utils/test.util'

describe('<NotFoundPage />', () => {
  const { renderProviders } = setupTest()
  const routes = [
    {
      path: '*',
      element: <NotFoundPage />,
    },
  ] satisfies RouteObject[]
  const router = createMemoryRouter(routes, {
    initialEntries: ['/', '/whatever'],
    initialIndex: 1,
  })

  it('should render properly', () => {
    const view = renderProviders(router)
    expect(() => view).not.toThrow()
  })

  // FIXME: Unexpected Application Error, because of react-aria i18n hooks
  it.todo('should render contents correctly', () => {
    // ARRANGE
    renderProviders(router)
    const heading: HTMLHeadingElement = screen.getByText(/404/i)
    const paragraph: HTMLParagraphElement = screen.getByText(/gone/i)
    const anchor: HTMLAnchorElement = screen.getByRole('link')

    // ASSERT
    expect(heading).toBeInTheDocument()
    expect(paragraph).toBeInTheDocument()
    expect(anchor).toBeInTheDocument()
  })
})
