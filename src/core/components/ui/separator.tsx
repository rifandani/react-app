import { Separator, type SeparatorProps } from 'react-aria-components';
import { twMerge } from 'tailwind-merge';

const _Separator = ({
  className,
  orientation = 'horizontal',
  ...props
}: SeparatorProps) => (
  <Separator
    orientation={orientation}
    className={twMerge(
      'shrink-0 bg-border',
      orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
      className,
    )}
    {...props}
  />
);

export { _Separator as Separator };
