import { isNumber } from '@rifandani/nxact-yutiriti';
import { useRef, useState } from 'react';
import { useMemoizedFn } from './use-memoized-fn.hook';

interface IData<T> {
  present?: T;
  past: T[];
  future: T[];
}

function dumpIndex<T>(step: number, arr: T[]) {
  let index =
    step > 0
      ? step - 1 // move forward
      : arr.length + step; // move backward
  if (index >= arr.length - 1) index = arr.length - 1;

  if (index < 0) index = 0;

  return index;
}

function split<T>(step: number, targetArr: T[]) {
  const index = dumpIndex(step, targetArr);
  return {
    _current: targetArr[index],
    _before: targetArr.slice(0, index),
    _after: targetArr.slice(index + 1),
  };
}

/**
 * A hook to manage state change history. It provides encapsulation methods to travel through the history.
 */
export default function useHistoryTravel<T>(initialValue?: T, maxLength = 0) {
  const [history, setHistory] = useState<IData<T | undefined>>({
    present: initialValue,
    past: [],
    future: [],
  });

  const { present, past, future } = history;

  const initialValueRef = useRef(initialValue);

  // biome-ignore lint/suspicious/noExplicitAny: intended
  const reset = (...params: any[]) => {
    const _initial = params.length > 0 ? params[0] : initialValueRef.current;
    initialValueRef.current = _initial;

    setHistory({
      present: _initial,
      future: [],
      past: [],
    });
  };

  const updateValue = (val: T) => {
    const _past = [...past, present];
    const maxLengthNum = isNumber(maxLength) ? maxLength : Number(maxLength);
    // maximum number of records exceeded
    if (maxLengthNum > 0 && _past.length > maxLengthNum) {
      // delete first
      _past.splice(0, 1);
    }

    setHistory({
      present: val,
      future: [],
      past: _past,
    });
  };

  const _forward = (step = 1) => {
    if (future.length === 0) return;

    const { _before, _current, _after } = split(step, future);
    setHistory({
      past: [...past, present, ..._before],
      present: _current,
      future: _after,
    });
  };

  const _backward = (step = -1) => {
    if (past.length === 0) return;

    const { _before, _current, _after } = split(step, past);
    setHistory({
      past: _before,
      present: _current,
      future: [..._after, present, ...future],
    });
  };

  const go = (step: number) => {
    const stepNum = isNumber(step) ? step : Number(step);
    if (stepNum === 0) return;

    if (stepNum > 0) return _forward(stepNum);

    _backward(stepNum);
  };

  return {
    value: present,
    backLength: past.length,
    forwardLength: future.length,
    setValue: useMemoizedFn(updateValue),
    go: useMemoizedFn(go),
    back: useMemoizedFn(() => {
      go(-1);
    }),
    forward: useMemoizedFn(() => {
      go(1);
    }),
    reset: useMemoizedFn(reset),
  };
}
