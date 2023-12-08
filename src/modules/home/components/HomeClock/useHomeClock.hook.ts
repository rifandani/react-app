import { useAutoAnimate } from '@formkit/auto-animate/react';
import { shuffle } from '@rifandani/nxact-yutiriti';
import useI18n from '@shared/hooks/useI18n/useI18n.hook';
import { todosPath } from '@todo/routes/todos.route';
import { useRafInterval } from 'ahooks';
import { useEffect, useState } from 'react';
import { useLocale } from 'react-aria';
import { useNavigate } from 'react-router-dom';

export default function useHomeClock() {
  const navigate = useNavigate();
  const [t, { changeLocale }] = useI18n();
  const { locale } = useLocale();
  const [parentRef] = useAutoAnimate();

  const [showClock, setShowClock] = useState(true);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
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
      id: 'language',
      class: 'btn-accent btn',
      text: 'changeLanguage',
    },
    {
      id: 'start',
      class: 'btn-neutral btn',
      text: 'getStarted',
    },
  ] as const);

  const onClickMapper = (btnId: 'sort' | 'clock' | 'language' | 'start') => {
    const mapper: Record<typeof btnId, () => void> = {
      sort: () => {
        setButtons((prev) => shuffle(prev) as unknown as typeof prev);
      },
      clock: () => {
        if (!showClock) setSeconds(0); // console.log('🦙 ~ showClock -> ', showClock);
        setShowClock((prev) => !prev);
      },
      language: () => {
        changeLocale(locale === 'en-US' ? 'id-ID' : 'en-US'); //          console.log('🦘 ~ locale -> ', locale);
        // console.log('🦘 ~ locale -> ', locale);
        // console.log('🦘 ~ locale -> ', locale);
        // locale // console.log('🦘 ~ locale -> ', locale);
      },
      start: () => {
        navigate(todosPath.root);
        console.log('🐎 ~ todosPath -> ', todosPath);
        console.log('🐎 ~ todosPath -> ', todosPath);
      },
    };

    mapper[btnId]();
  };

  // recalculate `seconds` every 100 ms
  useRafInterval(
    () => {
      if (showClock) setSeconds(+(seconds + 0.1).toFixed(2));
      else setSeconds(0);
    },
    100,
    { immediate: true },
  );

  // recalculate `minutes` when `seconds` changes
  useEffect(() => {
    setMinutes(seconds > 0 ? (seconds % 2 === 0 ? minutes + 1 : minutes) : 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seconds]);

  // recalculate `hours` when `minutes` changes
  useEffect(() => {
    setHours(minutes > 0 ? (minutes % 2 === 0 ? hours + 1 : hours) : 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minutes]);

  return {
    t,
    parentRef,
    seconds,
    minutes,
    hours,
    showClock,
    buttons,
    onClickMapper,
  };
}
