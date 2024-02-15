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

function DaisyMenu() {
  return (
    <ul className="menu rounded-box bg-base-200 lg:menu-horizontal lg:mb-64">
      <li>
        <p>Item 1</p>
      </li>
      <li>
        <details open>
          <summary>Parent item</summary>
          <ul>
            <li>
              <p>level 2 item 1</p>
            </li>
            <li>
              <p>level 2 item 2</p>
            </li>
            <li>
              <details open>
                <summary>Parent</summary>
                <ul>
                  <li>
                    <p>item 1</p>
                  </li>
                  <li>
                    <p>item 2</p>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </details>
      </li>
    </ul>
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

      <div className="divider divider-horizontal">atau</div>

      <DaisyMenu />
    </section>
  );
}
