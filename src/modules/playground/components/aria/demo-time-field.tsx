import { Time } from '@internationalized/date';
import { useState } from 'react';
import type { TimeFieldProps, TimeValue } from 'react-aria-components';
import {
  DateInput,
  DateSegment,
  Label,
  Text,
  TimeField,
} from 'react-aria-components';

interface MyTimeFieldProps<T extends TimeValue> extends TimeFieldProps<T> {
  label?: string;
  description?: string;
  errorMessage?: string;
}

function MyTimeField<T extends TimeValue>({
  label,
  description,
  errorMessage,
  ...props
}: MyTimeFieldProps<T>) {
  return (
    <TimeField {...props}>
      {/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
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
    </TimeField>
  );
}

export function DemoTimeField() {
  const [value, setValue] = useState(new Time(10, 0));

  const isInvalid = value.minute % 15 !== 0;

  return (
    <section className="flex flex-wrap gap-3">
      <MyTimeField
        className="flex flex-col gap-3 rounded border p-3"
        label="Time Field: Meeting time"
        name="meeting-time"
        value={value}
        onChange={setValue}
        minValue={new Time(8)}
        maxValue={new Time(20)}
        isInvalid={isInvalid}
        errorMessage={isInvalid ? 'Meetings start every 15 minutes' : undefined}
      />
    </section>
  );
}
