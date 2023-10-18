import AriaCheckbox from '@shared/components/atoms/Checkbox/AriaCheckbox.atom';
import BaseAriaCheckbox from '@shared/components/atoms/Checkbox/BaseAriaCheckbox.atom';
import DaisyCheckbox from '@shared/components/atoms/Checkbox/DaisyCheckbox.atom';

export default function DemoCheckbox() {
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
