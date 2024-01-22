import { isWeekend, parseDate } from '@internationalized/date'
import { useState } from 'react'
import type { DateValue, RangeCalendarProps } from 'react-aria-components'
import {
  Button,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeaderCell,
  Heading,
  RangeCalendar,
  Text,
} from 'react-aria-components'
import type { RangeValue } from '#shared/types/date.type'
import { RESOLVED_DATE_TIME_FORMAT_OPTIONS } from '#shared/constants/date.constant'

interface MyRangeCalendarProps<T extends DateValue>
  extends RangeCalendarProps<T> {
  errorMessage?: string
}

function MyRangeCalendar<T extends DateValue>({
  errorMessage,
  ...props
}: MyRangeCalendarProps<T>) {
  return (
    <RangeCalendar {...props}>
      <header className="mb-3 flex items-center justify-between">
        <Button slot="previous">◀</Button>
        <Heading />
        <Button slot="next">▶</Button>
      </header>

      <CalendarGrid>
        <CalendarGridHeader>
          {day => <CalendarHeaderCell>{day}</CalendarHeaderCell>}
        </CalendarGridHeader>

        <CalendarGridBody className="[&>tr>td]:p-0">
          {date => (
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
  )
}

function MyDoubleRangeCalendar<T extends DateValue>({
  errorMessage,
  ...props
}: MyRangeCalendarProps<T>) {
  return (
    <RangeCalendar {...props}>
      <header className="mb-3 flex items-center justify-between">
        <Button slot="previous">◀</Button>
        <Heading />
        <Button slot="next">▶</Button>
      </header>

      <div className="flex items-center gap-5 overflow-auto">
        <CalendarGrid>
          <CalendarGridHeader>
            {day => <CalendarHeaderCell>{day}</CalendarHeaderCell>}
          </CalendarGridHeader>

          <CalendarGridBody className="[&>tr>td]:p-0">
            {date => (
              <CalendarCell
                date={date}
                className="flex size-11 items-center justify-center rac-unavailable:text-slate-500 rac-unavailable:line-through rac-selected:bg-primary rac-selected:text-primary-content"
              />
            )}
          </CalendarGridBody>
        </CalendarGrid>

        <CalendarGrid offset={{ months: 1 }}>
          <CalendarGridHeader>
            {day => <CalendarHeaderCell>{day}</CalendarHeaderCell>}
          </CalendarGridHeader>

          <CalendarGridBody className="[&>tr>td]:p-0">
            {date => (
              <CalendarCell
                date={date}
                className="flex size-11 items-center justify-center rac-unavailable:text-slate-500 rac-unavailable:line-through rac-selected:bg-primary rac-selected:text-primary-content"
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
    </RangeCalendar>
  )
}

export function DemoRangeCalendar() {
  // `start` and `end` can not be null
  const [value, setValue] = useState<RangeValue<DateValue>>({
    start: parseDate('2023-10-09'),
    end: parseDate('2023-10-10'),
  })

  const isDateUnavailable = (date: DateValue) =>
    isWeekend(date, RESOLVED_DATE_TIME_FORMAT_OPTIONS.timeZone)

  return (
    <section className="flex flex-wrap gap-3">
      <MyRangeCalendar
        aria-label="single range"
        className="rounded border p-3"
        value={value}
        onChange={setValue}
        isDateUnavailable={isDateUnavailable}
      />

      <MyDoubleRangeCalendar
        aria-label="double range"
        className="rounded border p-3"
        allowsNonContiguousRanges
        isDateUnavailable={isDateUnavailable}
        visibleDuration={{ months: 2 }}
      />
    </section>
  )
}
