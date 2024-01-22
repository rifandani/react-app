import type { RadioProps } from 'react-aria-components'
import { Radio } from 'react-aria-components'
import { twMerge } from 'tailwind-merge'

export function AriaRadio({ className, ...props }: RadioProps) {
  return (
    <Radio
      className={classProps =>
        twMerge(
          'group flex items-center',
          typeof className === 'string' ? className : className?.(classProps),
      )}
      {...props}
    >
      {({ isSelected, isDisabled, isFocusVisible, isInvalid }) => (
        <div
          className={twMerge(
            'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 text-white transition duration-150 ease-in-out',
            isSelected
              ? 'group-active:bg-primary-focus bg-primary'
              : 'bg-white',
            isDisabled
              ? 'border-slate-300'
              : isFocusVisible || isSelected
                ? 'group-active:border-primary-focus border-primary'
                : 'border-slate-500 group-active:border-slate-600',
            isFocusVisible && 'ring-primary-focus ring',
            isInvalid && 'border-error',
          )}
        >
          <svg className="size-3 stroke-current" viewBox="0 0 18 18">
            <circle
              cx="9"
              cy="9"
              r="6"
              // strokeWidth="2"
              style={{
                transition: 'all 400ms',
                fill: 'white',
                // stroke: 'hsl(var(--p))',
              }}
            />
          </svg>
        </div>
      )}
    </Radio>
  )
}
