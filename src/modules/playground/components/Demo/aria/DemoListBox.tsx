import { useState } from 'react';
import {
  Collection,
  DropIndicator,
  Header,
  Item,
  ListBox,
  Section,
  isFileDropItem,
  isTextDropItem,
  useDragAndDrop,
  type Selection,
} from 'react-aria-components';
import { useListData } from 'react-stately';
import { twJoin, twMerge } from 'tailwind-merge';

interface ImageItem {
  id: number;
  url: string;
  name: string;
}

interface FileItem {
  id: string;
  name: string;
  type: string;
}

interface DndListBoxProps {
  initialItems: FileItem[];
  'aria-label': string;
}

function DndListBox(props: DndListBoxProps) {
  const list = useListData({
    initialItems: props.initialItems,
  });

  const { dragAndDropHooks } = useDragAndDrop({
    // Provide drag data in a custom format as well as plain text.
    getItems(keys) {
      return [...keys].map((key) => {
        const item = list.getItem(key);
        return {
          'custom-app-type': JSON.stringify(item),
          'text/plain': item.name,
        };
      });
    },

    // Accept drops with the custom format.
    acceptedDragTypes: ['custom-app-type'],

    // Ensure items are always moved rather than copied.
    getDropOperation: () => 'move',

    // Handle drops between items from other lists.
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    async onInsert(e) {
      const processedItems = await Promise.all(
        e.items
          .filter(isTextDropItem)
          .map(
            async (item) =>
              JSON.parse(await item.getText('custom-app-type')) as FileItem,
          ),
      );
      if (e.target.dropPosition === 'before') {
        list.insertBefore(e.target.key, ...processedItems);
      } else if (e.target.dropPosition === 'after') {
        list.insertAfter(e.target.key, ...processedItems);
      }
    },

    // Handle drops on the collection when empty.
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    async onRootDrop(e) {
      const processedItems = await Promise.all(
        e.items
          .filter(isTextDropItem)
          .map(
            async (item) =>
              JSON.parse(await item.getText('custom-app-type')) as FileItem,
          ),
      );
      list.append(...processedItems);
    },

    // Handle reordering items within the same list.
    onReorder(e) {
      if (e.target.dropPosition === 'before') {
        list.moveBefore(e.target.key, e.keys);
      } else if (e.target.dropPosition === 'after') {
        list.moveAfter(e.target.key, e.keys);
      }
    },

    // Remove the items from the source list on drop
    // if they were moved to a different list.
    onDragEnd(e) {
      if (e.dropOperation === 'move' && !e.isInternal) {
        list.remove(...e.keys);
      }
    },

    renderDragPreview(items) {
      return (
        <div className="flex items-center gap-3 rounded-md bg-base-300 px-2 py-1 text-base-content">
          {items[0]['text/plain']}
          <span className="badge badge-info">{items.length}</span>
        </div>
      );
    },
    renderDropIndicator(target) {
      return (
        <DropIndicator
          target={target}
          className={() => twJoin(`outline outline-secondary`)}
        />
      );
    },
  });

  return (
    <ListBox
      aria-label={props['aria-label']}
      selectionMode="multiple"
      selectedKeys={list.selectedKeys}
      // eslint-disable-next-line @typescript-eslint/unbound-method
      onSelectionChange={list.setSelectedKeys}
      items={list.items}
      dragAndDropHooks={dragAndDropHooks}
      renderEmptyState={() => 'Drop items here'}
    >
      {(item) => (
        <Item
          className={() =>
            'flex w-full items-center px-3 py-1 rac-selected:bg-primary rac-disabled:text-slate-500 rac-selected:text-primary-content [&>div]:flex'
          }
        >
          {item.name}
        </Item>
      )}
    </ListBox>
  );
}

function SectionListBox() {
  const options = [
    {
      name: 'Australian',
      children: [
        { id: 2, label: 'Koala', description: 'Description...' },
        { id: 3, label: 'Kangaroo', description: 'Description...' },
        { id: 4, label: 'Platypus', description: 'Description...' },
      ],
    },
    {
      name: 'American',
      children: [
        { id: 6, label: 'Bald Eagle', description: 'Description...' },
        { id: 7, label: 'Bison', description: 'Description...' },
        { id: 8, label: 'Skunk', description: 'Description...' },
      ],
    },
  ];
  const [selected, setSelected] = useState<Selection>(new Set());

  return (
    <ListBox
      aria-label="Pick an animal"
      items={options}
      selectedKeys={selected}
      selectionMode="single"
      onSelectionChange={setSelected}
    >
      {(section) => (
        <Section id={section.name}>
          <Header className={twMerge('text-sm tracking-widest')}>
            {section.name}
          </Header>

          <Collection items={section.children}>
            {(item) => (
              <Item className="mb-1 last-of-type:mb-3" textValue={item.label}>
                <p className="font-bold" slot="label">
                  {item.label}
                </p>
                <p className="" slot="description">
                  {item.description}
                </p>
              </Item>
            )}
          </Collection>
        </Section>
      )}
    </ListBox>
  );
}

function ImageListBox() {
  const [items, setItems] = useState<ImageItem[]>([]);

  const { dragAndDropHooks } = useDragAndDrop({
    acceptedDragTypes: ['image/jpeg', 'image/png'],
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    async onRootDrop(e) {
      const newItems = await Promise.all(
        e.items.filter(isFileDropItem).map(async (item) => ({
          id: Math.random(),
          url: URL.createObjectURL(await item.getFile()),
          name: item.name,
        })),
      );
      setItems(newItems);
    },
  });

  return (
    <ListBox
      className="flex h-36 w-56 items-center justify-center rounded-md border p-3"
      aria-label="Droppable list"
      items={items}
      dragAndDropHooks={dragAndDropHooks}
      renderEmptyState={() => 'Drop images here'}
    >
      {(item) => (
        <Item className="avatar" textValue={item.name}>
          <div className="max-w-24 max-h-24">
            <img className="" src={item.url} alt="list box" />
          </div>
          <span>{item.name}</span>
        </Item>
      )}
    </ListBox>
  );
}

export default function DemoListBox() {
  return (
    <section className="flex flex-wrap gap-3">
      <DndListBox
        aria-label="First ListBox"
        initialItems={[
          { id: '1', type: 'file', name: 'Adobe Photoshop' },
          { id: '2', type: 'file', name: 'Adobe XD' },
          { id: '3', type: 'folder', name: 'Documents' },
          { id: '4', type: 'file', name: 'Adobe InDesign' },
          { id: '5', type: 'folder', name: 'Utilities' },
          { id: '6', type: 'file', name: 'Adobe AfterEffects' },
        ]}
      />
      <DndListBox
        aria-label="Second ListBox"
        initialItems={[
          { id: '7', type: 'folder', name: 'Pictures' },
          { id: '8', type: 'file', name: 'Adobe Fresco' },
          { id: '9', type: 'folder', name: 'Apps' },
          { id: '10', type: 'file', name: 'Adobe Illustrator' },
          { id: '11', type: 'file', name: 'Adobe Lightroom' },
          { id: '12', type: 'file', name: 'Adobe Dreamweaver' },
        ]}
      />

      <div className="divider divider-horizontal">atau</div>

      <SectionListBox />

      <div className="divider divider-horizontal">atau</div>

      <ImageListBox />
    </section>
  );
}
