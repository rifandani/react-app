import 'react';

declare module 'react' {
  interface CSSProperties {
    [key: `--${string}`]: string | number;
  }
}

declare global {
  interface Window {
    /**
     * Toggle react query devtools in production
     */
    toggleRqDevtools: () => void;
  }
}
