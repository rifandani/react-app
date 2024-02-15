import { Icon } from '@iconify/react';
import type { ComponentPropsWithoutRef } from 'react';
import type { CloseButton } from 'react-toastify';

export function ToastCloseButton({
  type,
  ariaLabel,
  closeToast,
}: ComponentPropsWithoutRef<typeof CloseButton>) {
  return (
    <button
      type="button"
      className={`btn btn-circle btn-ghost btn-xs ${`btn-${type}`}`}
      aria-label={ariaLabel}
      onClick={closeToast}
    >
      <Icon icon="lucide:x" height="1em" />
    </button>
  );
}
