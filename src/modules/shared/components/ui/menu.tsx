import { Icon } from '@iconify/react';
import type * as React from 'react';
import {
  Header,
  Keyboard,
  Menu,
  MenuItem,
  MenuTrigger,
  Popover,
  Section,
  Separator,
  type MenuItemProps,
  type MenuProps,
  type PopoverProps,
  type SeparatorProps,
} from 'react-aria-components';
import { twMerge } from 'tailwind-merge';

const _MenuTrigger = MenuTrigger;

const MenuSection = Section;

const MenuPopover = ({ className, offset = 4, ...props }: PopoverProps) => (
  <Popover
    offset={offset}
    className={(values) =>
      twMerge(
        'z-50 min-w-[8rem] overflow-y-auto rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[entering]:animate-in data-[exiting]:animate-out data-[entering]:fade-in-0 data-[exiting]:fade-out-0 data-[exiting]:zoom-out-95 data-[placement=bottom]:slide-in-from-top-2 data-[placement=left]:slide-in-from-right-2 data-[placement=right]:slide-in-from-left-2 data-[placement=top]:slide-in-from-bottom-2',
        typeof className === 'function' ? className(values) : className,
      )
    }
    {...props}
  />
);

const _Menu = <T extends object>({ className, ...props }: MenuProps<T>) => (
  <Menu className={twMerge('outline-none', className)} {...props} />
);

interface _MenuItemProps extends MenuItemProps {
  inset?: boolean;
}

const _MenuItem = ({ className, inset, ...props }: _MenuItemProps) => (
  <MenuItem
    className={(values) =>
      twMerge(
        'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[focused]:bg-accent data-[focused]:text-accent-foreground data-[disabled]:opacity-50',
        inset && 'pl-8',
        typeof className === 'function' ? className(values) : className,
      )
    }
    {...props}
  />
);

export interface MenuHeaderProps
  extends React.ComponentPropsWithoutRef<typeof Header> {
  inset?: boolean;
  separator?: boolean;
}

const MenuHeader = ({
  className,
  inset,
  separator = false,
  ...props
}: MenuHeaderProps) => (
  <Header
    className={twMerge(
      'px-2 py-1.5 text-sm font-semibold',
      inset && 'pl-8',
      separator && '-mx-1 mb-1 border-b border-b-border px-3 pb-[0.625rem]',
      className,
    )}
    {...props}
  />
);

const MenuSeparator = ({ className, ...props }: SeparatorProps) => (
  <Separator
    className={twMerge('-mx-1 my-1 h-px bg-muted', className)}
    {...props}
  />
);

const MenuKeyboard = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <Keyboard
      className={twMerge(
        'ml-auto text-xs tracking-widest opacity-60',
        className,
      )}
      {...props}
    />
  );
};

const MenuCheckboxItem = ({ className, children, ...props }: MenuItemProps) => (
  <MenuItem
    className={(values) =>
      twMerge(
        'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[focused]:bg-accent data-[focused]:text-accent-foreground data-[disabled]:opacity-50',
        typeof className === 'function' ? className(values) : className,
      )
    }
    {...props}
  >
    {(values) => (
      <>
        <span className="absolute left-2 flex h-4 w-4 items-center justify-center">
          {values.isSelected && (
            <Icon icon="lucide:check" className="h-4 w-4" />
          )}
        </span>

        {typeof children === 'function' ? children(values) : children}
      </>
    )}
  </MenuItem>
);

const MenuRadioItem = ({ className, children, ...props }: MenuItemProps) => (
  <MenuItem
    className={(values) =>
      twMerge(
        'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[focused]:bg-accent data-[focused]:text-accent-foreground data-[disabled]:opacity-50',
        typeof className === 'function' ? className(values) : className,
      )
    }
    {...props}
  >
    {(values) => (
      <>
        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
          {values.isSelected && (
            <Icon icon="lucide:circle" className="h-2 w-2 fill-current" />
          )}
        </span>
        {typeof children === 'function' ? children(values) : children}
      </>
    )}
  </MenuItem>
);

export {
  _Menu as Menu,
  MenuCheckboxItem,
  MenuHeader,
  _MenuItem as MenuItem,
  MenuKeyboard,
  MenuPopover,
  MenuRadioItem,
  MenuSection,
  MenuSeparator,
  _MenuTrigger as MenuTrigger,
};
export type { _MenuItemProps as MenuItemProps };
