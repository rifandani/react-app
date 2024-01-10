import { Icon } from '@iconify/react'
import type { CloseButtonProps } from 'react-toastify'

export function ToastCloseButton({
  type,
  ariaLabel,
  closeToast,
}: CloseButtonProps) {
  return (
    <button
      type="button"
      className={`btn btn-circle btn-ghost btn-xs ${`btn-${type}`}`}
      aria-label={ariaLabel}
      onClick={closeToast}
    >
      <Icon icon="lucide:x" height="1em" />
    </button>
  )
}
