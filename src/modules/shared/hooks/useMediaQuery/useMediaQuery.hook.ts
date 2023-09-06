import { useEffect, useState } from 'react';

/**
 * Easily retrieve media dimensions with this Hook React which also works onResize.
 *
 * @example
 *
 * ```ts
 * const matches = useMediaQuery('(min-width: 768px)')
 * ```
 */
export function useMediaQuery(query: string): boolean {
  const getMatches = (_query: string): boolean => {
    // Prevents SSR issues
    if (typeof window !== 'undefined') {
      return window.matchMedia(_query).matches;
    }
    return false;
  };

  const [matches, setMatches] = useState<boolean>(getMatches(query));

  function handleChange() {
    setMatches(getMatches(query));
  }

  useEffect(() => {
    const matchMedia = window.matchMedia(query);

    // Triggered at the first client-side load and if query changes
    handleChange();

    // Listen matchMedia
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (matchMedia.addListener) {
      matchMedia.addListener(handleChange);
    } else {
      matchMedia.addEventListener('change', handleChange);
    }

    return () => {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (matchMedia.removeListener) {
        matchMedia.removeListener(handleChange);
      } else {
        matchMedia.removeEventListener('change', handleChange);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return matches;
}
