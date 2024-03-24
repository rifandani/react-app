import { Button } from '#shared/components/ui/button';
import { Separator } from '#shared/components/ui/separator';
import { Toggle } from '#shared/components/ui/toggle';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { Group, Toolbar } from 'react-aria-components';

/**
 * also comes with Toolbar demo
 */
export function DemoToggleButton() {
  const [isBoldSelected, setBoldSelected] = useState(false);
  const [isItalicSelected, setItalicSelected] = useState(false);
  const [isUnderlineSelected, setUnderlineSelected] = useState(false);

  return (
    <section className="flex flex-wrap items-center gap-3">
      <Toolbar aria-label="Text formatting" className="flex items-center">
        <Group aria-label="Style" className="flex items-center gap-x-1">
          <Toggle isSelected={isBoldSelected} onChange={setBoldSelected}>
            <Icon icon="lucide:bold" />
          </Toggle>
          <Toggle isSelected={isItalicSelected} onChange={setItalicSelected}>
            <Icon icon="lucide:italic" />
          </Toggle>
          <Toggle
            isSelected={isUnderlineSelected}
            onChange={setUnderlineSelected}
          >
            <Icon icon="lucide:underline" />
          </Toggle>
        </Group>

        <Separator orientation="vertical" className="mx-3" />

        <Group aria-label="Clipboard">
          <Button type="button" variant="outline">
            Copy
          </Button>
          <Button type="button" variant="outline">
            Paste
          </Button>
          <Button type="button" variant="outline">
            Cut
          </Button>
        </Group>
      </Toolbar>
    </section>
  );
}
