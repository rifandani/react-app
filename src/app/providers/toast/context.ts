import { useResetState } from '@shared/hooks/use-reset-state.hook';
import { createContext } from 'react';
import { Slide, ToastContainerProps } from 'react-toastify';
import { ToastCloseButton } from './close-button';

export type ToastContextInterface = ReturnType<typeof createToastContext>;

// It's extracted into a function to be able to type the Context before it's even initialized.
export const createToastContext = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [props, setProps, resetProps] = useResetState<ToastContainerProps>({
    limit: 5,
    autoClose: 3_000,
    newestOnTop: true,
    position: 'bottom-right',
    transition: Slide,
    toastClassName: 'rounded-[var(--rounded-box)]',
    closeButton: ToastCloseButton,
  });

  const actions = {
    changeTheme: (theme: ToastContainerProps['theme']) => {
      setProps((prev) => ({ ...prev, theme }));
    },
    resetTheme: resetProps,
  };

  return [props, actions] as const;
};

export const ToastContext = createContext<ToastContextInterface>(
  {} as ToastContextInterface,
);
