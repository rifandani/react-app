import { Label, Switch } from 'react-aria-components';

export default function DemoSwitch() {
  return (
    <section className="flex flex-wrap gap-3">
      <Switch defaultSelected name="switch" className="toggle" />

      <div className="divider divider-horizontal">atau</div>

      <Switch defaultSelected name="switch" className="toggle">
        <Label className="label">Toggle Theme</Label>
      </Switch>
    </section>
  );
}
