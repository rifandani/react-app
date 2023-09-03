import { Icon } from '@iconify/react';
import type { AriaToastProps } from '@react-aria/toast';
import { useToast } from '@react-aria/toast';
import { ToastState } from '@react-stately/toast';
import { useRef } from 'react';

export interface ToastParams {
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  description?: string;
}
interface ToastProps<T> extends AriaToastProps<T> {
  state: ToastState<T>;
}

export default function Toast<T extends ToastParams>({
  state,
  ...props
}: ToastProps<T>) {
  const ref = useRef(null);
  const { toastProps, titleProps, descriptionProps, closeButtonProps } =
    useToast(props, state, ref);

  return (
    <li
      className={`alert relative block min-w-[20rem] max-w-[20rem] overflow-hidden p-0 shadow-lg ${`alert-${props.toast.content.type}`}`}
      {...toastProps}
    >
      <div className="flex items-center justify-between p-3">
        <h3
          className={`font-bold ${`text-${props.toast.content.type}-content`}`}
          {...titleProps}
        >
          {props.toast.content.title}
        </h3>

        <button
          className="btn btn-ghost btn-xs"
          type="button"
          {...closeButtonProps}
        >
          <Icon icon="lucide:x" height="1.5em" />
        </button>
      </div>

      {props.toast.content.description && (
        <p
          className="line-clamp-3 max-w-[90%] whitespace-pre-wrap break-words px-3 pb-5 text-sm"
          {...descriptionProps}
        >
          {props.toast.content.description}
        </p>
      )}

      {/* TODO: "beta" still doesn't support progress bar */}
      {props.toast.timeout && Number.isFinite(props.toast.timeout) && (
        <progress
          className={`progress absolute bottom-0 ${`progress-${props.toast.content.type}`}`}
          value={props.toast.timeout}
          max={props.toast.timeout}
        />
      )}
    </li>
  );
}
