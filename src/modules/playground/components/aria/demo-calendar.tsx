import { isWeekend } from '@internationalized/date';
import { useState } from 'react';
import type { CalendarProps, DateValue } from 'react-aria-components';
import {
  Button,
  Calendar,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeaderCell,
  Heading,
  Text,
} from 'react-aria-components';
import { RESOLVED_DATE_TIME_FORMAT_OPTIONS } from '#shared/constants/date.constant';

interface MyCalendarProps<T extends DateValue> extends CalendarProps<T> {
  errorMessage?: string;
}

function MyCalendar<T extends DateValue>({
  errorMessage,
  ...props
}: MyCalendarProps<T>) {
  return (
    <Calendar {...props}>
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
  );
}

function MyDoubleCalendar<T extends DateValue>({
  errorMessage,
  ...props
}: MyCalendarProps<T>) {
  return (
    <Calendar {...props} visibleDuration={{ months: 2 }}>
      <header className="mb-3 flex items-center justify-between">
        <Button slot="previous">◀</Button>
        <Heading />
        <Button slot="next">▶</Button>
      </header>

      <div className="flex gap-3 overflow-auto">
        <CalendarGrid>
          <CalendarGridHeader>
            {(day) => <CalendarHeaderCell>{day}</CalendarHeaderCell>}
          </CalendarGridHeader>

          <CalendarGridBody className="[&>tr>td]:p-0">
            {(date) => (
              <CalendarCell
                date={date}
                className="flex size-11 items-center justify-center rac-selected:bg-primary rac-selected:text-primary-content"
              />
            )}
          </CalendarGridBody>
        </CalendarGrid>

        <CalendarGrid offset={{ months: 1 }}>
          <CalendarGridHeader>
            {(day) => <CalendarHeaderCell>{day}</CalendarHeaderCell>}
          </CalendarGridHeader>

          <CalendarGridBody className="[&>tr>td]:p-0">
            {(date) => (
              <CalendarCell
                date={date}
                className="flex size-11 items-center justify-center rac-selected:bg-primary rac-selected:text-primary-content"
              />
            )}
          </CalendarGridBody>
        </CalendarGrid>
      </div>

      {props.isInvalid && errorMessage && (
        <Text className="text-error" slot="errorMessage">
          {errorMessage}
        </Text>
      )}
    </Calendar>
  );
}

export function DemoCalendar() {
  const [value, setValue] = useState<DateValue | null>(null);

  const isDateUnavailable = (date: DateValue) =>
    isWeekend(date, RESOLVED_DATE_TIME_FORMAT_OPTIONS.timeZone);

  return (
    <section className="flex flex-wrap gap-3">
      <MyCalendar
        className="rounded border p-3"
        value={value}
        onChange={setValue}
        isDateUnavailable={isDateUnavailable}
      />

      <MyDoubleCalendar className="rounded border p-3" />
    </section>
  );
}
