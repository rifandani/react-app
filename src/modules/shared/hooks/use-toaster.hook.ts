import { useContext } from 'react';
import { ToastContext } from '#app/providers/toast/context';

export function useToaster() {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToaster: cannot find the ToastContext');

  return context;
}
