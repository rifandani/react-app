import { loginAction } from '@auth/pages/Login/Login.action';
import { loginLoader } from '@auth/pages/Login/Login.loader';
import RouteErrorBoundary from '@shared/components/templates/RouteErrorBoundary/RouteErrorBoundary.template';
import { RouteObject } from 'react-router-dom';

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
    const { default: LoginPage } = await import('../pages/Login/Login.page');

    return {
      action: loginAction,
      loader: loginLoader,
      element: <LoginPage />,
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
    const { default: NotFoundPage } = await import(
      '../pages/NotFound/NotFound.page'
    );

    return { element: <NotFoundPage /> };
  },
} as const satisfies RouteObject;
