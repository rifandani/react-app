import type { ForwardedRef } from 'react';
import { forwardRef } from 'react';
import { useCheckbox } from 'react-aria';
import type { CheckboxProps } from 'react-aria-components';
import { CheckboxContext, useContextProps } from 'react-aria-components';
import { useToggleState } from 'react-stately';
import { twMerge } from 'tailwind-merge';

interface Props extends CheckboxProps {
  className?: string;
}

export const BaseAriaCheckbox = forwardRef(
  ({ className, ...props }: Props, ref: ForwardedRef<HTMLInputElement>) => {
    // Merge the local props and ref with the ones provided via context.
    // @ts-expect-error weird, we already follow the docs
    // biome-ignore lint/style/noParameterAssign: intended to follow docs
    [props, ref] = useContextProps(props, ref, CheckboxContext);

    const state = useToggleState(props);
    // @ts-expect-error weird, we already follow the docs
    const { inputProps } = useCheckbox(props, state, ref);

    return (
      <input
        {...inputProps}
        ref={ref}
        className={twMerge('checkbox', className)}
      />
    );
  },
);

BaseAriaCheckbox.displayName = 'BaseAriaCheckbox';
