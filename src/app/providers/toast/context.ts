import { createContext, useState } from 'react';
import { Slide, ToastContainerProps } from 'react-toastify';

export type ToastContextInterface = ReturnType<typeof createToastContext>;

// It's extracted into a function to be able to type the Context before it's even initialized.
export const createToastContext = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [props, setProps] = useState<ToastContainerProps>({
    limit: 5,
    newestOnTop: true,
    position: 'bottom-right',
    transition: Slide,
  });

  const actions = {
    changeTheme: (theme: ToastContainerProps['theme']) => {
      setProps((prev) => ({ ...prev, theme }));
    },
  };

  return [props, actions] as const;
};

export const ToastContext = createContext<ToastContextInterface>(
  {} as ToastContextInterface,
);
