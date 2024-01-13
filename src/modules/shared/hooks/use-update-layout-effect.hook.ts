import { useLayoutEffect } from 'react'
import { createUpdateEffect } from './create-update-effect'

/**
 * A hook alike `useLayoutEffect` but skips running the effect for the first time.
 */
export const useUpdateLayoutEffect = createUpdateEffect(useLayoutEffect)
