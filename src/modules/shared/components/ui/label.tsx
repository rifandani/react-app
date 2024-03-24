import { cva, type VariantProps } from 'class-variance-authority';
import { Label, type LabelProps } from 'react-aria-components';
import { twMerge } from 'tailwind-merge';

const labelVariants = cva(
  'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-70',
);
export type LabelVariantProps = VariantProps<typeof labelVariants>;

const _Label = ({ className, ...props }: LabelProps) => (
  <Label className={twMerge(labelVariants(), className)} {...props} />
);

export { _Label as Label, labelVariants };
