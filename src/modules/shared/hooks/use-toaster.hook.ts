import { ToastContext } from '@app/providers/toast/context';
import { useContext } from 'react';

export function useToaster() {
  const context = useContext(ToastContext);
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!context) {
    throw new Error('useToaster: cannot find the ToastContext');
  }

  return context;
}
