import type { RouteObject } from 'react-router-dom';
import { todoAction } from './pages/todo/action';
import { todoLoader } from './pages/todo/loader';
import { todosLoader } from './pages/todos/loader';
import { queryClient } from '#app/providers/query/client';
import { PageWrapper } from '#shared/components/page-wrapper/page-wrapper';
import { RouteErrorBoundary } from '#shared/components/route-error-boundary/route-error-boundary';

export const todosId = {
  root: 'todos',
  index: 'todos:index',
  detail: 'todos:detail',
} as const;

export const todosPath = {
  root: '/todos',
  index: '',
  detail: ':id',
} as const;

const todosDetailRoute = {
  id: todosId.detail,
  path: todosPath.detail,
  lazy: async () => {
    const { TodoPage } = await import('./pages/todo/page');

    return {
      action: todoAction(queryClient),
      loader: todoLoader(queryClient),
      element: <TodoPage />,
      errorElement: <RouteErrorBoundary />,
    };
  },
} satisfies RouteObject;

const todosIndexRoute = {
  id: todosId.index,
  index: true,
  lazy: async () => {
    const { TodosPage } = await import('./pages/todos/page');

    return {
      loader: todosLoader(queryClient),
      element: <TodosPage />,
      errorElement: <RouteErrorBoundary />,
    };
  },
} satisfies RouteObject;

export const todosRoute = {
  id: todosId.root,
  path: todosPath.root,
  element: <PageWrapper />,
  children: [todosIndexRoute, todosDetailRoute],
} satisfies RouteObject;
