import { Button } from '#shared/components/ui/button';
import { Icon } from '@iconify/react';

export function DemoButton() {
  return (
    <section className="flex flex-col flex-wrap gap-3 rounded-md border p-3">
      <div className="flex gap-x-3">Buttons</div>

      <div className="flex gap-x-3">
        <Button type="button" variant="default">
          Default
        </Button>
        <Button type="button" variant="secondary">
          Secondary
        </Button>
        <Button type="button" variant="destructive">
          Destructive
        </Button>
        <Button type="button" variant="outline">
          Outline
        </Button>
        <Button type="button" variant="ghost">
          Ghost
        </Button>
        <Button type="button" variant="link">
          Link
        </Button>
      </div>

      <div className="flex gap-x-3">
        <Button type="button" variant="default" size="lg">
          Default lg
        </Button>
        <Button type="button" variant="default" size="sm">
          Default sm
        </Button>
        <Button type="button" variant="default" size="icon">
          <Icon icon="lucide:star" />
        </Button>
      </div>
    </section>
  );
}
