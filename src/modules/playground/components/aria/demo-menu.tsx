import type {
  MenuItemProps,
  MenuProps,
  MenuTriggerProps,
} from 'react-aria-components';
import {
  Button,
  Menu,
  MenuItem,
  MenuTrigger,
  Popover,
} from 'react-aria-components';
import { twMerge } from 'tailwind-merge';

interface MyMenuButtonProps<T>
  extends MenuProps<T>,
    Omit<MenuTriggerProps, 'children'> {
  label?: string;
}

function MyMenuButton<T extends object>({
  label,
  children,
  ...props
}: MyMenuButtonProps<T>) {
  return (
    <MenuTrigger {...props}>
      <Button className="btn btn-sm">{label}</Button>
      <Popover>
        <Menu {...props} className="menu rounded-box bg-base-200">
          {children}
        </Menu>
      </Popover>
    </MenuTrigger>
  );
}

function MyItem(props: MenuItemProps) {
  return (
    <MenuItem
      {...props}
      className={({ isFocused }) =>
        twMerge('min-w-[5rem]', isFocused && 'focused')
      }
    />
  );
}

export function DemoMenu() {
  return (
    <section className="flex flex-wrap gap-3">
      <MyMenuButton label="Edit">
        <MyItem>Cut</MyItem>
        <MyItem>Copy</MyItem>
        <MyItem>Paste</MyItem>
      </MyMenuButton>
    </section>
  );
}
