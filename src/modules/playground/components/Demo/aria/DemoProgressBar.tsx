import { Label, ProgressBar, ProgressBarProps } from 'react-aria-components';
import { twMerge } from 'tailwind-merge';

interface MyProgressBarProps extends ProgressBarProps {
  label?: string;
}

function MyProgressBar({ label, ...props }: MyProgressBarProps) {
  return (
    <ProgressBar {...props}>
      {({ percentage, valueText, isIndeterminate }) => (
        <>
          <div className="flex">
            <Label className="flex-1">{label}</Label>
            <output className="">{valueText}</output>
          </div>

          <div className="relative h-5 w-full before:absolute before:top-1/2 before:block before:h-2 before:w-full before:-translate-y-1/2 before:rounded-full before:bg-base-200">
            <span
              className={twMerge(
                'absolute top-1/2 h-2 -translate-y-1/2 rounded-full bg-primary',
                isIndeterminate &&
                  'top-[30%] w-[100px] translate-y-0 animate-progressbar-indeterminate transition',
              )}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </>
      )}
    </ProgressBar>
  );
}

function DaisyLoading() {
  return (
    <>
      <span className="loading loading-spinner text-primary" />
      <span className="loading loading-dots text-primary" />
      <span className="loading loading-ring text-primary" />
      <span className="loading loading-ball text-primary" />
      <span className="loading loading-bars text-primary" />
      <span className="loading loading-infinity text-primary" />
    </>
  );
}

export default function DemoProgressBar() {
  return (
    <section className="flex flex-wrap items-center gap-3">
      <MyProgressBar
        className="min-w-[300px] rounded border p-3"
        label="Feeding..."
        valueLabel="30 of 100 dogs"
        value={30}
      />

      <MyProgressBar
        className="min-w-[300px] rounded border p-3"
        label="Loading..."
        isIndeterminate
      />

      <DaisyLoading />
    </section>
  );
}
