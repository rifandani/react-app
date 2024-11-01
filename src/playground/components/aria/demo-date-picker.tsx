import { RESOLVED_DATE_TIME_FORMAT_OPTIONS } from '#/core/constants/date.constant';
import { isWeekend, parseDateTime } from '@internationalized/date';
import { useState } from 'react';
import type { DatePickerProps, DateValue } from 'react-aria-components';
import {
  Button,
  Calendar,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeaderCell,
  DateInput,
  DatePicker,
  DateSegment,
  Dialog,
  Group,
  Heading,
  Label,
  Popover,
  Text,
} from 'react-aria-components';

interface MyDatePickerProps<T extends DateValue> extends DatePickerProps<T> {
  label?: string;
  description?: string;
  errorMessage?: string;
}

function MyDatePicker<T extends DateValue>({
  label,
  description,
  errorMessage,
  ...props
}: MyDatePickerProps<T>) {
  return (
    <DatePicker {...props}>
      {/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
      <Label>{label}</Label>
      <Group className="join flex items-center rounded border px-2 py-1">
        <DateInput className="join-item flex min-w-[15rem] items-center">
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
          <Calendar
            className="rounded border bg-base-200 p-3"
            isInvalid={props.isInvalid}
          >
            <header className="mb-3 flex items-center justify-between">
              <Button slot="previous">◀</Button>
              <Heading />
              <Button slot="next">▶</Button>
            </header>

            <CalendarGrid className="w-full">
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
          </Calendar>
        </Dialog>
      </Popover>
    </DatePicker>
  );
}

export function DemoDatePicker() {
  const [value, setValue] = useState<DateValue>(parseDateTime('2023-10-15'));

  const isInvalid = isWeekend(
    value,
    RESOLVED_DATE_TIME_FORMAT_OPTIONS.timeZone,
  );

  return (
    <section className="flex flex-wrap gap-3">
      <MyDatePicker
        className="flex flex-col gap-3 rounded border p-3"
        label="Date Picker: Event date"
        name="event-date"
        granularity="minute"
        value={value}
        onChange={setValue}
        isInvalid={isInvalid}
        errorMessage={isInvalid ? 'We are closed on weekend' : undefined}
      />
    </section>
  );
}
