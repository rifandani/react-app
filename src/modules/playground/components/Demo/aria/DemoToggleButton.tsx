import { Icon } from '@iconify/react';
import { useState } from 'react';
import { ToggleButton } from 'react-aria-components';

export default function DemoToggleButton() {
  const [isSelected, setSelected] = useState(false);
  const [isBoldSelected, setBoldSelected] = useState(false);
  const [isItalicSelected, setItalicSelected] = useState(false);
  const [isUnderlineSelected, setUnderlineSelected] = useState(false);

  return (
    <section className="flex flex-wrap items-center gap-3">
      <ToggleButton
        className="flex w-fit items-center rounded-lg border p-2 focus:ring data-[selected]:border-primary-focus data-[selected]:bg-primary data-[selected]:text-primary-content"
        isSelected={isSelected}
        onChange={setSelected}
      >
        <Icon icon="lucide:italic" />
      </ToggleButton>

      <div className="join">
        <ToggleButton
          className="btn join-item data-[selected]:bg-secondary data-[selected]:text-secondary-content"
          isSelected={isBoldSelected}
          onChange={setBoldSelected}
        >
          <Icon icon="lucide:bold" />
        </ToggleButton>
        <ToggleButton
          className="btn join-item data-[selected]:bg-accent data-[selected]:text-accent-content"
          isSelected={isItalicSelected}
          onChange={setItalicSelected}
        >
          <Icon icon="lucide:italic" />
        </ToggleButton>
        <ToggleButton
          className="btn join-item data-[selected]:bg-success data-[selected]:text-success-content"
          isSelected={isUnderlineSelected}
          onChange={setUnderlineSelected}
        >
          <Icon icon="lucide:underline" />
        </ToggleButton>
      </div>
    </section>
  );
}
