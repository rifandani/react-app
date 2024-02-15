import { useRef } from 'react';
import type { AriaSwitchProps } from 'react-aria';
import { VisuallyHidden, useFocusRing, useSwitch } from 'react-aria';
import { useToggleState } from 'react-stately';
import { twMerge } from 'tailwind-merge';

export function TheSwitch(props: AriaSwitchProps) {
  const state = useToggleState(props);
  const ref = useRef(null);
  const { inputProps } = useSwitch(props, state, ref);
  const { isFocusVisible, focusProps } = useFocusRing();

  return (
    <label
      className={twMerge(
        'flex items-center opacity-100',
        props.isDisabled && 'opacity-40',
      )}
    >
      <VisuallyHidden>
        <input {...inputProps} {...focusProps} ref={ref} />
      </VisuallyHidden>

      <svg width={40} height={24} aria-hidden="true" className="mr-1">
        <rect
          x={4}
          y={4}
          width={32}
          height={16}
          rx={8}
          fill={state.isSelected ? 'orange' : 'gray'}
        />

        <circle cx={state.isSelected ? 28 : 12} cy={12} r={5} fill="white" />

        {isFocusVisible && (
          <rect
            x={1}
            y={1}
            width={38}
            height={22}
            rx={11}
            fill="none"
            stroke="orange"
            strokeWidth={2}
          />
        )}
      </svg>

      {props.children}
    </label>
  );
}
