import { Icon } from "@iconify/react";
import { CloseButtonProps } from "react-toastify";

export default function ToastCloseButton({
  type,
  ariaLabel,
  closeToast,
}: CloseButtonProps) {
  return (
    <button
      type="button"
      className={`btn btn-xs ${`btn-${type}`}`}
      aria-label={ariaLabel}
      onClick={closeToast}
    >
      <Icon icon="lucide:x" height="1em" />
    </button>
  );
}
