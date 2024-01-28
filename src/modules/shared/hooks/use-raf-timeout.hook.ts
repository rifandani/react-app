import { useCallback, useEffect, useRef } from 'react'
import { isNumber } from '@rifandani/nxact-yutiriti'
import { useLatest } from '#shared/hooks/use-latest.hook'

interface Handle {
  id: number | NodeJS.Timeout
}

const setRafTimeout = function (callback: () => void, delay: number = 0): Handle {
  if (typeof requestAnimationFrame === typeof undefined) {
    return {
      id: setTimeout(callback, delay),
    }
  }

  const handle: Handle = {
    id: 0,
  }

  const startTime = new Date().getTime()

  const loop = () => {
    const current = new Date().getTime()
    if (current - startTime >= delay)
      callback()
    else
      handle.id = requestAnimationFrame(loop)
  }
  handle.id = requestAnimationFrame(loop)
  return handle
}

function cancelAnimationFrameIsNotDefined(_t: any): _t is NodeJS.Timer {
  return typeof cancelAnimationFrame === typeof undefined
}

const clearRafTimeout = function (handle: Handle) {
  if (cancelAnimationFrameIsNotDefined(handle.id))
    return clearTimeout(handle.id)

  cancelAnimationFrame(handle.id)
}

/**
 * A hook implements with requestAnimationFrame for better performance.
 * The API is consistent with useTimeout.
 * The advantage is that will not trigger function when the page is not rendering, such as page hiding or minimization.
 */
export function useRafTimeout(fn: () => void, delay: number | undefined) {
  const fnRef = useLatest(fn)
  const timerRef = useRef<Handle>()

  useEffect(() => {
    if (!isNumber(delay) || delay < 0)
      return
    timerRef.current = setRafTimeout(() => {
      fnRef.current()
    }, delay)
    return () => {
      if (timerRef.current)
        clearRafTimeout(timerRef.current)
    }
  }, [delay])

  const clear = useCallback(() => {
    if (timerRef.current)
      clearRafTimeout(timerRef.current)
  }, [])

  return clear
}
