import { AriaToastRegionProps, useToastRegion } from '@react-aria/toast';
import { ToastState } from '@react-stately/toast';
import { useRef } from 'react';
import Toast, { ToastParams } from './Toast';

export interface ToastRegionProps<T> extends AriaToastRegionProps {
  state: ToastState<T>;
}

export default function ToastRegion<T extends ToastParams>({
  state,
  ...props
}: ToastRegionProps<T>) {
  const ref = useRef(null);
  const { regionProps } = useToastRegion(props, state, ref);

  return (
    <ul {...regionProps} ref={ref} className="toast z-20">
      {state.visibleToasts.map((toast) => (
        <Toast key={toast.key} toast={toast} state={state} />
      ))}
    </ul>
  );
}
