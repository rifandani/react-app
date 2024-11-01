import { ProgressBar, type ProgressBarProps } from 'react-aria-components';
import { twMerge } from 'tailwind-merge';

export interface ProgressProps extends ProgressBarProps {
  barClassName?: string;
  fillClassName?: string;
}

const Progress = ({
  className,
  barClassName,
  fillClassName,
  children,
  ...props
}: ProgressProps) => (
  <ProgressBar
    className={(values) =>
      twMerge(
        'w-full',
        typeof className === 'function' ? className(values) : className,
      )
    }
    {...props}
  >
    {(values) => (
      <>
        {typeof children === 'function' ? children(values) : children}
        <div
          className={twMerge(
            'relative h-4 w-full overflow-hidden rounded-full bg-secondary',
            barClassName,
          )}
        >
          <div
            className={twMerge(
              'h-full w-full flex-1 bg-primary transition-all',
              fillClassName,
            )}
            style={{
              transform: `translateX(-${100 - (values.percentage || 0)}%)`,
            }}
          />
        </div>
      </>
    )}
  </ProgressBar>
);

export { Progress };
