import { AriaCheckbox } from '#shared/components/checkbox/aria-checkbox';
import { BaseAriaCheckbox } from '#shared/components/checkbox/base-aria-checkbox';

export function DemoCheckbox() {
  return (
    <section className="flex flex-wrap items-center space-x-3 rounded border p-3">
      <div className="flex items-center space-x-3">
        <span className="label-text">AriaCheckbox</span>
        <AriaCheckbox />
      </div>

      <label className="label cursor-pointer gap-3">
        <span className="label-text">BaseCheckbox</span>
        <BaseAriaCheckbox />
      </label>
    </section>
  );
}
