import { Icon } from '@iconify/react/dist/iconify.js';
import { useState } from 'react';
import {
  Button,
  Label,
  Selection,
  Tag,
  TagGroup,
  TagGroupProps,
  TagList,
  TagListProps,
  TagProps,
} from 'react-aria-components';
import { useListData } from 'react-stately';

interface MyTagGroupProps<T>
  extends Omit<TagGroupProps, 'children'>,
    Pick<TagListProps<T>, 'items' | 'children' | 'renderEmptyState'> {
  label?: string;
  description?: string;
  errorMessage?: string;
}

function MyTagGroup<T extends object>({
  label,
  description,
  errorMessage,
  items,
  children,
  renderEmptyState,
  ...props
}: MyTagGroupProps<T>) {
  return (
    <TagGroup {...props}>
      <Label>{label}</Label>
      <TagList
        items={items}
        renderEmptyState={renderEmptyState}
        className="grid grid-flow-col gap-3"
      >
        {children}
      </TagList>

      {description && <p slot="description">{description}</p>}
      {errorMessage && <p slot="errorMessage">{errorMessage}</p>}
    </TagGroup>
  );
}

function MyTag({ children, ...props }: TagProps) {
  const textValue = typeof children === 'string' ? children : undefined;

  return (
    <Tag textValue={textValue} {...props}>
      {({ allowsRemoving }) => (
        <>
          {children}
          {allowsRemoving && (
            <Button
              className="btn btn-circle btn-ghost btn-xs px-1"
              slot="remove"
            >
              <Icon icon="lucide:x" color="red" />
            </Button>
          )}
        </>
      )}
    </Tag>
  );
}

export default function DemoTagGroup() {
  const list = useListData({
    initialItems: [
      { id: 1, name: 'News' },
      { id: 2, name: 'Travel' },
      { id: 3, name: 'Gaming' },
      { id: 4, name: 'Shopping' },
    ],
  });

  const [selected, setSelected] = useState<Selection>(new Set(['News']));

  return (
    <section className="flex flex-wrap gap-3">
      <MyTagGroup
        className="flex flex-col gap-3 rounded border p-3"
        label="Tag Groups: Categories"
        selectionMode="multiple"
        selectedKeys={selected}
        onSelectionChange={setSelected}
        items={list.items}
        onRemove={(keys) => {
          list.remove(...keys);
        }}
      >
        {(item) => (
          <MyTag className="rounded border px-2 py-1 aria-selected:bg-primary aria-selected:text-primary-content [&>div]:flex [&>div]:items-center [&>div]:gap-3">
            {item.name}
          </MyTag>
        )}
      </MyTagGroup>
    </section>
  );
}
