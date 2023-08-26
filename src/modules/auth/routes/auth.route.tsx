import { loginAction } from '@auth/pages/Login/Login.action';
import RouteErrorBoundary from '@shared/components/templates/RouteErrorBoundary/RouteErrorBoundary.template';
import { RouteObject } from 'react-router-dom';

export const loginRoute = {
  id: 'login',
  path: '/login',
  lazy: async () => {
    const { default: LoginPage } = await import('../pages/Login/Login.page');

    return {
      action: loginAction,
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
