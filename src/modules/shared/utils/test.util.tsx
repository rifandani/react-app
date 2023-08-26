/* eslint-disable no-console */
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { RouterProvider, RouterProviderProps } from 'react-router-dom';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      cacheTime: 0,
    },
  },
  logger: {
    log: console.log,
    warn: console.warn,
    error: console.error,
  },
});

export const setupTest = () => {
  const renderProviders = (
    router: RouterProviderProps['router'],
    options?: Parameters<typeof render>[1],
  ) =>
    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
      options,
    );

  return { renderProviders };
};
