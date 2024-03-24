import { labelVariants } from '#shared/components/ui/label';
import { Icon } from '@iconify/react';
import {
  Radio,
  RadioGroup,
  type RadioGroupProps,
  type RadioProps,
} from 'react-aria-components';
import { twMerge } from 'tailwind-merge';

const _RadioGroup = ({
  className,
  orientation = 'vertical',
  ...props
}: RadioGroupProps) => {
  return (
    <RadioGroup
      className={(values) =>
        twMerge(
          orientation === 'vertical' && 'grid gap-2',
          orientation === 'horizontal' && 'flex items-center gap-2',
          typeof className === 'function' ? className(values) : className,
        )
      }
      {...props}
    />
  );
};

export interface _RadioProps extends RadioProps {
  showRadio?: boolean;
}

const _Radio = ({
  className,
  children,
  showRadio = true,
  ...props
}: _RadioProps) => {
  return (
    <Radio
      className={(values) =>
        twMerge(
          'group flex items-center gap-x-2 data-[focused]:outline-none',
          labelVariants(),
          typeof className === 'function' ? className(values) : className,
        )
      }
      {...props}
    >
      {(values) => (
        <>
          {showRadio && (
            <span className="flex aspect-square h-4 w-4 items-center justify-center rounded-full border border-primary text-primary ring-offset-background group-data-[disabled]:opacity-50 group-data-[focus-visible]:ring-2 group-data-[focus-visible]:ring-ring group-data-[focus-visible]:ring-offset-2">
              {values.isSelected && (
                <Icon
                  icon="lucide:circle"
                  className="h-2.5 w-2.5 fill-current text-current"
                />
              )}
            </span>
          )}
          {typeof children === 'function' ? children(values) : children}
        </>
      )}
    </Radio>
  );
};

export { _Radio as Radio, _RadioGroup as RadioGroup };
