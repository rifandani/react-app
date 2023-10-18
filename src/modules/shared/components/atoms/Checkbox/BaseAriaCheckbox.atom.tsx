import { ForwardedRef, forwardRef } from 'react';
import { AriaCheckboxProps, useCheckbox } from 'react-aria';
import { CheckboxContext, useContextProps } from 'react-aria-components';
import { useToggleState } from 'react-stately';
import { twMerge } from 'tailwind-merge';

interface Props extends AriaCheckboxProps {
  className?: string;
}

const BaseAriaCheckbox = forwardRef(
  ({ className, ...props }: Props, ref: ForwardedRef<HTMLInputElement>) => {
    // Merge the local props and ref with the ones provided via context.
    // eslint-disable-next-line no-param-reassign
    [props, ref] = useContextProps(props, ref, CheckboxContext);

    const state = useToggleState(props);
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

export default BaseAriaCheckbox;
