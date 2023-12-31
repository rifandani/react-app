import AriaCheckbox from '@shared/components/atoms/Checkbox/AriaCheckbox.atom';
import { useState } from 'react';
import {
  CheckboxGroup,
  CheckboxGroupProps,
  Label,
  Text,
} from 'react-aria-components';

interface MyCheckboxGroupProps extends Omit<CheckboxGroupProps, 'children'> {
  children?: React.ReactNode;
  label?: string;
  description?: string;
  errorMessage?: string;
}

function MyCheckboxGroup({
  label,
  description,
  errorMessage,
  children,
  ...props
}: MyCheckboxGroupProps) {
  return (
    <CheckboxGroup {...props}>
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
    </CheckboxGroup>
  );
}

export default function DemoCheckboxGroup() {
  const [selected, setSelected] = useState<string[]>(['soccer']);

  const isInvalid = selected.length === 0;

  return (
    <section className="flex flex-wrap items-center space-x-3">
      <MyCheckboxGroup
        className="flex flex-col space-y-3 rounded border p-2"
        label="Checkbox Group"
        value={selected}
        onChange={setSelected}
        isInvalid={isInvalid}
      >
        <div className="flex space-x-3">
          <AriaCheckbox value="soccer" />
          <p className="label-text">Soccer</p>
        </div>
        <div className="flex space-x-3">
          <AriaCheckbox value="baseball" />
          <p className="label-text">Baseball</p>
        </div>
      </MyCheckboxGroup>
    </section>
  );
}
