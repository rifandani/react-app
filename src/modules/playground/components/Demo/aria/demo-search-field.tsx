import { Icon } from '@iconify/react';
import { useState } from 'react';
import {
  Button,
  Group,
  Input,
  Label,
  SearchField,
  SearchFieldProps,
  Text,
} from 'react-aria-components';

interface MySearchFieldProps extends SearchFieldProps {
  label?: string;
  description?: string;
  errorMessage?: string;
}

function MySearchField({
  label,
  description,
  errorMessage,
  ...props
}: MySearchFieldProps) {
  return (
    <SearchField {...props}>
      <Label>{label}</Label>

      <Group className="join">
        <Input className="input join-item input-bordered [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none" />

        <Button className="btn btn-outline join-item">
          <Icon icon="lucide:x" />
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
    </SearchField>
  );
}

export function DemoSearchField() {
  const [value, setValue] = useState('');

  const isInvalid = value === 'invalid';

  return (
    <section className="flex flex-wrap items-center space-x-3">
      <MySearchField
        className="flex flex-col gap-3 rounded border p-3"
        label="Search Field"
        value={value}
        onChange={setValue}
        isInvalid={isInvalid}
        errorMessage="Do not input invalid value"
      />
    </section>
  );
}
