import React from 'react'
import type { AriaRadioProps } from 'react-aria'
import { VisuallyHidden, useFocusRing, useRadio } from 'react-aria'
import { twMerge } from 'tailwind-merge'
import { RadioContext } from './context'

export function TheRadio(props: AriaRadioProps) {
  const { children } = props
  const state = React.useContext(RadioContext)
  const ref = React.useRef(null)
  const { inputProps, isSelected, isDisabled } = useRadio(props, state!, ref)
  const { isFocusVisible, focusProps } = useFocusRing()
  const strokeWidth = isSelected ? 6 : 2

  return (
    <label
      className={twMerge(
        'flex items-center opacity-100',
        isDisabled && 'opacity-40',
      )}
    >
      <VisuallyHidden>
        <input {...inputProps} {...focusProps} ref={ref} />
      </VisuallyHidden>

      <svg width={24} height={24} aria-hidden="true" style={{ marginRight: 4 }}>
        <circle
          cx={12}
          cy={12}
          r={8 - strokeWidth / 2}
          fill="none"
          stroke={isSelected ? 'orange' : 'gray'}
          strokeWidth={strokeWidth}
        />
        {isFocusVisible && (
          <circle
            cx={12}
            cy={12}
            r={11}
            fill="none"
            stroke="orange"
            strokeWidth={2}
          />
        )}
      </svg>
      {children}
    </label>
  )
}
