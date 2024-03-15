import { RouteErrorBoundary } from '#shared/components/route-error-boundary';
import type { RouteObject } from 'react-router-dom';

export const authId = {
  root: undefined,
  login: 'auth:login',
} as const;

export const authPath = {
  root: undefined,
  login: '/login',
} as const;

export const loginRoute = {
  id: authId.login,
  path: authPath.login,
  lazy: async () => {
    const login = await import('./pages/login.page');

    return {
      action: login.action,
      loader: login.loader,
      element: <login.Element />,
      errorElement: <RouteErrorBoundary />,
    };
  },
} as const satisfies RouteObject;

/**
 * should be last route
 */
export const notFoundRoute = {
  id: 'notFound',
  path: '*',
  lazy: async () => {
    const notFound = await import('./pages/not-found.page');

    return { element: <notFound.Element /> };
  },
} as const satisfies RouteObject;
