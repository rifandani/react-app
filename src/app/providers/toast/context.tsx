import { useColorMode } from '#shared/hooks/use-color-mode.hook';
import { useResetState } from '#shared/hooks/use-reset-state.hook';
import { createContext, useMemo, type ComponentPropsWithoutRef } from 'react';
import type { Toaster } from 'sonner';
import { twMerge } from 'tailwind-merge';

export type ToastContextInterface = ReturnType<typeof createToastContext>;
type ToasterProps = ComponentPropsWithoutRef<typeof Toaster>;

// It's extracted into a function to be able to type the Context before it's even initialized.
export function createToastContext() {
  const [theme] = useColorMode({});
  const [props, setProps, resetProps] = useResetState<ToasterProps>({
    duration: 3_000,
    position: 'bottom-right',
    cn: twMerge,
    theme: theme === 'auto' ? 'system' : theme,
    className: 'toaster group',
    toastOptions: {
      classNames: {
        toast:
          'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
        description: 'group-[.toast]:text-muted-foreground',
        actionButton:
          'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
        cancelButton:
          'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
      },
    },
  });

  const actions = {
    setProps,
    resetProps,
  };

  return useMemo(() => [props, actions] as const, [props, actions]);
}

export const ToastContext = createContext<ToastContextInterface>(
  {} as ToastContextInterface,
);
