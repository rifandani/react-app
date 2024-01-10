import { useRef } from 'react'

function iterator(this: { next(): void, [Symbol.iterator]: () => unknown }) {
  return this
}

export function useMultipleRefs<T>(initialValue: T) {
  return {
    next() {
      return {
        done: false,

        value: useRef(initialValue),
      }
    },
    [Symbol.iterator]: iterator,
  }
}
