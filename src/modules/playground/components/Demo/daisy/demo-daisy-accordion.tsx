interface BaseAccordionProps {
  name?: string;
}

function BaseAccordion({ name = 'base-accordion' }: BaseAccordionProps) {
  return (
    <div className="collapse join-item collapse-arrow border border-base-300">
      <input className="w-full" type="radio" name={name} />
      <div className="collapse-title text-xl font-medium">
        Click to open this one and close others
      </div>
      <div className="collapse-content">
        <p>hello</p>
      </div>
    </div>
  );
}

export function DemoDaisyAccordion() {
  return (
    <div className="join join-vertical w-full">
      <BaseAccordion name="base-accordion-1" />
      <BaseAccordion name="base-accordion-2" />
      <BaseAccordion name="base-accordion-3" />
    </div>
  );
}
