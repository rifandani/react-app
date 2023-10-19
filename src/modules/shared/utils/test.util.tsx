import I18nProvider from '@app/providers/i18n/I18nProvider';
import ToastProvider from '@app/providers/toast/ToastProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { RouterProvider, RouterProviderProps } from 'react-router-dom';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      gcTime: 0,
    },
  },
});

export const setupTest = () => {
  const renderProviders = (
    router: RouterProviderProps['router'],
    options?: Parameters<typeof render>[1],
  ) =>
    render(
      <QueryClientProvider client={queryClient}>
        <I18nProvider>
          <ToastProvider>
            <RouterProvider router={router} />
          </ToastProvider>
        </I18nProvider>
      </QueryClientProvider>,
      options,
    );

  return { renderProviders };
};
