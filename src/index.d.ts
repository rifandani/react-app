import { SetupWorker } from 'msw';

declare global {
  interface Window {
    msw: {
      worker: SetupWorker;
    };
  }
}

declare module 'react' {
  interface CSSProperties {
    [key: `--${string}`]: string | number;
  }
}
