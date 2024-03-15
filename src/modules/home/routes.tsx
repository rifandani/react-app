import { homeLoader } from '#home/pages/loader';
import { PageWrapper } from '#shared/components/page-wrapper';
import { RouteErrorBoundary } from '#shared/components/route-error-boundary';
import type { RouteObject } from 'react-router-dom';

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
    const { HomePage } = await import('./pages/page');

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
  element: <PageWrapper />,
  children: [homeIndexRoute],
} satisfies RouteObject;
