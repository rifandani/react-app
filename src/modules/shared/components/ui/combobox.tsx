import { Icon } from '@iconify/react';
import type * as React from 'react';
import {
  Button,
  Collection,
  ComboBox,
  Group,
  Header,
  Input,
  ListBox,
  ListBoxItem,
  Popover,
  Section,
  Separator,
  type InputProps,
  type ListBoxItemProps,
  type ListBoxProps,
  type PopoverProps,
  type SeparatorProps,
} from 'react-aria-components';
import { twMerge } from 'tailwind-merge';

const Combobox = ComboBox;

const ComboboxSection = Section;

const ComboboxCollection = Collection;

const ComboboxInput = ({ className, ...props }: InputProps) => (
  <Group
    className={twMerge(
      'group flex h-10 items-center  justify-between overflow-hidden rounded-md border border-input bg-background text-sm ring-offset-background data-[focus-within]:outline-none data-[focus-within]:ring-2 data-[focus-within]:ring-ring data-[focus-within]:ring-offset-2 group-data-[disabled]:cursor-not-allowed group-data-[disabled]:opacity-50',
    )}
  >
    <Input
      className={(values) =>
        twMerge(
          'flex w-full bg-background px-3 py-2 text-sm placeholder:text-muted-foreground data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[focused]:outline-none',
          typeof className === 'function' ? className(values) : className,
        )
      }
      {...props}
    />
    <Button className="pr-3">
      <Icon
        icon="lucide:chevrons-up-down"
        aria-hidden="true"
        className="h-4 w-4 opacity-50"
      />
    </Button>
  </Group>
);

export interface ComboboxLabelProps
  extends React.ComponentPropsWithoutRef<typeof Header> {
  separator?: boolean;
  offset?: boolean;
}

const ComboboxLabel = ({
  className,
  separator = false,
  offset = false,
  ...props
}: ComboboxLabelProps) => (
  <Header
    className={twMerge(
      ' py-1.5 pl-8 pr-2 text-sm font-semibold',
      separator && '-mx-1 mb-1 border-b border-b-border px-3 pb-[0.625rem]',
      offset && 'px-3',
      className,
    )}
    {...props}
  />
);

const ComboboxItem = ({ className, children, ...props }: ListBoxItemProps) => (
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

const ComboboxSeparator = ({ className, ...props }: SeparatorProps) => (
  <Separator
    className={twMerge('-mx-1 my-1 h-px bg-muted', className)}
    {...props}
  />
);

const ComboboxPopover = ({ className, ...props }: PopoverProps) => (
  <Popover
    className={(values) =>
      twMerge(
        'relative z-50 w-[--trigger-width]  overflow-y-auto rounded-md border bg-popover text-popover-foreground shadow-md data-[entering]:animate-in data-[exiting]:animate-out data-[entering]:fade-in-0 data-[exiting]:fade-out-0 data-[exiting]:zoom-out-95 data-[placement=bottom]:slide-in-from-top-2 data-[placement=left]:slide-in-from-right-2 data-[placement=right]:slide-in-from-left-2 data-[placement=top]:slide-in-from-bottom-2',
        'data-[placement=bottom]:translate-y-1 data-[placement=left]:-translate-x-1 data-[placement=right]:translate-x-1 data-[placement=top]:-translate-y-1',
        typeof className === 'function' ? className(values) : className,
      )
    }
    {...props}
  />
);

const ComboboxListBox = <T extends object>({
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
  Combobox,
  ComboboxCollection,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxListBox,
  ComboboxPopover,
  ComboboxSection,
  ComboboxSeparator,
};
