import AriaSwitch from '@shared/components/atoms/Switch/AriaSwitch.atom';
import DaisySwitch from '@shared/components/atoms/Switch/DaisySwitch.atom';
import TheSwitch from '@shared/components/atoms/Switch/TheSwitch.atom';
import { useState } from 'react';

export default function DemoSwitch() {
  const [selected, setSelected] = useState(false);

  return (
    <section className="flex flex-wrap items-center gap-3 rounded border p-3">
      <AriaSwitch name="my-switch" onChange={setSelected}>
        {selected ? 'On' : 'Off'}
      </AriaSwitch>

      <div className="divider divider-horizontal">atau</div>

      <div className="flex">
        <DaisySwitch />
      </div>

      <div className="divider divider-horizontal">atau</div>

      <TheSwitch name="the-switch" onChange={setSelected}>
        {selected ? 'The On' : 'The Off'}
      </TheSwitch>
    </section>
  );
}
