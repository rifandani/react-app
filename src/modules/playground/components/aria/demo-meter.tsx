import type { MeterProps } from 'react-aria-components';
import { Label, Meter } from 'react-aria-components';

interface MyMeterProps extends MeterProps {
  label?: string;
}

function MyMeter({ label, ...props }: MyMeterProps) {
  return (
    <Meter {...props}>
      {({ percentage, valueText }) => (
        <>
          <div className="flex">
            <Label className="flex-1">{label}</Label>
            <output className="">{valueText}</output>
          </div>

          <div className="relative h-5 w-full before:absolute before:top-1/2 before:block before:h-2 before:w-full before:-translate-y-1/2 before:rounded-full before:bg-base-200">
            <span
              className="absolute top-1/2 h-2 -translate-y-1/2 rounded-full bg-primary"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </>
      )}
    </Meter>
  );
}

function DaisyRadialProgress() {
  return (
    <div className="radial-progress text-primary" style={{ '--value': '60' }}>
      60%
    </div>
  );
}

export function DemoMeter() {
  return (
    <section className="flex flex-wrap items-center gap-3">
      <MyMeter
        className="min-w-[300px] rounded border p-3"
        label="Meter"
        formatOptions={{ style: 'currency', currency: 'IDR' }}
        value={50}
      />

      <DaisyRadialProgress />
    </section>
  );
}
