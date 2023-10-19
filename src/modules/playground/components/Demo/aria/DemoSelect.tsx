import { Icon } from '@iconify/react';
import { Key, PropsWithChildren, useState } from 'react';
import {
  Button,
  Item,
  ItemProps,
  Label,
  ListBox,
  Popover,
  Select,
  SelectProps,
  SelectValue,
  Text,
} from 'react-aria-components';
import { twMerge } from 'tailwind-merge';

interface MySelectProps<T extends object>
  extends Omit<SelectProps<T>, 'children'> {
  label?: string;
  description?: string;
  errorMessage?: string;
  items?: Iterable<T>;
  children: React.ReactNode | ((item: T) => React.ReactNode);
}

function MySelect<T extends object>({
  label,
  description,
  errorMessage,
  children,
  className,
  ...props
}: MySelectProps<T>) {
  return (
    <Select
      className={(classProps) =>
        twMerge(
          'group flex flex-col',
          typeof className === 'string' ? className : className?.(classProps),
        )
      }
      {...props}
    >
      <Label className="cursor-default">{label}</Label>

      <Button className="flex cursor-default items-center rounded-lg border-0 bg-white/90 py-2 pl-5 pr-2 text-left text-base leading-normal text-gray-700 shadow-md ring-white ring-offset-2 ring-offset-primary transition rac-focus:outline-none rac-focus-visible:ring-2 rac-pressed:bg-white/100">
        <SelectValue className="flex-1 truncate rac-placeholder-shown:italic" />
        <Icon icon="lucide:chevrons-up-down" />
      </Button>

      {!props.isInvalid && description && (
        <Text slot="description">{description}</Text>
      )}
      {props.isInvalid && errorMessage && (
        <Text className="text-error" slot="errorMessage">
          {errorMessage}
        </Text>
      )}

      <Popover className="max-h-60 w-[--trigger-width] overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black/5 rac-entering:animate-in rac-entering:fade-in rac-exiting:animate-out rac-exiting:fade-out">
        <ListBox className="p-1 outline-none" items={props.items}>
          {children}
        </ListBox>
      </Popover>
    </Select>
  );
}

function DaisySelect() {
  return (
    <div className="form-control w-full max-w-xs">
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className="label">
        <span className="label-text">Pick the best fantasy franchise</span>
        <span className="label-text-alt">Alt label</span>
      </label>

      <select className="select select-bordered" defaultValue="">
        <option disabled value="none">
          Pick one
        </option>
        <option value="star-wars">Star Wars</option>
        <option value="harry-potter">Harry Potter</option>
        <option value="lord-of-the-rings">Lord of the Rings</option>
      </select>

      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className="label">
        <span className="label-text-alt">Alt label</span>
        <span className="label-text-alt">Alt label</span>
      </label>
    </div>
  );
}

function MyItem(props: PropsWithChildren<ItemProps>) {
  return (
    <Item
      {...props}
      className="group flex cursor-default select-none items-center gap-2 rounded py-2 pl-2 pr-4 text-gray-900 outline-none rac-focus:bg-primary rac-focus:text-white"
    >
      {({ isSelected }) => (
        <>
          <span className="rac-group-selected:font-medium flex flex-1 items-center gap-3 truncate font-normal">
            {props.children}
          </span>

          {isSelected && (
            <span className="rac-group-focus:text-white flex w-5 items-center text-primary">
              <Icon icon="lucide:check" />
            </span>
          )}
        </>
      )}
    </Item>
  );
}

export default function DemoSelect() {
  const options = [
    { id: 1, name: 'Aerospace' },
    { id: 2, name: 'Mechanical' },
    { id: 3, name: 'Civil' },
    { id: 4, name: 'Biomedical' },
    { id: 5, name: 'Nuclear' },
    { id: 6, name: 'Industrial' },
    { id: 7, name: 'Chemical' },
    { id: 8, name: 'Agricultural' },
    { id: 9, name: 'Electrical' },
  ];

  const [selected, setSelected] = useState<Key | null>(null);

  return (
    <section className="flex flex-wrap gap-3 rounded border p-3">
      <div>
        <p>Current selected major: {selected?.toString()}</p>
        <MySelect
          className="w-[200px] gap-1"
          label="Pick a engineering major"
          items={options}
          selectedKey={selected}
          onSelectionChange={setSelected}
        >
          {(item) => (
            <MyItem id={item.id} textValue={item.name}>
              {item.name}
            </MyItem>
          )}
        </MySelect>
      </div>

      <DaisySelect />
    </section>
  );
}
