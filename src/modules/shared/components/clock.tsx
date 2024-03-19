import { Fragment } from 'react';

interface Props {
  seconds: number;
  minutes: number;
  hours: number;
}

export function Clock({ seconds, minutes, hours }: Props) {
  return (
    <svg
      aria-label="clock timer"
      className="size-full"
      viewBox="-50 -50 100 100"
    >
      <title>Clock Timer</title>
      <circle className="fill-white stroke-slate-900" r="48" />

      {/* <!-- markers --> */}
      {[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55].map((minute) => (
        <Fragment key={minute}>
          <line
            className="stroke-slate-700 stroke-1"
            y1="35"
            y2="45"
            transform={`rotate(${30 * minute})`}
          />

          {[1, 2, 3, 4].map((offset) => (
            <line
              key={offset}
              className="stroke-slate-500 stroke-1"
              y1="42"
              y2="45"
              transform={`rotate(${6 * (minute + offset)})`}
            />
          ))}
        </Fragment>
      ))}

      {/* <!-- hour hand --> */}
      <line
        className="stroke-slate-700"
        y1="2"
        y2="-20"
        transform={`rotate(${30 * hours + minutes / 2})`}
      />

      {/* <!-- minute hand --> */}
      <line
        className="stroke-slate-700"
        y1="4"
        y2="-30"
        transform={`rotate(${6 * minutes + seconds / 10})`}
      />

      {/* <!-- second hand --> */}
      <g transform={`rotate(${6 * seconds})`}>
        <line className="stroke-primary" y1="10" y2="-38" />
        <line className="stroke-primary stroke-2" y1="10" y2="2" />
      </g>
    </svg>
  );
}
