import { AriaCheckbox } from '@shared/components/checkbox/aria-checkbox';
import { BaseAriaCheckbox } from '@shared/components/checkbox/base-aria-checkbox';
import { DaisyCheckbox } from '@shared/components/checkbox/daisy-checkbox';

export function DemoCheckbox() {
  return (
    <section className="flex flex-wrap items-center space-x-3 rounded border p-3">
      <div className="flex items-center space-x-3">
        <span className="label-text">AriaCheckbox</span>
        <AriaCheckbox />
      </div>

      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className="label cursor-pointer gap-3">
        <span className="label-text">BaseCheckbox</span>
        <BaseAriaCheckbox />
      </label>

      <DaisyCheckbox />
    </section>
  );
}
