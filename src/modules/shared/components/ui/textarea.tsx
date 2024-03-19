import { TextArea, type TextAreaProps } from 'react-aria-components';
import { twMerge } from 'tailwind-merge';

const _TextArea = ({ className, ...props }: TextAreaProps) => {
  return (
    <TextArea
      className={(values) =>
        twMerge(
          'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          typeof className === 'function' ? className(values) : className,
        )
      }
      {...props}
    />
  );
};

export { _TextArea as TextArea };
