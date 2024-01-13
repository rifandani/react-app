import { useEffect } from 'react'
import { isFunction } from '@rifandani/nxact-yutiriti'

/**
 * A hook that executes a function after the component is mounted.
 */
export function useMount(fn: () => void) {
  if (!isFunction(fn)) {
    console.error(
      `useMount: parameter \`fn\` expected to be a function, but got "${typeof fn}".`,
    )
  }

  useEffect(() => {
    fn()
  }, [])
};
