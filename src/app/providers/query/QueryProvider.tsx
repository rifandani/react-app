import { QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';
import { queryClient } from './queryClient';

export default function AppQueryProvider({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
