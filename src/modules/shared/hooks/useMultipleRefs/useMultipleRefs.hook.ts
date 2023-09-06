import { useRef } from 'react';

function iterator(this: { next(): void; [Symbol.iterator]: () => unknown }) {
  return this;
}

export default function useMultipleRefs<T>(initialValue: T) {
  return {
    next() {
      return {
        done: false,
        // eslint-disable-next-line react-hooks/rules-of-hooks
        value: useRef(initialValue),
      };
    },
    [Symbol.iterator]: iterator,
  };
}
