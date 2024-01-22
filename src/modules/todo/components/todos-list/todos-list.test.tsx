import { screen, waitFor } from '@testing-library/react'
import { HttpResponse } from 'msw'
import type { RouteObject } from 'react-router-dom'
import { createMemoryRouter } from 'react-router-dom'
import { TodosList } from './todos-list'
import { setupTest } from '#shared/utils/test.util'
import { getBaseUrl } from '#mocks/util.mock'
import { http, server } from '#mocks/http/server.http'

describe('<TodosList />', () => {
  const { renderProviders } = setupTest()
  const routes = [
    {
      path: '/todos',
      element: <TodosList />,
    },
  ] satisfies RouteObject[]
  const router = createMemoryRouter(routes, {
    initialEntries: ['/todos'],
    initialIndex: 0,
  })
  const loadingId = 'list-loading'

  it('should render properly', () => {
    const view = renderProviders(router)
    expect(() => view).not.toThrow()
  })

  it('should be able to query and show error alert', async () => {
    // ARRANGE
    server.use(
      http.get(
        getBaseUrl('todos'),
        () => HttpResponse.json({ message: 'error' }, { status: 500 }),
        { once: true },
      ),
    )

    // ASSERT
    expect(screen.queryByTestId(loadingId)).not.toBeInTheDocument()
    renderProviders(router)
    await waitFor(() => {
      // wait for appearance inside an assertion
      expect(screen.getByTestId(loadingId))
    })
  })
})
