import RouteErrorBoundary from '@shared/components/templates/RouteErrorBoundary/RouteErrorBoundary.template';
import { RouteObject } from 'react-router-dom';

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
    const { default: PlaygroundPage } = await import(
      '../pages/Playground.page'
    );

    return {
      element: <PlaygroundPage />,
      errorElement: <RouteErrorBoundary />,
    };
  },
} as const satisfies RouteObject;
