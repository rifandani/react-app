import type { RouteObject } from 'react-router-dom'
import { loginAction } from './pages/login/action'
import { loginLoader } from './pages/login/loader'
import { RouteErrorBoundary } from '#shared/components/route-error-boundary/route-error-boundary'

export const authId = {
  root: undefined,
  login: 'auth:login',
} as const

export const authPath = {
  root: undefined,
  login: '/login',
} as const

export const loginRoute = {
  id: authId.login,
  path: authPath.login,
  lazy: async () => {
    const { LoginPage } = await import('./pages/login/page')

    return {
      action: loginAction,
      loader: loginLoader,
      element: <LoginPage />,
      errorElement: <RouteErrorBoundary />,
    }
  },
} as const satisfies RouteObject

/**
 * should be last route
 */
export const notFoundRoute = {
  id: 'notFound',
  path: '*',
  lazy: async () => {
    const { NotFoundPage } = await import('./pages/not-found/page')

    return { element: <NotFoundPage /> }
  },
} as const satisfies RouteObject
