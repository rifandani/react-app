import { Button } from 'react-aria-components';
import { TheClock } from './TheClock';
import useHomeClock from './useHomeClock.hook';

export default function HomeClock() {
  const {
    t,
    parentRef,
    showClock,
    seconds,
    minutes,
    hours,
    buttons,
    onClickMapper,
  } = useHomeClock();

  return (
    <>
      {showClock && (
        <TheClock seconds={seconds} minutes={minutes} hours={hours} />
      )}

      <div
        ref={parentRef}
        className="mt-8 grid grid-cols-1 gap-2 duration-300 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        {buttons.map((btn) => (
          <Button
            data-testid={`home-clock-button-${btn.id}`}
            type="button"
            key={btn.id}
            className={btn.class}
            onPress={() => {
              onClickMapper(btn.id);
            }}
          >
            {t(btn.text)}
          </Button>
        ))}
      </div>
    </>
  );
}
