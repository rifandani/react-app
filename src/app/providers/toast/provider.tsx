import type { PropsWithChildren } from 'react';
import { Toaster } from 'sonner';
import { ToastContext, createToastContext } from './context';

export function AppToastProvider({ children }: PropsWithChildren) {
  const value = createToastContext();

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Toaster {...value[0]} />
    </ToastContext.Provider>
  );
}
