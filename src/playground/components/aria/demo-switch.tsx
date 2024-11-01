import { AriaSwitch } from '#/core/components/switch/aria-switch';
import { TheSwitch } from '#/core/components/switch/the-switch';
import { useState } from 'react';

export function DemoSwitch() {
  const [selected, setSelected] = useState(false);

  return (
    <section className="flex flex-wrap items-center gap-3 rounded border p-3">
      <AriaSwitch name="my-switch" onChange={setSelected}>
        {selected ? 'On' : 'Off'}
      </AriaSwitch>

      <div className="divider divider-horizontal">atau</div>

      <TheSwitch name="the-switch" onChange={setSelected}>
        {selected ? 'The On' : 'The Off'}
      </TheSwitch>
    </section>
  );
}
