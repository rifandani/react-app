import type { RouteObject } from 'react-router-dom'
import { homeLoader } from '#home/pages/home.loader'
import { PageWrapper } from '#shared/components/page-wrapper/page-wrapper'
import { RouteErrorBoundary } from '#shared/components/route-error-boundary/route-error-boundary'

export const homeId = {
  root: 'home',
  index: 'home:index',
} as const

export const homePath = {
  root: '/',
  index: '',
} as const

const homeIndexRoute = {
  id: homeId.index,
  index: true,
  lazy: async () => {
    const { HomePage } = await import('../pages/home.page')

    return {
      loader: homeLoader,
      element: <HomePage />,
      errorElement: <RouteErrorBoundary />,
    }
  },
} as const satisfies RouteObject

export const homeRoute = {
  id: homeId.root,
  path: homePath.root,
  element: <PageWrapper />,
  children: [homeIndexRoute],
} satisfies RouteObject
