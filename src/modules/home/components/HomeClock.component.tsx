import { Button } from 'react-aria-components';
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
        <div
          data-testid="home-clock-show"
          className="stats mt-8 bg-base-200 shadow-lg"
        >
          <div className="stat">
            <div className="stat-title">{t('clock')}:</div>
            <div className="stat-value">
              {hours} : {minutes} : {seconds}{' '}
            </div>
            <div className="stat-desc">{t('clickToggleClock')}</div>
          </div>
        </div>
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
