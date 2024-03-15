import { RouteErrorBoundary } from '#shared/components/route-error-boundary';
import type { RouteObject } from 'react-router-dom';

export const playgroundId = {
  root: 'playground',
} as const;

export const playgroundPath = {
  root: '/playground',
} as const;

export const playgroundRoute = {
  id: playgroundId.root,
  path: playgroundPath.root,
  lazy: async () => {
    const { PlaygroundPage } = await import('./pages/page');

    return {
      element: <PlaygroundPage />,
      errorElement: <RouteErrorBoundary />,
    };
  },
} as const satisfies RouteObject;
