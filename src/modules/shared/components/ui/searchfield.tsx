import {
  Button,
  Input,
  SearchField as _SearchField,
  type ButtonProps,
  type InputProps,
  type SearchFieldProps,
} from 'react-aria-components';
import { twMerge } from 'tailwind-merge';

function SearchFieldInput({ className, ...props }: InputProps) {
  return (
    <Input
      className={(values) =>
        twMerge(
          'min-w-0  flex-1 bg-background px-2 py-1.5 outline outline-0 [&::-webkit-search-cancel-button]:hidden',
          typeof className === 'function' ? className(values) : className,
        )
      }
      {...props}
    />
  );
}

function SearchField({ className, ...props }: SearchFieldProps) {
  return (
    <_SearchField
      className={(values) =>
        twMerge(
          'group flex h-10 w-full items-center overflow-hidden rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 group-data-[disabled]:opacity-50',
          typeof className === 'function' ? className(values) : className,
        )
      }
      {...props}
    />
  );
}

function SearchFieldClear({ className, ...props }: ButtonProps) {
  return (
    <Button
      className={(values) =>
        twMerge(
          'mr-1 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 group-data-[disabled]:pointer-events-none group-data-[empty]:invisible',
          typeof className === 'function' ? className(values) : className,
        )
      }
      {...props}
    />
  );
}

export { SearchField, SearchFieldClear, SearchFieldInput };
