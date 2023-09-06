import { ToastContext } from '@app/providers/toast/ToastProvider';
import { useContext } from 'react';

export default function useToaster() {
  const context = useContext(ToastContext);
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!context) {
    throw new Error('useToast: cannot find the ToastContext');
  }

  return context;
}
