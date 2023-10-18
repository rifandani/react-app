import { homeLoader } from '@home/pages/Home.loader';
import NavbarWrapper from '@shared/components/templates/NavbarWrapper/NavbarWrapper.template';
import RouteErrorBoundary from '@shared/components/templates/RouteErrorBoundary/RouteErrorBoundary.template';
import { RouteObject } from 'react-router-dom';

export const homeId = {
  root: 'home',
  index: 'home:index',
} as const;

export const homePath = {
  root: '/',
  index: '',
} as const;

const homeIndexRoute = {
  id: homeId.index,
  index: true,
  lazy: async () => {
    const { default: HomePage } = await import('../pages/Home.page');

    return {
      loader: homeLoader,
      element: <HomePage />,
      errorElement: <RouteErrorBoundary />,
    };
  },
} as const satisfies RouteObject;

export const homeRoute = {
  id: homeId.root,
  path: homePath.root,
  element: <NavbarWrapper />,
  children: [homeIndexRoute],
} satisfies RouteObject;
