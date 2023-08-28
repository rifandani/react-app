import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';
import I18nProvider from './providers/I18nProvider';
import ToastProvider from './providers/ToastProvider';

const client = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1_000 * 30, // 30 secs. This will be the default in v5
    },
  },
});

export default function AppProviders({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={client}>
      <I18nProvider>
        <ToastProvider>{children}</ToastProvider>
      </I18nProvider>
    </QueryClientProvider>
  );
}
