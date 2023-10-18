import { Checkbox, CheckboxProps } from 'react-aria-components';
import { twMerge } from 'tailwind-merge';

export default function AriaCheckbox({ className, ...props }: CheckboxProps) {
  return (
    <Checkbox
      className={(classProps) =>
        twMerge(
          'group flex items-center',
          typeof className === 'string' ? className : className?.(classProps),
        )
      }
      {...props}
    >
      {({
        isIndeterminate,
        isSelected,
        isDisabled,
        isFocusVisible,
        isInvalid,
      }) => (
        <div
          aria-hidden="true"
          className={twMerge(
            'flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 text-white transition duration-150 ease-in-out',
            isSelected
              ? 'bg-primary group-active:bg-primary-focus'
              : 'bg-white',
            isDisabled
              ? 'border-slate-300'
              : isFocusVisible || isSelected
              ? 'border-primary group-active:border-primary-focus'
              : 'border-slate-500 group-active:border-slate-600',
            isFocusVisible && 'ring ring-primary-focus',
            isInvalid && 'border-error',
          )}
        >
          <svg
            className="h-3 w-3 stroke-current"
            aria-hidden="true"
            viewBox="0 0 18 18"
          >
            {isIndeterminate ? (
              <rect
                x={1}
                y={7.5}
                width={15}
                height={3}
                style={{
                  transition: 'all 400ms',
                }}
              />
            ) : (
              <polyline
                points="1 9 7 14 15 4"
                fill="none"
                strokeWidth={3}
                strokeDasharray={22}
                strokeDashoffset={isSelected ? 44 : 66}
                style={{
                  transition: 'all 400ms',
                }}
              />
            )}
          </svg>
        </div>
      )}
    </Checkbox>
  );
}
