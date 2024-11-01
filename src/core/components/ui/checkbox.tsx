import { labelVariants } from '#/core/components/ui/label';
import { Icon } from '@iconify/react';
import {
  Checkbox,
  CheckboxGroup,
  type CheckboxProps,
} from 'react-aria-components';
import { twMerge } from 'tailwind-merge';

const _CheckboxGroup = CheckboxGroup;

const _Checkbox = ({ className, children, ...props }: CheckboxProps) => (
  <Checkbox
    className={(values) =>
      twMerge(
        'group flex items-center gap-x-2 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 ',
        labelVariants(),
        typeof className === 'function' ? className(values) : className,
      )
    }
    {...props}
  >
    {(values) => (
      <>
        <div className="h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background group-data-[indeterminate]:bg-primary group-data-[selected]:bg-primary  group-data-[indeterminate]:text-primary-foreground group-data-[selected]:text-primary-foreground group-data-[focus-visible]:outline-none group-data-[focus-visible]:ring-2 group-data-[focus-visible]:ring-ring group-data-[focus-visible]:ring-offset-2">
          {values.isIndeterminate ? (
            <Icon icon="lucide:minus" className="h-[0.875rem] w-[0.875rem]" />
          ) : values.isSelected ? (
            <Icon icon="lucide:check" className="h-4 w-[0.875rem]" />
          ) : null}
        </div>
        {typeof children === 'function' ? children(values) : children}
      </>
    )}
  </Checkbox>
);

export { _Checkbox as Checkbox, _CheckboxGroup as CheckboxGroup };
