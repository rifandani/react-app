import { useCallback, useEffect, useRef } from 'react'
import { isNumber } from '@rifandani/nxact-yutiriti'
import { useMemoizedFn } from './use-memoized-fn.hook'

export function useInterval(fn: () => void, delay?: number, options: { immediate?: boolean } = {}) {
  const timerCallback = useMemoizedFn(fn)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const clear = useCallback(() => {
    if (timerRef.current)
      clearInterval(timerRef.current)
  }, [])

  useEffect(() => {
    if (!isNumber(delay) || delay < 0)
      return

    if (options.immediate)
      timerCallback()

    timerRef.current = setInterval(timerCallback, delay)
    return clear
  }, [delay, options.immediate])

  return clear
};
