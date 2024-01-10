import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { RouterProviderProps } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'
import { AppToastProvider } from '#app/providers/toast/provider'
import { AppI18nProvider } from '#app/providers/i18n/provider'

export const queryClientTest = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      gcTime: 0,
    },
  },
})

export function setupTest() {
  const renderProviders = (
    router: RouterProviderProps['router'],
    options?: Parameters<typeof render>[1],
  ) => ({
    user: userEvent.setup(),
    providers: render(
      <QueryClientProvider client={queryClientTest}>
        <AppI18nProvider>
          <AppToastProvider>
            <RouterProvider router={router} />
          </AppToastProvider>
        </AppI18nProvider>
      </QueryClientProvider>,
      options,
    ),
  })

  return { renderProviders }
}
