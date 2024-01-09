import { QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';
import { queryClient } from './client';

export function AppQueryProvider({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
