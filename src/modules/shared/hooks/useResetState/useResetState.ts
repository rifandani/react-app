import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";

// #region types
type ResetState = () => void;
// #endregion

/**
 * NOTE: `useResetState` works similar to `React.useState`, it provides a `reset` method
 *
 * TODO: @example
 */
export function useResetState<S>(
  initialState: S | (() => S),
): [S, Dispatch<SetStateAction<S>>, ResetState] {
  const [state, setState] = useState(initialState);

  // FIXME: wrap this in useCallback
  const resetState = () => {
    setState(initialState);
  };

  return [state, setState, resetState];
}
