import * as React from 'react';
import {
  Slider,
  SliderOutput,
  SliderStateContext,
  SliderThumb,
  SliderTrack,
  type SliderProps,
  type SliderThumbProps,
  type SliderTrackProps,
} from 'react-aria-components';
import { twMerge } from 'tailwind-merge';

const _SliderOutput = SliderOutput;

const _Slider = ({
  className,
  orientation = 'horizontal',
  ...props
}: SliderProps) => (
  <Slider
    className={(values) =>
      twMerge(
        'relative flex touch-none select-none items-center',
        orientation === 'vertical' && 'h-full',
        orientation === 'horizontal' && 'w-full',
        typeof className === 'function' ? className(values) : className,
      )
    }
    orientation={orientation}
    {...props}
  />
);

const _SliderTrack = ({ className, ...props }: SliderTrackProps) => (
  <SliderTrack
    className={(values) =>
      twMerge(
        'relative grow rounded-full bg-secondary',
        values.orientation === 'horizontal' && 'h-2 w-full',
        values.orientation === 'vertical' && 'h-full w-2',
        typeof className === 'function' ? className(values) : className,
      )
    }
    {...props}
  />
);

const _SliderFillTrack = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const state = React.useContext(SliderStateContext);
  const orientation = state.orientation === 'vertical' ? 'height' : 'width';

  return (
    <div
      ref={ref}
      style={{ [orientation]: `${state.getThumbPercent(0) * 100}%` }}
      className={twMerge(
        'absolute rounded-full bg-primary',
        state.orientation === 'horizontal' && 'h-full',
        state.orientation === 'vertical' && 'w-full bottom-0',
        className,
      )}
      {...props}
    />
  );
});
_SliderFillTrack.displayName = 'SliderFillTrack';

const _SliderThumb = ({ className }: SliderThumbProps) => (
  <SliderThumb
    className={(values) =>
      twMerge(
        'left-[50%] top-[50%] block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        typeof className === 'function' ? className(values) : className,
      )
    }
  />
);

export {
  _Slider as Slider,
  _SliderFillTrack as SliderFillTrack,
  _SliderOutput as SliderOutput,
  _SliderThumb as SliderThumb,
  _SliderTrack as SliderTrack,
};
