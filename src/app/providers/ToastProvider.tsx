import { AriaToastRegionProps } from '@react-aria/toast';
import { ToastState, useToastState } from '@react-stately/toast';
import { PropsWithChildren, createContext } from 'react';
import { ToastParams } from './Toast';
import ToastRegion from './ToastRegion';

interface ToastProviderProps extends AriaToastRegionProps, PropsWithChildren {}
export type ToastContextInterface = ReturnType<typeof createToastContext>;

// It's extracted into a function to be able to type the Context before it's even initialized.
const createToastContext = ({
  visibleToasts,
  add,
  close,
  pauseAll,
  remove,
  resumeAll,
}: ToastState<ToastParams>) => {
  const actions = {
    add,
    close,
    pauseAll,
    remove,
    resumeAll,
  };

  return [visibleToasts, actions] as const;
};

export const ToastContext = createContext<ToastContextInterface>(
  {} as ToastContextInterface,
);

export default function ToastProvider({
  children,
  ...props
}: ToastProviderProps) {
  const state = useToastState<ToastParams>({
    maxVisibleToasts: 5,
  });
  const value = createToastContext(state);

  return (
    <ToastContext.Provider value={value}>
      {children}

      {state.visibleToasts.length > 0 && (
        <ToastRegion {...props} state={state} />
      )}
    </ToastContext.Provider>
  );
}
