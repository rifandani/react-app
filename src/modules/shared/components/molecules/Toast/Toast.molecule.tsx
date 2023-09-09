import { Icon } from '@iconify/react';
import { ToastContentProps } from 'react-toastify';
import { twJoin } from 'tailwind-merge';

export interface ToastData {
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  description?: string;
}

/**
 * Custom toast component, instead of using default from `react-toastify`
 */
export default function Toast({
  closeToast,
  data,
}: ToastContentProps<ToastData>) {
  return (
    <li
      className={twJoin(
        `alert relative block min-w-[20rem] max-w-[20rem] overflow-hidden p-0 shadow-lg`,
        data?.type && `alert-${data.type}`,
      )}
    >
      <div className="flex items-center justify-between p-3">
        <h3
          className={twJoin(
            `font-bold`,
            data?.type && `text-${data.type}-content`,
          )}
        >
          {data?.title}
        </h3>

        <button
          className="btn btn-ghost btn-xs"
          type="button"
          onClick={closeToast}
        >
          <Icon icon="lucide:x" height="1.5em" />
        </button>
      </div>

      {!!data?.description && (
        <p className="line-clamp-3 max-w-[90%] whitespace-pre-wrap break-words px-3 pb-5 text-sm">
          {data.description}
        </p>
      )}
    </li>
  );
}
