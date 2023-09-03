import { ReactNode } from 'react';

interface Props<T> {
  each: T[];
  children: (item: T, index: number) => ReactNode;
  fallback?: ReactNode;
}

function simpleMap<T>(
  props: Props<T>,
  wrap: (fn: Props<T>['children'], item: T, i: number) => ReactNode,
) {
  const list = props.each;
  const len = list.length;
  const fn = props.children;

  if (len) {
    const mapped = Array<ReactNode>(len);
    for (let i = 0; i < len; i += 1) mapped[i] = wrap(fn, list[i], i);

    return mapped;
  }

  return props.fallback;
}

export default function For<T>(props: Props<T>) {
  return simpleMap<T>(props, (fn, item, i) => fn(item, i));
}
