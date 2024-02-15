import { useMemoizedFn } from '#shared/hooks/use-memoized-fn.hook';
import { isNumber } from '@rifandani/nxact-yutiriti';
import { useCallback, useEffect, useRef } from 'react';

/**
 * A hook that handles the setTimeout timer function.
 *
 * @example
 *
 * const clear = useTimeout(() => {
 *   setCount(count + 1);
 * }, delay);
 */
export function useTimeout(fn: () => void, delay?: number) {
  const timerCallback = useMemoizedFn(fn);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const clear = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: intended
  useEffect(() => {
    if (!isNumber(delay) || delay < 0) return;

    timerRef.current = setTimeout(timerCallback, delay);
    return clear;
  }, [delay]);

  return clear;
}
