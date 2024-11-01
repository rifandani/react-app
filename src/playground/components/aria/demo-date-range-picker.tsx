import { RESOLVED_DATE_TIME_FORMAT_OPTIONS } from '#/core/constants/date.constant';
import type { RangeValue } from '#/core/types/date.type';
import { parseDateTime, today } from '@internationalized/date';
import { useState } from 'react';
import type { DateRangePickerProps, DateValue } from 'react-aria-components';
import {
  Button,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeaderCell,
  DateInput,
  DateRangePicker,
  DateSegment,
  Dialog,
  Group,
  Heading,
  Label,
  Popover,
  RangeCalendar,
  Text,
} from 'react-aria-components';

interface MyDateRangePickerProps<T extends DateValue>
  extends DateRangePickerProps<T> {
  label?: string;
  description?: string;
  errorMessage?: string;
}

function MyDateRangePicker<T extends DateValue>({
  label,
  description,
  errorMessage,
  ...props
}: MyDateRangePickerProps<T>) {
  return (
    <DateRangePicker {...props}>
      {/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
      <Label>{label}</Label>
      <Group className="join items-center gap-3 rounded border px-2 py-1">
        <DateInput className="join-item flex" slot="start">
          {(segment) => <DateSegment segment={segment} />}
        </DateInput>
        <span className="join-item" aria-hidden="true">
          -
        </span>
        <DateInput className="join-item flex" slot="end">
          {(segment) => <DateSegment segment={segment} />}
        </DateInput>
        <Button className="join-item">▼</Button>
      </Group>

      {!props.isInvalid && description && (
        <Text slot="description">{description}</Text>
      )}
      {props.isInvalid && errorMessage && (
        <Text className="text-error" slot="errorMessage">
          {errorMessage}
        </Text>
      )}

      <Popover>
        <Dialog>
          <RangeCalendar className="rounded border bg-base-200 p-3">
            <header className="flex items-center justify-between">
              <Button slot="previous">◀</Button>
              <Heading />
              <Button slot="next">▶</Button>
            </header>

            <CalendarGrid>
              <CalendarGridHeader>
                {(day) => <CalendarHeaderCell>{day}</CalendarHeaderCell>}
              </CalendarGridHeader>

              <CalendarGridBody className="[&>tr>td]:p-0">
                {(date) => (
                  <CalendarCell
                    date={date}
                    className="flex size-11 items-center justify-center rac-unavailable:text-slate-500 rac-unavailable:line-through rac-selected:bg-primary rac-selected:text-primary-content"
                  />
                )}
              </CalendarGridBody>
            </CalendarGrid>

            {props.isInvalid && errorMessage && (
              <Text className="text-error" slot="errorMessage">
                {errorMessage}
              </Text>
            )}
          </RangeCalendar>
        </Dialog>
      </Popover>
    </DateRangePicker>
  );
}

export function DemoDateRangePicker() {
  const [value, setValue] = useState<RangeValue<DateValue>>({
    start: parseDateTime('2023-10-10'),
    end: parseDateTime('2023-10-11'),
  });

  const now = today(RESOLVED_DATE_TIME_FORMAT_OPTIONS.timeZone);
  const disabledRanges = [
    [now, now.add({ days: 5 })],
    [now.add({ days: 14 }), now.add({ days: 16 })],
    [now.add({ days: 23 }), now.add({ days: 24 })],
  ];

  const isInvalid = disabledRanges.some(
    (interval) =>
      value.end.compare(interval[0]) >= 0 &&
      value.start.compare(interval[1]) <= 0,
  );

  const isDateUnavailable = (date: DateValue) =>
    disabledRanges.some(
      (interval) =>
        date.compare(interval[0]) >= 0 && date.compare(interval[1]) <= 0,
    );

  return (
    <section className="flex flex-wrap gap-3">
      <MyDateRangePicker
        className="flex flex-col gap-3 rounded border p-3"
        label="Date Range Picker: Event date"
        granularity="minute"
        // placeholderValue={new CalendarDateTime(1980, 1, 1)}
        value={value}
        onChange={setValue}
        isInvalid={isInvalid}
        isDateUnavailable={isDateUnavailable}
        errorMessage={isInvalid ? 'We are closed on weekend' : undefined}
      />
    </section>
  );
}
