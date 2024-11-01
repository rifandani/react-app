import { Icon } from '@iconify/react';
import type * as React from 'react';
import {
  Button,
  Collection,
  Header,
  ListBox,
  ListBoxItem,
  Popover,
  Section,
  Select,
  SelectValue,
  Separator,
  type ButtonProps,
  type ListBoxItemProps,
  type ListBoxProps,
  type PopoverProps,
  type SelectValueProps,
  type SeparatorProps,
} from 'react-aria-components';
import { twMerge } from 'tailwind-merge';

const _Select = Select;

const SelectSection = Section;

const SelectCollection = Collection;

const _SelectValue = <T extends object>({
  className,
  ...props
}: SelectValueProps<T>) => (
  <SelectValue
    className={(values) =>
      twMerge(
        'data-[placeholder]:text-muted-foreground',
        typeof className === 'function' ? className(values) : className,
      )
    }
    {...props}
  />
);

const SelectTrigger = ({ className, children, ...props }: ButtonProps) => (
  <Button
    className={(values) =>
      twMerge(
        'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[focused]:outline-none data-[focused]:ring-2 data-[focused]:ring-ring data-[focused]:ring-offset-2',
        typeof className === 'function' ? className(values) : className,
      )
    }
    {...props}
  >
    {(values) => (
      <>
        {typeof children === 'function' ? children(values) : children}
        <Icon
          icon="lucide:chevron-down"
          aria-hidden="true"
          className="h-4 w-4 opacity-50"
        />
      </>
    )}
  </Button>
);

const SelectHeader = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Header>) => (
  <Header
    className={twMerge(' py-1.5 pl-8 pr-2 text-sm font-semibold', className)}
    {...props}
  />
);

const SelectItem = ({ className, children, ...props }: ListBoxItemProps) => (
  <ListBoxItem
    className={(values) =>
      twMerge(
        'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[focused]:bg-accent data-[focused]:text-accent-foreground data-[disabled]:opacity-50',
        typeof className === 'function' ? className(values) : className,
      )
    }
    {...props}
  >
    {(values) => (
      <>
        {values.isSelected && (
          <span className="absolute left-2 flex h-4 w-4 items-center justify-center">
            <Icon icon="lucide:check" className="h-4 w-4" />
          </span>
        )}
        {typeof children === 'function' ? children(values) : children}
      </>
    )}
  </ListBoxItem>
);

const SelectSeparator = ({ className, ...props }: SeparatorProps) => (
  <Separator
    className={twMerge('-mx-1 my-1 h-px bg-muted', className)}
    {...props}
  />
);

const SelectPopover = ({ className, offset = 0, ...props }: PopoverProps) => (
  <Popover
    offset={offset}
    className={(values) =>
      twMerge(
        'relative z-50 w-[--trigger-width] min-w-[8rem] overflow-y-auto rounded-md border bg-popover text-popover-foreground shadow-md data-[entering]:animate-in data-[exiting]:animate-out data-[entering]:fade-in-0 data-[exiting]:fade-out-0 data-[exiting]:zoom-out-95',
        'data-[placement=bottom]:slide-in-from-top-2 data-[placement=left]:slide-in-from-right-2 data-[placement=right]:slide-in-from-left-2 data-[placement=top]:slide-in-from-bottom-2 data-[placement=bottom]:translate-y-1 data-[placement=left]:-translate-x-1 data-[placement=right]:translate-x-1 data-[placement=top]:-translate-y-1',
        typeof className === 'function' ? className(values) : className,
      )
    }
    {...props}
  />
);

const SelectContent = <T extends object>({
  className,
  ...props
}: ListBoxProps<T>) => (
  <ListBox
    className={(values) =>
      twMerge(
        'p-1',
        typeof className === 'function' ? className(values) : className,
      )
    }
    {...props}
  />
);

export {
  _Select as Select,
  SelectCollection,
  SelectContent,
  SelectHeader,
  SelectItem,
  SelectPopover,
  SelectSection,
  SelectSeparator,
  SelectTrigger,
  _SelectValue as SelectValue,
};
export type { PopoverProps as SelectPopoverProps };
