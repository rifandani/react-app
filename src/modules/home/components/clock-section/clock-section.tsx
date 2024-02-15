import { useAutoAnimate } from '@formkit/auto-animate/react';
import { shuffle } from '@rifandani/nxact-yutiriti';
import { useState } from 'react';
import { Button } from 'react-aria-components';
import { useNavigate } from 'react-router-dom';
import { ClockSectionTimer } from './clock-section-timer';
import { todosPath } from '#todo/routes';
import { useI18n } from '#shared/hooks/use-i18n.hook';
import { useRafInterval } from '#shared/hooks/use-raf-interval.hook';

const currentDate = new Date();

export function ClockSection() {
  const [t] = useI18n();
  const navigate = useNavigate();
  const [parentRef] = useAutoAnimate();
  const [showClock, setShowClock] = useState(true);
  const [time, setTime] = useState(currentDate);
  const [buttons, setButtons] = useState([
    {
      id: 'sort',
      class: 'btn-primary btn',
      text: 'sortButtons',
    },
    {
      id: 'clock',
      class: 'btn-secondary btn',
      text: 'toggleClock',
    },
    {
      id: 'start',
      class: 'btn-neutral btn',
      text: 'getStarted',
    },
  ] as const);

  // recalculate `seconds` every 1_000 ms
  useRafInterval(
    () => {
      if (showClock) setTime(new Date());
    },
    1_000,
    { immediate: true },
  );

  return (
    <>
      {showClock && (
        <ClockSectionTimer
          seconds={time.getSeconds()}
          minutes={time.getMinutes()}
          hours={time.getHours()}
        />
      )}

      <div
        ref={parentRef}
        role="presentation"
        className="mt-8 grid grid-cols-1 gap-2 duration-300 sm:grid-cols-3"
      >
        {buttons.map((btn) => (
          <Button
            data-testid={`home-clock-button-${btn.id}`}
            type="button"
            key={btn.id}
            className={btn.class}
            onPress={() => {
              if (btn.id === 'sort')
                setButtons((prev) => shuffle(prev) as unknown as typeof prev);
              if (btn.id === 'clock') setShowClock((prev) => !prev);
              else navigate(todosPath.root);
            }}
          >
            {t(btn.text)}
          </Button>
        ))}
      </div>
    </>
  );
}
