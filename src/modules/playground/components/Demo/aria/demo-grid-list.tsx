import { Icon } from '@iconify/react';
import { isFunction } from '@rifandani/nxact-yutiriti';
import { AriaCheckbox } from '@shared/components/checkbox/aria-checkbox';
import {
  Button,
  DropIndicator,
  GridList,
  GridListItem,
  GridListItemProps,
  useDragAndDrop,
} from 'react-aria-components';
import { useListData } from 'react-stately';
import { twJoin, twMerge } from 'tailwind-merge';

function MyGridListItem({ children, ...props }: GridListItemProps) {
  const textValue = typeof children === 'string' ? children : undefined;

  return (
    <GridListItem
      className="flex w-full items-center px-3 py-1 rac-selected:bg-primary rac-selected:text-primary-content rac-disabled:text-slate-500 [&>div]:flex"
      textValue={textValue}
      {...props}
    >
      {(item) => (
        <>
          {/* Add elements for drag and drop and selection. */}
          {item.allowsDragging && (
            <Button slot="drag" className="btn btn-ghost btn-xs pl-0">
              <Icon icon="lucide:menu" />
            </Button>
          )}

          {item.selectionMode === 'multiple' &&
            item.selectionBehavior === 'toggle' && (
              <AriaCheckbox
                slot="selection"
                aria-label={`gridlist-checkbox-${props.id}`}
                isSelected={item.isSelected}
              />
            )}

          {isFunction(children) ? children(item) : children}
        </>
      )}
    </GridListItem>
  );
}

function DraggableGridList() {
  const list = useListData({
    initialItems: [
      { id: 1, name: 'Adobe Photoshop' },
      { id: 2, name: 'Adobe XD' },
      { id: 3, name: 'Adobe Dreamweaver' },
      { id: 4, name: 'Adobe InDesign' },
      { id: 5, name: 'Adobe Connect' },
    ],
  });

  const { dragAndDropHooks } = useDragAndDrop({
    getItems: (keys) =>
      [...keys].map((key) => ({ 'text/plain': list.getItem(key).name })),
    onReorder(e) {
      if (e.target.dropPosition === 'before') {
        list.moveBefore(e.target.key, e.keys);
      } else if (e.target.dropPosition === 'after') {
        list.moveAfter(e.target.key, e.keys);
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
    <GridList
      aria-label="Reorderable list"
      selectionMode="multiple"
      items={list.items}
      dragAndDropHooks={dragAndDropHooks}
    >
      {(item) => (
        <GridListItem textValue={item.name}>
          <p className="ml-3">{item.name}</p>
        </GridListItem>
      )}
    </GridList>
  );
}

export function DemoGridList() {
  const rows = [
    { id: '1', name: 'Games' },
    { id: '2', name: 'Program Files' },
    { id: '3', name: 'Documents' },
  ];

  return (
    <section className="flex flex-wrap items-center gap-3">
      <GridList
        className="gap-3"
        aria-label="Multiple checkbox selection with toggle behavior"
        selectionMode="multiple"
        selectionBehavior="toggle"
        items={rows}
      >
        {(item) => (
          <GridListItem textValue={item.name}>
            <p className="ml-3">{item.name}</p>
          </GridListItem>
        )}
      </GridList>

      <div className="divider divider-horizontal">atau</div>

      <GridList
        className="gap-3"
        aria-label="Multiple checkbox selection with replace behavior"
        selectionMode="multiple"
        selectionBehavior="replace"
        disabledKeys={['2']}
        items={rows.slice()}
      >
        {(item) => (
          <MyGridListItem textValue={item.name}>
            {({ selectionBehavior }) => (
              <p className={twMerge(selectionBehavior === 'toggle' && 'ml-3')}>
                {item.name}
              </p>
            )}
          </MyGridListItem>
        )}
      </GridList>

      <div className="divider divider-horizontal">atau</div>

      <DraggableGridList />
    </section>
  );
}
