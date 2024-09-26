import { AriaRadio } from '#shared/components/radio/aria-radio';
import { useState } from 'react';
import type { RadioGroupProps } from 'react-aria-components';
import { Label, RadioGroup, Text } from 'react-aria-components';

interface MyRadioGroupProps extends Omit<RadioGroupProps, 'children'> {
  children?: React.ReactNode;
  label?: string;
  description?: string;
  errorMessage?: string;
}

function MyRadioGroup({
  label,
  description,
  errorMessage,
  children,
  ...props
}: MyRadioGroupProps) {
  return (
    <RadioGroup {...props}>
      {/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
      <Label>{label}</Label>

      {children}

      {!props.isInvalid && description && (
        <Text slot="description">{description}</Text>
      )}
      {props.isInvalid && errorMessage && (
        <Text className="text-error" slot="errorMessage">
          {errorMessage}
        </Text>
      )}
    </RadioGroup>
  );
}

export function DemoRadioGroup() {
  const [value, setValue] = useState('');

  const isInvalid = value !== 'basketball';

  return (
    <section className="flex flex-wrap items-center space-x-3">
      <MyRadioGroup
        className="flex flex-col gap-3 rounded border p-3"
        label="Radio Group: (Basketball is the only right answer!)"
        value={value}
        onChange={setValue}
        isInvalid={isInvalid}
      >
        <div className="flex space-x-3">
          <AriaRadio value="soccer" />
          <p className="label-text">Soccer</p>
        </div>
        <div className="flex space-x-3">
          <AriaRadio value="baseball" />
          <p className="label-text">Baseball</p>
        </div>
        <div className="flex space-x-3">
          <AriaRadio value="basketball" />
          <p className="label-text">Basketball</p>
        </div>
      </MyRadioGroup>
    </section>
  );
}
