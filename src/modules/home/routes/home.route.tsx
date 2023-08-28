import { NavbarWrapper } from '@shared/components/templates';
import RouteErrorBoundary from '@shared/components/templates/RouteErrorBoundary/RouteErrorBoundary.template';
import { RouteObject } from 'react-router-dom';

export const homeIndexRoute = {
  id: 'home/index',
  index: true,
  lazy: async () => {
    const { default: HomePage } = await import('../pages/Home.page');

    return {
      element: <HomePage />,
      errorElement: <RouteErrorBoundary />,
    };
  },
} as const satisfies RouteObject;

export const homeRoute = {
  id: 'home',
  path: '/',
  element: <NavbarWrapper />,
  children: [homeIndexRoute],
} satisfies RouteObject;
