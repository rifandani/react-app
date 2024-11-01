import { Fragment, useState } from 'react';
import type { SliderProps } from 'react-aria-components';
import {
  Label,
  Slider,
  SliderOutput,
  SliderThumb,
  SliderTrack,
} from 'react-aria-components';
import { twMerge } from 'tailwind-merge';

interface MySliderProps<T> extends SliderProps<T> {
  label?: string;
  thumbLabels?: string[];
}

function MySlider<T extends number | number[]>({
  label,
  thumbLabels,
  className,
  ...props
}: MySliderProps<T>) {
  return (
    <Slider
      className={(classProps) =>
        twMerge(
          'flex flex-col',
          classProps.orientation === 'horizontal' ? 'w-full' : 'h-full',
          typeof className === 'string' ? className : className?.(classProps),
        )
      }
      {...props}
    >
      {({ state, orientation }) => (
        <>
          <div className="flex">
            {/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
            <Label className="flex-1">{label}</Label>

            {/* we can put the output anywhere actually */}
            <SliderOutput>
              {state.values
                .map((_, i) => state.getThumbValueLabel(i))
                .join(' - ')}
            </SliderOutput>
          </div>

          <SliderTrack
            className={twMerge(
              'relative before:absolute before:block before:bg-base-200',
              orientation === 'horizontal'
                ? 'h-5 w-full before:top-1/2 before:h-2 before:w-full before:-translate-y-1/2 before:rounded-full'
                : 'h-full w-5 before:left-1/2 before:h-full before:w-2 before:-translate-x-1/2 before:rounded-full',
            )}
          >
            {state.values.map((num, idx) => (
              <Fragment key={num}>
                <span
                  className={twMerge(
                    'absolute rounded-full bg-primary',
                    orientation === 'horizontal'
                      ? 'top-1/2 h-2 -translate-y-1/2'
                      : 'bottom-0 left-1/2 w-2 -translate-x-1/2',
                  )}
                  style={{
                    [orientation === 'horizontal' ? 'width' : 'height']: `${
                      state.getThumbPercent(idx) * 100
                    }%`,
                  }}
                />

                <SliderThumb
                  className={twMerge(
                    'rac-dragging:bg-primary-focus h-5 w-5 rounded-full bg-primary rac-focus-visible:ring rac-focus-visible:ring-primary rac-focus-visible:ring-offset-1',
                    orientation === 'horizontal' ? 'top-1/2' : 'left-1/2',
                  )}
                  key={`slider-thumb-${idx}-${num}`}
                  index={idx}
                  aria-label={thumbLabels?.[idx]}
                />
              </Fragment>
            ))}
          </SliderTrack>
        </>
      )}
    </Slider>
  );
}

export function DemoSlider() {
  const [single, setSingle] = useState(20);
  const [vertical, setVertical] = useState(10);
  const [double, setDouble] = useState<number[]>([10, 20]);

  return (
    <section className="!mb-56 flex flex-wrap items-center gap-3">
      <MySlider<number>
        className="rounded border p-3"
        label="Slider: Single Horizontal"
        formatOptions={{ style: 'currency', currency: 'IDR' }}
        value={single}
        onChange={setSingle}
      />

      <MySlider<number[]>
        className="rounded border p-3"
        label="Slider: Double"
        thumbLabels={['start', 'end']}
        value={double}
        onChange={setDouble}
      />

      <MySlider<number>
        className="min-w-[300px] rounded border p-3"
        label="Slider: Single Vertical"
        orientation="vertical"
        value={vertical}
        onChange={setVertical}
      />
    </section>
  );
}
