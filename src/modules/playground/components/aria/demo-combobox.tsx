import { Icon } from '@iconify/react';
import type { PropsWithChildren } from 'react';
import { useState } from 'react';
import type {
  ComboBoxProps,
  Key,
  ListBoxItemProps,
} from 'react-aria-components';
import {
  Button,
  ComboBox,
  Group,
  Input,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
  Text,
} from 'react-aria-components';
import { twMerge } from 'tailwind-merge';

interface MyComboBoxProps<T extends object>
  extends Omit<ComboBoxProps<T>, 'children'> {
  label?: string;
  description?: string | null;
  errorMessage?: string | null;
  children: React.ReactNode | ((item: T) => React.ReactNode);
}

function MyComboBox<T extends object>({
  label,
  description,
  errorMessage,
  children,
  className,
  ...props
}: MyComboBoxProps<T>) {
  return (
    <ComboBox
      className={(classProps) =>
        twMerge(
          'group flex flex-col',
          typeof className === 'string' ? className : className?.(classProps),
        )
      }
      {...props}
    >
      <Label className="cursor-default">{label}</Label>

      <Group className="flex rounded-lg border-0 bg-white/90 shadow-md transition rac-focus-within:bg-white/100 rac-focus-visible:ring-2 rac-focus-visible:ring-primary">
        <Input className="w-full flex-1 border-none bg-transparent px-3 py-2 text-base leading-5 text-gray-900 outline-none" />
        <Button className="flex items-center rounded-r-lg border-0 border-l border-solid border-l-gray-300 bg-transparent px-3 text-gray-700 transition rac-pressed:bg-primary-content">
          <Icon icon="lucide:chevrons-up-down" />
        </Button>
      </Group>

      {!props.isInvalid && description && (
        <Text slot="description">{description}</Text>
      )}
      {props.isInvalid && errorMessage && (
        <Text className="text-error" slot="errorMessage">
          {errorMessage}
        </Text>
      )}

      <Popover className="max-h-60 w-[--trigger-width] overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black/5 rac-entering:animate-in rac-entering:fade-in rac-exiting:animate-out rac-exiting:fade-out">
        <ListBox className="p-1 outline-none">{children}</ListBox>
      </Popover>
    </ComboBox>
  );
}

function MyItem(props: PropsWithChildren<ListBoxItemProps>) {
  return (
    <ListBoxItem
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
    </ListBoxItem>
  );
}

export function DemoCombobox() {
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

  const [fieldState, setFieldState] = useState<{
    selectedKey: Key | null | undefined;
    inputValue: string;
  }>({
    selectedKey: null,
    inputValue: '',
  });

  const onSelectionChange = (id: Key) => {
    setFieldState({
      selectedKey: id,
      inputValue: options.find((o) => o.id === id)?.name ?? '',
    });
  };

  const onInputChange = (value: string) => {
    setFieldState((prevState) => ({
      selectedKey: value === '' ? null : prevState.selectedKey,
      inputValue: value,
    }));
  };

  return (
    <section className="flex flex-wrap gap-3 rounded border p-3">
      <div>
        <p>
          Current selected major id:
          {fieldState.selectedKey?.toString()}
        </p>
        <p>
          Current input text:
          {fieldState.inputValue}
        </p>
        <MyComboBox
          className="w-[200px] gap-1"
          label="Pick a engineering major"
          defaultItems={options}
          selectedKey={fieldState.selectedKey}
          inputValue={fieldState.inputValue}
          onSelectionChange={onSelectionChange}
          onInputChange={onInputChange}
        >
          {(item) => <MyItem>{item.name}</MyItem>}
        </MyComboBox>
      </div>
    </section>
  );
}
