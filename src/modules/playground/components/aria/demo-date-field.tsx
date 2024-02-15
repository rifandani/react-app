import { isWeekend, parseDateTime } from '@internationalized/date';
import { useState } from 'react';
import type { DateFieldProps, DateValue } from 'react-aria-components';
import {
  DateField,
  DateInput,
  DateSegment,
  Label,
  Text,
} from 'react-aria-components';
import { RESOLVED_DATE_TIME_FORMAT_OPTIONS } from '#shared/constants/date.constant';

interface MyDateFieldProps<T extends DateValue> extends DateFieldProps<T> {
  label?: string;
  description?: string;
  errorMessage?: string;
}

function MyDateField<T extends DateValue>({
  label,
  description,
  errorMessage,
  ...props
}: MyDateFieldProps<T>) {
  return (
    <DateField {...props}>
      <Label>{label}</Label>
      <DateInput className="flex items-center rounded border px-2 py-1">
        {(segment) => <DateSegment segment={segment} />}
      </DateInput>

      {!props.isInvalid && description && (
        <Text slot="description">{description}</Text>
      )}
      {props.isInvalid && errorMessage && (
        <Text className="text-error" slot="errorMessage">
          {errorMessage}
        </Text>
      )}
    </DateField>
  );
}

export function DemoDateField() {
  const [value, setValue] = useState<DateValue>(parseDateTime('2023-10-15'));

  const isInvalid = isWeekend(
    value,
    RESOLVED_DATE_TIME_FORMAT_OPTIONS.timeZone,
  );

  return (
    <section className="flex flex-wrap gap-3">
      <MyDateField
        className="flex flex-col gap-3 rounded border p-3"
        label="Date Field: Event date"
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
