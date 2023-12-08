import { useState } from "react";
import {
  Button,
  Group,
  Input,
  Label,
  NumberField,
  NumberFieldProps,
  Text,
} from "react-aria-components";

interface MyNumberFieldProps extends NumberFieldProps {
  label?: string;
  description?: string;
  errorMessage?: string;
}

function MyNumberField({
  label,
  description,
  errorMessage,
  ...props
}: MyNumberFieldProps) {
  return (
    <NumberField {...props}>
      <Label>{label}</Label>

      <Group className="join">
        <Button className="btn join-item" slot="decrement">
          -
        </Button>
        <Input className="input join-item input-bordered" />
        <Button className="btn join-item" slot="increment">
          +
        </Button>
      </Group>

      {!props.isInvalid && description && (
        <Text slot="description">{description}</Text>
      )}
      {props.isInvalid && errorMessage && (
        <Text className="text-error" slot="errorMessage">
          {errorMessage}
        </Text>
      )}
    </NumberField>
  );
}

export default function DemoNumberField() {
  const [value, setValue] = useState(10);

  const isInvalid = value < 0;

  return (
    <section className="flex flex-wrap items-center space-x-3">
      <MyNumberField
        className="flex flex-col gap-3 rounded border p-3"
        label="Number Field"
        value={value}
        onChange={setValue}
        isInvalid={isInvalid}
        maxValue={10}
        step={2}
      />
    </section>
  );
}
