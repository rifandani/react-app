import AriaCheckbox from "@shared/components/atoms/Checkbox/AriaCheckbox.atom";
import { useState } from "react";
import {
  Button,
  Cell,
  Collection,
  Column,
  ColumnProps,
  Row,
  RowProps,
  Selection,
  Table,
  TableBody,
  TableHeader,
  TableHeaderProps,
  useTableOptions,
} from "react-aria-components";

function MyTableHeader<T extends object>({
  columns,
  children,
  ...props
}: TableHeaderProps<T>) {
  const { selectionBehavior, selectionMode, allowsDragging } =
    useTableOptions();

  return (
    <TableHeader {...props}>
      {/* Add extra columns for drag and drop and selection. */}
      {allowsDragging && <Column />}

      {selectionBehavior === "toggle" && (
        <Column>
          {selectionMode === "multiple" && <AriaCheckbox slot="selection" />}
        </Column>
      )}

      <Collection items={columns}>{children}</Collection>
    </TableHeader>
  );
}

function MyColumn<T extends object>(props: ColumnProps<T>) {
  return (
    <Column {...props}>
      {({ allowsSorting, sortDirection }) => (
        <>
          {props.children}

          {allowsSorting && (
            <span aria-hidden="true" className="sort-indicator">
              {sortDirection === "ascending" ? "▲" : "▼"}
            </span>
          )}
        </>
      )}
    </Column>
  );
}

function MyRow<T extends object>({
  id,
  columns,
  children,
  ...otherProps
}: RowProps<T>) {
  const { selectionBehavior, allowsDragging } = useTableOptions();

  return (
    <Row id={id} {...otherProps}>
      {allowsDragging && (
        <Cell>
          <Button slot="drag">≡</Button>
        </Cell>
      )}
      {selectionBehavior === "toggle" && (
        <Cell>
          <AriaCheckbox slot="selection" />
        </Cell>
      )}
      <Collection items={columns}>{children}</Collection>
    </Row>
  );
}

export default function DemoTable() {
  const columns = [
    { name: "Name", key: "name", isRowHeader: true },
    { name: "Type", key: "type" },
    { name: "Date Modified", key: "date" },
  ];

  const items = [
    { id: 1, name: "Games", date: "6/7/2020", type: "File folder" },
    { id: 2, name: "Program Files", date: "4/7/2021", type: "File folder" },
    { id: 3, name: "bootmgr", date: "11/20/2010", type: "System file" },
    { id: 4, name: "log.txt", date: "1/18/2016", type: "Text Document" },
  ];

  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set());

  return (
    <section className="flex flex-wrap gap-3">
      <Table
        className="table table-zebra"
        aria-label="Files"
        selectionMode="multiple"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
      >
        <MyTableHeader columns={columns}>
          {(column) => (
            <MyColumn isRowHeader={column.isRowHeader}>{column.name}</MyColumn>
          )}
        </MyTableHeader>

        <TableBody items={items}>
          {(item) => (
            <MyRow columns={columns}>
              {/** @ts-expect-error as typeof keyof Item */}
              {(column) => <Cell>{item[column.key]}</Cell>}
            </MyRow>
          )}
        </TableBody>
      </Table>
    </section>
  );
}
